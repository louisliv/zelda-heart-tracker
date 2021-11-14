function Auth (api, Restangular, $q, toastr) {
	var model, modelExtensions = {};

	model = api.createModel('auth', modelExtensions);
	
	model.isAuthenticated = function () {
		var self = this;

		return model.customGET('is_authenticated');
	};

	model.login = function (creds) {
		var self = this;

		return model.customPOST(creds, 'login')
			.then(function (response) {
				model._current = response.data;
				return model._current;
			});
	};

	model.logout = function () {
		var self = this;

		return model.customPOST({}, 'logout')
			.then(function () {
				model._current = undefined;
			})
			.catch(function (response) {
				toastr.error(response.data);
			});
	};

	model.getCurrent = function (forceGET) {
		if (model._current && !forceGET) {
			return $q.resolve(model._current);
		}

		return model.customGET('current')
			.then(function (response) {
				model._current = response.data;
				return model._current;
			});
	};

	return model;
};

angular.module('project.api.auth', [])
	.factory('Auth', ['api', 'Restangular', '$q', 'toastr', Auth]);