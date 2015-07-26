'use strict';

angular.module('dailyLifeApp')
  .controller('DayPlannerCtrl', function($rootScope,$scope, $http, $stateParams, socket){
    var page = parseInt($stateParams.page);
    //console.log(page);
    //console.log(page+1);
    $rootScope.dynamic = page * 25;
    $rootScope.pageValue = page + 1;
    $scope.notCompleteThing = [];
    $scope.weekThing = [];

    $http.get('api/things/query/notComplete').success(function(notCompleteThing){
      $scope.notCompleteThing = notCompleteThing;
      /*
      * active : false 인 것만 업데이트 하기 때문에 갱신이 안되는 것 아닐까
      * 아니다. 클라이언트 사이드에서 계속 갱신이 필요하다. angular 필터 사용해야한다.
      * */
      socket.syncUpdates('thing', $scope.notCompleteThing);
    });

    $http.get('api/things/query/weekThing').success(function(weekThing){
      $scope.weekThing = weekThing;
      socket.syncUpdates('thing', $scope.weekThing);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.moveThingToday = function(thing){
      $http.put('api/things/'+thing._id,{
        start : moment().startOf('day'),
        end: moment().startOf('day')
      });
    };

    $scope.addThing = function(thing) {
          if($scope.todayToDo === '')
            return;
          $http.post('/api/things', {
            title: $scope.todayToDo,
            start: moment().startOf('day'),
            end: moment().startOf('day')
          });
          $scope.todayToDo = '';

    };

    $scope.notCompleteFilter = function(thing){
      //console.log(thing.end);
      if(thing.end!==undefined)
        return thing.active == false && moment(thing.end).startOf('day') < moment().startOf('day');
    };
    $scope.weekThingFilter = function(thing){
      var nextWeek = moment().add(8,'d').startOf('day');
      return  moment(moment(thing.start).startOf('day')).isBetween(moment().startOf('day'),nextWeek)
        ||moment(moment(thing.end).startOf('day')).isBetween(moment().startOf('day'),nextWeek);
    };

  });

