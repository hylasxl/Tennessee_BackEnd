import express from "express";
import lecturerController from '../controller/lecturer.controller'
import { checkJWTbyCookie, checkUserPermission } from '../middleware/JWTMethod'

const router = express.Router();



const initLecturerRoute = (app) => {
    
    router.post('/lecturer/fetch-lecturer-by-language', checkJWTbyCookie, checkUserPermission, lecturerController.fetchLecturerByLanguage)
    return app.use("/api/", router);

}

export default initLecturerRoute;