<?php
##########
# configuration.php
# Configuration parameters.
#
# Author: Ruby Lee, Covert Lab
# Author: Jonathan Karr, Covert Lab
##########

//configuration
$user = "wholecellviz";
$password = "wholecellviz";
$host = "localhost";
$database = "wholecellviz";
#$simulationsBaseDir = '/home/projects/WholeCell/simulation/output/runSimulation';
$simulationsBaseDir = '/home/projects/WholeCellViz/data/sim';

$useLocalWholeCellKBData = true;
$wholeCellKBDataPath = 'data/kb/%s.json';
$wholeCellKBURL = 'http://wholecellkb.stanford.edu';
$wholeCellKBDataURL = $wholeCellKBURL.'/list/Mgenitalium/%s/?format=json';

$cacheDuration = 7 * 24 * 60 * 60; //7 days

//create database connection
$con = mysql_connect($host, $user, $password)
  or die ("Couldn't connect to server.");
$dbs = mysql_select_db($database, $con);
