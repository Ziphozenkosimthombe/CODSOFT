const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [optionSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const scoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  value: Number
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  scores: [scoreSchema]
});
const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;