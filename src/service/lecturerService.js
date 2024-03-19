import db, { sequelize } from "../models/models";
import { getNextAcceptedDays } from "../utils/utils.function";
import { Op, Sequelize } from "sequelize";



const fetchLecturerByLanguage = async (data) => {
    try {
        const weekdays = data.weekdays
        const classShift = data.classShift
        const languageId = data.languageId
        const startDate = data.startDate
        const courseId = data.courseId
        const fullLanguageLecturerListasObj = await db.lecturer_language.findAll({
            where: {
                languageId: languageId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            raw: true
        })
        const numberofLessons = await db.lesson.count({
            where: {
                courseId: courseId
            }
        })
        let fullIDList = []
        fullLanguageLecturerListasObj.forEach(element => {
            fullIDList.push(element.lecturerId)
        });
        const acceptedDays = getNextAcceptedDays(weekdays, startDate, numberofLessons)
        let lecturerList = [];
        await Promise.all(acceptedDays.map(async (days) => {
            const busyLecuter = await db.lecturer_timetable.findAll({
                where: {
                    date: days,
                    shift: classShift,
                    approveStatus: ['Pending', 'Approved']
                },
                raw: true
            });
            if (busyLecuter.length > 0) {
                let busyArr = [];
                busyLecuter.forEach(element => {
                    busyArr.push(element.lecturerId);
                });
                busyArr.forEach(element => {
                    fullIDList = fullIDList.filter(item => item !== element);
                });
            }
        }))
        if (fullIDList.length === 0) {
            lecturerList = [];
        } else {
            lecturerList = await db.account_info.findAll({
                where: {
                    accountId: fullIDList
                }
            });
        }
        return lecturerList



    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

const fetchClassAttendance = async (data) => {
    try {
        const classId = data.classId
        const lecturerId = data.lecturerId
        return await db.class_attendance.findAll({
            where: {
                classId
            },
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            },
            include: {
                model: db.account_info,
                as: 'CAS',
                attributes: ['firstName', 'lastName'],
            },
            nest: true,
            order: [
                ['date', 'ASC']
            ]
        })
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

const CheckAttendance = async (data) => {
    try {
        const attendanceData = data.attendanceData
        await Promise.all(attendanceData.map(async (item, index) => {
            const selectedSection = await db.class_attendance.findOne({
                where: {
                    studentId: item.studentId,
                    classId: item.classId,
                    date: item.date
                }
            })
            const selectedAcademic = await db.academic_transcript.findOne({
                where: {
                    classId: item.classId,
                    studentId: item.studentId
                }
            })
            await selectedAcademic.update({
                attendanceRate: item.percent
            })
            await selectedSection.update({
                status: item.status
            })
        }))
        return attendanceData
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

const fetchClassAcademicTranscript = async (data) => {
    try {
        const classId = data.classId
        return await db.academic_transcript.findAll({
            where: {
                classId
            },
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            },
            include: {
                model: db.account_info,
                as: 'ATS',
                attributes: ['firstName', 'lastName'],
            },
            nest: true,
        })
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

const saveAcademicTranscript = async (data) => {

    try {
        const result = await sequelize.transaction(async (t) => {
            const transcriptData = data.transcriptData
            console.log(transcriptData);
            await Promise.all(transcriptData.map(async (item) => {
                const selectedSection = await db.academic_transcript.findOne({
                    where: {
                        studentId: item.studentId,
                        classId: item.classId
                    }
                })
                await selectedSection.update({
                    midTermTest: item.midTermTest,
                    finalTest: item.finalTest,
                    finalResult: item.finalResult,
                    status: item.status,
                }, {
                    transaction: t
                })
            }))
            return transcriptData
        })
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

const fetchAbsentRequest = async () => {
    try {
        return await db.student_absence_request.findAll({
            include: [
                {
                    model: db.class
                },
                {
                    model: db.account_info
                }
            ]
        })
    }
    catch (exception) {
        console.log(exception)
        return 'Error'
    }
}

module.exports = {
    fetchLecturerByLanguage,
    fetchClassAttendance,
    CheckAttendance,
    fetchClassAcademicTranscript,
    saveAcademicTranscript,
    fetchAbsentRequest
}