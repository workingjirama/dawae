<?php

namespace app\modules\egs\models;

use Yii;

/**
 * This is the model class for table "egs_action_submit_step".
 *
 * @property integer $action_id
 * @property integer $step_id
 *
 * @property EgsAction $action
 * @property EgsStep $step
 */
class EgsActionSubmitStep extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'egs_action_submit_step';
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
            [['action_id', 'step_id'], 'required'],
            [['action_id', 'step_id'], 'integer'],
            [['action_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsAction::className(), 'targetAttribute' => ['action_id' => 'action_id']],
            [['step_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsStep::className(), 'targetAttribute' => ['step_id' => 'step_id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'action_id' => 'Action ID',
            'step_id' => 'Step ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getAction()
    {
        return $this->hasOne(EgsAction::className(), ['action_id' => 'action_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStep()
    {
        return $this->hasOne(EgsStep::className(), ['step_id' => 'step_id']);
    }
}
