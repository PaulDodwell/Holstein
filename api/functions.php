<?php

function getTableData($db,$table,$args) {
	$q="SELECT * FROM ".$table." order by ?";
   	$stmt = $db->prepare($q);
	$stmt->execute($args);
   	return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getData($db,$query) {
   	$stmt = $db->prepare($query);
	$stmt->execute();
   	return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getDataRow($db,$query) {
   	$stmt = $db->prepare($query);
	$stmt->execute();
   	return $stmt->fetch(PDO::FETCH_ASSOC);
}


function jsonToArray($x) {
	$y = str_replace("\\", "",$x);
	return json_decode($y,true);
}

function unstrip_array($array){
    foreach($array as &$val){
        if(is_array($val)){
            $val = unstrip_array($val);
        }else{
            $val = stripslashes($val);
        }
    }
	return $array;
}

function _convert($content) {
    if(!mb_check_encoding($content, 'UTF-8')
        OR !($content === mb_convert_encoding(mb_convert_encoding($content, 'UTF-32', 'UTF-8' ), 'UTF-8', 'UTF-32'))) {

        $content = mb_convert_encoding($content, 'UTF-8');

        if (mb_check_encoding($content, 'UTF-8')) {
            // log('Converted to UTF-8');
        } else {
            // log('Could not be converted to UTF-8');
        }
    }
    return $content;
}

function write_file($f,$content) {
	$file = $f.'.txt'; 
	if (file_exists($file)) {
           $buffer = file_get_contents($file) . "\n" . $content;
   }
	else {
           $buffer = $content;
    }
    
   if(!file_put_contents($file, $buffer)) {
   		return false;
    }
    else {
    	return true;
    }
}

?>