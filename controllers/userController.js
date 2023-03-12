const { User, Thought } = require('../models');

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
      { ...req.body }, // Spread operator to decompose JSON-formatted data into key-value pairs
      { runValidators: true, new: true } // Required to enable data validation and return an updated user
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
  },

  // createFriend(Post) 
  // Add a new friend to a user's friend list - Find user and then update friends
  createFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body }},
      // If you add a friend who is already in the list again, it won't be duplicated.
      { runValidators: true, new: true },
      { new: true }
    )
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
        .catch((err) => res.status(500).json(err));
  },

  // deleteFriend(Delete) to remove a friend from a user's friend list
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.body }},
      { runValidators: true, new: true }
    )
      .then((user) => 
        !user 
          ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
  },

  // Delete a user - Remove a user's associated thoughts when deleted.
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No such user exists' });
        }
        return Thought.deleteMany({ username: req.params.userId });
      })
      .then(() => res.json({ message: 'User and associated thoughts deleted' }))
      .catch((err) => res.status(500).json(err));
  },
};