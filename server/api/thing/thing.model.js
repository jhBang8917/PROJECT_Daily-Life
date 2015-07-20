'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  //name: String,
  //info: String,
  //date: Date,
  //priority : {type:String, default:'normal'},//우선순위 : high/normal
  //dayPlan : String, //시간대 : morning/afternoon/night
  //active: Boolean
  title : String,
  info : String,
  start : Date,
  end : Date,
  priority : {type:String, default:'normal'},//우선순위 : high/normal
  allDay :{type:String, default:true},
  dayPlan : String, //시간대 : morning/afternoon/night
  active: {type:String, default:false}

});

module.exports = mongoose.model('Thing', ThingSchema);
