<?php
##########
# getKBData.php
# Returns knowledge base data.
#
# Author: Jonathan Karr, Covert Lab
##########

include 'configuration.php';

$type = $_GET['type'];
	
header('Content-type: application/json; charset=utf-8');
if ($useLocalWholeCellKBData){
	$path = sprintf($wholeCellKBDataPath, $type);
	header('Content-length: ' . filesize($path));
	header("Expires: " . gmdate("D, d M Y H:i:s", time() + $cacheDuration) . " GMT");
	header("Pragma: cache");
	header("Cache-Control: max-age=$cacheDuration");
	header('Last-Modified: '. gmdate(DATE_RFC1123, filemtime($path)));
	readfile($path);
}else{
	$data = file_get_contents(sprintf($wholeCellKBDataURL, $type));	
	header('Content-length: ' . strlen($data));
	header("Expires: " . gmdate("D, d M Y H:i:s", time() + $cacheDuration) . " GMT");
	header("Pragma: cache");
	header("Cache-Control: max-age=$cacheDuration");
	header('Last-Modified: '. gmdate(DATE_RFC1123, time()));
	echo $data;
}