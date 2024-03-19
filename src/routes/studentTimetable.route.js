import express from "express";
import studentTimeTimebleController from '../controller/studentTimetable.controller'
import { checkJWTbyCookie, checkUserPermission } from '../middleware/JWTMethod'

const router = express.Router();



const initStudentTimeTableRoute = (app) => {
    
    router.post('/student-timetable/fetch-by-id',checkJWTbyCookie,checkUserPermission,studentTimeTimebleController.fetchStudentTimetable)
    
    return app.use("/api/", router);

}

export default initStudentTimeTableRoute;