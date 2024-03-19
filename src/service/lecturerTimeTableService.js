import db from "../models/models/index";

const fetchLecturerTimetable = async (data) => {
    try {
        const lecturerId = await data.lecturerId
        const lecturerTimetable = await db.lecturer_timetable.findAll({
            attributes: {
                exclude: ['lecturerId', 'createdAt', 'updatedAt', 'id', 'approveStatus', 'classId', 'shift']
            },
            where: {
                approveStatus: 'Approved',
                lecturerId
            },
            include: [
                {
                    model: db.class,
                    attributes: ['className']
                },
                {
                    model: db.class_shift,
                    attributes: ['startTime']
                },
                {
                    model: db.lesson,
                    attributes: ['lessonName', 'lessonDuration','orderofLesson']
                }
            ],
            raw: true,
            nest: true
        })
        let returnedData = []
        lecturerTimetable.forEach((element) => {
            let title = element.class.className
            let start = String(element.date + " " + element.class_shift.startTime)
            const durationComponents = element.lesson.lessonDuration.split(':')
            const startTimeComponents = element.class_shift.startTime.split(':')
            let endTime = (+durationComponents[0]) + (+startTimeComponents[0])
            let end = ":00:00"
            if (endTime < 10) {
                end = "0"+endTime+end;
            } else if (endTime >= 10){
                end = endTime+end
            }
            returnedData.push({
                title,
                start,
                end: String(element.date + " " + end),
                roomId: element.roomId,
                lesson: element.lesson.lessonName,
                lessonOrder: element.lesson.orderofLesson
            })
        });
        return returnedData
    }
    catch (exception) {
        console.log(exception)
        return 'ERROR'
    }
}

module.exports = {
    fetchLecturerTimetable
}