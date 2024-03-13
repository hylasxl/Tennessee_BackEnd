import classShiftService from '../service/classShiftService'

const fetchAllClassShift = async (req,res)=>{
    try {
        const data = await classShiftService.fetchAllClassShift()
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot fetch class shifts',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch class shifts successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot fetch class shifts',
            DT: ''
        })
    }
}
module.exports = {
    fetchAllClassShift
}