'use strict';

function MyGamesListController (MyGames) {
	var self = this;
	
	MyGames.getList()
		.then(function (response) {
			self.gamelist = response.data[0];
		});
};

var MyGamesComponent = {
  templateUrl: '/app/utils/my-games/my-games.html',
  controller: MyGamesListController,
  controllerAs: 'myGames'
};

angular.module('project.utils.my-games', [
	'project.api.my-games'
])
	.controller('MyGamesListController', MyGamesListController)
	.component('myGames', MyGamesComponent);