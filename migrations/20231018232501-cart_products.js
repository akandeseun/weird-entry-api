"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cart_products", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      cartId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "carts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      productId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      quantity: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 1,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     *
     */
    await queryInterface.dropTable("cart_products")
  },
}
