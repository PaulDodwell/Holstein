// JavaScript Document

var holsteinModule = angular.module('holsteinModule',['ngRoute','ngDialog','ngAnimate','ngSanitize','ui.bootstrap','threeViewer.services','threeViewer.controllers','threeViewer.directives','hmTouchEvents']);


holsteinModule.config(function($routeProvider) {

			$routeProvider
				  .when("/", {
						templateUrl : "views/menu.html",
						controller : "menuCtrl"
				  })
					.when("/menu/:data", {
						templateUrl : "views/menu.html",
						controller : "menuCtrl"
				  })
				  .when("/guide", {
						templateUrl : "views/guide.html",
						controller : "guideCtrl"
				  })
				  .when("/ideal-cow", {
						templateUrl : "views/ideal-cow.html",
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
						controller : "locomotionCtrl"

				  })
				  .when("/contacts", {
						templateUrl : "views/contacts.html"
				  })
					.when("/help", {
						templateUrl : "views/help.html"
				  });

});


holsteinModule.run(['$rootScope','$location','$routeParams', function($rootScope, $location, $routeParams) {

		$rootScope.sitePath = window.location.host + window.location.pathname;

		$rootScope.dialog = null;
		$rootScope.curIdx = 0;
		$rootScope.navActive = $location.path();

		$rootScope.menuState = {
			inner: 'main',
			outer: 'main'
		}

		$rootScope.load3D = {
			status: null,
			items: null
		}

		$rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
		  console.log('Current route name: ' + $location.path());
		  $rootScope.navActive = $location.path();
		});

}]);



//Controllers

