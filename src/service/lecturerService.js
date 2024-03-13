import db from "../models/models";
import { getNextAcceptedDays } from "../utils/utils.function";
import { Op } from "sequelize";

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
        console.log(acceptedDays);
        let lecturerList = [];
        await Promise.all(acceptedDays.map(async (days) => {
            const busyLecuter = await db.lecturer_timetable.findAll({
                where: {
                    date: days,
                    shift: classShift,
                    approveStatus: ['Pending','Approved']
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
module.exports = {
    fetchLecturerByLanguage
}