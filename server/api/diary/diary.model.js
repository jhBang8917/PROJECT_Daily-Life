'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DiarySchema = new Schema({
  date: Date,
  content: String,
  todayPromise : String,
  weather : String
});

module.exports = mongoose.model('Diary', DiarySchema);