holsteinModule.controller('mainCtrl',['$scope','$rootScope','$window','$document','$http','$location','Compare','ngDialog','ArraySvce','DataObj',mainCtrl]);

	function mainCtrl($scope,$rootScope,$window,$document,$http,$location,compare,ngDialog,arraySvce,dataObj  ) {

		$scope.winSize = {
			w: $window.innerWidth,
			h: $window.innerHeight
		};

		var getViewBounds = function() {
			$scope.viewPortHeight = Math.max($document[0].documentElement.clientHeight, $window.innerHeight || 0);
			$scope.bodyBounds = $document[0].body.getBoundingClientRect();
		  $scope.stickyFooter = ($scope.viewPortHeight > $scope.bodyBounds.height) ? true :false;
			console.log($scope.bodyBounds.height+" "+$scope.viewPortHeight+" "+$scope.stickyFooter);
			return false;
		}

		angular.element($window).bind('resize', function () {
			$scope.winSize = {
				w: $window.innerWidth,
				h: $window.innerHeight
			};
			getViewBounds();
			$scope.$apply();
		});

		angular.element($window).bind('scroll', function () {
			getViewBounds();
			$scope.$apply();
		});

		getViewBounds();

		$scope.onExit = function() {
			//
		};

   	$window.onbeforeunload =  $scope.onExit;

		//Initialise scope vars

		$scope.goBack = function() {
			$window.history.back();
		}

		$scope.sideBars = {
			show: true,
			active: false
		};

		$scope.status = {
			msg: "Holstein app is running",
			init: false
		};

		$scope.getColorName = function(palette,color) {
				var idx = arraySvce.arrIndexOf($scope.palettes[palette].colors,color,'code');
				return $scope.palettes[palette].colors[idx].title;
		};

			//$scope.navItems = dataObj.getDefault('navItems');
			$scope.navOpts = dataObj.getDefault('navOpts');
			$scope.navOptsOuter = dataObj.getDefault('navOptsOuter');
			$scope.navMenus = dataObj.getDefault('navMenus');
			$scope.contacts = dataObj.getDefault('contacts');
			$scope.cow3D = dataObj.getDefault('ideal_cow');
			$scope.helpText =  dataObj.getDefault('help_text');
			$rootScope.menuState = {
				inner: 'main',
				outer: 'main'
			}
			$scope.parentMenu = 'main';
			$scope.backMenuTxt =  '< Back to Menu';


		//INITIALISE APP

		$scope.$watch('menuState',function(val) {
			$scope.parentMenu = $scope.navMenus[val.inner].parent ? $scope.navMenus[val.inner].parent : 'main';
			getViewBounds();
		},true);

		$scope.initApp = function() {
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

	}// end mainCtrl


holsteinModule.controller('navCtrl',['$scope','$rootScope','$routeParams','$location',function ($scope, $rootScope, $routeParams, $location) {
	$scope.isNavCollapsed = true;
	$scope.isCollapsed = false;
	$scope.isCollapsedHorizontal = false;

	$scope.$watch("winSize.w", function(val) {
		if($scope.winSize.w > 767) {
			$scope.isNavCollapsed = true;
		}
	})
}]);

holsteinModule.controller('menuCtrl',['$scope','$rootScope','$routeParams','$location',function ($scope, $rootScope, $routeParams, $location) {

	$scope.viewData = $routeParams.data ? $routeParams.data : 'main';

	$scope.goMenu = function(inner,outer) {
		$rootScope.menuState.inner = inner;
		$rootScope.menuState.outer = outer;
	};

	$scope.goMenu($scope.viewData,'main');

}]);

holsteinModule.controller('guideCtrl',['$scope','$rootScope','$routeParams',function ($scope, $rootScope, $routeParams) {
	//
}]);

holsteinModule.controller('idealCtrl',['$scope','$rootScope','$routeParams','$window','$location','PreLoader',function ($scope, $rootScope, $routeParams, $window, $location, preLoader) {

	$scope.sideBars.show = false;

	$scope.toggleRotate = function() {
		$scope.navOpts.rotate = !$scope.navOpts.rotate;
	}

	$scope.resetView = function() {
		$window.location.reload();
	}

	$scope.getHelp = function() {
		$location.path('/help');
	}

	$scope.webgl_detect = function(return_context)	{

		    if (!!window.WebGLRenderingContext) {
		        var canvas = document.createElement("canvas"),
		             names = ["webgl2", "webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
		           context = false;

		        for(var i=0;i< names.length;i++) {
		            try {
		                context = canvas.getContext(names[i]);
		                if (context && typeof context.getParameter == "function") {
		                    // WebGL is enabled
		                    if (return_context) {
		                        // return WebGL object if the function's argument is present
		                        return {name:names[i], gl:context};
		                    }
		                    // else, return just true
		                    return true;
		                }
		            } catch(e) {}
		        }

		        // WebGL is supported, but disabled
		        return false;
		    }

		    // WebGL not supported
		    return false;
		}
		/*
		$scope.imgList = [$scope.cow3D.normal_map];
		preLoader.preloadImages( $scope.imgList );
		*/

}]);

holsteinModule.controller('traitsCtrl',['$scope','$rootScope','$routeParams','$window','ArraySvce',function ($scope, $rootScope, $routeParams, $window, arraySvce) {
	$scope.viewData = $routeParams.data;

	$scope.tritems = [];

	$scope.tritems = $scope.navMenus[$scope.viewData].items;
	$scope.viewData = $scope.navMenus[$scope.viewData].name;
	$scope.targetData = $scope.navMenus[$scope.viewData].name;

	var trTypes = $scope.navMenus['traits'].items;
	var trIdx = 0;
	for(var i=0;i<trTypes.length;i++) {
		if(trTypes[i].target.innerMenu == $scope.viewData) {
			trIdx = i;
		}
	}

	$scope.trType = trTypes[trIdx];

	$scope.currState = {
		selected: (typeof $routeParams.trait !== 'undefined') && $routeParams.trait ? $routeParams.trait : null,
		item: (typeof $routeParams.trait !== 'undefined') && $routeParams.trait ? $scope.tritems[arraySvce.arrIndexOf($scope.tritems,$routeParams.trait,'name')] : null
	};

	$scope.$watch('currState.selected',function(val) {
		if(val) {
			var i = arraySvce.arrIndexOf($scope.tritems,val,'name');
			$scope.currState.item = $scope.tritems[i];
			//$location.path('/traits/'+$scope.targetData+"/"+$scope.currState.item.name);
		}
	});

}]);

holsteinModule.controller('traitCtrl',['$scope','$rootScope','$routeParams','DataObj','PreLoader',function ($scope, $rootScope, $routeParams, dataObj, preLoader) {

	$scope.viewData = $routeParams.data;

	$scope.keyNames =  [{'pos':0,'label':'1'},{'pos':13,'label':'2'},{'pos':25,'label':'3'},{'pos':38,'label':'4'},{'pos':50,'label':'5'},{'pos':63,'label':'6'},{'pos':75,'label':'7'},{'pos':88,'label':'8'},{'pos':100,'label':'9'}];

	$scope.sliderArgs = [];
	$scope.sliderState = [];

	$scope.sliderArgs = JSON.parse(JSON.stringify(dataObj.sliderDefaults()));
	$scope.sliderState = JSON.parse(JSON.stringify(dataObj.sliderState()));
	$scope.sliderArgs.keyNames = $scope.keyNames;
	$scope.sliderState.curPos = $scope.sliderArgs.minOffset;
	$scope.sliderState.nearKey = $scope.currState.item.standard_score ? $scope.currState.item.standard_score : 1;


	$scope.$watch('sliderState',function(val) {
		console.log("Slider State pos:"+val.curPos+" nearKey:"+val.nearKey+" label:"+val.nearKeyLabel);
	},true)

	$scope.show = true;
	$scope.sideBars.show = true;
	$scope.sideBars.active = false;

	var doImgList = function(item) {
		var imgList = [];
		var path = item.img_path + "/";
		for(var i=0;i<$scope.keyNames.length;i++) {
			var img = item.img_path + "/" + item.name + '_0' + (i+1) + '.png';
			imgList.push(img);
		}
		return imgList;
	}

	$scope.imgList = doImgList($scope.currState.item);
	preLoader.preloadImages( $scope.imgList );

}]);

holsteinModule.controller('locomotionCtrl',['$scope','$rootScope','$routeParams','DataObj','ArraySvce',function ($scope, $rootScope, $routeParams, dataObj, arraySvce) {

	$scope.sideBars.show = true;

	var trTypes = $scope.navMenus['traits'].items;
	var trIdx = 0;
	for(var i=0;i<trTypes.length;i++) {
		if(trTypes[i].target.innerMenu == 'feet_legs') {
			trIdx = i;
		}
	}

	$scope.trType = trTypes[trIdx];

	$scope.locomotion = {
		args:$scope.navMenus['locomotion'].items[0]
	}

	$scope.keyNames =  [{'pos':0,'label':'1'},{'pos':50,'label':'5'},{'pos':100,'label':'9'}];

	$scope.sliderArgs = [];
	$scope.sliderState = [];

	$scope.sliderArgs = JSON.parse(JSON.stringify(dataObj.sliderDefaults()));
	$scope.sliderState = JSON.parse(JSON.stringify(dataObj.sliderState()));
	$scope.sliderArgs.keyNames = $scope.keyNames;
	$scope.sliderState.curPos = $scope.sliderArgs.minOffset;

	var i = arraySvce.arrIndexOf($scope.keyNames,$scope.locomotion.args.standard_score,'label') + 1;
	$scope.sliderState.nearKey = i ? i : 1;
	//$scope.sliderState.nearKey = $scope.locomotion.args.standard_score ? $scope.locomotion.args.standard_score : 1;

	$scope.videoSrc = {
		src: 'locomotion_1.mp4',
		src1: 'locomotion_1.mp4',
		src2: 'locomotion_2.mp4',
		src3: 'locomotion_3.mp4'
	}

	$scope.nKey = 3;

	$scope.$watch('sliderState',function(val) {
		console.log("Slider State pos:"+val.curPos+" nearKey:"+val.nearKey+" label:"+val.nearKeyLabel);
		$scope.nKey = parseInt(val.nearKey);
		if($scope.nKey > 2) {
			$scope.videoSrc.src = 'locomotion_3.mp4';
		}
		else if($scope.nKey > 1) {
			$scope.videoSrc.src = 'locomotion_2.mp4';
		}
		else  {
			$scope.videoSrc.src = 'locomotion_1.mp4';
		};
	},true);

}]);


//DIRECTIVES

holsteinModule.directive('circleNav', ['$window','$rootScope','$location','ArraySvce','SnapUtil','ngDialog', function($window, $rootScope, $location, arraySvce, snapUtil, ngDialog) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				args: '=',
				menus: '=',
				sideBars: '=',
				menuState: '=',
				currNavContent: '='
			},
			template: '<svg class="wheel_svg" style="height:{{wheelHeight()}}px;" viewbox="0 0 800 800"></svg>',
			controller: function($scope, $element) {



					$scope.navItems = [];
					$scope.segs = [];
					$scope.segLines = [];
					$scope.legends = [];
					$scope.titles = [];
					$scope.icons = [];
					$scope.titleCenters = [];
					$scope.currNavText = '';
					$scope.currWheelRotate = 0;

					var iconShow = $scope.menus[$rootScope.menuState.inner].icons_show;
					//var parentMenu = $scope.menus[$rootScope.menuState.inner].parent;

					//console.log('circleNav - iconShow: '+iconShow+' menuState: '+$rootScope.menuState.inner);

					var iconAttr = {
						size: 90,
						iconOffsetY: 40,
						iconOffsetX: -50,
						ttlOffsetY: -40,
						ttlOffsetX: -20
					};


					var delay = 20;

					$scope.lastClick = 0;

					$scope.$watch(function() {
						return $scope.lastClick;
					},function(val){
						console.log('lastclick='+val);
					})

					$scope.viewBoxSize = (typeof $scope.args.viewBoxSize != "undefined" && $scope.args.viewBoxSize) ? $scope.args.viewBoxSize : '0 0 400 400';

					$scope.getElementDimensions = function () {
						return { 'h': $element.parent()[0].offsetHeight, 'w': $element.parent()[0].offsetWidth };
					};

					$scope.wheelHeight = function() {
						var h = Math.max($scope.args.minHeight,($scope.getElementDimensions().w * $scope.args.scaleFactor));
						return h;
					}

					var box =  $scope.getElementDimensions();

					$scope.navCenter = 	{
						x: $scope.args.x,
						y: $scope.args.y
					}

					var angle = 0, deltaAngle = 0;



					var drawCenterCircle = function() {

						$scope.centerCircle = $scope.s.circle($scope.navCenter.x, $scope.navCenter.y, $scope.args.innerCircleR);
						$scope.centerCircle.attr({
								fill: $scope.args.fill,
								stroke: $scope.args.stroke,
								strokeWidth: $scope.args.strokeWidth,
								class: 'center_circle'
						});

						$scope.navWheel.add($scope.centerCircle);

					}

					var drawCenterImg = function() {
							var imgW = Math.round($scope.args.innerCircleR*2.666);
							var imgH = Math.round($scope.args.innerCircleR*2);
							var imgX = Math.round($scope.navCenter.x - ($scope.args.innerCircleR + (imgW-imgH)/2));
							var imgY =Math.round($scope.navCenter.y - $scope.args.innerCircleR);
							$scope.centerImg = $scope.s.image($scope.args.defaultCenterImg, imgX, imgY, imgW, imgH);
							$scope.centerImg.attr({
								class: 'center_img'
							});

							$scope.centerImg.mousedown(function(e) {
								e.preventDefault();
								var route = $scope.menus[$rootScope.menuState.inner].parent ? $scope.menus[$rootScope.menuState.inner].parent : 'main'
								var path = "/menu/" + route;
								$location.path(path);
								$scope.$apply(function() {});
							});

							$scope.navWheel.add($scope.centerImg);
					}

					var drawBackArrow = function() {
						var imgW = 80;
						var imgH = 40;
						var imgX = Math.round($scope.navCenter.x - 40);
						var imgY = Math.round($scope.navCenter.y) + 60;

						$scope.backArrow = $scope.s.image($scope.args.backArrowImg, imgX, imgY, imgW, imgH);
						$scope.backArrow.attr({
							class: 'back_arrow'
						});

						$scope.backArrow.mousedown(function(e) {
							e.preventDefault();
							var route = $scope.menus[$rootScope.menuState.inner].parent ? $scope.menus[$rootScope.menuState.inner].parent : 'main'
							var path = "/menu/" + route;
							$location.path(path);
							$scope.$apply(function() {});
						});

						$scope.navWheel.add($scope.backArrow);
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
									e.stopPropagation();
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

						var titlePos = snapUtil.calcSegTitlePos(args,lines,iconShow,iconAttr);

						$scope.legends[idx] = $scope.s.group();

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
						});

						$scope.legends[idx].add($scope.titles[idx]);

						if(iconShow) {
							$scope.icons[idx] = $scope.s.image(items[i].icon,titlePos.center.x+iconAttr.iconOffsetX, titlePos.y+iconAttr.iconOffsetY, iconAttr.size, iconAttr.size);
							$scope.legends[idx].add($scope.icons[idx]);
						}

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
							//console.log($scope.titles[idx].node.innerHTML + " " + $scope.titles[idx].attr('textpath') + " " + center.x + " " + center.y + " " + idx);
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

						$scope.items = $scope.args.mainWheel === true ? $scope.menus[$rootScope.menuState.inner].items : $scope.menus[$rootScope.menuState.outer].items;

						iconShow = $scope.menus[$rootScope.menuState.inner].icons_show;
						parentMenu = $scope.menus[$rootScope.menuState.inner].parent;

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
							//drawBackArrow();
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

					$scope.$watch('menuState.inner',function(val) {
						$scope.drawNav();
					},true);

					$scope.doSegTarget = function(idx) {

						var target = $scope.items[idx].target;

						switch(target.type) {
								case "menu":
										var path = "/menu/" + $scope.items[idx].target.innerMenu;
										$location.path(path);
										$scope.$apply(function() {});
										break;
								case "view":
										var path = target.view + "/" + target.route;
										$location.path(path);
										$scope.$apply(function() {});
										break;
								case "url":
										var once = false;
										var t = setTimeout(function() {
											$scope.openUrl(target.route);
										},10);
										break;
								case "blank":
									//do nothing
										break;
								default:
									var path = "/menu/main";
									$location.path(path);
									$scope.$apply(function() {});
								//	$scope.goMenu('main','main');
						}
						$scope.sideBars.active = false;
					}

					$scope.openUrl = function(url) {
						$scope.targetUrl = url;
						ngDialog.open({
						  template: 'html/open_guide.html',
						  className: 'ngdialog-theme-default',
						  scope: $scope,
						  closeByNavigation: true
						});

					}

					$scope.goMenu = function(inner,outer) {
						$rootScope.menuState.inner = inner;
						$rootScope.menuState.outer = outer;
						$scope.$apply(function() {});
					}

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

					$scope.getElementDimensions = function () {
				    return { 'h': $element.parent()[0].offsetHeight, 'w': $element.parent()[0].offsetWidth };
				  };

					$scope.getElementOffset = function () {
					    var rect = $element.parent()[0].getBoundingClientRect(),
					    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
					    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
					    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
					}

					$scope.xOffset = function() {
						var el=$element[0];
						var bbox = el.getBoundingClientRect();
						return bbox.x;
					}

					$scope.track = {
						startX: $scope.getElementOffset().left,
						startY: 0,
						x: 0,
						y: 0
					}

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
						$scope.track.startX = $scope.xOffset();
				    $scope.$apply();
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
					});

					$scope.clickTap = function(event) {

						  $scope.track.startX = $scope.xOffset();
							$scope.track.x = event.center.x - $scope.track.startX;
							var pos = $scope.xLeft($scope.track.x);
							$scope.curState.curPos = pos;
							$scope.track.startX = event.center.x - $scope.curState.curPos;
							$scope.curState.curPercent = $scope.posPcent(pos);
							if($scope.keyMarkers.length == 0 && $scope.options.steps == 0) {
								$scope.setHandle($scope.track.x);
							}
							else {
								$scope.snapCall();
							}
					}

					$scope.panStart = function(event) {
						$scope.track.startX = event.center.x - $scope.curState.curPos;
						$scope.curState.touchEvents.panning = true;
						$scope.curState.mouseDown = true;
						$scope.setHandle($scope.track.x);
					}

					$scope.panMove = function(event) {
						$scope.track.x = event.center.x - $scope.track.startX;
						$scope.setHandle($scope.track.x);
					}

					$scope.panEnd = function(event) {
						$scope.curState.touchEvents.panning = false;
						$scope.curState.mouseDown = false;
						$scope.snapToMark();
					}

					$scope.getElementX = function () {
				    return $element.css('left');
				  };

					$scope.$watch($scope.getElementX, function (newValue, oldValue) {
				 });

				 $scope.setHandle = function(x) {
					 var pos = $scope.xLeft(x);
					 $element.css({
						 left:  pos + 'px'
					 });
					$scope.curState.curPos = pos;
					$scope.curState.curPercent = $scope.posPcent(pos);
					var p = $scope.rounder($scope.curState.curPercent,100/$scope.options.steps);
					var nearKey = $scope.getNearKey(p);
					$scope.curState.nearKey = nearKey.idx;
					return false;
				 }

				 $scope.snapCall = function(k) {
					 if(typeof k !== 'undefined') {
						 $scope.snapToMark(k);
					 }
					 else {
						 $scope.snapToMark();
					 }
					 return false;
				 }

				 $scope.snapToMark = function(k) {
					  var p = null;
					  var nearKey = null;

						if(typeof k !== 'undefined') {
								p = $scope.getKeyPos(k);
						}
						else {
								p = Math.max(0,$scope.rounder($scope.curState.curPercent,100/$scope.options.steps));
						}

						nearKey = $scope.getNearKey(p);
						$scope.curState.nearKey = nearKey.idx;
						$scope.track.x = $scope.curState.curPos = $scope.pcentPos(p);
						$scope.curState.curPercent = p;
						$scope.curState.nearKeyLabel = nearKey.label;
						$element.css({'left':$scope.curState.curPos + 'px'});
						$scope.focusKey = ("#sk_" + $scope.options.id) + p;
						return false;
					}

					$scope.getKeyLabel = function(p) {
						if($scope.keyMarkers.length > 0) {
							var idx = arraySvce.arrIndexOf($scope.keyMarkers,p,'pos');
							return idx + 1;
						}
						else {
							return 'unknown';
						}
					}

					$scope.xgetNearKey = function(p) {
						p = p - Math.round(50/$scope.options.steps);
						if($scope.keyMarkers.length > 0) {
							var idx = 8;
							var prev = p;
							for(var i=0;i<$scope.keyMarkers.length;i++) {
									var diff = Math.abs(p-$scope.keyMarkers[i].pos);
									idx = diff < prev ? i : idx;
							}
							var keyData = {
								idx: idx + 1,
								pos: $scope.keyMarkers[idx].pos,
								label: $scope.keyMarkers[idx].label
							}
							return keyData;
						}
						else {
							return 'unknown';
						}
					}

					$scope.getNearKey = function(p) {
						if($scope.keyMarkers.length > 0) {
							var idx = arraySvce.arrIndexOf($scope.keyMarkers,p,'pos');
							var keyData = {
								idx: idx + 1,
								pos: $scope.keyMarkers[idx].pos,
								label: $scope.keyMarkers[idx].label
							}
							return keyData;
						}
						else {
							return 'unknown';
						}
					}

					$scope.getKeyPos = function(k) {
						if($scope.keyMarkers.length > 0) {
							var pos = $scope.keyMarkers[k-1].pos;
							return pos;
						}
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
							$scope.track.x = $scope.xLeft($scope.pcentPos($scope.curState.curPercent));
							var pos = $scope.track.x;
							$element.css({
								 left:  pos + 'px'
							 });
							 $scope.curState.curPos = pos;


					}, true);

					$element.ready(function() {
						$scope.snapCall($scope.curState.nearKey);
					});

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

