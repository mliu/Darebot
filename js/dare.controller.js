(function() {
  'use strict';

  angular
    .module('app')
    .controller('DareController', DareController);

  DareController.$inject = ["$http", "DEFAULTS"];

  function DareController($http, DEFAULTS) {
    var vm = this;
    
    vm.addingPlayer = false;
    vm.addPlayer = addPlayer;
    vm.addingDare = false;
    vm.dareDescription = '';
    vm.dareName = '';
    vm.dareParticipants = 0;
    vm.dares = [];
    vm.disablePlayer = disablePlayer;
    vm.init = init;
    vm.playerName = "";
    vm.players = [];

    init();

    function addPlayer() {
      vm.players.unshift({ name: vm.playerName, dareCount: 0, disabled: false });
      updatePlayers();
      vm.playerName = "";
      vm.addingPlayer = false;
    }

    function disablePlayer(index) {
      vm.players[index].disabled = !vm.players[index].disabled;
      updatePlayers();
    }

    function init() {
      if(typeof(Storage) === "undefined") {
        alert("Your browser is not compatible. Sorry.");
        return;
      }

      // Instantiate dares
      if(localStorage["dare-dares"]) {
        vm.dares = JSON.parse(localStorage.getItem("dare-dares"));
      } else {
        vm.dares = DEFAULTS.dares;    
        localStorage.setItem("dare-dares", JSON.stringify(vm.dares));
      }

      // Instantiate players
      if(localStorage["dare-players"]) {
        vm.players = JSON.parse(localStorage.getItem("dare-players"));
      }
    };

    function updatePlayers() {
      localStorage.setItem("dare-players", JSON.stringify(vm.players));
    }

  }

})();
