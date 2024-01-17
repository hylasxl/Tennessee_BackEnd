'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class class_schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // class_schedule.belongsTo(models.__class,{foreignKey: 'classID'})
      
    }
  }
  class_schedule.init({
    classID: DataTypes.INTEGER,
    orderofLesson: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    timeStart: DataTypes.TIME,
    timeEnd: DataTypes.TIME,
    roomID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'class_schedule',
  });
  return class_schedule;
};