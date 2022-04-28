'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({client}) {
      // define association here
      this.belongsTo(client, {foreignKey: `client_id`}) //client has many brand
    }
  }
  brand.init({
    name: DataTypes.STRING,
    is_big_brand: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'brand',
  });
  return brand;
};