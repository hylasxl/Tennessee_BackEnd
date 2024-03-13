import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import connection from "./config/connectDB";
import initAcademicRankRoute from "./routes/academicRank.route";
import initClassShiftRoute from "./routes/classShift.route";
import initAccountRoute from "./routes/account.route";
import initStudentListRoute from "./routes/studentList.route";
import initLecturerListRoute from "./routes/lecturerList.route";
import initCourseRoute from "./routes/course.route";
import initClassRoute from "./routes/class.route";
import initLanguageRoute from "./routes/language.route";
import initRoomRoute from "./routes/room.route";
import initLecturerRoute from "./routes/lecturer.route";
import initLessonRoute from "./routes/lesson.route";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;
var cors = require('cors')

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cors({ credentials: true, origin: process.env.REACT_URL }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

configViewEngine(app);
initWebRoutes(app);
initAcademicRankRoute(app);
initClassShiftRoute(app)
initAccountRoute(app)
initStudentListRoute(app)
initLecturerListRoute(app)
initCourseRoute(app)
initClassRoute(app)
initLanguageRoute(app)
initRoomRoute(app)
initLecturerRoute(app)
initLessonRoute(app)

connection();



app.listen(PORT, () => {

})