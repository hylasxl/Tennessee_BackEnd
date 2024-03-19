'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class academic_transcript extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // academic_transcript.belongsTo(models.__class,{foreignKey:'classID'})
      academic_transcript.belongsTo(models.account_info,{foreignKey:'studentId',as:'ATS'})
      academic_transcript.belongsTo(models.class,{foreignKey:'classId'})
    }
  }

  academic_transcript.init({
    classId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'class',
        key: 'id'
      }
    },
    studentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'account_info',
        key: 'accountId'
      }
    },
    attendanceRate: DataTypes.FLOAT,
    midTermTest: DataTypes.FLOAT,
    finalTest: DataTypes.FLOAT,
    finalResult: DataTypes.FLOAT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'academic_transcript',
  });
  return academic_transcript;
};