import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController"

const router = express.Router();
const initWebRoutes = (app) => {

    //path handler
    router.get("/", homeController.handleHelloWorld)

    //api
    

    return app.use("/", router);
}

export default initWebRoutes;