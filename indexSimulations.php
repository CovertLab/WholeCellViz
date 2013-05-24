<?php
##########
# indexSimulations.php
# Indexes simulations.
#
# Author: Jonathan Karr, Covert Lab
##########

//display errors
ini_set('display_errors', 1);

//increase time limit
set_time_limit(0);

//load configuration
include 'configuration.php';

//initialize output
header('Content-type: text/plain; charset=utf-8');

//get genes
$tmp = json_decode(file_get_contents('data/kb/Gene.json'));
$genes = array();
foreach($tmp as $gene){
	$genes[$gene->wid] = $gene;
}

//clear index
mysql_query('TRUNCATE TABLE `simulations`') or die('Invalid query: ' . mysql_error());

//index simulations
$categories = array();	
$dirId = opendir($simulationsBaseDir);	
while (false !== ($batch = readdir($dirId))) {
	if (!file_exists("$simulationsBaseDir/$batch/conditions.xml"))
		continue;
		
	$conditionSet = parseConditionSet("$simulationsBaseDir/$batch/conditions.xml");
	$pbsid = getPBSID($batch, $simulationsBaseDir);	
	$idx = 0;
	foreach ($conditionSet['conditions'] as $i => $condition){
		for ($j = 0; $j < $condition['replicates']; $j++){			
			$idx++;
			echo "Indexing $batch/$idx\n";
			
			//skip simulations marked as ignore
			if (file_exists("$simulationsBaseDir/$idx/skipAnalysis"))
				continue;
			
			//get simulation status
			list($status, $statusDetails, $time, $mass, $growth, $runtime, $run, $err, $currpbsid) = 
				getSimulationStatus($batch, $pbsid, $idx, $conditionSet['nSimulations'], $simulationsBaseDir);							
			$error['simulation'] = false;
			$error['reindexing'] = false;
			$error['analysis'] = false;
			if ($err){
				$err = json_decode($err);
				foreach($err as $filetype => $type){
					$error[$type] = true;
				}
			}
				
			//calculate simulation "category" and name
			if (empty($condition['perturbations'])){
				$simCategory = 'Wild-type';
				$simCategoryHTML = $simCategory;
			}else{
				$gene = $genes[$condition['perturbations'][0]['component']];				
				$simCategory = '&Delta;'.($gene->symbol ? $gene->symbol : $gene->wid);
				$simCategoryHTML = '&Delta;'.($gene->symbol ? '<i>'.$gene->symbol.'</i>' : $gene->wid);
			}
				
			if (!array_key_exists($simCategory, $categories))
				$categories[$simCategory] = 0;
			$categories[$simCategory]++;
			$simCategoryIndex = $categories[$simCategory];
			
			//add simulation to table
			mysql_query(sprintf('INSERT INTO `simulations`  (`batch` , `index` , `name` , `category` , `category_index`, `error_simulation`, `error_reindexing`, `error_analysis`) VALUES ("%s", %d, "%s", "%s", %d, %d, %d, %d)',
					mysql_real_escape_string($batch), 
					$idx, 
					mysql_real_escape_string("$simCategoryHTML #$simCategoryIndex"), 
					mysql_real_escape_string($simCategory), $simCategoryIndex, 
					$error['simulation'], $error['reindexing'], $error['analysis']
				)) or die('Invalid query: ' . mysql_error());
		}
	}
}
closedir($dirId);

//print status message
echo "Simulations successfully indexed!\n";

