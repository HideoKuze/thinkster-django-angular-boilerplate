var app = angular.module('RegisterRouting', []);

app.controller('HomeController', function ($scope) {
   $scope.heading = "Home";
});

app.controller('RegisterController', function ($scope) {
   $scope.heading = "Register";

   $scope.register = register;

   function register(){
     // this is calling the register method of the Authentication service
     alert("register view call");
   }
});

app.config(function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'home.html',
        controller: 'HomeController'
    }).
    when('/register', {
        templateUrl: 'register.html',
        controller: 'RegisterController'
    }).
    otherwise({
        redirectTo: '/home'
    });
});