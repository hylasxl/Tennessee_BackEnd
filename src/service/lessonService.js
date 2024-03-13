import db from "../models/models/index";

const fetchLessonByCourse = async (courseId) => {
    try {
        const data = db.lesson.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'courseId', 'createdBy']
            },
            where: {
                courseId: courseId
            },
            include: [
                {
                    model: db.account_info,
                    as: 'lessonCreatedBy',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                },
                {
                    model: db.course,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                }
            ]
        })
        return data
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}
module.exports = {
    fetchLessonByCourse
}