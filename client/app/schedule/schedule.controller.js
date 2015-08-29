'use strict';

angular.module('dailyLifeApp')
  .controller('ScheduleCtrl', function($scope, $http, socket, $compile,uiCalendarConfig, $modal, Auth){

    $scope.user = Auth.getCurrentUser();

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
      //console.log(event.start);
      $http.put('/api/things/' + event._id,{
        start : event.start.format('L'),
        end : event.start.format('L')
      });
    };

    $scope.alertOnResize = function( event, delta, revertFunc, jsEvent, ui, view ) {
        //console.log(event.end);
      $http.put('/api/things/' + event._id,{
        start : event.start.format('L'),
        end : event.end.subtract(1,'d').format('L')
      });
    };

    /*
    * 렌더링까지 하면 속도가 느려진다고 생각됨
    * */
    //$scope.calendarEventRender = function( event, element, view ) {
    // if(event.priority==='high')
    //    event.backgroundColor = 'red';
    //}

    //$scope.renderView = function(view){
    //  var date = new Date(view.calendar.getDate());
    //  $scope.currentDate = date.toDateString();
    //    console.log('Page render with date '+ $scope.currentDate);
    //};

    //$scope.extraEventSignature = function(event){
    //  console.log('event change : ' + event);
    //}

    $scope.events = [];

    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 'auto',
        editable: true,
        header:{
          left: 'month basicWeek basicDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        dayClick: $scope.calendarDayClick
        //eventRender : $scope.calendarEventRender
        //viewRender: $scope.renderView
      }
    };

    $http.get('/api/things/byOwnerId/'+$scope.user._id).success(function(data) {
      //뭔가 더 간단한 방법이 있을거 같다. update 이
      for(var i = 0; i < data.length; i++)
      {
        /*
        * stick : true --> 월 변경할때 사라지는 거 방지
        * */
        $scope.events[i] = {_id:data[i]._id, title: data[i].title ,start: new Date(data[i].start), end: new Date(data[i].end), allDay: data[i].allDay, priority : data[i].priority ,stick:true};
        if($scope.events[i].priority==='high')
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
          var index = array.indexOf(item);
          array[index] = {_id:item._id, title: item.title,start: new Date(item.start), end: new Date(item.end),allDay: item.allDay, priority : item.priority , stick:true};
          if(array[index].priority==='high')
            array[index].backgroundColor = 'red';
          $scope.eventSources = [array];
        }else{
          $scope.eventSources = [array];
        }

      });


    });

    $scope.eventSources = [$scope.events];




  })

  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, todayDate, $http, Auth) {
    $scope.user = Auth.getCurrentUser();
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
        owner : $scope.user._id,
        title: $scope.newThing,
        start: todayDate,
        end: todayDate
      });
      $scope.newThing = '';
        $modalInstance.close();
    };
  });

