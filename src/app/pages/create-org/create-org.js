(function() {
    'use strict';

    angular.module('maApp.core')
        .config(['$stateProvider', config]);

    function config($stateProvider) {
        $stateProvider.state('create-org', {
            url: '/create/org',
            templateUrl: 'src/app/pages/create-org/create-org.html',
            controller: 'CreateOrgCtrl',
            authenticate: true,
            title: 'Create Organization'
        });
    }
})();