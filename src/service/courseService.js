import { log } from "console";
import db from "../models/models/index"
import { sequelize } from "../models/models/index";


const fs = require('fs');
const cloudinary = require('../config/cloudinary.config')

const fetchAllCourses = async () => {
    try {

        const data = await db.course.findAll({
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

// const handleCreateCourse = async (data) => {
//     try {

//         console.log(data);
//         data.lesson = JSON.parse(data.lesson)
//         const insertId = await db.course.max('id')
//         const initStatus = "Pending"
//         let lessonArr = []
//         for (let index = 0; index < data.lesson.length; index++) {
//             const description = data.lesson.description || "No description"
//             const order = data.lesson[index].id
//             const name = data.lesson[index].data
//             lessonArr.push({
//                 courseId: insertId,
//                 orderofLesson: order,
//                 lessonName: name,
//                 lessonDuration: "0" + data.durationofLesson + ":00:00",
//                 createdBy: +data.userId,
//                 description: description,

//             })
//         }

//         data.description = data.description || "No description"

//         sequelize.transaction(async (t) => {
//             const insert = await db.course.create({
//                 courseName: data.courseName,
//                 languageId: data.language,
//                 duration: data.duration + ":00:00",
//                 durationofEachLesson: data.durationofLesson + ":00:00",
//                 price: data.price,
//                 createdBy: data.userId,
//                 approvedBy: +JSON.stringify(0),
//                 approveStatus: initStatus,
//                 description: data.description,
//                 lessons: lessonArr,
//                 imageId: insertId + 1
//             }, {
//                 include: [db.lesson],
//                 transaction: t,
//             },
//             )
//         })

//     } catch (e) {
//         console.log(e);
//         return "ERROR"
//     }
// }

const handleCreateCourse = async (req) => {
    try {

        const data = JSON.parse(JSON.stringify(req.body));
        console.log(data);
        let imagePath = "Default"
        if (req && req.file && req.file.path) {
            imagePath = req.file.path
        }


        let defaultImgId = 0
        let insertCourseId = 0

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
                description: description,

            })
        }
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
                lessons: lessonArr,
                imageId: defaultImgId
            }, {
                include: [db.lesson],
                transaction: t,
            },
            ).then(course => {
                insertCourseId = course.id
            })
        })


        cloudinary.uploader.upload(imagePath, {
            folder: 'course_images'
        }, async (error, result) => {
            if (error) {
                await db.course_image.create({
                    imagePath: "DEFAULT"
                }).then(async (image) => {
                    const insertedCourse = await db.course.findOne({ where: { id: insertCourseId } })
                    await insertedCourse.update({
                        imageId: image.id
                    })
                }).then(() => {
                    return "Error Uploading Image"
                })
            } else {
                await db.course_image.create({
                    imagePath: result.url
                }).then(async (image) => {
                    const insertedCourse = await db.course.findOne({ where: { id: insertCourseId } })
                    await insertedCourse.update({
                        imageId: image.id
                    })
                }).then(() => {
                    fs.unlinkSync(imagePath);
                    return "Created Successfully"
                })

            }
            // console.log('Image URL:', result.url);
        })

    } catch (e) {
        console.log(e)
        return "ERROR"
    }
}

const courseApproval = async (data) => {
    try {
        const thisCourse = await db.course.findOne({ where: { id: data.id } })
        const updateData = await thisCourse.update({ approveStatus: data.status, approvedBy: data.approveId })
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