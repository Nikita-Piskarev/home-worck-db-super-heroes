"use strict";

const { Field } = require("pg-protocol/dist/messages");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("superheroes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nickname: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      originDescription: {
        type: Sequelize.STRING(1000),
        field: "origin_description",
        allowNull: false,
        unique: true,
      },
      superpowers: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      catchPhrase: {
        type: Sequelize.STRING(250),
        field: "catch_phrase",
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("superheroes");
  },
};
