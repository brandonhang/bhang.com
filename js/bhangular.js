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

        var closeUpShop = function() {
            angular.forEach($scope.navMenu, function(status, navGroup) {
                $scope.navMenu[navGroup] = false;
            });
            angular.forEach($scope.navMenu, function(status, navGroup) {
                $scope.navMenu[navGroup] = false;
            });
        };
        var erasePicture = function() {
            $scope.lightbox = false;
        };

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
        };
        $scope.closeMenu = function($event) {
            $event.preventDefault();
            angular.forEach($scope.navMenu, function(status, navGroup) {
                $scope.navMenu[navGroup] = false;
            });
            angular.forEach($scope.navMenu, function(status, navGroup) {
                $scope.navMenu[navGroup] = false;
            });
        };
        $scope.closeNavBar = function() {
            closeUpShop();
        };
        $scope.openMainMenu = function($event) {
            $event.preventDefault();
            $scope.mobileMenu = !$scope.mobileMenu;
        };

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
        };
        $scope.closeLightbox = function() {
            $scope.lightbox = false;
        };
        $scope.closePicture = function() {
            erasePicture();
        };
    }]);

    app.directive('closeNavClick', ['$document', function($document) {
        return {
            restrict: 'A',
            link: function(scope, element, attribute) {
                element.on('click', function(event) {
                    event.stopPropagation();
                });

                var onClick = function() {
                    scope.$apply(function() {
                        scope.$eval(attribute.closeNavClick);
                    });
                };

                $document.on('click', onClick);

                scope.$on('$destroy', function() {
                    $document.off('click', onClick);
                });
            }
        };
    }]);
    app.directive('escapeKeyPress', ['$document', function($document) {
        return {
            restrict: 'A',
            link: function(scope, element, attribute) {
                element.on('keyup', function(event) {
                    event.stopPropagation();
                });

                var escape = function(event) {
                    if (event.keyCode === 27) {
                        scope.$apply(function() {
                            scope.$eval(attribute.escapeKeyPress);
                        });
                    }
                }

                $document.on('keyup', escape);

                scope.$on('$destroy', function() {
                    $document.off('keyup', escape);
                });
            }
        };
    }]);

    angular.element(document).ready(function() {
        var footer = document.getElementById('footer');
        if (footer !== null) {
            var footer = document.getElementById('footer');
            var footerApp = angular.module('footer', []);

            footerApp.controller('footwork', [function() {}]);
            angular.bootstrap(footer, ['footer']);
        }
    });
})();
