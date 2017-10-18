angular.element(document).ready(function() {
    var sandboxApp = angular.module('sandbox-app', []);

    sandboxApp.controller('sandbox-ctrl', ['$http', '$scope', function($http, $scope) {
        $http.get('/config/apps.json').then(
            function(appsData) {
                $scope.apps = appsData.data;
            },
            function(appsErr) {
                console.error(appsErr);
            }
        );
    }]);
    angular.bootstrap(document.getElementById('sandbox'), ['sandbox-app']);
});
