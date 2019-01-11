(function() {
    'use strict';

    describe('AdminUsersCtrl', function() {
        beforeEach(module('maApp.core'));

        var $controller;
        var $rootScope;
        var $httpBackend;

        beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_) {
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            $httpBackend = _$httpBackend_;
        }));

        describe('ctor', function() {

            var $scope;
            var sut;
            var errorProvider;

            beforeEach(function() {
                $scope = $rootScope.$new();
                errorProvider = {};

                sut = $controller('AdminUsersCtrl', {$scope: $scope, errorProvider: errorProvider});
            });

            it('has items defined prior to http returning', function() {
                expect($scope.isBusy).toEqual(true);
                expect($scope.users).toEqual([]);
                expect($scope.errorMessage).toEqual(null);
            });
        });

        describe('$onInit', function() {

            var $scope;
            var sut;
            var errorProvider;
            var respondWith;

            beforeEach(function() {
                $scope = $rootScope.$new();
                errorProvider = {};
                respondWith = null;

                $httpBackend.when('GET', '/api/v2.0/Users')
                            .respond(function() {
                                return respondWith;
                            });

                sut = $controller('AdminUsersCtrl', {$scope: $scope, errorProvider: errorProvider});
            });

            it('sets isBusy to true while running', function() {
                $scope.isBusy = false;

                sut.$onInit();
                expect($scope.isBusy).toEqual(true);
            });

            it('sets values when successful api connection', function() {
                respondWith = [200, {value: [{id: 3}]}, {}];

                sut.$onInit();
                $httpBackend.flush();

                expect($scope.isBusy).toEqual(false);
                expect($scope.users).toEqual([{id: 3}]); // NOTE: No response validation performed
                expect($scope.errorMessage).toEqual(null);
            });

            it('sets error when failed api connection', function() {
                respondWith = [404, '', {}];
                errorProvider.getResponseErrorMessage = function() { return 'fail'; };

                sut.$onInit();
                $httpBackend.flush();

                expect($scope.isBusy).toEqual(false);
                expect($scope.users).toEqual([]);
                expect($scope.errorMessage).toEqual('fail');
            });
        });
    });
})();