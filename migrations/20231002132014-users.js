"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    {
      await queryInterface.createTable("users", {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true,
        },
        email: {
          type: Sequelize.DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        firstName: {
          type: Sequelize.DataTypes.STRING,
        },
        lastName: {
          type: Sequelize.DataTypes.STRING,
        },
        phoneNumber: {
          type: Sequelize.DataTypes.STRING,
        },
        isAdmin: {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false,
        },
      })
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("users")
  },
}
