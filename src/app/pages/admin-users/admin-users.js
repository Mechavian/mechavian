(function() {
    'use strict';

    angular.module('maApp.core')
           .config(['$stateProvider', config]);

    function config($stateProvider) {
        $stateProvider.state('admin-users', {
            url: '/admin/users',
            templateUrl: 'src/app/pages/admin-users/admin-users.html',
            controller: 'AdminUsersCtrl',
            authenticate: true,
            title: 'Admin - Users'
        });
    }
})();