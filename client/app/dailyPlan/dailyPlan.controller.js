'use strict';

angular.module('dailyLifeApp')
  .controller('DailyPlanCtrl', function($scope, $http){
    $scope.week= [
      {text : 'monday', enabled : false},
      {text : 'tuesday', enabled : false},
      {text : 'wednesday', enabled : false},
      {text : 'thursday', enabled : false},
      {text : 'friday', enabled : false},
      {text : 'saturday', enabled : false},
      {text : 'sunday', enabled : false}
    ];
    $scope.weekPlan = [];

    $http.get('/api/dailyPlan').success(function(weekPlan) {
      $scope.weekPlan = weekPlan;
    });

      $scope.addDailyPlan = function(){
        //validation 처리해야함
        var checkDay = function(){
          var result =[];
          for(var i=0; i<$scope.week.length; i++){
            if($scope.week[i].enabled)
              result.push($scope.week[i].text);
          }
          return result;
        }

        $http.post('/api/dailyPlan', {
          title: $scope.title,
          day: checkDay(),
          startTime : $scope.startTime,
          endTime : $scope.endTime
        });
        //console.log(checkDay());
      }

  });
