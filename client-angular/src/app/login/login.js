'use strict';
function LoginController (Auth) {
	console.log('here');
};

function LoginStates ($stateProvider) {
	var login = {
    	name: 'login',
    	url: '/login',
    	templateUrl: '/app/login/login.html',
    	controller: LoginController,
    	controllerAs: 'login'
  	};

  	$stateProvider.state(login);
};

angular.module('project.login', [
  	'project.api.auth'
])
  	.config(LoginStates);
