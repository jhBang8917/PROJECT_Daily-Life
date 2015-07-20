'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('dailyLifeApp'));
  beforeEach(module('socketMock'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('날 비교', function () {
    var thing = {
      title : '테스트 타이틀',
      start: moment().add(-7,'d').format('L'),
      end: moment().add(7, 'd').format('L')
    }
    scope.addThing('',thing);
    console.log(thing.start +'<-시작 끝->'+thing.end);
  });
});
