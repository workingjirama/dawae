<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\modules\correspondence\models\CmsDocument */

$this->title = $model->doc_id;
$this->params['breadcrumbs'][] = ['label' => 'Cms Documents', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="cms-document-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'doc_id' => $model->doc_id, 'doc_dept_id' => $model->doc_dept_id, 'sub_type_id' => $model->sub_type_id, 'address_id' => $model->address_id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'doc_id' => $model->doc_id, 'doc_dept_id' => $model->doc_dept_id, 'sub_type_id' => $model->sub_type_id, 'address_id' => $model->address_id], [
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
            'doc_id',
            'doc_subject',
            'receive_date',
            'sent_date',
            'doc_rank',
            'doc_expire',
            'doc_tel',
            'doc_date',
            'check_id',
            'secret_id',
            'speed_id',
            'type_id',
            'user_id',
            'doc_id_regist',
            'doc_ref',
            'doc_dept_id',
            'sub_type_id',
            'address_id',
        ],
    ]) ?>

</div>
