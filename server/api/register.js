const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user_model');

const router = express.Router();
const saltRounds = 10;

router.post('/register', async (req, res) => {
  const { pseudo, firstName, lastName, email, password } = req.body;

  const alreadyExistsUser = await User.findOne({ where: { email } })
    .catch((err) => {
        console.log('Error: ', err);
    });

    if (alreadyExistsUser) 
        return res
          .status(400)
          .json({ message: 'User with email already exists' });
    
    const hashedPassword = await bcrypt.hash(password, saltRounds)
      .catch((err) => {
          console.log('Error hashing password: ', err);
          return res.status(500).json({ error: 'Cannot hash password', details: err.message});
      });

    const newUser = await User.create({ pseudo, firstName, lastName, email, password: hashedPassword});
    
    if (newUser) 
        res.status(201).json({ message: 'User registered successfully' });
});

module.exports = router;
