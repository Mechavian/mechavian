(function() {
    'use strict';

    angular.module('maApp.core')
           .config(['$stateProvider', config]);

    function config($stateProvider) {
        $stateProvider.state('error', {
            url: '/error',
            templateUrl: 'src/app/pages/error/error.html',
            controller: 'ErrorCtrl',
            params: {
                statusCode: null,
                errorMessage: 'An unknown error has occurred.'
            },
            title: 'Error'
        });
    }
})();