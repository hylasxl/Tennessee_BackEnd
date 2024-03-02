import db from "../models/models/index"
import { sequelize } from "../models/models/index";

const fetchAllCourses = async () => {
    try {

        const data = await db.course.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'languageID', 'createdBy', 'approvedBy', 'imageId']
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
            order: [
                [db.lesson, 'orderofLesson', 'ASC']
            ],
            nest: true,
        })
        const plainData = data.map(item => item.get({ plain: true }));
        return data
    } catch (e) {
        console.log(e);
        return "Error"
    }
}

const handleCreateCourse = async (data) => {
    try {
        data.lesson = JSON.parse(data.lesson)
        const insertId = await db.course.max('id')
        const initStatus = "Pending"
        let lessonArr = []
        for (let index = 0; index < data.lesson.length; index++) {
            const description = data.lesson.description || "No description"
            const order = data.lesson[index].id
            const name = data.lesson[index].data
            lessonArr.push({
                courseId: insertId,
                orderofLesson: order,
                lessonName: name,
                lessonDuration: "0" + data.durationofLesson + ":00:00",
                createdBy: +data.userId,
                description: description
            })
        }

        data.description = data.description || "No description"

        sequelize.transaction(async (t) => {
            const insert = await db.course.create({
                courseName: data.courseName,
                languageId: data.language,
                duration: data.duration + ":00:00",
                durationofEachLesson: data.durationofLesson + ":00:00",
                price: data.price,
                createdBy: data.userId,
                approvedBy: +JSON.stringify(0),
                approveStatus: initStatus,
                description: data.description,
                lessons: lessonArr
            }, {
                include: [db.lesson],
                transaction: t
            })
        })


    } catch (e) {
        console.log(e);
        return "ERROR"
    }
}

const courseApproval = async (data) => {
    try {
        const thisCourse = await db.course.findOne({ where: { id: data.id } })
        const updateData = await thisCourse.update({approveStatus: data.status, approvedBy: data.approveId})
        return updateData
    } catch (e) {
        console.log(e);
        return "ERROR"
    }
}

module.exports = {
    fetchAllCourses,
    handleCreateCourse,
    courseApproval
}