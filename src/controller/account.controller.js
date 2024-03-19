import accountService from '../service/accountService'
import loginService from '../service/loginService'
import { getAccountTypewPermissions } from '../service/JWTService'
import db from '../models/models/index'
import { createJWT } from '../middleware/JWTMethod'

const handleLogin = async (req, res) => {
    try {
        let data = await loginService.userLogin(req.body)
        res.cookie('jwt', data.DT.token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (e) {
        return res.status(500).json({
            EM: "An error has occured",
            EC: '-1',
            DT: ''
        })
    }
}

const handleLogout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({
            EM: 'Logout Success',
            EC: 1,
            DT: '',
        })
    } catch (e) {
        return res.status(500).json({
            EM: "An error has occured",
            EC: '-1',
            DT: ''
        })
    }
}


const getOneUserData = async (req, res) => {
    try {
        let data = await accountService.getOneUserData(req.body.userID)
        return res.status(200).json({
            data
        })
    } catch (e) {
        return res.status(500).json({
            EM: "An error has occured",
            EC: 500,
            DT: ''
        })
    }
}


const getOneUserAccount = async (req, res) => {
    try {

        const data = req.user;
        // console.log(data);
        const returnedData = {
            token: data.token,
            username: data.username,
            iat: data.iat,
            exp: data.exp,
            user: {
                userId: data.userId,
                userPermissions: data.userPermissions,
                userData: data.userData
            }
        }
        return res.status(200).json({
            EC: 1,
            EM: 'OK',
            DT: returnedData
        })
    } catch (e) {
        return res.status(500).json({
            EC: 500,
            EM: 'Error',
            DT: ''
        })
    }
}


const updateUserData = async (req, res) => {
    try {

        let data = await accountService.updateData(req.body)
        const userData = await db.account_info.findOne({ where: { accountId: req.body.userId } })
        const userPermissions = await getAccountTypewPermissions(req.body)
        let payload = {
            username: req.body.username,
            userPermissions,
            userId: req.body.userId,
            userData
        }

        const token = createJWT(payload)
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
        res.status(200).json({
            EC: 1,
            EM: 'Update successfully',
            DT: userData.dataValues
        })
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Update failed',
            DT: ''
        })
    }
}

const changePassword = async (req, res) => {
    try {
        const data = await accountService.changePassword(req.body)
        if (data === 1) {
            res.status(200).json({
                EC: 1,
                EM: 'Password is changed successfully',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 0,
                EM: 'Your current password is not correct',
                DT: ''
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Update failed',
            DT: ''
        })
    }
}

const fetchAllUser = async (req, res) => {
    try {
        const data = await accountService.fetchAllUserData()
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot fetch user',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch user successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot fetch user',
            DT: ''
        })
    }
}


const fetchOneUser = async (req, res) => {
    try {
        const username = req.body.username
        const data = await accountService.fetchOneUserData(username)
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot fetch user',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch user successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot fetch user',
            DT: ''
        })
    }
}

const fetchAccountByType = async (req, res) => {
    try {
        const data = await accountService.fetchAccountByType(req.body)
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot fetch accounts',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch accounts successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot fetch accounts',
            DT: ''
        })
    }
}
const fetchAvatar = async (req, res) => {
    try {
        const data = await accountService.fetchAvatar(req.body)
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot fetch accounts',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch accounts successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot fetch accounts',
            DT: ''
        })
    }
}
const changeAvatar = async (req, res) => {
    try {
        const data = await accountService.changeAvatar(req)
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot Change avatar',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Change avatar successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot Change avatar',
            DT: ''
        })
    }
}

const addNewHighAccount = async (req, res) => {
    try {

        const data = await accountService.addNewHighAccount(req.body)
        if (data === "Email or Phone has already in use") {
            return res.status(200).json({
                EC: 2,
                EM: 'Email or Phone has already in use',
                DT: ''
            })
        }
        if (data === "Email or Phone has alreay in another request") {
            return res.status(200).json({
                EC: 2,
                EM: 'Email or Phone has alreay in another request',
                DT: ''
            })
        }
        if (data === "ERROR") {
            return res.status(500).json({
                EC: -1,
                EM: 'An error has occured',
                DT: ''
            })
        } else {
            return res.status(200).json({
                EC: 1,
                EM: 'Send request successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'An error has occured',
            DT: ''
        })
    }
}

const checkExistMailandPhone = async (req, res) => {
    try {

        const data = await accountService.checkExistMailandPhone(req.body)
        if (data === "ERROR") {
            return res.status(500).json({
                EC: -1,
                EM: 'An error has occured',
                DT: ''
            })
        } else {
            return res.status(200).json({
                EC: 1,
                EM: 'Check successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'An error has occured',
            DT: ''
        })
    }
}
const sendNewOtp = async (req, res) => {
    try {

        const data = await accountService.sendNewOtp(req.body)
        if (data === "ERROR") {
            return res.status(500).json({
                EC: -1,
                EM: 'An error has occured',
                DT: ''
            })
        } else {
            return res.status(200).json({
                EC: 1,
                EM: 'Check successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'An error has occured',
            DT: ''
        })
    }
}
const checkOtp = async (req, res) => {
    try {

        const data = await accountService.checkOtp(req.body)
        if (data === "ERROR") {
            return res.status(500).json({
                EC: -1,
                EM: 'An error has occured',
                DT: ''
            })
        } else {
            return res.status(200).json({
                EC: 1,
                EM: 'Check successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'An error has occured',
            DT: ''
        })
    }
}
const accountChangePassword = async (req, res) => {
    try {

        const data = await accountService.accountChangePassword(req.body)
        if (data === "ERROR") {
            return res.status(500).json({
                EC: -1,
                EM: 'An error has occured',
                DT: ''
            })
        } else {
            return res.status(200).json({
                EC: 1,
                EM: 'Check successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'An error has occured',
            DT: ''
        })
    }
}
const setENV = async (req, res) => {
    try {

        const data = await accountService.setENV()
        if (data === "ERROR") {
            return res.status(500).json({
                EC: -1,
                EM: 'An error has occured',
                DT: ''
            })
        } else {
            return res.status(200).json({
                EC: 1,
                EM: 'Check successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'An error has occured',
            DT: ''
        })
    }
}

module.exports = {
    handleLogin,
    handleLogout,
    fetchAllUser,
    fetchOneUser,
    getOneUserData,
    getOneUserAccount,
    changePassword,
    updateUserData,
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