'use strict';
const {
  Model
} = require('sequelize');
const class_student_list = require('./class_student_list');
module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //  accounts.belongsToMany(models.__class,{through: models.academic_transcript})
    //  accounts.hasOne(models.account_info)
    //  accounts.belongsTo(models.accounttype)
    //  accounts.belongsToMany(models.__class,{through: models.class_student_list})
    //  accounts.belongsToMany(models.__class,{through: models.student_absence_request})
    //  accounts.hasMany(models.lecturer_account_providing_request)
    //  accounts.hasOne(models.lecturer_language)
    //  accounts.belongsToMany(models.lesson,{through: models.lecturer_timetable})
    //  accounts.belongsToMany(models.academic_level,{through: models.lecturer_academic_level})
    //  accounts.hasMany(models.password_otp)
    //  accounts.hasMany(models.student_account_providing_request)
    }
  }
  accounts.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    accountType: DataTypes.INTEGER,
    accountState: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'accounts',
  });
  return accounts;
};