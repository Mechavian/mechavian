(function() {
    'use strict';

    angular.module('maApp.core')
        .controller('ErrorCtrl', ['$scope', '$stateParams', errorCtrl]);

    function errorCtrl($scope, $stateParams) {
        $scope.statusCode = $stateParams.statusCode || '';
        $scope.errorMessage = $stateParams.errorMessage || 'An unknown error has occurred';
    }
})();