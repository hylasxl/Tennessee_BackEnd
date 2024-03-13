import db from "../models/models/index";

const fetchAllClassShift = async () => {
    try {
        const data = await db.class_shift.findAll({})
        return data
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

module.exports = {
    fetchAllClassShift
}