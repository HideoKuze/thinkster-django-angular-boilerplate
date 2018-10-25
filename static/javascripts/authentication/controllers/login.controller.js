/**
* Register controller
* @namespace thinkster.authentication.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.authentication.controllers')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', '$scope', 'Authentication'];

  /**
  * @namespace RegisterController
  */
  function LoginController($location, $scope, Authentication) {
    var vm = this;

    vm.login = login;

    activate();

    /**
    * @name register
    * @desc Register a new user
    * @memberOf thinkster.authentication.controllers.RegisterController
    */
    
    // this will store the status so I can access it in the HTML
    vm.error_status = ''


    function activate() {
      //If the user is authenticated, they should not be here

      if (Authentication.isAuthenticated()) {
        $location.url('/')
      }
    }

    function login() {
      Authentication.login(vm.email, vm.password)
    }
  }
})();