'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class class_student_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      class_student_list.belongsTo(models.account_info, { foreignKey: 'studentId', as: 'CSLAI' })
      class_student_list.belongsTo(models.class, { foreignKey: 'classId' })
    }
  }
  class_student_list.init({
    studentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'account_info',
        key: 'accountId',
      },
    },
    classId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'class_student_list',
  });
  return class_student_list;
};