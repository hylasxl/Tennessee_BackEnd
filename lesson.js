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
      lesson.belongsToMany(models.accounts,{through: models.lecturer_timetable})
    }
  }
  lesson.init({
    courseID: DataTypes.INTEGER,
    orderofLesson: DataTypes.INTEGER,
    lessonName: DataTypes.STRING,
    lessonDuration: DataTypes.TIME,
    createdBy: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lesson',
  });
  return lesson;
};