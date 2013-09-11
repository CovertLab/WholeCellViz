/***********************
* WholeCellViz dashboard
*
* Author: Ruby Lee
* Author: Jonathan Karr, jkarr@stanford.edu
* Affiliation: Covert Lab, Department of Bioengineering, Stanford University
* Last updated: 8/31/2012
************************/

function initIndex() {
	//prepared visualizations
	setupExampleVizLinks(false);
}

function initApp() {
	// windows	
	$('#help').dialog({ 
		autoOpen: false, 
		draggable: false, 
		resizable: false, 
		modal:true, 
		width:400, 
		minHeight:50,
		open: function (event, ui) { $('#timeline').timeline('dialogOpen');},
		close: function (event, ui) { $('#timeline').timeline('dialogClose');},
		});
	$('#about').dialog({ 
		autoOpen: false, 
		draggable: false, 
		resizable: false, 
		modal:true, 
		width:800,
		open: function (event, ui) { $('#timeline').timeline('dialogOpen');},
		close: function (event, ui) { $('#timeline').timeline('dialogClose');},
		});
	$('#tutorial')
		.dialog({ 
			autoOpen: false, 
			draggable: false, 
			resizable: false, 
			modal:true, 
			width:500,
			open: function (event, ui) { $('#timeline').timeline('dialogOpen');},
			close: function (event, ui) { $('#timeline').timeline('dialogClose');},
			})
		.bind('dialogopen', function(){ 
			$('#tutorial').find('.help_arrow').pixastic('desaturate');
			$('#tutorial').find('.visualize_arrow').pixastic('desaturate');
			$('#tutorial').find('.animate_arrow').pixastic('desaturate');
		});
	$('#config').config();
	
	// menu	
	$("#about_open").click(function() { $('#about').dialog('open'); });
	$("#tutorial_open").click(function() { $('#tutorial').dialog('open'); });	
	$("#config_open_datasource").click(function() { $('#config').config('openTab', 'datasource'); });
	$("#config_open_panels").click(function() { $('#config').config('openTab', 'panels'); });
	$("#config_open_playback").click(function() { $('#config').config('openTab', 'playback'); });
	$("#config_open_userinteraction").click(function() { $('#config').config('openTab', 'userinteraction'); });
	$("#config_open_export").click(function() { $('#config').config('openTab', 'export'); });
	$('#export_svg').click(function(){ exportSvg(); });	
	$('#export_json').click(function(){ exportJson(); });	
	
	//tooltip
	$("#tooltip").tooltip();
	
	//prepared visualizations
	setupExampleVizLinks(true);
	
	//layout
	$(window).resize(function () {
		layoutPanels();
		$("#help").dialog({position: 'center'})
		$("#about").dialog({position: 'center'})
		$("#tutorial").dialog({position: 'center'})
		$("#config").config({position: 'center'})
	});
	
	// sets up Timeline
	$('#timeline').timeline();
	
	//load default plots
	loadConfiguration();
	$(window).bind('hashchange', function() {
		loadConfiguration();
	});
}

function setupExampleVizLinks(hasHash) {
	var prefix = '';
	if (hasHash)
		prefix = '#';
	
	var menu1 = $('#header').find('.menu_right1')
	var menu2 = $('#header').find('.menu_right2')
	$('<li><a href="' + prefix + 'cellGrowth">Cell growth</a></li><li class="spacer"></li>').appendTo(menu1);
	$('<li><a href="' + prefix + 'cellCycle">Cell cycle</a></li><li class="spacer"></li>').appendTo(menu1);
	$('<li><a href="' + prefix + 'replication">Replication</a></li>').appendTo(menu1);
	$('<li><a href="' + prefix + 'omics">Omics</a><li class="spacer"></li></li>').appendTo(menu2);
	$('<li><a href="' + prefix + 'synthesis">Synthesis</a><li class="spacer"></li></li>').appendTo(menu2);
	$('<li><a href="' + prefix + 'population">Population</a><li class="spacer"></li></li>').appendTo(menu2);
	$('<li><a href="' + prefix + 'knockouts">Knockouts</a></li>').appendTo(menu2);
	
	menu1.css({'right': Math.max(0, (menu2.width() - menu1.width()) / 2)});
	menu2.css({'right': Math.max(0, (menu1.width() - menu2.width()) / 2)});
	$('#header').find('.menu_right_title').width(Math.max(menu1.width(), menu2.width()));
}

/* default plots */
function loadConfiguration(){
	if ($('#config').config('getUpdatingHash')){
		$('#config').config('setUpdatingHash', false);
		return;
	}
	
	$('#config').config('setUpdatingHash', true);
	
	switch (window.location.hash) {
		case '#LeeEtAl2013': 
		case '#LeeEtAl2013Fig1': 
			loadConfigurationHelper({
				panels: {
					rows: 2, 
					cols: 2, 
					metadata: [
						[{"sim_id":"2011_10_19_02_53_45_1","class_id":2,"attr_id":57}],
						[{"sim_id":"2011_10_19_02_53_45_1","class_id":2,"attr_id":13832}],
						[{"sim_id":"2011_10_19_02_53_45_1","class_id":13,"attr_id":13827}],	
						[{"sim_id":"2011_10_19_02_53_45_1","class_id":7,"attr_id":13831}],
						],
				},
				playback: {
					repeat: true,
					speed: 1000,
				},
				visualization: {
					isClickResponsive: true,
					isShowingTooltips: true,
				},
			});
			break;	
		case '#LeeEtAl2013FigS1': 
			loadConfigurationHelper({
				panels: {
					rows: 5, 
					cols: 2, 
					metadata: [
						[{"sim_id":"2011_10_19_02_53_45_1","class_id":4,"attr_id":13838}],
						[{"sim_id":"2011_10_19_02_53_45_1","class_id":4,"attr_id":76}],
						[{"sim_id":"2011_10_19_02_53_45_1","class_id":3,"attr_id":70}],
						[{"sim_id":"2011_10_19_02_53_45_1","class_id":2,"attr_id":13833}],
						[{"sim_id":"2011_10_19_02_53_45_1","class_id":10,"attr_id":13837}],
						[{"sim_id":"2011_10_19_02_53_45_1","class_id":13,"attr_id":13836}],
						[{"sim_id":"2011_10_19_02_53_45_1","class_id":10,"attr_id":13835}],
						[{"sim_id":"2011_10_19_02_53_45_1","class_id":12,"attr_id":13829}],
						[{"sim_id":"2011_10_19_02_53_45_1","class_id":13,"attr_id":13834}],
						[{"sim_id":"2011_10_19_02_53_45_1","class_id":17,"attr_id":13828}],
						],
				},
				playback: {
					repeat: true,
					speed: 1000,
				},
				visualization: {
					isClickResponsive: true,
					isShowingTooltips: true,
				},
			});
			break;
		case '#cellGrowth':
			loadConfigurationHelper({
				panels: {
					rows: 1, 
					cols: 1, 
					metadata: [[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 4, attr_id: 13838}, //3D Cell shape visualization
						]],
				},
				playback: {
					repeat: true,
					speed: 1000,
				},
				visualization: {
					isClickResponsive: true,
					isShowingTooltips: true,
				},
			});
			break;
		case '#cellCycle':
			loadConfigurationHelper({
				panels: {
					rows: 2, 
					cols: 3, 
					metadata: [[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 4, attr_id: 76}, //Cell shape visualization
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 7, attr_id: 13831}, //Metabolic map visualization
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 13834}, //Gene expression heatmap visualization
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 2, attr_id: 13832}, //Circular chromosome visualization
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 2, attr_id: 13833}, //Chromosome space time
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 12, attr_id: 13829}, //Translation visualization						
						]],
				},
				playback: {
					repeat: true,
					speed: 1000,
				},
				visualization: {
					isClickResponsive: true,
					isShowingTooltips: true,
				},
			});
			break;
		case '#replication':
			loadConfigurationHelper({
				panels: {
					rows: 2, 
					cols: 3, 
					metadata: [[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 4, attr_id: 76},        //Cell shape visualization
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 2, attr_id: 57}, 		// Chromosome replication visuazliation	
						],[	
							{sim_id: '2011_10_19_02_53_45_1', class_id: 1, attr_id: 27}, 		// dNTP count
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 3, attr_id: 70}			// FtsZ visualization
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 17, attr_id: 13828},	// Replication initiation visuazliation
						],[	
							{sim_id: '2011_10_19_02_53_45_1', class_id: 1, attr_id: 55},	    // superhelical density
						]],
				},
				playback: {
					repeat: true,
					speed: 1000,
				},
				visualization: {
					isClickResponsive: true,
					isShowingTooltips: true,
				},
			});
			break;
		case '#omics':
			loadConfigurationHelper({
				panels: {
					rows: 2, 
					cols: 2, 
					metadata: [
						[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 13836}, 	// nascent RNA expression visualization
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 10, attr_id: 13837}, 	// nascent Protein expressionmonomer visualization
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 13827}, 	// mature RNA expression visualization
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 10, attr_id: 13835}, 	// mature Protein monomer expression  visualization
						]
					],
				},
				playback: {
					repeat: true,
					speed: 1000,
				},
				visualization: {
					isClickResponsive: true,
					isShowingTooltips: true,
				},
			});
			break;
		case '#synthesis':
			var sim = '2011_10_19_02_53_45_1';
			loadConfigurationHelper({
				panels: {
					rows: 5, 
					cols: 4, 
					metadata: [
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 11229}], //TU_003
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 10, attr_id: 5134}], //MG_006_MONOMER
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 9, attr_id: 1725}], //MG_006_DIMER
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 7, attr_id: 469}], //Tmk
						
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 11232}], //TU_006
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 10, attr_id: 5141}], //MG_013_MONOMER
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 9, attr_id: 1727}], //MG_013_DIMER
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 7, attr_id: 233}], //FolD1
						
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 11244}], //TU_017
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 10, attr_id: 5160}], //MG_034_MONOMER
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 9, attr_id: 1735}], //MG_034_DIMER
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 7, attr_id: 462}], //Tdk1
						
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 11362}], //TU_133
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 10, attr_id: 5349}], //MG_216_MONOMER
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 9, attr_id: 1797}], //MG_216_TETRAMER
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 7, attr_id: 440}], //Pyk_CDP
						
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 11498}], //TU_260
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 10, attr_id: 5498}], //MG_357_MONOMER
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 9, attr_id: 1855}], //MG_357_DIMER
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 7, attr_id: 154}], //AckA
					],
				},
				playback: {
					repeat: true,
					speed: 1000,
				},
				visualization: {
					isClickResponsive: true,
					isShowingTooltips: true,
				},
			});
			break;
		case '#population':
			var sims = [
				'2011_10_19_02_53_45_1',
				'2011_10_19_02_53_45_2',
				'2011_10_19_02_53_45_3',
				'2011_10_19_02_53_45_4',
				'2011_10_19_02_53_45_5',
				'2011_10_19_02_53_45_6',
				'2011_10_19_02_53_45_7',
				'2011_10_19_02_53_45_8',
				];
			var attrs = [
				{class_id: 1, attr_id: 10}, //Summary: growth
				{class_id: 1, attr_id: 16}, //Summary: ATP
				{class_id: 1, attr_id: 27}, //Summary: dNTP
				{class_id: 6, attr_id: 102}, //Mass: DNA
				{class_id: 6, attr_id: 126}, //Mass: RNA
				{class_id: 6, attr_id: 120}, //Mass: Protein
				];
			var config = {
				panels: {
					rows: 2, 
					cols: 3, 
					metadata: [],
				},
				playback: {
					repeat: true,
					speed: 1000,
				},
				visualization: {
					isClickResponsive: true,
					isShowingTooltips: true,
				},
			};
			for (var i = 0; i < attrs.length; i++){
				var tmp = [];
				for (var j = 0; j < sims.length; j++){
					tmp.push($.extend({'sim_id': sims[j]}, attrs[i]));
				}
				config.panels.metadata.push(tmp);
			}
			loadConfigurationHelper(config);
			break;
		case '#knockouts':
			var wt = '2011_10_19_02_53_45_1';
			var kos = [				
				'2011_10_26_19_26_15_1', //dnaN -- DNA synthesis defect
				'2011_10_26_19_26_15_117', //asnS -- RNA synthesis defect
				'2011_10_26_19_26_15_22', //rpoE -- protein synthesis defect
				];
			var attrs = [
				{class_id: 1, attr_id: 10}, //Summary: growth
				{class_id: 6, attr_id: 102}, //Mass: DNA
				{class_id: 6, attr_id: 126}, //Mass: RNA
				{class_id: 6, attr_id: 120}, //Mass: Protein
				];
			var config = {
				panels: {
					rows: 3, 
					cols: 4, 
					metadata: [],
				},
				playback: {
					repeat: true,
					speed: 1000,
				},
				visualization: {
					isClickResponsive: true,
					isShowingTooltips: true,
				},
			};			
			for (var j = 0; j < kos.length; j++){
				for (var i = 0; i < attrs.length; i++){	
					config.panels.metadata.push([
						$.extend({'sim_id': wt}, attrs[i]),
						$.extend({'sim_id': kos[j]}, attrs[i]),
						]);
				}
			}
			loadConfigurationHelper(config);
			break;
		case '#knockouts2':
			var sims = [
				'2011_10_19_02_53_45_1', //WT
				'2011_10_26_19_26_15_6', //tmk
				'2011_10_26_19_26_15_22', //rpoE
				'2011_10_26_19_26_15_117', //asnS
				'2011_10_26_19_26_15_48', //ffh
				'2011_10_26_19_26_15_1', //dnaN
				'2011_10_20_10_09_12_22', //parC
				'2011_10_26_19_26_15_87', //tilS
				];
			var attrs = [
				{class_id: 1, attr_id: 10}, //Summary: growth
				{class_id: 1, attr_id: 16}, //Summary: ATP
				{class_id: 1, attr_id: 27}, //Summary: dNTP
				{class_id: 6, attr_id: 102}, //Mass: DNA
				{class_id: 6, attr_id: 126}, //Mass: RNA
				{class_id: 6, attr_id: 120}, //Mass: Protein
				];
			var config = {
				panels: {
					rows: 2, 
					cols: 3, 
					metadata: [],
				},
				playback: {
					repeat: true,
					speed: 1000,
				},
				visualization: {
					isClickResponsive: true,
					isShowingTooltips: true,
				},
			};
			for (var i = 0; i < attrs.length; i++){
				var tmp = [];
				for (var j = 0; j < sims.length; j++){
					tmp.push($.extend({'sim_id': sims[j]}, attrs[i]));
				}
				config.panels.metadata.push(tmp);
			}
			loadConfigurationHelper(config);
			break;
			
		//individual visualizations
		case '#CellShape': loadOneVisualization('2011_10_19_02_53_45_1', 4, 76); break;
		case '#CellShape3D': loadOneVisualization('2011_10_19_02_53_45_1', 4, 13838); break;
		case '#Chromosome1': loadOneVisualization('2011_10_19_02_53_45_1', 2, 57); break;
		case '#Chromosome2': loadOneVisualization('2011_10_19_02_53_45_1', 2, 13832); break;
		case '#ChrSpaceTime': loadOneVisualization('2011_10_19_02_53_45_1', 2, 13833); break;
		case '#Cytokinesis': loadOneVisualization('2011_10_19_02_53_45_1', 3, 70); break;
		case '#GeneExp': loadOneVisualization('2011_10_19_02_53_45_1', 13, 13834); break;
		case '#Metabolism': loadOneVisualization('2011_10_19_02_53_45_1', 7, 13831); break;
		case '#NascentProtExp': loadOneVisualization('2011_10_19_02_53_45_1', 10, 13837); break;
		case '#NascentRnaExp': loadOneVisualization('2011_10_19_02_53_45_1', 13, 13836); break;
		case '#MatureProtExp': loadOneVisualization('2011_10_19_02_53_45_1', 10, 13835); break;
		case '#MatureRnaExp': loadOneVisualization('2011_10_19_02_53_45_1', 13, 13827); break;
		case '#RepInit': loadOneVisualization('2011_10_19_02_53_45_1', 17, 13828); break;
		case '#Translation': loadOneVisualization('2011_10_19_02_53_45_1', 12, 13829); break;		
		
		//stephen fortune Ababond Normal Devices Festival
		case '#ANDFestival-1':
			loadConfigurationHelper({
				panels: {		
					showMinimalMode: 0,
					rows: 1, 
					cols: 1, 
					metadata: [[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 4, attr_id: 76}, //Cell shape visualization
						]],
				},
				playback: {
					repeat: true,
					speed: 2000,
				},
				visualization: {
					isClickResponsive: true,
					isShowingTooltips: true,
				},
			});
			break;
		case '#ANDFestival-2':
			loadConfigurationHelper({
				panels: {		
					showMinimalMode: 0,
					rows: 2, 
					cols: 2, 
					metadata: [[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 4, attr_id: 76}, //Cell shape visualization
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 2, attr_id: 13832}, //Circular chromosome visualization
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 1, attr_id: 10}, //Summary: growth
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 13834}, // mature RNA expression visualization
						]],
				},
				playback: {
					repeat: true,
					speed: 2000,
				},
				visualization: {
					isClickResponsive: true,
					isShowingTooltips: true,
				},
			});
			break;
		case '#ANDFestival-3':
			loadConfigurationHelper({
				panels: {		
					showMinimalMode: 0,
					rows: 4, 
					cols: 4, 
					metadata: [	
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 1, attr_id: 27}],// Chromosome DNA replication
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 2, attr_id: 13833}],// Chromosome DNA replication
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 2, attr_id: 57}],// Chromosome DNA replication- protein occupancy- methylation- & damage (graph)
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 17, attr_id: 13828}],// Replication initiation
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 3, attr_id: 70}],// FtsZ Ring FtsZ contractile ring
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 4, attr_id: 76}],// Geometry Cell shape
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 2, attr_id: 13832}],// Chromosome DNA replication- protein occupancy- methylation- & damage (circular)
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 1, attr_id: 55}],// Summary Superhelicity						
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 7, attr_id: 13831}],// Metabolic Reactions Metabolism
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 1, attr_id: 10}],// Wild-type #1 Summary growth 	 
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 13834}],// RNA Gene expression 	 
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 12, attr_id: 13829}],// Ribosomes Translation
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 13836}],// RNA Nascent RNA expression						
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 13827}],// RNA Mature RNA expression
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 10, attr_id: 13837}],// Protein Monomers Nascent protein monomer expression
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 10, attr_id: 13835}],// Protein Monomers Mature protein monomer expression						
						],
				},
				playback: {
					repeat: true,
					speed: 2000,
				},
				visualization: {
					isClickResponsive: true,
					isShowingTooltips: true,
				},
			});
			break;
		case '#ANDFestival-4':
			loadConfigurationHelper({
				panels: {		
					showMinimalMode: 0,
					rows: 6, 
					cols: 6, 
					metadata: [	
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 1, attr_id: 30}], //Chromosome copy number
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 11229}], //RNA TU_003 (mature)
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 10, attr_id: 5134}], //Protein Monomers MG_006_MONOMER (mature)
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 9, attr_id: 1725}], //Protein Complexes MG_006_DIMER (mature)
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 7, attr_id: 469}], //Metabolic Reactions Tmk
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 1, attr_id: 46}], //Total Rna
			
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 11244}], //RNA TU_017 (mature)
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 1, attr_id: 27}],// Chromosome DNA replication
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 2, attr_id: 13833}],// Chromosome DNA replication
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 2, attr_id: 57}],// Chromosome DNA replication- protein occupancy- methylation- & damage (graph)
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 17, attr_id: 13828}],// Replication initiation
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 11232}], //RNA TU_006 (mature)
						
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 10, attr_id: 5160}], //Protein Monomers MG_034_MONOMER (mature) 
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 3, attr_id: 70}],// FtsZ Ring FtsZ contractile ring
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 4, attr_id: 76}],// Geometry Cell shape
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 2, attr_id: 13832}],// Chromosome DNA replication- protein occupancy- methylation- & damage (circular)
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 1, attr_id: 55}],// Summary Superhelicity						
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 10, attr_id: 5141}], //Protein Monomers MG_013_MONOMER (mature)
						
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 9, attr_id: 1735}], //Protein Complexes MG_034_DIMER (mature)
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 7, attr_id: 13831}],// Metabolic Reactions Metabolism
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 1, attr_id: 10}],// Wild-type #1 Summary growth 	 
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 13834}],// RNA Gene expression 	 
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 12, attr_id: 13829}],// Ribosomes Translation
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 9, attr_id: 1727}], //Protein Complexes MG_013_DIMER (mature)
						
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 7, attr_id: 462}], //Metabolic Reactions Tdk1 
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 13836}],// RNA Nascent RNA expression						
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 13827}],// RNA Mature RNA expression
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 10, attr_id: 13837}],// Protein Monomers Nascent protein monomer expression
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 10, attr_id: 13835}],// Protein Monomers Mature protein monomer expression
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 7, attr_id: 233}], //Metabolic Reactions FolD1 
												
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 1, attr_id: 31}], //Total protein monomer
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 11362}], //RNA TU_133 (mature)
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 10, attr_id: 5349}], //Protein Monomers MG_216_MONO
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 9, attr_id: 1797}], //Protein Complexes MG_216_TETRAMER (mature)
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 7, attr_id: 440}], //Metabolic Reactions Pyk_CDP
						[{sim_id: '2011_10_19_02_53_45_1', class_id: 1, attr_id: 34}], //Total Protein complex
						],
				},
				playback: {
					repeat: true,
					speed: 2000,
				},
				visualization: {
					isClickResponsive: true,
					isShowingTooltips: true,
				},
			});
			break;
		
		//default
		default:
			if (window.location.hash != '' && window.location.hash != '#'){
				var json;
				try{
					json = JSON.parse(window.location.hash.substr(1));
				}catch(err){}
				if (json != undefined){
					loadConfigurationHelper(json);
					break;
				}
			}
			loadConfigurationHelper({
				panels: {					
					rows: 2, 
					cols: 3, 
					metadata: [[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 4, attr_id: 76}, //Cell shape visualization
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 7, attr_id: 13831}, //Metabolic map visualization
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 13, attr_id: 13834}, //Gene expression heatmap visualization
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 2, attr_id: 13832}, //Circular chromosome visualization
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 2, attr_id: 13833}, //Chromosome space time
						],[
							{sim_id: '2011_10_19_02_53_45_1', class_id: 12, attr_id: 13829}, //Translation visualization
						]],
				},
				playback: {
					repeat: true,
					speed: 1000,
				},
				visualization: {
					isClickResponsive: true,
					isShowingTooltips: true,
				},
			});
			break;
	}
	
	$('#config').config('setUpdatingHash', false);
}

