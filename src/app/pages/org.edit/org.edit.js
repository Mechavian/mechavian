(function() {
    'use strict';

    angular.module('maApp.core')
        .config(['$stateProvider', config]);

    function config($stateProvider) {
        $stateProvider.state('org.edit', {
            templateUrl: 'src/app/pages/org.edit/org.edit.html',
            controller: 'OrgEditCtrl',
            abstract: true,
            resolve: {
                isValid: ['$state', 'org', 'role', validateRole]
            }
        });
    }

    function validateRole($state, org, role) {
        // User must be an 'Owner' to access any 'Edit' pages
        if (role.Id !== 1 && role.Id !== 2) {
            var params = {
                statusCode: 403,
                errorMessage: 'You do not have the correct permissions to alter settings ' +
                    'for "' + org.DisplayName + '". If you need access to this page, ' +
                    'contact the owner of this organization.'
            };

            $state.go('error', params, {location: false});
            return false;
        }

        return true;
    }
})();