(function() {
    var carApp = angular.module('car-app', []);

    carApp.controller('car-ctrl', ['$http', '$scope', '$sce', function($http, $scope, $sce) {
        $http.get('/config/cars.json').then(
            function(carConfig) {
                $scope.carConfig = carConfig.data;
                $scope.carIndex = 0;
            },
            function(carErr) {
                console.log(carErr);
            }
        );

        $scope.getCar = function() {
            var index = $scope.carIndex;

            return {
                'background-image': "url('" + $scope.carConfig[index].img + "')"
            }
        };
        $scope.getPhotoLink = function() {
            var index = $scope.carIndex;

            return $scope.carConfig[index].a;
        }
        $scope.getCarName = function() {
            var index = $scope.carIndex;
            var year = $scope.carConfig[index].yr
            var make = $scope.carConfig[index].mk;
            var model = $scope.carConfig[index].md;

            if (year > 0) {
                return year + ' ' + make + ' ' + model;
            }
            else {
                return make + ' ' + model;
            }
        };
        $scope.getEngine = function() {
            var index = $scope.carIndex;

            return {
                'background-image': "url('/img/icons/" + $scope.carConfig[index].arr + "-engine.svg')"
            }
        };
        $scope.getCylinders = function() {
            var index = $scope.carIndex;
            var cylinders = $scope.carConfig[index].cyl;

            return cylinders > 1 ? cylinders : '';
        };
        $scope.getEngineLabel = function() {
            var index = $scope.carIndex;
            var arrangement = $scope.carConfig[index].arr;
            var cylinders = $scope.carConfig[index].cyl;

            if (arrangement === 'R') {
                return 'Rotary';
            }
            else if (arrangement === 'V' || arrangement === 'W') {
                return arrangement + cylinders;
            }
            else if (cylinders === 1) {
                return 'Single-cylinder';
            }
            else {
                var numCyl = (function() {
                    switch(cylinders) {
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
                        default:
                            return 'lotsacylinders';
                    }
                })();

                if (arrangement === 'H') {
                    return 'Flat-' + numCyl;
                }
                else if (cylinders < 6) {
                    return 'Inline-' + numCyl;
                }
                else {
                    return 'Straight-' + numCyl;
                }
            }
        };
        $scope.getInduction = function() {
            var index = $scope.carIndex;
            var induction = $scope.carConfig[index].ind;

            if (/T/.test(induction)) {
                return {
                    'background-image': "url('/img/icons/Turbocharger.svg')"
                }
            }
            else if (/S/.test(induction)) {
                return {
                    'background-image': "url('/img/icons/Supercharger.svg')"
                }
            }
            else {
                return {
                    'background-image': "url('/img/icons/NA.svg')"
                }
            }
        };
        $scope.getSpecificInd = function() {
            var index = $scope.carIndex;
            var induction = $scope.carConfig[index].ind;

            if (/T/.test(induction)) {
                var numTurbos = induction.length;

                return numTurbos > 1 ? numTurbos : '';
            }
            else {
                return '';
            }
        };
        $scope.getInductionLabel = function() {
            var index = $scope.carIndex;
            var induction = $scope.carConfig[index].ind;

            switch(induction) {
                case 'NA':
                    return 'Naturally aspirated';
                case 'ST':
                    return 'Twincharged';
                case 'S':
                    return 'Supercharged';
                default:
                    return (function() {
                        switch(induction.length) {
                            case 1:
                                return 'Turbocharged';
                            case 2:
                                return 'Twin-turbocharged';
                            case 3:
                                return 'Triple-turbocharged';
                            case 4:
                                return 'Quad-turbocharged';
                            default:
                                return 'Lotsaturbos';
                        }
                    })();
            }
        };
        $scope.getDrivetrain = function() {
            var index = $scope.carIndex;
            var drive = $scope.carConfig[index].drv;
            var engine = $scope.carConfig[index].eng;

            return {
                'background-image': "url('/img/icons/" + engine + drive + ".svg')"
            }
        };
        $scope.getDrivetrainLabel = function() {
            var index = $scope.carIndex;
            var drive = $scope.carConfig[index].drv;
            var engine = $scope.carConfig[index].eng;

            var layout = (function() {
                switch(engine) {
                    case 'R':
                        return 'Rear-engine';
                    case 'M':
                        return 'Mid-engine';
                    case 'F':
                    default:
                        return 'Front-engine';
                }
            })();
            var drivetrain = (function() {
                switch(drive) {
                    case 'R':
                        return 'rear-wheel drive';
                    case 'A':
                        return 'all-wheel drive';
                    case 'F':
                    default:
                        return 'front-wheel drive';
                }
            })();

            return layout + ', ' + drivetrain;
        };
        $scope.getHybrid = function() {
            var index = $scope.carIndex;
            return $scope.carConfig[index].hyb;
        };
        $scope.getDisplacement = function() {
            var index = $scope.carIndex;
            return $scope.carConfig[index].mL;
        };
        $scope.getHorsepower = function() {
            var index = $scope.carIndex;
            return $scope.carConfig[index].hp;
        };
        $scope.getTorque= function() {
            var index = $scope.carIndex;
            return $scope.carConfig[index].tq;
        };
        $scope.getAccel = function() {
            var index = $scope.carIndex;
            return $scope.carConfig[index].accel;
        };
        $scope.getVMax = function() {
            var index = $scope.carIndex;
            return $scope.carConfig[index].vmax;
        };
        $scope.nextCar = function() {
            $scope.setIndex($scope.carIndex + 1);
        };
        $scope.prevCar = function() {
            $scope.setIndex($scope.carIndex - 1);
        };
        $scope.setIndex = function(index) {
            var carLength = $scope.carConfig.length;

            index = ((index % carLength) + carLength) % carLength;
            $scope.carIndex = index;
        };
        $scope.goFullscreen = function() {
            $scope.fullscreen = true;
        };
        $scope.exitFullscreen = function() {
            $scope.fullscreen = false;
        }
    }]);
    carApp.directive('escapeKeyPress', ['$document', function($document) {
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
    carApp.directive('nextCar', ['$document', function($document) {
        return {
            restrict: 'A',
            link: function(scope, element, attribute) {
                element.on('keyup', function(event) {
                    event.stopPropagation();
                });

                var escape = function(event) {
                    if (event.keyCode === 39) {
                        scope.$apply(function() {
                            scope.$eval(attribute.nextCar);
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
    carApp.directive('prevCar', ['$document', function($document) {
        return {
            restrict: 'A',
            link: function(scope, element, attribute) {
                element.on('keyup', function(event) {
                    event.stopPropagation();
                });

                var escape = function(event) {
                    if (event.keyCode === 37) {
                        scope.$apply(function() {
                            scope.$eval(attribute.prevCar);
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

    angular.bootstrap(document.getElementById('car-app'), ['car-app']);
})();
