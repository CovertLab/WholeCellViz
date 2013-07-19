<h1><a name="intro"></a>Welcome to WholeCellViz!</h1>
<p>WholeCellViz is a web-based software program for visually analyzing whole-cell simulations.</p>

<p>WholeCellViz enables users to interactively analyze many aspects of cell physiology including:
<ul>
<li>Cell mass, volume, and shape,</li>
<li>Metabolite, RNA, and protein copy numbers,</li>
<li>Metabolic reaction fluxes,</li>
<li>Molecular machine statuses &ndash; DNA polymerase, RNA polymerase, ribosome, FtsZ ring, and the</li>
<li>Chromosome copy number, superhelicity, integrity, and DNA binding status.</li>
</ul>
</p>

<p>Currently, WholeCellViz provides access to cached simulations of the Gram-positive bacterium <i><a href="http://en.wikipedia.org/wiki/Mycoplasma_genitalium">Mycoplasma genitalium</a></i><sup><a href="#citing">2</a></sup>. See the <a href="#advanced">Advanced usage</a> section below for information about how to install WholeCellViz locally to use the software to run and analyze your own simulations and/or other high-throughput biological data, as well as how to add additional visualizations.
</p>

<h2><a name="features"></a>Features</h2>
<p>WholeCellViz has several features for visually analyzing whole-cell simulations:
<ul>
<li>14 structured visualizations encompassing a wide spectrum of cell physiology. These visualizations each provide tooltips and mouse clicks to enable users to obtain further information.</li>
<li>A time series plot tool to further explore model predictions.</li>
<li>A <a href="#config">layout editor</a> which enables users to configure a grid of structured visualizations and time series plots, enabling users to simultaneously compare multiple model predictions side-by-side.</li>
<li>A layout history. Simply use your browser's backward/forward buttons to undo/redo layout changes.</li>
<li>A single animation <a href="#timeline">timeline</a> with play, pause, seek, speed, and repeat controls.</li>
<li><a href="#importingData">Data import</a> in JSON format</li>
<li><a href="#exportingGrapics">Graphical export</a> in SVG format</li>
<li><a href="#exportingData">Data export</a> in JSON format</li>
</ul>
</p>

<p>WholeCellViz is <a href="#downloading">freely available open-source</a> and can be easily expanded for use with new whole-cell simulations and other high-throughput data. See the <a href="#advanced">Advanced usage</a> section below for information about how to install WholeCellViz locally to use the software to run and analyze your own simulations and/or other high-throughput biological data, as well as how to add additional visualizations.</p>

<h2><a name="limitations"></a>Current limitations</h2>
<p>The version of WholeCellViz at wholecellviz.stanford.edu is currently limited to cached simulations of the Gram-positive bacterium <i>M. genitalium</i>. Please install WholeCellViz locally on your own machine to use WholeCellViz to analyze other whole-cell simulation data and/or to add additional structured visualizations to WholeCellViz. See the <a href="#advanced">Advanced usage</a> section below for more information.
</p>

<h2><a name="starting"></a>Getting started</h2>
<p>No installation is necessary to use WholeCellViz. The only required software is a modern web browser. To use WholeCellViz simply:
<ol>
<li>Click the "Start" menu button at the top-left to load the software</li>
<li>Click the example visualization buttons at the top-right to load preconfigured visualization layouts</li>
<li>Click the <span class="ui-icon ui-icon-gear"></span> icon at the bottom-right to open the layout editor and configure the visualization layout, and</li>
<li>Use the play, pause, seek, speed, and repeat controls at the bottom to control the animation timeline.</li>
</ol>
</p>
<p>See the tutorial ("Help" &raquo; "Tutorial" from the top-left menu) inside the software for additional help getting started.</p>

<h2><a name="browsers"></a>Recommended browsers</h2>
<p>We recommend using <a href="http://www.google.com/chrome">Chrome</a>. WholeCellViz was developed and extensively tested using Chrome on Windows 7. See the <a href="#implementation">implementation</a> section below for further information on browser compatibility.</p>

<h2><a name="structuredViz"></a>Structured visualizations</h2>
<p>WholeCellViz provides users 14 structured visualizations (below) to visually analyze whole-cell model simulations.</p>

