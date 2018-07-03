// JavaScript Document

var compassModule = angular.module('compassModule',['ngRoute','ngDialog','ngAnimate','ui.bootstrap','uiGmapgoogle-maps']);


compassModule.config(function($routeProvider,uiGmapGoogleMapApiProvider) {
							  
	$routeProvider
	  .when("/", {
		templateUrl : "views/compass.html"
	  })
	  .when("/zoom", {
		templateUrl : "views/single.html"
	  })
	  .when("/bigmap", {
		templateUrl : "views/bigmap.html",
		controller : "mapCtrl"
	  })
	  .when("/signup", {
		templateUrl : "views/signup.html"
	  })
	  .when("/admin", {
		templateUrl : "views/admin.html"
	  })
	  .when("/settings", {
		templateUrl : "views/settings.html"
	  });
	  
	   uiGmapGoogleMapApiProvider.configure({
           key: 'AIzaSyCT_mh8hi99Zyn6yMuCtUIEmajHRdpFCmo',
        	v: '3.20', //defaults to latest 3.X anyhow
        	libraries: 'weather,geometry,visualization'
    	});
	  
});


compassModule.run(['$rootScope','$location', '$routeParams', function($rootScope, $location, $routeParams) {
																		 
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

compassModule.controller('navCtrl',['$scope',function ($scope) {
  $scope.isNavCollapsed = true;
  $scope.isCollapsed = false;
  $scope.isCollapsedHorizontal = false;
}]);

compassModule.controller('mapCtrl',['$scope','$rootScope','ngDialog','uiGmapGoogleMapApi',function ($scope,$rootScope,ngDialog,uiGmapGoogleMapApi) {
	
	uiGmapGoogleMapApi.then(function(maps) {
			console.log('Map controller Google Maps API loaded OK');
			$scope.googleMaps.loaded = true;
    	});
	
	$scope.refreshMarkers = function() {
		
		$scope.mapMarkers = [];
		
		var me = {
			id: $scope.$parent.thisDevice.name,
			mark_idx: 10000,
			options:  "{labelClass:'my_marker_label',labelAnchor:'12 58',labelContent:'YOU ARE HERE'}",
			latitude: $scope.$parent.myLoc.latitude,
			longitude: $scope.$parent.myLoc.longitude,
			type: 'me',
			icon: 'img/marker_spot_red.png'
		};
		$scope.mapMarkers.push(me);
		
		$scope.places = $scope.$parent.linkedTo;
		
		for(i=0;i<$scope.places.length;i++) {
			var m = {};
			var typeClass = 'marker_'+$scope.places[i].type;
			m.id = $scope.places[i].id;
			m.type = $scope.places[i].type;
			m.mark_idx = i;
			m.options = $scope.places[i].options;
			m.options.labelClass = typeClass;
			m.latitude = $scope.places[i].latitude;
			m.longitude = $scope.places[i].longitude;
			m.icon = 'img/marker_line.png';
			$scope.mapMarkers.push(m);
		};
		
	}
	
	$scope.refreshMarkers();
	
}]);

compassModule.controller('adminCtrl',['$scope','$rootScope','$window','$http','ApiSvce','ngDialog','ArraySvce',function ($scope,$rootScope,$window,$http,api,ngDialog,arraySvce) {
		$scope.adminDeviceList = [];
		
		$scope.getAdminDeviceList = function(online) {

			api.listDevices($scope.$parent.thisDevice.name,false).then(function successCallBack(data) {
					
					var list = data.data;
					for (i=0;i<list.length;i++) {
						var idx = arraySvce.arrIndexOf($scope.adminDeviceList,list[i].id,'id');
						if(idx == -1) {
							list[i].linked = $scope.$parent.isLinked(list[i].id) ? true : false;
							list[i].linkId = null;
							list[i].linkStatus = 0;
							list[i].incomingReq = false;
							list[i].notifiedReq = false;
							list[i].bg = null;
							$scope.adminDeviceList.push(list[i]);
						}
						else {
							$scope.adminDeviceList[idx].online = list[i].online;
							$scope.adminDeviceList[idx].jti = list[i].jti;
							$scope.adminDeviceList[idx].avatar = list[i].avatar;
							$scope.adminDeviceList[idx].bg = list[i].bg;
						}
					}

					for(i=$scope.adminDeviceList.length-1;i>=0;i--) {
						var idx = arraySvce.arrIndexOf(list,$scope.adminDeviceList[i].id,'id');
						if(idx == -1) {
							$scope.adminDeviceList = $scope.adminDeviceList.slice(i,1);
						}
					}

				}, function failureCallback(reason) {
				
					console.log("Could not connect to device list. Check you have a data signal on the device.");
				
			});
			
		}
		
		$scope.initPolling = function() {
			console.log('STAGE AdminPolling');
			$scope.intervals[1] = setInterval(function(){	
				
				if($scope.$parent.thisDevice.status =='online') {
					
					$scope.getAdminDeviceList();
				
				}
					
			},$scope.$parent.params.pollRate);
		
		}
		
		$scope.getAdminDeviceList();
		$scope.initPolling();
		
		
  
}]);

compassModule.controller('mainCtrl',['$scope','$rootScope','$window','$http','$interval','$location','Compare','LocStore','GeoLocSvce','PostCodeSvce','ApiSvce','AuthSvce','ngDialog','uiGmapGoogleMapApi','ArraySvce','DataObj',mainCtrl]);
										   
	function mainCtrl($scope,$rootScope,$window,$http,$interval,$location,compare,locStore,geoLocSvce,postCodeSvce,api,authSvce,ngDialog,uiGmapGoogleMapApi,arraySvce,dataObj  ) {
	
		
		
		angular.element($window).bind('resize', function(){
        	$scope.$digest();
        });
								
		$scope.winWidth = $window.innerWidth;
		
		angular.element($window).bind('resize', function () {
   			 $scope.winWidth = $window.innerWidth;
		});
		
		$scope.onExit = function() {
		  $scope.checkout($scope.thisDevice.name,$scope.thisDevice.name);
		  locStore.set('thisDevice',$scope.thisDevice);
		};

   		$window.onbeforeunload =  $scope.onExit;
		
		//Initialise scope vars
		$scope.params = {};
		$http.get("data/options.json").then(function(data) {
				$scope.params = data.data;	
				});
		
		$scope.validCodes = [];
		$http.get("data/postcodes.json").then(function(data) {
				$scope.validCodes = data.data;	
				});

		$scope.status = {
			msg: "PointerContact is running",
			init: false,
			getLocTries: 0
		}
		
		$scope.postcode = {code: "",msg: "",validLocation: false};
		$scope.countries = [];
		$scope.cities = [];
		$scope.thisDevice = {name: null,status: 'offline',autolink: 'false',jwt: null,bg: null};
		$scope.thisDeviceTmp = {name: null,status: 'offline',autolink: 'false',jwt: null,bg: null};
		$scope.deviceList = [];
		$scope.deviceListSimple = [];
		$scope.linkedTo = [];
		$scope.curLinks = [];
		$scope.myLoc = {latitude: 0,longitude: 0, gpsHeading: 0};
		$scope.srchLoc = {lat: 0,long: 0,address: null};
		$scope.flags = {myLocSet:false, bearingSet:false, showLocHist:false, testMode:false};
		$scope.intervals = [];	
		$scope.trackPos = [];
		$scope.googleMaps = {loaded: false};
		
		$scope.bigMap = { 
			center: { latitude: 52, longitude: 0 },
			zoom: 15,
			options: {
				map: {
					'disableDefaultUI': 'true',
				},
				cluster: {
					zoomOnClick: true,
					styles: [{
						url: "img/cluster.png",
						width:60,
						height:60,
						textColor: 'white',
						textSize: 14,
						fontFamily: 'Open Sans'
					}],
					averageCenter: true,
					clusterClass: 'cluster-icon'
				},
				markers: {
					labelClass:'marker_labels',
					labelAnchor:'12 54',
					labelContent: 'Linked Device'}
			},
			markerPos: []			
		};
		
		uiGmapGoogleMapApi.then(function(maps) {
			console.log('Google Maps API loaded OK');
			$scope.googleMaps.loaded = true;
    	});
				
		$scope.orientation = {
			supported: false,
			method: false,
			initOffset: 0,
			eventLog: 0,
			distance: 10000,
			tiltLR: 0,
			tiltFB: 0,
			geoDir: 0,
			accuracy: 50,
			currGeoDir: 0,
			currAccuracy: 0,
			deviceDir: 0,
			adjust: 0,
			bearing: 0,
			improveCount: 0
			
		}
		
		$scope.calibrate = {
			loc1: {
				lat: 0,
				long: 0,
				devDir: 0
			},
			loc2: {
				lat: 0,
				long: 0,
				devDir: 0
			},
			distance: 0,
			bearing: 0,
			rotate: 0,
			calibrating: false,
			ended: false
		}
		
		$scope.compassImg = {
			nImg1: 'img/compass-needle640_lg_red.png',
			nImg2: 'img/compass-needle640_lg_amb.png',
			nImg3: 'img/compass-needle640_lg_grn.png',
			rImg1: 'img/rose640_ltgr.png',
			rImg2: 'img/rose640_ltgrn.png',
			rImg3: 'img/rose640_ltgr.png',
			rImgCalib:'img/rose640_calibrate.png'
		}
		
		$scope.palettes = [
				{
					title: 'Default Palette',
					colors: [
							 {
							  title: 'Default Green',
							  code:'#006666'
							 },
							 {							 
							  title: 'Purple',
							  code:'#603060'
							 },
							 {
							  title: 'Dark Blue',
							  code:'#333366'
							 },
							 {
							  title: 'Dark Red',
							  code:'#662020'
							 },
							 {
							  title:'Pink',
							  code:'#CC6666'
							 },
							 {
							  title: 'Sage Green',
							  code:'#669966'
							 },
							 {
							  title: 'Mauve',
							  code:'#666699'
							 },
							 {
							  title: 'Orange',
							  code:'#CC6600'
							 },
							 {
							  title: 'Yellow',
							  code:'#CC9933'
							 },
							 {
							  title: 'Charcoal',
							  code:'#333333'
							 },
							 {
							  title: 'Red',
							  code:'#992020'
							 },
							 {
							  title: 'Grey',
							  code:'#606060'
							 }
						 ]			
				},
				{
					title: 'Bright',
					colors: [
							 {
							  title: 'Default Green',
							  code:'#006666'
							 },
							 {							 
							  title: 'Purple',
							  code:'#660066'
							 },
							 {
							  title: 'Dark Blue',
							  code:'#000066'
							 },
							 {
							  title: 'Dark Red',
							  code:'#660000'
							 },
							 {
							  title:'Pink',
							  code:'#DD6666'
							 },
							 {
							  title: 'Light Green',
							  code:'#66CC66'
							 },
							 {
							  title: 'Mauve',
							  code:'#6666DD'
							 },
							 {
							  title: 'Orange',
							  code:'#EE6600'
							 },
							 {
							  title: 'Yellow',
							  code:'#DDAA00'
							 },
							 {
							  title: 'Black',
							  code:'#000000'
							 },
							 {
							  title: 'Red',
							  code:'#AA0000'
							 },
							 {
							  title: 'Grey',
							  code:'#606060'
							 }
						 ]			
				}
			];
		


		$scope.initCompass = function() {
			console.log('STAGE initCompass');
			if (window.DeviceOrientationEvent) {
				
				$scope.orientation.supported = true;
								
				$scope.intervals[0] = setInterval(function(){
					if($scope.linkedTo.length > 0) {
						// loop thru linked devices to set compass rotation
						for(i=0;i<$scope.linkedTo.length;i++) {
							$scope.setCompassRose(i);
							$scope.linkedTo[i].diff = geoLocSvce.calcDiff($scope.orientation.geoDir,$scope.linkedTo[i].bearing);
						}
					}
					
					},10);
				
				var accuracy = 50;
				var initOffset = 0;
				
				angular.element($window).bind('deviceorientation', function(eventData) {
					
					$scope.orientation.eventLog = $scope.orientation.eventLog + 1;
					
					var tiltLR = eventData.gamma;
					var tiltFB = eventData.beta;
					var devDir = eventData.alpha;
					var dir = 0;
					
					if($scope.orientation.eventLog < 20) {
						//Ignore first few events
					}
					else {	
									
						if(eventData.webkitCompassHeading) {
							$scope.orientation.method='webkit';
							if(initOffset == 0) {
								initOffset = eventData.webkitCompassHeading;
								accuracy = +eventData.webkitCompassAccuracy;
							}							
							if(+eventData.webkitCompassAccuracy > 0  && +eventData.webkitCompassAccuracy < $scope.orientation.accuracy) {
								$scope.orientation.improveCount += 1;
								 initOffset = eventData.webkitCompassHeading;
								 accuracy = +eventData.webkitCompassAccuracy;
							}
							else if($scope.orientation.improveCount == 0) {
								 initOffset = eventData.webkitCompassHeading;
								 accuracy = +eventData.webkitCompassAccuracy;
							};
							
							$scope.orientation.currGeoDir = eventData.webkitCompassHeading;
							$scope.orientation.currAccuracy = eventData.webkitCompassAccuracy;		
							
							dir = devDir - $scope.orientation.initOffset;
						}
						else if(eventData.absolute) {
							$scope.orientation.method='alpha';
							$scope.orientation.improveCount = -1;
							dir = eventData.alpha;
						}
						else {
							$scope.orientation.improveCount = -2;
							$scope.orientation.method='no compass';
							dir = eventData.alpha;
						}
						
						if(dir < 0) {
								dir += 360;
							}
						
						$scope.deviceOrientationHandler(tiltLR, tiltFB, dir, initOffset, devDir, accuracy);
					}
	
				});
				
				angular.element($window).bind('orientationchange', function(eventData) {
																			
						$scope.orientation.adjust = window.orientation;							
						console.log('Orientation: '+$scope.orientation.adjust);
							
				});
				
			}
		}
		
		//Set scope vars controlling a compass rose rotation
		$scope.setCompassRose = function(i) {			
			$scope.$apply(function() {
				$scope.linkedTo[i].rotateCompass = $scope.orientation.geoDir - $scope.orientation.adjust;
				$scope.linkedTo[i].rotateNeedle = $scope.orientation.geoDir + $scope.linkedTo[i].bearing - $scope.orientation.adjust;
			});			
		}
		
		//Set scope vars controlling a compass target bearing
		$scope.setCompassTarget = function(i) {	
			if($scope.linkedTo[i].latitude != 0 || $scope.linkedTo[i].longitude != 0) {
				var linkLoc = {lat: $scope.linkedTo[i].latitude,long: $scope.linkedTo[i].longitude};
				$scope.linkedTo[i].bearing = geoLocSvce.googleBearing($scope.myLoc,linkLoc);
				$scope.linkedTo[i].distance = geoLocSvce.calcDistance($scope.myLoc,linkLoc);
				console.log(i+" "+$scope.linkedTo[i].id+" "+$scope.linkedTo[i].bearing+" "+$scope.linkedTo[i].distance);
			}
		}
				
		//Update $scope with current orientation of this device
		$scope.deviceOrientationHandler = function(tiltLR, tiltFB, dir, initOffset, devDir, acc) {
			$scope.$apply(function() {
				$scope.orientation.tiltLR = tiltLR;	
				$scope.orientation.tiltFB = tiltFB;
				$scope.orientation.geoDir = dir;
				$scope.orientation.accuracy = acc;
				$scope.orientation.deviceDir = devDir;
				$scope.orientation.initOffset = initOffset;
			})								 
			return false;
		}
			
		//Get current location of this device with call to geolocation service
		$scope.whereAmI = function() {		
			
			geoLocSvce.getLoc().then(function successCallback(position) {

				//Store this device current position to check if moving
				var prevLoc = {
					latitude: $scope.myLoc.latitude,
					longitude: $scope.myLoc.longitude
				}
				
				//Store this device new poaition
				$scope.myLoc.latitude = position.coords.latitude;
				$scope.myLoc.longitude = position.coords.longitude;
				$scope.myLoc.gpsHeading = position.coords.heading;
				
				var pos = {
					stamp: new Date(),
					lat: position.coords.latitude,
					lon: position.coords.longitude,
					dir: $scope.orientation.geoDir
				}
				
				$scope.trackPos.unshift(pos);
							if($scope.trackPos.length > 20) {
								var lastRemoved = $scope.trackPos.pop();
							}
				
				// loop thru linked devices to set compass bearings
				for(i=0;i<$scope.linkedTo.length;i++) {
					$scope.setCompassTarget(i);
				}
				console.log("DISTANCE MOVED="+ geoLocSvce.calcDistance($scope.myLoc,prevLoc));
				
				//If this device has moved send its new position to server
				if($scope.thisDevice.status == 'online' && geoLocSvce.calcDistance($scope.myLoc,prevLoc) > 0) {
					$scope.sendPos();
				}
				
				$scope.status.msg = "Got location OK";
				
			}, function failureCallback(reason) {
				$scope.status.msg = "Trying to get location";
				$scope.status.getLocTries++
				if($scope.status.getLocTries >20) {
					alert("can't get location data at the moment. Check youhave a data signal");
					$scope.status.getLocTries = 0;
				}
				//ngDialog.open({ 
				//		template: "OK, can't get location data at the moment. Check you have a data signal on the device.", 
				//		className: 'ngdialog-theme-default', 
				//		plain:true,
				//		closeByNavigation: true});
				
			});
	
		}	
		
		//Open dialog to set this device ID
		$scope.enterDeviceName = function() {
			$scope.thisDevice.bg = $scope.params.defaultCompassBg;
			api.listDevicesSimple($scope.thisDevice,name).then(function successCallBack(data) {
					$scope.deviceListSimple = [];
					var list = data.data;
					for (i=0;i<list.length;i++) {	
						$scope.deviceListSimple.push(list[i]);
					}
					
					ngDialog.open({ 
						template: 'html/id_entry.html', 
						className: 'ngdialog-theme-default',
						closeByNavigation: false,
						closeByEscape: false,
						closeByDocument: false,
						showClose: false,
						scope: $scope
					});
					
				}, function failureCallback(reason) {
				
					console.log("Could not connect to device list. Check you have a data signal on the device.");
					ngDialog.open({ 
							  template: 'html/id_entry.html', 
							  className: 'ngdialog-theme-default',
							  scope: $scope,
							  closeByNavigation: true});
				
				});
		}
		
		$scope.setDeviceColor = function(code) {
				$scope.thisDevice.bg = code;
				return false;
		}
		
		$scope.getColorName = function(palette,color) {
				var idx = arraySvce.arrIndexOf($scope.palettes[palette].colors,color,'code');
				return $scope.palettes[palette].colors[idx].title;
		}
		
		$scope.checkJWT = function(jwt) {
			
			authSvce.checkToken($scope.thisDevice.name,jwt).then(function successCallback(response) {
	
												if(JSON.parse(response.data) == "VALID") {
													console.log('VALID JWT');
													api.setToken(jwt);;
													$scope.initApp();
												}
												else {
													console.log(JSON.stringify(response));
													$scope.refreshJWT();
												}
													
						}, function failureCallback(reason) {
								console.log(JSON.stringify(reason));
								//flag an error checking JWT
								ngDialog.open({ 
								  template: "Couldn't authenticate at the moment. Check you have a data signal on the device.", 
								  className: 'ngdialog-theme-default', 
								  plain:true,
								  closeByNavigation: true
								});
							});
			
		}
		
		$scope.refreshJWT = function() {
			
			authSvce.refreshToken($scope.thisDevice.name,$scope.thisDevice.name).then(function successCallback(data) {
												//alert(data.data);
												api.setToken(data.data);
													//now we have a JWT we can proceed to query api
												console.log("NEW TOKEN = "+api.getToken());
												$scope.thisDevice.jwt = api.getToken();
												locStore.set('thisDevice',$scope.thisDevice);
												$scope.initApp();
													
						}, function failureCallback(reason) {
								//flag an error getting JWT
								ngDialog.open({ 
								  template: "Couldn't authenticate at the moment. Check you have a data signal on the device.", 
								  className: 'ngdialog-theme-default', 
								  plain:true,
								  closeByNavigation: true
								});
							});
			
		}
		
		//Authenticate and initialise current device list from server
		$scope.initAuth = function(online) {
			//Check for stored credentials
			if(locStore.get('thisDevice')) {
				var dev = locStore.get('thisDevice');
				if(typeof dev.name != 'undefined' && dev.name != null) {
					for(x in dev) {
						$scope.thisDevice[x] = dev[x];
					}
					if($scope.thisDevice.jwt == null || typeof $scope.thisDevice.jwt == 'undefined') {
						//No JWT stored for device so request a new one
						$scope.refreshJWT();
					}
					else {
						//We do have a JWT so proceed
						$scope.checkJWT($scope.thisDevice.jwt);
					}
				}
				else {
					//Stored device data format error so clear it
					locStore.clear('thisDevice');
					$scope.initAuth();
				}
				
			}
			else if ($scope.thisDevice.name != null) {	
				//New device name selected so new JWT needed
				$scope.refreshJWT();
			}
			else {
				//No device id so display id entry dialog
				$scope.enterDeviceName();
			}
		}
		
		$scope.initPolling = function() {
			console.log('STAGE initPolling');
			$scope.intervals[1] = setInterval(function(){	
				
				if($scope.thisDevice.status =='online') {
					$scope.markerPos = [];
					$scope.markerPos.push({id: 'myLoc',loc: {lat: $scope.myLoc.latitude, long: $scope.myLoc.longitude}});
				
					$scope.whereAmI();
					$scope.getDeviceList();
					
					if($scope.linkedTo.length > 0) {
						var links = [];
						for(var i=0;i<$scope.linkedTo.length;i++) {	
							if($scope.linkedTo[i].dynamic) {
								$scope.markerPos.push({id: $scope.linkedTo[i].id,loc: {lat: $scope.linkedTo[i].latitude, long: $scope.linkedTo[i].longitude}});
								links.push($scope.linkedTo[i].id);
							}
						}
						$scope.getLinkedLocs(links);
					}
					
					//var mapCenter = geoLocSvce.calcCenter($scope.markerPos);
					//console.log('markerPos='+JSON.stringify($scope.markerPos)+' mapCenter='+JSON.stringify(mapCenter));
					//$scope.bigMap.center.latitude = mapCenter.lat;
					//$scope.bigMap.center.longitude = mapCenter.long;
				}
					
			},$scope.params.pollRate);
		
		}
			
		
		//INITIALISE APP AND SET UP DB POLLING
		
		$scope.initApp = function() {
		//Auth checks complete so start the compass and get device data
			console.log('INIT APP');
			$scope.status.init = true;
			$scope.initCompass();
			$scope.getDeviceList();			
			$scope.initPolling();
			$scope.checkin($scope.thisDevice.name,$scope.thisDevice.name,$scope.thisDevice.bg);
		}
		
		
		$scope.getLinkedLoc = function(i) {
			
			api.getLatest($scope.thisDevice.name,$scope.linkedTo[i].id,i).then(function successCallback(data) {
								if(data.data) {
									var d=data.data[0];
									//console.log('Linked data from '+d.id+' = ' + d.lat +', '+d.lon);
									$scope.linkedTo[i].lat = d.lat;		
									$scope.linkedTo[i].latitude = d.lat;	
									$scope.linkedTo[i].long = d.lon;
									$scope.linkedTo[i].longitude = d.lon;
									$scope.linkedTo[i].address = d.id;
								}
						});			
			
		}
		
		$scope.getLinkedLocs = function(links) {
			
			api.getLinksLatest($scope.thisDevice.name,links).then(function successCallback(data) {
								if(data.data) {
									var d=data.data;
									console.log("D= "+JSON.stringify(d));
									if(d[0] != null && d.length > 0) {
										for(var i=0;i<d.length;i++) {	
											var idx = arraySvce.arrIndexOf($scope.linkedTo,d[i].id,'id');
											if(idx > -1) {
												$scope.linkedTo[idx].lat = d[i].lat;		
												$scope.linkedTo[idx].latitude = d[i].lat;	
												$scope.linkedTo[idx].long = d[i].lon;
												$scope.linkedTo[idx].longitude = d[i].lon;
												$scope.linkedTo[idx].address = d[i].id;
											}
										}
									}
									else {
										console.log("no location data available");
									}
								}
						});			
			
		}
		
		$scope.calibInit = function() {
			$scope.calibrate.calibrating = false;
			$scope.calibrate.ended = false;
			$rootScope.dialog = ngDialog.openConfirm({ 
											template: "html/calibrate_init.html", 
											className: 'ngdialog-theme-default', 
											scope: $scope,
											closeByNavigation: false
											});
		}
		
		$scope.deviceIdx = function(id) {
			var e = -1;
			for(var i=0;i<$scope.deviceList.length;i++) {
				if($scope.deviceList[i].id == id) {
					e = i;
				}
			}
			return e;
		}
		
		$scope.linkSendRequest = function(id) {
			api.requestLink($scope.thisDevice.name,id).then(function successCallBack(data) {
					//console.log('REQUEST LINK RESULT: '+JSON.stringify(data));	
				}, function failureCallback(reason) {
				
				console.log("Could not connect to server. Check you have a data signal on the device.");
				
				});
		}
		
		$scope.linkCancelRequest = function(linkId) {
			api.linkStatus($scope.thisDevice.name,linkId,'0').then(function successCallBack(data) {
					//console.log('CANCEL REQUEST RESULT: '+JSON.stringify(data));	
				}, function failureCallback(reason) {
				
				console.log("Could not connect to server. Check you have a data signal on the device.");
				
				});
		}
		
		$scope.linkAccept = function(linkId) {
			api.acceptLink($scope.thisDevice.name,linkId).then(function successCallBack(data) {
					//console.log('ACCEPT LINK RESULT: '+JSON.stringify(data));	
				}, function failureCallback(reason) {
				
				console.log("Could not connect to server. Check you have a data signal on the device.");
				
				});
		}
		
		$scope.linkRevoke = function(linkId) {
			api.revokeLink($scope.thisDevice.name,linkId).then(function successCallBack(data) {
					console.log('REVOKE LINK RESULT: '+JSON.stringify(data));	
				}, function failureCallback(reason) {
				
				console.log("Could not connect to server. Check you have a data signal on the device.");
				
				});
		}
		
		$scope.linkWaiting = function(id) {
			$scope.say('Waiting for response from '+id);
		}
		
		$scope.linkToDevice = function(id) {
			
			
			if($scope.thisDevice.status != 'online') {
				$scope.say('You must be checked in to link to another device.');
				return false;
			}
			
			if(id == $scope.thisDevice.name || $scope.isLinked(id)) {
				return false;			   
			}
			
			var device = new dataObj.device();
			
			device.id = id;	
			device.type = 'device',
			device.options = JSON.parse(JSON.stringify($scope.bigMap.options.markers));
			device.options.labelContent = id;
			device.marker_icon = 'img/marker_spot_grn.png';
			device.avatar = 'default.jpg';
			device.bg = $scope.params.defaultCompassBg;
			
						
			var devIdx = $scope.deviceIdx(id);
			
			$scope.deviceList[devIdx].linked = true;
			device.mark_idx = devIdx;
			device.avatar = $scope.deviceList[devIdx].avatar;
			
			//Set custom compass color if specified or if not leave as default
			if($scope.deviceList[devIdx].bg_color != null) {
			   device.bg = $scope.deviceList[devIdx].bg_color;
			}
			
			device.options.labelContent = id;
			
			$scope.linkedTo.unshift(device);
						
			return false;
			
		}
		
		$scope.linkToCity = function() {
			
			var obj = new dataObj.device();
			
			obj.type = 'city',
			obj.options = JSON.parse(JSON.stringify($scope.bigMap.options.markers));
			obj.marker_icon = 'img/marker_spot_grn.png';
			obj.avatar = 'city.jpg';
			obj.bg = $scope.params.defaultCityBg;
			
			$scope.linkedTo.unshift(obj);
			$scope.chooseCity();
						
			return false;
			
		}
		
		$scope.chooseCity = function() {
			$scope.thisDevice.bg = $scope.params.defaultCompassBg;
			doDialog();
			if($scope.countries.length == 0) {
				api.getCountries($scope.thisDevice.name).then(function successCallBack(data) {
						$scope.countries = [];
						var x = data.data;
						for (i=0;i<x.length;i++) {	
							$scope.countries.push(x[i]);
						}
						
						//doDialog();
						
					}, function failureCallback(reason) {					
						 console.log("Could not connect to server. Check you have a data signal on the device.");
				})
			}
			else {
				//doDialog();
			}
			
			function doDialog() {
				ngDialog.open({ 
						template: 'html/choose_city.html', 
						className: 'ngdialog-theme-default',
						closeByNavigation: false,
						closeByEscape: false,
						closeByDocument: false,
						showClose: false,
						scope: $scope,
						controller: function($scope) {
							$scope.thisCity = {
								country: null,
								city: null
							};
							
							$scope.getCity = function() {
								
								api.getCities($scope.thisDevice.name,$scope.thisCity.country).then(function successCallBack(data) {
																									
										$scope.cities = [];
										var y = data.data;
										for (i=0;i<y.length;i++) {	
											$scope.cities.push(y[i]);
										}

									}, function failureCallback(reason) {					
										 console.log("Could not connect to server. Check you have a data signal on the device.");
								})
								
							}
							
						}
					});
			}
		}
		
		$scope.setCity = function(data) {
			var c = JSON.parse(data);
			$scope.linkedTo[0].id = c.city;
			$scope.linkedTo[0].mark_idx = c.city+c.iso2;
			$scope.linkedTo[0].address = c.city;
			$scope.linkedTo[0].address2 = " ("+c.country+")";
			$scope.linkedTo[0].lat = c.lat;
			$scope.linkedTo[0].lat = c.lon;
			$scope.linkedTo[0].latitude = c.lat;
			$scope.linkedTo[0].longitude = c.lon;
			$scope.linkedTo[0].options.labelContent = c.city;
			
		}
		
		$scope.getPostCode = function() {
			ngDialog.open({ 
					template: 'html/postcode_entry.html', 
					className: 'ngdialog-theme-default', 
					scope:$scope,
					controller: function($scope) {
					$scope.postcode = {
						code: null,
						msg: "Please enter a valid UK postcode"
					}
					},
					closeByNavigation: false,
					closeByEscape: false,
					closeByDocument: false,
			});
		}

		$scope.processPostCode = function(code) {
			
			code = postCodeSvce.formatPostCode(code);

			postCodeSvce.getPostCodeLoc(code)
			.then(function successCallback(response){
					
					if(response.data.results.length>0) {
						var d = response.data.results[0];
						//console.log(JSON.stringify(d));
						
						var locData = {};
						
						locData.id = code;
						locData.mark_idx = code;
						locData.code = code;
						locData.lat = d.geometry.location.lat;		
						locData.long = d.geometry.location.lng;
						locData.latitude = d.geometry.location.lat;		
						locData.longitude = d.geometry.location.lng;
						locData.address = d.formatted_address;
						
						$scope.linkToPostCode(locData);
					
					}
					else {
						ngDialog.openConfirm({ 
						  template: "Sorry - couldn't locate this postcode - try again", 
						  className: 'ngdialog-theme-default', 
						  plain:true,
						  closeByNavigation: true});
					}
					
				}, function errorCallback(response){
					
					alert("Error getting location for this postcode. Try another code.");
					
			});
			
		}
		
		$scope.linkToPostCode = function(args) {
			
			var obj = new dataObj.device();
			
			obj.type = 'postcode';
			obj.options = JSON.parse(JSON.stringify($scope.bigMap.options.markers));
			obj.marker_icon = 'img/marker_spot_grn.png';
			obj.avatar = 'postcode.jpg';
			obj.bg = $scope.params.defaultPostCodeBg;
			obj.options.labelContent = args.code;
			
			for(x in args) {
				obj[x] = args[x];
			}
			
			$scope.linkedTo.unshift(obj);
						
			return false;
			
		}

		
		$scope.notifyRequest = function(id,linkId,idx) {
			
			ngDialog.openConfirm({
				template: 'html/notify_request.html',
			  	scope: $scope,
				closeByNavigation: false,
				closeByEscape: false,
				closeByDocument: false,
				controller: function($scope) {
					$scope.requester = id;
					$scope.idx = idx;
					$scope.colorChoice = null;
				}
			 	}).then(
					function(value) {
						$scope.linkAccept(linkId);
					},
					function(value) {
						$scope.linkRevoke(linkId);
				}
			);
			
		}
		
		$scope.confirmSendRequest = function(id) {
			
			ngDialog.openConfirm({
				template: 'html/confirm_send_request.html',
			  	scope: $scope ,
				closeByNavigation: false,
				closeByEscape: false,
				closeByDocument: false,
			 	}).then(
					function(value) {
						$scope.linkSendRequest(id);
					},
					function(value) {
						//Cancel or do nothing
				}
			);
			
		}
		
		$scope.confirmCancelRequest = function(linkId) {
			
			ngDialog.openConfirm({
				template: 'html/confirm_cancel_request.html',
			  	scope: $scope,
				closeByNavigation: false,
				closeByEscape: false,
				closeByDocument: false,
			 	}).then(
					function(value) {
						$scope.linkRevoke(linkId);
					},
					function(value) {
						//Cancel or do nothing
				}
			);
			
		}
		
		$scope.confirmDetach = function(linkId) {
			
			ngDialog.openConfirm({
				template: 'html/confirm_detach.html',
			  	scope: $scope,
				closeByNavigation: false,
				closeByEscape: false,
				closeByDocument: false,
			 	}).then(
					function(value) {
						$scope.linkRevoke(linkId);
					},
					function(value) {
						//Cancel or do nothing
				}
			);
			
		}
		
						
		$scope.detachFromDevice = function(id,idx) {
			
			var devId = (typeof idx === 'undefined') ? null : idx;
			var linkIdx = arraySvce.arrIndexOf($scope.linkedTo,id,'id');
			if (linkIdx >= 0) {
				$scope.linkedTo.splice( linkIdx, 1 );
			}
			else if(linkIdx == 0) {
				$scope.linkedTo.shift();	
			}
					
			if(devId) {				
				$scope.deviceList[devId].linked = false;				
			}
			else {
				for(v=0;v<$scope.deviceList.length;v++) {
					if($scope.deviceList[v].id == id) {
						$scope.deviceList[v].linked = false;
					}
				}
			}
			
			return false;
			
		}
		
		$scope.detachAllDevices = function() {
			$scope.linkedTo = [];
			for(i=0;i<$scope.deviceList.length;i++) {
				$scope.deviceList[i].linked = false;
			}

		}
		
		$scope.setBearing = function(device) {
			device.bearing = geoLocSvce.calcBearing($scope.myLoc,device);
			device.bearingSet = true;
			device.needleMove = true;						
			setTimeout(function() {
				device.needleMove = false;			
								},500);			
		}
		
		$scope.clearBearing = function(device) {
			device.bearingSet = false;
			setTimeout(function() {
				device.bearing = 0;
								},600);			
		}
		
		
		$scope.sendPos = function() {
			
			var postArgs = {
				rqid: $scope.thisDevice.name,
				id: $scope.thisDevice.name,
				lat: $scope.myLoc.latitude,
				lon: $scope.myLoc.longitude,
				dir: $scope.orientation.geoDir
			}
			
			api.putLatest(postArgs).then(function successCallback(data) {
					console.log("Post Location status: "+JSON.stringify(data.status));				 
				},
				function failureCallback(reason) {					
					console.log("Failed to send current position. Check you have a data signal on the device.");
				});
			
		}
		
		
		$scope.getDeviceList = function(online) {
			api.listDevices($scope.thisDevice.name,false,true).then(function successCallBack(data) {
					var list = data.data;
					for (i=0;i<list.length;i++) {
						var idx = arraySvce.arrIndexOf($scope.deviceList,list[i].id,'id');
						if(idx == -1) {
							list[i].linked = $scope.isLinked(list[i].id) ? true : false;
							list[i].linkId = null;
							list[i].linkStatus = 0;
							list[i].incomingReq = false;
							list[i].notifiedReq = false;
							list[i].bg = null;
							$scope.deviceList.push(list[i]);
						}
						else {
							$scope.deviceList[idx].online = list[i].online;
							$scope.deviceList[idx].jti = list[i].jti;
							$scope.deviceList[idx].avatar = list[i].avatar;
							$scope.deviceList[idx].bg = list[i].bg;
						}
					}

					for(i=$scope.deviceList.length-1;i>=0;i--) {
						var idx = arraySvce.arrIndexOf(list,$scope.deviceList[i].id,'id');
						if(idx == -1) {
							console.log("Device "+i+" "+$scope.deviceList[i].id+" removed from list");
							$scope.deviceList = $scope.deviceList.slice(i,1);
							console.log(JSON.stringify($scope.deviceList));
						}
					}

				}, function failureCallback(reason) {
				
				console.log("Could not connect to device list. Check you have a data signal on the device.");
				
			})
			.then(function() {
				return api.getMyLinks($scope.thisDevice.name);		   
			})
			.then(function successCallBack(response) {
					$scope.curLinks = response.data;
					if($scope.curLinks) {
						//console.log('RAW LINK DATA: '+JSON.stringify(response.data));
						for(i=0;i<$scope.curLinks.length;i++) {
							if($scope.thisDevice.name == $scope.curLinks[i].dev1) {
								var idx = arraySvce.arrIndexOf($scope.deviceList,$scope.curLinks[i].dev2,'id');
								if(idx != -1) {
									//console.log("OUT REQUEST OR LINK "+idx);
									console.log("REQUEST STATUS 1: "+$scope.deviceList[idx].id+" "+$scope.deviceList[idx].incomingReq+" "+$scope.deviceList[idx].notifiedReq);
									$scope.deviceList[idx].incomingReq = false;
									$scope.deviceList[idx].notifiedReq = false;
									$scope.deviceList[idx].linkId = $scope.curLinks[i].link_id;
									$scope.deviceList[idx].linkStatus = $scope.curLinks[i].status;
								}
							}
							else if($scope.thisDevice.name == $scope.curLinks[i].dev2) {
								var idx = arraySvce.arrIndexOf($scope.deviceList,$scope.curLinks[i].dev1,'id');
								if(idx != -1) {
									//console.log("IN REQUEST OR LINK "+idx);
									console.log("REQUEST STATUS 2: "+$scope.deviceList[idx].id+" "+$scope.deviceList[idx].incomingReq+" "+$scope.deviceList[idx].notifiedReq);
									$scope.deviceList[idx].incomingReq = true;
									$scope.deviceList[idx].linkId = $scope.curLinks[i].link_id;
									$scope.deviceList[idx].linkStatus = $scope.curLinks[i].status;
								}
							}
						}
						for(var j=0;j<$scope.deviceList.length;j++) {
							var idx1 = arraySvce.arrIndexOf($scope.curLinks,$scope.deviceList[j].id,'dev1');
							var idx2 = arraySvce.arrIndexOf($scope.curLinks,$scope.deviceList[j].id,'dev2');
							if(idx1 == -1 && idx2 == -1) {
								//console.log("YESYES "+$scope.deviceList[j].linkId+" "+$scope.deviceList[j].id);
									$scope.deviceList[j].linkId = null;
									$scope.deviceList[j].linkStatus = 0;
									//$scope.detachFromDevice($scope.deviceList[j].id, j);
							}
							else {
								//console.log("LINKLINK");
							}
							$scope.processLinks(j);
						}						
					}
					else {
						console.log("No active link data");
						for(var j=0;j<$scope.deviceList.length;j++) {
							$scope.deviceList[j].linked = false;
							$scope.deviceList[j].linkId = null;
							$scope.deviceList[j].incomingReq = false;
							$scope.deviceList[j].notifiedReq = false;
							if($scope.deviceList[j].linkStatus != 0) {
								$scope.deviceList[j].linkStatus = 0;
								$scope.detachFromDevice($scope.deviceList[j].id, j);
							}
						}
					}
			}, function failureCallback(reason) {				
					console.log("Could not get link information. "+JSON.stringify(reason));				
			});		
		}
		
		$scope.processLinks = function(j) {
		
			switch(parseInt($scope.deviceList[j].linkStatus)) {
							
				case 1:
					//console.log("LINK REQUESTED TO "+$scope.deviceList[j].id);
					if($scope.params.autoLink === true) {
						$scope.linkAccept($scope.deviceList[j].linkId);					
					}
					else {
						$scope.detachFromDevice($scope.deviceList[j].id);
						if($scope.deviceList[j].incomingReq === true && $scope.deviceList[j].notifiedReq === false) {
							$scope.deviceList[j].notifiedReq = true;
							$scope.notifyRequest($scope.deviceList[j].id,$scope.deviceList[j].linkId,j);
						}
					}
					break;
				case 2:
					//console.log("LINKED TO "+$scope.deviceList[j].id);
					$scope.linkToDevice($scope.deviceList[j].id);
					break;
				case 3:
					$scope.detachFromDevice($scope.deviceList[j].id);
					break;
				default:
					$scope.detachFromDevice($scope.deviceList[j].id, j);
					
				}
				return false;
		
		}
		
		$scope.getDeviceListSimple = function(online) {
			api.listDevicesSimple(online).then(function successCallBack(data) {
					//alert(JSON.stringify(data));	
					$scope.deviceListSimple = [];
					var list = data.data;
					for (i=0;i<list.length;i++) {	
						$scope.deviceListSimple.push(list[i]);
					}
				}, function failureCallback(reason) {
				
				console.log("Could not connect to device list. Check you have a data signal on the device.");
				
				});
		}
		
		$scope.isLinked = function(id) {
			var x = false;
			if($scope.linkedTo.length>0) {
				for (j=0;j<$scope.linkedTo.length;j++) {
					if($scope.linkedTo[j].id == id) {
						x = true;
					}
				}
			}
			return x;
		}
		
		$scope.isOnline = function(id) {
			api.isOnline(id).then(function(data) {
					if(data.data[0].online == 1) {
						alert(data.data[0].id+" is online");
					}
					else {
						alert(data.data[0].id+" is offline");
					}
				});
		}
		
		$scope.checkin = function(rqid,id,bg) {
			api.checkin(rqid,id,bg).then(function successCallBack(data) {
					console.log(id+' checked in OK');
					if(data.config.data.id == $scope.thisDevice.name) {
						$scope.thisDevice.status = 'online';
					}
				}, function failureCallBack(data) {
					console.log('Check-in Error'+JSON.stringify(data));
			});
		}
		
		$scope.checkout = function(rqid,id) {
			api.checkout(rqid,id).then(function(data) {
					console.log(id+' checked out OK '+JSON.stringify(data));
					if(data.config.data.id == $scope.thisDevice.name) {
						$scope.thisDevice.status = 'offline';
						$scope.detachAllDevices();
					}
				}, function failureCallBack(data) {
					console.log('Check-out Error'+JSON.stringify(data));
			});
		}
		
		$scope.undoResetDeviceId = function() {
			$scope.thisDevice = arraySvce.copyObj($scope.thisDeviceTmp);
			$scope.initAuth();
		}
		
		$scope.resetDeviceId = function() {
			$scope.detachAllDevices();
			$scope.thisDeviceTmp = arraySvce.copyObj($scope.thisDevice);
			locStore.clear('thisDevice');			
			$scope.checkout($scope.thisDevice.name,$scope.thisDevice.name);
			$scope.thisDevice.name = null;
			$scope.initAuth();
		}
		
		$scope.removeDevice = function(rqid,id) {
			api.removeDevice({rqid: rqid,id: id}).then(function(data) {
					console.log('Removed '+JSON.stringify(data));
				});
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
		
		
		$scope.userLogin = function() {
			$scope.say('User login coming soon');
			return false;
		}
		
		
		$scope.testAuth = function() {
			api.testAuth($scope.thisDevice.name).then(function successCallback(data) {
					console.log("data= "+JSON.stringify(data.data));									  																		  
				}, function failureCallback(reason) {					
					alert('error testing jwt');				
				});
		}
		
		
		$scope.initAuth();
		
	
	}
	
		
	
//DIRECTIVES

compassModule.directive('pjdCompass',['$rootScope','$location','ngDialog','ArraySvce',function($rootScope, $location, ngDialog, arraySvce) {
										  
			return {
				restrict: 'E',
				scope: {
					orientation: '=',
					linkedTo: '=',
					compass: '=',
					compassImg: '=',
					params: '=',
					flags: '='
				},
				transclude: true,
				templateUrl: function(elem, attr) {
					  return 'html/devicecompass_' + attr.type + '.html';
					},
				controller: function($scope) {
					$scope.nImg = $scope.compassImg.nImg1;	
					$scope.rImg = $scope.compassImg.rImg1;
					
					$scope.$watch('compass.diff',function(val) {															 
						if($scope.compass.diff < 4)  {
								$scope.nImg = $scope.compassImg.nImg3;
						}
						else if($scope.compass.diff < 10) {
								$scope.nImg = $scope.compassImg.nImg2;
						}
						else {
								$scope.nImg = $scope.compassImg.nImg1;						
						}
						
					},true);
					
					$scope.zoomDevice = function() {
						for(i=0;i<$scope.linkedTo.length;i++) {
							if($scope.linkedTo[i].id == $scope.compass.id) {
								$rootScope.curIdx = i;
							}
						}
						$location.path('/zoom');
					}
					
					$scope.unZoom = function() {
						$location.path('/');
					}
					
					$scope.distFormat = function() {
						var d = $scope.compass.distance < 1000 ? (Math.round($scope.compass.distance)) + " M" : (Math.round($scope.compass.distance/10)/100) + " Km";
						return d;
					}
					
					$scope.closeCompass = function() {
						var linkIdx = arraySvce.arrIndexOf($scope.linkedTo,$scope.compass.id,'id');
											if (linkIdx >= 0) {
						$scope.linkedTo.splice( linkIdx, 1 );
						}
						else if(linkIdx == 0) {
							$scope.linkedTo.shift();	
						}
						
					}
					
				}//end controller
			};//end return function
										   
	}]);

compassModule.directive('calibration',['$rootScope','GeoLocSvce','ngDialog',function($rootScope, geoLocSvce, ngDialog) {
										  
			return {
				restrict: 'E',
				scope: {
					orientation: '=',
					myLoc: '=',
					calibrate: '=',
					compassImg: '=',
					params: '=',
					flags: '='
				},
				transclude: true,
				templateUrl: 'html/calibration.html',
				controller: function($scope) {
					$scope.rotateCompass = 0;
					$scope.rotateNeedle = $scope.orientation.deviceDir - $scope.calibrate.loc1.devDir;
					$scope.nImg = $scope.compassImg.nImg1;	
					$scope.rImg = $scope.compassImg.rImg1;
					$scope.msg = "1. Point the device in front of you. 2. walk straight ahead for at least 15m. 3. Try to keep the needle green as you walk. 4. With needle green, hit the Stop button to finish...";
					$scope.canStop = false;
					
					$scope.$watch('orientation.deviceDir',function(val) {
						if(!$scope.calibrate.calibrating) {
							var dir = $scope.orientation.deviceDir - $scope.orientation.initOffset;
							if(dir < 0) {
								dir += 360;
							}
							$scope.rotateCompass = dir - $scope.orientation.adjust;
						}
						$scope.rotateNeedle = $scope.calibrate.calibrating ? $scope.orientation.deviceDir - $scope.calibrate.loc1.devDir : 0;
						$scope.diff = Math.round(Math.abs($scope.calibrate.loc1.devDir -$scope.orientation.deviceDir)*100)/100;	
						if($scope.diff < 2)  {
								$scope.nImg = $scope.compassImg.nImg3;
								$scope.canStop = true;
						}
						else if($scope.diff < 6) {
								$scope.nImg = $scope.compassImg.nImg2;
								$scope.canStop=false;
						}
						else {
								$scope.nImg = $scope.compassImg.nImg1;
								$scope.canStop=false;
						}
						
					},true);
					
					$scope.calibStart = function() {
						$scope.calibrate.loc1.devDir = $scope.orientation.deviceDir;
						geoLocSvce.getLoc().then(function successCallback(position) {				
							//Store this device current poaition
							$scope.myLoc.latitude = position.coords.latitude;
							$scope.myLoc.longitude = position.coords.longitude;
							$scope.calibrate.loc1.lat = position.coords.latitude;
							$scope.calibrate.loc1.long = position.coords.longitude;
							$scope.calibrate.loc1.devDir = $scope.orientation.deviceDir;
							$scope.calibrate.distance = 0;
							$scope.calibrate.bearing = 0;
							$scope.calibrate.calibrating = true;
							$scope.calibrate.ended = false;
							$scope.msg = "Keep the needle green and follow it while calibrating";
							$scope.rImg = $scope.compassImg.rImgCalib;
							$scope.rotateCompass = 0;
							$scope.calibrate.interval = setInterval(function() {
														
																 },1000);
							}, function failureCallback(reason) {					
								alert('error getting location');				
						});
					}
		
					$scope.calibStop = function() {
						$scope.calibrate.loc2.devDir = $scope.orientation.deviceDir;
						geoLocSvce.getLoc().then(function successCallback(position) {				
							//Store this device current poaition
							$scope.myLoc.latitude = position.coords.latitude;
							$scope.myLoc.longitude = position.coords.longitude;
							$scope.calibrate.loc2.lat = position.coords.latitude;
							$scope.calibrate.loc2.long = position.coords.longitude;
							$scope.calibrate.distance = geoLocSvce.calcDistance($scope.calibrate.loc1,$scope.calibrate.loc2);
							var r = $scope.calibrate.loc2.devDir - geoLocSvce.googleBearing($scope.calibrate.loc1,$scope.calibrate.loc2);
							if(r < 0) {
								r += 360;
							}
							$scope.orientation.initOffset = r
							$scope.orientation.accuracy = 10;
							$scope.calibrate.bearing = $scope.orientation.initOffset;
							$scope.msg = "Done! Calibration is complete. Hit start to repeat, or close this window to continue."
							$scope.calibrate.calibrating = false;
							$scope.calibrate.ended = true;
							$scope.rImg = $scope.compassImg.rImg1;
							alert('Stopped calibrating. Distance covered: '+ (Math.round($scope.calibrate.distance*100)/100)+'. Bearing: '+$scope.orientation.initOffset+'. Lat1: '+$scope.calibrate.loc1.lat+' Lat2: '+$scope.calibrate.loc2.lat+' Long1: '+$scope.calibrate.loc1.long+' Long2: '+$scope.calibrate.loc2.long);
							}, function failureCallback(reason) {					
								alert('error getting location');				
						});
					}
					
					$scope.close = function() {
						ngDialog.close($rootScope.dialog);
					}
					
				}//end controller
			};//end return function
										   
	}]);

compassModule.directive('validateName', [validateName]);

function validateName() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function linkFn(scope, element, attributes, ngModelController) {
      	ngModelController.$parsers.unshift(function(value){
			//If main device list populated check name does not exist already
			if (value) {
				var valid = true;
				for(i=0;i<scope.deviceList.length;i++) {
					if(scope.deviceList.id == value) {
						valid = false;
					}
			}
			//basic anti-XSS html tag prevent
			for(j=0;j<value.length;j++) {
				if((value.charAt(j)=='<') || (value.charAt(j)=='>') || (value.charAt(j)=='\/')) {
					valid = false;
				}
			}
		  	console.log('valid='+valid);
         	ngModelController.$setValidity('invalidInput', valid);
        }

        return valid ? value : undefined;
      });
    }
  }
}

compassModule.directive('keyEnter', function () {
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


compassModule.directive('rotate', function () {
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

compassModule.factory("Compare", [function() {
										   
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

compassModule.factory('AuthSvce', ['$http','LocStore',function($http,locStore) {
	
			var service = {};
				//var apiUrl = 'https://parasang.net/compass/api/';
				var apiUrl = 'https://pointercontact.com/api/';
			
			service.checkToken = function(rqid,jwt) {
				var endPoint = 'check_token';
				var auth = "Bearer " + jwt;
				var url = apiUrl + endPoint;
				var args = {
					rqid: rqid
				};
				var headers = {
					'headers': {'Authorization': auth}
				};
				return $http.post(url,args,headers);				
			}
			
			service.refreshToken = function(rqid,id) {
				var endPoint = 'refresh_token';
				var args = {
					rqid: rqid,
					id: id
				}
				return $http.post(apiUrl+endPoint,args);				
			}
			
			service.cancelToken = function(rqid,jwt) {
				var endPoint = 'cancel_token';
				var auth = "Bearer " + jwt;
				var url = apiUrl + endPoint;
				var args = {
					rqid: rqid
				};
				var headers = {
					'headers': {'Authorization': auth}
				};
				return $http.post(url,args,headers);				
			}
			
			return service;					
	
	}]);
			

compassModule.factory("ApiSvce", ['$q', '$window', '$rootScope', '$http', 'AuthSvce', function ($q, $window, $rootScope, $http, authSvce) {
																				   
			
			//var apiUrl = 'https://parasang.net/compass/api/';
			var apiUrl = 'https://pointercontact.com/api/';
			var token = null;
			var service = {};
			
			service.test = function() {
				alert("OK");
			}
			
			service.setToken = function(jwt) {
				token = jwt;
			}
			
			service.getToken = function() {
				return token;
			}
	
			service.putLatest = function(args) {
				if(!token) {
					return "Token not set";
				}
				var endPoint = 'ploc';
				//args.headers = {authorization: 'Bearer '+token};
				return $http.post(apiUrl+endPoint,args,{headers: {Authorization: 'Bearer '+token}});
			}
			
			service.getLatest = function(rqid,id,idx) {
				if(!token) {
					return "Token not set";
				}
				var endPoint = 'gloc';
				var args = {
					headers: {authorization: 'Bearer '+token}
				}
				return $http.get(apiUrl+endPoint+'?rqid='+rqid+'&q=' + id,args);
			}
			
			service.getLinksLatest = function(rqid,links) {
				if(!token) {
					return "Token not set";
				};
				var args = {
					rqid: rqid,
					links: links
				};
				var endPoint = 'glocs';
				return $http.post(apiUrl+endPoint,args,{headers: {Authorization: 'Bearer '+token}});
			}
			
			service.getLinkLoc = function(id,idx) {
				if(!token) {
					return "Token not set";
				}
				var endPoint = 'gloc';
				var args = {
					headers: {authorization: 'Bearer '+token}
				}
				return $http.get(apiUrl+endPoint+'?q=' + id,args).success((function(idx) {
					return function(data) {
						//console.log('idx='+idx);
					}
				})(idx));
			}
			
			service.addDevice = function(args) {
				if(!token) {
					return "Token not set";
				}
				var endPoint = 'add_device';
				return $http.post(apiUrl+endPoint,args,{headers: {Authorization: 'Bearer '+token}});
			}
			
			service.removeDevice = function(args) {
				if(!token) {
					return "Token not set";
				}
				var endPoint = 'remove_device';
				return $http.post(apiUrl+endPoint,args,{headers: {Authorization: 'Bearer '+token}});
			}
			
			service.listDevices = function(rqid, simple, online) {
				if(!token) {
					return "Token not set";
				}
				if(typeof rqid == 'undefined') {
					return false;
				}
				else {
					
					var qStr = '?rqid='+rqid;
					if(typeof simple != 'undefined') {
						qStr += "&simple="+simple;
					}
					if(typeof online != 'undefined') {
						qStr += "&online="+online;
					}
					var endPoint = 'devices';
					var args = {
						headers: {Authorization: 'Bearer '+token}
					}
					return $http.get(apiUrl+endPoint+qStr,args);
				
				}
			}
			
			service.listDevicesSimple = function(rqid, online) {
					
					var qStr = '';
					if(typeof online != 'undefined') {
						qStr += "?online="+online;
					}				
					var endPoint = 'devices_simple';
					return $http.get(apiUrl+endPoint+qStr);
				
			}
			
			service.getCountries = function(rqid) {
								
					var endPoint = 'get_countries';
					var args = {
					headers: {authorization: 'Bearer '+token}
					};
					return $http.get(apiUrl+endPoint+'?rqid=' + rqid,args);	
			
			}
			
			service.getCities = function(rqid,country) {
								
					var q = '?rqid=' + rqid;
					q += (typeof country == 'undefined') ? '' : '&country='+country;
					var endPoint = 'get_cities';
					var args = {
					headers: {authorization: 'Bearer '+token}
					};
					return $http.get(apiUrl+endPoint+q,args);	
			
			}
			
			service.getMyLinks = function(rqid) {
				if(!token) {
					return "Token not set";
				}
				var endPoint = 'get_links';
				var args = {
					headers: {authorization: 'Bearer '+token}
				};
				return $http.get(apiUrl+endPoint+'?rqid=' + rqid,args);				
			}
			
			
			service.requestLink = function(rqid,id) {
				if(!token) {
					return "Token not set";
				}
				var endPoint = 'request_link';
				var args = {
					rqid: rqid,
					id: id
				}
				return $http.post(apiUrl+endPoint,args,{headers: {Authorization: 'Bearer '+token}});				
			}
			
			service.acceptLink = function(rqid,linkid) {
				if(!token) {
					return "Token not set";
				}
				var endPoint = 'link_status';
				var args = {
					rqid: rqid,
					linkid: linkid,
					status: 2
				}
				return $http.post(apiUrl+endPoint,args,{headers: {Authorization: 'Bearer '+token}});				
			}
			
			service.pauseLink = function(rqid,linkid) {
				if(!token) {
					return "Token not set";
				}
				var endPoint = 'link_status';
				var args = {
					rqid: rqid,
					linkid: linkid,
					status: 3
				}
				return $http.post(apiUrl+endPoint,args,{headers: {Authorization: 'Bearer '+token}});				
			}
			
			service.revokeLink = function(rqid,linkid) {
				if(!token) {
					return "Token not set";
				}
				var endPoint = 'remove_link';
				var args = {
					rqid: rqid,
					linkid: linkid
				}
				return $http.post(apiUrl+endPoint,args,{headers: {Authorization: 'Bearer '+token}});				
			}
			
			service.linkStatus = function(rqid,linkid,status) {
				if(!token) {
					return "Token not set";
				}
				var endPoint = 'link_status';
				var args = {
					rqid: rqid,
					linkid: linkid,
					status: status
				}
				return $http.post(apiUrl+endPoint,args,{headers: {Authorization: 'Bearer '+token}});				
			}
			
			service.isOnline = function(id) {
				if(!token) {
					return "Token not set";
				}
				var endPoint = 'device';
				var args = {
					headers: {authorization: 'Bearer '+token}
				}
				return $http.get(apiUrl+endPoint+'?id=' + id,args);				
			}
			
			service.checkin = function(rqid,id,bg) {
				
				if(!token) {
					return "Token not set";
				}
				var endPoint = 'checkin';
				var bgColor = (typeof bg == 'undefined') ? null : bg;
				var args = {
					rqid: rqid,
					id: id,
					bg: bgColor
				}
				return $http.post(apiUrl+endPoint,args,{headers: {Authorization: 'Bearer '+token}});				
			}
			
			service.checkout = function(rqid,id) {
				if(!token) {
					return "Token not set";
				}
				var endPoint = 'checkout';
				var args = {
					rqid: rqid,
					id: id
				}
				return $http.post(apiUrl+endPoint,args,{headers: {Authorization: 'Bearer '+token}});				
			}
			
			service.testAuth = function(rqid) {
				if(!token) {
					return "Token not set";
				}
				var auth = "Bearer " + token;
				var endPoint = 'test_auth';
				var url = apiUrl + endPoint;
				var args = {
					rqid: rqid
				};
				var headers = {
					'headers': {'Authorization': auth}
				};
				return $http.post(url,args,headers);				
			}
							
			return service;
			
	}])

compassModule.factory("GeoLocSvce", ['$q', '$window', '$rootScope','uiGmapGoogleMapApi',function ($q, $window, $rootScope,uiGmapGoogleMapApi) {
																								  
			var gmap;
			
			uiGmapGoogleMapApi.then(function(maps) {
					gmap = maps;					
				});
																				   
			var service = {};
			
			//return current device location
			service.getLoc = function() {
					var deferred = $q.defer();
			
					if (!$window.navigator) {
						$rootScope.$apply(function() {
							deferred.reject(new Error("Geolocation is not supported"));
						});
					} else {
						$window.navigator.geolocation.getCurrentPosition(function (position) {
							$rootScope.$apply(function() {
								deferred.resolve(position);
							});
						}, function (error) {
							$rootScope.$apply(function() {
								deferred.reject(error);
							});
						});
					}
			
					return deferred.promise;
			}
			
			//get distance between 2 locations in metres
			service.calcDistance = function(loc1,loc2) {
				
				loc1.lat = loc1.hasOwnProperty('latitude') ? loc1.latitude : loc1.lat;
				
				if(loc1.hasOwnProperty('longitude')) {
					loc1.long = loc1.longitude;
				}
				else if(loc1.hasOwnProperty('lon')) {
					loc1.long = loc1.lon;
				}
				
				loc2.lat = loc2.hasOwnProperty('latitude') ? loc2.latitude : loc2.lat;
				
				if(loc2.hasOwnProperty('longitude')) {
					loc2.long = loc2.longitude;
				}
				else if(loc2.hasOwnProperty('lon')) {
					loc2.long = loc2.lon;
				}
			
				var rlat1 = service.toRadians(loc1.lat), rlat2 = service.toRadians(loc2.lat), rlon = service.toRadians(loc2.long-loc1.long), R = 6371e3; // gives d in metres
				var d = Math.acos( Math.sin(rlat1)*Math.sin(rlat2) + Math.cos(rlat1)*Math.cos(rlat2) * Math.cos(rlon) ) * R;
				return d;
				
			}
			
			service.calcCenter = function(points) {
				var tlat = 0, tlong = 0, cpts = [];
				var plen=points.length;

				cpts.push(points[0]);
				
				for(i = 1; i < plen; i++) {
					var valid = true;

					for(j=0;j<cpts.length;j++) {
						if(service.calcDistance(points[i].loc,cpts[j].loc) < 20) {
							valid = false;
						}
					}
					if(valid) {
						cpts.push(points[i]);
					}
				}
				
				for(k=0;k<cpts.length;k++) {
					tlat += parseFloat(cpts[k].loc.lat);
					tlong += parseFloat(cpts[k].loc.long);
				}
				
				var cloc = {lat: tlat/cpts.length, long: tlong/cpts.length}
				
				return cloc;
			
			}
			
			//get bearing from location 1 to location 2
			service.calcBearing = function(loc1,loc2) {
				
				var y = Math.sin(loc2.long-loc1.long) * Math.cos(loc2.lat);
				var x = Math.cos(loc1.lat)*Math.sin(loc2.lat) - Math.sin(loc1.lat)*Math.cos(loc2.lat)*Math.cos(loc2.long-loc1.long);
				var brng = service.toDegrees(Math.atan2(y, x));
				return brng;			
			}
			
			//get google maps spherical bearing from location 1 to location 2
			service.xgoogleBearing = function(loc1,loc2) {
				console.log(loc1.lat+" "+loc1.long+" "+loc2.lat+" "+loc2.long);
				//var p1 = new google.maps.LatLng(loc1.lat,loc1.long);
				//var p2 = new google.maps.LatLng(loc2.lat,loc2.long);
				//var b = google.maps.geometry.spherical.computeHeading(p1, p2);
				//	b+=360;
				//}
				//return b;
			}
			
			service.googleBearing = function(loc1,loc2) {
				
				var bearing = 0;
					
					var p1 = new gmap.LatLng(loc1.lat,loc1.long);
					var p2 = new gmap.LatLng(loc2.lat,loc2.long);
					bearing =  gmap.geometry.spherical.computeHeading(p1, p2);
					console.log("BEARING: "+bearing);
				
				return bearing;
			
			}
			
			service.ygoogleBearing = function(loc1,loc2) {
				
				var bearing = 0;
					
				uiGmapGoogleMapApi.then(function(maps) {
					var p1 = new maps.LatLng(loc1.lat,loc1.long);
					var p2 = new maps.LatLng(loc2.lat,loc2.long);
					bearing =  maps.geometry.spherical.computeHeading(p1, p2);
					console.log("BEARING: "+bearing);
					
				});
				
				return bearing;
			
			}
			
			//calculate orientation of device relative to target bearing
			service.calcDiff = function(geoDir,bearing) {
				var x = bearing > 0 ? Math.abs((360 - geoDir) - bearing) : Math.abs(geoDir + bearing);
				return x;
			}
			
			//convert degrees to radians
			service.toRadians = function(Value) {
					return Value * Math.PI / 180;
			}
				
			//convert radians to degrees
			service.toDegrees = function(Value) {
					return Value * 180 / Math.PI;
			}
					
			return service;
			
	}])


compassModule.factory("PostCodeSvce", ['$rootScope','$http','$q','uiGmapGoogleMapApi',function($rootScope,$http,$q,uiGmapGoogleMapApi) {
																				   
			var geocoder = null;
        	var infowindow = null;
			
			uiGmapGoogleMapApi.then(function(maps) {
					geocoder = new maps.Geocoder;
        			infowindow = new maps.InfoWindow;					
				})
			
			var service = {};
			
			// Return lat long from postcode
			service.getPostCodeLoc = function(code) {
				
				var baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:";							
				var qStr = code;
				var credStr = "";
		
				return $http.get(baseUrl + qStr +credStr);
				
			}
			
			// Return postcode from lat long			
			service.postcodeFromLoc = function(loc) {

				var latlng = {lat: parseFloat(loc.lat), lng: parseFloat(loc.long)};
				var deferred = $q.defer();
				var result;
				
				geocoder.geocode({'location': latlng}, function(results, status) {
					  if (status === 'OK') {					  
							$rootScope.$apply(function() {
								deferred.resolve(results);
							});
					  } else {
						$rootScope.$apply(function() {
								deferred.reject();
							})
					  }
				});
				
				return deferred.promise;
				
			}
			
			
			//return postcode in standard format
			service.formatPostCode = function(code) {
					var postcodeRegEx = /(^[A-Z]{1,2}[0-9]{1,2})([0-9][A-Z]{2}$)/i; 
					return code.replace(postcodeRegEx,"$1 $2"); 
			}
			
			//check input string can form part of valid postcode
			service.postCodeRunCheck = function(code) {
					var postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i; 
					return postcodeRegEx.test(code);				
			}
			
			//check input string can form part of valid london postcode
			service.londonPostCodeRunCheck = function(code,validCodes) {

				var data = {
					valid: false,
					msg: ''
				}
				
				if(code.length>0) {
						console.log(code);
						var firstLtr = ["E","N","S","W","H","K"];
						if(firstLtr.indexOf(el.value.substr(0,1).toUpperCase()) == -1) {
							data.msg = 'London postcodes must begin with S,W,E or N';
						}
						else if(code.length == 2) {
							//var validCodes = service.validCodes().data;
							if(validCodes) {
								var len = validCodes.length;
								for(i=0;i<len;i++) {
									if(validCodes[i].substr(0,2) == el.value.substr(0,2).toUpperCase()) {
										data.valid = true;
										data.msg = 'valid';
									}
								}
								if(!valid) {
									data.msg = 'Invalid entry for a London postcode';
								}
							}
							else {
								data.valid = true;
								data.msg = 'No valid codes list to test against';
							}
							
						}
						else {
							data.msg = 'Enter a London postcode';
						}
					return data;
				}
			}
			
			//Regex test for London postcode
			service.londonPcodeValidate = function(code) {
				
				var re = new RegExp(/^[nsew][wec0-9][0-9][a-z0-9]?\s?[0-9][a-z]{2}$/i);
				if (re.test(code)) {
					return true;
				} 		
				return false;
				
			}
			
			//Retrieve list of valid start strings in postcodes
			service.validCodes = function() {				
				return $http.get("data/postcodes.json");				
			}
			
		
			return service;
			
	}])

			
compassModule.factory('LocStore',[function() {
	
			var service = {};
			
			service.storage = function() {
				var mod = new Date;
				try {
					localStorage.setItem(mod, mod);
					localStorage.removeItem(mod);
					return true;
				} catch (exception) {
					return false;
				}
			}
			
			service.set = function(name,data) {
				if(service.storage()) {
					localStorage.setItem(name, JSON.stringify(data));
					return true;
				}
				return false;
			}
			
			service.clear = function(name) {
				if(service.storage()) {
					localStorage.removeItem(name);
					return true;
				}
				return false;
			}
			
			service.wipe = function(name) {
				if(service.storage()) {
					localStorage.clear();
					return true;
				}
				return false;
			}
			
			service.get = function(name) {
				if(service.storage()) {
					var data = JSON.parse(localStorage.getItem(name));
					return data;
				}
				return false;
			}
			
			service.sessionSet = function(name,data) {
				if(service.storage()) {
					sessionStorage.setItem(name, JSON.stringify(data));
					return true;
				}
				return false;
			}
			
			service.sessionGet = function(name) {
				if(service.storage()) {
					
					var data = JSON.parse(sessionStorage.getItem(name));
					return data;
				}
				return false;
			}
			
			service.sessionClear = function(name) {
				if(service.storage()) {
					localStorage.removeItem(name);
					return true;
				}
				return false;
			}
			
			return service;
	
	}]);


compassModule.factory('ArraySvce',['$rootScope',function($rootScope) {
															 
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
	
compassModule.factory('DataObj',['$rootScope',function($rootScope) {
															 
			var service = {};

			service.device = function() {
				this.id = null;
				this.mark_idx = 0;
				this.options = null;
				this.marker_icon = 'img/marker_spot_grn.png';
				this.avatar = 'default.jpg';
				this.bg = null;
				this.type = 'device'
				this.dynamic = true;
				this.postcode = false;
				this.bearingSet = true;
				this.lat = 0;
				this.long = 0;
				this.latitude = 0;
				this.longitude = 0;
				this.rotateCompass = 0;
				this.rotateNeedle = 0;
				this.bearing = null;
				this.address = null;
				this.address2 = null;
				this.distance = 0;
				this.diff = 0;
				testMode = false;
			}
			
			return service;
					
		}]);


compassModule.value('jwt',{id:'',token:'AIzaSyCT_mh8hi99Zyn6yMuCtUIEmajHRdpFCmo'});