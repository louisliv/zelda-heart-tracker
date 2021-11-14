'use strict';

function ProfileDetailController ($stateParams, $state, Collectibles, profile) {
	var self = this;

	self.profile = profile;

	self.isCustomHeaderOpen = false;

	Collectibles.getListByGame(profile.game)
		.then(function (response) {
			self.collectibles = response.data;
		});

	self.toggleCollapse = function (collectible) {
		collectible.openPanel = !collectible.openPanel;
	};

	self.inMyCollectibles = function (collectible) {
		return _.find(profile.collectibles, {'id': collectible.id});
	};

	self.markAsCollected = function (collectible) {
		profile.addCollectible(collectible);
		collectible.openPanel = false;
	};
};

angular.module('project.profiles.detail', [
	'project.api.collectibles',
	'project.utils.filters'
])
	.controller('ProfileDetailController', ProfileDetailController);