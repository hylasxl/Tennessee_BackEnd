'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accountType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // accountType.hasOne(models.accounts)
      accountType.hasMany(models.account)
      accountType.belongsToMany(models.permissions,{through: 'permissions_accounttype'})
      
    }
  }
  accountType.init({
    typeName: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'accountType',
  });
  return accountType;
};