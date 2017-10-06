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
                $scope.flippers = Array.apply(null, Array($scope.projects.main.length +
                    $scope.projects.school.length)).map(Boolean.prototype.valueOf, false);
            },
            function(projectErr) {
            }
        );
        $scope.flipSquare = function(event, index, isMain) {
            var mainMod = isMain ? 0 : $scope.projects.main.length;

            if (event.target.tagName !== 'A') {
                $scope.flippers[index + mainMod] = !$scope.flippers[index + mainMod];
            }
        };
        $scope.getDescription = function(index, isMain) {
            try {
                return isMain ? $scope.projects.main[index].desc : $scope.projects.school[index].desc;
            }
            catch (exc) {}
        };
        $scope.htmlDescription = function(index, isMain) {
            return $sce.trustAsHtml($scope.getDescription(index, isMain));
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
