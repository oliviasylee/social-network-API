const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      // populated thought and friend data
      .populate('thought')
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
  // updateUser(req,res) {
  //   User.findOneAndUpdate({ _id: req.paras.UserId})
  //     .then((user) =>
      // find a user and then update user data
      // {
      //   "username": "lernantino",
      //   "email": "lernantino@gmail.com"
      // }
  //         )
          
  // },

  // createFriend(Post) to add a new friend to a user's friend list
  // deleteFriend(Delete) to remove a friend from a user's friend list

  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.UserId })
      .then((user) => 
        !user
          ? res.status(404).json({ message: 'No such a user exists' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

};