import lecturerAccountListService from '../service/lecturerAccountListService'


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
        if (data === "Email or Phone has alreay in another request") {
            return res.status(200).json({
                EC: 2,
                EM: 'Email or Phone has alreay in another request',
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
const countLecturerRequest = async (req,res) => {
    try {
        const data = await lecturerAccountListService.countLecturerRequest()
        
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


const lecturerApprove = async (req,res)=>{
    try {

        const data = await lecturerAccountListService.lecturerApprove(req.body)
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


module.exports = {
    sendNewLecturerAccountRequest,
    fetchAllLecturerAccountList,
    countLecturerRequest,
    lecturerApprove
}