const Challenge = require('../models/challengeModel');

// Creates a new challenge
const createChallenge = async (req, res) => {
  const { name, type, difficulty } = req.body;

  try {
    const challenge = await Challenge.create({
      name,
      type,
      difficulty,
    });
    res.status(201).json(challenge);
  } catch (error) {
    console.error('Error creating challenge:', error);
    res.status(500).json({ error: 'An error occurred while creating the challenge' });
  }
};

// Gets all challenges
const getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.findAll();
    res.status(200).json(challenges);
  } catch (error) {
    console.error('Error getting challenges:', error);
    res.status(500).json({ error: 'An error occurred while getting the challenges' });
  }
};

// Gets a challenge by id
const getChallengeById = async (req, res) => {
  const challengeId = req.params.challengeId;

  try {
    const challenge = await Challenge.findByPk(challengeId);
    if (challenge) {
        res.status(200).json(challenge);
    } else {
        res.status(404).json({ error: 'Challenge not found' });
    }
  } catch (error) {
    console.error('Error getting challenge by id:', error);
    res.status(500).json({ error: 'An error occurred while getting the challenge' });
  }
};

// Updates a challenge by id
const updateChallengeById = async (req, res) => {
  const challengeId = req.params.challengeId;
  const { name, type, difficulty } = req.body;

  try {
    const challenge = await Challenge.findByPk(challengeId);
    if (!challenge) {
        return res.status(404).json({ error: 'Challenge not found' });
    }
    challenge.name = name;
    challenge.type = type;
    challenge.difficulty = difficulty;

    await challenge.save();

    res.status(200).json(challenge);
  } catch (error) {
    console.error('Error updating challenge:', error);
    res.status(500).json({ error: 'An error occurred while updating the challenge' });
  }
};

// Deletes a challenge by id
const deleteChallengeById = async (req, res) => {
  const challengeId = req.params.challengeId;

  try {
    const challenge = await Challenge.findByPk(challengeId);
    if (!challenge) {
        return res.status(404).json({ error: 'Challenge not found' });
    }
    await challenge.destroy();

    res.status(200).json({ message: `Challenge with id=${id} was deleted successfully!`});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the challenge' });
  }
};

// Deletes all challenges
const deleteAllChallenges = async (req, res) => {
  try {
    const nums = await Challenge.destroy({
      truncate: false
    });
    res.send({ message: `${nums} Challenges were deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting all challenges' });
  }
};

module.exports = {
  createChallenge,
  getAllChallenges,
  getChallengeById,
  updateChallengeById,
  deleteChallengeById,
  deleteAllChallenges,
};
