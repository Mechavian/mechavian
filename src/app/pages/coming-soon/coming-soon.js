(function() {
    'use strict';

    angular.module('maApp.core')
        .config(['$stateProvider', comingSoonConfig]);

    function comingSoonConfig($stateProvider) {
        $stateProvider.state('coming-soon', {
            url: '/coming-soon',
            templateUrl: 'src/app/pages/coming-soon/coming-soon.html',
            title: 'Flying Club Management - Coming Soon'
        });
    }
})();