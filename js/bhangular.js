(function() {
    var app = angular.module('bhang-app', []);
    var navMasterGroupList = ['personal', 'professional'];
    var navMasterUrlList = [];

    app.controller('bhang-ctrl', function($scope, $http, $location, $anchorScroll) {
        $http.get('./config/nav.json').then(function(navData) {
            $scope.navData = navData.data;

            angular.forEach(navData.data.personal.links, function(link, index) {
                navMasterUrlList.push(link.url);
            });
            angular.forEach(navData.data.professional.links, function(link, index) {
                navMasterUrlList.push(link.url);
            });
            angular.forEach(navData.data.miscellaneous, function(navGroup, index1) {
                navMasterGroupList.push(navGroup.group.toLowerCase());

                angular.forEach(navGroup.links, function(link, index2) {
                    navMasterUrlList.push(link.url);
                });
            });

            $scope.navMasterGroupList = navMasterGroupList;
            $scope.navMasterUrlList = navMasterUrlList;
        });

        //////////////// Events ////////////////
        //////// Menu Events ////////
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

        //////// Splash Screen Events ////////
        $scope.splashCurrent = 'main';
        $scope.changeSplash = function($event, view) {
            $scope.splashCurrent = view;
            $event.preventDefault();
        }
    });

    app.config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
})();
