(function() {
    var musicApp = angular.module('music-app', ['ngSanitize']);

    musicApp.controller('music-ctrl', ['$scope', '$sce', function($scope, $sce) {
        var erasePicture = function() {
            $scope.lightbox = false;

            try {
                $scope.youtube.stopVideo();
                $scope.youtube.destroy();
            }
            catch (e) {
                console.log(e);
            }
        }

        $scope.showPicture = function($event, picture) {
            $event.preventDefault();
            var lightbox = document.getElementById('lightbox');

            if (lightbox !== null) {
                var lightboxImg = document.getElementById('lightbox-image');
                lightboxImg.style.backgroundImage = "url('/img/content/" + picture + "')";
                $scope.lightbox = true;
                $scope.captionEnabled = false;
            }
            else {
                $scope.lightbox = false;
            }
        };
        $scope.viewMusicPhoto = function($event, image, caption) {
            $event.preventDefault();
            var lightbox = document.getElementById('lightbox');

            if (lightbox !== null) {
                var lightboxImg = document.getElementById('lightbox-image');

                lightboxImg.style.backgroundImage = "url('/img/content/" + image + "')";
                $scope.lightbox = true;
                $scope.captionEnabled = true;
                $scope.caption = caption;
            }
            else {
                $scope.lightbox = false;
            }
        };
        $scope.playYouTube = function($event, videoId, start) {
            $event.preventDefault();

            try {
                $scope.youtube.stopVideo();
                $scope.youtube.destroy();
            }
            catch (e) {
                console.log(e);
            }

            var lightboxImg = document.getElementById('lightbox-image');
            var lightboxWidth = lightboxImg.offsetWidth;
            var lightboxHeight = lightboxImg.offsetHeight;
            var height = lightboxWidth * 0.5625;
            var width = lightboxHeight / 0.5625;

            if (height > lightboxHeight) {
                height = lightboxHeight;
            }
            else {
                width = lightboxWidth;
            }

            lightboxImg.style.backgroundImage = 'none';
            $scope.captionEnabled = false;
            $scope.lightbox = true;

            if (start > 0) {
                $scope.youtube = new YT.Player('lightbox-image', {
                    width: width,
                    height: height,
                    videoId: videoId,
                    playerVars: {
                        start: start
                    }
                });
                // $scope.youtube.seekTo(30, true);
            }
            else {
                $scope.youtube = new YT.Player('lightbox-image', {
                    width: lightboxWidth,
                    height: lightboxHeight,
                    videoId: videoId
                });
            }
        }
        $scope.htmlCaption = function(title) {
            return $sce.trustAsHtml(title);
        };
        $scope.closeLightbox = function() {
            $scope.lightbox = false;

            try {
                $scope.youtube.stopVideo();
                $scope.youtube.destroy();
            }
            catch (e) {}
        };
        $scope.closePicture = function() {
            erasePicture();
        };
        $scope.getClockTime = function() {
            var date = new Date;
            var clock = (function() {
                switch(date.getHours() % 12) {
                    case 0:
                        return 'twelve';
                    case 1:
                        return 'one';
                    case 2:
                        return 'two';
                    case 3:
                        return 'three';
                    case 4:
                        return 'four';
                    case 5:
                        return 'five';
                    case 6:
                        return 'six';
                    case 7:
                        return 'seven';
                    case 8:
                        return 'eight';
                    case 9:
                        return 'nine';
                    case 10:
                        return 'ten';
                    case 11:
                    default:
                        return 'eleven';
                }
            })();
            var day = (function() {
                switch(date.getDay()) {
                    case 1:
                        return 'Monday';
                    case 2:
                        return 'Tuesday';
                    case 3:
                        return 'Wednesday';
                    case 4:
                        return 'Thursday';
                    case 5:
                        return 'Friday';
                    case 6:
                        return 'Saturday';
                    case 0:
                    default:
                        return 'Sunday';
                }
            })();

            return clock + ' o\'clock on a ' + day;
        }

        window.addEventListener('resize', function() {
            var lightboxImg = document.getElementById('lightbox-image');
            var lightboxWidth = lightboxImg.offsetWidth;
            var lightboxHeight = lightboxImg.offsetHeight;
            var height = lightboxWidth * 0.5625;
            var width = lightboxHeight / 0.5625;

            if (height > lightboxHeight) {
                height = lightboxHeight;
            }
            else {
                width = lightboxWidth;
            }

            player.setSize(width, height);
        });
    }]);
    musicApp.directive('escapeKeyPress', ['$document', function($document) {
        return {
            restrict: 'A',
            link: function(scope, element, attribute) {
                element.on('keyup', function(event) {
                    event.stopPropagation();
                });

                var escape = function(event) {
                    if (event.keyCode === 27) {
                        scope.$apply(function() {
                            scope.$eval(attribute.escapeKeyPress);
                        });
                    }
                }

                $document.on('keyup', escape);

                scope.$on('$destroy', function() {
                    $document.off('keyup', escape);
                });
            }
        };
    }]);

    angular.bootstrap(document.getElementById('music-gallery'), ['music-app']);
})();
