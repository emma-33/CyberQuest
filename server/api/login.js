const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const userWithEmail = await User.findOne({ where: { email } })
  .catch((err) => {
    console.log('Error: ', err);
});
console.log(userWithEmail);

if (!userWithEmail) {
  return res.status(404).json({ message: "User not found" });
}

// Debugging: Log the variables to ensure they are not undefined
console.log('Password request:', password);
console.log('Hashed password from user object:', userWithEmail.password);

// Ensure both password and userWithEmail.password are defined
if (password && userWithEmail.password) {
  const isPasswordValid = await bcrypt.compare(password, userWithEmail.password).catch(err => {
    console.error("Error comparing password:", err);
    return res.status(500).json({ message: "Error processing password validation" });
  });

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { userId: userWithEmail.id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' } // Token expires in 24 hours
  );

  return res.status(200).json({ token: token, message: "Login successful" });
} else {
  // If either is undefined, return an error
  return res.status(400).json({ message: "Missing password or user password hash" });
}
});
module.exports = router;
