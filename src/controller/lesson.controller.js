import lessonService from '../service/lessonService'

const fetchLessonByCourse = async (req, res) => {
    try {
        // console.log(req.body);
        const data = await lessonService.fetchLessonByCourse(req.body.courseId)
        // console.log(data);
        // console.log(new Set(data));
        if (data === "Error") {
            res.status(500).json({
                EC: -1,
                EM: 'Cannot fetch lesson by course',
                DT: 'ERROR'
            })
        } else {
            res.status(200).json({
                EC: 1,
                EM: 'Fetch lesson by course successfully',
                DT: data
            })
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: 'Cannot fetch lesson by course',
            DT: ''
        })
    }
}

module.exports = {
    fetchLessonByCourse
}