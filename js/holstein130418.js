// JavaScript Document

var holsteinModule = angular.module('holsteinModule',['ngRoute','ngDialog','ngAnimate','ui.bootstrap']);


holsteinModule.config(function($routeProvider) {

	$routeProvider
	  .when("/", {
		templateUrl : "views/home.html"
	  })
});


holsteinModule.run(['$rootScope','$location', '$routeParams', function($rootScope, $location, $routeParams) {

		$rootScope.dialog = null;
		$rootScope.curIdx = 0;
		$rootScope.navActive = $location.path();
		console.log('Current route name: ' + $location.path());

		$rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
		  console.log('Current route name: ' + $location.path());
		  $rootScope.navActive = $location.path();
		  // Get all URL parameter
		  console.log($routeParams);
		});

}]);






//Controllers

holsteinModule.controller('navCtrl',['$scope',function ($scope) {
  $scope.isNavCollapsed = true;
  $scope.isCollapsed = false;
  $scope.isCollapsedHorizontal = false;
}]);

holsteinModule.controller('mainCtrl',['$scope','$rootScope','$window','$http','$interval','$location','Compare','ngDialog','ArraySvce','DataObj',mainCtrl]);

	function mainCtrl($scope,$rootScope,$window,$http,$interval,$location,compare,ngDialog,arraySvce,dataObj  ) {

		angular.element($window).bind('resize', function(){
        	$scope.$digest();
        });

		$scope.winWidth = $window.innerWidth;

		angular.element($window).bind('resize', function () {
   			 $scope.winWidth = $window.innerWidth;
		});

		$scope.onExit = function() {
		 //
		};

   	$window.onbeforeunload =  $scope.onExit;

		//Initialise scope vars
		$scope.params = {};
		$http.get("data/options.json").then(function(data) {
				$scope.params = data.data;
				});

		$scope.status = {
			msg: "Holstein app is running",
			init: false
		}

		$scope.getColorName = function(palette,color) {
				var idx = arraySvce.arrIndexOf($scope.palettes[palette].colors,color,'code');
				return $scope.palettes[palette].colors[idx].title;
		}

		$scope.keyNames =  [{'pos':0,'key':'1'},{'pos':17,'key':'2'},{'pos':33,'key':'3'},{'pos':50,'key':'4L'},{'pos':67,'key':'4H'},{'pos':83,'key':'5L'},{'pos':100,'key':'5H'}];

			$scope.sliderArgs = [];
			$scope.sliderState = [];

			$scope.sliderArgs.push(JSON.parse(JSON.stringify(dataObj.sliderDefaults())));
			$scope.sliderState.push(JSON.parse(JSON.stringify(dataObj.sliderState())));
			$scope.sliderArgs[0].keyNames = $scope.keyNames;
			$scope.sliderState[0].curPos = $scope.sliderArgs[0].minOffset;


		//INITIALISE APP

		$scope.initApp = function() {
		//Auth checks complete so start the compass and get device data
			console.log('INIT APP');
			$scope.status.init = true;
		}

		$scope.say = function(msg) {

			var d = ngDialog.openConfirm({
				template: msg,
				className: 'ngdialog-theme-default',
				plain:true,
				closeByNavigation: true,
				controller: function() {
					//
				}
			});
			setTimeout(function() {
						ngDialog.close(d);
										},1600);
		}


		$scope.say('hello');
	}



//DIRECTIVES

