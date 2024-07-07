const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const userChallenge = sequelize.define(
   "userChallenge",
   {
      userChallenge_id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
      },
      user_id: {
         type: DataTypes.UUID,
         references: {
            model: 'users',
            key: 'user_id',
         },
         allowNull: false,
      },
      challenge_id: {
         type: DataTypes.UUID,
         references: {
            model: 'challenges',
            key: 'challenge_id',
         },
         allowNull: false,
      },
      isCompleted: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
      },
   },
    {
        tableName: 'userChallenges',
        timestamps: false,
    }
);

module.exports = userChallenge;
