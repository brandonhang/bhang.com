angular.element(document).ready(function() {
    var CURRENT_IMAGE = 'https://www.brandonhang.com/api/piwigo/ws?format=json&method=pwg.images.getInfo&image_id=';
    var piwigoApp = angular.module('piwigo-app', []);

    piwigoApp.controller('piwigo-ctrl', ['$scope', '$http', function($scope, $http) {
        var url = window.location.href;
        var urlMatch = url.match(/[.]com[/]photography[/]download[/]image[/](\d+)(?:[/])?/);

        if (urlMatch) {
            $scope.photoId = urlMatch[1];
        }
        else {
            window.location.href = '/photography';
        }

        $http.get(CURRENT_IMAGE + $scope.photoId).then(
            function(currentImage) {
                $scope.sizeKeys = [ 'square', 'thumb', '2small', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'original' ];
                $scope.group1 = ['square', 'thumb', '2small'];
                $scope.group2 = ['xsmall', 'small', 'medium'];
                $scope.group3 = ['large', 'xlarge', 'xxlarge'];
                $scope.sizeData = {
                    square: {
                        display: 'Square',
                    },
                    thumb: {
                        display: 'Thumbnail',
                    },
                    '2small': {
                        display: 'XXSmall',
                    },
                    xsmall: {
                        display: 'XSmall',
                    },
                    small: {
                        display: 'Small',
                    },
                    medium: {
                        display: 'Medium',
                    },
                    large: {
                        display: 'Large',
                    },
                    xlarge: {
                        display: 'XLarge',
                    },
                    xxlarge: {
                        display: 'XXLarge',
                    },
                    original: {
                        display: 'Original',
                        width: currentImage.data.result.width,
                        height: currentImage.data.result.height,
                        url: currentImage.data.result.element_url
                    }
                };

                for (var i = 0; i < $scope.sizeKeys.length; i++) {
                    var sizeKey = $scope.sizeKeys[i];
                    if (sizeKey === 'original') { continue; }

                    $scope.sizeData[sizeKey].width = currentImage.data.result.derivatives[sizeKey].width;
                    $scope.sizeData[sizeKey].height = currentImage.data.result.derivatives[sizeKey].height;
                    $scope.sizeData[sizeKey].url = currentImage.data.result.derivatives[sizeKey].url;
                }

                $scope.currentDownload = $scope.sizeData.large;
                $scope.activeSize = 'large';
            },
            function(currentImageError) {
                $scope.badLoading = true;
            }
        );

        $scope.changeDownload = function($event, size) {
            if (size === $scope.activeSize) { return; }
            if ($scope.sizeKeys.indexOf(size) < 0) { return; }
            $event.preventDefault();

            $scope.currentDownload = $scope.sizeData[size];
            $scope.activeSize = size;
        };
    }]);

    angular.bootstrap(document.getElementById('piwigo-photos'), ['piwigo-app']);
});
