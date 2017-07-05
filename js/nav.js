(function($) {
    $.ajax({
        url: './config/nav.json',
        type: 'GET',
        dataType: 'JSON',
        success: function(navData) {
            var menuButton = '<a id="main-menu" class="nav-links" href="#">MENU</a>';


            function openMainMenu(event) {
                event.preventDefault();
                $(this).stop().toggleClass('nav-menu-open');
            }

            function createNavSubList(title, links) {
                if (links != null) {
                    var group = '<a class="nav-links" href="#">' + title + '</a>';

                    $.each(links, function(index, link) {
                        var li = '<li><a class="nav-links"'
                    })
                }
                else {
                    var group = '<a class="nav-links" href="/">HOME</a>'

                    return '<ul>' + group + '</ul>';
                }
            }
        }
    })
})(jQuery);

(function() {
    var app = angular.module('bhang-app', []);

    app.controller('bhang-ctrl', function($scope, $http) {
        $http.get('./config/nav.json').then(function(navData) {
            $scope.navData = navData.data;
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
    });

    // app.config(['$locationProvider'], function($locationProvider) {
    //     $locationProvider.html5Mode(true);
    // })
})();
