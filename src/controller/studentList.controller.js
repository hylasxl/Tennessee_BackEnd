import studentAccountListService from '../service/studentAccountListService'


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

const countStudentRequest = async (req,res) => {
    try {

        const data = await studentAccountListService.countStudentRequest()
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

const studentApprove = async (req,res) => {
    try {

        const data = await studentAccountListService.studentApprove(req.body)
        if (data === "Error") {
            return res.status(500).json({
                EC: -1,
                EM: 'An error has occured',
                DT: ''
            })
        } else {
            return res.status(200).json({
                EC: 1,
                EM: 'Approve successfully',
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

const fetchStudentByClass = async (req,res) => {
    try {
        const data = await studentAccountListService.fetchStudentByClass(req.body)
        if (data === "Error") {
            return res.status(500).json({
                EC: -1,
                EM: 'An error has occured',
                DT: ''
            })
        } else {
            return res.status(200).json({
                EC: 1,
                EM: 'Fetch successfully',
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



const saveStudent = async (req,res) => {
    try {
        const data = await studentAccountListService.saveStudent(req.body)
        if(data === "Max quantity reached"){
            return res.status(200).json({
                EC: 2,
                EM: 'Max quantity reached',
                DT: data
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
                EM: 'Fetch successfully',
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
    sendNewStudentAccountRequest,
    fetchAllStudentAccountList,
    countStudentRequest,
    studentApprove,
    fetchStudentByClass,
    saveStudent
}