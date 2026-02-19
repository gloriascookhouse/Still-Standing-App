const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  entry: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Diary', diarySchema);
