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
      // student_timetable.hasOne(models.accounts,{foreignKey:'studentID'})
      // student_timetable.hasOne(models.__class,{foreignKey:'classID'})
      // student_timetable.hasOne(models.room,{foreignKey:'roomID'})
    }
  }
  student_timetable.init({
    studentId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    orderofLesson: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    shift: DataTypes.INTEGER,
    approveStatus: DataTypes.STRING,
    roomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'student_timetable',
  });
  return student_timetable;
};