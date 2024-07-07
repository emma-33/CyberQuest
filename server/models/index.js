const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = require('./userModel');
const UserChallenge = require('./userChallengeModel');
const Challenge = require('./challengeModel')

User.hasMany(UserChallenge, { foreignKey: 'user_id' });
UserChallenge.belongsTo(User, { foreignKey: 'user_id' });

Challenge.hasMany(UserChallenge, { foreignKey: 'challenge_id'});
UserChallenge.belongsTo(Challenge, { foreignKey: 'challenge_id'})

module.exports = {
  User,
  UserChallenge,
  Challenge,
  sequelize,
};