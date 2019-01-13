(function() {
    'use strict';

    angular.module('maApp.core')
        .config(['$stateProvider', config]);

    function config($stateProvider) {
        $stateProvider.state('org.edit.users', {
            url: '/users',
            templateUrl: 'src/app/pages/org.edit.users/org.edit.users.html',
            controller: 'OrgEditUsersCtrl',
            authenticate: true,
            title: function(state, params) {
                return params.orgId + ' - Organization (Users)';
            },
            resolve: {
                members: ['org', 'orgService', resolveMembers],
                invitations: ['org', 'orgService', resolveInvites]
            }
        });
    }

    function resolveMembers(org, orgService) {
        return org && orgService.getMembers(org.Id);
    }

    function resolveInvites(org, orgService) {
        return org && orgService.getInvites(org.Id);
    }
})();