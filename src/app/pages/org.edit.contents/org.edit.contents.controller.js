(function() {
    'use strict';

    angular.module('maApp.core')
        .controller('OrgEditContentsCtrl', ['$scope', '$http', 'errorProvider', 'org', 'docLinks', orgEditContentsCtrl]);

    function orgEditContentsCtrl($scope, $http, errorProvider, org, docLinks) {
        $scope.isBusy = false;
        $scope.org = org;
        $scope.docLinks = docLinks;
    }
})();