import express from "express";
import lecturerController from '../controller/lecturer.controller'
import { checkJWTbyCookie, checkUserPermission } from '../middleware/JWTMethod'

const router = express.Router();



const initLecturerRoute = (app) => {
    
    router.post('/lecturer/fetch-lecturer-by-language', checkJWTbyCookie, checkUserPermission, lecturerController.fetchLecturerByLanguage)
    router.post('/lecturer/fetch-class-attendance',checkJWTbyCookie,checkUserPermission,lecturerController.fetchClassAttendance)
    router.post('/lecturer/fetch-class-academic-transcipt',checkJWTbyCookie,checkUserPermission,lecturerController.fetchClassAcademicTranscript)
    router.put('/lecturer/check-attendance',checkJWTbyCookie,checkUserPermission,lecturerController.CheckAttendance)
    router.put('/lecturer/save-academic-transcript',checkJWTbyCookie,checkUserPermission,lecturerController.saveAcademicTranscript)
    router.get('/lecturer/fetch-absent-request',checkJWTbyCookie,checkUserPermission,lecturerController.fetchAbsentRequest)
    return app.use("/api/", router);

}

export default initLecturerRoute;