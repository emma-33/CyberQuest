const userChallenge = require('../models/userChallengeModel');

// Creates a new user challenge
const createUserChallenge = async (req, res) => {
  const { user_id, challenge_id, isCompleted } = req.body;

  try {
    const challenge = await userChallenge.create({
        user_id,
        challenge_id,
        isCompleted,
    });
    res.status(201).json(userChallenge);
  } catch (error) {
    console.error('Error creating user challenge:', error);
    res.status(500).json({ error: 'An error occurred while creating the user challenge' });
  }
};

// Gets all user challenges
const getAllUserChallenges = async (req, res) => {
  try {
    const userChallenges = await userChallenge.findAll();
    res.status(200).json(userChallenge);
  } catch (error) {
    console.error('Error getting user challenges:', error);
    res.status(500).json({ error: 'An error occurred while getting the user challenges' });
  }
};

// Gets an user challenge by id
const getUserChallengeById = async (req, res) => {
  const userchallengeId = req.params.userChallengeId;

  try {
    const userChallenge = await userChallenge.findByPk(userchallengeId);
    if (userChallenge) {
        res.status(200).json(userChallenge);
    } else {
        res.status(404).json({ error: 'User challenge not found' });
    }
  } catch (error) {
    console.error('Error getting user challenge by id:', error);
    res.status(500).json({ error: 'An error occurred while getting the user challenge' });
  }
};

// Updates an user challenge by id
const updateUserChallengeById = async (req, res) => {
  const userChallengeId = req.params.userChallengeId;
  const { name, type, difficulty } = req.body;

  try {
    const userChallenge = await userChallenge.findByPk(userChallengeId);
    if (!userChallenge) {
        return res.status(404).json({ error: 'User challenge not found' });
    }
    userChallenge.name = name;
    userChallenge.type = type;
    userChallenge.difficulty = difficulty;

    await userChallenge.save();

    res.status(200).json(userChallenge);
  } catch (error) {
    console.error('Error updating user challenge:', error);
    res.status(500).json({ error: 'An error occurred while updating the user challenge' });
  }
};

// Deletes an user challenge by id
const deleteUserChallengeById = async (req, res) => {
  const userChallengeId = req.params.userChallengeId;

  try {
    const userChallenge = await userChallenge.findByPk(userChallengeId);
    if (!userChallenge) {
        return res.status(404).json({ error: 'User challenge not found' });
    }
    await userChallenge.destroy();

    res.status(200).json({ message: `User challenge with id=${id} was deleted successfully!`});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the user challenge' });
  }
};

// Deletes all user challenges
const deleteAllUserChallenges = async (req, res) => {
  try {
    const nums = await userChallenge.destroy({
      truncate: false
    });
    res.send({ message: `${nums} userChallenges were deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting all userChallenges' });
  }
};

module.exports = {
  createUserChallenge,
  getAllUserChallenges,
  getUserChallengeById,
  updateUserChallengeById,
  deleteUserChallengeById,
  deleteAllUserChallenges,
};
