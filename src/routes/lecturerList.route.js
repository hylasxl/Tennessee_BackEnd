import express from "express";
import lecturerListController from '../controller/lecturerList.controller'
import { checkJWTbyCookie, checkUserPermission } from '../middleware/JWTMethod'

const router = express.Router();



const initLecturerListRoute = (app) => {

    router.post('/lecturer-list/send-new-lecturer-account-request', checkJWTbyCookie, checkUserPermission, lecturerListController.sendNewLecturerAccountRequest)
    router.get('/lecturer-list/count-request', checkJWTbyCookie, checkUserPermission, lecturerListController.countLecturerRequest)
    router.get('/lecturer-list/fetch-all',checkJWTbyCookie,checkUserPermission,lecturerListController.fetchAllLecturerAccountList)
    router.post('/lecturer-list/lecturer-approve',checkJWTbyCookie,checkJWTbyCookie,lecturerListController.lecturerApprove)

    return app.use("/api/", router);

}

export default initLecturerListRoute;