/************************************
* helper functions
************************************/
function parseConditionSet($xmlFile){
	$xml = new DOMDocument();	
	$xml->load($xmlFile);
	
	//metadata
	$firstName = $xml->getElementsByTagName('conditions')->item(0)->getElementsByTagName('firstName')->item(0)->nodeValue;
	$lastName = $xml->getElementsByTagName('conditions')->item(0)->getElementsByTagName('lastName')->item(0)->nodeValue;
	$affiliation = $xml->getElementsByTagName('conditions')->item(0)->getElementsByTagName('affiliation')->item(0)->nodeValue;
	$email = $xml->getElementsByTagName('conditions')->item(0)->getElementsByTagName('email')->item(0)->nodeValue;
	$userName = $xml->getElementsByTagName('conditions')->item(0)->getElementsByTagName('userName')->item(0)->nodeValue;
	$hostName = $xml->getElementsByTagName('conditions')->item(0)->getElementsByTagName('hostName')->item(0)->nodeValue;
	$ipAddress = $xml->getElementsByTagName('conditions')->item(0)->getElementsByTagName('ipAddress')->item(0)->nodeValue;
	$revision = $xml->getElementsByTagName('conditions')->item(0)->getElementsByTagName('revision')->item(0)->nodeValue;
	$differencesFromRevision = $xml->getElementsByTagName('conditions')->item(0)->getElementsByTagName('differencesFromRevision')->item(0)->nodeValue;	
	
	//conditions
	$conditionsXML = $xml->getElementsByTagName('conditions')->item(0)->getElementsByTagName('condition');
	$conditions = array();
	for ($i = 0; $i < $conditionsXML->length; $i++)
		array_push($conditions, parseCondition($conditionsXML->item($i)));
	
	$nConditions = count($conditions);
	$nSimulations = 0;
	foreach ($conditions as $condition)
		$nSimulations += $condition['replicates'];
	
	return array(
		'firstName' => $firstName,
		'lastName' => $lastName,
		'affiliation' => $affiliation,
		'email' => $email,
		'userName' => $userName,
		'hostName' => $hostName,
		'ipAddress' => $ipAddress,
		'revision' => $revision,
		'differencesFromRevision' => $differencesFromRevision,
		'nConditions' => $nConditions,
		'nSimulations' => $nSimulations,
		'conditions' => $conditions
		);
}

function parseCondition($condition){
	$options = array();
	$parameters = array();
	$perturbations = array();
	
	$replicates = $condition->getElementsByTagName('replicates')->item(0)->nodeValue;
	$shortDescription = $condition->getElementsByTagName('shortDescription')->item(0)->nodeValue;
	$longDescription = $condition->getElementsByTagName('longDescription')->item(0)->nodeValue;
	
	$optionsXML = $condition->getElementsByTagName('option');
	$parametersXML = $condition->getElementsByTagName('parameter');
	$perturbationsXML = $condition->getElementsByTagName('perturbation');
	for ($i = 0; $i < $optionsXML->length; $i++)
		array_push($options, parseOption($optionsXML->item($i)));	
	for ($i = 0; $i < $parametersXML->length; $i++)
		array_push($parameters, parseParameter($parametersXML->item($i)));	
	for ($i = 0; $i < $perturbationsXML->length; $i++)
		array_push($perturbations, parsePerturbation($perturbationsXML->item($i)));
	
	return array(
		'replicates'=>$replicates,
		'shortDescription'=>$shortDescription,
		'longDescription'=>$longDescription,
		'options'=>$options,
		'parameters'=>$parameters,
		'perturbations'=>$perturbations
		);
}

function parseOption($option){
	return array(
		'state'=>$option->getAttribute('state'),
		'process'=>$option->getAttribute('process'),
		'name'=>$option->getAttribute('name'),	
		'value'=>$option->getAttribute('value')
		);		
}

function parseParameter($parameter){
	return array(
		'state'=>$parameter->getAttribute('state'),
		'process'=>$parameter->getAttribute('process'),
		'name'=>$parameter->getAttribute('name'),		
		'index'=>$parameter->getAttribute('index'),
		'value'=>$parameter->getAttribute('value')
		);
}

function parsePerturbation($perturbation){
	return array(
		'type'=>$perturbation->getAttribute('type'),
		'compartment'=>$perturbation->getAttribute('compartment'),
		'component'=>$perturbation->getAttribute('component'),
		'initialTime'=>$perturbation->getAttribute('initialTime'),
		'finalTime'=>$perturbation->getAttribute('finalTime'),
		'value'=>$perturbation->getAttribute('value')
		);
}

