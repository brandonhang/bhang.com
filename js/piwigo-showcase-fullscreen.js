(function() {
    var SHOWCASE_IMAGE_IDS = 'https://www.brandonhang.com/api/bhang/showcase_list';
    var CURRENT_IMAGE = 'https://www.brandonhang.com/api/piwigo/ws?format=json&method=pwg.images.getInfo&image_id=';

    var piwigoApp = angular.module('piwigo-app', []);

    piwigoApp.controller('piwigo-ctrl', ['$scope', '$http', function($scope, $http) {
        var url = window.location.href;
        var urlMatch = url.match(/[.]com[/]photography[/]showcase[/]fullscreen[/]image[/](\d+)(?:[/])?/);

        if (urlMatch) {
            $scope.photoId = urlMatch[1];
        }
        else {
            window.location.href = '/photography/showcase';
        }

        $http.get(CURRENT_IMAGE + $scope.photoId).then(
            function(currentImage) {
                $scope.currentImage = currentImage.data;
                document.title += ' | ' + $scope.currentImage.result.name;
            },
            function(currentImageError) {
                var photoActual = document.getElementsByClassName('photo-single-wrapper')[0];
                photoActual.style.backgroundImage = "url('/img/content/busted.jpg')";
            }
        );

        $http.get(SHOWCASE_IMAGE_IDS).then(
            function(albumIds) {
                $scope.showcaseList = albumIds.data;
                var index = $scope.showcaseList.indexOf(parseInt($scope.photoId));
                var prev = index - 1;
                var next = index + 1;

                if (prev >= 0) {
                    $scope.prevImage = prev;
                }
                if (next < $scope.showcaseList.length) {
                    $scope.nextImage = next;
                }

                if ($scope.prevImage) {
                    $http.get(CURRENT_IMAGE + $scope.prevImage).then( 
                        function(prevImage) {
                            $scope.prevTitle = prevImage.data.result.name;
                        },
                        function(prevError) {
                            $scope.prevTitle = '???';
                        }
                    );
                }
                if ($scope.nextImage) {
                    $http.get(CURRENT_IMAGE + $scope.nextImage).then( 
                        function(nextImage) {
                            $scope.nextTitle = nextImage.data.result.name;
                        },
                        function(nextError) {
                            $scope.nextTitle = '???';
                        }
                    );
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
                window.location.href = '/photography/showcase/detail/image/' + $scope.photoId;
            }
        }, false);

        document.addEventListener('keyup', function(event) {
            var modKey = event.shiftKey || event.altKey || event.ctrlKey || event.metaKey;

            if (event.keyCode === 37 && !modKey && $scope.prevImage) {
                window.location.href = '/photography/showcase/fullscreen/image/' + $scope.prevImage;
            }
        }, false);

        document.addEventListener('keyup', function(event) {
            var modKey = event.shiftKey || event.altKey || event.ctrlKey || event.metaKey;

            if (event.keyCode === 39 && !modKey && $scope.nextImage) {
                window.location.href = '/photography/showcase/fullscreen/image/' + $scope.nextImage;
            }
        }, false);
    }]);
})();
