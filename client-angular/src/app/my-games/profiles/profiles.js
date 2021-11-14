'use strict';

function MyGamesProfileController (MyGames, AddProfileModal, Profiles, $stateParams, toastr, game) {
	var self = this;

	self.game = game;
	self.profiles = [];
	
	MyGames.getProfiles($stateParams.id)
		.then(function (response) {
			self.profiles = response.data;
		});

	self.showAddModal = function () {
		var addModal = AddProfileModal.show(game);

		addModal.result.then(function (response) {
			Profiles.post(response)
				.then(function (response) {
					self.profiles.push(response.data)
					toastr.success("New profile added successfully.")
				})
		});
	}

	self.getAddPanelClasses = function () {
		if (!self.profiles.length) {
			return {'col-md-4': true, 'col-md-offset-4': true};
		}

		return {'col-md-3': true};
	}
};

angular.module('project.my-games.profiles', [
	'project.api.my-games',
	'project.api.profiles',
	'project.my-games.profiles.add'
])
	.controller('MyGamesProfileController', MyGamesProfileController);