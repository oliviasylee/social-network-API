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
    createdAt: {
      type: Date,
       //Set default value to the current timestamp
      // format: MM DD YYYY at 01:38 pm 
      default: Date.now,
      // Use a getter method to format the timestamp on query
      get: timestamp => dayjs(timestamp).format('MMM D[,] YYYY [at] h:mm A'),
    },
    username: {
      type: String,
      required: true,
    }, 
    reactions: [Reaction],
    // Array of nested documents created with the reactionSchema - the reaction field's subdocumnet schema in the Thought model
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

  // Initialize Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;