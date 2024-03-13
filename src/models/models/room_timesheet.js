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
      // room_timesheet.belongsTo(models.room,{foreignKey:'roomID'})
      // room_timesheet.belongsTo(models.__class,{foreignKey:'classID'})
    }
  }
  room_timesheet.init({
    roomId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    orderofLesson: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    shift: DataTypes.INTEGER,
    approveStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'room_timesheet',
  });
  return room_timesheet;
};