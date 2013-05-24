<?php
##########
# getSeriesData.php
# Returns model data in JSON format.
#
# Author: Jonathan Karr, Covert Lab
##########

ini_set('display_errors', '1');
ini_set('memory_limit', '1024M');
include 'configuration.php';

$sim_id = $_GET['sim_id'];
$tmp = strrpos($sim_id, '_');
$simBatch = substr($sim_id, 0, $tmp);
$simIdx = substr($sim_id, $tmp+1);
$className = $_GET['class_name'];
$attrNameFilePattern = $_GET['attr_name'];
$isAttrNameMin = array_key_exists('attr_min', $_GET);
$isAttrNameMax = array_key_exists('attr_max', $_GET);
if ($isAttrNameMin)
	$attrNameMin = floatval($_GET['attr_min']);
if ($isAttrNameMax)
	$attrNameMax = floatval($_GET['attr_max']);
$path = sprintf($simulationsBaseDir . '/%s/%s/json/%s/%s.json', 
	$simBatch, $simIdx, $className, $attrNameFilePattern);
$paths = glob($path);
	
header('Content-type: application/json; charset=utf-8');

//no file matches pattern
if (count($paths) == 0){	
	echo "Requested data not available: $path.";

//get 1 file
}elseif (count($paths) == 1){	
	header('Content-length: ' . filesize($path));
	header("Expires: " . gmdate("D, d M Y H:i:s", time() + $cacheDuration) . " GMT");
	header("Pragma: cache");
	header("Cache-Control: max-age=$cacheDuration");
	header('Last-Modified: '. gmdate(DATE_RFC1123, filemtime($path)));
	readfile($path);
	
//combine multiple files into 1
}else{
	natsort($paths);
	$arr = array(
		'label'  => $attrNameFilePattern, 
		'labels' => array(),
		'data'   => array(),
		);
	$modtime = 0;
	$attrNameRegExpPattern = str_replace('_*', '_(\d+)', $attrNameFilePattern);
	foreach ($paths as $path){
		preg_match('/' . $attrNameRegExpPattern . '/', $path, $match);
		if (($isAttrNameMin && floatval($match[1]) < $attrNameMin) || ($isAttrNameMax && floatval($match[1]) > $attrNameMax))
			continue;
		$tmp = json_decode(file_get_contents($path));
		array_push($arr['labels'], $tmp->label);
		array_push($arr['data'], $tmp->data);
		$modtime = max($modtime, filemtime($path));
	}
	$json = json_encode($arr);	
	header('Content-length: ' . strlen($json));
	header("Expires: " . gmdate("D, d M Y H:i:s", time() + $cacheDuration) . " GMT");
	header("Pragma: cache");
	header("Cache-Control: max-age=$cacheDuration");
	header('Last-Modified: '. gmdate(DATE_RFC1123, $modtime));
	echo $json;
}