holsteinModule.directive('sliderCtrl',['$rootScope','$window','$location','$document','ngDialog',function($rootScope,$window,$location,$document,ngDialog) {

			return {
				restrict: 'E',
				scope: {
					options: '=',
					curState: '='
				},
				templateUrl: 'html/slider.html',
				link: function (scope, element, attributes) {
		    	element.addClass('slider_container');
		    },
				controller: function($scope,$element) {

					$scope.handle = {};
					$scope.markers = [];
					$scope.keyMarkers = [];

					$scope.winWidth = $window.innerWidth;
					angular.element($window).bind('resize', function () {
						 $scope.winWidth = $window.innerWidth;
					});

					$scope.track = {
						startX: 0,
						startY: 0,
						x: 0,
						y: 0
					}
					startX = 0, startY = 0, x = 0, y = 0;


					$scope.getElementDimensions = function () {
				    return { 'h': $element.parent()[0].offsetHeight, 'w': $element.parent()[0].offsetWidth };
				  };

					$scope.doMarkers = function() {
						if($scope.options.showMarkers === true) {
							//if keynames not specified, check steps option and create regular interval markers
							if($scope.options.keyNames === null) {
								if($scope.options.steps > 0) {
									var m = {
										pos:0
									};
									$scope.markers.push(m);

									for(var i=0;i<$scope.options.steps;i++) {
										var pos = (i>0) ? Math.round(i*100/$scope.options.steps) : 0;
										m = {pos: pos};
										console.log(m.pos);
										$scope.markers.push(m);
									}

									m = {
									 pos:100
								 };
								 $scope.markers.push(m);
							 }
							 else {
								 //no marker parameters specified so do nothing
							 }
						 }
						 //Create named markers from keyNames array
						 else {
							 if(typeof $scope.options.keyNames == 'object') {
								 $scope.options.steps = $scope.options.keyNames.length-1;
								 var keys = $scope.options.keyNames;
								 for(var i=0;i<$scope.options.keyNames.length;i++) {
									 $scope.keyMarkers.push($scope.options.keyNames[i]);
								 }
							 }
							 else {
								 // no valid keyNames array so do nothing
							 }
						 }

						}
					}

				  $element.bind('resize', function () {
				    $scope.$apply();
					});

					/*
					$element.on('click', function(event) {
						event.preventDefault();
						$scope.track.startX = event.pageX - $scope.curState.curPos;
						$document.on('mousemove', mousemove);
						$document.on('mouseup', mouseup);
						$scope.curState.mouseDown = true;
						$scope.setHandle(x);
					});
					*/

					$scope.doMarkers();

				}//end Controller

			};//end return function

		}]);

		holsteinModule.directive('dragHandle', ['$document', function($document) {
			return {
				restrict: 'A',
				require: '^sliderCtrl',
				link: function($scope,$element,$attrs,$ctrl) {
						//remove link if not needed
				},
				controller: function($scope,$element) {

					var startX = 0, startY = 0, x = 0, y = 0;

					$scope.handle = $element;

					$element.css({
					 left: $scope.options.minOffset + 'px',
					 position: 'relative',
					 cursor: 'pointer'
					});

					$element.on('mousedown', function(event) {
						event.preventDefault();
						startX = event.pageX - $scope.curState.curPos;
						$document.on('mousemove', mousemove);
						$document.on('mouseup', mouseup);
						$scope.curState.mouseDown = true;
						$scope.setHandle(x);
					});

					function mousemove(event) {
						//y = event.pageY - startY;
						x = event.pageX - startX;

						$scope.setHandle(x);

					}

					function mouseup() {
						$document.off('mousemove', mousemove);
						$document.off('mouseup', mouseup);
						$scope.$apply(function(){
							$scope.curState.mouseDown = false;
						})
						$scope.snapToMark();
					}

					$scope.getElementX = function () {
						console.log($scope.curState.curPos);
				    return $element.css('left');
				  };

					$scope.$watch($scope.getElementX, function (newValue, oldValue) {
						 console.log(newValue+" "+$scope.curState.curPos);
				 });

				 $scope.setHandle = function(x) {
					 var pos = $scope.xLeft(x);
					 $element.css({
						 left:  pos + 'px'
					 });
						 $scope.$apply(function() {
							 $scope.curState.curPos = pos;
							 $scope.curState.curPercent = $scope.posPcent(pos);
						 });
					 return false;
				 }

				 $scope.snapToMark = function() {
							var p = $scope.rounder($scope.curState.curPercent,100/$scope.options.steps);
							console.log(p+" "+$scope.nearKey);
							$scope.$apply(function() {
								x = $scope.curState.curPos = $scope.pcentPos(p);
								$scope.curState.curPercent = p;
							});
							$element.css({'left':$scope.curState.curPos + 'px'});
							$scope.curState.nearKey = p;
							$scope.focusKey = ("#sk_" + $scope.options.id) + p;

							return false;
					}

					$scope.rounder = function (number,to) {
					  	return Math.round(Math.round(number/to)*to);
					}

					$scope.xLeft = function(x) {
						 return Math.round(Math.max( Math.min( $scope.box.w  - ($scope.box.w * 0.06 + $scope.options.maxOffset), x) , $scope.options.minOffset));
					}

					$scope.posPcent = function(x) {
						return (x - $scope.options.minOffset) * 100/$scope.curState.range;
					}

					$scope.pcentPos = function(pc) {
						var pos = (pc * $scope.curState.range/100) + $scope.options.minOffset;
						return pos;
					}

					$scope.$watch($scope.getElementDimensions, function (newValue, oldValue) {
							$scope.box = {
								h: newValue.h,
								w: newValue.w
							}
							$scope.curState.range = Math.round($scope.box.w - ($scope.box.w * 0.06 + $scope.options.maxOffset) - $scope.options.minOffset);
							x = $scope.xLeft($scope.pcentPos($scope.curState.curPercent));
							var pos = x;
							$element.css({
								 left:  pos + 'px'
							 });
							 $scope.curState.curPos = pos;


					}, true);

				}
			};
		}]);

