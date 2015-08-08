'use strict';

angular.module('dailyLifeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'ui.calendar',
  'angularMoment'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  /*
  *Redirect to login if route requires auth and you're not logged in
  *login 체크하고 그에 따라 첫화면 출력
  * */
  .run(function ($rootScope, $location, Auth) {
    //$on(name, listener(event, args))
    $rootScope.$on('$stateChangeStart', function (event, next, current) {
      Auth.isLoggedInAsync(function (loggedIn) {
        //next.authenticate?
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
        if(!loggedIn){
          $location.path('/login');
        }
      });
      //if (!Auth.isLoggedIn()) {
      //  Auth.isLoggedInAsync(function(login) {
      //    console.log(login);
      //  });
      //  $location.path('/login');
      //}
      //else {
      //  $location.path('/');
      //}
    });
  });
