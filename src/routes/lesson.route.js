import express from "express";
import lessonController from '../controller/lesson.controller'
import { checkJWTbyCookie, checkUserPermission } from '../middleware/JWTMethod'

const router = express.Router();



const initLessonRoute = (app) => {
    
    router.post('/lesson/fetch-lesson-by-course', checkJWTbyCookie, checkUserPermission, lessonController.fetchLessonByCourse)
    return app.use("/api/", router);

}

export default initLessonRoute;