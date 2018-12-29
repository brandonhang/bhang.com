angular.element(document).ready(function() {
    var ALL_ALBUMS = 'https://www.brandonhang.com/api/piwigo/ws?format=json&method=pwg.categories.getList&tree_output=true&thumbnail_size=xsmall';

    var piwigoApp = angular.module('piwigo-app', []);

    piwigoApp.controller('piwigo-ctrl', ['$scope', '$http', function($scope, $http) {
        $scope.loadingAlbum = true;
        $http.get(ALL_ALBUMS).then(
            function(allAlbums) {
                $scope.albumData = allAlbums.data;
                $scope.loadingAlbum = false;
            },
            function(albumError) {
                $scope.loadAlbumError = true;
                $scope.loadingAlbum = false;
            }
        );
    }]);

    angular.bootstrap(document.getElementById('piwigo-photos'), ['piwigo-app']);
});
