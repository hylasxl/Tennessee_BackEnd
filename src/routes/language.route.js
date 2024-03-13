import express from "express";
import languageController from '../controller/language.controller'
import { checkJWTbyCookie, checkUserPermission } from '../middleware/JWTMethod'

const router = express.Router();



const initLanguageRoute = (app) => {
    
    router.get('/language/fetch-all-languages', checkJWTbyCookie, checkUserPermission, languageController.getAllLanguages)
    return app.use("/api/", router);

}

export default initLanguageRoute;