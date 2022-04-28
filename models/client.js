'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  client.init({
    legal_name: DataTypes.STRING,
    npwp_number: DataTypes.INTEGER,
    address: DataTypes.STRING,
    client_type_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'client',
  });
  return client;
};