'use strict';

angular.module('dailyLifeApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dayPlanner', {
        url: '/dayPlanner',
        templateUrl: 'app/dayPlanner/dayPlanner-form.html'
      })
      .state('dayPlanner.step', { //   dayPlanner/1
        url: '/:page',
        templateUrl: function($stateParams){
          return 'app/dayPlanner/dayPlanner-'+$stateParams.page+'.html';
        },
        controller: 'DayPlannerCtrl'
      })
      //.state('dayPlanner.secondstep', {
      //  url: '/second-step',
      //  templateUrl: 'app/dayPlanner/dayPlanner-2.html'
      //});


  });
