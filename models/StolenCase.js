const mongoose = require('mongoose');

const StolenCaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  registration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  color: {
    type: String,
  },
  isPending: {
    type: Boolean,
    default: true,
  },
  isResolved: {
    type: Boolean,
    default: false,
  },
  assignee: {
    type: mongoose.Types.ObjectId,
    ref: 'police',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = StolenCase = mongoose.model('stolenCase', StolenCaseSchema);
