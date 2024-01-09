'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_timetable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // student_timetable.belongsTo(models.course)
      // student_timetable.belongsTo(models.class)
      // student_timetable.belongsTo(models.room)
    }
  }
  student_timetable.init({
    studentID: DataTypes.INTEGER,
    classID: DataTypes.INTEGER,
    orderofLesson: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    timeStart: DataTypes.TIME,
    timeEnd: DataTypes.TIME,
    roomID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'student_timetable',
  });
  return student_timetable;
};