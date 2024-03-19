import db, { sequelize } from "../models/models/index";
import { Op } from "sequelize";
import { getNextAcceptedDays } from "../utils/utils.function";

const fetchAllClass = async (type) => {
    const typeList = []
    if(!type) typeList.push("Approved","Rejected","Pending")
    if (type !== "Approved") {
        typeList.push("Pending", "Rejected")
    } else {
        typeList.push(type)
    }
    try {
        const data = await db.class.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'courseId', 'lecturerID', 'lecturerId', 'classShift', 'requestBy', 'confirmedBy']
            },
            where: { approveStatus: typeList },
            include: [
                {
                    model: db.course,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'languageID', 'createdBy', 'approvedBy']
                    },
                    include: [
                        {
                            model: db.account_info,
                            as: "createdByAccount",
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        },
                        {
                            model: db.account_info,
                            as: "approvedByAccount",
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        },
                        {
                            model: db.lesson,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },

                        },
                        {
                            model: db.language,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        },
                        {
                            model: db.course_image,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        },
                    ],
                },
                {
                    model: db.account_info,
                    as: 'lecturerByAccount',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: db.account_info,
                    as: 'confirmedByAccount',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: db.account_info,
                    as: 'requestByAccount',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: db.class_shift,
                    as: 'class_classShift',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }

            ],
            nest: true
        })



        const plainData = data.map(item => item.get({ plain: true }));

        return data
    } catch (e) {
        console.log(e);
        return "ERROR"
    }
}
const sendNewClassRequest = async (data) => {
    try {

        const isDuplicated = await db.class.findAll({
            where: {
                className: data.className,
                // courseId: data.courseId
            }
        })
        if (isDuplicated.length > 0) {
            return "isDuplicated"
        }
        const maxID = await db.class.max('orderofClassbyCourse', {
            where: {
                courseId: data.courseId
            }
        })

        const numberofLessons = await db.lesson.count({
            where: {
                courseId: data.courseId
            }
        })
        const acceptedDays = getNextAcceptedDays(data.weekdays, data.startDate, numberofLessons)

        const allRoomsasArr = []
        const allRooms = await db.room.findAll({
            where: {
                status: 'Accessible'
            },
            raw: true
        })
        allRooms.forEach(element => {
            allRoomsasArr.push(element.id)
        });

        const busyRooms = await db.room_timesheet.findAll({
            where: {
                [Op.and]: [
                    {
                        date: { [Op.in]: acceptedDays }
                    },
                    {
                        shift: data.shift
                    }
                ]
            }
        })
        busyRooms.forEach(element => {
            allRoomsasArr.filter(item => item !== element.id)
        });
        let indexArr = 1
        const constantroomID = allRoomsasArr[Math.floor(Math.random() * (allRoomsasArr.length - 1))]
        const returnedData = await db.class.create({
            courseId: data.courseId,
            className: data.className,
            orderofClassbyCourse: maxID + 1,
            startDate: new Date(data.startDate),
            lecturerId: data.lecturerId,
            weekdays: data.weekdays,
            maxQuantity: data.quantity,
            currentQuantity: 0,
            classShift: data.shift,
            description: data.description !== "" ? data.description : "No description",
            requestBy: data.userId,
            approveStatus: "Pending"
        })
            .then(async (createdClass) => {
                let lessonList = []
                const lessonIds = await db.lesson.findAll({
                    attributes: ['id'],
                    where: {
                        courseId: data.courseId
                    }
                })
                lessonIds.forEach((item) => {
                    lessonList.push(item.id)
                })
                await Promise.all(acceptedDays.map(async (days, i) => {



                    await db.lecturer_timetable.create({
                        lecturerId: data.lecturerId,
                        classId: createdClass.id,
                        lessonId: lessonList[i],
                        date: days,
                        shift: data.shift,
                        roomId: constantroomID,
                        approveStatus: 'Pending'
                    })
                    await db.class_schedule.create({
                        classId: createdClass.id,
                        orderofLesson: i + 1,
                        date: days,
                        shift: data.shift,
                        roomId: constantroomID,
                        approveStatus: "Pending",
                    })
                    await db.room_timesheet.create({
                        roomId: constantroomID,
                        classId: createdClass.id,
                        orderofLesson: i + 1,
                        date: days,
                        shift: data.shift,
                        approveStatus: 'Pending',
                    })

                }))
            })
            .finally(() => {
                return "Success"
            })


    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

const countRequest = async () => {
    try {
        return await db.class.count({
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

const classApprove = async (data) => {
    try {
        if (data.approveType === "Approve") {
            const classRequest = await db.class.findOne({
                where: {
                    'id': data.classId
                },
                raw: true
            })
            const numberofLessons = await db.lesson.count({
                where: {
                    courseId: classRequest.courseId
                }
            })
            const acceptedDays = getNextAcceptedDays(classRequest.weekdays, classRequest.startDate, numberofLessons)

            const endDate = acceptedDays[-1]

            const classUpdate = await db.class.findOne({
                where: {
                    'id': data.classId
                },
            })
            const returnedData = await classUpdate.update({
                endDate: endDate,
                approveStatus: 'Approved',
                confirmedBy: data.currentId
            }).then(async () => {
                await db.lecturer_timetable.update({ approveStatus: 'Approved' }, {
                    where: {
                        classId: data.classId
                    }
                })
                await db.class_schedule.update({ approveStatus: 'Approved' }, {
                    where: {
                        classId: data.classId
                    }
                })
                await db.room_timesheet.update({ approveStatus: 'Approved' }, {
                    where: {
                        classId: data.classId
                    }
                })
            }).finally(() => {
                return "Success"
            })
        }


        if (data.approveType === "Reject") {

            const classRequest = await db.class.findOne({
                where: {
                    'id': data.classId
                },
            })

            await classRequest.update({
                approveStatus: 'Rejected'
            })
            return classRequest
        }
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

const fetchClassByStudent = async (data) => {
    try {
        const studentId = data.studentId
        const returnedData = await db.class_student_list.findAll(({
            where:
            {
                studentId: studentId
            },
            include: [
                {
                    model: db.class,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'courseId', 'lecturerID', 'lecturerId', 'classShift', 'requestBy', 'confirmedBy']
                    },
                    include: [
                        {
                            model: db.course,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt', 'languageID', 'createdBy', 'approvedBy']
                            },
                            include: [
                                {
                                    model: db.account_info,
                                    as: "createdByAccount",
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt']
                                    },
                                },
                                {
                                    model: db.account_info,
                                    as: "approvedByAccount",
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt']
                                    },
                                },
                                {
                                    model: db.lesson,
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt']
                                    },

                                },
                                {
                                    model: db.language,
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt']
                                    },
                                },
                                {
                                    model: db.course_image,
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt']
                                    },
                                },
                            ],
                        },
                        {
                            model: db.account_info,
                            as: 'lecturerByAccount',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            }
                        },
                        {
                            model: db.account_info,
                            as: 'confirmedByAccount',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            }
                        },
                        {
                            model: db.account_info,
                            as: 'requestByAccount',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            }
                        },
                        {
                            model: db.class_shift,
                            as: 'class_classShift',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            }
                        }

                    ],
                },
                {
                    model: db.account_info,
                    as: 'CSLAI',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                }
            ]
        }))
        return returnedData
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

