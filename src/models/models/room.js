'use strict';
const {
  Model
} = require('sequelize');
const lecturer_timetable = require('./lecturer_timetable');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // room.belongsToMany(models._class,{through: models.class_schedule})
      // room.belongsToMany(models._class,{through: models.room_timesheet})
      // room.hasMany(models.lecturer_timetable)
      // room.hasMany(models.student_timetable)
    }
  }
  room.init({
    roomName: DataTypes.STRING,
    status: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};