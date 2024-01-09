import express from "express";
import apiController from "../controller/apiController"

const router = express.Router();
const initApis = (app) => {
    router.post("/login", apiController.handleLogin)

    return app.use("/api/", router);
}

export default initApis;