function loadOneVisualization(sim_id, class_id, attr_id) {
	loadConfigurationHelper({
		panels: {
			rows: 1, 
			cols: 1, 
			metadata: [
				[{sim_id: sim_id, class_id: class_id, attr_id: attr_id}],
			],
		},
		playback: {
			repeat: true,
			speed: 1000,
		},
		visualization: {
			isClickResponsive: true,
			isShowingTooltips: true,
		},
	});
}

function loadConfigurationHelper(config){
	//disable timeline
	$('#timeline').timeline('disable');
	
	//playback and visualization	
	$('#config').find('.isClickResponsiveSelector').val(config.visualization.isClickResponsive);
	$('#config').find('.isShowingTooltipsSelector').val(config.visualization.isShowingTooltips);
	
	//layout panels
	if (config.panels.showMinimalMode == 'undefined')
		config.panels.showMinimalMode = 0;
	$('#config').config('setMinimalMode', config.panels.showMinimalMode);
	$('#config').config('setNumPanelRows', config.panels.rows);
	$('#config').config('setNumPanelCols', config.panels.cols);
	layoutPanels(true);
	
	//load panels
	for (var i = 0; i < Math.min(config.panels.rows * config.panels.cols, config.panels.metadata.length); i++){
		$('#panel' + (i + 1)).panel('loadPanel', config.panels.metadata[i]);
	}
	
	//initialize configuration window
	var grid = $('#config').find('#removeSeriesSelector');
	grid.jqGrid('clearGridData');
	
	//update timeline and play
	$('#timeline').timeline('setRepeat', config.playback.repeat);
	$('#timeline').timeline('setSpeed', config.playback.speed);
}

/* layout */
function layoutPanels(deleteAllPanels) {
	deleteAllPanels = deleteAllPanels || false;
	
	var container = $('#container');
	var num_rows = $('#config').config('getNumPanelRows');
	var num_cols = $('#config').config('getNumPanelCols');
	
	//remove extra panels
	container.children('.panel' + (deleteAllPanels ? '': ':gt(' + (num_rows * num_cols - 1) + ')')).each(function(){
		$(document).removeData($(this).find('.ui-dialog-content').attr('id'));
		$(this).find('.ui-dialog-content')
			.panel('destroyPlot')
			.panel('destroy')
			.remove();
	});
	$("#config").find(".panelSelector").children('option:gt(' + (num_rows * num_cols - 1) + ')').remove();
	
	//create new panels as necessary
	for (var i = 1; i <= num_rows * num_cols; i++){
		var panel_id = 'panel' + i;
		if ($("#" + panel_id).length == 0){
			$('<div id="' + panel_id + '"></div>')
				.appendTo(container)
				.panel();
		}
	}
	for (var i = $("#config").find(".panelSelector").children().length + 1; i <= num_rows * num_cols; i++){
		$("#config").find(".panelSelector").append('<option value="' + i + '">Panel ' + i + '</option>');
	}
	
	//layout panels
	var container = $("#container");
	var left = container.position().left;
	var top = container.position().top;
	var width = container.width();
	var height = container.height();

	var margins = $('#config').config('getMargins');
	var panelVertMargin = margins.panelVertMargin;
	var panelHorzMargin = margins.panelHorzMargin;
	var panelWidth = (width - (num_cols + 1) * panelHorzMargin) / num_cols;
	var panelHeight = (height - (num_rows + 1) * panelVertMargin) / num_rows;
	
	for (var i = 0; i < num_rows; i++){
		for (var j = 0; j < num_cols; j++){
			$("#panel" + (i * num_cols + j + 1))
				.panel('resize', panelWidth - 2, panelHeight - 4);
			$("#panel" + (i * num_cols + j + 1))
				.panel({
					position: [
						left + panelHorzMargin + j * (panelHorzMargin + panelWidth),
						top + panelVertMargin + i * (panelVertMargin + panelHeight),
						],
					});
		}
	}
}

/* undo, redo */
function undo(){
	window.history.back();
}
function redo(){
	window.history.forward();
}

/* ajax */
function createAjaxDialog(content){
	var dialogWindow = $('<div />');
	dialogWindow
		.dialog({
			dialogClass: "ajaxStatus",
			closeOnEscape: false,
			draggable: false,
			position: "center",
			resizable: false,
			title: "Talking to server ...",
			width:250,
			minWidth: 250,
			minHeight: 0,
		})
		.html(content);
	return dialogWindow;
}

