(function() {
    'use strict';

    angular.module('maApp.core')
        .config(['$stateProvider', config]);

    function config($stateProvider) {
        $stateProvider.state('org.edit.delete', {
            url: '/delete',
            templateUrl: 'src/app/pages/org.edit.delete/org.edit.delete.html',
            controller: 'OrgEditDeleteCtrl',
            authenticate: true,
            title: function(state, params) {
                return params.orgId + ' - Organization (Delete)';
            }
        });
    }
})();