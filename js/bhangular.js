(function() {
    var app = angular.module('bhang-app', []);

    app.controller('bhang-ctrl', ['$scope', '$http', function($scope, $http) {
        $http.get('./config/nav.json').then(function(navData) {
            $scope.navData = navData.data;
            $scope.navMenu = {};
            $scope.mobileMenu = false;
            $scope.lightbox = false;

            angular.forEach($scope.navData, function(navGroup, group) {
                $scope.navMenu[group] = false;
            });
        });

        $scope.openSubMenu = function($event, group) {
            $event.preventDefault();
            angular.forEach($scope.navMenu, function(status, navGroup) {
                if (group === navGroup) {
                    $scope.navMenu[navGroup] = !$scope.navMenu[navGroup];
                }
                else {
                    $scope.navMenu[navGroup] = false;
                }
            });
        }
        $scope.closeMenu = function($event) {
            $event.preventDefault();
            angular.forEach($scope.navMenu, function(status, navGroup) {
                $scope.navMenu[navGroup] = false;
            });
        }
        $scope.openMainMenu = function($event) {
            $event.preventDefault();
            $scope.mobileMenu = !$scope.mobileMenu;
        }
        $scope.showPicture = function($event, picture) {
            $event.preventDefault();
            var lightbox = document.getElementById('lightbox');

            if (lightbox !== null) {
                var lightboxImg = document.getElementById('lightbox-image');
                lightboxImg.style.backgroundImage = "url('/img/content/" + picture + "')";
                $scope.lightbox = true;
            }
            else {
                $scope.lightbox = false;
            }
        }
        $scope.closeLightbox = function() {
            $scope.lightbox = false;
        }
    }]);
})();
