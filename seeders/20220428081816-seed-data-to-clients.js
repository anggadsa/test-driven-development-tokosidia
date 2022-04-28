'use strict';
const clientsData = require(`../masterdata/clients.json`)

module.exports = {
  async up (queryInterface, Sequelize) {
    const clients = clientsData.map((eachClient) => {

      let randomClientType = Math.floor(Math.random() * 2) + 1; //random number 1 - 2
      eachClient.client_type_id = randomClientType;
      eachClient.createdAt = new Date()
      eachClient.updatedAt = new Date()
      return eachClient;
    });

    await queryInterface.bulkInsert('clients', clients);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clients', null, { truncate: true, restartIdentity:true});
  }
};
