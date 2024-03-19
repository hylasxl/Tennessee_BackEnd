import express from "express";
import lecturerTimeTableController from '../controller/lecturerTimetable.controller'
import { checkJWTbyCookie, checkUserPermission } from '../middleware/JWTMethod'

const router = express.Router();



const initLecturerTimeTableRoute = (app) => {
    
    router.post('/lecturer-timetable/fetch-by-id',checkJWTbyCookie,checkUserPermission,lecturerTimeTableController.fetchLecturerTimetable)
    
    return app.use("/api/", router);

}

export default initLecturerTimeTableRoute;