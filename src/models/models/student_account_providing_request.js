'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_account_providing_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      student_account_providing_request.belongsTo(models.account_info,{foreignKey:'requestCreatedBy', as: 'SCPRByAccount'})
      student_account_providing_request.belongsTo(models.account_info,{foreignKey:'confirmedBy',as:'SCPRConfirmedBy'})
    }
  }
  student_account_providing_request.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    dateofBirth: DataTypes.STRING,
    gender: DataTypes.STRING,
    approveStatus: DataTypes.STRING,
    requestCreatedBy: {
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
    modelName: 'student_account_providing_request',
  });
  return student_account_providing_request;
};