holsteinModule.directive('locomotionVideo', ['$rootScope','$location','ApiSvce',function ($rootScope, $location, apiSvce) {
    return {
        restrict: 'E',
				scope: {
					args: '=',
					sliderArgs: '=',
					sliderState: '=',
					nKey: '=',
					videoSrc: '=',
					parentMenu: '='
				},
        templateUrl: 'html/locomotion_video.html',
				controller: function($scope, $element) {
						$scope.show = true;
						$scope.menuBack = function() {
							var path="menu/" + $scope.parentMenu.target.innerMenu;
							$location.path(path);
						}

						$scope.getVidDimensions = function () {
							//return { 'h': $element.find("video")[0].clientHeight, 'w': $element.find("video")[0].clientWidth };
							return { 'h': $element[0].querySelector('.vid_wrap').clientHeight, 'w': $element[0].querySelector('.vid_wrap').clientWidth };
							element[0].querySelector('.multi-files')
						};

						$scope.$watch($scope.getVidDimensions, function (newValue, oldValue) {
								$scope.vidHeight =  Math.round($scope.getVidDimensions().w * 0.5625);
						}, true);
				}
    }
}]);

holsteinModule.directive('traitFullImg', ['$rootScope','$location','ApiSvce',function ($rootScope, $location, apiSvce) {
    return {
        restrict: 'E',
				scope: {
					args: '=',
					sideBars: '=',
					sliderArgs: '=',
					sliderState: '=',
					parentMenu: '='
				},
        templateUrl: 'html/trait_full_img.html',
				controller: function($scope, $element) {

						$scope.imgStatus = {
							exists: false,
							init: false
						}

						$scope.show = true;

						$scope.sitePath = $rootScope.sitePath;
						$scope.img_src = $scope.args.img_path  + "/" + $scope.args.name + "_0" + $scope.sliderState.nearKey + ".png";

						$scope.menuBack = function() {
							var path="menu/" + $scope.parentMenu.target.innerMenu;
							$location.path(path);
						}

						apiSvce.exists($scope.img_src).then(function successCallback(response) {
							$scope.imgStatus.exists = true;
							$scope.imgStatus.init = true;
						}, function failureCallback(reason) {
							$scope.imgStatus.init = true;
						});

				}
    }
}]);