function getSimulationStatus($id, $pbsid, $idx, $nSimulations, $baseDir){
	$statuses = getJobStatuses();
	$time = null;
	$runtime = null;
	$run = 0;
	$err = null;
	$statusDetails = null;
	$currpbsid = null;
	if (array_key_exists($pbsid+$idx-1, $statuses)){
		$currpbsid = $pbsid+$idx-1;
		if ($statuses[$pbsid+$idx-1]['job_state'] == 'R'){
			$run = 1;
			$err = false;
			list($time, $mass, $growth) = getCellState($id, $pbsid, $idx, $baseDir, true, $statuses);			
			$runtime = $statuses[$pbsid+$idx-1]['resources_used.walltime'];
			$status = 'Running';
			$statusDetails = 'Running on node #'. getJobNode($statuses, $pbsid+$idx-1, 10, 1);
		}elseif ($statuses[$pbsid+$idx-1]['job_state'] == 'Q'){
			$run = 0;
			$err = false;
			$status = 'Queued';
		}else{
			$run = 0;
			$err = false;
			$status = 'Held';
		}
	}elseif (array_key_exists($pbsid + $nSimulations + $idx - 1, $statuses)){
		$currpbsid = $pbsid + $nSimulations + $idx - 1;
		$run = 2;
		list($state, $err) = getSimulationState($id, $idx, $baseDir);
		list($time, $mass, $growth) = getCellState($id, $pbsid, $idx, $baseDir, false, $statuses);
		$runtime = getSimulationRuntime($id, $idx, $baseDir);
		if ($statuses[$pbsid + $nSimulations + $idx - 1]['job_state'] == 'R'){
			$status = 'Reindexing';
			$statusDetails = sprintf('%s. Reindexing: %s on node %d', $state, $statuses[$pbsid + $nSimulations + $idx - 1]['resources_used.walltime'], getJobNode($statuses, $pbsid + $nSimulations + $idx - 1));
		}elseif ($statuses[$pbsid + $nSimulations + $idx - 1]['job_state'] == 'Q'){
			$status = 'Reindexing queued';
			$statusDetails = $state;
		}else{
			$status = 'Reindexing held';
			$statusDetails = $state;
		}
	}elseif (array_key_exists($pbsid + 2 * $nSimulations, $statuses)){
		$currpbsid = $pbsid + 2 * $nSimulations;
		$run = 2;
		list($state, $err) = getSimulationState($id, $idx, $baseDir);
		list($time, $mass, $growth) = getCellState($id, $pbsid, $idx, $baseDir, false, $statuses);
		$runtime = getSimulationRuntime($id, $idx, $baseDir);
		if ($statuses[$pbsid + 2 * $nSimulations]['job_state'] == 'R'){
			$status = 'Analyzing';
			$statusDetails = sprintf('%s. Analyzing: %s on node %d', $state, $statuses[$pbsid + 2 * $nSimulations]['runtime'], substr($statuses[$pbsid + 2 * $nSimulations]['exec_host'], 10, 1));
		}elseif ($statuses[$pbsid + 2 * $nSimulations]['job_state'] == 'Q'){
			$status = 'Analysis queued';
			$statusDetails = $state;
		}else{
			$status = 'Analysis held';
			$statusDetails = $state;
		}
	}else{
		$currpbsid = null;
		$run = 2;
		list($state, $err) = getSimulationState($id, $idx, $baseDir);
		list($time, $mass, $growth) = getCellState($id, $pbsid, $idx, $baseDir, false, $statuses);
		$runtime = getSimulationRuntime($id, $idx, $baseDir);
		$status = 'Finished';
		$statusDetails = $state;
	}
	
	return array($status, $statusDetails, $time, $mass, $growth, $runtime, $run, $err, $currpbsid);
}

function getJobStatuses(){
	$tmpArr = explode("\n\n", trim(`qstat -f @covertlab-cluster.stanford.edu`));
	$statuses = array();
	foreach ($tmpArr as $tmp){
		$tmp = explode("\n    ", str_replace("\n\t", "", $tmp));
		$id = array_shift(explode(".", str_replace("Job Id: ", "", array_shift($tmp))));
		$statuses[$id] = array();
		foreach ($tmp as $tmp2){
			list($prop, $val) = explode(' = ', $tmp2);
			$statuses[$id][$prop] = $val;
		}		
	}
	return $statuses;
}

function getPBSID($id, $baseDir){
	if (file_exists("$baseDir/$id/pbsid"))
		return trim(file_get_contents("$baseDir/$id/pbsid"));
	return null;
}

