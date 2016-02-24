'use strict';

/**
 * @ngdoc function
 * @name ttlfcJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ttlfcJsApp
 */
angular.module('ttlfcJsApp')
  .controller('LoginCtrl', ['$scope', '$location','ttService','userService', function ($scope, $location, ttService, userService) {
    if (userService.user !== undefined) {
      $location.path("tables");
    }
  	$scope.player = {};
  	$scope.player = {firstName:'', lastName:'', email:'', uuid:''};
  	$scope.loginPlayer = function(player) {
      userService.user= player;
      $location.path("tables");
    };
  }]);
