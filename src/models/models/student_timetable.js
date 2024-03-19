'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_timetable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      student_timetable.belongsTo(models.class,{foreignKey:'classId'})
      student_timetable.belongsTo(models.lesson,{foreignKey:'lessonId'})
      student_timetable.belongsTo(models.class_shift,{foreignKey:'shift'})
    }
  }
  student_timetable.init({
    studentId: DataTypes.INTEGER,
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
    approveStatus: DataTypes.STRING,
    roomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'student_timetable',
  });
  return student_timetable;
};