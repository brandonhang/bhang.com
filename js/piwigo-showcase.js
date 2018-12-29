angular.element(document).ready(function() {
    var SHOWCASE = '/config/showcase.json';

    var piwigoApp = angular.module('piwigo-app', ['ngTouch']);

    piwigoApp.controller('piwigo-ctrl', ['$scope', '$http', function($scope, $http) {
        $scope.loadingAlbum = true;
        $http.get(SHOWCASE).then(
            function(piwigoImageStream) {
                $scope.piwigoStream = piwigoImageStream.data;
                $scope.loadingAlbum = false;
            },
            function(piwigoError) {
                $scope.loadAlbumError = true;
                $scope.loadingAlbum = false;
            }
        );
    }]);

    angular.bootstrap(document.getElementById('piwigo-photos'), ['piwigo-app']);
});
