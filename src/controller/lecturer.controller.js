import lecturerService from '../service/lecturerService'

const fetchLecturerByLanguage = async (req, res) => {
    try {

        const data = await lecturerService.fetchLecturerByLanguage(req.body)
        if (data === 0) data = []
        console.log(data);
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



module.exports = {
    fetchLecturerByLanguage
}