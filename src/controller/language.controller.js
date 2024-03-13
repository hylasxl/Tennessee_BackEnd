import languageService from '../service/languageService'




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

module.exports = {
    getAllLanguages
}