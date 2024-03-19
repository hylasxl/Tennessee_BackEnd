'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lecturer_timetable extends Model {
    static associate(models) {
      lecturer_timetable.belongsTo(models.class,{foreignKey:'classId'})
      lecturer_timetable.belongsTo(models.lesson,{foreignKey:'lessonId'})
      lecturer_timetable.belongsTo(models.class_shift,{foreignKey:'shift'})
    }
  }
  lecturer_timetable.init({
    lecturerId: DataTypes.INTEGER,
    classId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'class',
        key:'id'
      }
    },
    lessonId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'lesson',
        key:'id'
      }
    },
    date: DataTypes.DATEONLY,
    shift: {
      type: DataTypes.INTEGER,
      references: {
        model: 'class_shift',
        key:'id'
      }
    },
    roomId: DataTypes.INTEGER,
    approveStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lecturer_timetable',
  });
  return lecturer_timetable;
};