import express from "express";
import classController from '../controller/class.controller'
import { checkJWTbyCookie, checkUserPermission } from '../middleware/JWTMethod'

const router = express.Router();



const initClassRoute = (app) => {

    router.post('/class/fetch-all-classes', checkJWTbyCookie, checkUserPermission, classController.fetchAllClass)
    router.post('/class/send-new-class-request',checkJWTbyCookie,checkUserPermission,classController.sendNewClassRequest)
    router.get('/class/count-request',checkJWTbyCookie,checkUserPermission,classController.countRequest)
    router.post('/class/class-approve',checkJWTbyCookie,checkUserPermission,classController.classApprove)
    router.post('/class/fetch-class-student',checkJWTbyCookie,checkUserPermission,classController.fetchClassByStudent)
    return app.use("/api/", router);

}

export default initClassRoute;