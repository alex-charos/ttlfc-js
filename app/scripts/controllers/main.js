'use strict';

/**
 * @ngdoc function
 * @name ttlfcJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ttlfcJsApp
 */
angular.module('ttlfcJsApp')
  .controller('MainCtrl', ['ttService', function (ttService) {
  	var player = {firstName:"Alex", lastName:'Charos', email:'realtowz@yahoo.com'};
  	ttService.enterLobby(player);

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
