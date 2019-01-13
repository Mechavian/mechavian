(function() {
    'use strict';

    angular.module('maApp.core')
        .config(['$stateProvider', config]);

    function config($stateProvider) {
        $stateProvider.state('join-org', {
            url: '/org/join?code',
            controller: ['$state', 'orgId', controller],
            authenticate: true,
            resolve: {
                orgId: ['$stateParams', '$http', acceptInvite]
            }
        });
    }

    function controller($state, orgId) {
        if (orgId) {
            $state.go('org.view', {orgId: orgId});
        } else {
            var params = {
                statusCode: 404,
                errorMessage: 'The code provided was not valid. Retry the link provided in the ' +
                    'invitation email or contact the owner of this organization to get a new code. ' +
                    'If that does not work, please contact support@mechavian.com.'
            };

            $state.go('error', params, {location: false});
        }
    }

    function acceptInvite($stateParams, $http) {
        var args = atob($stateParams.code || '').split('|');

        if (args.length !== 3) {
            return null;
        }

        var model = {
            Id: args[0],
            Code: args[1]
        };

        var orgId = args[2];

        return $http.post('/api/v2.0/Organizations(' + orgId + ')/Fn.AcceptInvite', model)
            .then(onSuccess, onFailure);

        function onSuccess(response) {
            return response.data && response.data.value;
        }

        function onFailure() {
            return null;
        }
    }
})();