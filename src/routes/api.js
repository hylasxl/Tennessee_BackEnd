import express from "express";
import apiController from "../controller/apiController"
import { checkJWTbyCookie, checkUserPermission } from '../middleware/JWTMethod'


const router = express.Router();




const initApis = (app) => {

    router.post("/login", apiController.handleLogin)
    router.post("/logout", apiController.handleLogout)

    router.post('/user/getdata', checkJWTbyCookie, checkUserPermission, apiController.getOneUserData)
    router.get('/user/getaccount', checkJWTbyCookie, checkUserPermission, apiController.getOneUserAccount)
    router.put('/user/update', checkJWTbyCookie, checkUserPermission, apiController.updateUserData)
    router.put('/user/changepassword', checkJWTbyCookie, checkUserPermission, apiController.changePassword )

    return app.use("/api/", router);

}

export default initApis;