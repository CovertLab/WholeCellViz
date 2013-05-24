<?php
##########
# getSeriesClasses.php
# Fetches list of all classes from the database.
#
# Author: Ruby Lee, Covert Lab
##########

include 'configuration.php';

$query = "SELECT * FROM classes";
$result = mysql_query($query);
$array = array();
while($r = mysql_fetch_assoc($result)) {
	$array[] = $r;
}

header('Content-type: application/json; charset=utf-8');
$txt = json_encode($array);
header('Content-length: ' . strlen($txt));
echo $txt;