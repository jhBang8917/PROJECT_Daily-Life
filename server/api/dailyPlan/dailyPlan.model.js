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



/*
* save 전에 시간 체크하는 validation
* */
DailyPlanSchema.pre('save', function(next){
  //console.log('pre save 진입');
  for(var i =0; i < this.day.length; i++){
      mongoose.models['DailyPlan']
        .find(
      {day : this.day[i],
        //if((this.startTime>=dailyPlan[j].startTime&&this.startTime<dailyPlan[j].endTime)||(this.endTime>dailyPlan[j].startTime&&this.startTime<=dailyPlan[j].endTime)){
        $or: [
          {$and:[{startTime:{$lte:this.startTime}},{endTime:{$gt:this.startTime}}]},
          {$and:[{startTime:{$lt :this.endTime}},{endTime:{$gte:this.endTime}}]}
        ]
      },function(err, dailyPlan){
          if(!dailyPlan.length){
            //console.log('겹치는게없습니다.');
            next();}
          else{
              //console.log(dailyPlan+'과 겹칩니다');
              next(Error('이 시간대에는 이미 계획이 존재합니다.'));
          }
        });
    }
});


//// 현재 저장/업데이트 방식이 모두 save를 이용하므로 pre('save') 이용
//DailyPlanSchema.pre('validate', function(next){
//  var str = 'pre validate  메시지';
//  console.log('pre validate 진입');
//  next(str);
//});

//
//DailyPlanSchema.post('validate', function(doc){
//  console.log('%s has been validated (but not saved yet)', doc._id);
//});
//
//DailyPlanSchema.post('save', function(doc) {
//  console.log('%s has been saved', doc._id);
//});

//DailyPlanSchema
//  .path()
//.validate(function(value, respond){
//    var self = this;
//    console.log('집입');
//    this.constructor.find({},function(err, dailyPlan){
//    });
//  },'이미 이 시간대에 시간이 설정되어있습니다.');

module.exports = mongoose.model('DailyPlan', DailyPlanSchema);
