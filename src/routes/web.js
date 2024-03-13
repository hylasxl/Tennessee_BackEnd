import express from "express";


const router = express.Router();
const initWebRoutes = (app) => {

    //path handler

    

    return app.use("/", router);
}

export default initWebRoutes;