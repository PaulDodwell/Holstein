// JavaScript Document

var holsteinModule = angular.module('holsteinModule',['ngRoute','ngDialog','ngAnimate','ui.bootstrap']);


holsteinModule.config(function($routeProvider) {

			$routeProvider
				  .when("/", {
						templateUrl : "views/home.html"
				  })
					.when("/home", {
						templateUrl : "views/home.html",
						controller : "homeCtrl"
				  })
				  .when("/guide/:data", {
						templateUrl : "views/guide.html",
						controller : "guideCtrl"
				  })
				  .when("/ideal_cow/:data", {
						templateUrl : "views/ideal_cow.html",
						controller : "idealCtrl"
				  })
				  .when("/traits/:data", {
						templateUrl : "views/traits.html",
						controller : "traitsCtrl"
				  })
					.when("/traits/:data/:trait", {
					 templateUrl : "views/trait.html",
					 controller : "traitsCtrl"
				 })
					.when("/locomotion", {
						templateUrl : "views/locomotion.html",

				  })
				  .when("/settings", {
						templateUrl : "views/settings.html"
				  });

});


holsteinModule.run(['$rootScope','$location','$routeParams', function($rootScope, $location, $routeParams) {

		$rootScope.dialog = null;
		$rootScope.curIdx = 0;
		$rootScope.navActive = $location.path();
		//console.log('Current route name: ' + $location.path());
		$rootScope.menuState = {
			inner: 'main',
			outer: 'main',
		}

		$rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
		  console.log('Current route name: ' + $location.path() + JSON.stringify(current));
		  $rootScope.navActive = $location.path();
		  // Get all URL parameter
		  //console.log($routeParams);
		});

}]);






//Controllers

holsteinModule.controller('navCtrl',['$scope','$rootScope','$location','$routeParams',function ($scope, $rootScope, $location, $routeParams) {
	$scope.isNavCollapsed = true;
	$scope.isCollapsed = false;
	$scope.isCollapsedHorizontal = false;

	$scope.goLoc = function(view,data) {
		var path = view + "/" + data;
		alert(path);
		$location.path(path);
	}
}]);

holsteinModule.controller('homeCtrl',['$scope','$rootScope','$routeParams',function ($scope, $rootScope, $routeParams) {
	$scope.viewData = $routeParams.data;
	$rootScope.menuState = {
		inner: 'main',
		outer: 'main'
	}
}]);

holsteinModule.controller('guideCtrl',['$scope','$rootScope','$routeParams',function ($scope, $rootScope, $routeParams) {
	$scope.viewData = $routeParams.data;
}]);

holsteinModule.controller('idealCtrl',['$scope','$rootScope','$routeParams',function ($scope, $rootScope, $routeParams) {
	$scope.viewData = $routeParams.data;
}]);

holsteinModule.controller('traitsCtrl',['$scope','$rootScope','$routeParams','$location','ArraySvce',function ($scope, $rootScope, $routeParams, $location, arraySvce) {
	$scope.viewData = $routeParams.data;
	$scope.tritems = [];
	for(var i = 0;i<$scope.navMenus.traits.length;i++) {
		if($scope.navMenus.traits[i].target.data == $scope.viewData) {
			$scope.tritems = $scope.navMenus.traits[i].items;
			$scope.viewData = $scope.navMenus.traits[i].title;
			$scope.targetData = $scope.navMenus.traits[i].target.data
		}
	};

	$scope.currState = {
		selected: (typeof $routeParams.trait !== 'undefined') && $routeParams.trait ? $routeParams.trait : null,
		item: (typeof $routeParams.trait !== 'undefined') && $routeParams.trait ? $scope.tritems[arraySvce.arrIndexOf($scope.tritems,$routeParams.trait,'title')] : null
	};

	$scope.$watch('currState.selected',function(val) {
		if(val) {
			var i = arraySvce.arrIndexOf($scope.tritems,val,'title');
			$scope.currState.item = $scope.tritems[i];
			$location.path('/traits/'+$scope.targetData+"/"+$scope.currState.item.title);
		}
	});

}]);

holsteinModule.controller('locomotionCtrl',['$scope','$rootScope','$routeParams',function ($scope, $rootScope, $routeParams) {
	$scope.viewData = $routeParams.data;
}]);

