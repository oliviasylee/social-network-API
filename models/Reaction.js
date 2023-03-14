// Schema only. This will not be a model, but rather will be used as the reaction field's subdocumnet schema in the Thought model
const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs')

const reactionSchema = new Schema(
  {
    // Use Mongoose's ObjectId data type and default value is set to a new ObjectId
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      // Set default value to the current timestamp
      // format: MM DD YYYY at 01:38 pm 
      default: Date.now,
      // Use a getter method to format the timestamp on query
      get: timestamp => dayjs(timestamp).format('MMM D[,] YYYY [at] h:mm A'),
    },
  },
  {
    toJSON: {
      // The getters that define on the schema will be called when the schema is serialized to JSON.
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;