'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class lesson extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            lesson.belongsTo(models.course, { foreignKey: 'courseId' })
            // lesson.belongsTo(models.lecturer_timetable)
        }
    }
    lesson.init({
        courseId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'course',
                key: 'id',
            },
        },
        orderofLesson: DataTypes.INTEGER,
        lessonName: DataTypes.STRING,
        lessonDuration: DataTypes.TIME,
        createdBy: DataTypes.INTEGER,
        description: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'lesson',
    });
    return lesson;
};