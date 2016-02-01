'use strict';

/**
 * @ngdoc function
 * @name ttlfcJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ttlfcJsApp
 */
angular.module('ttlfcJsApp')
  .controller('MainCtrl', ['$scope','ttService', function ($scope, ttService) {
  	$scope.player = {};
  	$scope.player = {firstName:'Alex', lastName:'Charos', email:'realtowz@yahoo.com', uuid:''};
  	//ttService.enterLobby(player);
  	$scope.per = {response:'notEntered'};
  	$scope.enterLobby = function(player) {
  		ttService.enterLobby(player,function(resp) { 
  			$scope.per = resp;
  			if ($scope.per.response === 'enteredGame') {
  				$scope.gameId = $scope.per.gameToken;
  				$scope.requestDeal();
  			}
  			$scope.player.uuid = resp.playerToken;
  		});
  	}

  	$scope.requestDeal = function() {
  		ttService.deal({gameId: $scope.gameId}, function (resp) {
  			$scope.viewHand();
  		});
  	}

  	$scope.viewHand = function(){
  		ttService.viewHand({gameId:$scope.gameId, playerId: $scope.player.uuid})
  	}
   

  }]);
