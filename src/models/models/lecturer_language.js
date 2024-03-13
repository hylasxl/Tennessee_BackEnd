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
      lecturer_language.belongsTo(models.account_info, { foreignKey: 'lecturerId', as: 'LLAI' })
      lecturer_language.belongsTo(models.language, { foreignKey: 'languageId' })
    }
  }
  lecturer_language.init({
    lecturerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'account_info',
        key: 'accountId',
      },
    },
    languageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'language',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'lecturer_language',
  });
  return lecturer_language;
};