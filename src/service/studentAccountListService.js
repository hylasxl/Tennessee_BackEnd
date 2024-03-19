import db, { sequelize } from "../models/models";
import { Op } from "sequelize";
import { stringToSlug } from "../utils/utils.function";
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from './loginService'

const transporter = require('../config/mailService.config')

const sendNewStudentAccountRequest = async (data) => {
    try {
        const checkDuplicate = await db.account_info.findAll({
            where: {
                [Op.or]: {
                    email: data.email,
                    phone: data.phone,
                },
            },
        })

        const constRequestDuplicate = await db.student_account_providing_request.findAll({
            where: {
                [Op.and]: {
                    [Op.or]: {
                        email: data.email,
                        phone: data.phone,
                    },
                    approveStatus: 'Pending'
                }
            },
        })

        if (checkDuplicate && checkDuplicate.length > 0) {
            return "Email or Phone has already in use"
        }
        if (constRequestDuplicate && constRequestDuplicate.length > 0) {
            return "Email or Phone has alreay in another request"
        }

        const addNewRequest = await db.student_account_providing_request.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            dateofBirth: data.dateofBirth,
            gender: data.gender,
            approveStatus: 'Pending',
            confirmedBy: 0,
            requestCreatedBy: data.userId,
            address: data.address
        })
        return addNewRequest
    } catch (e) {
        console.log(e);
        return "ERROR"
    }
}

const fetchAllStudentAccountList = async () => {
    try {
        const data = await db.student_account_providing_request.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'confirmedBy', 'requestCreatedBy']
            },
            include: [
                {
                    model: db.account_info,
                    as: "SCPRByAccount",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                },
                {
                    model: db.account_info,
                    as: "SCPRConfirmedBy",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                },
            ]
        })
        return data
    } catch (e) {
        console.log(e)
        return "ERROR"
    }
}

