import db from '../models/models/index'
import { getAccountTypewPermissions } from '../service/JWTService'
import { createJWT } from '../middleware/JWTMethod'

import loginService from '../service/loginService'
import accountService from '../service/accountService'
import courseService from '../service/courseService'
import languageService from '../service/languageService'
import classService from '../service/classService'
import roomService from '../service/roomService'
import academicRankService from '../service/academicRankService'
import lecturerAccountListService from '../service/lecturerAccountListService'
import studentAccountListService from '../service/studentAccountListService'

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
        const userPermissions = await getAccountTypewPermissions({ accountTypeId: req.body.accountTypeId })
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


const fetchAllCourse = async (req, res) => {
    try {

        const data = await courseService.fetchAllCourses()
        // console.log(data);
        // console.log(new Set(data));
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot fetch course',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch course successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot fetch course',
            DT: ''
        })
    }
}

const getAllLanguages = async (req, res) => {
    try {

        const data = await languageService.handleGetAllLanguages()
        // console.log(data);
        // console.log(new Set(data));
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot fetch course',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch course successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot fetch course',
            DT: ''
        })
    }
}

const createCourse = async (req, res) => {
    try {
        const data = await courseService.handleCreateCourse(req)
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot create course',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Create course successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot create course',
            DT: ''
        })
    }
}

const courseApproval = async (req, res) => {
    try {
        const data = await courseService.courseApproval(req.body)
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: '',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: '',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Error occured',
            DT: ''
        })
    }
}

const fetchAllClass = async (req, res) => {
    try {
        const data = await classService.fetchAllClass()
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot fetch classes',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch classes successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot fetch classes',
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

const fetchAllRooms = async (req, res) => {
    try {
        const data = await roomService.fetchAllRooms()

        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot fetch rooms',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch rooms successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot fetch rooms',
            DT: ''
        })
    }
}

const fetchAllAcademicRanks = async (req, res) => {
    try {
        const data = await academicRankService.fetchAllAcademicRanks()

        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot fetch academic ranks',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch academic ranks successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot fetch academic ranks',
            DT: ''
        })
    }
}

const sendNewStudentAccountRequest = async (req, res) => {
    try {

        const data = await studentAccountListService.sendNewStudentAccountRequest(req.body)
        if (data === "Email or Phone has already in use") {
            return res.status(200).json({
                EC: 2,
                EM: 'Email or Phone has already in use',
                DT: ''
            })
        }
        if (data === "Error") {
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

const sendNewLecturerAccountRequest = async (req, res) => {
    try {
        const data = await lecturerAccountListService.sendNewLecturerAccountRequest(req.body)
        if (data === "Email or Phone has already in use") {
            return res.status(200).json({
                EC: 2,
                EM: 'Email or Phone has already in use',
                DT: ''
            })
        }
        if (data === "Error") {
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

const fetchAllLecturerAccountList = async (req,res) => {
    try {
        const data = await lecturerAccountListService.fetchAllLecturerAccountList()
        
        if (data === "Error") {
            return res.status(500).json({
                EC: -1,
                EM: 'An error has occured',
                DT: ''
            })
        } else {
            return res.status(200).json({
                EC: 1,
                EM: 'Fetch data successfully',
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

const fetchAllStudentAccountList = async (req,res) => {
    try {

        const data = await studentAccountListService.fetchAllStudentAccountList()
        if (data === "Error") {
            return res.status(500).json({
                EC: -1,
                EM: 'An error has occured',
                DT: ''
            })
        } else {
            return res.status(200).json({
                EC: 1,
                EM: 'Fetch data successfully',
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
    getOneUserData,
    getOneUserAccount,
    handleLogout,
    updateUserData,
    changePassword,
    fetchAllUser,
    fetchOneUser,
    fetchAllCourse,
    getAllLanguages,
    createCourse,
    courseApproval,
    fetchAllClass,
    fetchAccountByType,
    fetchAllRooms,
    fetchAllAcademicRanks,
    sendNewStudentAccountRequest,
    sendNewLecturerAccountRequest,
    fetchAllLecturerAccountList,
    fetchAllStudentAccountList
}