<table id="structuredViz">
<tr>	
	<td>
		<img src="images/StructuredVisualizations/figure1a.png" />
		<div>DNA replication, protein occupancy, methylation, &amp; damage</div>
		<div>This visualization displays the polymerization (blue), protein DNA binding (green), methylation (orange), and strand break (red) status of the <i>M. genitalium</i> chromosomes. Mother DNA is colored dark blue. Daughter DNA is colored light blue.</div>
		</td>
	<td>
		<img src="images/StructuredVisualizations/figure1b.png" />
		<div>DNA replication, protein occupancy, methylation, &amp; damage</div>
		<div>This visualization displays the polymerization (blue), protein DNA binding (green), methylation (orange), and strand break (red) status of the <i>M. genitalium</i> chromosomes. Mother DNA is colored dark blue. Daughter DNA is colored light blue.</div>
	</td>
</tr>
<tr>	
	<td>
		<img src="images/StructuredVisualizations/figure1c.png" />		
		<div>Mature RNA expression</div>
		<div><p>This visualization displays the mature copy number of each RNA transcript over the cell cycle. Each colored rectangle represents an individual transcription unit. Mouse over each transcription unit to see its name and a brief description. Click each transcription unit to obtain a detailed description at <a href="http://wholecellkb.stanford.edu">WholeCellKB</a>.</p>
		<p>The copy number of each transcript has been normalized to its maximal expression over the cell cycle. High expression is colored yellow. Low expression is colored blue.</p>
		</div>
	</td>
	<td>
		<img src="images/StructuredVisualizations/figure1d.png" />
		<div>Metabolism</div>
		<div>This visualization depicts the fluxes of several metabolic reactions (green indicates high flux, red indicates low flux) and the concentrations of several metabolites (node size).</div>
	</td>
</tr>
<tr>	
	<td>
		<img src="images/StructuredVisualizations/s1_a.png" />
		<div>Cell shape</div>
		<div>This animation displays the predicted shape of <i>M. genitalium</i> over its life cycle.</div>
	</td>
	<td>
		<img src="images/StructuredVisualizations/s1_b.png" />
		<div>Cell shape</div>
		<div>This animation displays the predicted shape of <i>M. genitalium</i> over its life cycle.</div>
	</td>
</tr>
<tr>	
	<td>		
		<img src="images/StructuredVisualizations/s1_c.png" />
		<div>FtsZ contractile ring</div>
		<div>FtsZ proteins are believed to catalyze cell division by cyclically forming and contracting rings at the cell septum during cell division. This visualization displays the state of the FtsZ contractile rings during cytokinesis. Each thin line represents one FtsZ filament. Each thick line represents two parallel FtsZ filaments. Blue lines represent unbent filaments. Gray lines represent bent filaments.</div>
	</td>
	<td>
		<img src="images/StructuredVisualizations/s1_d.png" />
		<div>DNA replication</div>
		<div>This visualization is a space-time plot of the replication initiation (green) and replication machinery (blue).</div>
	</td>
</tr>
<tr>	
	<td>		
		<img src="images/StructuredVisualizations/s1_e.png" />
		<div>Nascent protein monomer expression</div>
		<div
		><p>This visualization displays the nascent copy number of each protein monomer over the cell cycle. Each colored rectangle represents an individual protein monomer. Mouse over each protein monomer to see its name and a brief description. Click each protein monomer to obtain a detailed description at <a href="http://wholecellkb.stanford.edu">WholeCellKB</a>.</p>
		<p>The copy number of each protein has been normalized to its maximal expression over the cell cycle. High expression is colored yellow. Low expression is colored blue.</p>
		</div>
	</td>
	<td>
		<img src="images/StructuredVisualizations/s1_f.png" />
		<div>Nascent RNA expression</div>
		<div>
		<p>This visualization displays the nascent copy number of each RNA transcript over the cell cycle. Each colored rectangle represents an individual transcription unit. Mouse over each transcription unit to see its name and a brief description. Click each transcription unit to obtain a detailed description at <a href="http://wholecellkb.stanford.edu">WholeCellKB</a>.</p>
		<p>The copy number of each transcript has been normalized to its maximal expression over the cell cycle. High expression is colored yellow. Low expression is colored blue.</p>
		</div>
	</td>
