'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // course_image.belongsTo(models.course)
    }
  }
  course_image.init({
    courseID: DataTypes.INTEGER,
    imagePath: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'course_image',
  });
  return course_image;
};