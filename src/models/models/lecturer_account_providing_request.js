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
      // lecturer_account_providing_request.belongsTo(models.accounts,{foreignKey:'requestCreatedBy'})
      // lecturer_account_providing_request.belongsTo(models.accounts,{foreignKey:'confirmedBy'})
      // lecturer_account_providing_request.belongsTo(models.language,{foreignKey:'languageID'})
      // lecturer_account_providing_request.belongsTo(models.academic_level,{foreignKey:'academicLevelID'})
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
    approveStatus: DataTypes.STRING,
    requestCreatedBy: DataTypes.INTEGER,
    confirmedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'lecturer_account_providing_request',
  });
  return lecturer_account_providing_request;
};