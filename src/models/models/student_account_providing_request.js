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
      // student_account_providing_request.belongsTo(models.accounts,{foreignKey:'requestCreatedBy'})
      // student_account_providing_request.belongsTo(models.accounts,{foreignKey:'confirmedBy'})
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
    requestCreatedBy: DataTypes.INTEGER,
    confirmedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'student_account_providing_request',
  });
  return student_account_providing_request;
};