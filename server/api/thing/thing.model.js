'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  /*
  * active이름 변경하는게 좋겠다.
  * priority는 단계가 2개뿐이라면 boolean이 좋겠다
  *
  * 반복 계획 위해서 추가해야한다.
  *   repeat : int(일 수로)
  *   자동으로 추가해야한다.
  *
  * 매일 계획 위해서 추가해야한다.
  *   everyday : boolean
  *   repeat : 월수금일 이런식으로 세부적으로 짤수있게
 *    아니다. 매일 계획은 따로 model 만드는 게 좋다. 완료 비완료가 아니라 항상 해야하는것이기 때문ㅇ
  *
  *
  * */
  //active: Boolean
  title : String,
  info : String,
  start : Date,
  end : Date,
  priority : {type:String, default:'normal'},//우선순위 : high/normal
  allDay :{type:Boolean, default:true},
  dayPlan : String, //시간대 : morning/afternoon/night
  active: {type:Boolean, default:false},
  anniversary : {type:Boolean, default:false}

});

module.exports = mongoose.model('Thing', ThingSchema);
