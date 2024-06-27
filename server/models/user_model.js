const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define(
   "User",
   {
      id: {
         type: DataTypes.STRING,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
      },
      pseudo: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      firstName: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
   },
);

module.exports = User;
