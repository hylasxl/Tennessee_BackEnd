import express from "express";
import classShiftController from '../controller/classShift.controller'
import { checkJWTbyCookie, checkUserPermission } from '../middleware/JWTMethod'

const router = express.Router();

const initClassShiftRoute = (app) => {

    router.get('/class-shift/fetch-all-class-shift',checkJWTbyCookie,checkUserPermission,classShiftController.fetchAllClassShift)

    return app.use("/api/", router);

}

export default initClassShiftRoute;