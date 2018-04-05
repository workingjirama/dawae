<?php

namespace app\modules\egs\models;

use Yii;

/**
 * This is the model class for table "egs_step".
 *
 * @property integer $step_id
 * @property string $step_component
 *
 * @property EgsActionCompleteStep[] $egsActionCompleteSteps
 * @property EgsAction[] $actions
 * @property EgsActionSubmitStep[] $egsActionSubmitSteps
 * @property EgsAction[] $actions0
 */
class EgsStep extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'egs_step';
    }

    /**
     * @return \yii\db\Connection the database connection used by this AR class.
     */
    public static function getDb()
    {
        return Yii::$app->get('db_egs');
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['step_id', 'step_component'], 'required'],
            [['step_id'], 'integer'],
            [['step_component'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'step_id' => 'Step ID',
            'step_component' => 'Step Component',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsActionCompleteSteps()
    {
        return $this->hasMany(EgsActionCompleteStep::className(), ['step_id' => 'step_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getActions()
    {
        return $this->hasMany(EgsAction::className(), ['action_id' => 'action_id'])->viaTable('egs_action_complete_step', ['step_id' => 'step_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsActionSubmitSteps()
    {
        return $this->hasMany(EgsActionSubmitStep::className(), ['step_id' => 'step_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getActions0()
    {
        return $this->hasMany(EgsAction::className(), ['action_id' => 'action_id'])->viaTable('egs_action_submit_step', ['step_id' => 'step_id']);
    }
}
