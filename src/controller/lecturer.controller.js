import lecturerService from '../service/lecturerService'

const fetchLecturerByLanguage = async (req, res) => {
    try {

        const data = await lecturerService.fetchLecturerByLanguage(req.body)
        if (data === 0) data = []
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot fetch lecturer by language',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch lecturer by language successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot fetch lecturer by language',
            DT: ''
        })
    }
}

const fetchClassAttendance = async (req, res) => {
    try {

        const data = await lecturerService.fetchClassAttendance(req.body)
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot fetch class attendance',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch class attendance successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot fetch class attendance',
            DT: ''
        })
    }
}

const CheckAttendance = async (req, res) => {
    try {

        const data = await lecturerService.CheckAttendance(req.body)
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot check attendance',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Check attendance successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot check attendance',
            DT: ''
        })
    }
}

const fetchClassAcademicTranscript = async (req, res) => {
    try {

        const data = await lecturerService.fetchClassAcademicTranscript(req.body)
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot Fetch Academic Transcript',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch Academic Transcript successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot Fetch Academic Transcript',
            DT: ''
        })
    }
}

const saveAcademicTranscript = async (req, res) => {
    try {
        
        const data = await lecturerService.saveAcademicTranscript(req.body)
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot Save Academic Transcript',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Save Academic Transcript successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot Save Academic Transcript',
            DT: ''
        })
    }
}
const fetchAbsentRequest = async (req, res) => {
    try {
        
        const data = await lecturerService.fetchAbsentRequest()
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot Fetch Absent Request Transcript',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch Absent Request Transcript successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot Fetch Absent Request Transcript',
            DT: ''
        })
    }
}



module.exports = {
    fetchLecturerByLanguage,
    fetchClassAttendance,
    CheckAttendance,
    fetchClassAcademicTranscript,
    saveAcademicTranscript,
    fetchAbsentRequest
}