const express = require('express');
const userChallengeController = require('../controllers/userChallengeController');

const router = express.Router();

router.post('/', userChallengeController.createUserChallenge);
router.get('/', userChallengeController.getAllUserChallenges);
router.get('/:userChallengeId', userChallengeController.getUserChallengeById);
router.put('/:userChallengeId', userChallengeController.updateUserChallengeById);
router.delete('/:userChallengeId', userChallengeController.deleteUserChallengeById);

module.exports = router;
