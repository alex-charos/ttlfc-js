'use strict';
var topTrumpService = angular.module('topTrumpService', ['ngResource']);
topTrumpService.factory('ttService',[ '$resource', function($resource) {
   return $resource('https://ttlfc.herokuapp.com/tt', {}, {
   		enterLobby: {method:'POST', url:'https://ttlfc.herokuapp.com/tt/enter-lobby'},
   		viewHand: {method: 'GET', url:'https://ttlfc.herokuapp.com/tt/game/:gameId/view-hand/:playerId'},
   		executeTrick: {method: 'POST', url:'https://ttlfc.herokuapp.com/tt/game/:gameId/trick/attribute/:attribute'},
   		checkStatus: {method: 'GET', url:'https://ttlfc.herokuapp.com/tt/my-update/:playerId'},
   		getPlayerTurn: {method:'GET', url:'https://ttlfc.herokuapp.com/tt/game/turn/:gameId'}
      
    });
}]);