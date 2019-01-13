(function() {
    'use strict';

    angular.module('maApp.core')
           .controller('AdminUsersCtrl', ['$scope', '$http', 'errorProvider', adminUsersCtrl]);

    function adminUsersCtrl($scope, $http, errorProvider) {
        $scope.isBusy = true;
        $scope.users = [];
        $scope.errorMessage = null;

        /*jshint validthis:true */
        this.$onInit  = onInit ;
        /*jshint validthis:false */

        function onInit() {
            $scope.isBusy = true;

            $http.get('/api/v2.0/Users')
                .then(onSuccess, onFailed)
                .finally(function() {
                    $scope.isBusy = false;
                });
        }

        function onSuccess(response) {
            $scope.users = response.data.value;
        }

        function onFailed(response) {
            $scope.errorMessage = errorProvider.getResponseErrorMessage(response);
        }
    }
})();