holsteinModule.controller('mainCtrl',['$scope','$rootScope','$window','$http','$interval','$location','Compare','ngDialog','ArraySvce','DataObj',mainCtrl]);

	function mainCtrl($scope,$rootScope,$window,$http,$interval,$location,compare,ngDialog,arraySvce,dataObj  ) {

		angular.element($window).bind('resize', function(){
        	$scope.$digest();
        });

		$scope.winSize = {
			w: $window.innerWidth,
			h: $window.innerHeight
		};

		angular.element($window).bind('resize', function () {
			$scope.winSize = {
				w: $window.innerWidth,
				h: $window.innerHeight
			};
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

			//$scope.navItems = dataObj.getDefault('navItems');
			$scope.navOpts = dataObj.getDefault('navOpts');
			$scope.navOptsOuter = dataObj.getDefault('navOptsOuter');
			$scope.navMenus = dataObj.getDefault('navMenus');
			$rootScope.menuState = {
				inner: 'main',
				outer: 'main'
			}
			$scope.backMenuTxt =  '< Back to Menu';


		//INITIALISE APP

		$scope.$watch('menuState',function(val) {
			console.log("Main Controller: "+val.inner);
		},true)

		$scope.initApp = function() {
		//Auth checks complete so start the compass and get device data
			console.log('INIT APP');
			$scope.status.init = true;
		}

		$scope.toggleRotate = function() {
			$scope.navOpts.rotate = !$scope.navOpts.rotate;
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

	holsteinModule.controller('sliderCtrl',['$scope','$rootScope','$window','$interval','Compare','ngDialog','ArraySvce','DataObj',sliderCtrl]);

  	function sliderCtrl($scope,$rootScope,$window,$interval,compare,ngDialog,arraySvce,dataObj  ) {

			$scope.keyNames =  [{'pos':0,'key':'1'},{'pos':17,'key':'2'},{'pos':33,'key':'3'},{'pos':50,'key':'4'},{'pos':67,'key':'5'},{'pos':83,'key':'6'},{'pos':100,'key':'7'}];

			$scope.sliderArgs = [];
			$scope.sliderState = [];

			$scope.sliderArgs.push(JSON.parse(JSON.stringify(dataObj.sliderDefaults())));
			$scope.sliderState.push(JSON.parse(JSON.stringify(dataObj.sliderState())));
			$scope.sliderArgs[0].keyNames = $scope.keyNames;
			$scope.sliderState[0].curPos = $scope.sliderArgs[0].minOffset;

			$scope.sliderArgs.push(JSON.parse(JSON.stringify(dataObj.sliderDefaults())));
			$scope.sliderState.push(JSON.parse(JSON.stringify(dataObj.sliderState())));
			$scope.sliderArgs[1].id = 'bare_slider';
			$scope.sliderArgs[1].showCurPercent = true;
			$scope.sliderArgs[1].showNearKeyLabel = false;
			$scope.sliderArgs[1].keyNames =null;
			$scope.sliderState[1].curPos = $scope.sliderArgs[0].minOffset;

	}

//DIRECTIVES

holsteinModule.directive('circleNav', ['$window','$rootScope','$location','ArraySvce','SnapUtil', function($window, $rootScope, $location, arraySvce, snapUtil) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				args: '=',
				menus: '=',
				startMenu: '=',
				menuState: '=',
				currNavContent: '=',
				sliderState: '='
			},
			template: '<svg style="position:absolute;top:0;left:0;width:100%;height:400px;background:none;pointer-events:none;" viewbox="{{viewBoxSize}}"></svg>',
			controller: function($scope, $element) {

				//$scope.items = $scope.menus[$scope.startMenu];

					$scope.navItems = [];
					$scope.segs = [];
					$scope.segLines = [];
					$scope.titles = [];
					$scope.titleCenters = [];
					$scope.currNavText = '';
					$scope.currWheelRotate = 0;

					$scope.viewBoxSize = (typeof $scope.args.viewBoxSize != "undefined" && $scope.args.viewBoxSize) ? $scope.args.viewBoxSize : '0 0 400 400';

					$scope.getElementDimensions = function () {
						return { 'h': $element.parent()[0].offsetHeight, 'w': $element.parent()[0].offsetWidth };
					};

					var box =  $scope.getElementDimensions();

					$scope.navCenter = 	{
						x: 400,
						y: 400
					}

					var angle = 0, deltaAngle = 0;

					//

					var drawCenterCircle = function() {

						$scope.centerCircle = $scope.s.circle($scope.navCenter.x, $scope.navCenter.y, $scope.args.innerCircleR);
						$scope.centerCircle.attr({
								fill: $scope.args.fill,
								stroke: $scope.args.stroke,
								strokeWidth: $scope.args.strokeWidth
						});

						$scope.centerCircle.mousedown(function() {
							this.attr({stroke:'#00C'});
							this.animate({ transform: 'S1.4' }, 600, mina.bounce );
						});

						$scope.centerCircle.mouseup(function() {
							this.attr({stroke:$scope.args.stroke});
							this.animate({ transform: 'S1' }, 600, mina.bounce );
						});

						$scope.navWheel.add($scope.centerCircle);

					}

					var drawCenterImg = function() {
							var imgW = Math.round($scope.args.innerCircleR*2.666);
							var imgH = Math.round($scope.args.innerCircleR*2);
							var imgX = Math.round($scope.navCenter.x - ($scope.args.innerCircleR + (imgW-imgH)/2));
							var imgY =Math.round($scope.navCenter.y - $scope.args.innerCircleR);
							$scope.centerImg = $scope.s.image($scope.args.defaultCenterImg, imgX, imgY, imgW, imgH);
							$scope.navWheel.add($scope.centerImg);
					}

					var drawSlice = function(idx,color,angle, innerR, outerR, items) {
						$scope.drawSliceBorder(idx, angle, '#fff');
						$scope.drawSliceBG(idx, color, '#fff', angle, innerR, outerR, true, items);
					}

					$scope.drawSliceBorder = function(idx, angle, color) {
						var innerR = $scope.args.innerCircleR,
								outerR = $scope.args.outerCircleR - 2,
								startX = $scope.navCenter.x + Math.cos(angle) * innerR,
								startY = $scope.navCenter.y + Math.sin(angle) * innerR,
								endX = $scope.navCenter.x + Math.cos(angle) * outerR,
								endY = $scope.navCenter.y + Math.sin(angle) * outerR;

						$scope.segLines[idx] = $scope.s.line(startX, startY, endX, endY).attr({
								stroke: color,
								strokeWidth: $scope.args.segStrokeWidth
						});
					}

					var drawDonutMask = function() {

						var args = {
							center: {
								x: $scope.navCenter.x,
								y: $scope.navCenter.y
							},
							angle: -Math.PI,
							deltaAngle: Math.PI*1.9999,
							innerR: $scope.args.innerCircleR,
							outerR: $scope.args.outerCircleR,
							largeArc: true
						}

						activeSlicePath = snapUtil.calcSegPath(args);

						$scope.donutMask = $scope.s.path(activeSlicePath).attr({
								id: 'donut',
								class: 'donut_mask',
								stroke: '#fff',
								strokeWidth: 2,
								fill: '#fff'
						});

						$scope.navWheel.add($scope.donutMask);
					}

					$scope.drawSliceBG = function(idx, color, border, angle, innerR, outerR, isSeg, items) {

						var segArgs = {
							center: {
								x: $scope.navCenter.x,
								y: $scope.navCenter.y
							},
							angle: angle,
							deltaAngle: deltaAngle,
							innerR: innerR,
							outerR: outerR,
							largeArc: false
						}

						activeSlicePath = snapUtil.calcSegPath(segArgs);

							var seg = $scope.s.path(activeSlicePath).attr({
									id: idx,
									class: 'active-slice-background' + (idx === $scope.args.activeSliceIdx ? ' active nav_seg' : ' nav_seg'),
									stroke: border,
									strokeWidth: $scope.args.segStrokeWidth,
									opacity: $scope.args.rotate === true ? 1 : 0,
									fill: color
							})

							seg.animate({opacity: 1},500);

							if(isSeg) {

								$scope.segs[idx] = seg;

								$scope.segs[idx].mousedown(function(e) {
									e.preventDefault();
									if($scope.args.rotate === true) {
										$scope.segSelect(idx,true);
									}
									$scope.doSegTarget(idx);
								});

								$scope.segs[idx].hover(function() {
									//this.attr({opacity:0.8});
								});

								$scope.segs[idx].mouseout(function() {
									//this.attr({opacity:1});
								});

								$scope.drawSegTitle(idx, angle, innerR, outerR, items);

								return false;

							}
							else {
								return seg;
							}

					}


					$scope.drawSegTitle = function(idx, angle, innerR, outerR, items) {
						if($scope.args.mainWheel === true) {
							$scope.drawMainSegTitle(idx, angle, innerR, outerR, items);
						}
						else {
							$scope.drawOuterSegTitle(idx, angle);
						}
					}

					$scope.drawMainSegTitle = function(idx, angle, innerR, outerR, items) {
						var i = arraySvce.arrIndexOf(items,idx,'idx');

						var maxTxtWidth = (outerR - innerR) * 0.3;
						var lines = snapUtil.wrapTxt(items[i].title, maxTxtWidth, {fontSize:'0.9em'});

						var args = {
							center: $scope.navCenter,
							angle: angle,
							deltaAngle: deltaAngle,
							innerR: innerR,
							outerR: outerR
						}

						var titlePos = snapUtil.calcSegTitlePos(args,lines);

						$scope.titles[idx] = $scope.s.text(titlePos.x, titlePos.y, lines);
						$scope.titles[idx].selectAll("tspan:nth-child(n+2)").attr({
							 dy: "1.2em",
							 x: titlePos.x
						});

						var titleColor = (typeof items[i].txtColor !== 'undefined' && items[i].txtColor) ? items[i].txtColor : $scope.args.navTxtTitleColor;
						$scope.titles[idx].attr({
							id: 'title ' + (idx),
							class: 'seg_title',
							stroke: titleColor,
							fill: titleColor,
							fontSize: $scope.args.navTxtTitleSize,
						});

						$scope.titles[idx].mousedown(function(e) {
							e.preventDefault();
							$scope.segSelect(idx,true);
						});
					}

					$scope.drawOuterSegTitle = function(idx, angle) {

							var i = arraySvce.arrIndexOf($scope.items,idx,'idx');
							// prepare text path
							var textPathStartAngle, textPathEndAngle,
									textPathR, sweep;
							var pathOffset = ($scope.args.outerCircleR - $scope.args.innerCircleR) * 0.66;
							textPathR = $scope.args.outerCircleR - pathOffset;
							textPathStartAngle = angle;
							textPathEndAngle = angle + deltaAngle;
							sweep = 1;

							var textPathStartX = $scope.navCenter.x + Math.cos(textPathStartAngle) * textPathR,
									textPathStartY = $scope.navCenter.y + Math.sin(textPathStartAngle) * textPathR,
									textPathEndX = $scope.navCenter.x + Math.cos(textPathEndAngle) * textPathR,
									textPathEndY = $scope.navCenter.y + Math.sin(textPathEndAngle) * textPathR,

									textPath = 'M' + textPathStartX + ',' + textPathStartY + // move to starting point
									'A' + textPathR + ',' + textPathR + ' ' + // draw arc with radius x, radius y
									'0' + ' ' + // x-axis rotation
									'0,' + sweep + '0' + // large-arc flag, sweep flag
									textPathEndX + ',' + textPathEndY;

							$scope.drawText($scope.items[i].title, textPath, textPathR, idx);
					}

					$scope.drawText = function(text, textPath, textPathR, idx) {

						var tw = snapUtil.calcTxtWidth($scope.items[idx].title, {fontSize:$scope.args.navTxtTitleSize});
						var arc = textPathR * deltaAngle;
						console.log('title width: '+tw+' Path length: '+ arc);

						var center = {
												x: (textPathR*deltaAngle+tw) * 0.46,
												y: '0'
										};

						/*
						$scope.s.path(textPath).attr({
									id: idx,
									class: ' outer_nav_title_path',
									stroke: '#808080',
									strokeWidth: 4,
									fill: 'none'
						})
						*/
						var titleColor = (typeof $scope.items[idx].txtColor !== 'undefined' && $scope.items[idx].txtColor) ? $scope.items[idx].txtColor : $scope.args.navTxtTitleColor;
						$scope.titles[idx] = $scope.s.text(center.x, center.y, text);
						$scope.titles[idx].attr({
								 textpath: textPath,
								 textAnchor: 'end',
								 id: 'title' + idx,
								 class: 'outer_seg_title',
								 fontSize: $scope.args.navTxtTitleSize,
								 stroke: titleColor,
								 fill: titleColor
						 });
						 $scope.titles[idx].animate({
								 startOffset: '50%'
						 },5000);
							console.log($scope.titles[idx].node.innerHTML + " " + $scope.titles[idx].attr('textpath') + " " + center.x + " " + center.y + " " + idx);
					}

					$scope.setActiveContent = function(idx,apply) {
						var i = arraySvce.arrIndexOf($scope.items,$scope.segs[idx].attr('id'),'idx');
						if(i > -1) {

							if(apply) {
								$scope.$apply(function(idx) {
									$scope.currNavContent = $scope.items[i].content;
									$scope.args.activeSliceIdx = idx;
								});
							}
							else {
								$scope.currNavContent = $scope.items[i].content;
								$scope.args.activeSliceIdx = idx;
							}
						}
					}

					$scope.segSelect = function(idx,apply) {
						if($scope.args.mainWheel === true) {
							$scope.mainSegSelect(idx,apply);
						}
						else {
							$scope.outerSegSelect(idx,apply);
						}
					}

					$scope.outerSegSelect = function(idx,apply) {
						if(typeof $scope.segs[idx] !== 'undefined') {

								$scope.setActiveContent(idx,apply);

								if($scope.args.rotate === true) {
									//var rSegs = $scope.currWheelRotate != 0 ? -(idx - 1 + ($scope.currWheelRotate % ($scope.segs.length-1))) : -(idx-1);
									var rSegs = $scope.currWheelRotate != 0 ? -(idx + ($scope.currWheelRotate % ($scope.segs.length))) : -(idx);
									$scope.wheelTurn(rSegs);
								}

						}
					}

					$scope.mainSegSelect = function(idx,apply) {
						if(typeof $scope.segs[idx] !== 'undefined') {
							var i = arraySvce.arrIndexOf($scope.items,$scope.segs[idx].attr('id'),'idx');
							if(i > -1) {
								var cr = $scope.centerCircle.attr('r');
								var gradStr = "r(0.4,0.4,0.4)#eee-"+$scope.items[i].color;
								var centerFill = $scope.s.gradient(gradStr);

								if(typeof $scope.items[i].img !== 'undefined' && $scope.items[i].img) {
									$scope.centerCircle.attr({fill:$scope.items[i].color,opacity:1});
									$scope.centerImg.attr({'xlink:href': $scope.items[i].img});
									$scope.centerCircle.animate({opacity:0},1000);
								}
								else {
									$scope.centerCircle.animate({fill:$scope.items[i].color,opacity:1},600);
								}

								if(apply) {
									$scope.$apply(function(idx) {
										$scope.currNavContent = $scope.items[i].content;
										$scope.args.activeSliceIdx = idx;
									});
								}
								else {
									$scope.currNavContent = $scope.items[i].content;
									$scope.args.activeSliceIdx = idx;
								}

								if($scope.args.rotate === true) {
									var rSegs = $scope.currWheelRotate != 0 ? -(idx + ($scope.currWheelRotate % ($scope.segs.length))) : -(idx);
									//alert(idx+" "+rSegs);
									$scope.wheelTurn(rSegs);
								}

							}
						}
					}

					$scope.wheelTurn = function(segs) {

						$scope.currWheelRotate += segs;
						var rAngle = $scope.currWheelRotate  * snapUtil.radToDeg(deltaAngle);
						var rotateStr = "r"+rAngle+","+$scope.navCenter.x+","+$scope.navCenter.y;

						$scope.allSegs.animate({transform: rotateStr},
							600,
							mina.easeInOutQuad);

						if($scope.args.mainWheel === true) {
							for(i=0;i<$scope.titles.length;i++) {
								var rStr = "r"+(rAngle*-1)
								$scope.titles[i].animate({transform: rStr},
										600,
										mina.linear);
							}
						}

					}

					$scope.drawNav = function() {

						$scope.items = $scope.args.mainWheel === true ? $scope.menus[$rootScope.menuState.inner] : $scope.menus[$rootScope.menuState.outer];

						deltaAngle = 2 * Math.PI / $scope.items.length;
						angle = $scope.args.startAngle;
						if(typeof $scope.s !== 'undefined') {
							//$scope.s.remove();
						}
						$scope.s = Snap($element[0]);
						$scope.navWheel = $scope.s.group();

						if(typeof $scope.args.mainWheel == 'undefined' || $scope.args.mainWheel === true) {
						  drawCenterCircle();
							drawDonutMask();
							drawCenterImg();
						}

						if($scope.args.rotate === true && $scope.args.showSelectMarker === true) {
							var borderColor = 'orange';
							$scope.drawSliceBorder($scope.items.length + 1, angle, borderColor);
							$scope.drawSliceBorder($scope.items.length + 2, angle + deltaAngle, borderColor);
							$scope.drawSliceBG(1, borderColor, borderColor, angle, $scope.args.outerCircleR - 4, $scope.args.outerCircleR - 4, false, $scope.items);
							$scope.drawSliceBG(1, borderColor, borderColor, angle, $scope.args.innerCircleR + 6, $scope.args.innerCircleR + 6, false, $scope.items);
						}

						$scope.allSegs = $scope.s.group();
						for (var i = 0; i < $scope.items.length; i++) {

								var idx = $scope.items[i].idx

								drawSlice(idx, $scope.items[i].color, angle, $scope.args.innerCircleR, $scope.args.outerCircleR, $scope.items);
								$scope.navItems[idx] = $scope.s.group();
								$scope.navItems[idx].add($scope.segs[idx],$scope.segLines[idx],$scope.titles[idx]);
								$scope.allSegs.add($scope.navItems[idx]);

								angle += deltaAngle;
						}

						$scope.navWheel.add($scope.allSegs);
					}

					$scope.$watch('menuState',function(val) {
						$scope.drawNav();
					},true);

					$scope.doSegTarget = function(idx) {

						var target = $scope.items[idx].target;

						switch(target.type) {
								case "menu":

										$rootScope.menuState.inner = $scope.items[idx].target.innerMenu;
										$rootScope.menuState.outer = $scope.items[idx].target.outerMenu;
										break;
								case "view":
										var path = target.view + "/" + target.data;
										//alert(path);
										$location.path(path);
										break;
								case "url":
										alert("go to url: "+target.data);
										break;
								default:
										$rootScope.menuState.inner = 'main';
										$rootScope.menuState.outer = 'main';
										$scope.drawNav();
						}
						$scope.$apply(function() {});
					}

					$scope.$watch('sliderState',function(val) {
					//	$scope.segSelect(val.nearKeyLabel,false);
					},true)

					//Initialise Wheel
					$scope.drawNav();

				}
		}

	}]);




holsteinModule.directive('sliderCtrl',['$rootScope','$window','$location','$document','ngDialog',function($rootScope,$window,$location,$document,ngDialog) {

			return {
				restrict: 'E',
				scope: {
					options: '=',
					curState: '='
				},
				templateUrl: 'html/slider_holstein.html',
				link: function (scope, element, attributes) {
		    	element.addClass('slider_container');
		    },
				controller: function($scope,$element) {

					$scope.handle = {};
					$scope.markers = [];
					$scope.keyMarkers = [];
					$scope.winSize = {};

					$scope.winSize.w = $window.innerWidth;
					angular.element($window).bind('resize', function () {
						 $scope.winSize.w = $window.innerWidth;
					});

					$scope.track = {
						startX: 0,
						startY: 0,
						x: 0,
						y: 0
					}
					//startX = 0, startY = 0, x = 0, y = 0;


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

					$element.on('click', function(event) {
						event.preventDefault();
						event.stopPropagation();
						$scope.track.x = event.pageX - $scope.track.startX;
						$scope.curState.mouseDown = false;
						var pos = $scope.xLeft($scope.track.x);
							$scope.$apply(function() {
								$scope.curState.curPos = pos;
								$scope.curState.curPercent = $scope.posPcent(pos);
							});
						if($scope.keyMarkers.length == 0 && $scope.options.steps == 0) {
							$scope.setHandle($scope.track.x);
						}
						else {
							$scope.snapCall();
						}
					});

					$scope.doMarkers();

				}//end Controller

			};//end return function

		}]);

		holsteinModule.directive('dragHandle', ['$document','ArraySvce', function($document,arraySvce) {
			return {
				restrict: 'A',
				require: '^sliderCtrl',
				link: function($scope,$element,$attrs,$ctrl) {
						//remove link if not needed
				},
				controller: function($scope,$element) {

					//var startX = 0, startY = 0, x = 0, y = 0;

					$scope.handle = $element;

					$element.css({
					 left: $scope.options.minOffset + 'px',
					 position: 'relative',
					 cursor: 'pointer'
					});

					$element.on('mousedown', function(event) {
						event.preventDefault();
						event.stopPropagation();
						$scope.track.startX = event.pageX - $scope.curState.curPos;
						$document.on('mousemove', mousemove);
						$document.on('mouseup', mouseup);
						$scope.curState.mouseDown = true;
						$scope.setHandle($scope.track.x);
					});

					function mousemove(event) {
						//y = event.pageY - startY;
						$scope.track.x = event.pageX - $scope.track.startX;

						$scope.setHandle($scope.track.x);

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
						//console.log($scope.curState.curPos);
				    return $element.css('left');
				  };

					$scope.$watch($scope.getElementX, function (newValue, oldValue) {
						 //console.log(newValue+" "+$scope.curState.curPos);
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

				 $scope.snapCall = function() {
					 $scope.snapToMark();
				 }

				 $scope.snapToMark = function() {
							var p = $scope.rounder($scope.curState.curPercent,100/$scope.options.steps);
							$scope.curState.nearKey = p;
							$scope.$apply(function() {
								$scope.track.x = $scope.curState.curPos = $scope.pcentPos(p);
								$scope.curState.curPercent = p;
								$scope.curState.nearKeyLabel = $scope.getKeyLabel(p);
							});
							$element.css({'left':$scope.curState.curPos + 'px'});
							$scope.focusKey = ("#sk_" + $scope.options.id) + p;

							return false;
					}

					$scope.getKeyLabel = function(p) {
						if($scope.keyMarkers.length > 0) {
							var idx = arraySvce.arrIndexOf($scope.keyMarkers,p,'pos');
							var key = $scope.keyMarkers[idx].key;
							return key;
						}
						else {
							return false;
						}
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
							$scope.track.x = $scope.xLeft($scope.pcentPos($scope.curState.curPercent));
							var pos = $scope.track.x;
							$element.css({
								 left:  pos + 'px'
							 });
							 $scope.curState.curPos = pos;


					}, true);

					//$scope.snapToMark();

				}
			};
		}]);



holsteinModule.directive('keyEnter', [function () {
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
}]);


holsteinModule.directive('rotate', [function () {
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
}]);

holsteinModule.directive('traitThumb', [function () {
    return {
        restrict: 'E',
				scope: {
					args: '=',
					selected: '='
				},
        templateUrl: 'html/trait_thumb.html',
				controller: function($scope, $element) {
					//console.log(JSON.stringify($scope.args));

					$scope.traitSelect = function() {
						$scope.selected = $scope.args.title;
					}
				}
    }
}]);

holsteinModule.directive('traitFull', [function () {
    return {
        restrict: 'E',
				scope: {
					args: '='
				},
        templateUrl: 'html/trait_full.html',
				controller: function($scope, $element) {

				}
    }
}]);

holsteinModule.directive('backToMenu', [function () {
    return {
        restrict: 'E',
				scope: {
					txt: '='
				},
        template: '<a ng-href="#/">{{txt}}</a>'
    }
}]);

holsteinModule.directive('sideTabs', ['$location', function ($location) {
    return {
        restrict: 'E',
				scope: {
					args: '='
				},
        templateUrl: 'html/side_tabs.html',
				controller: function($scope, $element) {
					//alert(JSON.stringify($scope.args));
					$scope.active = false;

					$scope.doTabs = function(target) {
						if($scope.active === true) {
							$scope.goTarget(target);
						}
						else {
							$scope.active = true;
						}
					}

					$scope.goTarget = function(target) {
						$scope.active = false;
						var path = target.view + "/" + target.data;
						$location.path(path);
					}

				}
    }
}]);

holsteinModule.directive('bsNavDropdown', [function () {
    return {
        restrict: 'E',
				replace: true,
				scope: {
					args: '='
				},
        templateUrl: 'html/nav_dropdown.html',
				controller: function($scope, $element) {
					//alert('dropdown data: ' + JSON.stringify($scope.args));

					$scope.targetHref = function(target) {
						var path = "#!" + target.view + "/" + target.data;
						return path;
					}

				}
    }
}]);

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
					if (myArray[i][property] == searchTerm) return i;
				}
				return -1;
			}

			service.arrIndexOfTyped = function(myArray, searchTerm, property) {
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

holsteinModule.factory('SnapUtil',['$rootScope',function($rootScope) {

	var service = {};

	service.radToDeg = function(rad) {
		return 180*rad/Math.PI;
	}

	service.showBBox = function(el,snapEl){
		var bb  = el.getBBox();
		var box = snapEl.rect(bb.x,bb.y,bb.width,bb.height);
		box.attr({stroke: '#f00',strokeWidth: 1,fill: 'none'});
	}

	service.calcSegTitlePos = function(args,lines) {

		var center = {
						x: args.center.x + Math.cos(args.angle + args.deltaAngle/2) * args.outerR * 0.666,
						y: args.center.y + Math.sin(args.angle + args.deltaAngle/2) * args.outerR * 0.666
				};
		//use temp svg object to calculate bounding box
		var svg = Snap();
		var ttlTmp = svg.text(-300, -300, lines);
		ttlTmp.selectAll("tspan:nth-child(n+2)").attr({ dy: "1.2em", x: -300 });
		var bb = ttlTmp.getBBox();
		svg.remove();

		return {
			x: center.x - bb.width/1.5,
			y: center.y - (lines.length > 1 ? bb.height/5 : bb.height/2)
		}
	}

	service.wrapTxt = function (txt, max_width, attributes) {

			 var svg = Snap();
			 var abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
			 var temp = svg.text(0, 0, abc);
			 temp.attr(attributes);
			 var letter_width = temp.getBBox().width / abc.length;
			 svg.remove();

			 var words = txt.split(" ");
			 var width_so_far = 0, current_line=0, lines=[''];
			 for (var i = 0; i < words.length; i++) {

					var l = words[i].length;
					if (width_so_far + (l * letter_width) > max_width) {
						 lines.push('');
						 current_line++;
						 width_so_far = 0;
					}
					width_so_far += l * letter_width;
					lines[current_line] += words[i] + " ";
			 }

			 return lines;
		};

	service.calcTxtWidth = function(txt,attributes) {

		var svg = Snap();
		var abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var temp = svg.text(0, 0, abc);
		temp.attr(attributes);
		var letterWidth = temp.getBBox().width / abc.length;
		svg.remove();

		return txt.length * letterWidth;
	}

	service.calcSegPath = function(args) {

		var p1 = {
						x: args.center.x + Math.cos(args.angle) * args.innerR,
						y: args.center.y + Math.sin(args.angle) * args.innerR
				},

				p2 = {
						x: args.center.x + Math.cos(args.angle) * args.outerR,
						y: args.center.y + Math.sin(args.angle) * args.outerR
				},

				p3 = {
						x: args.center.x + Math.cos(args.angle + args.deltaAngle) * args.outerR,
						y: args.center.y + Math.sin(args.angle + args.deltaAngle) * args.outerR
				},

				p4 = {
						x: args.center.x + Math.cos(args.angle + args.deltaAngle) * args.innerR,
						y: args.center.y + Math.sin(args.angle + args.deltaAngle) * args.innerR
				},

				larc = args.largeArc == true ? '1' : '0',

				activeSlicePath = 'M' + p1.x + ',' + p1.y + ' ' + // move to p1
				'L' + p2.x + ',' + p2.y + ' ' + // line to p2
				'A' + args.outerR + ',' + args.outerR + ' ' + // Arc rx,ry
				'0' + ' ' + // x-axis-rotation: no
				larc + ',' + // large-arc-flag: no
				'1' + ' ' + // sweep-flag: no
				p3.x + ',' + p3.y + ' ' + // Arc ending point
				'L' + p4.x + ',' + p4.y + ' ' + // line to p4
				'A' + args.innerR + ',' + args.innerR + ' ' + // rx, ry
				'0' + ' ' + // x-axis-rotation: no
				larc + ',' + // large-arc: no
				'0' + ' ' + //sweep: yes
				p1.x + ',' + p1.y;

				return activeSlicePath;

	}

	return service;

}]);

holsteinModule.factory('DataObj',['$rootScope',function($rootScope) {

			var service = {};

			service.sliderDefaults = function() {

				return {
						id: 'slider',
						showMarkers: true,
						markerMin: true,
					  showEndKeys: true,
						showCounter: false,
						showNearKeyLabel: true,
						showCurPercent: false,
						handleColor: '#323854',
						handleInnerColor: '#fff',
						lineColor: '#85807A',
						progressColor: '#323854',
						lineBorder: '#333',
						markerBgColor: '#fff',
						widthPercent: 100,
						justification: 'right',
						steps: 0,
						keyColor: '#788694',
						keySize: '1.2em',
						keyVoffset: '1.6em',
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
					 nearKeyLabel: 0,
					 mouseDown: false
				 }

			}

			service.getDefault = function(data) {
				console.log(window[data]);
				return JSON.parse(JSON.stringify(window[data]));

			}

			return service;

		}]);


holsteinModule.value('jwt',{id:'',token:'AIzaSyCT_mh8hi99Zyn6yMuCtUIEmajHRdpFCmo'});
