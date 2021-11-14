'use strict';

function SystemsListController (Systems, $filter) {
	var self = this;

	self.itemsPerPage = 9;
	self.currentPostPage = 1;

	self.changePage = function (page) {
		self.currentPostPage = page;
	};
	
	Systems.getList()
		.then(function (response) {
			self.systems = response.data;
		});
};

angular.module('project.systems.list', [
	'project.api.systems',
	'project.utils.filters'
])
	.controller('SystemsListController', SystemsListController);