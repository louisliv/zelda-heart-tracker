'use strict';

// Declare app level module which depends on views, and components
angular.module('project', [
	'toastr',
	'ngAnimate',
	'ui.bootstrap',
	'ui.bootstrap.tpls',
	'ui.router',
	'restangular',
	'project.api',
	'project.home',
	'project.login',
	'project.nav-bar',
	'project.my-games',
	'project.games',
	'project.profiles',
	'project.utils',
	'project.utils.filters',
	'project.utils.menu-bar',
	'project.utils.my-games'
])
	.config(function($locationProvider, $stateProvider, $urlRouterProvider, RestangularProvider) {
		RestangularProvider.setRequestSuffix('/');

		RestangularProvider.setFullResponse(true)

		var home = {
			name: 'home',
			url: '/',
			templateUrl: '/app/home/home.html',
			controller: HomeController,
			controllerAs: 'home'
		};

		$urlRouterProvider.when('', '/');

		$stateProvider.state(home);
	})
	.config(function ($httpProvider) {
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	})
	.run(function ($rootScope, $state,) {
		$rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
			$rootScope.previousState = from;
			$rootScope.fromParams = fromParams;
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		});
	});