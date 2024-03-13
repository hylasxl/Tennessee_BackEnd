import express from "express";
import studentListController from '../controller/studentList.controller'
import { checkJWTbyCookie, checkUserPermission } from '../middleware/JWTMethod'

const router = express.Router();



const initStudentListRoute = (app) => {
    
    router.get('/student-list/fetch-all',checkJWTbyCookie,checkUserPermission,studentListController.fetchAllStudentAccountList)
    router.get('/student-list/count-request',checkJWTbyCookie,checkUserPermission,studentListController.countStudentRequest)
    router.post('/student-list/send-new-student-account-request', checkJWTbyCookie, checkUserPermission, studentListController.sendNewStudentAccountRequest)
    router.post('/student-list/student-approve',checkJWTbyCookie,checkUserPermission,studentListController.studentApprove)
    router.post('/student/fetch-by-class',checkJWTbyCookie,checkUserPermission,studentListController.fetchStudentByClass)
    router.post('/student/save-student',checkJWTbyCookie,checkUserPermission,studentListController.saveStudent)
    
    return app.use("/api/", router);

}

export default initStudentListRoute;