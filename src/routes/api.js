import express, { application } from "express";
import apiController from "../controller/apiController"
import { checkJWTbyCookie, checkUserPermission } from '../middleware/JWTMethod'
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: 'uploads/' })



const initApis = (app) => {

    router.post("/account/login", apiController.handleLogin)
    router.post("/account/logout", apiController.handleLogout)

    router.post('/account/fetch-user-data', checkJWTbyCookie, checkUserPermission, apiController.getOneUserData)
    router.get('/account/fetch-user-account', checkJWTbyCookie, checkUserPermission, apiController.getOneUserAccount)
    router.put('/account/update-user-data', checkJWTbyCookie, checkUserPermission, apiController.updateUserData)
    router.put('/account/account-update-password', checkJWTbyCookie, checkUserPermission, apiController.changePassword)
    router.get('/account/fetch-all-accounts', checkJWTbyCookie, checkUserPermission, apiController.fetchAllUser)
    router.post('/account/fetch-one-account', checkJWTbyCookie, checkUserPermission, apiController.fetchOneUser)
    router.post('/account/get-account-by-type', checkJWTbyCookie, checkUserPermission, apiController.fetchAccountByType)
    router.post('/account/send-new-student-account-request', checkJWTbyCookie, checkUserPermission, apiController.sendNewStudentAccountRequest)
    router.post('/account/send-new-lecturer-account-request', checkJWTbyCookie, checkUserPermission, apiController.sendNewLecturerAccountRequest)

    router.post('/course/course-approval', checkJWTbyCookie, checkUserPermission, apiController.courseApproval)
    router.get('/course/fetch-all-courses', checkJWTbyCookie, checkUserPermission, apiController.fetchAllCourse)
    router.post('/course/create-course', checkJWTbyCookie, checkUserPermission, upload.single('image'), apiController.createCourse)

    router.get('/class/fetch-all-classes', checkJWTbyCookie, checkUserPermission, apiController.fetchAllClass)

    router.get('/room/fetch-all-rooms', checkJWTbyCookie, checkUserPermission, apiController.fetchAllRooms)

    router.get('/language/fetch-all-languages', checkJWTbyCookie, checkUserPermission, apiController.getAllLanguages)

    router.get('/student-account-list/fetch-all',checkJWTbyCookie,checkUserPermission,apiController.fetchAllStudentAccountList)

    router.get('/lecturer-account-list/fetch-all',checkJWTbyCookie,checkUserPermission,apiController.fetchAllLecturerAccountList)

    router.get('/academic-rank/fetch-all-academic-ranks', checkJWTbyCookie, checkUserPermission, apiController.fetchAllAcademicRanks)

    return app.use("/api/", router);

}

export default initApis;