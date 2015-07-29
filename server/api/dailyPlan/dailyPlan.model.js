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

//DailyPlanSchema
// .path('startTime')
//.validate(function(value, respond){
//    var self = this;
//    this.constructor.find({day},function(err, dailyPlan){
//
//    });
//  },'이미 이 시간대에 시간이 설정되어있습니다.');

module.exports = mongoose.model('DailyPlan', DailyPlanSchema);
