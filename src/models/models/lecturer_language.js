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
      // lecturer_language.belongsTo(models.accounts,{foreignKey:'lecturerID'})
      // lecturer_language.belongsTo(models.language,{foreignKey:'languageID'})
    }
  }
  lecturer_language.init({
    lecturerId: DataTypes.INTEGER,
    languageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'lecturer_language',
  });
  return lecturer_language;
};