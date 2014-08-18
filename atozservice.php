<?php
	// Proxies requests to the NHS server
	// must contain $apikey
	include_once "config.php"; 
	
	error_reporting(~0);
	ini_set('display_errors', 1);
	
	$kv = array();
	
	if ($_POST) {
	    
	    foreach ($_POST as $key => $value) {
	        $kv[] = stripslashes($key) . "=" . stripslashes($value);
	    }
	}
	
	$kv[] = 'apikey' . "=" . $apikey;
	$query_string = join("&", $kv);
		

	$ch = curl_init();
	curl_setopt ($ch, CURLOPT_URL, $_GET['requrl'] .'?'. $query_string);
	curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 5);

	$file_contents = curl_exec($ch);	

	curl_close($ch);
	echo $file_contents;
?>