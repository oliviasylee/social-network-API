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
      default: () => dayjs().format('MMM D[,] YYYY [at] h:mm A'),
      // Use a getter method to format the timestamp on query
      get: timestamp => dayjs(timestamp).format('MMM Mo[,] YYYY [at] hh:mm a'),
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
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

  // Initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;