angular.module('todoApp',['ngRoute']);

angular.module('todoApp').config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/',
            {
                templateUrl:'public/Main/partials/main.html',
                controller:'MainCtrl'
            }
        )
})