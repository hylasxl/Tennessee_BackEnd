import db from "../models/models/index";


const fetchAllAcademicRanks = async () => {
    try {
        const data = await db.academic_level.findAll({
            attributes: {
                exclude :['createdAt','updatedAt']
            }
        })
        const plainData = data.map(item => item.get({ plain: true }));
        return plainData
    } catch (e) {
        console.log(e);
        return "ERROR"
    }
}

module.exports = {
    fetchAllAcademicRanks
}