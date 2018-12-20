angular.element(document).ready(function() {
    var carApp = angular.module('car-app', ['ngSanitize', 'ngTouch']);

    carApp.controller('car-ctrl', ['$http', '$scope', '$sce', function($http, $scope, $sce) {
        // $http.get('/config/cars.json').then(
        $http.get('/api/bhang/cars').then(
            function(carConfig) {
                $scope.carConfig = carConfig.data;
                $scope.carIndex = Math.floor(Math.random() * carConfig.data.length);
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
                $scope.vmax = Math.ceil($scope.vmax / 20) * 20;

                $scope.calculateGalleryHeight();
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
                    'background-image': "url('" + $scope.carConfig[index].img + "')," +
                        " url('/img/icons/img_load.svg')"
                };
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
        $scope.getDescription = function() {
            var index = $scope.carIndex;

            if (index != undefined) {
                return $scope.carConfig[index].desc;
            }
        };
        $scope.nextCar = function() {
            if (!$scope.galleryView) {
                $scope.setIndex($scope.carIndex + 1);
            }
        };
        $scope.prevCar = function() {
            if (!$scope.galleryView) {
                $scope.setIndex($scope.carIndex - 1);
            }
        };
        $scope.setIndex = function(index) {
            var carLength = $scope.carConfig.length;

            index = ((index % carLength) + carLength) % carLength;
            $scope.carIndex = index;
        };
        $scope.goFullscreen = function() {
            $scope.fullscreen = true;
            // $scope.descriptionView = false;
            // document.getElementsByTagName('body')[0].className = 'no-content';
            $scope.resizeGraphs();
        };
        $scope.exitFullscreen = function() {
            $scope.fullscreen = false;
            // $scope.descriptionView = false;
            // document.getElementsByTagName('body')[0].className = '';
            $scope.resizeGraphs();
        };

        $scope.buildGraphs = function() {
            $scope.carSpecElement = document.getElementsByClassName('car-spec')[0];

            setTimeout(function() {
                $scope.resizeGraphs();
            }, 50);
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
        $scope.getAccelTime = function() {
            var accel = $scope.getAccel();

            if (accel >= 0) {
                var degrees = (accel * 6) % 360 + 'deg';

                return {
                    'transform': 'rotate(' + degrees + ')',
                    '-webkit-transform': 'rotate(' + degrees + ')',
                    '-moz-transform': 'rotate(' + degrees + ')',
                    '-o-transform': 'rotate(' + degrees + ')'
                };
            }
            else {
                return {
                    'transform': 'rotate(0)',
                    '-webkit-transform': 'rotate(0)',
                    '-moz-transform': 'rotate(0)',
                    '-o-transform': 'rotate(0)'
                };
            }
        };
        $scope.getVMaxTime = function() {
            var vmax = $scope.getVMax();

            if (vmax >= 0) {
                var degrees = (vmax / $scope.vmax * 270) + 'deg';

                return {
                    'transform': 'rotate(' + degrees + ')',
                    '-webkit-transform': 'rotate(' + degrees + ')',
                    '-moz-transform': 'rotate(' + degrees + ')',
                    '-o-transform': 'rotate(' + degrees + ')'
                };
            }
            else {
                return {
                    'transform': 'rotate(0)',
                    '-webkit-transform': 'rotate(0)',
                    '-moz-transform': 'rotate(0)',
                    '-o-transform': 'rotate(0)'
                };
            }
        };
        $scope.convertVMax = function() {
            return $scope.getVMax() * 1.609344;
        };
        $scope.getGalleryHeight = function() {
            var carImage = document.getElementsByClassName('car-image')[0];

            return {
                'height': carImage.offsetHeight + 'px'
            }
        };
        $scope.calculateGalleryHeight = function() {
            var carImage = document.getElementsByClassName('car-image')[0];
            var carGallery = document.getElementsByClassName('car-gallery')[0];
            carGallery.style.height = carImage.offsetHeight + 'px';
        };
        $scope.enterGallery = function() {
            // $scope.descriptionView = false;
            $scope.galleryView = true;
        };
        $scope.exitGallery = function() {
            $scope.galleryView = false;
        };
        $scope.changeCarView = function(newIndex) {
            if (newIndex < 0 || newIndex > $scope.carConfig.length) {
                newIndex = 0;
            }

            $scope.carIndex = newIndex;
            $scope.galleryView = false;
        }

        $scope.resizeGraphs = function() {
            var displGauge = document.getElementsByClassName('displ-gauge')[0];

            setTimeout(function() {
                $scope.calculateGalleryHeight();

                $scope.width = $scope.carSpecElement.offsetWidth;
                $scope.height = $scope.carSpecElement.offsetHeight;

                if ($scope.width > $scope.height) {
                    displGauge.style.width = $scope.height * 9 / 10 + 'px';
                    displGauge.style.height = $scope.height * 9 / 20 + 'px';
                }
                else {
                    displGauge.style.width = $scope.width * 9 / 10 + 'px';
                    displGauge.style.height = $scope.width * 9 / 20 + 'px';
                }
            }, 50);
        };
        $scope.htmlDescription = function() {
            return $sce.trustAsHtml($scope.getDescription());
        };

        window.addEventListener('resize', function() {

            $scope.resizeGraphs();
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
});
