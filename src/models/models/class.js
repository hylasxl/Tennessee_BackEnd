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
      __class.belongsTo(models.course)
      __class.belongsTo(models.account_info, {foreignKey: 'lecturerID', as: 'lecturerByAccount'})
      __class.belongsTo(models.account_info, {foreignKey: 'requestBy', as: 'requestByAccount'})
      __class.belongsTo(models.account_info, {foreignKey: 'confirmedBy', as: 'confirmedByAccount'})
      __class.belongsTo(models.class_shift, {foreignKey: 'classShift', as: 'class_classShift'})
    }
  }
  __class.init({
    courseId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'course',
        key: 'id',
      },
    },
    className: DataTypes.STRING,
    orderofClassbyCourse: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    lecturerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'account_info',
        key: 'accountId',
      },
    },
    weekdays: DataTypes.STRING,
    maxQuantity: DataTypes.INTEGER,
    currentQuantity: DataTypes.INTEGER,
    classShift: {
      type: DataTypes.INTEGER,
      references: {
        model: 'class_shift',
        key: 'id',
      },
    },
    operatingStatus: DataTypes.STRING,
    description: DataTypes.STRING,
    approveStatus: DataTypes.STRING,
    requestBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'account_info',
        key: 'accountId',
      },
    },
    confirmedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'account_info',
        key: 'accountId',
      },
    }
  }, {
    sequelize,
    modelName: 'class',
  });
  return __class;

};