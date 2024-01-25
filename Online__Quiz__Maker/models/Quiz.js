// models/quiz.js
const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [optionSchema]
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema]
});
const Quiz = mongoose.model('Quiz', quizSchema, 'Quiz');

module.exports = Quiz;