</tr>
<tr>	
	<td>
		<img src="images/StructuredVisualizations/s1_g.png" />
		<div>Mature protein monomer expression</div>
		<div>
		<p>This visualization displays the mature copy number of each protein monomer over the cell cycle. Each colored rectangle represents an individual protein monomer. Mouse over each protein monomer to see its name and a brief description. Click each protein monomer to obtain a detailed description at <a href="http://wholecellkb.stanford.edu">WholeCellKB</a>.</p>
		<p>The copy number of each protein has been normalized to its maximal expression over the cell cycle. High expression is colored yellow. Low expression is colored blue.</p>
		</div>
	</td>
	<td>
		<img src="images/StructuredVisualizations/s1_h.png" />
		<div>Translation</div>
		<div>This visualization depicts the length of the longest polypeptide of each protein-coding gene. Protein-coding genes with one active ribosome are colored blue. Genes with multiple active ribosomes are colored green.</div>
	</td>
</tr>
<tr>	
	<td>		
		<img src="images/StructuredVisualizations/s1_i.png" />
		<div>Gene expression</div>
		<div>This visualization displays the expression of every RNA and protein gene product. High expression is colored yellow; low expression is colored blue.</div>
	</td>
	<td style="padding-top:240px;">
		<img src="images/StructuredVisualizations/s1_j.png" />
		<div>Replication initiation &ndash; oriC DnaA Boxes</div>
		<div>29 DnaA molecules are believed to segregate the chromosome strands and thereby initiate DNA replication by cooperatively binding to five (R1-5) high affinity sites near the oriC. This visualization represents the DnaA occupancy of the R1-5 sites.</div>
	</td>
</tr>
</table>

<h1><a name="basic"></a>Basic usage</h1>
<h2><a name="install"></a>Installing and running</h2>
<p>The only requirement for running WholeCellViz is a modern web browser (see <a href="#browsers">recommended browsers</a>). Otherwise, no installation is required. To start WholeCellViz click the "Start" button at the top-left of this page. Clicking the start button will open WholeCellViz already configured with grid of six structured visualizations.</p>

<h2><a name="exViz"></a>Example views</h2>
<p>The easiest way to start using WholeCellViz is to view the seven example visualization views (grids of related structured visualizations). Click the buttons at the top-right of the page to open each example view.</p>

<h2><a name="config"></a>Configuring panels</h2>
<p>To configure the displayed visualizations:
<ol>
<li>Open the configuration editor by selecting "Edit" &raquo; "Panels" from the top-left menu.</li>
<li>Select the desired grid size (number of rows and columns of panels, each of which can contain one structured visualization or one set of time series plots).</li>
<li>Use the "Configure panel" select box to choose the panel you wish to configure.</li>
<li>Use the "Simulation" select box to choose a simulation to plot.</li>
<li>Use the "Series" text box to search the model predictions (e.g. type "ATP"). 
	<ol>
	<li>Search results will displayed in the select box immediately below.</li>
	<li>Second, optionally use the "Series type" select box to search just a subset of the model predictions (e.g. only metabolites).</li>
	<li>Next, highlight the model prediction(s) you wish to plot in the results select box.</li>
	<li>Click the <span class="ui-icon ui-icon-arrowthick-1-e"></span> icon to visualize the highlighted model prediction(s) in the selected panel.</li>
	<li>Finally, highlight rows in the table at the right-hand-side and click the <span class="ui-icon ui-icon-arrowthick-1-w"></span> icon to remove model predictions from the panel.</li>
	</ol>
	</li>	
</ol>
</p>

<h2><a name="undoRedo"></a>Undo/redo configuration changes</h2>
<p>WholeCellViz uses your browser's location history to track its configuration history. To undo a configuration change simply press your browser's back button. To redo a configuration change simply press your browser's forward button.</p>

<h2><a name="fullscreen"></a>Expanding panels to fullscreen</h2>
<p>Click the <span class="ui-icon ui-icon-arrow-4-diag"></span> icons at the top-right of the visualization panels to expand panels to the occupy the entire screen.</p>

