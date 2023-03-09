const { Schema, model } = require('mongoose');
const dayjs = require('dayjs')

// Schema Only means no seed data?
const reactionSchema = new Schema(
  {
    //Use Mongoose's ObjectId data type and default value is set to a new ObjectId
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    responseBody: {
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
      default: dayjs().format('MMM D, YYYY h:mm A'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;