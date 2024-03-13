'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lecturer_account_providing_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      lecturer_account_providing_request.belongsTo(models.account_info, { foreignKey: 'requestCreatedBy', as: 'LAPRByAccount' })
      lecturer_account_providing_request.belongsTo(models.account_info, { foreignKey: 'confirmedBy', as: 'LAPRConfirmedBy' })
      lecturer_account_providing_request.belongsTo(models.language, { foreignKey: 'languageID', as: 'LAPRLanguage' })
      lecturer_account_providing_request.belongsTo(models.academic_level, { foreignKey: 'academic_levelId', as: 'LAPRAcademicRank' })
    }
  }
  lecturer_account_providing_request.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    dateofBirth: DataTypes.STRING,
    gender: DataTypes.STRING,
    languageId: DataTypes.INTEGER,
    academic_levelId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    approveStatus: {
      type: DataTypes.INTEGER,
      references: {
        model: 'account_info',
        key: 'accountId',
      },
    },
    requestCreatedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'account_info',
        key: 'accountId',
      },
    },
    confirmedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'lecturer_account_providing_request',
  });
  return lecturer_account_providing_request;
};