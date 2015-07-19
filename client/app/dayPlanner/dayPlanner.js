'use strict';

angular.module('dailyLifeApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dayPlanner', {
        url: '/dayPlanner',
        templateUrl: 'app/dayPlanner/dayPlanner-form.html',
        controller: 'DayPlannerCtrl'
      })
      .state('dayPlanner.first', { //   dayPlanner/dayPlannerFirst
        url: '/dayPlannerFirst',
        templateUrl: 'app/dayPlanner/dayPlanner-first.html'
      })
      .state('dayPlanner.second', {
        url: '/dayPlannerSecond',
        templateUrl: 'app/dayPlanner/dayPlanner-second.html'
      });

    $urlRouterProvider.otherwise('/dayPlanner/dayPlannerFirst');

  });
