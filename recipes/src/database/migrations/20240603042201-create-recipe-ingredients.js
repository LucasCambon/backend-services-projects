'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recipes_ingredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'recipes',
          key: 'id'
        }
      },
      ingredientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ingredients',
          key: 'id'
        }
      },
      measureUnitId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'measure_units',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.STRING
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('recipes_ingredients');
  }
};
