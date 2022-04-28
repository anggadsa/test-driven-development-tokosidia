'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      legal_name: {
        type: Sequelize.STRING(75)
      },
      npwp_number: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      client_type_id: {  
        type: Sequelize.INTEGER,
        references: {
          model: `client_types`,
          key: `id`
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('clients');
  }
};