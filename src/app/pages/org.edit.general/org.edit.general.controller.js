(function() {
    'use strict';

    angular.module('maApp.core')
        .controller('OrgEditGeneralCtrl', ['$scope', '$http', '$state', 'errorProvider', 'org', orgEditGeneralCtrl]);

    function orgEditGeneralCtrl($scope, $http, $state, errorProvider, org) {
        $scope.isBusy = false;
        $scope.org = org;
        $scope.shortName = org.ShortName;
        $scope.displayName = org.DisplayName;
        $scope.directLink = '';

        $scope.$watch('shortName', function(newValue) {
            var orgId = newValue || '<short name>';
            $scope.directLink = decodeURIComponent($state.href('org.view', {orgId: orgId}, {absolute: true}));
        });

        $scope.updateOrg = updateOrg;

        function updateOrg() {
            $scope.isBusy = true;

            var data = {
                DisplayName: $scope.displayName,
                ShortName: $scope.shortName
            };

            $http.patch('/api/v2.0/Organizations(' + org.Id + ')', data)
                .then(onSuccess, onFailed);
        }

        function onSuccess() {
            $scope.isBusy = false;
            $state.go('org.edit.general', {orgId: $scope.shortName}, {reload: true});
        }

        function onFailed(response) {
            $scope.errorMessage = errorProvider.getResponseErrorMessage(response);
        }
    }
})();