<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Scb Candidates';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="scb-candidate-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Scb Candidate', ['create'], ['class' => 'btn btn-success']) ?>
    </p>
    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id_card',
            'password',
            'prefix',
            'firstname',
            'lastname',
            // 'blood_type',
            // 'birth_date',
            // 'origin',
            // 'nationality',
            // 'religion',
            // 'place_of_birth',
            // 'email:email',
            // 'mobile',
            // 'status',
            // 'schoolname',
            // 'school_status',
            // 'total_brethren',
            // 'sister',
            // 'brother',
            // 'crby',
            // 'crtime',
            // 'udby',
            // 'udtime',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>
</div>
