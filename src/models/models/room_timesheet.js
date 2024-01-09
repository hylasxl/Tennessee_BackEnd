'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_timesheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  room_timesheet.init({
    roomID: DataTypes.INTEGER,
    classID: DataTypes.INTEGER,
    orderofLesson: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    timeStart: DataTypes.TIME,
    timeEnd: DataTypes.TIME,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'room_timesheet',
  });
  return room_timesheet;
};