const fetchClassByLecturer = async (data) => {
    try {
        const lecturerId = data.lecturerId
        const returnedData = await db.class.findAll({
            where: {
                lecturerId: lecturerId,
                approveStatus: 'Approved'
            },
            include: [
                {
                    model: db.account_info,
                    as: "lecturerByAccount",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: db.class_shift,
                    as: "class_classShift",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: db.course
                }
            ]
        })

        return returnedData

    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

const fetchClassSchedule = async (data) => {
    try {
        const classId = data.classId
        return await db.class_schedule.findAll({
            where: {
                classId
            }
        })
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}


const approveAbsentRequest = async (data) => {
    try {
        const type = data.type
        const request = data.request
        if (type === "Approve") {
            await sequelize.transaction(async (t) => {
                const selectedRequest = await db.student_absence_request.findOne({
                    where: {
                        'id': request.id
                    }
                })
                const selectedClassSchdule = await db.class_attendance.findOne({
                    where: {
                        classId: request.class.id,
                        studentId: request.account_info.accountId,
                        date: request.date,
                    }
                })


                if (selectedClassSchdule && selectedRequest) {
                    await selectedClassSchdule.update({
                        status: 2
                    }, {
                        transaction: t
                    })
                    await selectedRequest.update({
                        status: 'Approved'
                    }, {
                        transaction: t
                    })
                }
            })
        } else if (type === "Reject") {
            const selectedRequest = await db.student_absence_request.findOne({
                where: {
                    'id': request.id
                }
            })
            await selectedRequest.update({
                status: 'Rejected'
            })
        }
        return request
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}
module.exports = {
    fetchAllClass,
    sendNewClassRequest,
    countRequest,
    classApprove,
    fetchClassByStudent,
    fetchClassByLecturer,
    fetchClassSchedule,
    approveAbsentRequest
}