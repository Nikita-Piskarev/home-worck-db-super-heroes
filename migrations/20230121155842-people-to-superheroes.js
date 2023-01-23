"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("people_to_superheroes", {
      peopleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "people_id",
        primaryKey: true,
        references: {
          model: "people",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      superheroesId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "superheroes_id",
        primaryKey: true,
        references: {
          model: "superheroes",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
    await queryInterface.dropTable("people_to_superheroes");
  },
};
