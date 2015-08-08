'use strict';

angular.module('dailyLifeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        //resolve : {
        //  user : function(Auth){
        //    Auth.isLoggedInAsync(function(success){
        //      if(success){
        //        console.log('로그인 되있음');
        //        return Auth.getCurrentUser();
        //      }
        //    });
        //  }
        //}
      });
  });

