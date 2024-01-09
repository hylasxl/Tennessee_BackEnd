'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class class_attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // class_attendance.belongsTo(models.__class)
    }
  }
  class_attendance.init({
    classID: DataTypes.INTEGER,
    orderofLesson: DataTypes.INTEGER,
    studentID: DataTypes.INTEGER,
    lecturerID: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'class_attendance',
  });
  return class_attendance;
};