'use strict';

var should = require('should');
var app = require('../../app');
var DailyPlan = require('./dailyPlan.model');

var dailyPlan = new DailyPlan({
  title : '월 오전 10~14',
  day : ['Monday'],
  startTime : 10,
  endTime : 14
});

var dailyPlan2 = new DailyPlan({
  title : '월 시간 겹치게',
  day : ['Monday', 'Friday'],
  startTime : 12,
  endTime : 16
});

describe('DailyPlan Model', function() {
  before(function(done) {
    // Clear users before testing
    DailyPlan.remove().exec().then(function() {
      done();
    });
  });
  //
  //afterEach(function(done) {
  //  DailyPlan.remove().exec().then(function() {
  //    done();
  //  });
  //});

  //it('should begin 월수 플랜하나.', function(done) {
  //  DailyPlan.find({}, function(err, dailyPlans) {
  //    dailyPlans.should.have.length(1);
  //    console.log('데이터값 /n'+user);
  //    done();
  //  });
  //});

  /*
  * seed에 데이터 입력한것과 이 코드에 입력한 것을 비교하면
   * 확인을 할수없다
   * 이??
   * 아마도 비동기와 관련있을거같다.
  * */
  it('should not save because 시간 겹침', function(done) {
    dailyPlan.save(function() {
      dailyPlan2.save(function(err){
          should.exist(err);
          console.log('err 내용 : ' + err);
          done();
      });
    });
  });

  it('저장된거 출력', function(done) {
    DailyPlan.find({}, function(err, dailyPlans) {
      console.log('데이터값 /n'+dailyPlans);
      done();
    });
  });

});
