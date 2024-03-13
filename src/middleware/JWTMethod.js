import jwt from "jsonwebtoken";
require('dotenv').config();

const nonSecurePaths = ['/', '/account/login', '/account/logout']
const nonSecureURL = ['http://localhost:3000/login']

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET_KEY
    let token = null
    try {
        token = jwt.sign(payload, key, { expiresIn: '1d' })
    } catch (err) {
        console.log(err)
    }
    return token
}

const verifyToken = (token) => {
    
    let key = process.env.JWT_SECRET_KEY
    let decoded = null
    try {
        decoded = jwt.verify(token, key)
    } catch (e) {
        res.status(401).json({
            EC: 401,
            DT: '',
            EM: `Unauthorized user`
        })
    }
    return decoded
}

const checkJWTbyCookie = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) {
        return next()
    }
    let cookies = req.cookies
    if (cookies && cookies.jwt) {

        let token = cookies.jwt
        // console.log(token);
        try {
            let decoded = verifyToken(token)
            req.user = { ...decoded, token }
            return next()
        } catch (e) {
            res.status(401).json({
                EC: 401,
                DT: '',
                EM: `Unauthorized user`
            })
        }


    } else {
        res.status(401).json({
            EC: 401,
            DT: '',
            EM: `Unauthorized user`
        })
    }
}


const checkUserPermission = (req, res, next) => {

    if (nonSecurePaths.includes(req.path)) {
        next()
    }
    if (req.user) {
        let username = req.user.username
        let permission = req.user.userPermissions.permissions

        let currentURL = req.path

        if (!permission || permission.length === 0) {
            res.status(403).json({
                EC: 403,
                DT: '',
                EM: `You don't have permission to access this URL: ${currentURL}`
            })
        }
        // console.log(permission);
        let isAuthorized = false;
        try {
            isAuthorized = permission.some(item => item.url === currentURL)
        } catch {

            res.status(403).json({
                EC: 403,
                DT: '',
                EM: `You don't have permission to access this URL: ${currentURL}`
            })

        }

        if (isAuthorized === true) {
            return next()
        } else {
            res.status(401).json({
                EC: 401,
                DT: '',
                EM: `Unauthorized User`
            })
        }

    } else {
        return {
            EC: -1,
            DT: '',
            EM: "User is not authenticated"
        }
    }
}

module.exports = {
    createJWT, verifyToken, checkJWTbyCookie, checkUserPermission
}