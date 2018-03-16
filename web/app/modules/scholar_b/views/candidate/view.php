<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\modules\scholar_b\models\ScbCandidate */

$this->title = $model->id_card;
$this->params['breadcrumbs'][] = ['label' => 'Scb Candidates', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="scb-candidate-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id' => $model->id_card], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id' => $model->id_card], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'id_card',
            'password',
            'prefix',
            'firstname',
            'lastname',
            'blood_type',
            'birth_date',
            'origin',
            'nationality',
            'religion',
            'place_of_birth',
            'email:email',
            'mobile',
            'status',
            'schoolname',
            'school_status',
            'total_brethren',
            'sister',
            'brother',
            'crby',
            'crtime',
            'udby',
            'udtime',
        ],
    ]) ?>

</div>
