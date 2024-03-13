'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lecturer_timetable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // lecturer_timetable.hasOne(models.__class,{foreignKey:'classID'})
      // lecturer_timetable.hasOne(models.room,{foreignKey:'roomID'})
      // lecturer_timetable.hasOne(models.lesson,{foreignKey:'lessonID'})
    }
  }
  lecturer_timetable.init({
    lecturerId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    lessonId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    shift: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    approveStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lecturer_timetable',
  });
  return lecturer_timetable;
};