function getSimulationState($id, $idx, $baseDir){
	if (!file_exists("$baseDir/$id/$idx/out.log"))
		return array(null, "null");	
	if (file_exists("$baseDir/$id/$idx/err.mat") || (file_exists("$baseDir/$id/$idx/err.log") && filesize("$baseDir/$id/$idx/err.log") > 0)){
		$state = 'Terminated with error';
		$errs = array();
		if (file_exists("$baseDir/$id/$idx/err.log") && filesize("$baseDir/$id/$idx/err.log") > 0)
			array_push($errs, "\"log\":\"simulation\"");
		if (file_exists("$baseDir/$id/$idx/err.mat"))
			array_push($errs, "\"mat\":\"simulation\"");
		$err = "{".join(",", $errs)."}";
	}else{
		$err = null;
		$pinchedDiameter = floatval(array_pop(preg_split("/ +/", trim(`tail -n 500 $baseDir/$id/$idx/out.log | grep '^[ 0-9\.]\{15,\}' | tail -n 1`))));
		if ($pinchedDiameter == 0)
			$state = 'Terminated with division';
		else
			$state = 'Terminated without division';
			
		if (file_exists("$baseDir/$id/$idx/err.reindexing.log") && filesize("$baseDir/$id/$idx/err.reindexing.log") > 0){
			$state.= ', reindexing error';
			$err = "{\"log\":\"reindexing\"}";
		}elseif (
			(file_exists("$baseDir/$id/err.analysis-1.log") && filesize("$baseDir/$id/err.analysis-1.log") > 0) ||
			(file_exists("$baseDir/$id/err.analysis-2.log") && filesize("$baseDir/$id/err.analysis-2.log") > 0) ||
			(file_exists("$baseDir/$id/err.analysis-3.log") && filesize("$baseDir/$id/err.analysis-3.log") > 0) ||
			(file_exists("$baseDir/$id/err.analysis-4.log") && filesize("$baseDir/$id/err.analysis-4.log") > 0) ||
			(file_exists("$baseDir/$id/err.analysis-5.log") && filesize("$baseDir/$id/err.analysis-5.log") > 0) ||
			(file_exists("$baseDir/$id/err.analysis-6.log") && filesize("$baseDir/$id/err.analysis-6.log") > 0) ||
			(file_exists("$baseDir/$id/err.analysis-7.log") && filesize("$baseDir/$id/err.analysis-7.log") > 0) ||
			(file_exists("$baseDir/$id/err.analysis-8.log") && filesize("$baseDir/$id/err.analysis-8.log") > 0) ||
			(file_exists("$baseDir/$id/err.analysis-9.log") && filesize("$baseDir/$id/err.analysis-9.log") > 0)
			){
			$state.= ', analysis error';
			$err = "{\"log\": \"analysis\"}";
		}
	}
	return array($state, $err);
}

function getCellState($id, $pbsid, $idx, $baseDir, $running, $statuses){
	if ($running){
		$pbsSimId = $pbsid + $idx - 1;
		$node = getJobNode($statuses, $pbsSimId);
		$tmp = `ssh -i /var/www/.ssh/cluster.key jkarr@covertlab-cluster.stanford.edu "ssh compute-0-$node tail -n 500 /opt/torque/spool/$pbsSimId.covertlab-cluster.stanford.edu.OU | grep '^[ 0-9\.]\{15,\}' | tail -n 1" 2>&1`;
	}else{
		if (!file_exists("$baseDir/$id/$idx/out.log"))
			return null;
		$tmp = `tail -n 500 $baseDir/$id/$idx/out.log | grep '^[ 0-9\.]\{15,\}' | tail -n 1`;
	}
	$tmp = preg_split("/ +/", trim($tmp));
	
	$time = $tmp[0];
	$timeH = floor($time / 3600);
	$timeM = floor(((($time-1) % 3600)+1)/60);
	$timeS = (($time-1) % 60)+1;
	
	$mass = $tmp[2];
	$growth = $tmp[3]*3600;
		
	return array(sprintf('%02d:%02d:%02d', $timeH, $timeM, $timeS), $mass, $growth);
}

function getSimulationRuntime($id, $idx, $baseDir){
	if (!file_exists("$baseDir/$id/$idx/out.log"))
		return null;
	$tmp = trim(`tail -n 500 $baseDir/$id/$idx/out.log | grep 'Total runtime'`);
	if (strlen($tmp) == 0)
		return null;
	$time = array_shift(array_slice(explode(" ", $tmp), 2, 1));	
	$timeH = floor($time / 3600);
	$timeM = floor(((($time-1) % 3600)+1)/60);
	$timeS = (round($time-1) % 60)+1;
	return sprintf('%02d:%02d:%02d', $timeH, $timeM, $timeS);
}
