'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_absence_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  student_absence_request.init({
    studentID: DataTypes.INTEGER,
    classID: DataTypes.INTEGER,
    fromDate: DataTypes.DATEONLY,
    toDate: DataTypes.DATEONLY,
    reason: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'student_absence_request',
  });
  return student_absence_request;
};