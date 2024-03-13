import express from "express";
import academicRankController from '../controller/academicRank.controller'
import { checkJWTbyCookie, checkUserPermission } from '../middleware/JWTMethod'


const router = express.Router()

const  initAcademicRankRoute = (app) => {
    
    router.get('/academic-rank/fetch-all-academic-ranks', checkJWTbyCookie, checkUserPermission, academicRankController.fetchAllAcademicRanks)

    return app.use("/api/", router);
}
export default initAcademicRankRoute