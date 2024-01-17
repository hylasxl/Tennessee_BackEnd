'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // course.hasMany(models.__class)
      // course.belongsTo(models.course_image,{foreignKey: 'imageID'})
      // course.hasMany(models.lesson)
    }
  }
  course.init({
    courseName: DataTypes.STRING,
    languageId: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    durationofEachLesson: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    approveStatus: DataTypes.INTEGER,
    approvedBy: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
};