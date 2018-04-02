<?php

namespace app\modules\egs\models;

use Yii;

/**
 * This is the model class for table "egs_user_request".
 *
 * @property integer $petition_status_id
 * @property integer $paper_status_id
 * @property integer $calendar_id
 * @property integer $action_id
 * @property integer $level_id
 * @property integer $semester_id
 * @property integer $owner_id
 * @property integer $student_id
 * @property integer $request_fee
 * @property integer $fee_status_id
 * @property integer $request_fee_paid
 *
 * @property EgsAdvisor[] $egsAdvisors
 * @property EgsDefense[] $egsDefenses
 * @property EgsAction[] $defenseTypes
 * @property EgsRequestDocument[] $egsRequestDocuments
 * @property EgsDocument[] $documents
 * @property EgsCalendarItem $calendar
 * @property EgsStatus $paperStatus
 * @property EgsStatus $feeStatus
 * @property EgsStatus $petitionStatus
 */
class EgsUserRequest extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'egs_user_request';
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
            [['petition_status_id', 'paper_status_id', 'calendar_id', 'action_id', 'level_id', 'semester_id', 'owner_id', 'student_id', 'request_fee', 'fee_status_id', 'request_fee_paid'], 'required'],
            [['petition_status_id', 'paper_status_id', 'calendar_id', 'action_id', 'level_id', 'semester_id', 'owner_id', 'student_id', 'request_fee', 'fee_status_id', 'request_fee_paid'], 'integer'],
            [['calendar_id', 'action_id', 'level_id', 'semester_id', 'owner_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsCalendarItem::className(), 'targetAttribute' => ['calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id', 'owner_id' => 'owner_id']],
            [['paper_status_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsStatus::className(), 'targetAttribute' => ['paper_status_id' => 'status_id']],
            [['fee_status_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsStatus::className(), 'targetAttribute' => ['fee_status_id' => 'status_id']],
            [['petition_status_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsStatus::className(), 'targetAttribute' => ['petition_status_id' => 'status_id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'petition_status_id' => 'Petition Status ID',
            'paper_status_id' => 'Paper Status ID',
            'calendar_id' => 'Calendar ID',
            'action_id' => 'Action ID',
            'level_id' => 'Level ID',
            'semester_id' => 'Semester ID',
            'owner_id' => 'Owner ID',
            'student_id' => 'Student ID',
            'request_fee' => 'Request Fee',
            'fee_status_id' => 'Fee Status ID',
            'request_fee_paid' => 'Request Fee Paid',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsAdvisors()
    {
        return $this->hasMany(EgsAdvisor::className(), ['calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id', 'owner_id' => 'owner_id', 'student_id' => 'student_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsDefenses()
    {
        return $this->hasMany(EgsDefense::className(), ['calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id', 'owner_id' => 'owner_id', 'student_id' => 'student_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDefenseTypes()
    {
        return $this->hasMany(EgsAction::className(), ['action_id' => 'defense_type_id'])->viaTable('egs_defense', ['calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id', 'owner_id' => 'owner_id', 'student_id' => 'student_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsRequestDocuments()
    {
        return $this->hasMany(EgsRequestDocument::className(), ['calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id', 'owner_id' => 'owner_id', 'student_id' => 'student_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDocuments()
    {
        return $this->hasMany(EgsDocument::className(), ['document_id' => 'document_id'])->viaTable('egs_request_document', ['calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id', 'owner_id' => 'owner_id', 'student_id' => 'student_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCalendar()
    {
        return $this->hasOne(EgsCalendarItem::className(), ['calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id', 'owner_id' => 'owner_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPaperStatus()
    {
        return $this->hasOne(EgsStatus::className(), ['status_id' => 'paper_status_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFeeStatus()
    {
        return $this->hasOne(EgsStatus::className(), ['status_id' => 'fee_status_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPetitionStatus()
    {
        return $this->hasOne(EgsStatus::className(), ['status_id' => 'petition_status_id']);
    }
}
