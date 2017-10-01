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
