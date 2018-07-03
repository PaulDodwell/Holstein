<?php

require_once('functions.php');
require_once('API.class.php');
require_once('pointersAPI.class.php');
require_once('User.class.php');
require_once('APIkey.class.php');

// Requests from the same server don't have a HTTP_ORIGIN header
if (!array_key_exists('HTTP_ORIGIN', $_SERVER)) {
    $_SERVER['HTTP_ORIGIN'] = $_SERVER['SERVER_NAME'];
}

$args = array(
		'dataBase' => 'parasang_pointers',
		'userName' => 'parasang_pjd',
		'pw' => 'hbmo2001'
			  );

try {
    $API = new pointersAPI($_REQUEST['request'], $_SERVER['HTTP_ORIGIN'],$args);
    echo $API->processAPI();
} catch (Exception $e) {
    echo json_encode(Array('error' => $e->getMessage()));
}

//try {
//    $USER = new User( $_SERVER['HTTP_ORIGIN'],$API->conn);
//} catch (Exception $e) {
//    echo json_encode(Array('error' => $e->getMessage()));
//}

//try {
//    $APIKEY = new APIkey( $_SERVER['HTTP_ORIGIN'],$API->conn);
//} catch (Exception $e) {
//    echo json_encode(Array('error' => $e->getMessage()));
//}

//echo $USER->listUsers();

//echo $APIKEY->listKeys();
 
?>