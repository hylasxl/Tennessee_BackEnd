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
      // class_attendance.belongsTo(models.__class,{foreignKey:'classID'})
    }
  }
  class_attendance.init({
    classId: DataTypes.INTEGER,
    orderofLesson: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER,
    lecturerId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'class_attendance',
  });
  return class_attendance;
};