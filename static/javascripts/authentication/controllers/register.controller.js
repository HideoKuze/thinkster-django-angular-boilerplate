/**
* Register controller
* @namespace thinkster.authentication.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.authentication.controllers')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', '$scope', 'Authentication'];

  /**
  * @namespace RegisterController
  */
  function RegisterController($location, $scope, Authentication) {
    var vm = this;

    vm.register = register;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.authentication.controllers.RegisterController
    */
    function activate() {
     // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
       $location.url('/');
      }
    }

    /**
    * @name register
    * @desc Register a new user
    * @memberOf thinkster.authentication.controllers.RegisterController
    */
    
    // this will store the status so I can access it in the HTML
    vm.error_status = ''

    function register() {
      // if t
      Authentication.register(vm.email, vm.password, vm.username).catch(function callbackError(error){
        // the catch statement can conflict with the methods in register() in authentication service
        // save the result of the promise to a variable
        // var result = error.status;
      vm.error_status += error.status
      console.log(vm.error_status)
      })
    }
  }

})();