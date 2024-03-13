import academicRankService from '../service/academicRankService'


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

module.exports = {
    fetchAllAcademicRanks
}