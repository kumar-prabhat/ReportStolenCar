const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const policeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: 'Available',
  },
  caseHandling: {
    type: mongoose.Types.ObjectId,
    ref: 'stolencase',
  },
});

module.exports = mongoose.model('police', policeSchema);