/* config */
$.widget("wholecellviz.config", $.ui.dialog, {
	options: {
		autoOpen: false,
		draggable: false,
		resizable: false,
		modal:true,
		title: 'Configuration',
		position: 'center',
		width: 590,
		height: 496,
		showMinimalMode: 0,
		showLabels: false,
		panelVertMargin: 8,
		panelHorzMargin: 10,
		dataSourceBaseUrl: '', //URL to WholeCellDB instance		
	},
	
	_create: function() {
		$.ui.dialog.prototype._create.call(this);
		
		this.setUpdatingHash(true);
		
		//accordion container
		(this.accordion = $('<div></div>'))
			.appendTo(this.element)
			.addClass('accordion');
			
		//data source config
		$('<h3><a>Data source</a></h3>').appendTo(this.accordion);
		(this.dataSourcePanel = $('<div></div>'))
			.appendTo(this.accordion);
			
		($('<div class="section"><h4>Data source URL (leave blank for default)</h4><input class="dataSourceBaseUrlInput" value=""/></div></div>'))
			.appendTo(this.dataSourcePanel);
		(this.dataSourceBaseUrlInput = this.dataSourcePanel.find('.dataSourceBaseUrlInput'))
			.change(function(){				
				$('#config').config('setDataSourceBaseUrl', $(this).val());
			});
		
		//data panels config
		$('<h3><a>Data panels</a></h3>').appendTo(this.accordion);
		(this.dataPanel = $('<div></div>'))
			.appendTo(this.accordion);			
		
		($('<div class="section" style="margin-top:15px;"><h4>Panel grid size</h4><input type="text" class="num_panel_rows spinner"/> &times; <input type="text" class="num_panel_cols spinner"/></div>'))
			.appendTo(this.dataPanel);
		(this.numPanelRowsInput = this.dataPanel.find(".num_panel_rows"))
			.val(1)
			.spinner({ min: 1, max: 5 })
			.bind("change", function(){
				layoutPanels();
				
				//update hash
				$('#config').config('updateLocationHash');
			});
		(this.numPanelColsInput = this.dataPanel.find(".num_panel_cols"))
			.val(1)
			.spinner({ min: 1, max: 5 })
			.bind("change", function(){
				layoutPanels();
				
				//update hash
				$('#config').config('updateLocationHash');
			});
			
		($('<div class="section" style="margin-top:15px;"><h4>Configure panel: <select class="panelSelector"></select></h4><table cellpadding="0">'
				+ '<tr>'
					+ '<th>Simulation</th>'
					+ '<td><select class="simulationSelector"></td>'
					+ '<td rowspan="4" style="text-align:center; padding:0px; margin:0px; vertical-align:middle;">'
						+ '<button class="addSeries" title="Add series"></button>'
						+ '<br/>'
						+ '<button class="removeSeries" title="Remove series"></button>'
					+ '</td>'
					+ '<td rowspan="4"><table id="removeSeriesSelector" class="removeSeriesSelector"/></td>'
				+ '</tr>'	
				+ '<tr>'
					+ '<th>Series type</th>'
					+ '<td><select class="seriesTypeSelector"></select></td>'
					+ ''
				+ '</tr>'
				+ '<tr>'
					+ '<th>Series</th>'
					+ '<td><input class="seriesInput" type="text"/></td>'
					+ ''
				+ '</tr>'
				+ '<tr>'
					+ '<th>&nbsp;</th>'
					+ '<td><select class="addSeriesSelector" multiple="true"/></td>'
					+ ''
				+ '</tr>'
			+'</table></div>'))
			.appendTo(this.dataPanel);
		(this.panelSelector = this.dataPanel.find(".panelSelector"))
			.append($('<option value="1">Panel 1</option>'))
			.bind('change', function(){
				var grid = $('#config').find('#removeSeriesSelector');
				grid.jqGrid('clearGridData');
				grid.jqGrid('addRowData', 'index', $(document).data('panel' + $(this).val()));
				});		
		(this.simulationSelector = this.dataPanel.find(".simulationSelector"));
		(this.seriesTypeSelector = this.dataPanel.find(".seriesTypeSelector"));
		this.getSimulations();
		this.getSeriesClasses();
		
		(this.seriesInput = this.dataPanel.find(".seriesInput"))
			.bind("keyup change", function() {
				$('#config').config('searchSeries', $("#config").find(".seriesInput").val(), $("#config").find(".seriesTypeSelector").val());
				$(this).focus();
			});
		(this.seriesTypeSelector = this.dataPanel.find(".seriesTypeSelector"))
			.bind("change", function() {
				$('#config').config('searchSeries', $("#config").find(".seriesInput").val(), $("#config").find(".seriesTypeSelector").val());
				$(this).focus();
			});
		(this.addSeriesSelector = this.dataPanel.find(".addSeriesSelector"));
		
		this.dataPanel.find(".addSeries")
			.button({icons: {primary: 'ui-icon-arrowthick-1-e'}, text: false})
			.removeClass('ui-state-default')
			.hover(function(){
					$(this).addClass('ui-state-hover');
				}, function(){
					$(this).removeClass('ui-state-hover');
				})
			.click(function(){
				var grid = $('#config').find("#removeSeriesSelector");
				var timeline = $('#timeline');
				var timelineEnabled = timeline.timeline('getEnabled');
				
				//get plot information
				var panelNum = parseInt($("#config").find(".panelSelector").val());
				var panel = $('#panel' + panelNum);
				var sim_id = $("#config").find(".simulationSelector").val();
				
				$("#config").find(".addSeriesSelector").children('option:selected').each(function(){;
					var attr_id = $(this).val().split("_")[0];
					var class_id = $(this).val().split("_")[1];
									
					panel.panel('getSeriesMetadataHelper', {
						'sim_id':sim_id, 
						'attr_id': attr_id, 
						'class_id': class_id,
						'index': grid.jqGrid('getGridParam', 'records'),
						}, undefined, true, panelNum);
				});
			});
			
		this.dataPanel.find(".removeSeries")
			.button({icons: {primary: 'ui-icon-arrowthick-1-w'}, text: false})
			.removeClass('ui-state-default')
			.hover(function(){
					$(this).addClass('ui-state-hover');
				}, function(){
					$(this).removeClass('ui-state-hover');
				})
			.click(function(){
				//update grid
				var grid = $('#config').find("#removeSeriesSelector");
				grid.jqGrid('delRowData', grid.getGridParam('selrow'));
				
				//update hash
				var panelNum = parseInt($("#config").find(".panelSelector").val());
				$('#config').config('updateLocationHash', panelNum, grid.jqGrid('getRowData'));
				
				//replot
				$('#panel' + panelNum).panel('loadPanel', grid.jqGrid('getRowData'));
				});
				
		(this.removeSeriesSelector = this.dataPanel.find("#removeSeriesSelector"))
			.jqGrid({
				width:280,
				shrinkToFit: true,
				forceFit: true,
				hoverrows: true,
				multiselect: false,
				gridview: true,
				datatype: "local",
				colNames: ["index", "Simulation ID", "Simulation", "Class ID", "Class", "Attribute ID", "Attribute"],
				colModel: [
					{name:"index", width:90, editable:false, align: "right", resizable: true, sortable: true, hidden: true},
					{name:"sim_id", width:90, editable:false, align: "left", resizable: true, sortable: true, hidden: true},
					{name:"sim_name", width:90, editable:false, align: "left", resizable: true, sortable: true},
					{name:"class_id", width:90, editable:false, align: "left", resizable: true, sortable: true, hidden: true},
					{name:"class_display_name", width:90, editable:false, align: "left", resizable: true, sortable: true},
					{name:"attr_id", width:90, editable:false, align: "left", resizable: true, sortable: true, hidden: true},
					{name:"attr_display_name", width:90, editable:false, align: "left", resizable: true, sortable: true},
					],
				rownumbers: false,
				rownumWidth: 0,
				rowNum: 10000
				});
			
		//playback config
		$('<h3><a>Playback</a></h3>').appendTo(this.accordion);
		(this.playbackPanel = $('<div></div>'))
			.appendTo(this.accordion);
					
		($('<div class="section"><h4>Frame rate</h4><input class="frameRateInput" disabled="true" value="fps"/></div></div>'))
			.appendTo(this.playbackPanel);
		(this.frameRateInput = this.playbackPanel.find('.frameRateInput'));
		
		//user interaction
		$('<h3><a>User interaction</a></h3>').appendTo(this.accordion);
		(this.userInteractionPanel = $('<div></div>'))
			.appendTo(this.accordion);
			
		($('<div class="section"><h4>Show tooltips</h4><select class="isShowingTooltipsSelector"></select></div>'))
			.appendTo(this.userInteractionPanel);
		(this.isShowingTooltipsSelector = this.userInteractionPanel.find('.isShowingTooltipsSelector'))
			.append($('<option value="1">Yes</option>'))
			.append($('<option value="0">No</option>'))
			.change(function(){
				var val = parseInt($(this).val()) == 1;
				for (var i = 1; i <= $('#config').config('getNumPanels'); i++){
					$('#panel' + i).panel('setShowingTooltips', val);
				}
				$('#config').config('updateLocationHash');
				});
				
		($('<div class="section"><h4>Respond to clicks</h4><select class="isClickResponsiveSelector"></select></div>'))
			.appendTo(this.userInteractionPanel);
		(this.isClickResponsiveSelector = this.userInteractionPanel.find('.isClickResponsiveSelector'))
			.append($('<option value="1">Yes</option>'))
			.append($('<option value="0">No</option>'))
			.change(function(){
				var val = parseInt($(this).val()) == 1;
				for (var i = 1; i <= $('#config').config('getNumPanels'); i++){
					$('#panel' + i).panel('setClickResponsive', val);
				}
				$('#config').config('updateLocationHash');
				});
				
		//export config
		$('<h3><a>Export</a></h3>').appendTo(this.accordion);
		(this.exportPanel = $('<div></div>'))
			.appendTo(this.accordion);
			
		($('<div class="section"><h4>Width (cm)</h4><input class="exportWidthInput" value="17.8"/></div></div>'))
			.appendTo(this.exportPanel);
		(this.exportWidthInput = this.exportPanel.find('.exportWidthInput')).numeric({ decimal: '.', negative: false });
		
		($('<div class="section"><h4>Height (cm)</h4><input class="exportHeightInput" value="24.0"/></div></div>'))
			.appendTo(this.exportPanel);
		(this.exportHeightInput = this.exportPanel.find('.exportHeightInput')).numeric({ decimal: '.', negative: false });
		
		($('<div class="section"><h4>Panel margin (cm)</h4><input class="exportPanelMarginInput" value="0.5"/></div></div>'))
			.appendTo(this.exportPanel);
		(this.exportPanelMarginInput = this.exportPanel.find('.exportPanelMarginInput')).numeric({ decimal: '.', negative: false });
		
		($('<div class="section"><h4>Display subfigure labels</h4><select class="exportShowSubfigureLabelsSelector"></select></div></div>'))
			.appendTo(this.exportPanel);
		(this.exportShowSubfigureLabelsSelector = this.exportPanel.find('.exportShowSubfigureLabelsSelector'))
			.append($('<option value="1">Yes</option>'))
			.append($('<option value="0">No</option>'))
			.val(1);
			
		($('<div class="section"><h4>Use minimal mode</h4><select class="showMinimalModeSelector"></select></div></div>'))
			.appendTo(this.exportPanel);
		(this.showMinimalModeSelector = this.exportPanel.find('.showMinimalModeSelector'))
			.append($('<option value="1">Yes</option>'))
			.append($('<option value="0">No</option>'))
			.val(0)
			.bind("change", function(){
				$('#config').config('setMinimalMode', $(this).val());
			});
			
		//activate accordion
		this.accordion.accordion({
			fillSpace: true,
			collapsible: true,
			});
			
		//update state
		this.setUpdatingHash(false);
	},
	
	_setOption: function( key, value ) {
		switch ( key ) {
			case 'showLabels':
				this.setShowLabels(value);
				break;
		}
		
		this.options[ key ] = value;
	},
	
	open: function(){
		$('#timeline').timeline('dialogOpen');
		$.ui.dialog.prototype.open.call(this);
	},
	
	close: function(){
		$.ui.dialog.prototype.close.call(this);
		$('#timeline').timeline('dialogClose');		
	},
	
	openTab: function(tabName){
		this.open();
		switch(tabName){
			case 'datasource':
				this.accordion.accordion('option', {'active': 0});
				break;
			case 'panels':
				this.accordion.accordion('option', {'active': 1});
				break;
			case 'playback':
				this.accordion.accordion('option', {'active': 2});
				break;
			case 'userinteraction':
				this.accordion.accordion('option', {'active': 3});
				break;
			case 'export':
				this.accordion.accordion('option', {'active': 4});
				break;
		}		
	},
	
	getNumPanels: function(){
		return this.getNumPanelRows() * this.getNumPanelCols();
	},
	getNumPanelRows: function(){
		return parseInt(this.numPanelRowsInput.val());
	},
	getNumPanelCols: function(){
		return parseInt(this.numPanelColsInput.val());
	},
	setNumPanelRows: function(val){
		this.numPanelRowsInput.val(val);
	},
	setNumPanelCols: function(val){
		this.numPanelColsInput.val(val);
	},
	
	getUpdatingHash: function(){
		return this.isUpdatingHash;
	},
	setUpdatingHash: function(val){
		this.isUpdatingHash = val;
	},
	
	selectPanel: function(panel_id){
		this.panelSelector.val(panel_id.substr(5));
		this.removeSeriesSelector.jqGrid('clearGridData');
		this.removeSeriesSelector.jqGrid('addRowData', 'index', $(document).data(panel_id));
	},
	
	getSimulations: function(){
		var dialogWindow = createAjaxDialog('Retrieving simulations. This may take a few minutes over slow connections. Please be patient ...');		
		var simulationSelector = this.simulationSelector;
		$.ajax({
			url: $('#config').config('getDataSourceBaseUrl') + 'getSimulations.php',
			crossDomain: true,
			dataType: 'json',
			success: function(data){				
				simulationSelector.html('');
				for (var i = 0; i < data.length; i++){
					simulationSelector.append($('<option value="' + data[i].batch + '_' + data[i].index + '">' + data[i].name + '</option>'));
				}				
				dialogWindow.dialog('close');
			},
			error: function(jqXHR, status, err){
				dialogWindow
					.dialog({
						dialogClass: "ajaxStatusAlert",
						})
					.html('Unable to retrieve simulations. Please refresh page to retry.');
			},
		});
	},
	
	searchSeriesXhr: undefined,
	searchSeriesDialog: undefined,
	searchSeries: function (query, class_id) {
		if (typeof this.searchSeriesXhr != 'undefined') {			
			this.searchSeriesXhr.abort();
		}
		
		if (typeof this.searchSeriesDialog != 'undefined')
			this.searchSeriesDialog.dialog('close');
			
		this.searchSeriesDialog = createAjaxDialog('Retrieving matching series ...');	
		var addSeriesSelector = this.addSeriesSelector;
		var searchSeriesDialog = this.searchSeriesDialog;
		this.searchSeriesXhr = $.ajax({
			url: $('#config').config('getDataSourceBaseUrl') + 'searchSeries.php',
			crossDomain: true,
			data: {query: query, class_id: class_id},
			dataType: 'json',
			success: function(data) {
				var results = '';
				for (var i = 0; i < data.length; i++) {
					results += '<option value="' + data[i].id + '_' + data[i].class_id + '">' + data[i].display_name + '</option>';
				}
				addSeriesSelector.html(results);
				searchSeriesDialog.dialog('close');
			},
			error: function(jqXHR, status, err){				
				searchSeriesDialog
					.dialog({
						dialogClass: "ajaxStatusAlert",
						})
					.html('Unable to retrieve matching series. Please retry searching.');
			},
		});
	},
	
	getSeriesClasses: function () {
		var dialogWindow = createAjaxDialog('Retrieving data series types ...');
		var seriesTypeSelector = this.seriesTypeSelector;		
		$.ajax({
			url: $('#config').config('getDataSourceBaseUrl') + 'getSeriesClasses.php',
			crossDomain: true,
			dataType: 'json',
			success: function(data) {
				var html = '<option value="0">All</option>';
				for (var i = 0; i < data.length; i++) {
					html += '<option value="' + data[i]['id'] + '">' + data[i]['display_name'] + '</option>';
				}
				seriesTypeSelector.html(html);
				dialogWindow.dialog('close');
			},
			error: function(jqXHR, status, err){
				dialogWindow
					.dialog({
						dialogClass: "ajaxStatusAlert",
						})
					.html('Unable to retrieve data series types. Please refresh page to retry.');
			},
		});
	},
	
	getModifiedConfig: function (updatingPanelNum, updatingPanelMetadata) {
		var allPanelsMetadata = [];
		var maxPanel = 0;
		for  (var i = 1; i <= this.getNumPanels(); i++){
			var panelMetadata = [];
			var panelData;
			if (i == updatingPanelNum)
				panelData = updatingPanelMetadata;
			else
				panelData = $(document).data('panel' + i);
			
			if (panelData == undefined)
				panelData = [];
			else
				maxPanel = i;

			for (var j = 0; j < panelData.length; j++){
				panelMetadata.push({
					sim_id:panelData[j].sim_id,
					class_id: panelData[j].class_id,
					attr_id: panelData[j].attr_id,
					});
			}
			allPanelsMetadata.push(panelMetadata);
		}
		
		return {
			panels: {
				showMinimalMode: this.getMinimalMode(),
				rows: this.getNumPanelRows(),
				cols: this.getNumPanelCols(),
				metadata: allPanelsMetadata.slice(0, maxPanel),
				},
			playback: {
				repeat: $('#timeline').timeline('getRepeat') + 0.0,
				speed: $('#timeline').timeline('getSpeed') + 0.0,
				},
			visualization: {
				isClickResponsive: parseInt($('#config').find('.isClickResponsiveSelector').val()),
				isShowingTooltips: parseInt($('#config').find('.isShowingTooltipsSelector').val()),
				},
			};
	},
	
	updateLocationHash: function(updatingPanelNum, updatingPanelMetadata){
		if (this.getUpdatingHash())
			return;
			
		this.setUpdatingHash(true);
		
		window.location.hash = JSON.stringify(this.getModifiedConfig(updatingPanelNum, updatingPanelMetadata));
	},
	
	setMinimalMode: function (val) {
		this.options.showMinimalMode = val;
		if ($('.showMinimalModeSelector').val() != val)
			$('.showMinimalModeSelector').val(val);
		
		var styleSheet = document.styleSheets[document.styleSheets.length - 1];
		var rules = new Array();
		if (styleSheet.cssRules)
			rules = styleSheet.cssRules;
		else if (styleSheet.rules)
			rules = styleSheet.rules;
			
		var panelTitleRule = undefined;
		var panelDataTitleRule = undefined;
		var panelSimTitleRule = undefined;
		var panelButtonsRule = undefined;
		var containerRule = undefined;
		for (var i = 0; i < rules.length; i++){
			if (rules[i].selectorText == '.panel .ui-dialog-titlebar')
				panelTitleRule = rules[i];
			if (rules[i].selectorText == '.panel .ui-dialog-title .dataTitle')
				panelDataTitleRule = rules[i];
			if (rules[i].selectorText == '.panel .ui-dialog-title .simTitle')
				panelSimTitleRule = rules[i];
			if (rules[i].selectorText == '.panel .ui-dialog-titlebar .buttons')
				panelButtonsRule = rules[i];
			if (rules[i].selectorText == '#container')
				containerRule = rules[i];
		}
		
		if (val == 1) {
			$('#header').hide();			
			if (panelTitleRule) panelTitleRule.style.height = '12px';
			if (panelDataTitleRule) panelDataTitleRule.style.fontWeight = 'bold';
			if (panelSimTitleRule) panelSimTitleRule.style.display = 'none';
			if (panelButtonsRule) panelButtonsRule.style.display = 'none';
			$('#timeline').hide();
			if (containerRule){
				containerRule.style.top = '-9px';
				containerRule.style.bottom = '-10px';
				containerRule.style.left = '-9px';
				containerRule.style.right = '-8px';
			}
			this.options.panelVertMargin = 5;
			this.options.panelHorzMargin = 9;
		} else {
			$('#header').show();
			if (panelTitleRule) panelTitleRule.style.height = '26px';	
			if (panelDataTitleRule) panelDataTitleRule.style.fontWeight = 'normal';
			if (panelSimTitleRule) panelSimTitleRule.style.display = 'block';
			if (panelButtonsRule) panelButtonsRule.style.display = 'block';
			$('#timeline').show();
			if (containerRule){
				containerRule.style.top = '66px';
				containerRule.style.bottom = '27px';
				containerRule.style.left = '0px';
				containerRule.style.right = '0x';
			}
			this.options.panelVertMargin = 8;
			this.options.panelHorzMargin = 10;
		}
				
		$('#config').config('updateLocationHash');
		layoutPanels();
	},
	getMinimalMode: function () {
		return  this.options.showMinimalMode;		
	},
		
	getMargins: function() {
		return {
			panelVertMargin: this.options.panelVertMargin,
			panelHorzMargin: this.options.panelHorzMargin
		};
	},
	
	getShowLabels: function(){
		return this.options.showLabels;
	},
	
	setShowLabels: function(val){
		this.options.showLabels = val;
		if (val) {
			$('#timeline').find('.showLabelsButton')
				.addClass('ui-state-active')
				.css('padding', 0);
		} else {
			$('#timeline').find('.showLabelsButton')
				.removeClass('ui-state-active')
				.css('padding', 1);
		}
		
		var time = $('#timeline').timeline('getTime');
		for (var i = 1; i <= this.getNumPanels(); i++){
			$('#panel' + i).panel('redraw', time);
		}
	},
	
	getDataSourceBaseUrl: function(){
		return this.options.dataSourceBaseUrl;
	},
	
	setDataSourceBaseUrl: function(val){
		this.options.dataSourceBaseUrl = val;
		if (this.dataSourceBaseUrlInput.val() != val)
			this.dataSourceBaseUrlInput.val(val);
	},
});

/* timeline */
$.widget("wholecellviz.timeline", {
	playOnDialogClose: undefined,
	
	options: {
		speed: 1000.0,
		repeat: true,
		timeMin: NaN,
		timeMax: NaN,
		time: NaN,
        },
		
    _create: function() {
		//initialize to paused to configuration
		this._isEnabled = false;
		this._isSliding = false;
		this._isPlaying = false;
		this._tween = undefined;
		this._ticker = com.greensock.core.Animation.ticker;
		this._prevTickTime = undefined;
		
		//create ui elements
		(this.playPauseButton = $('<a title="Play"><span class="ui-icon ui-icon-play"></span></a>'))
			.appendTo(this.element)
			.addClass('playPauseButton')
			.addClass("ui-corner-all")
			.hover(function(){
					var timeline = $('#timeline');
					if (!timeline.timeline('getEnabled'))
						return;
					$(this)
						.addClass('ui-state-hover')
						.css('padding', 0);
				}, function(){
					var timeline = $('#timeline');
					if (!timeline.timeline('getEnabled'))
						return;
					$(this)
						.removeClass('ui-state-hover')
						.css('padding', 1);
				})
			.click(function(event) {
					var timeline = $('#timeline');
					if (!timeline.timeline('getEnabled'))
						return;
					timeline.timeline('togglePlay');
				});
				
		(this.repeatButton = $('<a title="Repeat"><span class="ui-icon ui-icon-refresh"></span></a>'))
			.appendTo(this.element)
			.addClass('repeatButton')
			.addClass("ui-corner-all")
			.hover(function(){
					var timeline = $('#timeline');
					if (!timeline.timeline('getEnabled'))
						return;
					$(this).addClass('ui-state-hover');
					if (!timeline.timeline('getRepeat'))
						$(this).css('padding', 0);
				}, function(){
					var timeline = $('#timeline');
					if (!timeline.timeline('getEnabled'))
						return;
					$(this).removeClass('ui-state-hover')
					if (!timeline.timeline('getRepeat'))
						$(this).css('padding', 1);
				})
			.click(function(event) {
					var timeline = $('#timeline');
					if (!timeline.timeline('getEnabled'))
						return;
					timeline.timeline('setRepeat', !timeline.timeline('getRepeat'));
					
					$('#config').config('updateLocationHash');
				});
				
		(tmp = $('<div><a title="Speed" class="speedButton"><span class="ui-icon ui-icon-signal"></span></a><div class="speedContainer"><div class="speedSelector" /><div class="speedText" /></div></div>'))
			.appendTo(this.element)
			.hover(function(){
					var timeline = $('#timeline');
					if (!timeline.timeline('getEnabled'))
						return;
					$(this).find('.speedButton').addClass('ui-state-hover');
					if (timeline.find('.speedContainer').is(':hidden'))
						$(this).find('.speedButton').css('padding', 0);
				}, function(){
					var timeline = $('#timeline');
					if (!timeline.timeline('getEnabled'))
						return;
					$(this).find('.speedButton').removeClass('ui-state-hover');
					if (timeline.find('.speedContainer').is(':hidden'))
						$(this).find('.speedButton').css('padding', 1);
				})
			.click(function(event) {
					var timeline = $('#timeline');
					if (!timeline.timeline('getEnabled'))
						return;
					
					if (timeline.find('.speedContainer').is(':hidden')) {
						$(this).find('.speedButton')
							.addClass('ui-state-active')
							.css('padding', 0);
						timeline.find('.speedContainer').show();
					} else {
						$(this).find('.speedButton')
							.removeClass('ui-state-active')
							.css('padding', 1);
						timeline.find('.speedContainer').hide();
					}				
				});
		(this.speedButton = tmp.find('.speedButton'))
			.addClass("ui-corner-all");				
		(this.speedContainer = tmp.find('.speedContainer'))
			.hide();
		(this.speedSelector = tmp.find('.speedSelector'))
			.addClass('fox noUiSlider')
			.noUiSlider({
				orientation: "vertical",
				handles:1,
				start: 1,
				range: [0, 4],
				step: 0.1,
				slide: function(){
					$('#timeline').timeline('setSpeed', Math.pow(10, 4 - $(this).val()));
					$('#config').config('updateLocationHash');
				}
			});
		(this.speedText = tmp.find('.speedText'));
			
		(this.progressBarContainer = $('<div></div>'))
			.appendTo(this.element)
			.addClass('progressBarContainer');
		(this.progressBar = $('<div></div>'))
			.appendTo(this.progressBarContainer)
			.addClass('progressBar')
			.progressbar({'value': 0});
		(this.progressBarDragger = $('<div></div>'))
			.appendTo(this.progressBarContainer)
			.addClass('progressBarDragger')
			.addClass('ui-corner-all');
		this.progressBarContainer
			.mousemove(function(event){
				var timeline = $('#timeline');
				if (!timeline.timeline('getEnabled'))
					return;
					
				var w = $(this).width();
				var x = Math.max(0, Math.min(w, event.pageX - this.offsetLeft));
				var frac = x / w;
				
				$('#tooltip').tooltip('show', {pageX: event.pageX, pageY: timeline.offset().top + 12},
					'Time: ' + formatTime(timeline.timeline('getTimeFromFraction', frac), '') + ' (' + Math.round(frac * 100, 1) + '%)',
					true);
					
				timeline.find('.progressBarDragger')
					.css('left', x);
				
				if (timeline.timeline('getSliding'))
					timeline.timeline('setTimeByFraction', Math.max(0, Math.min($(this).width(), event.pageX - this.offsetLeft)) / $(this).width());
				})
			.mouseout(function(event){
				var timeline = $('#timeline');
				if (!timeline.timeline('getEnabled'))
					return;
				$('#tooltip').tooltip('hide');
				})
			.mousedown(function(event){
				var timeline = $('#timeline');
				if (!timeline.timeline('getEnabled'))
					return;
				timeline.timeline('setSliding', true);
				timeline.timeline('pause');
				})
			.mouseup(function(event){
				var timeline = $('#timeline');
				if (!timeline.timeline('getEnabled'))
					return;
				timeline.timeline('setSliding', false);
				if (timeline.timeline('getPlaying'))
					timeline.timeline('play');
				})
			.click(function(event){
				var timeline = $('#timeline');
				if (!timeline.timeline('getEnabled'))
					return;
				timeline.timeline('pause');
				timeline.timeline('setTimeByFraction', Math.max(0, Math.min($(this).width(), event.pageX - this.offsetLeft)) / $(this).width());
				if (timeline.timeline('getPlaying'))
					timeline.timeline('play');
				});
			
		(this.timeText = $('<div></div>'))
			.appendTo(this.element)
			.addClass('timeText');
			
		(this.showLabelsButton = $('<a title="Show labels"><span class="ui-icon ui-icon-tag"></span></a>'))
			.appendTo(this.element)
			.addClass('showLabelsButton')
			.addClass("ui-corner-all")
			.hover(function(){
					$(this).addClass('ui-state-hover');
					if (!$(this).hasClass('ui-state-active'))
						$(this).css('padding', 0);
				}, function(){
					$(this).removeClass('ui-state-hover')
					if (!$(this).hasClass('ui-state-active'))
						$(this).css('padding', 1);
				})
			.click(function(event) {
					$('#config').config('setShowLabels', !$('#config').config('getShowLabels'));
				});
				
		(this.configButton = $('<a title="Config"><span class="ui-icon ui-icon-gear"></span></a>'))
			.appendTo(this.element)
			.addClass('configButton')
			.addClass("ui-corner-all")
			.hover(function(){
					$(this)
						.addClass('ui-state-hover')
						.css('padding', 0);
				}, function(){
					$(this)
						.removeClass('ui-state-hover')
						.css('padding', 1);
				})
			.click(function(event) {
					$('#config').config('open');
				});
			
		//set options
		this._setOption('time', this.options.time);
		this.updateTimeRange();
	},
		
	_init: function() {
	},
	
	widget: function() {
		return this.uiDialog;
	},
	
	_setOption: function( key, value ) {
		switch ( key ) {
			case 'speed':
				this.setSpeed(value);
				break;
			case 'repeat':
				this.setRepeat(value);
				break;
			case 'time':
				this.setTime(value);
				break;
		}
		
		this.options[ key ] = value;
	},
	
	updateTimeRange: function(){
		//get time range
		var timeMin = NaN;
		var timeMax = NaN;
		for (var i = 1; i <= $('#config').config('getNumPanels'); i++){
			timeMin = Math.nanmin(timeMin, $('#panel' + i).panel('getTimeMin'));
			timeMax = Math.nanmax(timeMax, $('#panel' + i).panel('getTimeMax'));
		}
			
		//disable if no plots loaded
		if (isNaN(timeMin) || isNaN(timeMax) || timeMin == timeMax){
			this.disable();
			return;
		}
		
		//set time range
		this.options.timeMin = timeMin;
		this.options.timeMax = timeMax;
		
		//replot
		for (var i = 1; i <= $('#config').config('getNumPanels'); i++){
			var panel = $('#panel' + i);
			if (panel.panel('getType') == 'timeSeries'){
				var ready = true;
				var data = $(document).data('panel' + i.toString());
				for (var j = 0; j < data.length; j++){
					ready = ready && (typeof data[j].data != 'undefined');
				}
				if (ready)
					panel.panel('plotData');
			}
		}
		
		//enable
		this.element.addClass('enabled');
		if (!this._isEnabled){
			this._isEnabled = true;
			this.setTime(timeMin);
			this._isPlaying = true;
			this.play();
		}else{
			this.setTime(this.options.time);
		}
	},
	
	disable: function(){
		this._isEnabled = false;
		this._isPlaying = false;
		this.pause();
		this.options.time = NaN;
		this.options.timeMin = NaN;
		this.options.timeMax = NaN;
		this.element.removeClass('enabled');
		this.setSliding(false);
		this.progressBar.progressbar('value', 0);
		this.timeText.html('Time N/A');
		$('#config').find('.frameRateInput').val('fps');
	},

	getEnabled: function(){
		return this._isEnabled;
	},
	
	setSliding: function(val){
		this._isSliding = val;
	},
	getSliding: function(){
		return this._isSliding;
	},
	
	getPlaying: function(){
		return this._isPlaying;
	},
	
	getSpeed: function(){
		return this.options.speed;
	},
	setSpeed: function(val){
		if (val >= 1)
			val = Math.round(val);
		else
			val = Math.round(val * 10) / 10;
			
		this.options.speed = val + 0.0;		
				
		if (Math.pow(10, 4 - this.speedSelector.val()) != tmp){
			this.speedSelector.val(4 - Math.log10(tmp));
			this.speedText.html(val + 'X');
		}
		
		if (this._isPlaying){
			this.pause();
			this.play();
		}
	},
	
	getRepeat: function(){
		return this.options.repeat;
	},
	setRepeat: function(val){
		val = Boolean(val);
		this.options.repeat = val;
		
		if (val) {
			this.repeatButton
				.addClass('ui-state-active')
				.css('padding', 0);			
		} else {
			this.repeatButton
				.removeClass('ui-state-active')
				.css('padding', 1);
		}
	},
	
	getTime: function(){
		return this.options.time;
	},
	getTimeFromFraction: function(val){
		return val * (this.options.timeMax - this.options.timeMin) + this.options.timeMin;
	},
	setTime: function(val){
		val = Math.nanmax(this.options.timeMin, Math.nanmin(this.options.timeMax, val));
		this.options.time = val;
		
		//frame rate
		if (this._isPlaying){
			var now = this._ticker.time;
			if (this._prevTickTime != undefined){
				$('#config').find('.frameRateInput').val((1 / (now - this._prevTickTime)).toFixed(3) + '\u2009fps');
			}
			this._prevTickTime = now;
		}
		
		//progress bar
		this.progressBar.progressbar('value',
			(val - this.options.timeMin) /
			(this.options.timeMax - this.options.timeMin) * 100);
		
		//time text
		this.timeText.html(formatTime(val, '&thinsp;'))
		
		//animate plots
		for (var i = 1; i <= $('#config').config('getNumPanels'); i++) {			
			$('#panel' + i).panel('animate', val);
		}
	},
	setTimeByFraction: function(val){
		this.setTime(this.getTimeFromFraction(val));
	},
	
	getTimeMin: function(){
		return this.options.timeMin;
	},	
	getTimeMax: function(){
		return this.options.timeMax;
	},

	togglePlay: function(){
		this._isPlaying = !this._isPlaying;
		if (this._isPlaying){
			this.play();
		}else{
			this.pause();
		}
	},
	
	play: function(){
		this.playPauseButton
			.attr('title', 'Pause')
			.children('span')
				.removeClass('ui-icon-play')
				.addClass('ui-icon-pause');
			
		if (this.options.time == this.options.timeMax)
			this.setTime(this.options.timeMin);
			
		var tmp = {'time': this.options.time};
		this._tween = TweenLite.to(tmp, (this.options.timeMax - this.options.time) / this.options.speed, {
			time: this.options.timeMax,
			onUpdate: function(){
				$('#timeline').timeline('setTime', tmp.time);
			},
			onComplete: function(){
				$('#timeline').timeline('onComplete');
			},
		});
	},
	
	pause: function(){
		this._prevTickTime = undefined;
		$('#config').find('.frameRateInput').val('fps');
		
		this.playPauseButton
			.attr('title', 'Play')
			.children('span')
				.removeClass('ui-icon-pause')
				.addClass('ui-icon-play');
		
		if (this._tween != undefined)
			this._tween.kill();
	},
	
	onComplete: function(){
		this.pause();
		if (this.options.repeat){
			this.setTime(this.options.timeMin);
			this.play();
		}
	},	
	
	dialogOpen: function(){
		this.playOnDialogClose = this.getPlaying();
		this.pause();		
	},
	
	dialogClose: function(){
		if (this.playOnDialogClose)
			this.play();
	},
});

