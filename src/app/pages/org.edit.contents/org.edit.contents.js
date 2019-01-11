(function() {
    'use strict';

    angular.module('maApp.core')
        .config(['$stateProvider', config]);

    function config($stateProvider) {
        $stateProvider.state('org.edit.contents', {
            url: '/edit/contents',
            templateUrl: 'src/app/pages/org.edit.contents/org.edit.contents.html',
            controller: 'OrgEditContentsCtrl',
            authenticate: true,
            resolve: {
                docLinks: ['org', 'docLinkService', resolveDocLinks]
            },
            title: function(state, params) {
                return params.orgId + ' - Organization (Contents)';
            }
        });

        function resolveDocLinks(org, docLinkService) {
            return docLinkService.getAll(org.Id);
        }
    }
})();