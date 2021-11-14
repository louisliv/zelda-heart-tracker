'use strict';

function GameStates ($stateProvider) {
  var self = this;
  
  var games = {
    name: 'games',
    abstract: true,
    url: '/games',
    templateUrl: '/app/games/games.html',
    controller: angular.noop,
    controllerAs: 'games'
  };

  var gamesList = {
    name: 'games.list',
    url: '',
    templateUrl: '/app/games/list/list.html',
    controller: 'GamesListController',
    controllerAs: 'ctrl'
  };

    // var gearDetail = {
    //   name: 'gear.detail',
    //   url: '/:id',
    //   templateUrl: '/app/gear/detail/detail.html',
    //   controller: 'GearDetailController',
    //   controllerAs: 'ctrl'
    // };

  $stateProvider.state(games);
  // $stateProvider.state(gearDetail);
  $stateProvider.state(gamesList);
};

angular.module('project.games', [
  'project.api.games',
  'project.games.list',
  // 'project.systems.detail'
])
  .config(GameStates);