const User = require("../models/userModel");

// Retrieves all users 
const getAllUsers = async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: "Some error occurred while retrieving the User." });
  }
};

// Retrieves User by id
const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByPk(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: `Cannot find User with id=${id}.` });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ message: "Error retrieving User with id=" + id });
  }     
};

// Updates User by id
const updateUserById = async (req, res) => {
  const id = req.params.id;
  const { pseudo, email } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    user.pseudo = pseudo;
    user.email = email;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'An error occurred while updating the user' });
  }
};

// Deletes a User by id
const deleteUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();

    res.status(200).json({ message: `User with id=${id} was deleted successfully!` });
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
};

// Deletes all Users
const deleteAllUsers = async (req, res) => {
  try {
    const nums = await User.destroy({
      truncate: false
    });
    res.send({ message: `${nums} Users were deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting all users' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  deleteAllUsers
}; 