/* panels */
$.widget("wholecellviz.panel", $.ui.dialog, {
	_type: undefined,
	zoom: undefined,	
	
	options: {
			dialogClass: 'panel',
			autoOpen: true,
			resizable: false,
			draggable: false,
			closeOnEscape: false,
			zIndex: 0,
			showUnzoomButton: false,
			showInfoButton: false,
			dataTitle: null,
			simTitle: null,
			bigFontSize: 10,
			smallFontSize: 8,			
        },
	
    _create: function() {
		$.ui.dialog.prototype._create.call(this);
		
		//append to container, rather than body
		this.uiDialog.appendTo($('#container'));
		
		//create ui elements
		( this.dataTitle = $('<div></div>'))
			.appendTo(this.uiDialogTitlebar.find('.ui-dialog-title'))
			.addClass('dataTitle');
		
		(this.simTitle = $('<div></div>'))
			.appendTo(this.uiDialogTitlebar.find('.ui-dialog-title'))
			.addClass('simTitle');
		
		( this.titlebarButtons = $( "<div></div>" ) )
			.addClass( "buttons" )
			.appendTo( this.uiDialogTitlebar );
			
		( this.fullscreenButton = $('<a title="Fullscreen"><span class="ui-icon ui-icon-arrow-4-diag"></span></a>'))
			.appendTo(this.titlebarButtons)
			.addClass("ui-corner-all")
			.hover(function(){
					$(this).addClass('ui-state-hover');
				}, function(){
					$(this).removeClass('ui-state-hover');
				})
			.click(function(event) {	
					var panel_id = parseInt($(this).parent().parent().parent().find('.ui-dialog-content').attr('id').substr(5));
					var config = $('#config').config('getModifiedConfig', -1, undefined);
					
					config.panels.rows = 1;
					config.panels.cols = 1;
					
					if (config.panels.metadata.length >= panel_id) {
						config.panels.metadata = [config.panels.metadata[panel_id - 1]];
					} else {
						config.panels.metadata = [];
					}
					
					loadConfigurationHelper(config);

					$('#config').config('updateLocationHash');
				});
		
		( this.configButton = $('<a title="Config panel"><span class="ui-icon ui-icon-gear"></span></a>'))
			.appendTo(this.titlebarButtons)
			.addClass("ui-corner-all")
			.hover(function(){
					$(this).addClass('ui-state-hover');
				}, function(){
					$(this).removeClass('ui-state-hover');
				})
			.click(function(event) {
					panel_id = $(this).parent().parent().parent().find('.ui-dialog-content').attr('id');					
					$('#config').config('selectPanel', panel_id);
					$('#config').config('openTab', 'panels');					
				});
		
		( this.unzoomButton = $('<a title="Reset axis ranges"><span class="ui-icon ui-icon-extlink"></span></a>'))
			.appendTo(this.titlebarButtons)
			.addClass("ui-corner-all")
			.hover(function(){
					$(this).addClass('ui-state-hover');
				}, function(){
					$(this).removeClass('ui-state-hover');
				})
			.click(function(event) {
					panel_id = $(this).parent().parent().parent().find('.ui-dialog-content').attr('id');
					$('#' + panel_id).panel('setZoom', undefined);
				});
		
		( this.infoButton = $('<a title="Info"><span class="ui-icon ui-icon-info"></span></a>'))
			.appendTo(this.titlebarButtons)
			.addClass("ui-corner-all")
			.hover(function(){
					$(this).addClass('ui-state-hover');
				}, function(){
					$(this).removeClass('ui-state-hover');
				})
			.click(function(event) {
					panel_id = $(this).parent().parent().parent().find('.ui-dialog-content').attr('id');
					$('#help').html('');
					var data = $(document).data(panel_id);
					var infos = [];
					for (var i = 0; i < data.length; i++){
						infos.push(sprintf('<div><h1>%s</h1><p>%s</p></div>',
							data[i].attr_display_name,
							(data[i].attr_descrip != '' ? data[i].attr_descrip : '<i>Information not available.</i>')));
					}
					$('#help').append($(infos.unique().join('')));
					$('#help').dialog('open');
				});
		
		this.element.parent().bind('mouseout', function() { $('#tooltip').tooltip('hide');});
		
		this.createPlot();
		
		this._setOption('showUnzoomButton', this.options.showUnzoomButton);
		this._setOption('showInfoButton', this.options.showInfoButton);
		this._setOption('dataTitle', this.options.dataTitle);
		this._setOption('simTitle', this.options.simTitle);
		
		//initialize data
		$(document).data(this.element.attr('id'), []);
    },
	
	destroyPlot: function() {
		if (this.plot && this._type == 'visualization'){
			this.plot.destroy();
		}
	},
	
	_destroy: function() {
		$.ui.dialog.prototype._destroy.call(this);
		
		//return to container, rather than body
		this.element.appendTo($('#container'));
	},
	
	_setOption: function( key, value ) {
		$.ui.dialog.prototype._setOption.call(this, key, value);
		
		switch ( key ) {
			case "showUnzoomButton":
				if (value){ this.unzoomButton.show(); }
				else{ this.unzoomButton.hide(); }
				break;
			case "showInfoButton":
				if (value){ this.infoButton.show(); }
				else{ this.infoButton.hide(); }
				break;
			case "dataTitle":
				if (!value)
					this.dataTitle.html('&nbsp;');
				else
					this.dataTitle.html(value);
				break;
			case "simTitle":
				if (!value)
					this.simTitle.html('&nbsp;');
				else
					this.simTitle.html('Simulation: ' + value);
				break;
		}
	},
	
	resize: function(width, height){
		this._setOptions({'width': width, 'height': height});
		this.plotContainer.css({'width': width - 24, 'height': height - 46});
		if (this._type == 'visualization'){
			this.plot.resize(width - 24, height - 46);
		}else{
			this.animate();
		}		
	},
	
	getType: function(){
		return this._type;
	},
	getTimeMin: function(){
		switch (this._type){
			case 'visualization':
				return this.plot.getTimeMin();
			case 'timeSeries':
				var data = $(document).data(this.element.attr('id'));
				var val = NaN;
				for (var i = 0; i < data.length; i++){
					if (data[i] != undefined && data[i].data != undefined)
						val = Math.nanmin(val, data[i].data[0][0]);					
				}
				return val;
			default:
				return NaN;
		}		
	},
	getTimeMax: function(){
		switch (this._type){
			case 'visualization':
				return this.plot.getTimeMax();
				return 
			case 'timeSeries':
				var data = $(document).data(this.element.attr('id'));
				var val = NaN;
				for (var i = 0; i < data.length; i++){
					if (data[i] != undefined && data[i].data != undefined)
						val = Math.nanmax(val, data[i].data[data[i].data.length-1][0]);
				}
				return val;
			default:
				return NaN;
		}
	},
	
	loadPanel: function (metadata){		
		if (this.plot && this._type == 'visualization'){
			this.plot.destroy();
		}
		
		if (metadata.length == 0){
			this.clearPlot();
			return;
		}
		
		//show info button
		this._setOption('showInfoButton', true);
			
		//indicate loading
		this.indicatePanelLoading();
		
		//free previous data
		$(document).data(this.element.attr('id'), []);
		
		//get metadata
		this.getSeriesMetadata(metadata);	
	},
	
	getSeriesMetadataXhr: [],
	getSeriesMetadataDialog: [],
	getSeriesMetadata: function (md) {
		//abort previous requests
		for (var i = 0; i < this.getSeriesMetadataXhr.length; i++)
			this.getSeriesMetadataXhr[i].abort();
		for (var i = 0; i < this.getSeriesMetadataDialog.length; i++)
			this.getSeriesMetadataDialog[i].dialog('close');
			
		//stash initial metadata
		for (var i = 0; i < md.length; i++) {
			md[i].loaded = false;
		}
		$(document).data(this.element.attr('id'), md);
			
		//load complete metadata
		this.getSeriesMetadataXhr = [];
		this.getSeriesMetadataDialog = [];
		for (var i = 0; i < md.length; i++){
			var tmp = this.getSeriesMetadataHelper(md[i], i);
			this.getSeriesMetadataXhr.push(tmp[0]);
			this.getSeriesMetadataDialog.push(tmp[1]);
		}
	},
	
	getSeriesMetadataHelper: function(md, idx, retrieveForGrid, panelNum) {
		var panelId = this.element.attr('id').substr(5);
		
		if (retrieveForGrid)
			content = sprintf('Retrieving metadata for panel %s ...', panelId);
		else
			content = sprintf('Retrieving metadata for panel %s series %d ...', panelId, idx + 1);
			
		var dialog = createAjaxDialog(content);
		var caller = this;
		xhr = $.ajax({
			url: $('#config').config('getDataSourceBaseUrl') + 'getSeriesMetadata.php',
			crossDomain: true,
			data: {'sim_id': md.sim_id, 'class_id': md.class_id, 'attr_id': md.attr_id},
			dataType: 'json',
			'success': function(moreMd, status, jqXHR) {
				if (retrieveForGrid) {
					md = $.extend(md, moreMd);
					
					//update grid
					var grid = $('#config').find("#removeSeriesSelector");
					grid.jqGrid('addRowData', 'index', [md]);
					
					//update hash
					$('#config').config('updateLocationHash', panelNum, grid.jqGrid('getRowData'));
				
					//replot
					$('#panel' + panelId).panel('loadPanel', grid.jqGrid('getRowData'));
					
					//close dialog
					dialog.dialog('close');
					return;
				}		
			
				var completeMd = $(document).data('panel' + panelId);
				completeMd[idx] = $.extend(completeMd[idx], moreMd);
				completeMd[idx].loaded = true;
				$(document).data('panel' + panelId, completeMd);
				
				var allMdLoaded = true;
				var isVisualization = false;
				for (var i = 0; i < completeMd.length; i++){
					allMdLoaded = allMdLoaded && completeMd[i].loaded;
					
					if (completeMd[i].attr_visualization_class_name) {
						isVisualization = true;
						allMdLoaded = completeMd[i].loaded;
						completeMd = [completeMd[i]];
						break;
					}
				}
				
				dialog.dialog('close');
				
				if (allMdLoaded) {
					if (isVisualization) {
						caller._type = 'visualization';
						caller.loadVisualization(completeMd[0]);
					}else{
						caller._type = 'timeSeries';
						caller.getSeriesData(completeMd);
					}
				}
			},
			'error': function(jqXHR, status, err) {
				if (retrieveForGrid)
					content = sprintf('Unable to retrieve simulation metadata for panel %s.', panelId);
				else
					content = sprintf('Unable to retrieve simulation metadata for panel %s series %d.', panelId, idx + 1);
				$(dialog)
					.dialog({dialogClass: "ajaxStatusAlert"})
					.html(content);
			},
		});
	
		return [xhr, dialog];
	},
	
	
	getSeriesDataXhr: [],
	getSeriesDataDialog: [],
	getSeriesData: function (md) {
		//abort previous requests
		for (var i = 0; i < this.getSeriesDataXhr.length; i++)
			this.getSeriesDataXhr[i].abort();
		for (var i = 0; i < this.getSeriesDataDialog.length; i++)
			this.getSeriesDataDialog[i].dialog('close');
			
		//stash metadata
		$(document).data(this.element.attr('id'), md);
		
		//request data
		this.getSeriesDataXhr = [];
		this.getSeriesDataDialog = [];
		var allDataLoaded = true;
		for (var i = 0; i < md.length; i++) {
			if (typeof md[i].data != 'undefined') 
				continue;
			allDataLoaded = false;
			var tmp = this.getSeriesDataHelper(md[i], i);
			this.getSeriesDataXhr.push(tmp[0]);
			this.getSeriesDataDialog.push(tmp[1]);
		}
		
		//plot
		if (allDataLoaded)
			$('#timeline').timeline('updateTimeRange');
	},
	
	getSeriesDataHelper: function(md, idx){
		var panelId = this.element.attr('id').substr(5);
		var dialog = createAjaxDialog(sprintf('Retrieving data for panel %s series %d. This may take a few minutes over slow connections. Please be patient ...', panelId, idx + 1));
		xhr = $.ajax({
			'type': 'GET',
			'url': $('#config').config('getDataSourceBaseUrl') + 'getSeriesData.php',
			'data': {'sim_id': md.sim_id, 'class_name': md.class_name, 'attr_name': md.attr_name},
			'dataType': 'json',
			'success': function(moreData, status, jqXHR) {
				var data = $(document).data('panel' + panelId);
				data[idx].show = true;
				data[idx] = $.extend(data[idx], moreData);
				$(document).data('panel' + panelId, data);
				
				var allDataLoaded = true;
				for (var i = 0; i < data.length; i++)
					allDataLoaded = allDataLoaded && (typeof data[i].data != 'undefined');
				if (allDataLoaded)
					$('#timeline').timeline('updateTimeRange');
				
				dialog.dialog('close');
			},
			'error': function(jqXHR, status, err) {
				$(dialog)
					.dialog({dialogClass: "ajaxStatusAlert"})
					.html(sprintf('Unable to retrieve simulation data for panel %s series %d.', panelId, idx + 1));
			},
		});
		return [xhr, dialog];
	},
	
	loadVisualization: function(metadata){
		this._setOption('dataTitle', metadata.attr_display_name);
		this._setOption('simTitle', metadata.sim_name);
		
		this.indicatePanelLoading();
		this.plot = new window[metadata.attr_visualization_class_name](this.plotContainer, metadata, this.options.bigFontSize, this.options.smallFontSize);
	},
	
	createPlot: function(){
		this.element.html('');
		( this.plotContainer = $('<div></div>'))
			.appendTo(this.element)
			.addClass("plotContainer")
			.css('left', '6px')
			.css('top', '10px')
			.css('width', this.options.width - 16)
			.css('height', this.options.height - 48);
			
		this.plot = undefined;
	},
	
	indicatePanelLoading: function(){
		this.createPlot();
		this.plotContainer.html('<div class="loading">Loading...</div>');
	},
	
	clearPanelLoadingIndicator: function(){
		this.plotContainer.find('.loading').hide();
	},
	
	plotData: function(){
		var panel_id = this.element.attr('id')
		var data = $(document).data(panel_id);
			
		//panel title
		var simTitle = data[0].sim_name;
		var dataTitle = data[0].attr_display_name;
		var multipleSim = false;
		var multipleData = false;
		for (var i = 0; i < data.length; i++){
			if (data[i].sim_id != data[0].sim_id){
				multipleSim = true;
				simTitle = 'multiple selected';
			}
			if (data[i].class_name != data[0]['class_name'] ||
				data[i].attr_name != data[0]['attr_name']){
				multipleData = true;
				dataTitle = 'Multiple series plotted';
			}
		}
		this._setOption('dataTitle', dataTitle)
		this._setOption('simTitle', simTitle)
		
		// set options
		var timeMin = $('#timeline').timeline('getTimeMin');
		var timeMax = $('#timeline').timeline('getTimeMax');
		for (var i = 0; i < data.length; i++){
			timeMin = Math.nanmin(timeMin, data[i].data[0][0]);
			timeMax = Math.nanmax(timeMax, data[i].data[data[i].data.length-1][0]);
		}
		
		var xtick_dp = 0;
		var ytick_dp = 0;
		var options = {
			colors: ["#3d80b3", '#3db34a', '#e78f08', '#cd0a0a', '#573db3'],
			xaxis: {
				margin: 0,
				font: {
					size: this.smallFontSize,
					family: "'PT Sans', sans-serif",
					},
				axisLabel: 'Time (h)',
				axisLabelUseCanvas: true,
				axisLabelFontFamily: "'PT Sans', sans-serif",
				axisLabelFontSizePixels: this.bigFontSize,
				axisLabelPadding: 6,
				color: "#222222",
				tickColor: "#222222",
				tickFormatter: function(val, axis) {
					return (val / 3600).toFixed(axis.tickDecimals);
				},
				tickLength:3,
				tickSize: 2 * 3600,
				transform: function (v) { return v / 3600; },
				inverseTransform: function (v) { return v * 3600; },
				min:timeMin,
				max:timeMax,
			},
			yaxis: {
				margin: 0,
				font: {
					size: this.smallFontSize,
					family: "'PT Sans', sans-serif",
					},
				axisLabelUseCanvas: true,
				axisLabelFontFamily: "'PT Sans', sans-serif",
				axisLabelFontSizePixels: this.bigFontSize,
				axisLabelPadding: 6,
				color: "#222222",
				tickLength:3,
				tickColor: "#222222",
				tickFormatter: function(val, axis) {
					if (Math.abs(val) > 1e3 || Math.abs(val) < 1e-3)
						return Math.toScientific(val, 1);
					else
						return val.toFixed(axis.tickDecimals);
				},				
			},
			series: {
				lines: {
					lineWidth: 1,
				},
			},
			grid: {
				hoverable: true,
				borderColor: '#222222',
				labelMargin: 2,
				borderWidth: 0.5, 
				markingsLineWidth: 0.5,
			},
			selection: {
				mode: "xy"
			},
			legend : {
				position: 'nw',
				margin: [3, 3],
				backgroundColor: "#ccc",
				backgroundOpacity: 0.5,
				labelBoxBorderColor: '#222222',
				labelFormatter: function(label, series) {
					return '<span style="color: #222222; font-size: ' + this.smallFontSize + 'px;" seriesindex="' + series.index + '">'
					+ (multipleData ? series['attr_display_name'] : '')
					+ (multipleData && multipleSim ? ' :: ' : '')
					+ (multipleSim ? series['sim_name'] : '')
					+ '</span>';
				}
			},
			hooks: {
				drawOverlay: function(plot, ctx){
					var time = plot.time;
					if (time == undefined || isNaN(time))
						return
					
					//translate context
					ctx.save();
					ctx.translate(plot.getPlotOffset().left, plot.getPlotOffset().top);
					
					//highlight time
					var allSeries = plot.getData();
					if (allSeries.length > 1){
						var x = allSeries[0].xaxis.p2c(time);
						ctx.lineWidth = 1;
						ctx.strokeStyle = '#cd0a0a';
						ctx.beginPath();
						ctx.moveTo(x, 0);
						ctx.lineTo(x, plot.height());
						ctx.closePath();
						ctx.stroke();
					}
					
					//highlight invidividual series					
					for (var i = 0; i < allSeries.length; i++){
						var series = allSeries[i];
						if (time > series.data[series.data.length - 1][0])
							continue;
						
						var x = series.xaxis.p2c(time);
						var y = series.yaxis.p2c(getDataPoint(series.data, time, true));
						var r = series.points.radius + series.points.lineWidth / 2;
						
						ctx.lineWidth = r;
						ctx.strokeStyle = (typeof series.highlightColor === "string") ? series.highlightColor : $.color.parse(series.color).scale('a', 0.5).toString();
						ctx.beginPath();
						if (series.points.symbol == "circle")
							ctx.arc(x, y, 1.5 * r, 0, 2 * Math.PI, false);
						else
							series.points.symbol(ctx, x, y, 1.5 * r, false);
						ctx.closePath();
						ctx.stroke();
					}
				
					//restore context
					ctx.restore();
				}
			},
		};
		
		if (data.length == 1)
			options.legend.show = false;
		if (!multipleData){
			options.yaxis.axisLabel = data[0]['attr_axis_title'];
			if (options.yaxis.axisLabelUseCanvas){
				options.yaxis.axisLabel = options.yaxis.axisLabel.replace(/<(?:.|\n)*?>/gm, '');
			}
		}
		
		if (this.zoom != undefined){
			this._setOption('showUnzoomButton', true);
			options = $.extend(true, {}, options, this.zoom);
		}else{
			this._setOption('showUnzoomButton', false);
		}
		
		//display selected data
		var data_to_show = [];
		for (var j = 0; j < data.length; j++){
			data[j].index = j;
			data[j].shadowSize = 0;
			if (data[j].show){
				data_to_show.push(data[j]);
			}else{
				var tmp = {};
				for (var key in data[j]){
					if (key == 'data'){
						val = [];
					}else{
						val = data[j][key];
					}
					tmp[key] = val;
				}
				data_to_show.push(tmp);
			}
		}
	
		//plot
		this.createPlot();
		this.plot = $.plot(this.plotContainer, data_to_show, options);
		this.animate();
		this.plotContainer.fadeIn('slow');
		
		//display selected data
		for (var j = 0; j < data.length; j++){
			if (!data[j].show){
				this.plotContainer
					.find('.legend > table > tbody > tr:nth-child(' + (j + 1) + ')')
					.find('.legendColorBox > div > div')
					.css({opacity: 0, filter: 'alpha(opacity=0)'});
			}
		}
		
		// bind plothover event to tooltip display
		this.plotContainer.bind("plothover", function (evt, pos, item) {
			var tip = $("#tooltip");
			if (item) {
				var y_title = item.series.attr_axis_title;
				tip.tooltip('show', item, 'Time: ' + formatTime(pos.x)
					+ "<br>" + y_title + ": " + pos.y.toFixed(ytick_dp));
			}else{
				tip.tooltip('hide');
			}
		});
		
		// bind plotselection event to zooming
		this.plotContainer.bind("plotselected", function (event, ranges) {
			// clamp the zooming to prevent eternal zoom
			if (ranges.xaxis.to - ranges.xaxis.from < 0.00001)
				ranges.xaxis.to = ranges.xaxis.from + 0.00001;
			if (ranges.yaxis.to - ranges.yaxis.from < 0.00001)
				ranges.yaxis.to = ranges.yaxis.from + 0.00001;

			// zoom
			$('#' + panel_id).panel('setZoom', {
				xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to },
				yaxis: { min: ranges.yaxis.from, max: ranges.yaxis.to }
				});
		});
		
		//use legend to toggle series on/off
		this.plotContainer.find('.legendColorBox > div > div').click(function(event){
			var data = $(document).data(panel_id);
			var seriesIndex = parseInt($(event.target).parent().parent().parent().find('.legendLabel > span').attr('seriesindex'))
			data[seriesIndex].show = !data[seriesIndex].show;
			$(document).data(panel_id, data);
			$('#' + panel_id).panel('plotData');
		});
		
		//save data
		$(document).data(panel_id, data);
	},

	setZoom: function(zoom){
		this.zoom = zoom;
		this.plotData();
	},
	
	clearPlot: function(){
		this.createPlot()
		this._setOption('dataTitle', null)
		this._setOption('simTitle', null)
		this._setOption('showUnzoomButton', false);
		this._setOption('showInfoButton', false);
		this._type = undefined;
		this.zoom = undefined;
	},
	
	animate: function (time){
		if (this.plot == undefined)
			return;
			
		if (time == undefined)
			time = $('#timeline').timeline('getTime');
		
		switch(this._type){
			case 'visualization':
				this.plot.drawDynamicContent(time);
				break;
			case 'timeSeries':
				var data = $(document).data(this.element.attr('id'));
				if (data != undefined){
					this.plot.time = time;
					this.plot.triggerRedrawOverlay();
				}
				break;
		}
	},
	
	redraw: function (time){
		if (this._type == 'visualization') {
			this.plot.drawStaticContent();
			this.plot.drawDynamicContent(time);
		}
	},
	
	setShowingTooltips: function (val){
		if (this._type == 'visualization'){
			this.plot.isShowingTooltips = val;
		}
	},
	
	setClickResponsive: function (val){
		if (this._type == 'visualization'){
			this.plot.isClickResponsive = val;
		}
	},
		
	getMetadata: function(){
		var tmp = $(document).data(this.element.attr('id'));
		var md = [];
		for (var i = 0; i < tmp.length; i++){
			md.push({
				sim_batch: tmp[i].sim_batch,
				sim_index: tmp[i].sim_index,
				sim_name: tmp[i].sim_name,
				attr_name: tmp[i].attr_display_name,
				attr_descrip: tmp[i].attr_descrip,
				attr_xaxis: 'Time (s)',
				attr_yaxis: tmp[i].attr_axis_title,
			});
		}
		return md;
	},
	
	getData: function(){
		switch(this._type){
			case 'visualization':
				return this.plot.exportData();
			case 'timeSeries':
				var tmp = $(document).data(this.element.attr('id'));
				var data = [];
				for (var i = 0; i < tmp.length; i++){
					data.push(tmp[i].data);
				}
				return data;
		}
	},
	
	exportSvg: function(ctx, w, h){
		switch(this._type){
			case 'visualization':
				var fontFamily = this.plot.fontFamily;
				var bigFontSize = this.plot.bigFontSize;
				var smallFontSize = this.plot.smallFontSize;
				
				this.plot.fontFamily = 'Arial';
				this.plot.bigFontSize = 7 * 1.25;
				this.plot.smallFontSize = 5 * 1.25;
				
				this.plot.exportSvg(ctx, w, h);
				
				this.plot.fontFamily = fontFamily;
				this.plot.bigFontSize = bigFontSize;
				this.plot.smallFontSize = smallFontSize;
				break;
			case 'timeSeries':
				//options
				var exportOptions = $.extend(true, {}, this.plot.getOptions());
				exportOptions.xaxis.font.family = 'Arial';
				exportOptions.xaxis.font.size = 5 * 1.25;
				exportOptions.xaxis.axisLabelFontFamily = 'Arial';
				exportOptions.xaxis.axisLabelFontSizePixels = 7 * 1.25;				
				exportOptions.yaxis.font.family = 'Arial';
				exportOptions.yaxis.font.size = 5 * 1.25;
				exportOptions.yaxis.axisLabelFontFamily = 'Arial';
				exportOptions.yaxis.axisLabelFontSizePixels = 7 * 1.25;
				exportOptions.yaxis.axisLabelPadding = 0;
				exportOptions.series.lines.lineWidth = 1;
				
				//export
				this.plot.exportSvg(ctx, w, h, exportOptions);			
				break;
		}
	},
});

