'use strict';

angular.module('dailyLifeApp')
  .controller('ScheduleCtrl', function($scope, $http, socket, $compile,uiCalendarConfig, $modal){
    /* config object */

    $scope.calendarDayClick = function(date, jsEvent, view){
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'modalTemplate.html',
          controller: 'ModalInstanceCtrl',
          size: 'sm',
          resolve: {
            todayDate : function(){
              return moment(date).format('L');
            }
          }
        });

        modalInstance.result.then(function () {
        }, function () {
        });
      };

    $scope.alertEventOnClick = function( date, jsEvent, view){
    };

    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
      //console.log(event._id);
      console.log(moment.utc(event.end));
      $http.put('/api/things/' + event._id,{
        start : event.start.format('L'),
        end : event.end.format('L')
      });
    };

    $scope.alertOnResize = function( event, delta, revertFunc, jsEvent, ui, view ) {
        console.log(event.start.format('L')+event.end.format('L'));
      $http.put('/api/things/' + event._id,{
        start : event.start.format('L'),
        end : event.end.format('L')
      });
    }

    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        dayClick: $scope.calendarDayClick
      }
    };
    $scope.events = [];



    $http.get('/api/things').success(function(data) {
      //뭔가 더 간단한 방법이 있을거 같다.
      for(var i = 0; i < data.length; i++)
      {
        $scope.events[i] = {_id:data[i]._id, title: data[i].title ,start: new Date(data[i].start), end: new Date(data[i].end), allDay: data[i].allDay};
        if(data[i].priority==='high')
          $scope.events[i].backgroundColor = 'red';
      }
      //console.log($scope.events);

      //왜안되지.. 싱크업데이트는 되는데 afeter 콜백함수가 안된다.-->콜백함수 parameter 입력해야된다.
      //socket.syncUpdates('thing', $scope.events, function(){
      //  for(var i = 0; i < data.length; i++)
      //  {
      //    $scope.events[i] = {id:data[i]._id, title: data[i].name,start: new Date(data[i].date), end: new Date(data[i].date),allDay: true};
      //  }
      //  $scope.eventSources = [$scope.events];
      //  console.log($scope.eventSources);
      //
      //});

      socket.syncUpdates('thing', $scope.events, function(event, item, array){
        if(event==='created'||event==='updated'){
          //console.log('created');
          //console.log(item);
          array[array.indexOf(item)] = {_id:item._id, title: item.title,start: new Date(item.start), end: new Date(item.end),allDay: item.allDay};
          $scope.eventSources = [array];
        }else{
          $scope.eventSources = [array];
        }

      });


    });
    $scope.eventSources = [$scope.events];




  })

  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, todayDate, $http) {

    //$scope.items = items;
    //$scope.selected = {
    //  item: $scope.items[0]
    //};
    //
    //$scope.ok = function () {
    //  $modalInstance.close($scope.selected.item);
    //};
    //
    //$scope.cancel = function () {
    //  $modalInstance.dismiss('cancel');
    //};

    $scope.addThing = function() {
      if($scope.newThing === '')
        return;

      $http.post('/api/things', {
        title: $scope.newThing,
        start: todayDate,
        end: todayDate
      });
      $scope.newThing = '';
        $modalInstance.close();
    };
  });

