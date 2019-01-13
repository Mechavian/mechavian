(function() {
    'use strict';

    angular.module('maApp.core')
        .controller(
            'OrgEditPlanCtrl',
            ['$scope', '$state', '$http', '$timeout', 'guidFactory', 'errorProvider', 'stripeCheckout', 'org', 'plans', 'config', orgEditPlanCtrl]
        );

    function orgEditPlanCtrl($scope, $state, $http, $timeout, guidFactory, errorProvider, stripeCheckout, org, plans, config) {
        var promise = null;

        $scope.errorMessage = '';
        $scope.org = org;
        $scope.isBusy = false;
        $scope.selectPlan = selectPlan;
        $scope.plans = plans;

        $scope.$watchCollection('plans', applyUi);

        $scope.$on('$destroy', function() {
            cancelTimeout();
        });

        function applyUi(items) {
            angular.forEach(items, function(item) {
                item._ui = item._ui || {
                    isSelected: item.Id === org.PlanId
                };
            });
        }

        function selectPlan($event, plan) {
            if (plan.Amount === 0) {
                startTimeout(null);
            } else {
                var handler = stripeCheckout.configure({
                    key: config.StripeKey,
                    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
                    locale: 'auto',
                    token: function(token) {
                        startTimeout(token);
                    }
                });

                handler.open({
                    name: 'Mechavian',
                    description: plan.DisplayString,
                    amount: plan.Amount
                });
            }

            $event.preventDefault();

            function startTimeout(token) {
                $scope.isBusy = true;
                var idempotenceId = guidFactory.get();
                applyPlan(idempotenceId, org.Id, plan.Id, token && token.id);
            }
        }

        function applyPlan(idempotenceId, orgId, planId, token) {

            promise = $timeout(doApply, 750, true, idempotenceId, orgId, planId, token);
        }

        function cancelTimeout() {
            if (promise) {
                $timeout.cancel(promise);
                promise = null;
            }

            $scope.isBusy = false;
        }

        function doApply(idempotenceId, orgId, planId, token) {

            var model = {
                PlanId: planId,
                IdempotenceId: idempotenceId,
                StripeToken: token
            };

            $http.post('/api/v2.0/Organizations(' + org.Id + ')/Fn.SetPlan', model)
                .then(onSuccess, errorProvider.onUnhandledResponse);

            function onSuccess(response) {
                if (response.status === 200 || response.status === 204) {
                    $state.reload();
                } else if (response.status === 202) {
                    applyPlan(idempotenceId, orgId, planId, token);
                }
            }
        }
    }
})();