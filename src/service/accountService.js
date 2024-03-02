import db from '../models/models/index'
import { checkPassword, hashPassword } from './loginService'

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
        let data = await user.update(
            {
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
        return "Error";
    }
}

const changePassword = async (reqData) => {
    try {
        const user = await db.account.findOne({ where: { username: reqData.username } })
        console.log(user.dataValues);
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
        return "Error";
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
        return "Error"
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
        return "Error"
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

module.exports = {
    getOneUserData,
    updateData,
    changePassword,
    fetchAllUserData,
    fetchOneUserData,
    fetchAccountByType
}