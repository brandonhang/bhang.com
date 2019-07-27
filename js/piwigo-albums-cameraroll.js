angular.element(document).ready(function() {
    var ALBUM_INFO = 'https://www.brandonhang.com/api/piwigo/ws?format=json&method=pwg.categories.getList&tree_output=true&cat_id=';
    var COVER_IMAGE = 'https://www.brandonhang.com/api/piwigo/ws?format=json&method=pwg.images.getInfo&image_id=';
    var ALBUM_IMAGES = 'https://www.brandonhang.com/api/piwigo/ws?format=json&method=pwg.categories.getImages&cat_id=';
    var perPageQuery = '&per_page=';
    var pageQuery = '&page=';

    var piwigoApp = angular.module('piwigo-app', ['ngTouch']);

    piwigoApp.controller('piwigo-ctrl', ['$scope', '$http', function($scope, $http) {
        $scope.loadingAlbum = true;
        var url = window.location.href;
        var urlMatch = url.match(/[.]com[/]photography[/]albums[/]album[/]photoset[/](\d+)(?:[/]page[/](\d+))?(?:[/])?/);
        $scope.pageNumber = 0;

        if (urlMatch) {
            $scope.albumId = urlMatch[1];

            if (urlMatch[2] != undefined) {
                $scope.pageNumber = urlMatch[2] - 1;
            }
        }
        else {
            window.location.href = '/photography/albums';
        }

        $scope.perPage = 50;

        $http.get(ALBUM_INFO + $scope.albumId).then(
            function(albumInfo) {
                $scope.albumInfo = albumInfo.data.result[0];
                document.title += ' | ' + $scope.albumInfo.name;

                if (!$scope.pageNumber) {
                    $http.get(COVER_IMAGE + $scope.albumInfo.representative_picture_id).then(
                        function(coverImage) {
                            $scope.coverImage = coverImage.data;
                            $scope.loadingAlbum = false;
                        },
                        function(coverError) {
                            $scope.loadingAlbum = false;
                        }
                    );
                }
            },
            function(albumError) {
                $scope.loadingAlbum = false;
                $scope.loadAlbumError = true;
            }
        );
        $http.get(ALBUM_IMAGES + $scope.albumId + perPageQuery + $scope.perPage + pageQuery + $scope.pageNumber).then(
            function(piwigoImageStream) {
                $scope.piwigoStream = piwigoImageStream.data;
                $scope.loadingAlbum = false;
                $scope.generatePaging();
            },
            function(piwigoStreamError) {
                $scope.loadingAlbum = false;
                $scope.loadAlbumError = true;
            }
        );

        $scope.generatePaging = function() {
            var photoCount = $scope.piwigoStream.result.paging.count;
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
