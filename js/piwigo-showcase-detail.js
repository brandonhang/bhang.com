angular.element(document).ready(function() {
    var SHOWCASE_IMAGE_IDS = 'https://www.brandonhang.com/api/bhang/showcase_list';
    var CURRENT_IMAGE = 'https://www.brandonhang.com/api/piwigo/ws?format=json&method=pwg.images.getInfo&image_id=';

    var piwigoApp = angular.module('piwigo-app', ['ngSanitize', 'ngTouch']);

    piwigoApp.controller('piwigo-ctrl', ['$scope', '$http', function($scope, $http) {
        var url = window.location.href;
        var urlMatch = url.match(/[.]com[/]photography[/]showcase[/]detail[/]image[/](\d+)(?:[/])?/);
        $scope.downloadList = false;

        if (urlMatch) {
            $scope.photoId = urlMatch[1];
            $http.get(SHOWCASE_IMAGE_IDS).then(
                function(showcaseArray) {
                    $scope.showcaseList = showcaseArray.data;

                    var index = showcaseArray.data.indexOf(parseInt($scope.photoId));
                    var prev = index - 1;
                    var next = index + 1;

                    if (prev >= 0) {
                        $scope.prevImage = $scope.showcaseList[prev];

                        $http.get(CURRENT_IMAGE + $scope.prevImage).then( 
                            function(prevImageInfo) {
                                $scope.prevTitle = prevImageInfo.data.result.name;
                            },
                            function(prevError) {
                                $scope.prevTitle = '???';
                            }
                        );
                    }
                    if (next < $scope.showcaseList.length) {
                        $scope.nextImage = $scope.showcaseList[next];

                        $http.get(CURRENT_IMAGE + $scope.nextImage).then( 
                            function(nextImageInfo) {
                                $scope.nextTitle = nextImageInfo.data.result.name;
                            },
                            function(nextError) {
                                $scope.nextTitle = '???';
                            }
                        );
                    }
                }
            );
        }
        else {
            window.location.href = '/photography/showcase';
        }

        $http.get(CURRENT_IMAGE + $scope.photoId).then(
            function(currentImage) {
                $scope.currentImage = currentImage.data;
                document.title += ' | ' + $scope.currentImage.result.name;

                if ('comment' in currentImage.data.result && currentImage.data.result.comment != null) {
                    $scope.imageDescription = currentImage.data.result.comment.replace(/\n/, '<br/>');
                }

                $http.get('/api/bhang/exiftool?image=' + encodeURI(currentImage.data.result.element_url)).then(
                    function(exifData) {
                        $scope.exif = exifData.data;

                        if ('flash' in $scope.exif) {
                            $scope.exif.flash = $scope.exif.flash ? 'On' : 'Off';
                        }
                        if ('exposure' in $scope.exif) {
                            var exposure = $scope.exif.exposure;

                            if (exposure < 0) {
                                $scope.exif.exposure = '−' + exposure;
                            }
                            else if (exposure > 0) {
                                $scope.exif.exposure = '+' + exposure;
                            }
                            else {
                                $scope.exif.exposure = '±' + exposure;
                            }
                        }
                        if ('camera' in $scope.exif) {
                            if ($scope.exif.camera.indexOf('NIKON') > -1) {
                                $scope.exif.camera = $scope.exif.camera.replace('NIKON', 'Nikon');
                            }
                            else if ($scope.exif.camera === 'E-M10') {
                                $scope.exif.camera = 'Olympus ' + $scope.exif.camera;
                            }
                            else if ($scope.exif.camera.indexOf('SAMSUNG') > -1) {
                                $scope.exif.camera = 'Samsung Galaxy S7';
                            }
                            else if ($scope.exif.camera.indexOf('REBEL') > -1) {
                                $scope.exif.camera = $scope.exif.camera.replace('REBEL', 'Rebel');
                            }
                        }
                        if ('lens' in $scope.exif) {
                            $scope.exif.lens = $scope.exif.lens.replace('f', 'ƒ');
                        }
                    }
                );
            },
            function(currentError) {
                var photoActual = document.getElementById('photo-actual');
                photoActual.src = '/img/content/busted.jpg';
            }
        );

        $scope.formatDate = function(date) {
            var months = [
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'
            ];
            var dateTkns = date.split(/[-: ]/);
            return months[parseInt(dateTkns[1]) - 1] + ' ' + parseInt(dateTkns[2]) + ', ' + dateTkns[0];
        };

        $scope.getCameraType = function(camera) {
            var cameras = {
                'NIKON D5300': 'dslr'
            };

            return cameras[camera];
        };

        $scope.toggleDownload = function() {
            $scope.downloadList = !$scope.downloadList;
        };

        $scope.closeDownload = function() {
            $scope.downloadList = false;
        };

        document.addEventListener('keyup', function(event) {
            var modKey = event.shiftKey || event.altKey || event.ctrlKey || event.metaKey;

            if (event.keyCode === 37 && !modKey && $scope.prevImage) {
                window.location.href = '/photography/showcase/detail/image/' + $scope.prevImage;
            }
        }, false);

        document.addEventListener('keyup', function(event) {
            var modKey = event.shiftKey || event.altKey || event.ctrlKey || event.metaKey;

            if (event.keyCode === 39 && !modKey && $scope.nextImage) {
                window.location.href = '/photography/showcase/detail/image/' + $scope.nextImage;
            }
        }, false);
    }]);

    angular.bootstrap(document.getElementById('piwigo-photos'), ['piwigo-app']);
});