//tooltip
$.widget("wholecellviz.tooltip", {
	options: {
        },
	
	_create: function(){
		this.element
			.addClass('tooltip')
			.addClass('ui-widget-header')
			.addClass('ui-corner-all')
			.hide();
	},
	
	show: function(evt, content, noDelay){
		this.element
			.html(content)
			.css({
				left: evt.pageX - this.element.width() / 2,
				top: evt.pageY - this.element.height() - 20,
				});
		if (noDelay){
			this.element.show();
		}else{
			this.element.fadeIn(200);
		}
	},
	
	hide: function(){
		this.element.hide();
	}
});

/*
Base visualization class.

Subclasses should implement 3 methods:
- getData: called during construction to fetch data
- calcLayout: called on canvas resize; can be used for pre-processing
- drawDynamicContent: called to draw each frame
*/
var Visualization = Class.extend({	
	dataLoaded: false,
	isEnabled:true,
	time: NaN,
	timeMin: NaN,
	timeMax: NaN,
	
	fontFamily: "'PT Sans', sans-serif",
	bigFontSize:10,
	smallFontSize:8,	
	
	//constructor
	init: function(parent, metadata, bigFontSize, smallFontSize) {
		//save metadata, parent
		this.parent = parent;
		this.metadata = metadata;
		this.bigFontSize = bigFontSize;
		this.smallFontSize = smallFontSize;
		
		//get data
		this.getData(metadata);
	},
	
	//Called during object construction. Subclasses should implement this
	getDataXhrs: [],
	getDataDialogs: [],
	getData: function(metadata) {
		//set not data loaded
		this.dataLoaded = false;
		this.data = {};
		
		//abort any previous AJAX requests; close any previous status windows
		for (var i = 0; i < this.getDataXhrs.length; i++)
			this.getDataXhrs[i].abort();
		for (var i = 0; i < this.getDataDialogs.length; i++)
			this.getDataDialogs[i].dialog('close');
		this.getDataXhrs = [];
		this.getDataDialogs = [];
	},
	
	getDataSuccess: function() {
		this.parent.parent().panel('clearPanelLoadingIndicator');
		
		//set time
		var timeline = $('#timeline');
		timeline.timeline('updateTimeRange');
		this.time = timeline.timeline('getTime');
		if (isNaN(this.time))
			this.time = this.timeMin;
		
		//resize canvases
		this.resize(this.parent.width(), this.parent.height(), true);
		
		//set data loaded
		this.dataLoaded = true;
	},
	
	getSeriesData: function(dataSourceURL, md, field){
		var panelId = $(this.parent).parent().attr('id').substr(5);
		var dialog = createAjaxDialog(sprintf('Retrieving data for panel %s. This may take a few minutes over slow connections. Please be patient ...', panelId));
		var caller = this;
		var xhr = $.ajax({
			'url': $('#config').config('getDataSourceBaseUrl') + dataSourceURL,
			'data': md,
			'dataType': 'json',
			'success': function(data, status, jqXHR) {
				caller.data[field] = data;
				caller.getDataSuccess();
				dialog.dialog('close');
			},
			error: function(jqXHR, status, err){
				dialogWindow
					.dialog({
						dialogClass: "ajaxStatusAlert",
						})
					.html(sprintf('Unable to retrieve data for panel %s.', panelId));
			},
		});
		
		this.getDataXhrs.push(xhr);
		this.getDataDialogs.push(dialog);
	},
	
	getTimeMin: function(){
		return this.timeMin;
	},
	getTimeMax: function(){
		return this.timeMax;
	},
	
	resize: function(width, height, dataLoaded){		
		if (!(dataLoaded || this.dataLoaded))
			return;
			
		//update size
		this.width = width;
		this.height = height;
		
		//update layout
		this.calcLayout();
		
		//redraw
		this.drawStaticContent(dataLoaded);
		this.drawDynamicContent(this.time, dataLoaded);
	},
	
	//Called on canvas resize. Subclasses should implement this.
	calcLayout: function(){
	},
	
	//Called to draw static content. Subclasses should implement this.
	drawStaticContent: function(dataLoaded){
		if (!(this.dataLoaded || dataLoaded))
			return;
	},
	
	//Called to draw dynamic content. Subclasses should implement this.
	drawDynamicContent: function(t, dataLoaded){
		if (!(this.dataLoaded || dataLoaded))
			return;
	},
	
	destroy: function(){
		this.isEnabled = false;
	},
		
	exportData: function () {
		return this.data;
	},
	
	exportSvg: function(ctx, w, h){
	},
});

