compassModule.factory('MapSet',['$rootScope','GeoLocSvce','uiGmapGoogleMapApi',function($rootScope,geoLocSvce,uiGmapGoogleMapApi) {
													   
			var service = {};
					
			service.midPt = function(baseLoc,newLoc) {						
				var mnLat = Math.min(parseFloat(newLoc.lat),parseFloat(baseLoc.lat));
				var mxLat = Math.max(parseFloat(newLoc.lat),parseFloat(baseLoc.lat));
				var mnLng = Math.min(parseFloat(newLoc.long),parseFloat(baseLoc.long));
				var mxLng = Math.max(+newLoc.long,+baseLoc.long);				
				var cloc = {
					lat: mnLat + (mxLat-mnLat)*0.5,
					long: mnLng + (mxLng-mnLng)*0.5
				}									
				return cloc;							
			}
			
			service.calcCenter = function(points) {
				var tlat = 0, tlong = 0, cpts = [];
				var plen=points.length;

				cpts.push(points[0]);
				
				for(i = 1; i < plen; i++) {
					var valid = true;

					for(j=0;j<cpts.length;j++) {
						if(geoLocSvce.calcDistance(points[i].loc,cpts[j].loc) < 20) {
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
			
			service.getMarkerBounds = function(points) {
				
				var minLat=parseFloat(points[0].loc.lat),maxLat=parseFloat(points[0].loc.lat),minLong=parseFloat(points[0].loc.long),maxLong=parseFloat(points[0].loc.long);
				
				angular.forEach(points,function(v,i) {
						minLat = Math.min(minLat,v.loc.lat);
						maxLat = Math.max(maxLat,v.loc.lat);
						minLong = Math.min(minLong,v.loc.long);
						maxLong = Math.max(maxLong,v.loc.long);
						console.log(v.loc.lat+", "+v.loc.long)
					});
				
				console.log("minLat="+minLat+" maxLat="+maxLat+" minLong="+minLong+" maxLong="+maxLong);
				
				
				if(minLat == maxLat && minLong == maxLong) {
					return false;
				}
				else {
					var box = new google.maps.LatLngBounds(new google.maps.LatLng(maxLat, maxLong), new google.maps.LatLng(minLat, minLong));			 
				 	return box;
				}
				
			}
			
			service.getZoom = function(z,d) {
							
				if(d>25000) {
					z-=5
				}
				else if(d>8000) {
					z-=4
				}
				else if(d>2500) {
					z-=3
				}
				else if(d>1000) {
					z -= 2;
				}
				else if(d>650) {
					z -= 1;
				}
				else if(d>350) {
					//
				}
				else if(d>150) {
					z += 1;
				}
				else {
					z += 2;
				}
						
				return z;	
			}
			
			service.getZoomByBounds = function( map, bounds ){
				 // var MAX_ZOOM = map.mapTypes.get( map.getMapTypeId() ).maxZoom || 18 ;
				 // var MIN_ZOOM = map.mapTypes.get( map.getMapTypeId() ).minZoom || 0 ;
						
				  var MAX_ZOOM = 17 ;
				  var MIN_ZOOM = 0 ;
				
				  var ne= map.getProjection().fromLatLngToPoint( bounds.getNorthEast() );
				  var sw= map.getProjection().fromLatLngToPoint( bounds.getSouthWest() ); 
				
				  var worldCoordWidth = Math.abs(ne.x-sw.x);
				  var worldCoordHeight = Math.abs(ne.y-sw.y);
				
				  //Fit padding in pixels 
				  var FIT_PAD = 20;
				
				  for( var zoom = MAX_ZOOM; zoom >= MIN_ZOOM; --zoom ){ 
					  if( worldCoordWidth*(1<<zoom)+2*FIT_PAD < $(map.getDiv()).width() && 
						  worldCoordHeight*(1<<zoom)+2*FIT_PAD < $(map.getDiv()).height() )
						  return zoom;
				  }
				  return 0;
			}
			
			service.mapsCenter = function() {

				if($rootScope.bigMap) {
					
					var c =  new google.maps.LatLng($rootScope.bigMap.gpos.lat,$rootScope.bigMap.gpos.long);
					$rootScope.bigMap.setCenter(c);
				}
				
				angular.forEach($rootScope.maps,function(v,i) {
						v.setCenter(v.gpos);							   
				});
				
			}
			
			service.resetMap = function(map) {

				if(!map.pointMarkers || map.pointMarkers.length == 0) {
						map.panTo(map.locSpot.position);
						return false;
				}
				var gPos = new google.maps.LatLng(map.gpos.lat,map.gpos.long);
				map.setZoom(map.defZoom);
				map.setCenter(gPos);
				
			}			
							
			return service;
					
		}]);// JavaScript Document