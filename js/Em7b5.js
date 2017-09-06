(function() {
    var musicApp = angular.module('music-app', ['ngSanitize']);

    musicApp.controller('music-ctrl', ['$scope', '$sce', function($scope, $sce) {
        var erasePicture = function() {
            $scope.lightboxNc = false;
            $scope.lightbox = false;
        }

        $scope.showPicture = function($event, picture) {
            $event.preventDefault();
            var lightbox = document.getElementById('lightbox-no-caption');

            if (lightbox !== null) {
                var lightboxImg = document.getElementById('lightbox-nc-image');
                lightboxImg.style.backgroundImage = "url('/img/content/" + picture + "')";
                $scope.lightboxNc = true;
            }
            else {
                $scope.lightboxNc = false;
            }
        };
        $scope.viewMusicPhoto = function($event, image, caption) {
            $event.preventDefault();
            var lightbox = document.getElementById('lightbox');

            if (lightbox !== null) {
                var lightboxImg = document.getElementById('lightbox-image');

                lightboxImg.style.backgroundImage = "url('/img/content/" + image + "')";
                $scope.lightbox = true;
                $scope.caption = caption;
            }
            else {
                $scope.lightbox = false;
            }
        };
        $scope.htmlCaption = function(title) {
            return $sce.trustAsHtml(title);
        };
        $scope.closeLightbox = function() {
            $scope.lightboxNc = false;
            $scope.lightbox = false;
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
                    case 0:
                        return 'Monday';
                    case 1:
                        return 'Tuesday';
                    case 2:
                        return 'Wednesday';
                    case 3:
                        return 'Thursday';
                    case 4:
                        return 'Friday';
                    case 5:
                        return 'Saturday';
                    case 6:
                    default:
                        return 'Sunday';
                }
            })();

            return clock + ' o\'clock on a ' + day;
        }
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
