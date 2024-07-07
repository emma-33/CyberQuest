const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');


const register = async (req, res) => {
  const { pseudo, firstName, lastName, email, password } = req.body;
  const saltRounds = 10;
  
  try {
    const alreadyExistsUser = await User.findOne({ where: { email } })
    
    if (alreadyExistsUser) {
      return res
        .status(400)
        .json({ message: 'User with email already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = await User.create({ 
      pseudo,
      firstName,
      lastName,
      email,
      password: hashedPassword
    });
            
    if (newUser) {
      res.status(201).json({ message: 'User registered successfully' });
    }
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ message: 'Server error' });
  }
};  

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } })
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { 
      expiresIn: '24h'
    });

    res.status(200).json({ token: token, message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in user', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login
};
