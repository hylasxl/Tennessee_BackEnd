import express from "express";
import courseController from '../controller/course.controller'
import { checkJWTbyCookie, checkUserPermission } from '../middleware/JWTMethod'
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: 'uploads/' })



const initCourseRoute = (app) => {

    router.post('/course/course-approval', checkJWTbyCookie, checkUserPermission, courseController.courseApproval)
    router.get('/course/fetch-all-courses', checkJWTbyCookie, checkUserPermission, courseController.fetchAllCourse)
    router.post('/course/create-course', checkJWTbyCookie, checkUserPermission, upload.single('image'), courseController.createCourse)
    router.post('/course/fetch-course-by-language',checkJWTbyCookie,checkUserPermission,courseController.fetchCourseByLanguage)
    router.get('/course/fetch-course-request',checkJWTbyCookie,checkUserPermission,courseController.countCourseRequest)
    

    return app.use("/api/", router);

}

export default initCourseRoute;