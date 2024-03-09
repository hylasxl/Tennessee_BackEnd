import db from "../models/models/index";
import { Op } from "sequelize";
const sendNewLecturerAccountRequest = async (data) => {
    try {
        const checkDuplicate = await db.account_info.findAll({
            where: {
                [Op.or]: {
                    email: data.email,
                    phone: data.phone,
                },
            },
        })
        
        if(checkDuplicate && checkDuplicate.length > 0){
            return "Email or Phone has already in use"
        }
        console.log(data);
        const addNewRequest = await db.lecturer_account_providing_request.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            dateofBirth: data.dateofBirth,
            gender: data.gender,
            approveStatus: 'Pending',
            confirmedBy: 0,
            requestCreatedBy: data.userId,
            languageId: data.language,
            academic_levelId: data.academicRank
        })
        return addNewRequest
    } catch (e) {
        return "ERROR"
    }
}

const fetchAllLecturerAccountList = async () =>{
    try {
        const data = await db.lecturer_account_providing_request.findAll({
            attributes: {
                exclude: ['createdAt','updatedAt','confirmedBy','requestCreatedBy','academic_levelId','languageId','languageID']
            },
            include:[
                {
                    model: db.account_info,
                    as: "LAPRByAccount",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                },
                {
                    model: db.account_info,
                    as: "LAPRConfirmedBy",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                },
                {
                    model: db.language,
                    as: "LAPRLanguage",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                },
                {
                    model: db.academic_level,
                    as: "LAPRAcademicRank",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                },
            ]
        })
        return data
    } catch (e) {
        console.log(e)
        return "ERROR"
    }
}

module.exports = {
    sendNewLecturerAccountRequest,
    fetchAllLecturerAccountList
}