const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema(
  {
    label: String,
    type: String,
    answers: Array
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Questions', QuestionSchema)
