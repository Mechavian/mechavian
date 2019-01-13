(function() {
    'use strict';

    angular.module('maApp.core')
           .config(['$stateProvider', config]);

    function config($stateProvider) {
        $stateProvider.state('login', {
            url: '/login?returnUrl',
            templateUrl: 'src/app/pages/login/login.html',
            controller: 'LoginCtrl',
            title: 'Login'
        });
    }
})();