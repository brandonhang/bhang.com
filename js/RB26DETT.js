(function() {
    var carApp = angular.module('car-app', ['ngTouch']);

    carApp.controller('car-ctrl', ['$http', '$scope', '$sce', function($http, $scope, $sce) {
        $http.get('/config/cars.json').then(
            function(carConfig) {
                $scope.carConfig = carConfig.data;
                $scope.carIndex = 0;
                $scope.displMax = 0;
                $scope.maxPow = 0;
                $scope.vmax = 0;

                angular.forEach(carConfig.data, function(carData, index) {
                    if (carData.mL > $scope.displMax) {
                        $scope.displMax = carData.mL;
                    }
                    if (carData.hp > $scope.maxPow) {
                        $scope.maxPow = carData.hp;
                    }
                    if (carData.tq > $scope.maxPow) {
                        $scope.maxPow = carData.tq;
                    }
                    if (carData.vmax > $scope.vmax) {
                        $scope.vmax = carData.vmax;
                    }
                });

                $scope.displMax = Math.ceil($scope.displMax / 1000) * 1000;
                $scope.maxPow = Math.ceil($scope.maxPow / 100) * 100;
                $scope.vmax = Math.ceil($scope.maxPow / 20) * 20;

                $scope.buildGraphs();
            },
            function(carErr) {
                console.log(carErr);
            }
        );

        $scope.getCar = function() {
            var index = $scope.carIndex;

            if (index != undefined) {
                return {
                    'background-image': "url('" + $scope.carConfig[index].img + "')"
                }
            }
        };
        $scope.getPhotoLink = function() {
            var index = $scope.carIndex;

            if (index != undefined) {
                return $scope.carConfig[index].a;
            }
        }
        $scope.getCarName = function() {
            var index = $scope.carIndex;

            if (index != undefined) {
                var year = $scope.carConfig[index].yr
                var make = $scope.carConfig[index].mk;
                var model = $scope.carConfig[index].md;

                if (year > 0) {
                    return year + ' ' + make + ' ' + model;
                }
                else {
                    return make + ' ' + model;
                }
            }
        };
        $scope.getEngine = function() {
            var index = $scope.carIndex;

            if (index != undefined) {
                return {
                    'background-image': "url('/img/icons/" + $scope.carConfig[index].arr + "-engine.svg')"
                }
            }
        };
        $scope.getCylinders = function() {
            var index = $scope.carIndex;

            if (index != undefined) {
                var cylinders = $scope.carConfig[index].cyl;

                return cylinders > 1 ? cylinders : '';
            }
        };
        $scope.getEngineLabel = function() {
            var index = $scope.carIndex;

            if (index != undefined) {
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
            }
        };
        $scope.getInduction = function() {
            var index = $scope.carIndex;

            if (index != undefined) {
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
            }
        };
        $scope.getSpecificInd = function() {
            var index = $scope.carIndex;

            if (index != undefined) {
                var induction = $scope.carConfig[index].ind;

                if (/T/.test(induction)) {
                    var numTurbos = induction.length;

                    return numTurbos > 1 ? numTurbos : '';
                }
                else {
                    return '';
                }
            }
        };
        $scope.getInductionLabel = function() {
            var index = $scope.carIndex;

            if (index != undefined) {
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
            }
        };
        $scope.getDrivetrain = function() {
            var index = $scope.carIndex;

            if (index != undefined) {
                var drive = $scope.carConfig[index].drv;
                var engine = $scope.carConfig[index].eng;

                return {
                    'background-image': "url('/img/icons/" + engine + drive + ".svg')"
                }
            }
        };
        $scope.getDrivetrainLabel = function() {
            var index = $scope.carIndex;

            if (index != undefined) {
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
            }
        };
        $scope.getHybrid = function() {
            var index = $scope.carIndex;

            if (index != undefined) {
                return $scope.carConfig[index].hyb;
            }
        };
        $scope.getDisplacement = function() {
            var index = $scope.carIndex;

            if (index != undefined) {
                return $scope.carConfig[index].mL;
            }
        };
        $scope.getHorsepower = function() {
            var index = $scope.carIndex;

            if (index != undefined) {
                return $scope.carConfig[index].hp;
            }
        };
        $scope.getTorque= function() {
            var index = $scope.carIndex;

            if (index != undefined) {
                return $scope.carConfig[index].tq;
            }
        };
        $scope.getAccel = function() {
            var index = $scope.carIndex;

            if (index != undefined) {
                return $scope.carConfig[index].accel;
            }
        };
        $scope.getVMax = function() {
            var index = $scope.carIndex;

            if (index != undefined) {
                return $scope.carConfig[index].vmax;
            }
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
        };

        $scope.buildGraphs = function() {
            $scope.carSpecElement = document.getElementsByClassName('car-spec')[0];
            $scope.width = $scope.carSpecElement.offsetWidth - 1;
            $scope.height = $scope.carSpecElement.offsetHeight - 1;
            $scope.getDisplacementAmount();
        };
        $scope.getDisplacementAmount = function() {
            var turn = $scope.getDisplacement() / $scope.displMax / 2;

            return {
                'transform': 'rotate(' + turn + 'turn)',
                '-webkit-transform': 'rotate(' + turn + 'turn)',
                '-moz-transform': 'rotate(' + turn + 'turn)',
                '-o-transform': 'rotate(' + turn + 'turn)',
            }
        };
        $scope.convertDisplacement = function() {
            return $scope.getDisplacement() * 0.0610237438368;
        };
        $scope.getHorsepowerAmount = function() {
            var hp = $scope.getHorsepower();

            if (hp >= 0) {
                return {
                    'width': hp / $scope.maxPow * 90 + '%'
                };
            }
            else {
                return {
                    'width': 0
                }
            }
        };
        $scope.getTorqueAmount = function() {
            var tq = $scope.getTorque();

            if (tq >= 0) {
                return {
                    'width': tq / $scope.maxPow * 90 + '%'
                };
            }
            else {
                return {
                    'width': 0
                }
            }
        };
        $scope.getPowerLabel = function() {
            var hp = $scope.getHorsepower();
            var tq = $scope.getTorque();
            var hpLabel = false;
            var tqLabel = false;

            if (hp >= 0) {
                hpLabel = Math.round(hp * 0.745699872) + ' kW';
            }
            if (tq >= 0) {
                tqLabel = Math.round(tq * 1.3558179483314) + ' Nm';
            }

            return (hpLabel && tqLabel ? (hpLabel + ', ' + tqLabel) : '');
        };

        window.addEventListener('resize', function() {
            $scope.width = $scope.carSpecElement.offsetWidth - 1;
            $scope.height = $scope.carSpecElement.offsetHeight - 1;

            var displGauge = document.getElementsByClassName('displ-gauge')[0]
            displGauge.style.width = $scope.width * 9 / 10 + 'px';
            displGauge.style.height = $scope.width * 9 / 20 + 'px';
        });
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
