import db, { sequelize } from '../models/models/index'
import { checkPassword, hashPassword } from './loginService'
import { Op } from 'sequelize';
import { stringToSlug, addMinutesFromNow } from "../utils/utils.function";
import { v4 as uuidv4 } from 'uuid';
import { log } from 'console';

const transporter = require('../config/mailService.config')

const fs = require('fs');
const cloudinary = require('../config/cloudinary.config')

const getOneUserData = async (userID) => {
    const ID = userID;
    try {
        let data = await db.account_info.findOne({ where: { accountId: ID } })
        return data
    }
    catch (e) {
        console.log(e);
        return "ERROR";
    }
}

const updateData = async (reqData) => {
    try {
        let user = await db.account_info.findOne({ where: { accountId: reqData.userId } })
        let data = await user.update({
            firstName: reqData.firstName,
            lastName: reqData.lastName,
            phone: reqData.phone,
            gender: reqData.gender,
            dateofBirth: reqData.dateofBirth,
            address: reqData.address
        })
        return data
    } catch (e) {
        console.log(e);
        return "ERROR";
    }
}

const changePassword = async (reqData) => {
    try {
        const user = await db.account.findOne({ where: { username: reqData.username } })
        const userPassword = user.dataValues.password
        const oldPassword = reqData.oldPassword
        const newPassword = reqData.newPassword

        if (checkPassword(oldPassword, userPassword)) {
            const hashedPassword = hashPassword(newPassword)
            await user.update({
                password: hashedPassword
            })
            return 1;
        } else {
            return -1;
        }


    } catch (e) {
        console.log(e);
        return "ERROR";
    }
}

const fetchAllUserData = async () => {
    try {
        const userData = db.account.findAll({
            attributes: ['id', 'accountState', 'username'],
            include: [{
                model: db.account_info,
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            }, {
                model: db.accountType,
                attributes: ['id', 'typeName']
            }],
            nest: false
        },

        )
        return userData
    } catch (e) {
        return "ERROR"
    }
}

const fetchOneUserData = async (username) => {
    try {
        const userData = db.account.findOne({
            attributes: ['id', 'accountState', 'username'],
            where: { username: username },
            include: [{
                model: db.account_info,
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            }, {
                model: db.accountType,
                attributes: ['id', 'typeName']
            }],
        },

        )
        return userData
    } catch (e) {
        return "ERROR"
    }
}

const fetchAccountByType = async (reqData) => {
    try {
        let type = reqData.type
        if (type === "lecturer") type = 3
        if (type === "student") type = 4
        if (type === "admin") type = 1
        if (type === "edu") type = 2
        const data = db.account.findAll({
            attributes: ['id', 'accountState', 'username'],
            where: { accountTypeId: type },
            include: [{
                model: db.account_info,
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            }, {
                model: db.accountType,
                attributes: ['id', 'typeName']
            }],
            nest: false
        },)
        return data
    } catch (e) {
        console.log(e);
        return "ERROR"
    }
}

const fetchAvatar = async (data) => {
    try {
        const id = data.id
        return await db.account_info_image.findOne({
            where: {
                "id": id
            }
        })
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

const changeAvatar = async (data) => {
    try {
        const queryData = JSON.parse(JSON.stringify(data.body));
        const imgPath = data.file.path;
        const result = await sequelize.transaction(async (t) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload(imgPath, {
                    folder: 'account_images'
                }, async (ERROR, result) => {
                    if (ERROR) {
                        reject("Cannot upload image");
                    }
                    else {
                        const selectedAccount = await db.account_info_image.findOne({
                            where: {
                                'id': queryData.id
                            }
                        });
                        await selectedAccount.update({
                            imagePath: result.url
                        }).then(() => {
                            fs.unlinkSync(imgPath);
                            resolve("success");
                        });
                    }
                });
            });
        });
        return result;
    }
    catch (exception) {
        console.log(exception);
        return 'ERROR';
    }
};

