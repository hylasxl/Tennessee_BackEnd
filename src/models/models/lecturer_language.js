'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lecturer_language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // lecturer_language.belongsTo(models.accounts)
      // lecturer_language.belongsTo(models.language)
    }
  }
  lecturer_language.init({
    lecturerID: DataTypes.INTEGER,
    languageID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'lecturer_language',
  });
  return lecturer_language;
};