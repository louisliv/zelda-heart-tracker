function Systems (api) {
	var model, modelExtensions = {};

	model = api.createModel('systems', modelExtensions);

	return model;
};

angular.module('project.api.systems', [])
	.factory('Systems', ['api', Systems]);