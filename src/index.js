import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import connection from "./config/connectDB";
import initApis from "./routes/api";
import cookieParser from "cookie-parser";

import {createJWT} from './middleware/JWTMethod'

// const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json())
app.use(express.urlencoded());
app.use(cookieParser())

configViewEngine(app);
initWebRoutes(app);
initApis(app);




connection();



app.listen(PORT, ()=>{

})