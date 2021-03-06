'use strict';

/**
 * @ngdoc function
 * @name ttlfcJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ttlfcJsApp
 */
angular.module('ttlfcJsApp')
  .controller('MainCtrl', ['$scope', '$interval','ttService','userService', function ($scope, $interval, ttService, userService) {
  	$scope.player = {};
  	$scope.player = userService.user;
  	$scope.isMyTurn = undefined;
  	$scope.per = {response:'notEntered'};
    $scope.gameId = userService.gameId;


    var hb;
    $scope.heartbeat = function(){
      hb = $interval(function() {
            ttService.heartbeat({playerId:$scope.player.uuid});
          }, 500);

    };

  	$scope.startGame = function(){
  		$scope.viewHand();
  		$scope.checkTurnPlayer();

  	};
  	$scope.startTurn = function(){
  		$scope.isMyTurn = true;
  		 if (angular.isDefined(checkTurn)) {
            $interval.cancel(checkTurn);
            checkTurn = undefined;
          }
 		 $scope.viewHand();
  	};
  	var checkTurn;
  	$scope.checkTurnPlayer = function(){
  		checkTurn = $interval(function() {
            ttService.getPlayerTurn({gameId: $scope.gameId}, function(pl) {
            		
  			if (pl.trickHistory!==null && pl.trickHistory!==undefined) {
	  			for (var i =0; i <pl.trickHistory.length; i++) {
	  				if ($scope.lastTrick === undefined ||pl.trickHistory.id > $scope.lastTrick.id ) {
	  					$scope.lastTrick = pl.trickHistory[i];
	  					$scope.examineTrick($scope.lastTrick);
	  				}
	  				
	  			}
  			}
  			if (pl.turn.uuid === $scope.player.uuid) {
  				console.log('Your Turn!');
  				$scope.startTurn();
  			}  else {
  				$scope.isMyTurn = false;
  			}
  		
  		});
          }, 1000);
  	};

 
    $scope.viewHand = function(){
  		ttService.viewHand({gameId:$scope.gameId, playerId: $scope.player.uuid}, function(ph) {
  			 
  			$scope.ph = ph;
  			$scope.activeCard = $scope.ph.cards[0];
  		});
  	};
  	$scope.executeTrick = function(attrName) {
  		console.log('will execute: ' + attrName);
  		ttService.executeTrick({gameId:$scope.gameId, attribute:attrName},$scope.player, function (ret) {
  			$scope.lastTrick = ret;
  			$scope.examineTrick($scope.lastTrick);
  			$scope.viewHand();
  			$scope.checkTurnPlayer();
  			$scope.isMYTurn = false;
  		});
  	};

  	$scope.examineTrick = function(trick) {

  		console.log('examinging: ');
  		console.log(trick);
  		console.log(trick.result.player.uuid);
  		console.log('i am : ' + $scope.player.uuid);
  		if (trick.result.outcome=== 'roundWin') {
  				if (trick.result.player.uuid === $scope.player.uuid) {
  					$scope.lastRoundWon = true;
  				} else {
  					$scope.lastRoundWon = false;
  				}
  			} else if (trick.result.outcome=== 'roundDraw') {
  				$scope.lastRoundWon = undefined;

  			} else if (trick.result.outcome === 'gameWin') {
  				$scope.gameId = undefined;
  				if (trick.result.player.uuid === $scope.player.uuid) {
  					$scope.gameWon = true;
  				} else {
  					$scope.gameWon = false;
  				}
  			}

  	};

        $scope.startGame();

  }]);
