'use strict'
function AddProfileModalController($uibModalInstance, game) {
	var self = this;

	self.close = $uibModalInstance.close;
	self.dismiss = $uibModalInstance.dismiss;
	self.newProfile = {
		game: game.id
	}

	self.submit = function () {
		self.close(self.newProfile);
	}
}

function AddProfileModal($uibModal) {
	this.show = function (game) {
		var instance = $uibModal.open({
			templateUrl: '/app/my-games/profiles/add/add.html',
			controller: 'AddProfileModalController',
			controllerAs: 'modal',
			resolve: {
				game: function () {
					return game;
				}
			}
		});

		return instance;
	}
}

angular.module('project.my-games.profiles.add', [
	'project.my-games.profiles'
])
	.service('AddProfileModal', AddProfileModal)
	.controller('AddProfileModalController', AddProfileModalController)