
import classService from '../service/classService'

const fetchAllClass = async (req, res) => {
    try {
        const data = await classService.fetchAllClass(req.body.type)
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

const sendNewClassRequest = async (req, res) => {
    try {
        const data = await classService.sendNewClassRequest(req.body)
        if(data==="isDuplicated"){
            res.status(200).json({
                EC: 2,
                EM:'Class name duplicated',
                DT:''
            })
            return
        }
        if (data === "ERROR") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot Send new class request',
                DT: ''
            })
            return
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Send new class request successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot Send new class request',
            DT: ''
        })
    }
}

const countRequest = async (req, res) => {
    try {
        const data = await classService.countRequest(req.body)
        if (data === "ERROR") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot Count class request',
                DT: ''
            })
            return
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Count class request successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot Send new class request',
            DT: ''
        })
    }
}

const classApprove = async (req, res) => {
    try {
        const data = await classService.classApprove(req.body)
        if (data === "ERROR") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot Approve',
                DT: ''
            })
            return
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Approve successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot approve',
            DT: ''
        })
    }
}


const fetchClassByStudent = async (req, res) => {
    try {
        const data = await classService.fetchClassByStudent(req.body)
        if (data === "ERROR") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot Approve',
                DT: ''
            })
            return
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot approve',
            DT: ''
        })
    }
}




module.exports = {
    fetchAllClass,
    sendNewClassRequest,
    countRequest,
    classApprove,
    fetchClassByStudent
}