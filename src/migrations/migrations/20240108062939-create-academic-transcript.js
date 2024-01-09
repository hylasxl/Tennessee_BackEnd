'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('academic_transcripts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      classID: {
        type: Sequelize.INTEGER
      },
      studentID: {
        type: Sequelize.INTEGER
      },
      lecturerID: {
        type: Sequelize.INTEGER
      },
      attendanceRate: {
        type: Sequelize.INTEGER
      },
      midTermTest: {
        type: Sequelize.INTEGER
      },
      finalTest: {
        type: Sequelize.INTEGER
      },
      finalResult: {
        type: Sequelize.INTEGER
      },
      tstaus: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('academic_transcripts');
  }
};