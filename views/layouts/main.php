<!doctype html>
<html lang="en-US">
<head>
	<meta charset="utf-8"/>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
	<title>Dawae</title>
	<meta name="description" content=""/>
	<meta name="Author" content="Jay Da Wae"/>
	<meta name="viewport" content="width=device-width, maximum-scale=1, initial-scale=1, user-scalable=0"/>
	<link
		href="//fonts.googleapis.com/css?family=Open+Sans:300,400,700,800&amp;amp;subset=latin,latin-ext,cyrillic,cyrillic-ext"
		rel="stylesheet">
	<link href="<?= Yii::getAlias('@web/plugins/bootstrap/css/bootstrap.min.css') ?>" rel="stylesheet">
	<link href="<?= Yii::getAlias('@web/css/essentials.css') ?>" rel="stylesheet">
	<link href="<?= Yii::getAlias('@web/css/layout.css') ?>" rel="stylesheet">
	<link href="<?= Yii::getAlias('@web/css/color_scheme/green.css') ?>" rel="stylesheet">
	<link href="<?= Yii::getAlias('@web/css/report.css') ?>" rel="stylesheet">
	<script src="<?= Yii::getAlias('@web/plugins/jquery/jquery-2.1.4.min.js') ?>"></script>
	<?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>
<div id="wrapper" class="clearfix">
	<aside id="aside">
		<nav id="sideNav">
		</nav>
		<span id="asidebg"></span>
	</aside>
	<header id="header">
		<button id="mobileMenuBtn"></button>
		<span class="logo pull-left">
					<img src="<?= Yii::getAlias('@web') ?>/images/logo_light.png" alt="admin panel" height="35"/>
				</span>
		<form method="get" action="page-search.html" class="search pull-left hidden-xs">
			<input type="text" class="form-control" name="k" placeholder="Search for something..."/>
		</form>
		<nav>
			<ul class="nav pull-right">
				<li class="dropdown pull-left">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
						<img class="user-avatar" alt="" src="<?= Yii::getAlias('@web') ?>/images/noavatar.jpg" height="34"/>
						<span class="user-name">
									<span class="hidden-xs">
										 <?php
										 if (!Yii::$app->user->isGuest) {
											 if (Yii::$app->user->identity->username == 'admin') {
												 print('Account(' . Yii::$app->user->identity->username . ')');
											 } else {
												 print('Account(' . Yii::$app->user->identity->username . ')');
											 }
										 } else {
											 print "ยังไม่ได้เข้าสู่ระบบ";
										 }
										 ?>
									</span>
								</span>
					</a>
					<ul class="dropdown-menu hold-on-click">
						<li><!-- <a href="/user/settings/profile">Profile</a> -->
							<a href="<?= Yii::getAlias('@web') ?>/personsystem/site/profileuser">Profile</a>
						</li>
						<li class="divider"></li>
						<form action="<?= Yii::getAlias('@web') ?>/site/logout" method="post">
							<input type="hidden" name="_csrf" value="<?= Yii::$app->request->getCsrfToken() ?>"/>
							<button type="submit" class="btn btn-link logout">Log Out</button>
						</form>
						<li>
							<a href="<?= Yii::getAlias('@web') ?>/user/security/login">Log in</a>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
		<div class="pull-right" style="padding-top: 4px">
			<?= \yii\helpers\Html::a('<img src="' . Yii::$app->homeUrl . 'images/th.png" height="14"/>', ['language/change?lang=th']) ?>
			<br>
			<?= \yii\helpers\Html::a('<img src="' . Yii::$app->homeUrl . 'images/en.png" height="14"/>', ['language/change?lang=en']) ?>
		</div>
	</header>
	<section id="middle">
		<?= $content ?>
	</section>
</div>
<script type="text/javascript">var plugin_path = '<?= Yii::getAlias('@web') ?>/plugins/'</script>
<script src="<?= Yii::getAlias('@web/js/main.js') ?>"></script>
<script src="<?= Yii::getAlias('@web/js/list.js') ?>"></script>
<script src="<?= Yii::getAlias('@web/js/report.js') ?>"></script>
</body>
</html>
