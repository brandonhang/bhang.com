angular.element(document).ready(function() {
    var CURRENT_IMAGE = 'https://www.brandonhang.com/api/piwigo/ws?format=json&method=pwg.images.getInfo&image_id=';
    var FLANK_IMG_1 = 'https://www.brandonhang.com/api/piwigo/picture.php?/';
    var FLANK_IMG_2 = '/category/';

    var piwigoApp = angular.module('piwigo-app', ['ngSanitize', 'ngTouch']);

    piwigoApp.controller('piwigo-ctrl', ['$scope', '$http', function($scope, $http) {
        var url = window.location.href;
        var urlMatch = url.match(/[.]com[/]photography[/]albums[/]detail[/]photoset[/](\d+)(?:[/]image[/](\d+))?(?:[/])?/);
        $scope.downloadList = false;

        if (urlMatch) {
            $scope.albumId = urlMatch[1];

            if (urlMatch[2]) {
                $scope.photoId = urlMatch[2];
            }
            else {
                window.location.href = '/photography/albums/album/photoset/' + $scope.albumId;
            }
        }
        else {
            window.location.href = '/photography/albums';
        }

        $http.get(CURRENT_IMAGE + $scope.photoId).then(
            function(currentImage) {
                $scope.currentImage = currentImage.data;

                if ('comment' in currentImage.data.result) {
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

        $http.get(FLANK_IMG_1 + $scope.photoId + FLANK_IMG_2 + $scope.albumId).then(
            function(rawDocument) {
                var prevMatch = rawDocument.data.match(/<a.*linkPrev.*>/);
                var nextMatch = rawDocument.data.match(/<a.*linkNext.*>/);

                if (prevMatch) {
                    var prevHrefMatch = prevMatch[0].match(/href=".*[?][/](\d+)/);
                    var prevTitleMatch = prevMatch[0].match(/title=".*: (.*)" rel/);

                    if (prevHrefMatch) {
                        $scope.prevImage = prevHrefMatch[1];
                    }
                    if (prevTitleMatch) {
                        $scope.prevTitle = prevTitleMatch[1];
                    }
                }
                if (nextMatch) {
                    var nextHrefMatch = nextMatch[0].match(/href=".*[?][/](\d+)/);
                    var nextTitleMatch = nextMatch[0].match(/title=".*: (.*)" rel/);

                    if (nextHrefMatch) {
                        $scope.nextImage = nextHrefMatch[1];
                    }
                    if (nextTitleMatch) {
                        $scope.nextTitle = nextTitleMatch[1];
                    }
                }
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
                window.location.href = '/photography/albums/detail/photoset/' + $scope.albumId + '/image/' + $scope.prevImage;
            }
        }, false);

        document.addEventListener('keyup', function(event) {
            var modKey = event.shiftKey || event.altKey || event.ctrlKey || event.metaKey;

            if (event.keyCode === 39 && !modKey && $scope.nextImage) {
                window.location.href = '/photography/albums/detail/photoset/' + $scope.albumId + '/image/' + $scope.nextImage;
            }
        }, false);
    }]);

    angular.bootstrap(document.getElementById('piwigo-photos'), ['piwigo-app']);
});
