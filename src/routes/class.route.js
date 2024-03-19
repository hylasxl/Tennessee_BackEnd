import express from "express";
import classController from '../controller/class.controller'
import { checkJWTbyCookie, checkUserPermission } from '../middleware/JWTMethod'

const router = express.Router();



const initClassRoute = (app) => {

    router.post('/class/fetch-all-classes', classController.fetchAllClass)
    router.post('/class/send-new-class-request',checkJWTbyCookie,checkUserPermission,classController.sendNewClassRequest)
    router.get('/class/count-request',checkJWTbyCookie,checkUserPermission,classController.countRequest)
    router.post('/class/class-approve',checkJWTbyCookie,checkUserPermission,classController.classApprove)
    router.post('/class/fetch-class-student',checkJWTbyCookie,checkUserPermission,classController.fetchClassByStudent)
    router.post('/class/fetch-class-lecturer',checkJWTbyCookie,checkUserPermission,classController.fetchClassByLecturer)
    router.post('/class/fetch-class-schedule-by-id',checkJWTbyCookie,checkUserPermission,classController.fetchClassSchedule)
    router.put('/class/lecturer/approve-absent-request',checkJWTbyCookie,checkUserPermission,classController.approveAbsentRequest)
    return app.use("/api/", router);

}

export default initClassRoute;