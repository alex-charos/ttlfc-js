var topTrumpService = angular.module('topTrumpService', ['ngResource']);
topTrumpService.factory('ttService',[ '$resource', function($resource) {
   return $resource('http://localhost:8080', {}, {
   		enterLobby: {method:'POST', url:'http://localhost:8080/enter-lobby'}
      
    });
}]);