(function() {
    const FLICKR_PHOTO_URL = 'https://api.flickr.com/services/rest/' +
        '?method=flickr.people.getPublicPhotos' +
        '&api_key=4ba1675febe39451e90b210a634230e0' +
        '&user_id=129886391@N02' +
        '&per_page=24' +
        '&page=1' +
        '&format=json' +
        '&nojsoncallback=1';
    const FLICKR_ALBUM_URL = 'https://api.flickr.com/services/rest/' +
        '?method=flickr.photosets.getList' +
        '&api_key=4ba1675febe39451e90b210a634230e0' +
        '&user_id=129886391@N02' +
        '&per_page=6' +
        '&page=1' +
        '&format=json' +
        '&nojsoncallback=1';

    var flickrApp = angular.module('flickr-app', []);

    flickrApp.controller('flickr-ctrl', ['$scope', '$http', function($scope, $http) {
        $scope.currentPhotoView = 'Recent Albums';
        $scope.albumView = true;
        $scope.lastAlbumID = '';
        $scope.loadingAlbum = true;
        $scope.loadAlbumError = false;

        $http.get(FLICKR_ALBUM_URL).then(
            function(flickrAlbumList) {
                $scope.flickrAlbumList = flickrAlbumList.data.photosets;
                $scope.loadingAlbum = false;
                console.log(flickrAlbumList);
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

                if (albumID !== $scope.lastAlbumID) {
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
                            $scope.flickrPhotoset = flickrPhotoset.data.photoset;
                            $scope.lastAlbumID = albumID;
                            $scope.currentPhotoView = flickrPhotoset.data.photoset.title;
                            $scope.lastAlbumTitle = flickrPhotoset.data.photoset.title;
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
                    $scope.albumView = false;
                    $scope.currentPhotoView = $scope.lastAlbumTitle;
                }
            }
        };
        $scope.viewAlbumList = function($event) {
            $event.preventDefault();
            $scope.albumView = true;
            $scope.currentPhotoView = 'Recent Albums';
        };
        $scope.viewFlickrPhoto = function($event, photoIndex) {
            $event.preventDefault();
            var lightbox = document.getElementById('lightbox');

            if (lightbox !== null) {
                var lightboxImg = document.getElementById('lightbox-image');
                var photo = $scope.flickrPhotoset.photo[photoIndex];
                var url = 'https://farm' + photo.farm + '.staticflickr.com/' +
                    photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg'

                lightboxImg.style.backgroundImage = "url('" + url + "')";
                $scope.pictureTitle = photo.title;
                $scope.photoID = photo.id;
                $scope.lightbox = true;
            }
            else {
                $scope.lightbox = false;
            }
        };
        $scope.closeLightbox = function() {
            $scope.lightbox = false;
        };
        $scope.closePicture = function() {
            erasePicture();
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

    angular.bootstrap(document.getElementById('flickr-photos'), ['flickr-app']);
})();