angular.element(document).ready(function() {
    var piwigoNav = angular.module('piwigo-nav-app', []);

    piwigoNav.controller('piwigo-nav-ctrl', ['$scope', '$location', function($scope, $location) {
        $scope.navData = [
            {
                display: 'About',
                link: '/photography/about'
            },
            {
                display: 'Camera Roll',
                link: '/photography'
            },
            {
                display: 'Albums',
                link: '/photography/albums'
            },
            {
                display: 'Showcase',
                link: '/photography/showcase'
            }
        ];

        var currentUrl = $location.$$absUrl;
        
        if (currentUrl.match(/[/]photography[/]about/i)) {
            $scope.currentNav = 'About';
        }
        else if (currentUrl.match(/[/]photography[/]albums/i)) {
            $scope.currentNav = 'Albums';
        }
        else if (currentUrl.match(/[/]photography[/]showcase/i)) {
            $scope.currentNav = 'Showcase';
        }
        else if (!currentUrl.match(/[/]photography[/]download/i)) {
            $scope.currentNav = 'Camera Roll';
        }
    }]);
    angular.bootstrap(document.getElementById('piwigo-nav'), ['piwigo-nav-app']);
});
