/**
* Authentication
* @namespace thinkster.authentication.services
*/
(function () {
  'use strict';

  angular
    .module('thinkster.authentication.services')
    .factory('Authentication', Authentication);


  Authentication.$inject = ['$cookies', '$http'];

  /**
  * @namespace Authentication
  * @returns {Factory}
  */
  function Authentication($cookies, $http) {
    /**
    * @name Authentication
    * @desc The Factory to be returned
    */
    var Authentication = {
      login: login,
      register: register,
      getAuthenticatedAccount: getAuthenticatedAccount,
      isAuthenticated: isAuthenticated,
      setAuthenticatedAccont: setAuthenticatedAccont,
      unauthenticate: unauthenticate
    };

    return Authentication;

    ////////////////////

    /**
    * @name register
    * @desc Try to register a new user
    * @param {string} username The username entered by the user
    * @param {string} password The password entered by the user
    * @param {string} email The email entered by the user
    * @returns {Promise}
    * @memberOf thinkster.authentication.services.Authentication
    */
    function register(email, password, username) {
      this.errors = []
      return $http.post('/api/v1/accounts/', {
        username: username,
        password: password,
        email: email,
      })

      function registerSuccessFn(data, status, headers, config) {
        Authentication.login(email, password)
      };

      function registerErrorFn(data, status, headers, config) {
        console.log(data)
        this.errors.push(data)
      }
    }

    function login(email, password){
      return $http.post('/api/v1/login/', {
        email: email,
        password: password
      }).then(loginSuccessFn, loginErrorFn);

      function loginSuccessFn(data, status, headers, config) {
        Authentication.setAuthenticatedAccount(data.data);
        window.location = '/'
      }

      function loginErrorFn(data, status, headers, config) {
        console.error('Failed');
        console.log(data)
      }
    }

    function getAuthenticatedAccount(){
      if (!$cookies.authenticatedAccount){
        return;
      }
      return JSON.parse($cookies.authenticatedAccount);
    }

    function isAuthenticated() {
      //return boolean value of authenticatedAccount cookie
      return !!$cookies.authenticatedAccount;
    }

    function setAuthenticatedAccont(account){
      //Set the authenticatedAccount cookie to a stringified version of the account object.
        $cookies.authenticatedAccount = JSON.stringify(account);
    }

    function unauthenticate() {
      delete $cookies.authenticatedAccount;
    }
  }
})();