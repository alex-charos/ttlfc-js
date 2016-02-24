'use strict';

/**
 * @ngdoc function
 * @name ttlfcJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ttlfcJsApp
 */
angular.module('ttlfcJsApp')
  .controller('TablesCtrl', ['$scope', '$interval', '$location', 'ttService', 'userService', 
                    function ($scope, $interval, $location, ttService, userService) {
  	$scope.waitingTables = [];
    $scope.player= userService.user;
    

    if (userService.user === undefined) {
      $location.path('/');
    }
    $scope.createTable = function(newReqTable) {
      var per = {player: $scope.player, requestType: 'createTable', requestTable:newReqTable};
      ttService.enterLobby(per,function(resp) { 
        
        $scope.per = resp;
        $scope.player.uuid = resp.playerToken;
        
        if ($scope.per.response === 'enteredGame') {
          $scope.startGame();
        } else {
          $scope.getWaitingTables();
        }
        
      });
    };
    $scope.joinTable = function(table) {
      console.log($scope.player);
      var per = {player: $scope.player, requestType: 'joinTable', requestTable:table};

      ttService.enterLobby(per,function(resp) { 
        $scope.per = resp;
        $scope.player.uuid = resp.playerToken;
        
        if ($scope.per.response === 'enteredGame') {
          userService.gameId = resp.gameToken;
          $location.path('/main');
        } else {
          $scope.getWaitingTables();
        }
        
      });
    };
    $interval(function() {
            ttService.heartbeat({playerId:$scope.player.uuid});
          }, 40000);
    
    $interval(function() {
           $scope.checkStatus();
          }, 4000);
     
    
    $scope.checkStatus = function(){
       ttService.checkStatus({playerId:$scope.player.uuid}, function(resp) {
                  $scope.per = resp;
                  if (resp.response === 'inWaitingRoom') {
                    console.log('waiting...');
                  } else if (resp.response === 'enteredGame') {
                    console.log('Started!');
                    userService.gameId = resp.gameToken;
                    $location.path('/main');

                  }
                });
    };
    $scope.isPlayerInTable = function(tableId) {
      console.log('searching for table ' + tableId);
      for (var i =0; i < $scope.waitingTables.length; i++ ) {
        if ($scope.waitingTables[i].id === tableId) {
          for (var j =0; j < $scope.waitingTables[i].playersWaiting.length; j++) {
            if ($scope.waitingTables[i].playersWaiting[j].uuid === $scope.player.uuid) {
              return true;
            }
          }
        }
      }
      return false;
    };
         

    $scope.getWaitingTables = function() {
      ttService.getWaitingTables(function(resp) { 
        $scope.waitingTables = [];
        for (var key in resp) {
          if (resp.hasOwnProperty(key) && resp[key].playersWaiting !==undefined) {
            console.log('adding : '+ key + ':' + resp[key]);
            $scope.waitingTables.push(resp[key]);
          }
        }
        
        
      });
    };
    
  	
   $scope.getWaitingTables();

  }]);
