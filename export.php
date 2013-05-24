<?php

header('Content-type: '. $_POST['content_type']);

//if ($_POST['file_name'] != '')
//	header('Content-Disposition: attachment; filename="'.$_POST['file_name'].'"');
	
echo $_POST['data'];
