'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_absence_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      student_absence_request.belongsTo(models.account_info,{foreignKey:'studentId'})
      student_absence_request.belongsTo(models.class,{foreignKey:'classId'})
    }
  }
  student_absence_request.init({
    studentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'account_info',
        key: 'accountId',
      },
    },
    classId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'class',
        key: 'id'
      }
    },
    date: DataTypes.DATEONLY,
    reason: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'student_absence_request',
  });
  return student_absence_request;
};