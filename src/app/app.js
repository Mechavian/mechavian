(function() {
    'use strict';

    // TODO: Rename to "mechavian.fc.core"
    angular.module('maApp.core', [
        'ui.router',
        'ngSanitize',
        'ngCookies',
        'angular-md5',
        'angular-appinsights',
        'mechavian.ui.core']);

    angular.module('maApp', ['maApp.core'])
        .config(['$urlRouterProvider', '$locationProvider', '$httpProvider', 'insightsProvider', appConfig])
        .run(['$rootScope', '$location', '$state', 'authService', 'featureService', appRun]);

    function appConfig($urlRouterProvider, $locationProvider, $httpProvider/*, insightsProvider*/) {

        $urlRouterProvider.rule(function($injector, $location) {
            var path = $location.path();
            if (path !== '/' && path.slice(-1) === '/') {
                $location.replace().path(path.slice(0, -1));
            }
        });

        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);

        $httpProvider.interceptors.push('bearerTokenHttpInterceptor');

        // TODO: Re-add
        // insightsProvider.start({appName: 'www.mechavian.com'});
    }

    function appRun($rootScope, $location, $state, authService, featureService) {
        $rootScope.isLoading = true;

        $rootScope.$on('$locationChangeStart',
            function() {
                authService.init();
                featureService.init();
            });

        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart',
            function(event, next) {
                if (next.authenticate && !authService.isAuthenticated()) {
                    event.preventDefault();

                    var returnUrl = $location.url();
                    $state.go('login', {returnUrl: returnUrl});
                }
            });

        $rootScope.$on('$stateChangeSuccess',
            function(event, next, state) {
                if (angular.isString(next.title)) {
                    document.title = next.title + ' | Mechavian';
                } else if (angular.isFunction(next.title)) {
                    document.title = next.title(next, state) + ' | Mechavian';
                } else {
                    document.title = 'Mechavian';
                }
            });
    }
})();