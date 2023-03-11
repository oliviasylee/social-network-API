// Routes that include functions needed to write a RESTful API for thoughts and reactions
const router = require('express').Router();
const {
  allThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,

} = require('../../controllers/thoughtController');

// /api/thoughts
// GET to get all thoughts
router.route('/').get(allThoughts).post(createThought);

// GET to get a single thought by its _id
// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// PUT to update a thought by its _id
// DELETE to remove a thought by its _id
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
// POST to create a reaction stored in a single thought's reactions array field
// DELETE to pull and remove a reaction by the reaction's reactionId value
router.route('/:thoughtId/reactions/:reactionId').post(createReaction).delete(deleteReaction);

module.exports = router;