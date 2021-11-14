'use strict';

function ProfileStates ($stateProvider) {
  var self = this;
  
  var profiles = {
    name: 'profiles',
    abstract: true,
    url: '/profiles',
    templateUrl: '/app/profiles/profiles.html',
    controller: angular.noop,
    controllerAs: 'profiles'
  };

  var profilesList = {
    name: 'profiles.list',
    url: '',
    templateUrl: '/app/systems/list/list.html',
    controller: 'ProfilesListController',
    controllerAs: 'ctrl'
  };

  var profileDetail = {
    name: 'profiles.detail',
    url: '/:id',
    templateUrl: '/app/profiles/detail/detail.html',
    controller: 'ProfileDetailController',
    controllerAs: 'ctrl',
    resolve: {
      profile: function ($stateParams, Profiles) {
        return Profiles.get($stateParams.id)
          .then (function (response) {
            return response.data;
          });
      }
    }
  };

  $stateProvider.state(profiles);
  $stateProvider.state(profileDetail);
  $stateProvider.state(profilesList);
};

angular.module('project.profiles', [
  'project.api.profiles',
  'project.profiles.list',
  'project.profiles.detail'
])
  .config(ProfileStates);