<h2><a name="panelInfo"></a>Viewing panel details</h2>
<p>Click the <span class="ui-icon ui-icon-info"></span> icon at the top-right of each visualization panel to open a help window containing a textual description of the panel's content.</p>

<h2><a name="labels"></a>Viewing/hiding labels</h2>
<p>Click the <span class="ui-icon ui-icon-tag"></span> icon at the bottom-right of the screen to toggle on/off visualization labels (e.g. metabolite, gene, protein, reaction names).</p>

<h2><a name="userInteraction"></a>Turning on/off tooltips, clicks</h2>
<p>To turn on/off user interaction (tooltips and mouse clicks) with the structured visualizations: (1) open the configuration editor by selecting "Edit" &raquo; "User interaction" from the top-left menu and (2) toggle the select boxes.</p>

<h2><a name="timeline"></a>Controling the timeline: play, pause, seek, speed, repeat</h2>
<p>Click the controls in the bottom menu to play, pause, seek, speed up/down, and repeat animations. Click the <span class="ui-icon ui-icon-play"></span> button to play animations. Click the <span class="ui-icon ui-icon-pause"></span> button to pause animations. Click the <span class="ui-icon ui-icon-signal"></span> button to open a slider to select the animation speed. Drag the progress bar thumb to seek the animation to a desired time point. Click the <span class="ui-icon ui-icon-refresh"></span> icon to toggle animation looping on/off.</p>

<h2><a name="importingData"></a>Importing data</h2>
<p>To import data stored on another server other than <a href="http://wholecellviz.stanford.edu">WholeCellViz.stanford.edu</a>, select "Edit" &raquo; "Data source" from the top-left menu and then enter the data source URL. The URL must point to another server running the WholeCellViz server software. See the <a href="#localInstall">installation instructions</a> for more information.</p>

<h2><a name="exportingGrapics"></a>Exporting graphics</h2>
<p>To export the graphics currently plotted in WholeCellViz in <a href="http://en.wikipedia.org/wiki/Scalable_Vector_Graphics">SVG format</a> select "Download" &raquo; "Graphics (SVG)" from the top-left menu. SVG is common vector graphics format which can be edited by popular vector graphics editors such as <a href="http://www.adobe.com/products/illustrator.html">Illustrator</a> and <a href="http://inkscape.org/">Inkscape</a>.</p>

<h2><a name="exportingData"></a>Exporting data</h2>
<p>To export the data currently plotted in WholeCellViz in <a href="http://www.json.org/">JSON format</a> select "Download" &raquo; "Data (JSON)" from the top-left menu. JSON is a very popular data interchange format supported by most modern programming languages.</p>

<h1><a name="advanced"></a>Advanced usage</h1>

<h2><a name="externalData"></a>Working with external data</h2>
<p>
By default WholeCellViz is configured to read cached whole-cell simulation data stored at <a href="http://wholecell.stanford.edu/sim">wholecell.stanford.edu/sim</a>. To change the data source URL: (1) from the top menu click "Edit" &raquo; "Data source" and (2) enter the desired data source URL. Note: this URL must point to a location where all of the server-side WholeCellViz software is installed. See <a href="#localInstall">Installing WholeCellViz locally</a> section for further information.</p>

<h2><a name="newViz"></a>Adding new visualizations</h2>
<p>To add a new structured visualization to WholeCellViz: (1) <a href="#localInstall">install WholeCellViz locally on your own machine</a>, (2) add a new subclass of the Visualization2D or Visualization3D classes to <tt>wholecellviz/js/WholeCellViz-visualizations.js</tt>, and (3) add a new entry to the WholeCellViz metadata MySQL database corresponding to the new visualization.</p>

<h2><a name="localInstall"></a>Installing WholeCellViz locally</h2>
<p>The easiest way to run the WholeCellViz software locally is to <a href="https://simtk.org/project/xml/downloads.xml?group_id=714#package_id1169">download the Whole-cell virtual machine posted at SimTK</a>. Installation and usage instructions are also posted at SimTK. The virtual machine is a virtual <a href="http://www.linuxmint.com/">Mint Linux</a> machine for use with the free <a href="https://www.virtualbox.org/">VirtualBox</a> software. The virtual machine includes WholeCellViz as well as the simulation software and WholeCellKB. The virtual machine can be used to run new whole-cell simulations, analyze new simulations using WholeCellViz, and add new structured visualizations to WholeCelLViz.</p>

