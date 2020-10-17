const { Schema, SchemaTypes, model } = require('mongoose');

const schema = new Schema({
  owner: {
    type: SchemaTypes.ObjectId,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  currentTime: {
    type: Number,
    required: false,
    default: 0
  }
}, {
  timestamps: true
});

const Room = model('rooms', schema);

module.exports = Room;
