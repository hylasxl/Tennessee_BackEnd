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
      // lecturer_timetable.belongsTo(models.course)
      // lecturer_timetable.belongsTo(models.class)
      // lecturer_timetable.belongsTo(mdoels.room)
    }
  }
  lecturer_timetable.init({
    lecturerID: DataTypes.INTEGER,
    courseID: DataTypes.INTEGER,
    classID: DataTypes.INTEGER,
    lessonID: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    timeStart: DataTypes.TIME,
    timeEnd: DataTypes.TIME,
    roomID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'lecturer_timetable',
  });
  return lecturer_timetable;
};