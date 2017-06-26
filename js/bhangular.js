(function() {
    var app = angular.module('bhang-app', []);

    app.controller('bhang-ctrl', function($scope, $http) {
        $http.get('./config/nav.json').then(function(navData) {
            $scope.navData = navData.data;
        });

        //////////////// Events ////////////////
        $scope.navMenu = {};

        $scope.openMainMenu = function($event) {
            if (!('main' in $scope.navMenu)) {
                $scope.navMenu.main = false;
            }

            $scope.navMenu.main = !$scope.navMenu.main;

            if (!$scope.navMenu.main) {
                angular.forEach($scope.navMenu, function(group, groupName) {
                    $scope.navMenu[groupName] = false;
                });
            }

            $event.preventDefault();
        }

        $scope.openSubMenu = function($event, group) {
            if (!(group in $scope.navMenu)) {
                $scope.navMenu[group] = false;
            }

            $scope.navMenu[group] = !$scope.navMenu[group];
            $event.preventDefault();
        }

        $scope.closeMenu = function() {
            angular.forEach($scope.navMenu, function(group, groupName) {
                $scope.navMenu[groupName] = false;
            });
        }
    });
})();
