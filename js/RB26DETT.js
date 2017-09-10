(function() {
    var carApp = angular.module('car-app', []);

    carApp.controller('car-ctrl', ['$http', '$scope', '$sce', function($http, $scope, $sce) {
        $http.get('/config/cars.json').then(
            function(carConfig) {
                $scope.carConfig = carConfig.data;console.log(carConfig.data);
            },
            function(carErr) {
                console.log(carErr);
            }
        );
    }]);

    angular.bootstrap(document.getElementById('car-app'), ['car-app']);
})();
