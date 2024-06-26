const bcrypt = require('bcryptjs');
import { Op } from 'sequelize';
import db from '../models/models/index'
import {getAccountTypewPermissions} from './JWTService'
import {createJWT} from '../middleware/JWTMethod'


const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const checkPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password,hashedPassword);
}

const userLogin = async (rawData) => {
    try {
        console.log(hashPassword("edu"))
        let user = await db.account.findOne({where: {username : rawData.username}})
        const dbPassword = user.dataValues.password
        if (user) {
            let isCorrectPassword = checkPassword(rawData.password, dbPassword);
            if(isCorrectPassword){
                const userPermissions = await getAccountTypewPermissions(user.dataValues);
                const userData = await db.account_info.findOne({where :{accountId:user.dataValues.id}})
                let payload = {
                    username: user.dataValues.username,
                    userPermissions,
                    userId: user.dataValues.id,
                    userData
                }
                const token = createJWT(payload)
                // console.log(token);
                return {
                    EM: "Successfully",
                    EC: "1",
                    DT: {
                        token,
                        username: user.dataValues.username,
                        user:{
                            userPermissions,
                            userId: user.dataValues.id,
                            userData
                        }
                        
                    }
                    
                }
            }
                else {
                    return {
                        EM: "Incorrect Password",
                        EC: "-1",
                        DT: "",
                        ID: ""
                    }
                }
            
        } else {
            return {
                EM: "User not found",
                EC: "-1",
                DT: "",
                ID: ''
            }
        }
    } catch(e) {
            return {
                EM: "User not found",
                EC: "-1",
                DT: "",
                ID: ''
            }
    }
    // console.log(rawData);
}

module.exports = {userLogin,checkPassword,hashPassword}