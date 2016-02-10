'use strict';
var topTrumpService = angular.module('topTrumpService', ['ngResource']);
topTrumpService.factory('ttService',[ '$resource','endpointBaseUrl', function($resource,endpointBaseUrl) {
   return $resource(endpointBaseUrl, {}, {
   		enterLobby 		: {method:'POST', 	url:endpointBaseUrl+'/enter-lobby'},
   		viewHand 		: {method:'GET', 	url:endpointBaseUrl+'/game/:gameId/view-hand/:playerId'},
   		executeTrick	: {method:'POST', 	url:endpointBaseUrl+'/game/:gameId/trick/attribute/:attribute'},
   		checkStatus		: {method:'GET', 	url:endpointBaseUrl+'/my-lobby-status/:playerId'},
   		getPlayerTurn	: {method:'GET', 	url:endpointBaseUrl+'/game/turn/:gameId'},
   		heartbeat		: {method:'GET', 	url:endpointBaseUrl+'/heartbeat/player/:playerId'},
      
    });
}]);