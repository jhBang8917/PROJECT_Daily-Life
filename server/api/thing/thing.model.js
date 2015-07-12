'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  info: String,
  date: Date,
  priority : {type:String, default:'normal'},//우선순위 : high/normal
  dayPlan : String, //시간대 : morning/afternoon/night
  active: Boolean
});

module.exports = mongoose.model('Thing', ThingSchema);
