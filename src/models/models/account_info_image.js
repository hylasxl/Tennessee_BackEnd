'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account_info_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //account_info_image.belongsTo(models.account_info,{foreignKey:'accountID'})
    }
  }
  account_info_image.init({
    accountId: DataTypes.INTEGER,
    imagePath: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'account_info_image',
  });
  return account_info_image;
};