'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class password_otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // password_otp.belongsTo(models.accounts)
    }
  }
  password_otp.init({
    accountId: DataTypes.INTEGER,
    otp: DataTypes.INTEGER,
    expiredAt: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'password_otp',
  });
  return password_otp;
};