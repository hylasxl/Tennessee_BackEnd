import db from "../models/models/index";
import { Op } from "sequelize";
import { stringToSlug } from "../utils/utils.function";
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from './loginService'

const sendNewLecturerAccountRequest = async (data) => {
    try {
        const checkDuplicate = await db.account_info.findAll({
            where: {
                [Op.or]: {
                    email: data.email,
                    phone: data.phone,
                },
            },
        })

        const constRequestDuplicate = await db.lecturer_account_providing_request.findAll({
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
        const addNewRequest = await db.lecturer_account_providing_request.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            dateofBirth: data.dateofBirth,
            gender: data.gender,
            approveStatus: 'Pending',
            confirmedBy: 0,
            requestCreatedBy: data.userId,
            languageId: data.language,
            academic_levelId: data.academicRank,
            address: data.address
        })
        return addNewRequest
    } catch (e) {
        return "ERROR"
    }
}

const fetchAllLecturerAccountList = async () => {
    try {
        const data = await db.lecturer_account_providing_request.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'confirmedBy', 'requestCreatedBy', 'academic_levelId', 'languageId', 'languageID']
            },
            include: [
                {
                    model: db.account_info,
                    as: "LAPRByAccount",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                },
                {
                    model: db.account_info,
                    as: "LAPRConfirmedBy",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                },
                {
                    model: db.language,
                    as: "LAPRLanguage",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                },
                {
                    model: db.academic_level,
                    as: "LAPRAcademicRank",
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

const countLecturerRequest = async () => {
    try {
        return await db.lecturer_account_providing_request.count({
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

const lecturerApprove = async (data) => {
    try {
        
        if (data.approveType === "Approve") {
            const user = await db.lecturer_account_providing_request.findOne({
                where: {
                    'id': data.lecturerId
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
                accountTypeId: 3,
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
                    await db.lecturer_language.create({
                        lecturerId: account.id,
                        languageId: user.languageId
                    })
                    await db.lecturer_academic_level.create({
                        lecturerId: account.id,
                        academic_levelId: user.academic_levelId
                    })
                    
                })
                .then(async () => {
                    const user = await db.lecturer_account_providing_request.findOne({
                        where: {
                            'id': data.lecturerId
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
                .then(()=>{
                    return "Successfully"
                })
                }
        if (data.approveType === "Reject") {
                const user = await db.lecturer_account_providing_request.findOne({
                    where: {
                        'id': data.lecturerId
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

module.exports = {
    sendNewLecturerAccountRequest,
    fetchAllLecturerAccountList,
    countLecturerRequest,
    lecturerApprove
}