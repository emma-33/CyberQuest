const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Challenge = sequelize.define(
   "Challenge",
   {
      challenge_id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      type: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
   },
    {
        tableName: 'challenges',
        timestamps: false,
    }
);

module.exports = Challenge;
