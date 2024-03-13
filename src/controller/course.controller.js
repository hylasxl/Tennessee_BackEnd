import courseService from '../service/courseService'



const fetchAllCourse = async (req, res) => {
    try {

        const data = await courseService.fetchAllCourses()
        // console.log(data);
        // console.log(new Set(data));
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot fetch course',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch course successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot fetch course',
            DT: ''
        })
    }
}


const createCourse = async (req, res) => {
    try {
        const data = await courseService.handleCreateCourse(req)
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot create course',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Create course successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot create course',
            DT: ''
        })
    }
}

const courseApproval = async (req, res) => {
    try {
        const data = await courseService.courseApproval(req.body)
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: '',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: '',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Error occured',
            DT: ''
        })
    }
}

const fetchCourseByLanguage = async (req, res) => {
    try {
        const data = await courseService.fetchCourseByLanguage(req.body)
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot fecth course by language',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch course successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot fecth course by language',
            DT: ''
        })
    }
}
const countCourseRequest = async (req, res) => {
    try {
        const data = await courseService.countCourseRequest()
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot count course request',
                DT: ''
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Count course request successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot count course request',
            DT: ''
        })
    }
}

module.exports = {
    fetchAllCourse,
    createCourse,
    courseApproval,
    fetchCourseByLanguage,
    countCourseRequest
}