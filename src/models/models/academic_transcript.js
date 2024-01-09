'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class academic_transcript extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // academic_transcript.belongsTo(models.__class)
    }
  }
  academic_transcript.init({
    classID: DataTypes.INTEGER,
    studentID: DataTypes.INTEGER,
    lecturerID: DataTypes.INTEGER,
    attendanceRate: DataTypes.INTEGER,
    midTermTest: DataTypes.INTEGER,
    finalTest: DataTypes.INTEGER,
    finalResult: DataTypes.INTEGER,
    tstaus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'academic_transcript',
  });
  return academic_transcript;
};