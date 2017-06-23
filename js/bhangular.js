(function() {
    var app = angular.module('bhang-app', []);
    
    app.controller('bhang-ctrl', function($scope, $http) {
        $http.get('./config/nav.json').then(function(navData) {
            $scope.navData = navData.data;
        });
    });
    
    app.controller('personal-ctrl', function($scope, $http) {
        $http.get('./config/about.txt').then(function(aboutData) {
            $scope.aboutLines = aboutData.data.split('\n');
        });
    });
    app.controller('personal-ctrl', function($scope, $http) {
        $http.get('./config/cars.json').then(function(carsData) {
            $scope.carsData = carsData.data;
        });
    });
})();