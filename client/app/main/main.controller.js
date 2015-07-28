'use strict';

angular.module('dailyLifeApp')
  .controller('MainCtrl', function ($scope ,$http, socket) {
    $scope.awesomeThings = [];
    $scope.day = {text:moment().format('dddd').toLowerCase()};
    $scope.priority = {value:'normal'};
    $scope.popover ={
      templateUrl : 'popoverTemplate.html'
    };
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);//실시간 업데이트 가능한이유??
    });

    $http.get('/api/diary/promise/yesterday').success(function(diary) {
      $scope.todayPromise = diary[0].todayPromise;
    });

    $scope.show = function(form){
      $scope[form] = !$scope[form];
    };

    $scope.addThing = function(opt, thing) {


      switch (opt){
        case 'must':
          if($scope.mustToDo === '')
            return;
          $http.post('/api/things', {
            title: $scope.mustToDo,
            start: moment().format('L'),
            end: moment().format('L'),
            priority : 'high'
          });
          $scope.mustToDo = '';
          break;

        case 'today':
          if($scope.todayToDo === '')
            return;
          $http.post('/api/things', {
            title: $scope.todayToDo,
            start: moment().format('L'),
            end: moment().format('L')
          });
          $scope.todayToDo = '';
          break;

        default :
          $http.post('/api/things', thing);
          break;
      }


    };

    $scope.priorityThing = function(thing){
      if(thing.priority =='normal'){
        $http.put('/api/things/' + thing._id,{
          priority : 'high'
        });
      }else{
        $http.put('/api/things/' + thing._id,{
          priority : 'normal'
        });
      }


    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.dayPlanFilter = function(time){
      return function(thing){
        if(thing.start!==undefined && thing.end!==undefined)
          return thing.dayPlan===time && moment(thing.start).format('L') <= moment().format('L') && moment(thing.end).format('L') >= moment().format('L');
      }
    };

    $scope.priorityFilter = function(thing){
      if(thing.start!==undefined && thing.end!==undefined)
        return thing.priority==='high'&& moment(thing.start).format('L') <= moment().format('L') && moment(thing.end).format('L') >= moment().format('L');
    };
    $scope.todayFilter = function(thing){
      if(thing.start!==undefined && thing.end!==undefined){
        return thing.priority==='normal'&&moment(thing.start).format('L') <= moment().format('L') && moment(thing.end).format('L') >= moment().format('L');}
    };
    $scope.weekFilter = function(thing){
      var nextWeek = moment().add(8,'d').startOf('day');
      return  moment(moment(thing.start).startOf('day')).isBetween(moment().startOf('day'),nextWeek)||moment(moment(thing.end).startOf('day')).isBetween(moment().startOf('day'),nextWeek);
    };
  })

  .directive('dragThing',function(){
    return {
      scope : true,
      link : function(scope, element, attrs){
        element.attr('draggable', 'true');

        element.on('dragstart', function(e){
          //element.children().addClass("child-elements");
          //console.log('drag start');
          e.originalEvent.dataTransfer.setData('thingId',scope.thing._id)
        });
        element.on('dragend', function(){
          //element.children().removeClass("child-elements");
          //console.log('drag end');
        });

      }
    };
  })

  .directive('dropThing',function($http){
    return {
      //scope : true,
      link : function(scope, element, attr){

        //element.on('dragleave', function(e){
        //  //element.children().removeClass("child-elements");
        //  e.stopPropagation();
        //  e.preventDefault();
        //  console.log('drag leave');
        //});
        element.on('dragover', function(e){
          //element.children().removeClass("child-elements");
          e.stopPropagation();
          e.preventDefault();
          //console.log('drag over');
        });

        element.on('drop', function(e){
          //console.log(attr.dropThing);
          //console.log(e.originalEvent.dataTransfer.getData('thingId'));
          //console.log('drop');
          e.stopPropagation();
          e.preventDefault();
          //element.children().removeClass("child-elements");
          //if (e.preventDefault) {
          //  e.preventDefault(); // Necessary. Allows us to drop.
          //}
          //
          //if (e.stopPropogation) {
          //  e.stopPropogation(); // Necessary. Allows us to drop.
          //}
          switch(attr.dropThing){
            case 'highPriority':
              $http.put('/api/things/' + e.originalEvent.dataTransfer.getData('thingId'),{
                start: moment().format('L'),
                end: moment().format('L'),
                priority : 'high'
              });
              break;
            case 'today':
              $http.put('/api/things/' + e.originalEvent.dataTransfer.getData('thingId'),{
                start: moment().format('L'),
                end: moment().format('L'),
                priority : 'normal'
              });
              break;
            case 'morning':
              $http.put('/api/things/' + e.originalEvent.dataTransfer.getData('thingId'),{
                allDay : false,
                dayPlan : 'morning'
              });
              break;
            case 'afternoon':
              $http.put('/api/things/' + e.originalEvent.dataTransfer.getData('thingId'),{
                allDay : false,
                dayPlan : 'afternoon'
              });
              break;
            case 'night':
              $http.put('/api/things/' + e.originalEvent.dataTransfer.getData('thingId'),{
                allDay : false,
                dayPlan : 'night'
              });
              break;
          }


        });
      }
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
//  .directive('draggable',function(){
//    return function(scope, element){
//      var el = element[0];
//
//      el.draggable = true;
//
//      el.addEventListener(
//        'dragstart',
//        function(e) {
//          e.dataTransfer.effectAllowed = 'move';
//          e.dataTransfer.setData('Text', this.id);
//          this.classList.add('drag');
//          return false;
//        },
//        false
//      );
//
//      el.addEventListener(
//        'dragend',
//        function(e) {
//          this.classList.remove('drag');
//          return false;
//        },
//        false
//      );
//    }
//  })
//  .directive('droppable', function() {
//    return {
//      scope: {
//        drop: '&' // parent
//      },
//      link: function(scope, element) {
//        // again we need the native object
//        var el = element[0];
//
//        el.addEventListener(
//          'dragover',
//          function(e) {
//            e.dataTransfer.dropEffect = 'move';
//            // allows us to drop
//            if (e.preventDefault) e.preventDefault();
//            this.classList.add('over');
//            return false;
//          },
//          false
//        );
//
//        el.addEventListener(
//          'dragenter',
//          function(e) {
//            this.classList.add('over');
//            return false;
//          },
//          false
//        );
//
//        el.addEventListener(
//          'dragleave',
//          function(e) {
//            this.classList.remove('over');
//            return false;
//          },
//          false
//        );
//
//        el.addEventListener(
//          'drop',
//          function(e) {
//            // Stops some browsers from redirecting.
//            if (e.stopPropagation) e.stopPropagation();
//
//            this.classList.remove('over');
//
//            var item = document.getElementById(e.dataTransfer.getData('Text'));
//            this.appendChild(item);
//
//            // call the drop passed drop function
//            scope.$apply('drop()');
//
//            return false;
//          },
//          false
//        );
//      }
//    }
//  });

