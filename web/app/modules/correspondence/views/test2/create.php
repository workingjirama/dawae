<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model app\modules\correspondence\models\CmsDocument */

$this->title = 'Create Cms Document';
$this->params['breadcrumbs'][] = ['label' => 'Cms Documents', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="cms-document-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
