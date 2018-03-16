<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\modules\correspondence\models\CmsDocument */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="cms-document-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'doc_id')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'doc_subject')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'receive_date')->textInput() ?>

    <?= $form->field($model, 'sent_date')->textInput() ?>

    <?= $form->field($model, 'doc_rank')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'doc_expire')->textInput() ?>

    <?= $form->field($model, 'doc_tel')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'doc_date')->textInput() ?>

    <?= $form->field($model, 'check_id')->textInput() ?>

    <?= $form->field($model, 'secret_id')->textInput() ?>

    <?= $form->field($model, 'speed_id')->textInput() ?>

    <?= $form->field($model, 'type_id')->textInput() ?>

    <?= $form->field($model, 'user_id')->textInput() ?>

    <?= $form->field($model, 'doc_id_regist')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'doc_ref')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'doc_dept_id')->textInput() ?>

    <?= $form->field($model, 'sub_type_id')->textInput() ?>

    <?= $form->field($model, 'address_id')->textInput(['maxlength' => true]) ?>

    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? 'Create' : 'Update', ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
