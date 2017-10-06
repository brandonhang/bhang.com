(function() {
    var portfolioApp = angular.module('portfolio-app', ['ngSanitize']);
    portfolioApp.controller('portfolio-ctrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
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
        $http.get('/config/projects.json').then(
            function(projectData) {
                $scope.projects = projectData.data;
                $scope.flippers = Array.apply(null, Array($scope.projects.length)).map(Boolean.prototype.valueOf, false);
            },
            function(projectErr) {
            }
        );
        $scope.flipSquare = function(event, index) {
            if (event.target.tagName !== 'A') {
                $scope.flippers[index] = !$scope.flippers[index];
            }
        };
        $scope.getDescription = function(index) {
            try {
                return $scope.projects[index].desc;
            }
            catch (exc) {}
        };
        $scope.htmlDescription = function(index) {
            return $sce.trustAsHtml($scope.getDescription(index));
        };

        //////// TEMP DATA ////////
        $scope.numRepos = 15;
        $scope.numFollowers = 5;
        $scope.profilePic = 'https://avatars3.githubusercontent.com/u/16514561?v=4';
        $scope.username = 'brandonhang';
        $scope.company = 'Management Sciences Associates, Inc.';
        $scope.location = 'Pittsburgh, PA';
    }]);

    angular.bootstrap(document.getElementById('portfolio-app'), ['portfolio-app']);
})();