/*
Base 2D - visualization class.

Subclasses should implement 4 methods:
- getData: called during construction to fetch data
- calcLayout: called on canvas resize; can be used for pre-processing
- drawStaticObjects: called to draw static content
- drawDynamicObjects: called to draw each frame
*/
var Visualization2D = Visualization.extend({
	//internal state -- DO NOT EDIT
	isShowingTooltips: true,
	isClickResponsive: true,
	isDrawingForDisplay: undefined,	
	isDrawingStaticContent: undefined,
	isDrawingForExport: false,
	
	//constructor
	init: function(parent, metadata, bigFontSize, smallFontSize) {
		//set status
		this.isShowingTooltips = parseInt($('#config').find('.isShowingTooltipsSelector').val());
		this.isClickResponsive = parseInt($('#config').find('.isClickResponsiveSelector').val());
		
		//create drawing canvas
		var staticDisplayCanvas = $('<canvas class="viz"></canvas>');
		var self = this;
		staticDisplayCanvas
			.appendTo(parent)
			.bind('mousemove', function(evt){ self.mousemove(evt); })
			.bind('click', function(evt){ self.click(evt); });
		this.staticDisplayCanvas = staticDisplayCanvas.get(0);
		this.staticDisplayContext = this.staticDisplayCanvas.getContext('2d');
		
		var dynamicDisplayCanvas = $('<canvas class="viz"></canvas>');
		var self = this;
		dynamicDisplayCanvas
			.appendTo(parent)
			.bind('mousemove', function(evt){ self.mousemove(evt); })
			.bind('click', function(evt){ self.click(evt); });
		this.dynamicDisplayCanvas = dynamicDisplayCanvas.get(0);
		this.dynamicDisplayContext = this.dynamicDisplayCanvas.getContext('2d');
		
		//create hit detection canvas
		this.staticHitDetectionCanvas = $('<canvas class="viz"></canvas>').get(0);
		this.staticHitDetectionContext = this.staticHitDetectionCanvas.getContext('2d');
		this.dynamicHitDetectionCanvas = $('<canvas class="viz"></canvas>').get(0);
		this.dynamicHitDetectionContext = this.dynamicHitDetectionCanvas.getContext('2d');
		
		//suiper
		this._super(parent, metadata, bigFontSize, smallFontSize);
	},

	resize: function(width, height, dataLoaded){
		if (!(dataLoaded || this.dataLoaded))
			return;
			
		//update canvas
		this.staticDisplayContext.clearRect(0, 0, this.width, this.height);
		this.dynamicDisplayContext.clearRect(0, 0, this.width, this.height);
		this.staticHitDetectionContext.clearRect(0, 0, this.width, this.height);
		this.dynamicHitDetectionContext.clearRect(0, 0, this.width, this.height);
		this.staticDisplayCanvas.width = width
		this.staticDisplayCanvas.height = height;
		this.dynamicDisplayCanvas.width = width
		this.dynamicDisplayCanvas.height = height;
		this.staticHitDetectionCanvas.width = width
		this.staticHitDetectionCanvas.height = height;
		this.dynamicHitDetectionCanvas.width = width
		this.dynamicHitDetectionCanvas.height = height;
		
		//update size
		this.width = width;
		this.height = height;
		this.offset = $(this.staticDisplayCanvas).offset();
		
		//update layout
		this.calcLayout();
		
		//redraw
		this.drawStaticContent(dataLoaded);
		this.drawDynamicContent(this.time, dataLoaded, true);
	},
	
	drawStaticContent: function(dataLoaded){
		if (!(this.dataLoaded || dataLoaded))
			return;
			
		this.isDrawingStaticContent = true;
		
		this.staticDisplayContext.clearRect(0, 0, this.width, this.height);
		this.numStaticUIObjects = 0; //reset UI object counter
		this.isDrawingForDisplay = true;
		this.activeContext = this.staticDisplayContext;
		this.drawStaticObjects();
		
		this.staticHitDetectionContext.clearRect(0, 0, this.width, this.height);
		this.numStaticUIHitDetectionObjects = 0; //reset UI object counter
		this.staticTipFuncs = [];
		this.staticClickFuncs = [];
		this.staticUIObjectsData = [];
		this.isDrawingForDisplay = false;
		this.activeContext = this.staticHitDetectionContext;
		this.drawStaticObjects();
	},
	
	drawDynamicContent: function(t, dataLoaded, isDrawingForDisplay){
		if (!(this.dataLoaded || dataLoaded))
			return;
		
		this.time = t;
		this.isDrawingStaticContent = false;		
		if (isDrawingForDisplay == undefined)
			this.isDrawingForDisplay = true;
		else
			this.isDrawingForDisplay = isDrawingForDisplay
		
		//clear canvas
		if (this.isDrawingForDisplay){			
			this.dynamicDisplayContext.clearRect(0, 0, this.width, this.height);
			this.numDynamicUIObjects = 0; //reset UI object counter
			this.activeContext = this.dynamicDisplayContext;
		}else{
			this.dynamicHitDetectionContext.clearRect(0, 0, this.width, this.height);
			this.numDynamicUIHitDetectionObjects = 0; //reset UI object counter
			this.dynamicTipFuncs = [];
			this.dynamicClickFuncs = [];
			this.dynamicUIObjectsData = [];
			this.activeContext = this.dynamicHitDetectionContext;
		}
		
		//draw objects
		this.drawDynamicObjects(t);
	},
	
	//Called to draw static content. Subclasses should implement this.
	drawStaticObjects: function(){
	},
	
	//Called to draw dynamic content. Subclasses should implement this.
	drawDynamicObjects: function(t){
	},
	
	drawObject: function(options){
		if (options.isLabel && !$('#config').config('getShowLabels'))
			return;
		
		//export
		if (this.isDrawingForExport){
			this.drawObjectHelper(this.activeContext, options.strokeStyle, options.fillStyle, options.globalAlpha, options.drawFunc, options.data);
		}
		
		//display
		else if (this.isDrawingForDisplay){
			this.drawObjectHelper(this.activeContext, options.strokeStyle, options.fillStyle, options.globalAlpha, options.drawFunc, options.data);
			if (options.tipFunc != undefined || options.clickFunc != undefined){
				if (this.isDrawingStaticContent)
					this.numStaticUIObjects++;
				else
					this.numDynamicUIObjects++;
			}
		}
		
		//hit detection
		else if (!this.isDrawingForDisplay && (options.tipFunc != undefined || options.clickFunc != undefined)){
			var style;
			if (this.isDrawingStaticContent){
				this.numStaticUIHitDetectionObjects++;
				this.staticTipFuncs.push(options.tipFunc);
				this.staticClickFuncs.push(options.clickFunc);
				this.staticUIObjectsData.push(options.data);
				style = this.hitDetectionStyle(this.numStaticUIHitDetectionObjects);
			}else{
				this.numDynamicUIHitDetectionObjects++;
				this.dynamicTipFuncs.push(options.tipFunc);
				this.dynamicClickFuncs.push(options.clickFunc);
				this.dynamicUIObjectsData.push(options.data);
				style = this.hitDetectionStyle(this.numDynamicUIHitDetectionObjects);
			}
			this.drawObjectHelper(
				this.activeContext,
				(options.strokeStyle ? style : undefined), 
				(options.fillStyle ? style : undefined), 
				1.0, 
				options.drawFunc, 
				options.data);
		}
	},

	//draw on context
	drawObjectHelper: function(ctx, strokeStyle, fillStyle, globalAlpha, drawFunc, data){
		ctx.beginPath();
		ctx.strokeStyle = strokeStyle;
		ctx.fillStyle = fillStyle;
		ctx.globalAlpha = (globalAlpha == undefined ? 1 : globalAlpha);
			
		drawFunc(this, ctx, data);
		
		ctx.fillAndStroke(fillStyle, strokeStyle);		
	},
	
	drawColorScale: function(x, y, w, h, cLo, cHi, noShowBlack, labelLo, labelHi, nSegments){
		if (noShowBlack == undefined)
			noShowBlack = false;
		if (nSegments == undefined)
			nSegments = 101.;
		if (labelLo == undefined)
			labelLo = 'Lo';
		if (labelHi == undefined)
			labelHi = 'Hi';
		var nHalfSegments = (nSegments - 1) / 2;
			
		for (var i = 0.; i < nSegments; i++){
			if (noShowBlack){
				var f = i / (nSegments - 1);
				var fillStyle = sprintf('rgb(%d,%d,%d)',
					(1 - f) * cLo.r + f * cHi.r,
					(1 - f) * cLo.g + f * cHi.g,
					(1 - f) * cLo.b + f * cHi.b);					
			}else{
				if (i <= nHalfSegments){
					var fillStyle = sprintf('rgb(%d,%d,%d)',
						(1. - i / nHalfSegments) * cHi.r,
						(1. - i / nHalfSegments) * cHi.g,
						(1. - i / nHalfSegments) * cHi.b)
				}else{
					var fillStyle = sprintf('rgb(%d,%d,%d)',
						(i - nHalfSegments) / nHalfSegments * cLo.r,
						(i - nHalfSegments) / nHalfSegments * cLo.g,
						(i - nHalfSegments) / nHalfSegments * cLo.b);
				}
			}
			var y1 = Math.floor(y + h / nSegments * i);
			var y2 = Math.min(Math.floor(y + h / nSegments * (i + 1)) + 1, y + h);
			this.drawObject({
				fillStyle: fillStyle, 
				data: {'x': x, 'y': y1, 'w': w, 'h': y2-y1},
				drawFunc: function (self, ctx, data) {
					ctx.rect(data.x, data.y, data.w, data.h);
				},
			});
		}		
		this.drawObject({
			strokeStyle: '#222222', 
			data: {'x': x, 'y': y, 'w': w, 'h': h},
			drawFunc: function (self, ctx, data) {
				ctx.rect(data.x, data.y, data.w, data.h);
			},
		});
		
		this.drawObject({
			fillStyle: '#222222', 
			data: {'x': x, 'y': y, 'w': w, 'h': h, 'labelHi': labelHi, 'labelLo': labelLo},
			drawFunc: function (self, ctx, data) {
				ctx.font = self.bigFontSize + "px " + self.fontFamily;
				ctx.fillText(data.labelHi, data.x + (data.w - ctx.measureText('Hi').width) / 2, 
					data.y - 3 - 0.3 * self.bigFontSize);
				ctx.fillText(data.labelLo, data.x + (data.w - ctx.measureText('Lo').width) / 2, 
					data.y + data.h + 3 + self.bigFontSize);
			},
		});
	},

	mousemove: function(evt){
		//return if no UI objects or not responding to clicks
		if ((this.numStaticUIObjects == 0 && this.numDynamicUIObjects == 0) || !this.isClickResponsive)
			return;
			
		//redraw hit detection canvas if necessary (if structure is animated)
		if (this.numDynamicUIObjects != 0)
			this.drawDynamicContent(this.time, undefined, false);
		
		//get UI object
		var activeObject = this.getUIObjectIndexAtPixel(evt);
		
		//process click if UI object clicked
		if (activeObject == undefined){
			$('#tooltip').tooltip('hide');
		}else{
			if (activeObject['static']){
				if (this.staticTipFuncs[activeObject.index])
					$('#tooltip').tooltip('show', evt, this.staticTipFuncs[activeObject.index](this, this.staticUIObjectsData[activeObject.index]));
				else
					$('#tooltip').tooltip('hide');
			}else{
				if (this.dynamicTipFuncs[activeObject.index])
					$('#tooltip').tooltip('show', evt, this.dynamicTipFuncs[activeObject.index](this, this.dynamicUIObjectsData[activeObject.index]));
				else
					$('#tooltip').tooltip('hide');
			}
		}
	},
	
	click: function(evt){
		//return if no UI objects or not responding to clicks
		if ((this.numStaticUIObjects == 0 && this.numDynamicUIObjects == 0) || !this.isClickResponsive)
			return;
			
		//redraw hit detection canvas if necessary (if structure is animated)
		if (this.numDynamicUIObjects != 0)
			this.drawDynamicContent(this.time, undefined, false);
		
		//get UI object
		var activeObject = this.getUIObjectIndexAtPixel(evt);
		
		//process click if UI object clicked
		if (activeObject != undefined){
			if (activeObject['static']){
				if (this.staticClickFuncs[activeObject.index])
					this.staticClickFuncs[activeObject.index](this, this.staticUIObjectsData[activeObject.index]);
			}else{
				if (this.dynamicClickFuncs[activeObject.index])
					this.dynamicClickFuncs[activeObject.index](this, this.dynamicUIObjectsData[activeObject.index]);
			}
		}
	},

	getUIObjectIndexAtPixel: function (evt){		
		var rgb, uiObjectIndex;
		
		if (this.offset == undefined || this.offset.left == undefined || this.offset.top == undefined)
			return undefined;
		
		rgb = this.dynamicHitDetectionContext.getImageData(
			Math.round(evt.pageX - this.offset.left),
			Math.round(evt.pageY - this.offset.top),
			1, 1).data;
		uiObjectIndex = rgb[0] * 65536 + rgb[1] * 256 + rgb[2] - 1;
		if (uiObjectIndex > 0 && uiObjectIndex <= this.numDynamicUIHitDetectionObjects)
			return {index: uiObjectIndex, 'static':false};
			
		rgb = this.staticHitDetectionContext.getImageData(
			Math.round(evt.pageX - this.offset.left),
			Math.round(evt.pageY - this.offset.top),
			1, 1).data;
		uiObjectIndex = rgb[0] * 65536 + rgb[1] * 256 + rgb[2] - 1;
		if (uiObjectIndex > 0 && uiObjectIndex <= this.numStaticUIHitDetectionObjects)
			return {index: uiObjectIndex, 'static':true};
			
		return undefined;
	},

	hitDetectionStyle: function (num){
		var tmp = num.toString(16);
		return '#' + '0'.repeat(6-tmp.length) + tmp;
	},
	
	exportSvg: function(ctx, exportW, exportH) {
		if (!this.dataLoaded)
			return;
			
		this.activeContext = ctx;
		this.isDrawingForDisplay = false;
		this.isDrawingForExport = true;
		
		var displayW = this.width;
		var displayH = this.height;
		
		this.width = exportW;
		this.height = exportH;	
		this.calcLayout();
		this.drawStaticObjects();
		this.drawDynamicObjects(this.time);
		
		this.width = displayW;
		this.height = displayH;
		this.calcLayout();
	},
});

var ChromosomeMapVisualization = Visualization2D.extend({
	//options
	colors: ["#3d80b3", '#3db34a', '#cd0a0a', '#e78f08', '#573db3'], //blue, green, red, orange, purple
	numLines: 12,
	ntPerLine: 0.5e5,
	lineSpacing: 0.5,
	strandLabelWidth: 30,
	chrLen: 580076,
	legendW: 10,

	getData: function(md){
		this._super(md);		
	},
	
	getDataSuccess: function() {
		this.dataMax = [];
		for (var i = 0; i < this.data.length; i++){
			var tmp = 0;
			for (var j = 0; j < this.data[i].length; j++){
				tmp = Math.max(tmp, this.data[i][j][1]);
			}
			this.dataMax.push(Math.sqrt(tmp));
		}
		
		this.timeMin = this.data[0][0][0];
		this.timeMax = this.data[0][this.data[0].length - 1][0];
		
		this._super();
	},
	
	calcLayout: function(){
		this.lineTop = this.bigFontSize + 3
		this.lineBottom = this.height - this.bigFontSize - 3;
		
		this.lineHeight = (this.lineBottom - this.lineTop) / (this.numLines  + this.lineSpacing * (this.numLines - 1));
		this.lineSeparation = this.lineHeight * (1 + this.lineSpacing);
		
		this.legendX = this.width - this.legendW;
		this.legendTop = this.lineTop;
		this.legendBottom = this.lineBottom;
		this.legendH = this.legendBottom - this.legendTop;
		
		this.lineWidth = this.legendX - 5 - this.strandLabelWidth;
		this.ntLength = this.lineWidth / this.ntPerLine;
		
		this.arrowLength = this.width / 100;
	},	
	
	drawStaticObjects: function(){
		//draw strands		
		this.drawObject({
			strokeStyle: '#aaaaaa', 
			fillStyle: "#222222", 
			drawFunc: function (self, ctx, data){				
				ctx.lineWidth = 2;
				ctx.font = self.smallFontSize + "px " + self.fontFamily;
				
				for (var i = 0; i < self.numLines; i++) {	
					var y = self.lineTop + i * self.lineSeparation;
					ctx.moveTo(
						self.strandLabelWidth, y + 
						self.lineHeight / 2);
					ctx.lineTo(
							self.strandLabelWidth + (((Math.min(self.chrLen, (i + 1) * self.ntPerLine)-1) % self.ntPerLine) + 1) / self.ntPerLine * self.lineWidth, 
							y + self.lineHeight / 2);
					
					var txt = (i * self.ntPerLine + 1).toString();
					ctx.fillText(txt, 
						self.strandLabelWidth - 5 - ctx.measureText(txt).width,
						y + self.lineHeight / 2 + 0.4 * self.smallFontSize);
				}
			},
		});
		
		//draw objects
		for (var i = 0; i < this.objects.length; i++) {
			this.drawObject({
				data: i,
				strokeStyle: '#222222', 
				fillStyle: 'rgb(255,255,255)', 
				drawFunc: function (self, ctx, i) {
					var objData = self.objects[i];
					var coord = objData.coordinate;
				
					var x = self.strandLabelWidth + (coord % self.ntPerLine) * self.ntLength + 0.25;
					var w = Math.min(self.lineWidth - (x - self.strandLabelWidth), Math.max(0, objData.length * self.ntLength - 0.5));
					var y = self.lineTop + Math.floor(coord / self.ntPerLine) * self.lineSeparation + 0.25;
					var h = self.lineHeight - 0.5;
					if (objData.direction == 'Forward'){
						self.drawObjectForward(ctx, x, y, w, h, i, undefined);
					}else{
						self.drawObjectReverse(ctx, x, y, w, h, i, undefined);
					}
				},
				tipFunc: function(self, i){
					var objData = self.objects[i];
					return sprintf('<h1 class="title">%s</h1>%s<br/><div style="padding-top:4px;">Coordinate: %s<br/>Length: %s<br>Direction: %s</div>', 
						(objData.symbol ? '<i>' + objData.symbol + '</i>' :  objData.name) + ' (' + objData.wid + ')', 
						objData.name, objData.coordinate, objData.length, objData.direction
						);
				},
				clickFunc: function(self, i){
					window.open('http://wholecellkb.stanford.edu/detail/Mgenitalium/' + self.objects[i].wid)
				}
			});
		}
		
		//color scale
		this.drawColorScale(
			this.legendX, this.legendTop, this.legendW, this.legendH,
			{r: 61, g: 128, b: 179},
			{r: 255, g: 250, b: 75});
	},
	
	drawDynamicObjects: function(t){
		//draw objects
		for (var i = 0; i < this.objects.length; i++) {
			var val = this.getDataPoint(i, t);
			
			this.drawObject({
				data: {'i':i, 'val': val},
				fillStyle: this.getObjectFillStyle(i, val), 
				drawFunc: function (self, ctx, data) {
					var objData = self.objects[data.i];
					var coord = objData.coordinate;
					
					var x = self.strandLabelWidth + (coord % self.ntPerLine) * self.ntLength + 0.25;
					var w = Math.min(self.lineWidth - (x - self.strandLabelWidth), Math.max(0, objData.length * self.ntLength - 0.5));
					var y = self.lineTop + Math.floor(coord / self.ntPerLine) * self.lineSeparation + 0.25;
					var h = self.lineHeight - 0.5;
					if (objData.direction == 'Forward'){
						self.drawObjectForward(ctx, x, y, w, h, data.i, data.val);
					}else{
						self.drawObjectReverse(ctx, x, y, w, h, data.i, data.val);
					}
				},
			});
			
			this.drawObject({
				isLabel: true,
				data: {'i':i, 'val': val},
				fillStyle: '#222222', 
				drawFunc: function (self, ctx, data) {
					var objData = self.objects[data.i];
					var coord = objData.coordinate;
					
					var x = self.strandLabelWidth + (coord % self.ntPerLine) * self.ntLength + 0.25;
					var w = Math.min(self.lineWidth - (x - self.strandLabelWidth), Math.max(0, objData.length * self.ntLength - 0.5));
					var y = self.lineTop + Math.floor(coord / self.ntPerLine) * self.lineSeparation + 0.25;
					var h = self.lineHeight - 0.5;
					
					ctx.font = self.bigFontSize + "px " + self.fontFamily;
					ctx.fillText(objData.wid, x + w/2 - ctx.measureText(objData.wid).width / 2, y + h/2 + 0.3 * self.bigFontSize);
				},
			});
		}
	},
	
	getDataPoint: function(row, t){
		return getDataPoint(this.data[row], t, true);
	},
	
	drawObjectForward: function(ctx, x, y, w, h, row, val){
		ctx.beginPath();
		ctx.lineWidth = 0.5;
		ctx.moveTo(x, y);
		ctx.lineTo(x + Math.max(0, w - this.arrowLength), y);
		ctx.lineTo(x + w, y + h / 2);
		ctx.lineTo(x + Math.max(0, w - this.arrowLength), y + h);
		ctx.lineTo(x, y + h);
		ctx.closePath();
	},
	
	drawObjectReverse: function(ctx, x, y, w, h, row, val){
		ctx.beginPath();
		ctx.lineWidth = 0.5;
		ctx.moveTo(x + w, y);
		ctx.lineTo(x + w, y + h);
		ctx.lineTo(x + Math.min(this.arrowLength, w), y + h);
		ctx.lineTo(x, y + h / 2);
		ctx.lineTo(x + Math.min(this.arrowLength, w), y);
		ctx.closePath();
	},
	
	getObjectFillStyle: function(row, val){
		var maxVal = this.dataMax[row];
		var r = 0;
		var g = 0;
		var b = 0;
		if (val < 1){
			r = 61;
			g = 128;
			b = 179;
		}else if (val < maxVal){
			var tmp = Math.log(val / maxVal) / Math.log(1 / maxVal);
			r = tmp * 61;
			g = tmp * 128;
			b = tmp * 179;
		}else{
			var tmp = Math.log(val / maxVal) / Math.log(maxVal);
			r = tmp * 255;
			g = tmp * 250;
			b = tmp * 75;
		}
		
		return 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';
	},
});

