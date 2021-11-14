'use strict';

function navBarController ($rootScope, NavBar, $http, $state) {
	var self = this;

	self.getTitle = function () {
		return NavBar.getTitle();
	};

	self.isAtHome = function () {
		return $state.is('home');
	}

	self.state = $state;
};

function navBar () {
	return {
		restrict: 'E',
        templateUrl : "/app/nav-bar/nav-bar.html",
        controller: navBarController,
        controllerAs: 'navbar'
    };
};

function navbarService () {
	var service = {};

	service.setTitle = function (title) {
		service.title = title
	};

	service.getTitle = function () {
		return service.title;
	};

	return service;
};

angular.module('project.nav-bar', [])
	.directive('navBar', navBar)
	.factory('NavBar', navbarService);