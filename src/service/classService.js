import db from "../models/models/index";


const fetchAllClass = async () => {
    try {
        const data = await db.class.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'courseId', 'lecturerId']
            },
            include: [
                {
                    model: db.course,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: db.account_info,
                    as: 'lecturerByAccount',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },

            ],
            nest: true
        })



        const plainData = data.map(item => item.get({ plain: true }));

        return data
    } catch (e) {
        console.log(e);
        return "ERROR"
    }
}

module.exports = {
    fetchAllClass
}