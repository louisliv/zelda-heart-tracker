'use strict';

function SystemStates ($stateProvider) {
  var self = this;
  
  var systems = {
    name: 'systems',
    abstract: true,
    url: '/systems',
    templateUrl: '/app/systems/systems.html',
    controller: angular.noop,
    controllerAs: 'systems'
  };

  var systemsList = {
    name: 'systems.list',
    url: '',
    templateUrl: '/app/systems/list/list.html',
    controller: 'SystemsListController',
    controllerAs: 'ctrl'
  };

  $stateProvider.state(systems);
  $stateProvider.state(systemsList);
};

angular.module('project.systems', [
  'project.api.systems',
  'project.systems.list',
])
  .config(SystemStates);