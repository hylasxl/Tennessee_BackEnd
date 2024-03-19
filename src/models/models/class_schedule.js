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
    classId: DataTypes.INTEGER,
    orderofLesson: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    shift: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    approveStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'class_schedule',
  });
  return class_schedule;
};