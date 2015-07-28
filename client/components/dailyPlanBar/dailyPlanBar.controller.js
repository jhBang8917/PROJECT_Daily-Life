'use strict';

angular.module('dailyLifeApp')
  .controller('DailyPlanBarCtrl', function ($scope,$http) {

    $scope.stacked = [];
    $scope.max = 180;
    var types = ['success', 'info', 'warning', 'danger'];

    $http.get('/api/dailyPlan/query/'+$scope.day.text).success(function(dayPlan) {
        var t = 6;
       var i = 0;
      //console.log(dayPlan);
      while(t <= 24&& i<dayPlan.length){
        var index = Math.floor((Math.random() * 4));
        if(dayPlan[i].startTime==t){
          $scope.stacked.push({
            title: dayPlan[i].title,
            startTime:dayPlan[i].startTime+' ~ ' ,
            endTime:dayPlan[i].endTime,
            value : (dayPlan[i].endTime-dayPlan[i].startTime)*10,
            type: types[index]
          });
          t = dayPlan[i].endTime;
          i++;
        }else{
          $scope.stacked.push({
            title: '',
            startTime:'',
            endTime:'',
            value : (dayPlan[i].startTime-t)*10,
            type: 'null'
          });
          t = dayPlan[i].startTime;
        }
      }

      if(t!=24){
        $scope.stacked.push({
          title: '',
          startTime:'',
          endTime:'',
          value : (24-t)*10,
          type: 'null'
        });
      }
    //console.log($scope.stacked);
    });


  });
