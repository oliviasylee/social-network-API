const User = require('../models/User');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      // Exclude the __v field from the results of User.findOne()
      .select("-__v")
      // populated thought and friend data
      .populate('thought')
      .populate('friends')
      .then((user) => 
        !user
          ? res.status(404).json({ message: 'No user with that ID'})
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserdata) => res.json(dbUserdata))
      .catch((err) => res.status(500).json(err));
  },
  // Update a user
  updateUser(req,res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { username: req.params.username,
        email: req.params.email 
      },
      { runValidators: true, new: true } // Required to enable data validation and return an updated user
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
  },

  // createFriend(Post) to add a new friend to a user's friend list
  // deleteFriend(Delete) to remove a friend from a user's friend list

  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.UserId })
      .then((user) => 
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};