var HeatmapVisualization = Visualization2D.extend({
	lineWidth:0.5,
	relAxisSep:0.04,
	axisBottom:30,
	timeStep:250,
	
	getData: function(md){
		this._super(md);
	},
	
	getDataSuccess: function () {
		this.dataMax = [];
		for (var i = 0; i < this.data.length; i++){
			this.dataMax.push([]);
			for (var j = 0; j < this.data[i].length; j++){
				this.dataMax[i].push(0);
				for (var k = 0; k < this.data[i][j].length; k++){
					this.dataMax[i][j] = Math.max(this.dataMax[i][j], this.data[i][j][k][1]);
				}
				this.dataMax[i][j] = Math.sqrt(this.dataMax[i][j]);
			}
		}
		
		this.timeMin = Math.floor(this.data[0][0][0][0] / 2 / 3600) * 2 * 3600;
		this.timeMax = this.data[0][0][this.data[0][0].length - 1][0];
		
		this._super();
	},
	
	calcLayout: function(){
		this.legendW = 10;
		this.legendX = this.width - this.legendW;		
		
		this.axisX = this.bigFontSize + 2 + this.lineWidth / 2;
		this.axisW = this.legendX - 5 - this.axisX - this.lineWidth / 2;
		
		var axisTotLen = 0;
		for (var i = 0; i < this.data.length; i++)
			axisTotLen += this.data[i].length;
		this.rowH = (this.height - this.axisBottom - this.bigFontSize - 3) * (1 - this.data.length * this.relAxisSep) / axisTotLen;
		this.axisSep = (this.height - this.axisBottom - this.bigFontSize - 3) * this.relAxisSep;
		this.axisH = [];
		this.axisY = [];
		var y = this.lineWidth / 2 + this.bigFontSize + 3;
		for (var i = 0; i < this.data.length; i++){
			var h = this.rowH * this.data[i].length;
			this.axisH.push(h);
			this.axisY.push(y);
			y += h + this.axisSep;
		}
		this.timeAxisY = this.height - this.axisBottom;
		
		this.legendTop = this.axisY[0];
		this.legendBottom = this.axisY[this.axisY.length - 1] + this.axisH[this.axisH.length - 1];
		this.legendH = this.legendBottom - this.legendTop;
	},
	
	drawStaticObjects: function(){
		//data
		var xScale = this.axisW / (this.timeMax - this.timeMin);
		var xOff = this.axisX - xScale * this.timeMin;
		for (var i = 0; i < this.data.length; i++){//axes
			var datai = this.data[i];		
			var dataMaxi = this.dataMax[i];
			for (var j = 0; j < datai.length; j++){//rows
				var dataij = datai[j];
				var dataMaxij = dataMaxi[j];
				
				var t0 = this.timeMin + this.timeStep/2;
				var dataijk0 = NaN;
				for (var t = this.timeMin + this.timeStep/2; t <= this.timeMax; t += this.timeStep){
					var dataijk1 = getDataPoint(dataij, t, true);
					if (dataijk0 == dataijk1 && t < this.timeMax - this.timeStep)
						continue;
						
					var x1 = xOff + xScale * (t0 - this.timeStep/2);
					var x2 = xOff + xScale * Math.min(t + this.timeStep/2, this.timeMax);
					
					t0 = t;
					dataijk0 = dataijk1;
					
					var r = 0;
					var g = 0;
					var b = 0;
					if (dataijk0 < 1){
						r = 61;
						g = 128;
						b = 179;
					}else if (dataijk0 < dataMaxij){
						var tmp = Math.log(dataijk0 / dataMaxij) / Math.log(1 / dataMaxij);
						r = tmp * 61;
						g = tmp * 128;
						b = tmp * 179;
					}else{
						var tmp = Math.log(dataijk0 / dataMaxij) / Math.log(dataMaxij);
						r = tmp * 255;
						g = tmp * 250;
						b = tmp * 75;
					}
					
					var fillStyle = 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';
					this.drawObject({
						'fillStyle': fillStyle,
						data: {
							'row': j,
							'time': t,
							'val': dataijk0,
							x: x1,
							y: this.axisY[i] + this.rowH * j,
							w: x2 - x1,
							h: this.rowH,
							fillStyle: fillStyle,
						},
						drawFunc: function(self, ctx, data){
							ctx.lineWidth = 0;
							ctx.rect(data.x, data.y, data.w, data.h);
						},
						tipFunc: (this.axisTipFuncs ? this.axisTipFuncs[i] : undefined),
					});
				}
			}
		}
		
		//axis
		this.drawObject({
			'strokeStyle': '#222222',
			drawFunc: function(self, ctx, data){
				ctx.lineWidth = self.lineWidth;
				for (i = 0; i < self.axisY.length; i++){
					ctx.rect(self.axisX, self.axisY[i], self.axisW, self.axisH[i]);
				}
				
				ctx.moveTo(self.axisX - self.lineWidth / 2, self.timeAxisY);
				ctx.lineTo(self.axisX + self.axisW + self.lineWidth / 2, self.timeAxisY);
				for (var t = self.timeMin; t < self.timeMax; t += 2 * 3600){
					var x = self.axisX + self.axisW * (t - self.timeMin) / (self.timeMax - self.timeMin);					
					ctx.moveTo(x, self.timeAxisY);
					ctx.lineTo(x, self.timeAxisY + 5);
				}
			},
			tipFunc: function(self, data){
			},
		});
		
		//labels
		this.drawObject({
			'fillStyle': '#222222',
			drawFunc: function(self, ctx, data){
				for (i = 0; i < self.axisY.length; i++){
					ctx.save();
					ctx.font = self.bigFontSize + "px " + self.fontFamily;
					ctx.translate(self.bigFontSize / 2, self.axisY[i] + self.axisH[i] / 2);
					ctx.rotate(-Math.PI / 2);
					ctx.fillText(self.axisTitle[i], -ctx.measureText(self.axisTitle[i]).width / 2, 0.3 * self.bigFontSize);
					ctx.restore();
				}
				
				txt = 'Time (h)';
				ctx.fillText(txt, self.axisX + self.axisW / 2 - ctx.measureText(txt).width / 2, self.height - 0.2 * self.bigFontSize);
				
				ctx.font = self.smallFontSize + "px " + self.fontFamily;
				for (var t = self.timeMin; t < self.timeMax; t+= 2 * 3600){
					var x = self.axisX + self.axisW * (t - self.timeMin) / (self.timeMax - self.timeMin);	
					var txt = (t / 3600).toString();
					ctx.fillText(txt, x - ctx.measureText(txt).width / 2, self.timeAxisY + 12 + 0.3 * self.smallFontSize);
				}
			},
			tipFunc: function(self, data){
			},
		});
		
		//color scale
		this.drawColorScale(
			this.legendX, this.legendTop, this.legendW, this.legendH,
			{r: 61, g: 128, b: 179},
			{r: 255, g: 250, b: 75});
	},
	
	drawDynamicObjects: function(t){
		this.drawObject({
			'strokeStyle': '#cd0a0a',
			drawFunc: function(self, ctx, data){
				ctx.lineWidth = self.lineWidth;
				var x = self.axisX + self.axisW * (t - self.timeMin) / (self.timeMax - self.timeMin);
				ctx.moveTo(x, self.axisY[0])
				ctx.lineTo(x, self.timeAxisY);
			},
		});
	},
});

var Visualization3D = Visualization.extend({
	init: function(parent, metadata, bigFontSize, smallFontSize){
		// rendeer
		this.renderer = new THREE.WebGLRenderer({antialias:true});				
		this.renderer.shadowMapEnabled = true;
		this.renderer.shadowMapSoft = true;
		parent.append(this.renderer.domElement);
		
		// scene
		this.initScene();
		this.initCamera();
		this.initLights();
		this.initControls();		
		
		//super
		this._super(parent, metadata, bigFontSize, smallFontSize);
		
		//enable controls
		this.enableControls();
	},
	
	initScene: function(){
		this.scene = new THREE.Scene();
	},
	
	initCamera: function(){
	},
	
	initLights: function(){
	},
	
	initControls: function(){		
	},
	
	enableControls: function(){
	},

	resize: function(width, height, dataLoaded){
		if (!(dataLoaded || this.dataLoaded))
			return;
			
		//update size
		this.width = width;
		this.height = height;
		
		//update layout
		this.calcLayout();
		
		//redraw
		this.drawStaticContent(dataLoaded);
		this.drawDynamicContent(this.time, dataLoaded);
	},
	
	drawStaticContent: function(dataLoaded){
		if (!(this.dataLoaded || dataLoaded))
			return;
			
		this.drawStaticObjects();		
		this.renderer.render(this.scene, this.camera);
		this.controls.update();
	},
	
	drawDynamicContent: function(t, dataLoaded){
		if (!(this.dataLoaded || dataLoaded))
			return;
			
		this.time = t;		
		this.drawDynamicObjects(t);		
		this.renderer.render(this.scene, this.camera);
		this.controls.update();
	},
	
	drawStaticObjects: function(){
	},
	
	drawDynamicObjects: function(t){
	},
});

var SvgContext = Class.extend({
	//properties
	x: 0,
	y: 0,
	lineWidth: undefined,
	font: undefined,
	strokeStyle: undefined,
	fillStyle: undefined,
	globalAlpha: 1.0,
	
	svg:'',
	
	path:'',
	translationX: 0,
	translationY: 0,
	rotation: 0,
	
	groups:[],
	
	canvasCtx:undefined,
	
	//constructor
	init: function(canvasCtx){
		this.canvasCtx = canvasCtx;
	},
	render: function(){
		return this.svg;
	},
	
	save: function(){
		this.groups.push({
			path: this.path,
			translationX: this.translationX,
			translationY: this.translationY,
			rotation: this.rotation,
			});
		this.path = '';
		this.translationX = 0;
		this.translationY = 0;
		this.rotation = 0;
	},
	restore: function(){
		group = this.groups.shift();
		this.path = group.path;
		this.translationX = group.translationX;
		this.translationY = group.translationY;
		this.rotation = group.rotation;
	},
	
	clearRect: function(x, y, w, h){
	},
	
	translate: function(x, y){
		this.translationX = x;
		this.translationY = y;
	},
	rotate: function(theta){
		this.rotation = theta * 180 / Math.PI;
	},
	
	beginPath: function(){
		this.path = '';
	},
	closePath: function(){
		this.path += ' z';
	},
	
	fillAndStroke: function(fillStyle, strokeStyle){
		if (!this.path || this.globalAlpha == 0)
			return;
		if (fillStyle == undefined)
			this.stroke();
		if (strokeStyle == undefined)
			this.fill();
		if (fillStyle != undefined && strokeStyle != undefined)
			this.svg += sprintf('<path stroke="%s" stroke-width="%spt" fill="%s" opacity="%s" d="%s" transform="translate(%s,%s) rotate(%s)"/>', 
				this.strokeStyle, this.lineWidth, this.fillStyle, this.globalAlpha, this.path, this.translationX, this.translationY, this.rotation);
	},
	stroke: function(){
		if (!this.path || this.globalAlpha == 0 || this.strokeStyle == undefined)
			return;
		this.svg += sprintf('<path stroke="%s" stroke-width="%spt" fill="none" opacity="%s" d="%s" transform="translate(%s,%s) rotate(%s)"/>', 
			this.strokeStyle, this.lineWidth, this.globalAlpha, this.path, this.translationX, this.translationY, this.rotation);
	},
	fill: function(){
		if (!this.path || this.globalAlpha == 0 || this.fillStyle == undefined)
			return;
		this.svg += sprintf('<path stroke="none" fill="%s" opacity="%s" d="%s" transform="translate(%s,%s) rotate(%s)"/>', 
			this.fillStyle, this.globalAlpha, this.path, this.translationX, this.translationY, this.rotation);
	},
	
	fillText: function(txt, x, y){
		var tmp = this.font.split(' ');
		var fontFamily = tmp[1];
		var fontSize = tmp[0].substr(0, tmp[0].length - 2);
		
		this.svg += sprintf('<text x="%s" y="%s" font-size="%spt" transform="translate(%s,%s) rotate(%s)">%s</text>', 
			x, y, fontSize / 1.25, 
			this.translationX, this.translationY, this.rotation, 
			txt);
	},
	moveTo: function(x, y){
		this.x = x;
		this.y = y;
		this.path += sprintf('M %s,%s ', x, y);
	},
	arcTo2: function(tx1, ty1, tx2, ty2, r, x1, y1, x2, y2){
		this.path += sprintf('L %s,%s A %s,%s 0 0,1 %s,%s ', x1, y1, r, r, x2, y2);
	},
	lineTo: function(x, y){
		this.x = x;
		this.y = y;
		this.path += sprintf('L %s,%s ', x, y);
	},
	rect: function(x, y, w, h){
		if (this.globalAlpha == 0)
			return;
		this.svg += sprintf('<rect transform="translate(%s,%s) rotate(%s)" stroke="%s" stroke-width="%spt" fill="%s" opacity="%s" x="%s" y="%s" width="%s" height="%s"/>',
			this.translationX, this.translationY, this.rotation,
			(this.strokeStyle == undefined ? 'none' : this.strokeStyle), this.lineWidth, 
			(this.fillStyle == undefined ? 'none' : this.fillStyle), this.globalAlpha,
			x, y, w, h);
	},
	fillRect: function(x, y, w, h){
		if (this.globalAlpha == 0)
			return;
		this.svg += sprintf('<rect transform="translate(%s,%s) rotate(%s)" stroke="%s" stroke-width="%spt" fill="%s" opacity="%s" x="%s" y="%s" width="%s" height="%s"/>',
			this.translationX, this.translationY, this.rotation,
			'none', 0,
			(this.fillStyle == undefined ? 'none' : this.fillStyle), this.globalAlpha,
			x, y, w, h);
	},
	strokeRect: function(x, y, w, h){
		if (this.globalAlpha == 0)
			return;
		this.svg += sprintf('<rect transform="translate(%s,%s) rotate(%s)" stroke="%s" stroke-width="%spt" fill="%s" opacity="%s" x="%s" y="%s" width="%s" height="%s"/>',
			this.translationX, this.translationY, this.rotation,
			(this.strokeStyle == undefined ? 'none' : this.strokeStyle), this.lineWidth, 
			'none', this.globalAlpha,
			x, y, w, h);
	},
	arc: function(x, y, r, theta1, theta2){
		if (theta1 != theta2 && Math.abs(theta1 - theta2) % (Math.PI * 2) == 0){
			this.path += sprintf('M %s,%s A %s,%s 0 0,1 %s,%s A %s,%s 0 0,1 %s,%s ',
				x + r, y,
				r, r, x - r, y,
				r, r, x + r, y);
		}else{
			this.path += sprintf('M %s,%s A %s,%s 0 %s,1 %s,%s ', 
				x + r * Math.cos(theta1), y + r * Math.sin(theta1),
				r, r, 				
				(Math.abs(theta2 - theta1) % (2 * Math.PI) > Math.PI ? 1 : 0),				
				x + r * Math.cos(theta2), y + r * Math.sin(theta2));
		}
	},
	quadraticCurveTo: function(x0, y0, x1, y1){
		this.x = x1;
		this.y = y1;
		this.path += sprintf('Q %s,%s %s,%s ', x0, y0, x1, y1);
	},
	bezierCurveTo: function(x0, y0, x1, y1, x2, y2){
		this.x = x2;
		this.y = y2;
		this.path += sprintf('C %s,%s %s,%s %s,%s ', x0, y0, x1, y1, x2, y2);
	},
	dashedLine: function(x1, y1, x2, y2, dashLen){	
		this.moveTo(x1, y1);
		
		var dX = x2 - x1;
		var dY = y2 - y1;
		var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
		var dashX = dX / dashes;
		var dashY = dY / dashes;
		
		var q = 0;
		while (q++ < dashes) {
			x1 += dashX;
			y1 += dashY;
			this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
		}
		this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);
		
		this.x = x2;
		this.y = y2;
	},
	arrowTo: function(x1, y1, x2, y2, style, which, angle, d, dashLen){
		if (this.globalAlpha == 0)
			return;
			
		which=typeof(which)!='undefined'? which:1; // end point gets arrow

		_markerCounter++;
		var defs = ''
			+ '<marker refX="0" refY="0" orient="auto" id="ArrowStart' + _markerCounter + '" style="overflow:visible" stroke="none" fill="'+this.fillStyle+'" opacity="'+this.globalAlpa+'">'
				+ '<path d="M 8.7185878,4.0337352 -2.2072895,0.01601326 8.7185884,-4.0017078 c -1.7454984,2.3720609 -1.7354408,5.6174519 -6e-7,8.035443 z" transform="scale(0.6,0.6)" />'
			+ '</marker>'
			+ '<marker refX="0" refY="0" orient="auto" id="ArrowEnd' + _markerCounter + '" style="overflow:visible" stroke="none" fill="'+this.fillStyle+'" opacity="'+this.globalAlpha+'">'
				+ '<path d="M 8.7185878,4.0337352 -2.2072895,0.01601326 8.7185884,-4.0017078 c -1.7454984,2.3720609 -1.7354408,5.6174519 -6e-7,8.035443 z" transform="scale(-0.6,-0.6)"/>'
			+ '</marker>';
			
		var straightPath = sprintf('M %s,%s L %s,%s', x1, y1, x2, y2);
		if (dashLen == undefined){
			var path = straightPath;
		}else{
			var dX = x2 - x1;
			var dY = y2 - y1;
			var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
			var dashX = dX / dashes;
			var dashY = dY / dashes;
			
			var path = sprintf('M %s,%s ', x1, y1);
			
			var q = 0;
			while (q++ < dashes) {
				x1 += dashX;
				y1 += dashY;
				path += sprintf('%s %s,%s ', (q % 2 == 0 ? 'M' : 'L'), x1, y1);
			}
			path += sprintf('%s %s,%s ', (q % 2 == 0 ? 'M' : 'L'), x2, y2);
		}
		
		this.svg += sprintf('<g transform="translate(%s,%s) rotate(%s)"><defs>%s</defs><path stroke="%s" stroke-width="%spt" opacity="%s" %s d="%s" /><path stroke="none" d="%s" marker-start="%s" marker-end="%s" /></g>',
			this.translationX, this.translationY, this.rotation,
			defs, this.strokeStyle, this.lineWidth, this.globalAlpha,
			(dashLen == undefined ? '' : sprintf('stroke-dasharray="%s,%s"', dashLen, dashLen)),
			path,
			straightPath,
			(which == 1 ? 'none' : 'url(#ArrowStart' + _markerCounter + ')'),
			(which == 1 ? 'url(#ArrowEnd' + _markerCounter + ')' : 'none')
			);
	},
		
	measureText:function(txt){
		this.canvasCtx.font = this.font;
		return this.canvasCtx.measureText(txt);
	}
});
var _markerCounter = 0;

