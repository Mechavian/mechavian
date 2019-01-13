(function() {
    'use strict';

    angular.module('maApp.core')
        .config(['$stateProvider', config]);

    function config($stateProvider) {
        $stateProvider
            .state('org.view',
                {
                    authenticate: true,
                    templateUrl: 'src/app/pages/org.view/org.view.html',
                    url: '',
                    controller: 'OrgViewCtrl',
                    params: {
                        docName: {value: 'Home'},
                        showDocInfo: {value: false},
                        showOrgName: {value: true}
                    },
                    title: function(state, params) {
                        return params.orgId + ' - ' + params.docName;
                    },
                    resolve: {
                        docLink: ['org', '$stateParams', 'docLinkService', resolveDocLink]
                    }
                })
            .state('org.doc',
                {
                    authenticate: true,
                    templateUrl: 'src/app/pages/org.view/org.view.html',
                    url: '/d/*docName',
                    controller: 'OrgViewCtrl',
                    params: {
                        showDocInfo: {value: true},
                        showOrgName: {value: true}
                    },
                    title: function(state, params) {
                        return params.orgId + ' - ' + params.docName;
                    },
                    resolve: {
                        docLink: ['org', '$stateParams', 'docLinkService', resolveDocLink]
                    }
                })
            .state('org.rootDoc',
                {
                    authenticate: true,
                    templateUrl: 'src/app/pages/org.view/org.view.html',
                    url: '^/d/*docName',
                    controller: 'OrgViewCtrl',
                    params: {
                        showDocInfo: {value: true},
                        showOrgName: {value: false},
                        orgId: {value: 'mechavian'}
                    },
                    title: function(state, params) {
                        return params.docName;
                    },
                    resolve: {
                        docLink: ['org', '$stateParams', 'docLinkService', resolveDocLink]
                    }
                });
    }

    function resolveDocLink(org, $stateParams, docLinkService) {
        return docLinkService.get(org.Id, $stateParams.docName);
    }
})();