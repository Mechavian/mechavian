(function() {
    'use strict';

    angular.module('maApp.core')
        .controller('OrgEditDeleteCtrl', ['$scope', '$state', '$http', 'errorProvider', 'org', orgEditDeleteCtrl]);

    function orgEditDeleteCtrl($scope, $state, $http, errorProvider, org) {
        $scope.errorMessage = '';
        $scope.org = org;
        $scope.isBusy = false;
        $scope.deleteOrg = deleteOrg;
        $scope.canDelete = canDelete;
        $scope.inputValue = '';

        function canDelete(input) {
            return input === org.DisplayName;
        }

        function deleteOrg() {
            $scope.isBusy = true;

            $http.delete('/api/v2.0/Organizations(' + org.Id + ')')
                .then(onSuccess, onFailed);
        }

        function onSuccess() {
            $state.go('coming-soon', {orgId: $scope.shortName});
        }

        function onFailed(response) {
            $scope.isBusy = false;
            $scope.errorMessage = errorProvider.getResponseErrorMessage(response);
        }
    }
})();