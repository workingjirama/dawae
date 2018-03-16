<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model app\modules\scholar_b\models\ScbCandidate */

$this->title = 'Create Scb Candidate';
$this->params['breadcrumbs'][] = ['label' => 'Scb Candidates', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="scb-candidate-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
