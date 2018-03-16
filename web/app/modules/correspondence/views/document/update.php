<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\modules\correspondence\models\CmsDocument */

$this->title = 'Update Cms Document: ' . $model->doc_id;
$this->params['breadcrumbs'][] = ['label' => 'Cms Documents', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->doc_id, 'url' => ['view', 'doc_id' => $model->doc_id, 'doc_dept_id' => $model->doc_dept_id, 'sub_type_id' => $model->sub_type_id, 'address_id' => $model->address_id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="cms-document-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
