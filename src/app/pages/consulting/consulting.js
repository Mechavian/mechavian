(function() {
    'use strict';

    angular.module('maApp.core')
        .config(['$stateProvider', consultingConfig]);

    function consultingConfig($stateProvider) {
        $stateProvider.state('consulting', {
            url: '/',
            templateUrl: 'src/app/pages/consulting/consulting.html',
            title: 'Consulting'
        });
    }
})();