<p>To install WholeCellViz on your own machine: (1) download the <a href="https://simtk.org/frs/download.php?file_id=3619">WholeCellViz source code from SimTK</a>, and (2) follow the installation instructions posted in the <a href="https://simtk.org/frs/download.php?file_id=3485">Developer's Guide at SimTK</a>.</p>

<h2><a name="runSims"></a>Running simulations</h2>
<p>
See <a href="http://wholecell.stanford.edu">wholecell.stanford.edu</a> for further information about installing and running the whole-cell simulation software.</p>

<h1><a name="downloading"></a>Downloading WholeCellViz</h1>
<p>The WholeCellViz source code and simulated data are freely available under the MIT license at <a href="https://simtk.org/project/xml/downloads.xml?group_id=714#package_id1307">SimTK</a>.</p>

<h2><a name="license"></a>MIT license</h2>
<p>Copyright (c) 2013 Stanford University</p>

<p>Permission is hereby granted, free of charge, to any person obtaining a copy 
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:</p>

<p>The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.</p>

<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</p>

<h1><a name="citing"></a>Citing WholeCellViz</h1>
<p>Please use the following references to cite WholeCellViz:</p>
<ol>
<li>Lee R<sup>*</sup>, Karr JR<sup>*</sup>, Covert MW. WholeCellViz: Data Visualization for Whole-Cell Models. (In preparation).</li>
<li>Karr JR et al. A Whole-Cell Computational Model Predicts Phenotype from Genotype. <i>Cell</i> 150 <b>2</b>, 389-401 (2012). <a href="http://www.cell.com/abstract/S0092-8674(12)00776-3">Cell</a> | <a href="http://www.ncbi.nlm.nih.gov/pubmed/22817898">PubMed</a> | <a href="http://simtk.org/home/wholecell">SimTK</a></li>
</ol>

<h1><a name="team"></a>Development Team</h1>
<p>WholeCellViz was developed by a team of three researchers at Stanford University:
<ul>
<li><a href="http://www.stanford.edu/~rubylee">Ruby Lee</a>, Undergraduate Student in Bioengineering</li>
<li><a href="http://www.stanford.edu/~jkarr">Jonathan Karr</a>, Graduate Student in Biophysics</li>
<li><a href="http://covertlab.stanford.edu/">Markus Covert</a>, Assistant Professor of Bioengineering</li>
</ul></p>

<h1><a name="implementation"></a>Implementation</h1>
<p>WholeCellViz consists of a graphical user interface and storage server. The WholeCellViz user interface was implemented in javascript using <a href="http://jquery.com/">jQuery</a>, <a href="http://code.google.com/p/flot/">flot</a>, and <a href="http://threejs.org/">three.js</a>. The WholeCellViz server was implemented using <a href="http://php.net/">PHP</a> and <a href="http://www.mysql.com/">MySQL</a>. Simulations were stored on the server using <a href="http://www.json.org/">JSON</a>. The user interface and server communicated using <a href="http://www.json.org/">JSON</a>.</p>

<p>WholeCellViz was tested on several browsers including <a href="http://www.google.com/chrome">Chrome</a> (v26.0.1410.64, Windows), <a href="http://www.mozilla.org/firefox/">Firefox</a> (v20.0.1, Windows), <a href="http://windows.microsoft.com/internet-explorer">Internet Explorer</a> (10.0.9200.16540, Windows), and <a href="http://www.opera.com/">Opera</a> (12.15, Windows). All browsers work well with two exceptions (1) Opera displays arcs differently from the other browsers, causing Opera to display the 2D cell shape animation incorrectly and (2) only Chrome supports the three.js library, and therefore only Chrome can display the 3D cell shape animation.</p>

<h1><a name="questions"></a>Questions &amp; comments</h1>
<p>Please contact us at <a href="mailto:wholecell@lists.stanford.edu">wholecell@lists.stanford.edu</a> with any questions and/or comments about WholeCellViz.</p>
