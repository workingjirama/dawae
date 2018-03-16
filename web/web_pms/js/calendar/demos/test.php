<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link href='../fullcalendar.min.css' rel='stylesheet' />
	<link href='../fullcalendar.print.min.css' rel='stylesheet' media='print' />
	<script src='../lib/moment.min.js'></script>
	<script src='../lib/jquery.min.js'></script>
	<script src='../fullcalendar.min.js'></script>
	
	<script>
	<?php
		$array = array(
					array('title'=> 'Long Event',
					'start'=> '2017-05-07',
					'end'=> '2017-05-11')
					,array('title'=> 'Long Event',
					'start'=> '2017-05-12',
					'end'=> '2017-05-15')
		)
	?>
	$(document).ready(function() {
		
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,basicDay'
			},
			defaultDate: '2017-05-12',
			navLinks: true, // can click day/week names to navigate views
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			events: <?php echo json_encode($array);?>
		});
		
	});

</script>
<style>

	body {
		margin: 40px 10px;
		padding: 0;
		font-family: "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
		font-size: 14px;
	}

	#calendar {
		max-width: 900px;
		margin: 0 auto;
	}

</style>

</head>
<body>
	<div id="calendar">
		
	</div>
</body>
</html>