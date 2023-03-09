const { Schema, model } = require('mongoose');
const Reaction = require("./Reaction")
const dayjs = require('dayjs');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createAt: {
      type: Date,
      default: dayjs().format('MMM D, YYYY h:mm A'), //Set default value to the current timestamp
      // format: MM DD YYYY at 01:38 pm 
    },
    username: {
      type: String,
      required: true,
    }, 
    reactions: [Reaction],
    // Array of nested documents created with the reactionSchema
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

  // Initialize Thought model
const Thought = model('thougth', thoughtSchema);

module.exports = Thought;