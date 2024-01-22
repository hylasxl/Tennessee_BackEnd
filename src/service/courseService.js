import { raw } from "body-parser";
import db from "../models/models/index"

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

        console.log(plainData);

        return data
    } catch (e) {
        console.log(e);
        return "Error"
    }
}

module.exports = {
    fetchAllCourses
}