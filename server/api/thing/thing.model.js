'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  info: String,
  date: Date,
  priority : String,//우선순위 : high/normal
  active: Boolean
});

module.exports = mongoose.model('Thing', ThingSchema);
