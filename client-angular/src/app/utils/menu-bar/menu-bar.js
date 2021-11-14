'use strict';

function menuBarController ($rootScope, $http, $state, Auth) {
	var self = this;

	Auth.getCurrent()
		.then(function () {
			self.current = Auth._current;
		});

	self.hasCurrent = function () {
		self.current = Auth._current;
		return Auth._current;
	};

	self.isAtHome = function () {
		return $state.is('home');
	}

	self.logout = function () {
		Auth.logout();
	}

	self.state = $state;
};

function menuBar () {
	return {
		restrict: 'E',
        templateUrl : "/app/utils/menu-bar/menu-bar.html",
        controller: menuBarController,
        controllerAs: 'menu'
    };
};

angular.module('project.utils.menu-bar', ['project.api.auth'])
	.directive('menuBar', menuBar);