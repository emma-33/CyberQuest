const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define(
   "User",
   {
      user_id: {
         type: DataTypes.UUID,
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
   {
      tableName: 'users',
      timestamps: false,
   }
);


module.exports = User;
