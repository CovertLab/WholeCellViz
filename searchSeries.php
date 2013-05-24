<?php
##########
# searchSeries.php
# Searches database for relevant attributes.
#
# Author: Ruby Lee, Covert Lab
##########

include 'configuration.php';

$search_term = $_GET['query'];
$class_id = $_GET['class_id'];

$query = '';
if ($class_id == '0') {
	$query = sprintf("SELECT * FROM attributes WHERE include_in_search=1 AND display_name LIKE '%%%s%%' OR descrip LIKE '%%%s%%' ORDER BY display_name", 
		mysql_real_escape_string($search_term), 
		mysql_real_escape_string($search_term));
} else {
	$query = sprintf("SELECT * FROM attributes WHERE include_in_search=1 AND (display_name LIKE '%%%s%%' OR descrip LIKE '%%%s%%') AND class_id='%s' ORDER BY display_name", 
		mysql_real_escape_string($search_term), 
		mysql_real_escape_string($search_term), 
		mysql_real_escape_string($class_id));
}

$result = mysql_query($query);
$array = array();
while($r = mysql_fetch_assoc($result)) {
	$array[] = $r;
}

header('Content-type: application/json; charset=utf-8');
$txt = json_encode($array);
header('Content-length: ' . strlen($txt));
echo $txt;