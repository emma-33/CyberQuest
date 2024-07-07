const express = require('express');
const challengeController = require('../controllers/challengeController');

const router = express.Router();

router.post('/', challengeController.createChallenge);
router.get('/', challengeController.getAllChallenges);
router.get('/:challengeId', challengeController.getChallengeById);
router.put('/:challengeId', challengeController.updateChallengeById);
router.delete('/:challengeId', challengeController.deleteChallengeById);

module.exports = router;
