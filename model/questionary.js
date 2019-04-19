const mongoose = require('mongoose');

const QuestionarySchema = mongoose.Schema(
  {
    title: String,
    author: String,
    type: String,
    questions: Array
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Questionaries', QuestionarySchema)
