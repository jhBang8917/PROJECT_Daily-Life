'use strict';

angular.module('dailyLifeApp')
.controller('ScheduleCtrl', function($scope, $http, socket){
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };
    $scope.events = [];

    $http.get('/api/things').success(function(data) {
      //$scope.events = awesomeThings;
      //socket.syncUpdates('thing', $scope.events);//실시간 업데이트 가능한이유??
      for(var i = 0; i < data.length; i++)
      {
        $scope.events[i] = {id:data[i]._id, title: data[i].name,start: new Date(data[i].date), end: new Date(data[i].date),allDay: true};
      }
      console.log($scope.events);
    });
    $scope.eventSources = [$scope.events];

  });

