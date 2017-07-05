(function() {
    var app = angular.module('bhang-app', []);

    app.controller('bhang-ctrl', function($scope, $http, $location, $anchorScroll) {
        $http.get('./config/nav.json').then(function(navData) {
            $scope.navData = navData.data;
        });

        $http.get('./config/splash.txt').then(function(splashData) {
            var splashLines = splashData.data.split('\n');

            $scope.splashData = {};
            $scope.splashData.caption = splashLines[0];
            $scope.splashData.abridgedBio = splashLines[1];
        });

        $scope.activeSubMenuName = '';
        $scope.activeView = 'splash';
        $scope.splashView = 'main';

        //////////////// Events ////////////////
        $scope.openSubMenu = function($event, group) {
            if (group == $scope.activeSubMenuName) {
                $scope.activeSubMenuName = '';
            }
            else {
                $scope.activeSubMenuName = group;
                $scope.subMenuLinks = $scope.navData[group].links;
            }

            $event.preventDefault();
        }

        $scope.closeMenu = function($event) {
            $scope.activeSubMenuName = '';
            $event.preventDefault();
        }

        $scope.navigate = function($event, target) {
            if ($location.path() == '/' && target == 'home') {
                console.log(target);
            }
            else {
                console.log(target);
            }
            console.log($event.target.href);
            $event.preventDefault();
        }
    });

    //////////////// Filters ////////////////
    app.filter('capitalize', function() {
        return function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    });

    app.filter('escape', function($sce) {
        return function(str) {
            return $sce.trustAsHtml(str);
        }
    });

    //////////////// Beautify URLs ////////////////
    app.config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode(true);
    }]);
})();
