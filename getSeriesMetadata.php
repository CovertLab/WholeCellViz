<?php
##########
# getSeriesMetadata.php
# Fetches attribute information from database.
#
# Author: Ruby Lee, Covert Lab
# Author: Jonathan Karr, Covert Lab
##########
include 'configuration.php';

//get parameters
$sim_id = $_GET['sim_id'];
$class_id = $_GET['class_id'];
$attr_id = $_GET['attr_id'];

//calulate simBatch, id
$tmp = strrpos($sim_id, '_');
$simBatch = substr($sim_id, 0, $tmp);
$simIdx = substr($sim_id, $tmp+1);

//initialize metadata
$query = sprintf("SELECT * FROM simulations WHERE batch = '%s' && `index` = %d", mysql_real_escape_string($simBatch), $simIdx);
$result = mysql_query($query) or die('Invalid query: ' . mysql_error());
$tmp = mysql_fetch_assoc($result);
$md['sim_batch'] = $tmp['batch'];
$md['sim_index'] = $tmp['index'];
$md['sim_name'] = $tmp['name'];
$md['sim_category'] = $tmp['category'];
$md['sim_category_index'] = $tmp['category_index'];

//class metadata
$query = sprintf("SELECT * FROM classes WHERE id = '%s'", mysql_real_escape_string($class_id));
$result = mysql_query($query) or die('Invalid query: ' . mysql_error());
$tmp = mysql_fetch_assoc($result);
$md['class_name'] = $tmp['name'];
$md['class_display_name'] = $tmp['display_name'];
$md['class_descrip'] = $tmp['descrip'];

//attribute metadata
$query = sprintf("SELECT * FROM attributes WHERE id = '%s'", mysql_real_escape_string($attr_id));
$result = mysql_query($query) or die('Invalid query: ' . mysql_error());
$tmp = mysql_fetch_assoc($result);
$md['attr_name'] = $tmp['name'];
$md['attr_display_name'] = $tmp['display_name'];
$md['attr_descrip'] = $tmp['descrip'];
$md['attr_axis_title'] = $tmp['axis_title'];
$md['attr_visualization_class_name'] = $tmp['visualization_class_name'];

//return metadata in JSON format
header('Content-type: application/json; charset=utf-8');
$txt = json_encode($md);
header('Content-length: ' . strlen($txt));
echo $txt;