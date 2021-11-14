'use strict';

function MyGameStates ($stateProvider) {
  var self = this;
  
  var myGames = {
    name: 'myGames',
    abstract: true,
    url: '/my-games',
    template: '<ui-view></ui-view>',
    controller: angular.noop,
    controllerAs: 'myGames-ab'
  };

  var myGamesList = {
    name: 'myGames.list',
    url: '',
    templateUrl: '/app/utils/my-games/my-games.html',
    controller: 'MyGamesListController',
    controllerAs: 'myGames'
  };

  var myGamesProfiles = {
    name: 'myGames.profiles',
    url: '/:id/profiles',
    templateUrl: '/app/my-games/profiles/profiles.html',
    controller: 'MyGamesProfileController',
    controllerAs: 'ctrl',
    resolve: {
      game: function($stateParams, Games) {
        return Games.get($stateParams.id)
          .then (function (response) {
            return response.data;
          });
      }
    }
  };

  $stateProvider.state(myGames);
  $stateProvider.state(myGamesProfiles);
  $stateProvider.state(myGamesList);
};

angular.module('project.my-games', [
  'project.api.games',
  'project.utils.my-games',
  'project.my-games.profiles'
])
  .config(MyGameStates);