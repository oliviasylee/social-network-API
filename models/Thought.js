const { Schema, model } = require('mongoose');
const dayjs = require('dayjs')

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
      // Use a getter method to format the timestamp on query
      // format: MM DD YYYY at 01:38 pm 
    },
    username: { // might need some kind of foreign key?
      type: String,
      required: true,
    }, 
    reactions: [reactionSchema],
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