/* export */
var exportSvg = function(){
	var config = $('#config');
	var nRows = config.config('getNumPanelRows');
	var nCols = config.config('getNumPanelCols');		
	var totW, totH, panelMargin, colW, colH, showSubfigureLabels;
	
	panelMargin = parseFloat(config.find('.exportPanelMarginInput').val());
	
	totW = parseFloat(config.find('.exportWidthInput').val());
	colW = (totW - (nCols - 1) * panelMargin) / nCols;
	
	totH = parseFloat(config.find('.exportHeightInput').val());
	colH = (totH - (nRows - 1) * panelMargin) / nRows;
	
	showSubfigureLabels = parseInt(config.find('.exportShowSubfigureLabelsSelector').val());
	
	var canvasCtx = $('<canvas />').get(0).getContext('2d');
	
	var cmToPixels = 28.3466;
	
	//export panels
	var styles = ''
		+ 'text{font-family: "Arial"; fill:#000000;}'
		+ 'text.subFigLabel{font-weight:bold; font-size:8pt}';
		+ 'text.bigFont{font-size:7pt;}';
		+ 'text.smallFont{font-size:5pt;}';
	var svg = '';
	for (var i = 0; i < nRows; i++){
		for (var j = 0; j < nCols; j++){
			var panelLabel = '';
			if (showSubfigureLabels){
				var idx = i * nCols + j + 1;
				var lbl = '';
				while (idx > 0){
					lbl = String.fromCharCode(65 + ((idx-1) % 26)) + lbl;
					idx = Math.floor((idx-1) / 26);
				}
			
				panelLabel = sprintf('<text x="%spt" y="%spt" class="subFigLabel">%s</text>', 0, 6, lbl)
			}
		
			var ctx = new SvgContext(canvasCtx);
			$('#panel' + (i * nCols + j + 1)).panel('exportSvg', ctx, colW * cmToPixels, colH * cmToPixels);
			svg += sprintf('<g transform="translate(%s, %s)">%s%s</g>', 
				j * (colW + panelMargin) * cmToPixels, i * (colH + panelMargin) * cmToPixels,	
				panelLabel,	ctx.render());
		}
	}
	
	//export
	//$('#export').find('input[name="file_name"]').val('WholeCellViz.svg');
	$('#export').find('input[name="content_type"]').val('image/svg+xml');	
	$('#export').find('input[name="data"]').val(sprintf('<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewport="0cm 0cm %scm %scm" width="%scm" height="%scm"><style type="text/css">%s</style>%s</svg>', totW, totH, totW, totH, styles, svg));
	window.open('', 'exportWindow', sprintf('width=%d,height=%d,resizeable=no,scrollbars=no,location=no,menubar=no,status=no,toolbar=no', totW * cmToPixels + 17, totH * cmToPixels + 17));
	$('#export').attr('target', 'exportWindow');
	$('#export').submit();
};

function exportJson(){
	var config = $('#config');
	var nRows = config.config('getNumPanelRows');
	var nCols = config.config('getNumPanelCols');

	var data = [];
	for (var i = 1; i <= nRows * nCols; i++){
		data.push({
			panel: i, 
			metadata: $('#panel' + i).panel('getMetadata'), 
			data:$('#panel' + i).panel('getData'),
			});
	}

	//export
	//$('#export').find('input[name="file_name"]').val('WholeCellViz.json');
	$('#export').find('input[name="content_type"]').val('application/json');	
	$('#export').find('input[name="data"]').val(JSON.stringify(data));
	window.open('', 'exportWindow', sprintf('width=%d,height=%d,resizeable=no,scrollbars=no,location=no,menubar=no,status=no,toolbar=no', 400, 300));
	$('#export').attr('target', 'exportWindow');
	$('#export').submit();
};

/* tutorial */
function tutorialHighlightArrow(id){
	Pixastic.revert($('#tutorial').find('.' + id + '_arrow').get(0));
}

function tutorialUnhighlightArrow(id){
	$('#tutorial').find('.' + id + '_arrow').pixastic('desaturate');
}

/* helper functions */
function formatTime(val, spacing){
	if (!spacing)
		spacing = '';
	return sprintf('%02d%s:%s%02d%s:%s%02d',
		Math.floor(val / 3600),
		spacing, spacing,
		Math.floor((val % 3600) / 60),
		spacing, spacing,
		Math.floor(val % 60));
}

function getDataIndex(data, t, iMin, iMax){
	if (data.length == 0)
		return undefined;
	if (data.length == 1)
		return 0;
	if (iMin == undefined)
		iMin = 0;
	if (iMax == undefined)
		iMax = data.length - 1;
	
	if ($.isArray(data[0]))
		return getDataIndex_Arr(data, t, iMin, iMax);
	else
		return getDataIndex_Obj(data, t, iMin, iMax);
}

function getDataIndex_Arr(data, t, iMin, iMax){
	var dataMin = data[iMin];
	var dataMax = data[iMax];
	if (iMax - iMin == 1){		
		if (dataMax[0] - t < t - dataMin[0])
			return iMax;
		else
			return iMin;
	}
	
	if (t < dataMin[0]){
		return undefined;
	}
	else if (t >= dataMax[0]){
		return iMax;
	}
	
	i = Math.floor((iMin + iMax) / 2);
	if (t < data[i][0])
		return getDataIndex_Arr(data, t, iMin, i);
	else
		return getDataIndex_Arr(data, t, i, iMax);
}

function getDataIndex_Obj(data, t, iMin, iMax){
	var dataMin = data[iMin];
	var dataMax = data[iMax];
	if (iMax - iMin == 1){		
		if (dataMax['time'][0] - t < t - dataMin['time'][0])
			return iMax;
		else
			return iMin;
	}
	
	if (t < dataMin['time'][0]){
		return undefined;
	}
	else if (t >= dataMax['time'][0]){
		return iMax;
	}
	
	i = Math.floor((iMin + iMax) / 2);
	if (t < data[i]['time'][0])
		return getDataIndex_Obj(data, t, iMin, i);
	else
		return getDataIndex_Obj(data, t, i, iMax);
}

function getDataPoint(data, t, interpolate, iMin, iMax){
	if (data.length == 0)
		return undefined;	
	if (iMin == undefined)
		iMin = 0;
	if (iMax == undefined)
		iMax = data.length - 1;
		
	if ($.isArray(data[0])){
		if (data.length == 1)
			return data[0][1];
		return getDataPoint_Arr(data, t, interpolate, iMin, iMax);
	}else{
		if (data.length == 1)
			return data[0];
		return getDataPoint_Obj(data, t, interpolate, iMin, iMax);
	}
}

function getDataPoint_Arr(data, t, interpolate, iMin, iMax){	
	var dataMin = data[iMin];
	var dataMax = data[iMax];
	if (iMax - iMin == 1){		
		if (interpolate && $.isArray(dataMin)){
			return  dataMin[1] * (dataMax[0] - t) / (dataMax[0] - dataMin[0]) +
					dataMax[1] * (t - dataMin[0]) / (dataMax[0] - dataMin[0]);
		}else{
			if (dataMax[0] - t < t - dataMin[0])
				if ($.isArray(dataMax))
					return dataMax[1];
				else
					return dataMax;
			else
				if ($.isArray(dataMin))
					return dataMin[1];
				else
					return dataMin;
		}
	}
	
	if (t < dataMin[0]){
		return undefined;
	}	
	if (t >= dataMax[0]){
		if ($.isArray(dataMax)){
			return dataMax[1];
		}else{
			return dataMax;
		}
	}		
	
	i = Math.floor((iMin + iMax) / 2);
	if (t < data[i][0])
		return getDataPoint_Arr(data, t, interpolate, iMin, i);
	else
		return getDataPoint_Arr(data, t, interpolate, i, iMax);
}

function getDataPoint_Obj(data, t, interpolate, iMin, iMax){
	var dataMin = data[iMin];
	var dataMax = data[iMax];
	if (iMax - iMin == 1){		
		if (interpolate && $.isArray(dataMin)){
			return  dataMin[1] * (dataMax['time'][0] - t) / (dataMax['time'][0] - dataMin['time'][0]) +
					dataMax[1] * (t - dataMin['time'][0]) / (dataMax['time'][0] - dataMin['time'][0]);
		}else{
			if (dataMax['time'][0] - t < t - dataMin['time'][0])
				if ($.isArray(dataMax))
					return dataMax[1];
				else
					return dataMax;
			else
				if ($.isArray(dataMin))
					return dataMin[1];
				else
					return dataMin;
		}
	}
	
	if (t < dataMin['time'][0]){
		return undefined;
	}
	else if (t >= dataMax['time'][0]){
		if ($.isArray(dataMax)){
			return dataMax[1];
		}else{
			return dataMax;
		}
	}
	
	i = Math.floor((iMin + iMax) / 2);
	if (t < data[i]['time'][0])
		return getDataPoint_Obj(data, t, interpolate, iMin, i);
	else
		return getDataPoint_Obj(data, t, interpolate, i, iMax);
}

/* additional string functions */
String.prototype.repeat = function(count) {
    if (count < 1) return '';
    var result = '', pattern = this.valueOf();
    while (count > 0) {
        if (count & 1) result += pattern;
        count >>= 1, pattern += pattern;
    }
    return result;
};

/* additional math functions */
Math.nanmin = function(val1, val2){
	if (isNaN(val1))
		return val2;
	if (isNaN(val2))
		return val1;
	return Math.min(val1, val2);
}

Math.nanmax = function(val1, val2){
	if (isNaN(val1))
		return val2;
	if (isNaN(val2))
		return val1;
	return Math.max(val1, val2);
}

Math.log10 = function (val) {
  return Math.log(val) / Math.LN10;
}

Math.sign = function(number){
	number?number<0?-1:1:0
}

//format a number into specified number of decimal places
//Robert Penner May 2001 - source@robertpenner.com
Math.formatDecimals = function (num, digits) {
        //if no decimal places needed, we're done
        if (digits <= 0) {
                return Math.round(num); 
        } 
        //round the number to specified decimal places
        //e.g. 12.3456 to 3 digits (12.346) -> mult. by 1000, round, div. by 1000
        var tenToPower = Math.pow(10, digits);
        var cropped = String(Math.round(num * tenToPower) / tenToPower);

        //add decimal point if missing
        if (cropped.indexOf(".") == -1) {
                cropped += ".0";  //e.g. 5 -> 5.0 (at least one zero is needed)
        }

        //finally, force correct number of zeroes; add some if necessary
        var halves = cropped.split("."); //grab numbers to the right of the decimal
        //compare digits in right half of string to digits wanted
        var zerosNeeded = digits - halves[1].length; //number of zeros to add
        for (var i=1; i <= zerosNeeded; i++) {
                cropped += "0";
        }
        return(cropped);
}

/* additional array functions */
//Source: http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
Array.prototype.unique = function() {
    var o = {}, i, l = this.length, r = [];
    for(i=0; i<l;i+=1) o[this[i]] = this[i];
    for(i in o) r.push(o[i]);
    return r;
};

//convert any number to scientific notation with specified significant digits
//e.g. .012345 -> 1.2345e-2 -- but 6.34e0 is displayed "6.34"
//requires function formatDecimals()
//Robert Penner May 2001 - source@robertpenner.com
Math.toScientific = function (num, sigDigs) {
        //deal with messy input values
        num = Number(num); //try to convert to a number
        if (isNaN(num)) return num; //garbage in, NaN out

        //find exponent using logarithm
        //e.g. log10(150) = 2.18 -- round down to 2 using floor()
        var exponent = Math.floor(Math.log(Math.abs(num)) / Math.LN10); 
        if (num == 0) exponent = 0; //handle glitch if the number is zero

        //find mantissa (e.g. "3.47" is mantissa of 3470; need to divide by 1000)
        var tenToPower = Math.pow(10, exponent);
        var mantissa = num / tenToPower;

        //force significant digits in mantissa
        //e.g. 3 sig digs: 5 -> 5.00, 7.1 -> 7.10, 4.2791 -> 4.28
        mantissa = Math.formatDecimals(mantissa, sigDigs-1); //use custom function
        var output = mantissa;
        //if exponent is zero, don't include e
        if (exponent != 0) {
                output += "x10<sup>" + exponent + '</sup>';
        }
        return(output);
}

/* additional canvas context functions */
CanvasRenderingContext2D.prototype.fillAndStroke = function(fillStyle, strokeStyle){
	if (fillStyle != undefined)
		this.fill();
	if (strokeStyle != undefined)
		this.stroke();
}
			
CanvasRenderingContext2D.prototype.arcTo2 = function(tx1, ty1, tx2, ty2, r, x1, y1, x2, y2){
	this.arcTo(tx1, ty1, tx2, ty2, r);
}

CanvasRenderingContext2D.prototype.arrowTo = function(x1, y1, x2, y2, style, which, angle, d, dashLen){
	drawArrow(this, x1, y1, x2, y2, style, which, angle, d, dashLen);
}

//Source: http://vetruvet.blogspot.com/2010/10/drawing-dashed-lines-on-html5-canvas.html
CanvasRenderingContext2D.prototype.dashedLine = function(x1, y1, x2, y2, dashLen) {
    if (dashLen == undefined) dashLen = 2;
    
    this.beginPath();
    this.moveTo(x1, y1);
    
    var dX = x2 - x1;
    var dY = y2 - y1;
    var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
    var dashX = dX / dashes;
    var dashY = dY / dashes;
    
    var q = 0;
    while (q++ < dashes) {
     x1 += dashX;
     y1 += dashY;
     this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
    }
    this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);
    
    this.stroke();
    this.closePath();
};

THREE.addText = function (scene, txt, siz, x, y, z, showVertical){
	var geometry = new THREE.TextGeometry(txt, {
		size: siz, height: 0, curveSegments: 3,
		font: "helvetiker", weight: "normal", style: "normal",
		bevelThickness: 1, bevelSize: 2, bevelEnabled: false
	});
	var material = new THREE.MeshBasicMaterial( { color: 0x222222 } );
	var mesh = new THREE.Mesh(geometry, material );			
	
	geometry.computeBoundingBox();
	var textWidth = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
	if (showVertical){
		mesh.position.set(x + siz / 2, y - textWidth/ 2, z);
		mesh.rotation.set(0, 0, Math.PI/2);		
	}else{
		mesh.position.set(x - textWidth/ 2, y - siz/2, z);
	}
	
	scene.add(mesh);
	
	return mesh;
}

THREE.addArrow = function (scene, x1, y1, z1, x2, y2, z2, showTail, showHead){
	var arrowLen = 3;
	var arrowWidth = 1;
	var geometry, mesh;
	var meshes = [];
	
	//line
	geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(x1, y1, z1));
	geometry.vertices.push(new THREE.Vector3(x2, y2, z2));
	mesh = new THREE.Line(geometry, new THREE.LineBasicMaterial({color : 0x222222 }));
	scene.add(mesh);
	meshes.push(mesh);
	
	//tail
	if (showTail){
		geometry = new THREE.CylinderGeometry(0, arrowWidth, arrowLen, 32, 1);
		mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x222222}));
		if (y1 == y2){
			mesh.position.set(x1 + arrowLen/2, y1, z1);
			mesh.rotation.set(0, 0, Math.PI/2);
		}else if (x1 == x2){
			mesh.position.set(x1, y1 + arrowLen/2, z1);
			mesh.rotation.set(0, 0, Math.PI);
		}
		scene.add(mesh);
		meshes.push(mesh);
	}
	
	//head
	if (showHead){
		geometry = new THREE.CylinderGeometry(0, arrowWidth, arrowLen, 32, 1);
		mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x222222}));
		if (y1 == y2){
			mesh.position.set(x2 - arrowLen/2, y1, z1 );
			mesh.rotation.set(0, 0, -Math.PI/2);
		}else if (x1 == x2){
			mesh.position.set(x1, y2 - arrowLen/2, z1);
			mesh.rotation.set(0, 0, 0);
		}
		scene.add(mesh);
		meshes.push(mesh);
	}
	
	return meshes;
}