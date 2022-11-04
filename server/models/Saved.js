const mongoose = require('mongoose');

const { Schema } = mongoose;

const savedSchema = new Schema({
  savedDate: {
    type: Date,
    default: Date.now
  },
  tools: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tool'
    }
  ]
});

const Saved = mongoose.model('Saved', savedSchema);

module.exports = Saved;
