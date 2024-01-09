'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class __class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // __class.belongsToMany(models.accounts,{through: models.academic_transcript})
      // __class.belongsToMany(models.accounts,{through: models.class_attendance})
      // __class.belongsToMany(models.accounts,{through: models.student_absence_request})
      // __class.hasMany(models.academic_transcript)
      // __class.belongsToMany(models.room,{through: models.class_schedule})
      // __class.belongsToMany(models.room,{through: models.room_timesheet})
      // __class.belongsToMany(models.accounts,{thorugh: models.class_student_list})
      // __class.belongsTo(models.couse)
      // __class.hasMany(models.lecturer_timetable)
      // __class.hasMany(models.student_timetable)
    }
  }
  __class.init({
    courseID: DataTypes.INTEGER,
    className: DataTypes.STRING,
    orderofClassbyCourse: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    lecturerID: DataTypes.INTEGER,
    maxQuantity: DataTypes.INTEGER,
    currentQuantity: DataTypes.INTEGER,
    classShift: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'class',
  });
  return __class;
};