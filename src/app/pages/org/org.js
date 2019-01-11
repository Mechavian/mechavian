(function() {
    'use strict';

    angular.module('maApp.core')
        .config(['$stateProvider', config]);

    function config($stateProvider) {
        $stateProvider.state('org',
            {
                url: '/org/{orgId}',
                templateUrl: 'src/app/pages/org/org.html',
                abstract: true,
                resolve: {
                    org: ['$stateParams', 'orgService', resolveOrganization],
                    role: ['org', 'orgService', resolveRole],
                    plan: ['org', 'orgService', resolvePlan]
                }
            });
    }

    function resolveOrganization($stateParams, orgService) {
        return orgService.get($stateParams.orgId);
    }

    function resolveRole(org, orgService) {
        return org && orgService.getUserRole(org.Id);
    }

    function resolvePlan(org, orgService) {
        return org && orgService.getPlan(org.PlanId);
    }
})();