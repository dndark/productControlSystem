<!DOCTYPE html>
<?php

    include_once './administer_sps/config/config.php';   //引用上一级目录文件

    if (isset($_SESSION)) {
        $_SESSION = array();
    }      //删除所有session

?>

<html><head>
<title>合同库房管理</title>
<link rel="stylesheet" type="text/css" href="http://localhost/test/CSS/main.css">
<meta charset="utf-8">
</head>
<body>
<h1>数据库管理系统</h1>

<table id="pg-index-tb" >
	<hr></hr>
	<script type="text/javascript">
		var i; var j=2013; var text='<tr class="pg-em"></tr>';
	  // 输出每一行
	  function print_row(){
			text += '<tr>' ;
			for (i=0; i<3; i++){
				text += '<td><a href="./administer_sps/index1.php?transferyear='+j+'">'+j+'数据库管理系统</td>';
			  j++;
		  }
			text += '</tr>' ;
		}

		for (;j<2037;){
			print_row(); // 在for里面输出
			print_row();
			text += '<tr class="pg-em"></tr>';
	  }
		//console.log(text);
		document.getElementById("pg-index-tb").innerHTML = text;
	</script>
</table>
</body></html>

<?php
include_once './administer_sps/config/bottom.php';   //引用上一级目录文件
?>
