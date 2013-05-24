<?php
##########
# indexSimulations.php
# Indexes simulations.
#
# Author: Jonathan Karr, Covert Lab
##########
include 'configuration.php';

$query = sprintf("SELECT * FROM `simulations` WHERE include_in_search=1");
$result = mysql_query($query) or die('Invalid query: ' . mysql_error());

$simArr = array();
while($sim = mysql_fetch_assoc($result)){
	array_push($simArr, $sim);
}

//return metadata in JSON format
header('Content-type: application/json; charset=utf-8');
$txt = json_encode($simArr);
header('Content-length: ' . strlen($txt));
echo $txt;