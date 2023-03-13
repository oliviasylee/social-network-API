const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a new thought - don't forget to push the created thought's _id to the associated user's thoughts array field
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id }},
          { new: true }
        );
      })
      .then((user) => 
        !user
          ? res.status(404).json({
              message: 'Thought create, but found no user with that ID',
          })
          : res.json('Created the thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Update a thought by its _id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
  },
  // Delete a thought by its _id
  // Find the thought with _id and delete it, and then if the thought is successfully removed, find the user who had the deleted thought and update their thoughts array by removing the deleted thought ID
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) => 
        !thought 
          ? res.status(404).json({ message: 'Thought not found with id' })
          : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId }},
            { new: true }
          )
      )
      .then((user) => 
        !user
          ? res.status(404).json({ message: 'No user with associated thought found!'})
          : res.json({ message: 'Thought successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err))
  },

  // Add a reaction - POST to create a reaction stored in a single thought's reactions array field
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      // Enable addToSet to prevent duplicates
      { $addToSet: { reactions: req.body }},
      { runValidators: true, new: true },
      { new: true }
    )
      .then((thought) => 
        !thought  
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
  },
  // Remove a reaction - DELETE to pull and remove a reaction by the reaction's reactionId value
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactionId: req.body }},
      { runValidators: true, new: true }
    )
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
  },
};