holsteinModule.directive('traitDesc', [function () {
    return {
        restrict: 'E',
				replace: true,
				scope: {
					parentMenu: '=',
					args: '=',
					content: '='
				},
        templateUrl: 'html/trait_desc.html',
				controller: function($scope, $element) {
				}
    }
}]);

holsteinModule.directive('menuDesc', ['$location', function ($location) {
    return {
        restrict: 'E',
				replace: true,
				scope: {
					menuState: '=',
					parentMenu: '=',
					content: '='
				},
        templateUrl: 'html/menu_desc.html',
				controller: function($scope, $element) {
					$scope.subParaState = {};
					if($scope.content.desc.paras.sub_text) {
						for(var i=0;i<$scope.content.desc.paras.sub_text.length;i++) {
							$scope.subParaState[$scope.content.desc.paras.sub_text[i].title] = false;
						}
					}

					$scope.subParaToggle = function(t) {
						$scope.subParaState[t] = !$scope.subParaState[t];
					}

					$scope.menuBack = function() {
						var path="menu/" + $scope.parentMenu;
						$location.path(path);
					}
				}
    }
}]);

holsteinModule.directive('backToMenu', [function () {
    return {
        restrict: 'E',
				scope: {
					txt: '=',
					align: '@'
				},
        template: '<a style="text-align:{{align}};" ng-href="#/">{{txt}}</a>'
    }
}]);

