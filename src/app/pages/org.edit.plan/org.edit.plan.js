(function() {
    'use strict';

    angular.module('maApp.core')
        .config(['$stateProvider', config]);

    function config($stateProvider) {
        $stateProvider.state('org.edit.plan', {
            url: '/plan',
            templateUrl: 'src/app/pages/org.edit.plan/org.edit.plan.html',
            controller: 'OrgEditPlanCtrl',
            authenticate: true,
            resolve: {
                plans: ['org', 'plan', 'orgService', resolvePlans],
                config: ['$http', resolveConfig]
            },
            title: function(state, params) {
                return params.orgId + ' - Organization (Plan)';
            }
        });
    }

    function resolvePlans(org, plan, orgService) {
        return orgService.getPlans().then(function(plans) {
            var containsPlan = false;
            angular.forEach(plans, function(p) {
                containsPlan = (containsPlan || p.Id === org.PlanId);
            });

            if (!containsPlan) {
                plans.push(plan);
            }

            return plans;
        });
    }

    function resolveConfig($http) {
        return $http.get('/js/config.json')
            .then(function(response) {
                return response.data;
            });
    }

})();