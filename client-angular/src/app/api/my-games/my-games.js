function MyGames (api) {
	var model, modelExtensions = {};

	model = api.createModel('gamelist', modelExtensions);
	
	model.getProfiles = function (gameId) {
		var self = this;
		return self.one('', gameId).all('profiles').getList()
	}

	model.addGame = function (gameId) {
		var self = this;
		data = {'id': gameId};
		
		return self.customPOST(data, 'add_game');
	}

	return model;
};

angular.module('project.api.my-games', [])
	.factory('MyGames', ['api', MyGames]);