holsteinModule.directive('backLink', [function () {
    return {
        restrict: 'E',
				scope: {
					parentMenu: '=',
					align: '@'
				},
        template: '<a class="back_link" ng-href="#/traits/{{parentMenu}}" ng-click="sideBars.active=false;"><img ng-src="img/arrowL.png" title="Back" alt="Back" /></a>'
    }
}]);

holsteinModule.directive('sideTabs', ['$location','$rootScope', function ($location, $rootScope) {
    return {
        restrict: 'E',
				scope: {
					args: '=',
					active: '='
				},
        templateUrl: 'html/side_tabs.html',
				controller: function($scope, $element) {

					$scope.doTabs = function(target) {
						if($scope.active === true) {
							$scope.goTarget(target.innerMenu);
						}
						else {
							$scope.active = true;
						}
					}

					$scope.goTarget = function(target) {
						$scope.active = false;
					  var path = "/menu/" + target;
						$location.path(path);
					}

				}
    }
}]);

holsteinModule.directive('bsNavDropdown', ['$location','$rootScope', function ($location, $rootScope) {
    return {
        restrict: 'E',
				replace: true,
				scope: {
					args: '=',
					isNavCollapsed: '='
				},
        templateUrl: 'html/nav_dropdown.html',
				controller: function($scope, $element) {

					$scope.targetHref = function(target) {
						var path = "#!/menu/" + target.innerMenu;
						return path;
					}

					$scope.goTarget = function(target) {
						var path = "/menu/" + target.innerMenu;
						$location.path(path);
					}

					$scope.collapseMenu = function() {
						$scope.isNavCollapsed = true;
					}

				}
    }
}]);

