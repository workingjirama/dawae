<?php

namespace app\modules\egs\models;

use Yii;

/**
 * This is the model class for table "egs_user_request".
 *
 * @property integer $student_id
 * @property integer $calendar_id
 * @property integer $action_id
 * @property integer $level_id
 * @property integer $semester_id
 * @property integer $pet_status_id
 * @property integer $doc_status_id
 *
 * @property EgsAdvisor[] $egsAdvisors
 * @property EgsDefense[] $egsDefenses
 * @property EgsAction[] $defenseTypes
 * @property EgsRequestDocument[] $egsRequestDocuments
 * @property EgsDocument[] $documents
 * @property EgsCalendarItem $calendar
 * @property EgsStatus $docStatus
 * @property EgsStatus $petStatus
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
            [['student_id', 'calendar_id', 'action_id', 'level_id', 'semester_id', 'pet_status_id', 'doc_status_id'], 'required'],
            [['student_id', 'calendar_id', 'action_id', 'level_id', 'semester_id', 'pet_status_id', 'doc_status_id'], 'integer'],
            [['calendar_id', 'action_id', 'level_id', 'semester_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsCalendarItem::className(), 'targetAttribute' => ['calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id']],
            [['doc_status_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsStatus::className(), 'targetAttribute' => ['doc_status_id' => 'status_id']],
            [['pet_status_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsStatus::className(), 'targetAttribute' => ['pet_status_id' => 'status_id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'student_id' => 'Student ID',
            'calendar_id' => 'Calendar ID',
            'action_id' => 'Action ID',
            'level_id' => 'Level ID',
            'semester_id' => 'Semester ID',
            'pet_status_id' => 'Pet Status ID',
            'doc_status_id' => 'Doc Status ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsAdvisors()
    {
        return $this->hasMany(EgsAdvisor::className(), ['student_id' => 'student_id', 'calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsDefenses()
    {
        return $this->hasMany(EgsDefense::className(), ['student_id' => 'student_id', 'calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDefenseTypes()
    {
        return $this->hasMany(EgsAction::className(), ['action_id' => 'defense_type_id'])->viaTable('egs_defense', ['student_id' => 'student_id', 'calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsRequestDocuments()
    {
        return $this->hasMany(EgsRequestDocument::className(), ['student_id' => 'student_id', 'calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDocuments()
    {
        return $this->hasMany(EgsDocument::className(), ['document_id' => 'document_id'])->viaTable('egs_request_document', ['student_id' => 'student_id', 'calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCalendar()
    {
        return $this->hasOne(EgsCalendarItem::className(), ['calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDocStatus()
    {
        return $this->hasOne(EgsStatus::className(), ['status_id' => 'doc_status_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPetStatus()
    {
        return $this->hasOne(EgsStatus::className(), ['status_id' => 'pet_status_id']);
    }
}
