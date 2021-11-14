'use strict';

function OverlayController () {
	var self = this;
};

function Overlay () {
	return {
		restrict: 'E',
        transclude: true,
		templateUrl: '/app/utils/overlay/overlay.html',
  		controller: OverlayController,
  		controllerAs: 'overlay'
	}
};

angular.module('project.utils.overlay', [])
	.controller('OverlayController', OverlayController)
	.directive('overlay', Overlay);