holsteinModule.directive(
            "bnFadeHelper",
            function() {
                // I alter the DOM to add the fader image.
                function compile( element, attributes, transclude ) {
                    element.prepend( "<img class='fading'/>" );
                    return( link );
                }
                // I bind the UI events to the $scope.
                function link( scope, element, attributes ) {
                    //var fader = element.find( "img.fading" );
                    //var primary = element.find( "img.image" );
                    // Watch for changes in the source of the primary
                    // image. Whenever it changes, we want to show it
                    // fade into the new source.

										scope.fader = {};
										scope.primary = {};

										element.ready(function() {
											scope.fader = element[0].querySelector("img.fading");
											scope.primary = element[0].querySelector("img.image");

											scope.$watch(
	                        function(){return scope.primary.src;},
	                        function( newValue, oldValue ) {
														console.log("fadewatch o:"+newValue+" n:"+oldValue);
	                            // If the $watch() is initializing, ignore.
	                            if ( newValue === oldValue ) {
	                                return;
	                            }
	                            // If the fader is still fading out, don't
	                            // bother changing the source of the fader;
	                            // just let the previous image continue to
	                            // fade out.
	                            if ( isFading() ) {
	                                return;
	                            }
	                            initFade( oldValue );
	                        }
	                    );

										});



                    // I prepare the fader to show the previous image
                    // while fading out of view.
                    function initFade( fadeSource ) {
                        //fader
                        //    .prop( "src", fadeSource )
                        //    .addClass( "show" )
                        //;
												scope.fader.src = fadeSource;
												scope.fader.classList.add("show");
                        // Don't actually start the fade until the
                        // primary image has loaded the new source.
                        //scope.primary.on( "load", startFade );
												scope.primary.addEventListener("load", startFade);
                    }
                    // I determine if the fader is currently fading
                    // out of view (that is currently animated).
                    function xisFading() {
                        return(
                            scope.fader.hasClass( "show" ) ||
                            scope.fader.hasClass( "fadeOut" )
                        );
                    }
										function isFading() {
                        return(
                          scope.fader.classList.contains( "show" ) ||
                          scope.fader.classList.contains( "fadeOut" )
                        );
                    }
                    // I start the fade-out process.
                    function startFade() {
                        // The .width() call is here to ensure that
                        // the browser repaints before applying the
                        // fade-out class (so as to make sure the
                        // opacity doesn't kick in immediately).
                        //scope.fader.width();
												//scope.fader.classList.add("fadeOut");
                        //fader.addClass( "fadeOut" );
												forceFade()
                        setTimeout( teardownFade, 250 );
                    }
										function forceFade() {
										    setTimeout(function() {
													scope.fader.classList.add("fadeOut");
													return false;
												}, 1);
										}
                    // I clean up the fader after the fade-out has
                    // completed its animation.
                    function teardownFade() {
                        //fader.removeClass( "show fadeOut" );
												scope.fader.classList.remove("show");
												scope.fader.classList.remove("fadeOut");
                    }
                }
                // Return the directive configuration.
                return({
                    compile: compile,
                    restrict: "A"
                });
            }
        );


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

