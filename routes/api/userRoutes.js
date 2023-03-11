// Routes that include functions needed to write a RESTful API for users and friends
const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,

} = require('../../controllers/userController');

// /api/users
// GET all users and POST(Create) a new user
router.route('/')
  .get(getUsers)
  .post(createUser);

// GET a single user by its _id and populated thought and friend data
// PUT to update a user by its _id
// DELETE to remove user by its _id
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// Bonus - Remove a user's associated thoughts when deleted

// /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list & DELETE to remove a friend from a user's friend list
router.route('/:userId/friends/:friendId')
  .post(createFriend)
  .delete(deleteFriend);

module.exports = router;