"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "accounts",
      [
        {
          username: "John Doe",
          password: "123",
          accountType: 1,
          accountState: "accessible"
        },
        {
          username: "Pos",
          password: "123",
          accountType: 1,
          accountState: "accessible"
        },
        {
          username: "Iops",
          password: "123",
          accountType: 1,
          accountState: "accessible"
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