holsteinModule.directive('keyEnter', function () {
    return function ($scope, $element, $attrs) {
        $element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                $scope.$apply(function (){
                    $scope.$eval($attrs.keyEnter);
                });

                event.preventDefault();
            }
        });
    };
});


holsteinModule.directive('rotate', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.degrees, function (rotateDegrees) {
                var r = 'rotate(' + rotateDegrees + 'deg)';
                element.css({
                    "-moz-transform": r,
                    "-webkit-transform": r,
                    "-o-transform": r,
                    "-ms-transform": r
                });
            });
        }
    }
});



// SERVICES

holsteinModule.factory("Compare", [function() {

			var service = {}

			service.objEquiv = function(a, b) {

				var aProps = Object.getOwnPropertyNames(a);
				var bProps = Object.getOwnPropertyNames(b);

				if (aProps.length != bProps.length) {
					return false;
				}

				for (var i = 0; i < aProps.length; i++) {
					var propName = aProps[i];
					if (a[propName] !== b[propName]) {
						return false;
					}
				}

				return true;
			}

			return service;

		}]);


holsteinModule.factory('ArraySvce',['$rootScope',function($rootScope) {

			var service = {};

			service.arrIndexOf = function(myArray, searchTerm, property) {
				for(var i = 0, len = myArray.length; i < len; i++) {
					if (myArray[i][property] === searchTerm) return i;
				}
				return -1;
			}

			service.copyObj = function(obj) {
				var data = {};
				for(x in obj) {
						data[x] = obj[x];
					}
				return data;
			}

			return service;

		}]);

holsteinModule.factory('DataObj',['$rootScope',function($rootScope) {

			var service = {};

			service.xsliderDefaults = function() {

						this.id = 'slider';
						this.showMarkers = true;
						this.markerMin = true;
						this.showEndKeys = true;
						this.showCounter = false;
						this.handleColor = '#B9B2AC';
						this.handleInnerColor = '#6D9473';
						this.lineColor = '#3F546A';
						this.widthPercent = 100;
						this.justification = 'right';
						this.steps = 3;
						this.keyColor = '#788694';
						this.keySize = '1.2em';
						this.keyVoffset = '-1.2em';
						this.keyNames = null;
						this.minOffset = 8;
						this.maxOffset = 26;

			}

			service.sliderDefaults = function() {

				return {
						id: 'slider',
						showMarkers: true,
						markerMin: true,
					  showEndKeys: true,
						showCounter: false,
						handleColor: '#B9B2AC',
						handleInnerColor: '#6D9473',
						lineColor: '#3F546A',
						widthPercent: 100,
						justification: 'right',
						steps: 3,
						keyColor: '#788694',
						keySize: '1.2em',
						keyVoffset: '-1.2em',
					  keyNames: null,
						maxOffset: 24,
						minOffset: 8
					}

			}

			service.sliderState = function() {

				return {
					 id: 0,
					 width: 0,
					 range: 0,
					 curPos: 8,
					 curPercent: 0,
				 	 nearKey: 0,
					 mouseDown: false
				 }

			}

			return service;

		}]);


holsteinModule.value('jwt',{id:'',token:'AIzaSyCT_mh8hi99Zyn6yMuCtUIEmajHRdpFCmo'});
