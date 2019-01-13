(function() {
    'use strict';

    angular.module('maApp.core')
        .controller('OrgEditCtrl', ['$scope', 'org', orgEditCtrl]);

    function orgEditCtrl($scope, org) {
        $scope.org = org;
    }
})();