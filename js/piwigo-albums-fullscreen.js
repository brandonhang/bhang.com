(function() {
    var CURRENT_IMAGE = 'https://www.brandonhang.com/api/piwigo/ws?format=json&method=pwg.images.getInfo&image_id=';
    var FLANK_IMG_1 = 'https://www.brandonhang.com/api/piwigo/picture.php?/';
    var FLANK_IMG_2 = '/category/';

    var piwigoApp = angular.module('piwigo-app', []);

    piwigoApp.controller('piwigo-ctrl', ['$scope', '$http', function($scope, $http) {
        var url = window.location.href;
        var urlMatch = url.match(/[.]com[/]photography[/]albums[/]fullscreen[/]photoset[/](\d+)(?:[/]image[/](\d+))?(?:[/])?/);

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
            },
            function(currentImageError) {
                var photoActual = document.getElementsByClassName('photo-single-wrapper')[0];
                photoActual.style.backgroundImage = "url('/img/content/busted.jpg')";
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

        $scope.headerTimer = function() {
            if ($scope.headerTimeout) {
                clearTimeout($scope.headerTimeout);
            }

            var title = document.getElementById('photo-title');
            var fullscreen = document.getElementById('exit-fullscreen');
            var navButtons = document.getElementsByClassName('photo-nav');

            for (var i = 0; i < navButtons.length; i++) {
                navButtons[i].classList.add('hover');
            }

            title.classList.add('hover');
            fullscreen.classList.add('hover');

            $scope.headerTimeout = setTimeout(function() {
                title.classList.remove('hover');
                fullscreen.classList.remove('hover');

                for (var i = 0; i < navButtons.length; i++) {
                    navButtons[i].classList.remove('hover');
                }
            }, 2000);
        };

        document.addEventListener('keyup', function(event) {
            var modKey = event.shiftKey || event.altKey || event.ctrlKey || event.metaKey;

            if (event.keyCode === 27 && !modKey) {
                window.location.href = '/photography/albums/detail/photoset/' + $scope.albumId + '/image/' + $scope.photoId;
            }
        }, false);

        document.addEventListener('keyup', function(event) {
            var modKey = event.shiftKey || event.altKey || event.ctrlKey || event.metaKey;

            if (event.keyCode === 37 && !modKey && $scope.prevImage) {
                window.location.href = '/photography/albums/fullscreen/image/' + $scope.prevImage;
            }
        }, false);

        document.addEventListener('keyup', function(event) {
            var modKey = event.shiftKey || event.altKey || event.ctrlKey || event.metaKey;

            if (event.keyCode === 39 && !modKey && $scope.nextImage) {
                window.location.href = '/photography/cameraroll/fullscreen/image/' + $scope.nextImage;
            }
        }, false);
    }]);
})();
