'use strict';

angular.module('dailyLifeApp')
  .controller('MainCtrl', function ($scope ,$http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);//실시간 업데이트 가능한이유??
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', {
        name: $scope.newThing,
        date: $scope.newDate
      });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.priorityFilter = function(thing){
          return thing.priority=="high";
    };
    $scope.weekFilter = function(thing){
          var nextWeek = moment().add(7,'d');
          //console.log("일주일후: "+ nextWeek.format('L'));
          return moment(moment(thing.date).format('L')).isBetween(moment().format('L'),nextWeek.format('L'));
    };
    $scope.todayFilter = function(thing){
          //console.log(moment(thing.date).format('L') +"&&&&&&&"+new Date().getDate());
          return moment(thing.date).format('L') == moment().format('L');
    };
  });
  //
  //.filter('thingFilter',function(){
  //  return function(thing, status) {
  //    switch (status) {
  //      case "priority":
  //        break;
  //
  //      case "week":
  //        break;
  //
  //      case "today":
  //          console.log(new Date(thing.date).toLocaleDateString()+"&&&&&&"+new Date().toLocaleDateString());
  //
  //        if(new Date(thing.date).toLocaleDateString() === new Date().toLocaleDateString())
  //          return thing;
  //        break;
  //    }
  //  }
  //});
