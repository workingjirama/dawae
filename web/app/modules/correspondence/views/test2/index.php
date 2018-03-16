<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\modules\correspondence\models\DocumentSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Cms Documents';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="cms-document-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a('Create Cms Document', ['create'], ['class' => 'btn btn-success']) ?>
    </p>
    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'doc_id',
            'doc_subject',
            'receive_date',
            'sent_date',
            'doc_rank',
            // 'doc_expire',
            // 'doc_tel',
            // 'doc_date',
            // 'check_id',
            // 'secret_id',
            // 'speed_id',
            // 'type_id',
            // 'user_id',
            // 'doc_id_regist',
            // 'doc_ref',
            // 'sub_type_id',
            // 'address_id',
            // 'doc_dept_id',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>
</div>
