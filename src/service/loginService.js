const bcrypt = require('bcryptjs');
import { Op } from 'sequelize';
import db from '../models/models'


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
        let user = await db.accounts.findOne({where: {username : rawData.username}})
        const dbPassword = user.dataValues.password
        
        if (user) {
            let isCorrectPassword = checkPassword(rawData.password, dbPassword);
            if(isCorrectPassword){
                console.log("Success");
                return {
                    EM: "Successfully",
                    EC: "1",
                    DT: ""
                }
            }
                else {
                    console.log("Incorrect Password");
                    return {
                        EM: "Incorrect Password",
                        EC: "-1",
                        DT: ""
                    }
                }
            
        } else {
            console.log("User not found")
            return {
                EM: "User not found",
                EC: "-1",
                DT: ""
            }
        }
    } catch(e) {
            console.log("User not found")
            return {
                EM: "User not found",
                EC: "-1",
                DT: ""
            }
    }
    // console.log(rawData);
}

module.exports = {userLogin}