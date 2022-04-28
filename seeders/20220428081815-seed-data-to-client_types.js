'use strict';

const clientTypeData = require(`../masterdata/client_types.json`)

module.exports = {
  async up (queryInterface, Sequelize) {
    const clientType = clientTypeData.map((eachClientType) => {
      eachClientType.createdAt = new Date()
      eachClientType.updatedAt = new Date()
      return eachClientType;
    });

    await queryInterface.bulkInsert('client_types', clientType);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('client_types', null, { truncate: true, restartIdentity:true});
  }
};
