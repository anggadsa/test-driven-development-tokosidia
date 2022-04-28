'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class client_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({client}) {
      // define association here
      this.belongsTo(client, {foreignKey: `client_type_id`}) //client has client type
    }
  }
  client_type.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'client_type',
  });
  return client_type;
};