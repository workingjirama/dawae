<?php

namespace app\modules\egs\models;

use Yii;

/**
 * This is the model class for table "egs_action_on_status".
 *
 * @property integer $action_id
 * @property integer $on_status_id
 * @property integer $status_id
 *
 * @property EgsAction $action
 * @property EgsStatus $status
 * @property EgsOnStatus $onStatus
 */
class EgsActionOnStatus extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'egs_action_on_status';
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
            [['action_id', 'on_status_id', 'status_id'], 'required'],
            [['action_id', 'on_status_id', 'status_id'], 'integer'],
            [['action_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsAction::className(), 'targetAttribute' => ['action_id' => 'action_id']],
            [['status_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsStatus::className(), 'targetAttribute' => ['status_id' => 'status_id']],
            [['on_status_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsOnStatus::className(), 'targetAttribute' => ['on_status_id' => 'on_status_id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'action_id' => 'Action ID',
            'on_status_id' => 'On Status ID',
            'status_id' => 'Status ID',
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
    public function getStatus()
    {
        return $this->hasOne(EgsStatus::className(), ['status_id' => 'status_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getOnStatus()
    {
        return $this->hasOne(EgsOnStatus::className(), ['on_status_id' => 'on_status_id']);
    }
}
