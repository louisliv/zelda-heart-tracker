'use strict';

function GamesListController (Games, MyGames, toastr, $filter) {
	var self = this;

	self.itemsPerPage = 9;
	self.currentPostPage = 1;

	self.changePage = function (page) {
		self.currentPostPage = page;
	};
	
	Games.getList()
		.then(function (response) {
			self.games = response.data;
		});

	self.addToList = function (game) {
		MyGames.addGame(game.id)
			.then(function () {
				toastr.success(game.name + ' added to your list successfully.')
				self.gamelist.push(game);
			});
	};

	MyGames.getList()
		.then(function (response) {
			self.gamelist = response.data[0].games;
		});

	self.gameInList = function (game) {
		return _.find(self.gamelist, {'id': game.id})
	};
};

angular.module('project.games.list', [
	'project.api.games',
	'project.api.my-games',
	'project.utils.filters',
	'project.utils.overlay'
])
	.controller('GamesListController', GamesListController);