const countStudentRequest = async () => {
    try {
        return await db.student_account_providing_request.count({
            where: {
                approveStatus: 'Pending'
            }
        })
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

const studentApprove = async (data) => {
    try {
        if (data.approveType === "Approve") {
            const user = await db.student_account_providing_request.findOne({
                where: {
                    'id': data.studentId
                },
                raw: true
            })
            let randomNumer, username, checkDuplicateUsername
            do {
                randomNumer = Math.floor(Math.random() * 10000)
                username = stringToSlug(user.firstName) + stringToSlug(user.lastName) + randomNumer
                checkDuplicateUsername = await db.account.findAll({
                    where: {
                        username: username
                    }
                })
            } while (checkDuplicateUsername.length > 0)
            const password = uuidv4()
            const approveProcedure = await db.account.create({
                username: username,
                password: hashPassword(password),
                accountTypeId: 4,
                accountState: 'Accessbile'
            })
                .then(async (account) => {
                    await db.account_info.create({
                        'id': account.id,
                        accountId: account.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        dateofBirth: new Date(user.dateofBirth),
                        gender: user.gender,
                        phone: user.phone,
                        email: user.email,
                        address: user.address,
                        imageId: account.id
                    })
                    await db.account_info_image.create({
                        'id': account.id,
                        imagePath: 'DEFAULT'
                    })
                })
                .then(async () => {
                    const user = await db.student_account_providing_request.findOne({
                        where: {
                            'id': data.studentId
                        },
                    })
                    await user.update({
                        approveStatus: 'Approved',
                        confirmedBy: data.currentId
                    })
                })
                .then(async () => {
                    await transporter.sendMail({
                        from: '"Tennessee Language Center" <tennesseelanguagecenter@gmail.com>',
                        to: user.email,
                        subject: "Account Approval",
                        html: `<h2>Your Account Has Been Approved</h2><br>
                    <h4>Here is your account infomation, you should change it later</h4><br>
                    <b>Username</b>: ${username}<br>
                    <b>Password</b>: ${password}`,
                    })
                })
                .then(() => {
                    return "Successfully"
                })
        }
        if (data.approveType === "Reject") {
            const user = await db.student_account_providing_request.findOne({
                where: {
                    'id': data.studentId
                }
            })
            const updated = await user.update({
                approveStatus: 'Rejected',
                confirmedBy: data.currentId
            })
            return updated;
        }
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

const fetchStudentByClass = async (data) => {
    try {
        const classId = data.classId
        let allStudents = []
        const classTimeSheet = await db.class_schedule.findAll({
            where: {
                classId: classId
            },
            raw: true
        })

        const students = await db.account.findAll({
            where: {
                accountTypeId: 4
            },
            raw: true
        })

        students.forEach(item => {
            allStudents.push(item.id)
        })

        const attendDates = []
        classTimeSheet.forEach(item => {
            attendDates.push(item.date)
        })

        const busy = await db.student_timetable.findAll({
            where: {
                [Op.and]: [
                    {
                        date: { [Op.in]: attendDates }
                    },
                    {
                        shift: classTimeSheet[0].shift
                    }
                ]
            }, raw: true
        })
        busy.forEach(item => {
            allStudents = allStudents.filter(e => e !== item.studentId)
        })
        return await db.account_info.findAll({
            where: {
                accountId: {
                    [Op.in]: allStudents
                }
            }
        })
    }

    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

const saveStudent = async (data) => {
    try {
        const classId = data.classId
        const studentList = data.studentList

        const selectedClass = await db.class.findOne({
            where: {
                'id': classId
            },
            raw: true
        })
        if (+selectedClass.currentQuantity + studentList.length > +selectedClass.maxQuantity) {
            return "Max quantity reached"
        }

        const studentObjects = studentList.map(id => ({ studentId: id, classId: classId }))
        // const numberofLessons = await db.lesson.count({
        //     where: {
        //         courseId: selectedClass.courseId
        //     }
        // })
        const classSchedule = await db.class_schedule.findAll({
            where: {
                classId: classId
            },
            raw: true,
        })

        const returnedData = await db.class_student_list.bulkCreate(studentObjects)
            .then(async () => {
                let lessonList = []
                const lessonIds = await db.lesson.findAll({
                    attributes: ['id'],
                    where: {
                        courseId: selectedClass.courseId
                    },
                    raw: true
                })
                lessonIds.forEach((item) => {
                    lessonList.push(item.id)
                })
                let index = 0
                studentList.forEach(async (item) => {
                    let modifiedData = classSchedule.map(({ id, createdAt, updatedAt, orderofLesson,
                        ...rest }) => ({ ...rest, studentId: item, classId: classId, lessonId: lessonList[index++] }));
                    index = 0
                    await db.student_timetable.bulkCreate(modifiedData)
                })

            })
            .then(async () => {
                studentList.forEach(async (item) => {
                    let modifiedData = classSchedule.map(({ id, createdAt, updatedAt, shift, approveStatus, room, ...rest }) => ({ ...rest, studentId: item, status: 0, classId: classId }));
                    let insertData = {
                        classId: classId,
                        studentId: item,
                        attendanceRate: 0,
                        midTermTest: 0,
                        finalTest: 0,
                        finalResult: 0,
                        status: 0
                    }
                    await db.class_attendance.bulkCreate(modifiedData)
                    await db.academic_transcript.create(insertData)
                })
                await db.class.update({
                    currentQuantity: selectedClass.currentQuantity + studentList.length
                }, {
                    where: {
                        'id': classId
                    }
                })
            })

        return returnedData




    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

const sendAbsentRequest = async (data) => {
    try {
        const absentData = data.absentData
        console.log(absentData);
        const result = await sequelize.transaction(async (t) => {
            await Promise.all(absentData.map(async (item) => {
                await db.student_absence_request.create({
                    studentId: item.studentId,
                    classId: item.classId,
                    date: item.date,
                    reason: item.reason,
                    status: 'Pending'
                },{
                    transaction: t
                })
            }))
            return 1
        })
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

module.exports = {
    sendNewStudentAccountRequest,
    fetchAllStudentAccountList,
    countStudentRequest,
    studentApprove,
    fetchStudentByClass,
    saveStudent,
    sendAbsentRequest
}