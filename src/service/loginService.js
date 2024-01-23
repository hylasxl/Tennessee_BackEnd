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
        
        let user = await db.account.findOne({where: {username : rawData.username}})
        // console.log(user);
        const dbPassword = user.dataValues.password
        // console.log(dbPassword);
        if (user) {
            // console.log(user.dataValues);
            let isCorrectPassword = checkPassword(rawData.password, dbPassword);
            if(isCorrectPassword){
                console.log("Success");
                
                const userPermissions = await getAccountTypewPermissions(user.dataValues);
                // console.log(userPermissions);
                // console.log(user.dataValues.id);
                const userData = await db.account_info.findOne({where :{accountId:user.dataValues.id}})
                // console.log(userData);
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
                    console.log("Incorrect Password");
                    return {
                        EM: "Incorrect Password",
                        EC: "-1",
                        DT: "",
                        ID: ""
                    }
                }
            
        } else {
            console.log("User not found -1")
            return {
                EM: "User not found",
                EC: "-1",
                DT: "",
                ID: ''
            }
        }
    } catch(e) {
            console.log("User not found -2")
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