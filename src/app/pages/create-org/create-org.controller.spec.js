(function() {
    'use strict';

    describe('CreateOrgCtrl', function() {
        beforeEach(module('maApp.core'));

        var $controller;
        var $httpBackend;

        beforeEach(inject(function(_$controller_, _$httpBackend_) {
            $controller = _$controller_;
            $httpBackend = _$httpBackend_;
        }));

        describe('ctor', function() {

            var $scope;
            var sut;

            beforeEach(function() {
                $scope = {};

                sut = $controller('CreateOrgCtrl', {$scope: $scope});
            });

            it('has items defined prior to http returning', function() {
                expect($scope.isBusy).toEqual(false);
                expect($scope.shortName).toEqual('');
                expect($scope.displayName).toEqual('');
                expect($scope.directLink).toEqual('');
                expect($scope.createOrg).not.toBeNull();
            });
        });

        describe('$onInit', function() {

            var $scope;
            var sut;

            beforeEach(function() {
                $scope = {
                    $watch: function() {}
                };

                sut = $controller('CreateOrgCtrl', {$scope: $scope});
            });

            it('creates a watch for shortName', function() {
                spyOn($scope, '$watch');

                sut.$onInit();
                expect($scope.$watch).toHaveBeenCalledWith('shortName', jasmine.any(Function));
            });
        });

        describe('__onShortNameChanged', function() {

            var $scope;
            var $state;
            var sut;

            beforeEach(function() {
                $scope = {};
                $state = {
                    href: function() { return 'testDirectLink'; }
                };

                sut = $controller('CreateOrgCtrl', {$scope: $scope, $state: $state});
            });

            it('creates default directLink', function() {
                spyOn($state, 'href').and.callThrough();

                sut.__onShortNameChanged('');

                expect($scope.directLink).toEqual('testDirectLink');
                expect($state.href).toHaveBeenCalledWith('org.view', {orgId: '<short name>'}, {absolute: true});
            });
        });

        describe('createOrg', function() {

            var $scope;
            var $state;
            var errorProvider;
            var respondWith;
            var requestData;
            var sut;

            beforeEach(function() {
                $scope = {};
                $state = {
                    go: function() {}
                };
                errorProvider = {};
                respondWith = null;

                $httpBackend.when('POST', '/api/v2.0/Organizations')
                            .respond(function(method, url, data) {
                                requestData = JSON.parse(data);
                                return respondWith;
                            });

                sut = $controller('CreateOrgCtrl', {$scope: $scope, $state: $state, errorProvider: errorProvider});
            });

            it('makes request with scope data and sets isBusy', function() {
                respondWith = [200, {value: []}, {}];

                $scope.createOrg();

                expect($scope.isBusy).toEqual(true);

                $httpBackend.flush();
            });

            it('unsets isBusy and changes state when success', function() {
                spyOn($state, 'go');
                $scope.displayName = 'displayName';
                $scope.shortName = 'shortName';
                respondWith = [200, {value: []}, {}];

                $scope.createOrg();
                $httpBackend.flush();

                expect($scope.isBusy).toEqual(false);
                expect(requestData).toEqual({
                    DisplayName: 'displayName',
                    ShortName: 'shortName'
                });
                expect($state.go).toHaveBeenCalledWith('org.edit.general', {orgId: 'shortName'});
            });

            it('unsets isBusy and sets error message when fail', function() {
                spyOn($state, 'go');
                $scope.displayName = 'displayName';
                $scope.shortName = 'shortName';
                respondWith = [400, {value: []}, {}];
                errorProvider.getResponseErrorMessage = function() { return 'error'; };

                $scope.createOrg();
                $httpBackend.flush();

                expect($scope.isBusy).toEqual(false);
                expect($scope.errorMessage).toEqual('error');
                expect(requestData).toEqual({
                    DisplayName: 'displayName',
                    ShortName: 'shortName'
                });
                expect($state.go).not.toHaveBeenCalled();
            });
        });
    });
})();