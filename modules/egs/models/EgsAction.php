<?php

namespace app\modules\egs\models;

use Yii;

/**
 * This is the model class for table "egs_action".
 *
 * @property integer $action_id
 * @property string $action_name_th
 * @property string $action_name_en
 * @property string $action_detail_th
 * @property string $action_detail_en
 * @property integer $action_type_id
 * @property integer $action_default
 * @property integer $redo
 * @property integer $action_credit
 *
 * @property EgsActionType $actionType
 * @property EgsActionCompleteStep[] $egsActionCompleteSteps
 * @property EgsStep[] $steps
 * @property EgsActionDocument[] $egsActionDocuments
 * @property EgsDocument[] $documents
 * @property EgsActionFor[] $egsActionFors
 * @property EgsActionItem[] $egsActionItems
 * @property EgsActionOnStatus[] $egsActionOnStatuses
 * @property EgsActionSubmitStep[] $egsActionSubmitSteps
 * @property EgsStep[] $steps0
 * @property EgsCommitteeFee[] $egsCommitteeFees
 * @property EgsDefense[] $egsDefenses
 * @property EgsUserRequest[] $calendars
 * @property EgsRequestDefense[] $egsRequestDefenses
 * @property EgsRequestDefense[] $egsRequestDefenses0
 * @property EgsAction[] $requestTypes
 * @property EgsAction[] $defenseTypes
 * @property EgsRequestFee[] $egsRequestFees
 */
class EgsAction extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'egs_action';
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
            [['action_id', 'action_name_th', 'action_name_en', 'action_type_id', 'action_default', 'redo', 'action_credit'], 'required'],
            [['action_id', 'action_type_id', 'action_default', 'redo', 'action_credit'], 'integer'],
            [['action_name_th', 'action_name_en', 'action_detail_th', 'action_detail_en'], 'string', 'max' => 255],
            [['action_type_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsActionType::className(), 'targetAttribute' => ['action_type_id' => 'action_type_id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'action_id' => 'Action ID',
            'action_name_th' => 'Action Name Th',
            'action_name_en' => 'Action Name En',
            'action_detail_th' => 'Action Detail Th',
            'action_detail_en' => 'Action Detail En',
            'action_type_id' => 'Action Type ID',
            'action_default' => 'Action Default',
            'redo' => 'Redo',
            'action_credit' => 'Action Credit',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getActionType()
    {
        return $this->hasOne(EgsActionType::className(), ['action_type_id' => 'action_type_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsActionCompleteSteps()
    {
        return $this->hasMany(EgsActionCompleteStep::className(), ['action_id' => 'action_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSteps()
    {
        return $this->hasMany(EgsStep::className(), ['step_id' => 'step_id'])->viaTable('egs_action_complete_step', ['action_id' => 'action_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsActionDocuments()
    {
        return $this->hasMany(EgsActionDocument::className(), ['action_id' => 'action_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDocuments()
    {
        return $this->hasMany(EgsDocument::className(), ['document_id' => 'document_id'])->viaTable('egs_action_document', ['action_id' => 'action_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsActionFors()
    {
        return $this->hasMany(EgsActionFor::className(), ['action_id' => 'action_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsActionItems()
    {
        return $this->hasMany(EgsActionItem::className(), ['action_id' => 'action_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsActionOnStatuses()
    {
        return $this->hasMany(EgsActionOnStatus::className(), ['action_id' => 'action_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsActionSubmitSteps()
    {
        return $this->hasMany(EgsActionSubmitStep::className(), ['action_id' => 'action_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSteps0()
    {
        return $this->hasMany(EgsStep::className(), ['step_id' => 'step_id'])->viaTable('egs_action_submit_step', ['action_id' => 'action_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsCommitteeFees()
    {
        return $this->hasMany(EgsCommitteeFee::className(), ['action_id' => 'action_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsDefenses()
    {
        return $this->hasMany(EgsDefense::className(), ['defense_type_id' => 'action_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCalendars()
    {
        return $this->hasMany(EgsUserRequest::className(), ['calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id', 'owner_id' => 'owner_id', 'student_id' => 'student_id'])->viaTable('egs_defense', ['defense_type_id' => 'action_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsRequestDefenses()
    {
        return $this->hasMany(EgsRequestDefense::className(), ['defense_type_id' => 'action_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsRequestDefenses0()
    {
        return $this->hasMany(EgsRequestDefense::className(), ['request_type_id' => 'action_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getRequestTypes()
    {
        return $this->hasMany(EgsAction::className(), ['action_id' => 'request_type_id'])->viaTable('egs_request_defense', ['defense_type_id' => 'action_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDefenseTypes()
    {
        return $this->hasMany(EgsAction::className(), ['action_id' => 'defense_type_id'])->viaTable('egs_request_defense', ['request_type_id' => 'action_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsRequestFees()
    {
        return $this->hasMany(EgsRequestFee::className(), ['action_id' => 'action_id']);
    }
}
