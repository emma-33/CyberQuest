const express = require('express');
const passport = require('passport');
const users = require('../controllers/userController');

const router = express.Router();

// Get all users
router.get('/', passport.authenticate('jwt', { session: false }), users.getAllUsers);

// Get user by id
router.get('/:id', passport.authenticate('jwt', { session: false }), users.getUserById);

// Update user by id
router.put('/:id', passport.authenticate('jwt', { session: false }), users.updateUserById);

// Delete all users
router.delete('/', passport.authenticate('jwt', { session: false }), users.deleteAllUsers);

// Delete user by id
router.delete('/:id', passport.authenticate('jwt', { session: false }), users.deleteUserById);

module.exports = router;
