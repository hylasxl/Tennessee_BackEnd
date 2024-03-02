import express, { application } from "express";
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

    router.get('/admin/get-all-account',checkJWTbyCookie, checkUserPermission,apiController.fetchAllUser)
    router.post('/admin/get-one-account',checkJWTbyCookie, checkUserPermission,apiController.fetchOneUser)
    router.post('/admin/course/approval',checkJWTbyCookie, checkUserPermission,apiController.courseApproval)

    router.get('/edu/get-all-course',checkJWTbyCookie, checkUserPermission,apiController.fetchAllCourse)
    router.post('/edu/create-course',checkJWTbyCookie,checkUserPermission,apiController.createCourse)
    router.get('/edu/get-all-class',checkJWTbyCookie,checkUserPermission,apiController.fetchAllClass)
    router.post('/get-account-by-type',checkJWTbyCookie,checkUserPermission,apiController.fetchAccountByType)

    router.get('/language/get-all-language',checkJWTbyCookie,checkUserPermission,apiController.getAllLanguages)

    return app.use("/api/", router);

}

export default initApis;