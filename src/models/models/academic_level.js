'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class academic_level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // academic_level.belongsToMany(models.accounts,{through: models.lecturer_academic_level})
    }
  }
  academic_level.init({
    levelName: DataTypes.STRING,
    levelRank: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'academic_level',
  });
  return academic_level;
};