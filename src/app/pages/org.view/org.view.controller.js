(function() {
    'use strict';

    angular.module('maApp.core')
        .controller('OrgViewCtrl', ['$scope', '$stateParams', 'org', 'role', 'docLink', orgViewCtrl]);

    function orgViewCtrl($scope, $stateParams, org, role, docLink) {
        $scope.org = org;
        $scope.docLink = docLink;
        $scope.showDocInfo = $stateParams.showDocInfo;
        $scope.showOrgName = $stateParams.showOrgName;
        $scope.canEdit = !!(role && (role.Id === 1 || role.Id === 2));
    }
})();