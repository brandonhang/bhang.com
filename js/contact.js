angular.element(document).ready(function() {
    var contactApp = angular.module('contact-app', ['ngSanitize']);

    contactApp.controller('contact-ctrl', ['$http', '$scope', '$sanitize', function($http, $scope, $sanitize) {
        $scope.sendingMessage = false;
        $scope.mailSent = false;

        $scope.sendMessage = function() {
            if (!$scope.sendingMessage) {
                $scope.mailMessage = 'Delivering mail...';
                $scope.sendingMessage = true;
                $scope.mailSent = false;

                var cleanName = $sanitize($scope.name);
                var cleanEmail = $sanitize($scope.email);
                var cleanMessage = $sanitize($scope.message);
                var recaptcha = grecaptcha.getResponse();
                var message = {
                    name: cleanName,
                    email: cleanEmail,
                    message: cleanMessage,
                    recaptcha: recaptcha
                };

                if (cleanName.length === 0) {
                    $scope.mailSent = true;
                    $scope.mailMessage = 'Your name was left blank';
                    return;
                }
                else if (cleanEmail.length === 0) {
                    $scope.mailSent = true;
                    $scope.mailMessage = 'Your email was left blank';
                    return;
                }
                else if (cleanMessage.length === 0) {
                    $scope.mailSent = true;
                    $scope.mailMessage = 'Please write a message';
                    return;
                }
                else if (recaptcha.length === 0) {
                    $scope.mailSent = true;
                    $scope.mailMessage = 'Please prove you are not a robot/Terminator/Matrix agent';
                    return;
                }

                $http.post('/php/mailman.php', message, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    function(mailSuccess) {
                        $scope.name = '';
                        $scope.email = '';
                        $scope.message = '';
                        grecaptcha.reset();
                        $scope.mailSent = true;
                        $scope.mailMessage = 'Your message has been sent!';
                    },
                    function(mailError) {
                        $scope.mailSent = true;
                        $scope.mailMessage = 'A problem occurred sending your message :(';
                    }
                );
            }
        };
        $scope.closeMessageBox = function() {
            $scope.sendingMessage = false;
            $scope.mailSent = false;
        };
    }]);

    angular.bootstrap(document.getElementById('contact-app'), ['contact-app']);
});

var onloadCallback = function() {
    grecaptcha.render('recaptcha', {
        sitekey: '6LdjDx0TAAAAAExYKnp1yjzEy8X5sYridC34WNKX'
    });
};
