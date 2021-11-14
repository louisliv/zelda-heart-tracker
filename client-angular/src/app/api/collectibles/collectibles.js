function Collectibles (api) {
	var model, modelExtensions = {};

	model = api.createModel('collectibles', modelExtensions);

	model.getListByGame = function (gameId) {
		var self = this;

		return self.customGETLIST('', {game:gameId});
	}

	return model;
};

angular.module('project.api.collectibles', [])
	.factory('Collectibles', ['api', Collectibles]);