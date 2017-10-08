angular.element(document).ready(function() {
    var FLICKR_PHOTO_URL = 'https://api.flickr.com/services/rest/' +
        '?method=flickr.people.getPublicPhotos' +
        '&api_key=4ba1675febe39451e90b210a634230e0' +
        '&user_id=129886391@N02' +
        '&per_page=24' +
        '&page=1' +
        '&format=json' +
        '&nojsoncallback=1';
    var FLICKR_ALBUM_URL = 'https://api.flickr.com/services/rest/' +
        '?method=flickr.photosets.getList' +
        '&api_key=4ba1675febe39451e90b210a634230e0' +
        '&user_id=129886391@N02' +
        '&per_page=6' +
        '&page=1' +
        '&format=json' +
        '&nojsoncallback=1';

    var flickrApp = angular.module('flickr-app', ['ngTouch']);

    flickrApp.controller('flickr-ctrl', ['$scope', '$http', function($scope, $http) {
        $scope.currentPhotoView = 'Recent Albums';
        $scope.albumView = true;
        $scope.lastAlbumID = '';
        $scope.loadingAlbum = true;
        $scope.loadAlbumError = false;
        $scope.albumCache = {};

        $http.get(FLICKR_ALBUM_URL).then(
            function(flickrAlbumList) {
                $scope.flickrAlbumList = flickrAlbumList.data.photosets;
                $scope.loadingAlbum = false;
            },
            function(flickrAlbumListErr) {
                $scope.loadingAlbum = false;
                $scope.loadAlbumError = true;
                console.log(flickrAlbumListErr);
            }
        );

        var erasePicture = function() {
            $scope.lightbox = false;
        }

        $scope.viewAlbumSet = function($event, albumID) {
            $event.preventDefault();

            if (!$scope.loadingAlbum) {
                $scope.loadAlbumError = false;

                if (!(albumID in $scope.albumCache)) {
                // if (albumID !== $scope.lastAlbumID) {
                    var flickrAlbumPhotos = 'https://api.flickr.com/services/rest/' +
                    '?method=flickr.photosets.getPhotos' +
                    '&api_key=4ba1675febe39451e90b210a634230e0' +
                    '&user_id=129886391@N02' +
                    '&photoset_id=' + albumID +
                    '&per_page=16' +
                    '&page=1' +
                    '&format=json' +
                    '&nojsoncallback=1';

                    $scope.loadingAlbum = true;
                    $http.get(flickrAlbumPhotos).then(
                        function(flickrPhotoset) {
                            $scope.albumCache[albumID] = flickrPhotoset.data;
                            $scope.flickrPhotoset = flickrPhotoset.data.photoset;
                            $scope.currentPhotoView = flickrPhotoset.data.photoset.title;
                            $scope.albumView = false;
                            $scope.loadingAlbum = false;
                        },
                        function(flickrPhotosetErr) {
                            $scope.loadingAlbum = false;
                            $scope.loadAlbumError = true;
                        }
                    );
                }
                else {
                    $scope.flickrPhotoset = $scope.albumCache[albumID].photoset;
                    $scope.currentPhotoView = $scope.albumCache[albumID].photoset.title;
                    $scope.albumView = false;
                }
            }
        };
        $scope.viewAlbumList = function($event) {
            $event.preventDefault();
            $scope.albumView = true;
            $scope.currentPhotoView = 'Recent Albums';
        };
        $scope.viewFlickrPhoto = function($event, photoIndex) {
            if ($event !== null) {
                $event.preventDefault();
            }

            var lightbox = document.getElementById('lightbox');

            if (lightbox !== null) {
                var photosetLength = $scope.flickrPhotoset.photo.length;

                photoIndex = ((photoIndex % photosetLength) + photosetLength) % photosetLength;

                var lightboxImg = document.getElementById('lightbox-image');
                var photo = $scope.flickrPhotoset.photo[photoIndex];
                var url = 'https://farm' + photo.farm + '.staticflickr.com/' +
                    photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg'

                lightboxImg.style.backgroundImage = "url('" + url + "')";
                $scope.pictureTitle = photo.title;
                $scope.photoID = photo.id;
                $scope.lightbox = true;
                $scope.flickrIndex = photoIndex;
            }
            else {
                $scope.lightbox = false;
            }
        };
        $scope.next = function($event) {
            $scope.viewFlickrPhoto($event, $scope.flickrIndex + 1);
        };
        $scope.prev = function($event) {
            $scope.viewFlickrPhoto($event, $scope.flickrIndex - 1);
        };
        $scope.closeLightbox = function() {
            $scope.lightbox = false;
        };
        $scope.closePicture = function() {
            erasePicture();
        };
        $scope.nextPic = function() {
            $scope.viewFlickrPhoto(null, $scope.flickrIndex + 1);
        };
        $scope.prevPic = function() {
            $scope.viewFlickrPhoto(null, $scope.flickrIndex - 1);
        };
    }]);
    flickrApp.directive('escapeKeyPress', ['$document', function($document) {
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
    flickrApp.directive('nextPicture', ['$document', function($document) {
        return {
            restrict: 'A',
            link: function(scope, element, attribute) {
                element.on('keyup', function(event) {
                    event.stopPropagation();
                });

                var escape = function(event) {
                    if (event.keyCode === 39) {
                        scope.$apply(function() {
                            scope.$eval(attribute.nextPicture);
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
    flickrApp.directive('prevPicture', ['$document', function($document) {
        return {
            restrict: 'A',
            link: function(scope, element, attribute) {
                element.on('keyup', function(event) {
                    event.stopPropagation();
                });

                var escape = function(event) {
                    if (event.keyCode === 37) {
                        scope.$apply(function() {
                            scope.$eval(attribute.prevPicture);
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

    angular.bootstrap(document.getElementById('flickr-photos'), ['flickr-app']);
});
