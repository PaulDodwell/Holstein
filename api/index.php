<!DOCTYPE html>

<head>
    <meta charset='UTF-8'>
    <title>Compass Test</title>
    
    <?php 
	$subfolder = explode('/', $_SERVER['REQUEST_URI']);
	$site_root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST']  . '/' . $subfolder[1] . '/' . $subfolder[2] . '/';
	?>
    
    
	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-capable" content="yes" />
            
    <link id="set_style" rel="stylesheet" href="css/bootstrap.css" type="text/css" />
	<link id="set_style" rel="stylesheet" href="css/bootstrap_ms.css" type="text/css" />
    <link id="set_style" rel="stylesheet" href="css/ngDialog.css" type="text/css" />
    <link id="set_style" rel="stylesheet" href="css/ngDialog-custom-width.css" type="text/css" />
    <link id="set_style" rel="stylesheet" href="css/ngDialog-theme-default.css" type="text/css" />
    <link rel='stylesheet' href='css/styles.css' />
    
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Electrolize" rel="stylesheet">
    
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
    
	<script type="text/javascript" src="js/angular.min.js"></script>
    <script type="text/javascript" src="js/angular-animate.min.js"></script>
	<script type="text/javascript" src="js/ngDialog.min.js"></script>
    <script src='js/compass.js'></script>
    
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCT_mh8hi99Zyn6yMuCtUIEmajHRdpFCmo"></script>
    
	<script type='text/javascript'>var siteRoot ='<?php echo $site_root ?>';</script>

</head>

<body ng-app='compassModule' class='bg_fade' ng-class="{'lukewarm':orientation.distance < params.lukewarm,'warm':orientation.distance < params.warm,'hot':orientation.distance < params.hot}" ng-controller='mainCtrl'>
	<div class='main_content  container-fluid'>
    <div class='row'>
	<div class='col-xs-1'></div>
    <div id="main_control" class='col-md-8 col-xs-10 noselect'>
    	<h4 ng-show="!orientation.supported">Device orientation not supported</h3>	
        <h5>My Location is {{myLoc.lat | number : 6}}, {{myLoc.long | number : 6}}</h4>
        <h5 ng-show="orientation.bearingSet">Search Location is {{srchLoc.lat | number : 6}}, {{srchLoc.long | number : 6}}</h4>
    </div>
    <div class='col-xs-1'></div>
    </div>
    <div class='row noselect'>
    <div class='col-xs-1'></div>
     <div id="compass_container" class='col-xs-10'>
     	<div class='compass_circle'></div>
     	<div id='compass_needle' class='compass_rose' degrees='compass.rotateCompass' rotate></div>
        <div id='bearing_needle' ng-show='flags.bearingSet' class='compass_needle bearing_needle fader' ng-class="{'needle_lock':compass.diff() < 4,'needle_near':compass.diff() < 8}" degrees='compass.rotateNeedle' rotate></div>
     </div>
     <h4 ng-show="postcode.code" class="fader">Pointing to postcode: {{postcode.code | uppercase}} <span ng-show='flags.testMode'>at {{orientation.bearing | number : 0}} deg</span></h4>
     <h5>{{srchLoc.address}}</h5>
     <h3><a style='color:#00ADCF;' href='#' ng-click="getPostCode()">Find</a><a style='color:#ccc;' href='#' ng-click="clearBearing()"> Clear</a></h3>
     <h5 ng-show='flags.testMode'>Dir= {{orientation.geoDir | number: 0}} ({{orientation.method}}) dist= {{orientation.distance | number: 0}}</h5>
     <h5 ng-show='flags.testMode'>Needle bearing: {{orientation.bearing | number: 0}} deg. Diff: {{compass.diff() | number: 1}}</h5>
     <h5 ng-show='flags.testMode'>Init Offset: {{orientation.initOffset | number: 0}}  Acc: {{orientation.accuracy}} currAcc: {{orientation.currAccuracy}} Relative dir: {{orientation.deviceDir | number: 0}}</h5>
     <p>Devices</p>
     <ul>
     	<li ng-repeat="dev in deviceList" ng-style="{'font-size':'1em','padding-left':'24px'}">
        	<p>{{dev.id}}: <span class='red' ng-show="dev.online = 1">ONLINE</span></p>
        </li>
     </ul>
     <p>Location history for {{thisDevice.name}}</p>
    <ul>
    	<li ng-repeat="pos in trackPos" ng-style="{'font-size':'0.8em','padding-left':'24px'}">
        	{{pos.stamp}}: Lat: {{pos.lat}}, Long: {{pos.lon}} Dir: {{pos.dir | number: 0}} deg<br>
        </li>
    </ul>
    <div class='col-xs-1'></div>
    </div>
    </div>
    </div>
</body>

</html>