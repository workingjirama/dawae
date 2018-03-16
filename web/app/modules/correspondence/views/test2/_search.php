<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\modules\correspondence\models\DocumentSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="cms-document-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'doc_id') ?>

    <?= $form->field($model, 'doc_subject') ?>

    <?= $form->field($model, 'receive_date') ?>

    <?= $form->field($model, 'sent_date') ?>

    <?= $form->field($model, 'doc_rank') ?>

    <?php // echo $form->field($model, 'doc_expire') ?>

    <?php // echo $form->field($model, 'doc_tel') ?>

    <?php // echo $form->field($model, 'doc_date') ?>

    <?php // echo $form->field($model, 'check_id') ?>

    <?php // echo $form->field($model, 'secret_id') ?>

    <?php // echo $form->field($model, 'speed_id') ?>

    <?php // echo $form->field($model, 'type_id') ?>

    <?php // echo $form->field($model, 'user_id') ?>

    <?php // echo $form->field($model, 'doc_id_regist') ?>

    <?php // echo $form->field($model, 'doc_ref') ?>

    <?php // echo $form->field($model, 'sub_type_id') ?>

    <?php // echo $form->field($model, 'address_id') ?>

    <?php // echo $form->field($model, 'doc_dept_id') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-default']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
