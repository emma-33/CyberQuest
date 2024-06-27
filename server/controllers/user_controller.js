const User = require("../models/user_model");
const { Op } = require("sequelize");

// Creates a new User
exports.create = async (req, res) => {
    if (!req.body.firstName) {
        res.status(400).send({
            message: "Content cannot be empty"
        });
        return;
    }

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    try {
      const data = await User.create(user);
      res.send(data);
    } catch (error) {
      res.status(500).send({
          message: error.message || "Some error occurred while creating the User."
      });
  }
};

// Retrieves all users by firstName
exports.findAll = async (req, res) => {
    const firstName = req.query.firstName;
    let condition = firstName ? { firstName: { [Op.like]: `%${firstName}%` } } : null;

    try {
      const data = await User.findAll({ where: condition });
      res.send(data);
    } catch (error) {
      res.status(500).send({
          message: error.message || "Some error occurred while retrieving the User."
      });
  }
};

// Retrieves User by id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
      const data = await User.findByPk(id);
      if (data) {
          res.send(data);
      } else {
          res.status(404).send({
              message: `Cannot find User with id=${id}.`
          });
      }
    } catch (error) {
      res.status(500).send({
          message: "Error retrieving User with id=" + id
      });
  }     
};

// Updates User
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
      const num = await User.update(req.body, {
          where: { id: id }
      });
      if (num == 1) {
          res.send({
              message: "User was updated successfully"
          });
      } else {
          res.send({
              message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty`
          });
      }
  } catch (error) {
      res.status(500).send({
          message: "Error updating User with id=" + id
      });
  }
};

// Deletes a User by id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
      const num = await User.destroy({
          where: { id: id }
      });
      if (num == 1) {
          res.send({
              message: "User was deleted successfully"
          });
      } else {
          res.send({
              message: `Cannot delete User with id=${id}. Maybe User was not found`
          });
      }
  } catch (error) {
      res.status(500).send({
          message: "Error deleting User with id=" + id
      });
  }
};

// Deletes all Users
exports.deleteAll = async (req, res) => {
  try {
      const nums = await User.destroy({
          where: {},
          truncate: false
      });
      res.send({ message: `${nums} Users were deleted successfully` });
  } catch (error) {
      res.status(500).send({
          message: error.message || "Some error occurred while removing all Users."
      });
  }
};
const users = require('../controllers/user_controller');
const router = require("express").Router();

// Creates a new User
router.post("/", users.create);

// Retrieves all Users
router.get("/", users.findAll);

// Retrieves a single User with id
router.get("/:id", users.findOne);

// Update a single User with id
router.put("/:id", users.update);

// Deletes a single User with id
router.delete("/:id", users.delete);

// Deletes all Users
router.delete("/", users.deleteAll);

module.exports = router;
