'use strict';

angular.module('dailyLifeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dayPlanner', {
        url: '/dayPlanner',
        templateUrl: 'app/dayPlanner/dayPlanner.html',
        controller: 'DayPlannerCtrl'
      });
  });
