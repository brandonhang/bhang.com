angular.element(document).ready(function() {
    var ALL_IMAGES = 'https://www.brandonhang.com/api/piwigo/ws?format=json&method=pwg.categories.getImages';
    var perPageQuery = '&per_page=';
    var pageQuery = '&page=';

    var piwigoApp = angular.module('piwigo-app', ['ngTouch']);

    piwigoApp.controller('piwigo-ctrl', ['$scope', '$http', function($scope, $http) {
        $scope.loadingAlbum = true;
        var url = window.location.href;
        var urlMatch = url.match(/[.]com[/]photography[/]page[/](\d+)(?:[/])?/);
        $scope.pageNumber = 0;

        if (urlMatch) {
            $scope.pageNumber = urlMatch[1] - 1;
        }

        $scope.perPage = 50;

        $http.get(ALL_IMAGES + perPageQuery + $scope.perPage + pageQuery + $scope.pageNumber).then(
            function(piwigoImageStream) {
                $scope.piwigoStream = piwigoImageStream.data;
                $scope.loadingAlbum = false;
                $scope.generatePaging();
            },
            function(piwigoError) {
                $scope.loadAlbumError = true;
            }
        );

        $scope.generatePaging = function() {
            var photoCount = $scope.piwigoStream.result.paging.total_count;
            var numPages = Math.ceil(photoCount / $scope.perPage);
            var pagingArray = [];
            var localPageNumber = $scope.pageNumber + 1;

            if (numPages <= 10) {
                for (var i = 1; i <= numPages; i++) {
                    pagingArray.push(i);
                }
            }
            else if (localPageNumber < 7) {
                pagingArray = [1, 2, 3, 4, 5, 6, 7, '…', numPages - 1, numPages];
            }
            else if (localPageNumber > (numPages - 7)) {
                pagingArray = [1, 2, '…'];

                for (var i = numPages - 7; i <= numPages; i++) {
                    pagingArray.push(i);
                }
            }
            else {
                pagingArray = [1, '…'];

                for (var i = localPageNumber - 3; i <= localPageNumber + 4; i++) {
                    pagingArray.push(i);
                }

                pagingArray.push('…', numPages);
            }

            $scope.pagination = pagingArray;
        }
    }]);

    angular.bootstrap(document.getElementById('piwigo-photos'), ['piwigo-app']);
});
