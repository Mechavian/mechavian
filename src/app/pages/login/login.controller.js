(function() {
    'use strict';

    angular.module('maApp.core')
        .controller('LoginCtrl', ['$stateParams', '$scope', '$http', '$location', '$window', '$interval', 'authService', 'errorProvider', loginCtrl]);

    function loginCtrl($stateParams, $scope, $http, $location, $window, $interval, authService, errorProvider) {

        $scope.isBusy = true;
        $scope.returnUrl = $stateParams.returnUrl || '/';
        $scope.signInWithFacebook = signInWithFacebook;

        var initializeFacebookInterval = $interval(initializeFacebook, 100);
        $scope.$on('$destroy', stopInterval);

        function stopInterval() {
            if (initializeFacebookInterval) {
                $interval.cancel(initializeFacebookInterval);
                initializeFacebookInterval = null;
            }
        }

        function initializeFacebook() {
            if ($window.FB) {
                stopInterval();

                $window.FB.init({
                    appId: '1425579501025269',
                    status: true,
                    cookie: true,
                    xfbml: true,
                    version: 'v2.8'
                });

                $scope.isBusy = false;
            }
        }

        function signInWithFacebook() {
            $scope.errorMessage = '';

            FB.login(function(response) {
                if (response.authResponse) {
                    var accessToken = response.authResponse.accessToken;
                    $http.post('/api/v1.0/login/facebook', {
                        accessToken: accessToken
                    }).then(onSuccess, onFailed);
                } else {
                    $scope.errorMessage = 'User cancelled login or did not fully authorize.';
                }
            }, {
                scope: 'email,public_profile'
            });

            function onSuccess(response) {
                var token = response.data.token;
                var profile = response.data.user;

                authService.login(token, profile, true);

                $location.url($scope.returnUrl);
            }
        }

        function onFailed(response) {
            $scope.errorMessage = errorProvider.getResponseErrorMessage(response);
        }
    }
})();