const addNewHighAccount = async (data) => {
    try {
        const checkDuplicate = await db.account_info.findAll({
            where: {
                [Op.or]: {
                    email: data.email,
                    phone: data.phone,
                },
            },
        })

        if (checkDuplicate && checkDuplicate.length > 0) {
            return "Email or Phone has already in use"
        }

        const result = await sequelize.transaction(async (t) => {
            return new Promise(async (resolve, reject) => {
                let randomNumer, username, checkDuplicateUsername
                do {
                    randomNumer = Math.floor(Math.random() * 10000)
                    username = stringToSlug(data.firstName) + stringToSlug(data.lastName) + randomNumer
                    checkDuplicateUsername = await db.account.findAll({
                        where: {
                            username: username
                        }
                    })
                } while (checkDuplicateUsername.length > 0)
                const password = uuidv4()
                await db.account.create({
                    username: username,
                    password: hashPassword(password),
                    accountTypeId: data.accountType,
                    accountState: 'Accessbile'
                }, {
                    transaction: t
                })
                    .then(async (account) => {
                        await db.account_info.create({
                            'id': account.id,
                            accountId: account.id,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            dateofBirth: new Date(data.dateofBirth),
                            gender: data.gender,
                            phone: data.phone,
                            email: data.email,
                            address: data.address,
                            imageId: account.id
                        }, {
                            transaction: t
                        })
                        await db.account_info_image.create({
                            'id': account.id,
                            imagePath: 'DEFAULT'
                        }, {
                            transaction: t
                        })
                    })
                    .then(async () => {
                        await transporter.sendMail({
                            from: '"Tennessee Language Center" <tennesseelanguagecenter@gmail.com>',
                            to: data.email,
                            subject: "Account Approval",
                            html: `<h2>Your Account Has Been Approved</h2><br>
                        <h4>Here is your account infomation, you should change it later</h4><br>
                        <b>Username</b>: ${username}<br>
                        <b>Password</b>: ${password}`,
                        }, async (err, info) => {
                            if (err) {
                                await t.rollback()
                                reject()
                            }
                            else resolve()
                        })
                    })

            })
        })
        return result
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

const checkExistMailandPhone = async (data) => {
    try {
        const fetchData = await db.account_info.findOne({
            where: {
                email: data.email,
                phone: data.phone
            },
            raw: true
        })
        if (!fetchData) return 0
        else return (fetchData.accountId);
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

const sendNewOtp = async (data) => {
    try {
        const accountId = data.accountId
        const email = data.email
        const otp = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
        const result = await sequelize.transaction(async (t) => {
            return new Promise(async (resolve, reject) => {
                await transporter.sendMail({
                    from: '"Tennessee Language Center" <tennesseelanguagecenter@gmail.com>',
                    to: email,
                    subject: "OTP for Password Recovering",
                    html: `<h2>OTP Recovering</h2>
                <h4>Here is your account OTP which only lasts in 5 minutes</h4>
                <h4>Please do not share this code to anyone due to security policies</h4><br>
                <b>OTP</b>: ${otp}<br>,`
                }, async (err, info) => {
                    if (err) {
                        reject()
                    }
                    else {
                        await db.password_otp.create({
                            accountId: accountId,
                            otp: otp,
                            expiredAt: addMinutesFromNow(5),
                            status: "valid",
                        })
                        await db.password_otp.update(
                            { status: 'invalid' },
                            { where: { expiredAt: { [Op.lt]: new Date() } } }
                        )
                            .then(() => {
                                resolve()
                            })
                    }
                })
            })
        })
        return result
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

const checkOtp = async (data) => {
    try {
        const accountId = data.accountId
        const otp = data.otp
        const result = await db.password_otp.update(
            { status: 'invalid' },
            { where: { expiredAt: { [Op.lt]: new Date() } } }
        )
            .then(async () => {
                const isExisted = await db.password_otp.findOne({
                    where: {
                        accountId,
                        otp,
                        status: 'valid'
                    }
                })
                if (await isExisted) return 1
                else return 0
            })
        return result
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

const accountChangePassword = async (data) => {
    try {
        const hashedPassword = hashPassword(data.password)
        return await db.account.update({
            password: hashedPassword
        }, {
            where: {
                'id': data.accountId
            }
        })
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}


const setENV = async () => {
    try {
        const classIds = await db.class.findAll({
            attributes: ['id'],
            raw: true
        })
        classIds.forEach(async (item) => {
            const id = item.id

            const classSchedule = await db.class_schedule.findAll({
                attributes: ['date'],
                where: {
                    classId: id
                },
                raw: true
            })
            if (classSchedule.length > 0) {
                const endDate = new Date(classSchedule[classSchedule.length - 1].date)
                const startDate = new Date(classSchedule[0].date)
                if (endDate < new Date()) {
                    await db.class.update({
                        operatingStatus: 'Completed'
                    }, {
                        where: {
                            approveStatus: 'Approved',
                            'id': id,
                        }
                    })
                }
                if (startDate > new Date()) {
                    
                    await db.class.update({
                        operatingStatus: 'Incoming'
                    }, {
                        where: {
                            approveStatus: 'Approved',
                            'id': id,
                        }
                    })

                }
                if (startDate <= new Date() && endDate >= new Date()) {
                    await db.class.update({
                        operatingStatus: 'Operating'
                    }, {
                        where: {
                            approveStatus: 'Approved',
                            'id': id,
                        }
                    })
                }
            }
        })
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

module.exports = {
    getOneUserData,
    updateData,
    changePassword,
    fetchAllUserData,
    fetchOneUserData,
    fetchAccountByType,
    fetchAvatar,
    changeAvatar,
    addNewHighAccount,
    checkExistMailandPhone,
    sendNewOtp,
    checkOtp,
    accountChangePassword,
    setENV
}