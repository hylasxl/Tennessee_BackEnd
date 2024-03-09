import db from "../models/models/index";
import { Op } from "sequelize";

const sendNewStudentAccountRequest = async (data) => {
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

        const addNewRequest = await db.student_account_providing_request.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            dateofBirth: data.dateofBirth,
            gender: data.gender,
            approveStatus: 'Pending',
            confirmedBy: 0,
            requestCreatedBy: data.userId
        })
        return addNewRequest
    } catch (e) {
        return "ERROR"
    }
}

const fetchAllStudentAccountList = async () =>{
    try {
        const data = await db.student_account_providing_request.findAll({
            attributes: {
                exclude: ['createdAt','updatedAt','confirmedBy','requestCreatedBy']
            },
            include:[
                {
                    model: db.account_info,
                    as: "SCPRByAccount",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                },
                {
                    model: db.account_info,
                    as: "SCPRConfirmedBy",
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
    sendNewStudentAccountRequest,
    fetchAllStudentAccountList
}