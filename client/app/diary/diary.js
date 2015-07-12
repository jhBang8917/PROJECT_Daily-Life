'use strict';

angular.module('dailyLifeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('diary', {
        url: '/diary',
        templateUrl: 'app/diary/diary.html',
        controller: 'DiaryCtrl'
      });
  });
