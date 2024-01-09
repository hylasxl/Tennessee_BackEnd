'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // account_info.hasOne(models.account_info_image)
      // account_info.belongsTo(models.accounts)
    }
  }
  account_info.init({
    accountID: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateofBirth: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    imageID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'account_info',
  });
  return account_info;
};