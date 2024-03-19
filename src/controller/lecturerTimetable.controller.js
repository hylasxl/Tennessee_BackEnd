import lecturerTimeTableService from '../service/lecturerTimeTableService'

const fetchLecturerTimetable = async (req,res) => {
    const data = await lecturerTimeTableService.fetchLecturerTimetable(req.body)
    try {
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
    fetchLecturerTimetable
}