import db from "../models/models/index";


const handleGetAllLanguages = async () => {
    try {

        const data = await db.language.findAll({
            raw: true,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        console.log(data);

        return data
    } catch (e) {
        console.log(e);
        return "Error"
    }
}

module.exports = {
    handleGetAllLanguages
}