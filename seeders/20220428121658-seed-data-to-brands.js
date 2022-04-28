'use strict';
const brandsData = require(`../masterdata/brands.json`)
module.exports = {
  async up (queryInterface, Sequelize) {

    const brands = brandsData.map((eachBrands) => {
      let randomClientId = Math.floor(Math.random() * 3) + 1; //random number 1 - 3
      eachBrands.client_id = randomClientId;
      eachBrands.createdAt = new Date()
      eachBrands.updatedAt = new Date()
      return eachBrands;
    });

    await queryInterface.bulkInsert('brands', brands);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('brands', null, { truncate: true, restartIdentity:true});
  }
};
