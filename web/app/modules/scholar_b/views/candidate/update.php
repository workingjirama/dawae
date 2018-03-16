<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\modules\scholar_b\models\ScbCandidate */

$this->title = 'Update Scb Candidate: ' . $model->id_card;
$this->params['breadcrumbs'][] = ['label' => 'Scb Candidates', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id_card, 'url' => ['view', 'id' => $model->id_card]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="scb-candidate-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
