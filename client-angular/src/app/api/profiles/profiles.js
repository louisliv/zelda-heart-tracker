function Profiles (api) {
	var model, modelExtensions = {};

	modelExtensions.addCollectible = function (collectible) {
		var self = this;
		
		return self.customPOST(collectible.plain(), 'add_collectible')
			.then(function (response) {
				self.collectibles.push(collectible);
				self.percentage_complete = response.data.percentage_complete; 
			});
	};

	model = api.createModel('gameprofiles', modelExtensions);

	return model;
};

angular.module('project.api.profiles', [])
	.factory('Profiles', ['api', Profiles]);