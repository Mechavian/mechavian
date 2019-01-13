(function() {
    'use strict';

    angular.module('maApp.core')
        .controller('CreateOrgCtrl', ['$scope', '$http', '$state', 'errorProvider', createOrgCtrl]);

    function createOrgCtrl($scope, $http, $state, errorProvider) {
        $scope.isBusy = false;
        $scope.shortName = '';
        $scope.displayName = '';
        $scope.directLink = '';
        $scope.createOrg = createOrg;

        /*jshint validthis:true */
        this.$onInit  = onInit;
        this.__onShortNameChanged = __onShortNameChanged;
        /*jshint validthis:false */

        function onInit() {
            $scope.$watch('shortName', __onShortNameChanged);
        }

        function __onShortNameChanged(newValue) {
            var orgId = newValue || '<short name>';
            $scope.directLink = decodeURIComponent($state.href('org.view', {orgId: orgId}, {absolute: true}));
        }

        function createOrg() {
            $scope.isBusy = true;

            var data = {
                DisplayName: $scope.displayName,
                ShortName: $scope.shortName
            };

            $http.post('/api/v2.0/Organizations', data)
                .then(onSuccess, onFailed);
        }

        function onSuccess() {
            $scope.isBusy = false;
            $state.go('org.edit.general', {orgId: $scope.shortName});
        }

        function onFailed(response) {
            $scope.isBusy = false;
            $scope.errorMessage = errorProvider.getResponseErrorMessage(response);
        }
    }
})();