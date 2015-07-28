'use strict';

angular.module('dailyLifeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dailyPlan', {
        url: '/dailyPlan',
        templateUrl: 'app/dailyPlan/dailyPlan.html',
        controller: 'DailyPlanCtrl'
      });
  });
