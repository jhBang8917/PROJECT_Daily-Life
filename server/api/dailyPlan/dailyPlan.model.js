'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DailyPlanSchema = new Schema({
  title : String,
  info : String,
  day : [String],
  startTime : Number,
  endTime : Number

});

module.exports = mongoose.model('DailyPlan', DailyPlanSchema);
