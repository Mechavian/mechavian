(function() {
    'use strict';

    angular.module('maApp.core')
        .controller('OrgEditUsersCtrl', ['$scope', '$http', 'errorProvider', 'authService', 'org', 'plan', 'members', 'invitations', orgEditUsersCtrl]);

    function orgEditUsersCtrl($scope, $http, errorProvider, authService, org, plan, members, invitations) {
        $scope.members = members;
        $scope.invitations = invitations;
        $scope.removeMember = removeMember;
        $scope.updateRole = updateRole;
        $scope.removeInvite = removeInvite;
        $scope.updateInvite = updateInvite;

        $scope.plan = plan;
        $scope.currentUsers = members.length + invitations.length;

        $scope.isInviting = false;
        $scope.inviteUser = inviteUser;
        $scope.invitedUserEmail = '';
        $scope.invited = '';

        var userId = authService.auth().profile.id;

        $scope.$watchCollection('members', applyUi);
        $scope.$watchCollection('invitations', applyUi);

        function applyUi(items) {
            angular.forEach(items, function(item) {
                item._ui = item._ui || {
                    isBusy: false,
                    isReadOnly: userId === item.UserId
                };
            });

            $scope.currentUsers = members.length + invitations.length;
        }

        function removeMember(member) {
            member._ui.isBusy = true;

            var user = {
                UserId: member.UserId
            };

            $http.post('/api/v2.0/Organizations(' + org.Id + ')/Fn.RemoveMember', user)
                .then(onSuccess, errorProvider.onUnhandledResponse);

            function onSuccess() {
                var idx = members.indexOf(member);
                members.splice(idx, 1);
            }
        }

        function updateRole(member) {
            member._ui.isBusy = true;

            var role = {
                UserId: member.UserId,
                RoleId: member.RoleId
            };

            $http.post('/api/v2.0/Organizations(' + org.Id + ')/Fn.SetUserRole', role)
                .then(onSuccess, errorProvider.onUnhandledResponse);

            function onSuccess() {
                member._ui.isBusy = false;
            }
        }

        function inviteUser() {
            $scope.isInviting = true;

            var user = {
                Email: $scope.invitedUserEmail,
                RoleId: 3
            };

            $http.post('/api/v2.0/Organizations(' + org.Id + ')/Fn.AddInvite', user)
                .then(onSuccess, errorProvider.onUnhandledResponse);

            function onSuccess(response) {

                // TODO: invite._ui not defined (causes error when immediately deleting)
                var invite = response.data;
                invitations.push(invite);

                $scope.invited = $scope.invitedUserEmail;
                $scope.isInviting = false;
                $scope.invitedUserEmail = '';
            }
        }

        function removeInvite(invite) {
            invite._ui.isBusy = true;

            var user = {
                Id: invite.Id
            };

            $http.post('/api/v2.0/Organizations(' + org.Id + ')/Fn.RemoveInvite', user)
                .then(onSuccess, errorProvider.onUnhandledResponse);

            function onSuccess() {
                var idx = invitations.indexOf(invite);
                invitations.splice(idx, 1);
            }
        }

        function updateInvite(invite) {
            invite._ui.isBusy = true;

            var role = {
                Id: invite.Id,
                RoleId: invite.RoleId
            };

            $http.post('/api/v2.0/Organizations(' + org.Id + ')/Fn.SetInviteRole', role)
                .then(onSuccess, errorProvider.onUnhandledResponse);

            function onSuccess() {
                invite._ui.isBusy = false;
            }
        }
    }
})();