'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lecturer_academic_level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  lecturer_academic_level.init({
    lecturerId: DataTypes.INTEGER,
    academic_levelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'lecturer_academic_level',
  });
  return lecturer_academic_level;
};