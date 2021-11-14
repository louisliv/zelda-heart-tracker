function Games (api) {
	var model, modelExtensions = {};

	model = api.createModel('games', modelExtensions);

	return model;
};

angular.module('project.api.games', [])
	.factory('Games', ['api', Games]);