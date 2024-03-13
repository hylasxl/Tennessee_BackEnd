import express from "express";
import roomController from '../controller/room.controller'
import { checkJWTbyCookie, checkUserPermission } from '../middleware/JWTMethod'

const router = express.Router();



const initRoomRoute = (app) => {



    router.get('/room/fetch-all-rooms', checkJWTbyCookie, checkUserPermission, roomController.fetchAllRooms)


    return app.use("/api/", router);

}

export default initRoomRoute;