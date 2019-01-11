(function() {
    'use strict';

    angular.module('maApp.core')
        .config(['$stateProvider', config]);

    function config($stateProvider) {
        $stateProvider.state('org.edit.general', {
            url: '/edit',
            templateUrl: 'src/app/pages/org.edit.general/org.edit.general.html',
            controller: 'OrgEditGeneralCtrl',
            authenticate: true,
            title: function(state, params) {
                return params.orgId + ' - Organization (Edit)';
            }
        });
    }
})();