holsteinModule.factory("ApiSvce", ['$http',function($http) {

					var apiUrl = window.location.protocol + "//" + window.location.hostname + window.location.pathname;
					var service = {}

					service.exists = function(f) {
						return $http.get(apiUrl+f);
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

	service.calcSegTitlePos = function(args,lines,iconShow,iconAttr) {

		console.log(iconShow);

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
			x: iconShow === true ? center.x - bb.width/1.5 + iconAttr.ttlOffsetX : center.x - bb.width/1.5,
			y: iconShow === true ? center.y - (lines.length > 1 ? bb.height/5 : bb.height/2) + iconAttr.ttlOffsetY : center.y - (lines.length > 1 ? bb.height/5 : bb.height/2),
			center: center
		}
	}

	service.xcalcSegTitlePos = function(args,lines,icons,iconAttr) {

		console.log(icons);

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
			y: center.y - (lines.length > 1 ? bb.height/5 : bb.height/2),
			center: center
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
						lineColor: '#d9d9d9',
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
				 	 nearKey: 1,
					 nearKeyLabel: 1,
					 mouseDown: false,
					 touchEvents: {
						 panning:false
					 }
				 }

			}

			service.getDefault = function(data) {
				console.log(window[data]);
				return JSON.parse(JSON.stringify(window[data]));

			}

			return service;

		}]);

		holsteinModule.factory('PreLoader',['$q','$rootScope',function($q, $rootScope) {

			var service = {};

			service.preloadImages = function(imgList) {
				var imgCount = imgList.length;
				var imgs = [];
				var loaded = 0;
				for ( var i = 0 ; i < imgCount ; i++ ) {
					imgs[i] = new Image();
					imgs[i].src = imgList[i];
					imgs[i].addEventListener('load', function() {
						console.log(this.src + "loaded...");
						loaded++;
						if(loaded >= imgCount) {
							console.log("All images preloaded.")
						}
					})
				}
			};

			return service;

		}]);
