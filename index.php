<!DOCTYPE html>
<html>

<head>
	<META HTTP-EQUIV="content-type" CONTENT="text/html; charset=utf-8">
	<title>WholeCellViz :: Mycoplasma genitalium</title>
	<meta name="google-site-verification" content="Vdho9XJAyUBzyApnbEsjy8m6CsLjNEI12c8wqVVpsS8" />
	
	<script language="javascript" type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script language="javascript" type="text/javascript" src="js/jquery-ui-1.8.23.custom.min.js"></script>
	<script language="javascript" type="text/javascript" src="js/jquery.jqGrid.min.js"></script>
	<script language="javascript" type="text/javascript" src="js/jquery.numeric.min.js"></script>
	<script language="javascript" type="text/javascript" src="js/jquery.nouislider.min.js"></script>
	<script language="javascript" type="text/javascript" src="js/ui.spinner.min.js"></script>
	<script language="javascript" type="text/javascript" src="js/flot/jquery.flot.js"></script>
	<script language="javascript" type="text/javascript" src="js/flot/jquery.flot.selection.min.js"></script>
	<script language="javascript" type="text/javascript" src="js/flot/jquery.flot.resize.min.js"></script>
	<script language="javascript" type="text/javascript" src="js/flot/jquery.flot.axislabels.js"></script>
	<!–[if lte IE 8]>
	<script language="javascript" type="text/javascript" src="js/flot/excanvas.min.js"></script>
	<![endif]–>
	<script language="javascript" type="text/javascript" src="js/SimpleInheritance.min.js"></script>
	<script language="javascript" type="text/javascript" src="js/TweenLite.min.js"></script>
	<script language="javascript" type="text/javascript" src="js/sprintf-0.7-beta1.min.js"></script>
	<script language="javascript" type="text/javascript" src="js/seedrandom-min.js"></script>
	<script language="javascript" type="text/javascript" src="js/pixastic.custom.min.js"></script>
	<script language="javascript" type="text/javascript" src="js/json2.min.js"></script>
	<script language="javascript" type="text/javascript" src="js/canvasutilities.js"></script>
	<script language="javascript" type="text/javascript" src="js/three.js/three.min.js"></script>
	<script language="javascript" type="text/javascript" src="js/three.js/fonts/helvetiker_bold.typeface.js"></script>
	<script language="javascript" type="text/javascript" src="js/three.js/fonts/helvetiker_regular.typeface.js"></script>
	<script language="javascript" type="text/javascript" src="js/WholeCellViz.js"></script>
	<script language="javascript" type="text/javascript" src="js/WholeCellViz-visualizations.js"></script>
	<link rel="icon" type="image/png" href="images/favicon.ico">
	<link href="css/nouislider.fox.css" rel="stylesheet" type="text/css" />
	<link href="css/ui.jqgrid.css" rel="stylesheet" type="text/css" />
	<link href="css/ui.spinner.css" rel="stylesheet" type="text/css" />
	<link href="css/jquery-ui-1.8.23.custom.css" rel="stylesheet" type="text/css" />
	<link href='css/PTSans.min.css' rel='stylesheet' type='text/css' />
	<link href="css/WholeCellViz.css" rel="stylesheet" type="text/css" />

	<!-- google analytics -->
	<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-34995011-1']);
	_gaq.push(['_trackPageview']);

	(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
	
	$(document).ready(initIndex);
	</script>
</head>

<body>
	<!-- header -->
	<div id="header" class="ui-widget-header">
		<div class="title">Mycoplasma genitalium</div>
		<div class="banner"><img src="images/banner.png" /></div>
		<ul class="menu menu_left">
			<li><a href="/">Home</a>
			</li>
			<li class="spacer"></li>
			<li><a href="viz.php">Start</a></li>
			<li class="spacer"></li>
			<li><a>Download</a>
				<ul>
				<li><a href="http://simtk.org/home/wholecell" target="simtk">Source code</a></li>
				</ul>
			</li>
			<li class="spacer"></li>
			<li><a>Help</a>
				<ul>
				<li><a href="http://wholecell.stanford.edu" target="wholecell">Whole-Cell Model</a></li>
				<li><a href="http://covertlab.stanford.edu" target="covertlab">Covert Lab</a></li>
				</ul>
			</li>
		</ul>
		
		<div class="menu_right_title">Example views</div>
		<ul class="menu menu_right1"></ul>
		<ul class="menu menu_right2"></ul>
	</div>
	
	<!-- content -->
	<div id="container" class="index"><div><?php require('indexContent.php'); ?></div></div>
	<div id="nav"><?php require('indexNav.php'); ?></div>
</body>

</html>