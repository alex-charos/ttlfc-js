'use strict';
var topTrumpService = angular.module('topTrumpService', ['ngResource']);
topTrumpService.factory('ttService',[ '$resource', function($resource) {
   return $resource('/tt', {}, {
   		enterLobby: {method:'POST', url:'/tt/enter-lobby'},
   		deal: {method:'GET', url:'/tt/game/:gameId/deal'},
   		viewHand: {method: 'GET', url:'/tt/game/:gameId/view-hand/:playerId'}
      
    });
}]);