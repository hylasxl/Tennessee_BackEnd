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
      course.hasMany(models.lesson, {foreignKey: 'courseId'})
      course.belongsTo(models.language)
      course.belongsTo(models.course_image, { foreignKey: 'imageId' })
      course.belongsTo(models.account_info, { foreignKey: 'createdBy', as: 'createdByAccount' })
      course.belongsTo(models.account_info, { foreignKey: 'approvedBy', as :'approvedByAccount' })
      course.hasMany(models.class, {foreignKey: 'courseId'})
    }
  }
  course.init({
    courseName: DataTypes.STRING,
    languageId: DataTypes.INTEGER,
    duration: DataTypes.TIME,
    durationofEachLesson: DataTypes.TIME,
    price: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER,
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'account_info',
        key: 'accountId',
      },
    },
    approveStatus: DataTypes.STRING,
    approvedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'account_info',
        key: 'accountId',
      },
    },
    description: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
};