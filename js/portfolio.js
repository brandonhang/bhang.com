(function() {
    var portfolioApp = angular.module('portfolio-app', []);
    portfolioApp.controller('portfolio-ctrl', ['$scope', '$http', function($scope, $http) {
        // $http.get('/php/github.php').then(
        //     function(gitData) {
        //         $scope.numRepos = gitData.data.numRepos;
        //         $scope.numFollowers = gitData.data.numFollowers;
        //         $scope.profilePic = gitData.data.profilePic;
        //         $scope.username = gitData.data.username;
        //         $scope.company = gitData.data.company;
        //         $scope.location = gitData.data.location;
        //     },
        //     function(gitErr) {
        //     }
        // );
        $scope.flipSquare = function(event, index) {
            if (event.target.tagName !== 'A') {
                $scope.flippers[index] = !$scope.flippers[index];
            }
        };

        //////// TEMP DATA ////////
        $scope.numRepos = 15;
        $scope.numFollowers = 5;
        $scope.profilePic = 'https://avatars3.githubusercontent.com/u/16514561?v=4';
        $scope.username = 'brandonhang';
        $scope.company = 'Management Sciences Associates, Inc.';
        $scope.location = 'Pittsburgh, PA';

        $scope.projects = [
            {
                title: 'Subaru Impreza',
                link: 'https://en.wikipedia.org/wiki/Subaru_Impreza#First_generation_.281992.E2.80.932000.29',
                desc: 'First generation Subaru Impreza. Announced in October 1992.',
                image: '/img/bkgrds/impreza-1000.jpg'
            },
            {
                title: 'Blue Rondo à la Turk',
                link: 'https://en.wikipedia.org/wiki/Subaru_Impreza#First_generation_.281992.E2.80.932000.29',
                desc: 'Composed by Dave Brubeck. Part of the Time Out album.',
                image: '/img/bkgrds/bluerondo-1000.jpg'
            },
            {
                title: 'Ford GT40',
                link: 'https://en.wikipedia.org/wiki/Ford_GT40#Mk_III',
                desc: 'Third revision of the 24 Hours of Le Mans-winning Ford GT40',
                image: '/img/bkgrds/gt40-1000.jpg'
            },
            {
                title: 'Busy Bumblebee',
                link: 'https://en.wikipedia.org/wiki/Bumblebee',
                desc: 'A bumblebee gathers pollen from a flowering red bud in spring',
                image: '/img/bkgrds/springtime-1000.jpg'
            },
        ];
        $scope.flippers = Array.apply(null, Array($scope.projects.length)).map(Boolean.prototype.valueOf, false);
    }]);

    angular.bootstrap(document.getElementById('portfolio-app'), ['portfolio-app']);
})();
