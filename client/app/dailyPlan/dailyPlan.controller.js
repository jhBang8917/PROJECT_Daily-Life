'use strict';

angular.module('dailyLifeApp')
  .controller('DailyPlanCtrl', function($scope, $http, Auth){
    $scope.user = Auth.getCurrentUser();
    $scope.week= [
      {text : 'Monday', enabled : false},
      {text : 'Tuesday', enabled : false},
      {text : 'Wednesday', enabled : false},
      {text : 'Thursday', enabled : false},
      {text : 'Friday', enabled : false},
      {text : 'Saturday', enabled : false},
      {text : 'Sunday', enabled : false}
    ];

    $scope.weekPlan = [];


    $scope.updatePopover = {
      templateUrl : 'updatePopover.html'
    };

    /*
    * 오늘 요일 tab active=true 하기 위한 valuable
    * */
    var todayIndex = _.findIndex($scope.week,{'text' : moment().format('dddd')});
    $scope.tabActive = [];
    $scope.tabActive[todayIndex] = true;

    // get 일주일 계획 from mongodb
    $http.get('/api/dailyPlan/byOwnerId/'+$scope.user._id).success(function(weekPlan) {
      $scope.weekPlan = weekPlan;
    });

    //post 특정플랜 to mongodb
    $scope.addDailyPlan = function(){
      console.log($scope.title);
      $http.post('/api/dailyPlan', {
        owner : $scope.user._id,
        title: $scope.title,
        day: enabledDay(),
        startTime : $scope.startTime,
        endTime : $scope.endTime
      }).then(function(response){console.log('succss')},
              function(err){window.alert(err.data)});
      //console.log(checkDay());
    }

    //update 특정 플랜 to mongodb
    $scope.updateDailyPlan = function(dayPlan){
      //console.log(dayPlan.title);
      //console.log(enabledDay());
      $http.put('api/dailyPlan/'+dayPlan._id,{
        title: dayPlan.title,
        day: enabledDay(),
        startTime : dayPlan.startTime,
        endTime : dayPlan.endTime
      });
    }

    $scope.deleteDailyPlan = function(dayPlan){
      $http.delete('api/dailyPlan/'+dayPlan._id);
    }

    /*
    * 수정 popover 나타날 때 요일 체크 나타내기 위한 function
    * array(json) 다루기 위해 lodash 사용
    * */
    $scope.checkDay = function(day){
      for(var i = 0; i<day.length;i++){
        //console.log(day[i]);
        //console.log(_.findIndex($scope.week,{'text':'tuesday'}));
        var index=_.findIndex($scope.week,{'text':day[i]});
        $scope.week[index].enabled = true;
      }
    }

    /*
    * checkbox에서 체크한 요일을 mongodb 저장을 위한 배열로
    * 돌려주는 function
    * */
    var enabledDay = function(){
      var result =[];
      for(var i=0; i<$scope.week.length; i++){
        if($scope.week[i].enabled)
          result.push($scope.week[i].text);
      }
      return result;
    }



  });
