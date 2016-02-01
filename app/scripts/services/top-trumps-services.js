'use strict';
var topTrumpService = angular.module('topTrumpService', ['ngResource']);
topTrumpService.factory('ttService',[ '$resource', function($resource) {
   return $resource('/tt', {}, {
   		enterLobby: {method:'POST', url:'/tt/enter-lobby'},
   		viewHand: {method: 'GET', url:'/tt/game/:gameId/view-hand/:playerId'},
   		executeTrick: {method: 'POST', url:'/tt/game/:gameId/trick/attribute/:attribute'},
   		checkStatus: {method: 'GET', url:'/tt/my-update/:playerId'},
   		getPlayerTurn: {method:'GET', url:'/tt/game/turn/:gameId'}
      
    });
}]);