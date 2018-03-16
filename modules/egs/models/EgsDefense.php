<?php

namespace app\modules\egs\models;

use Yii;

/**
 * This is the model class for table "egs_defense".
 *
 * @property integer $student_id
 * @property integer $calendar_id
 * @property integer $action_id
 * @property integer $level_id
 * @property integer $semester_id
 * @property integer $defense_type_id
 * @property string $defense_date
 * @property string $defense_time_start
 * @property string $defense_time_end
 * @property integer $room_id
 * @property integer $defense_status_id
 * @property integer $defense_score
 * @property integer $defense_credit
 * @property string $defense_comment
 *
 * @property EgsCommittee[] $egsCommittees
 * @property EgsAction $defenseType
 * @property EgsRoom $room
 * @property EgsStatus $defenseStatus
 * @property EgsUserRequest $student
 */
class EgsDefense extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'egs_defense';
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
            [['student_id', 'calendar_id', 'action_id', 'level_id', 'semester_id', 'defense_type_id', 'defense_date', 'defense_time_start', 'defense_time_end', 'room_id', 'defense_status_id'], 'required'],
            [['student_id', 'calendar_id', 'action_id', 'level_id', 'semester_id', 'defense_type_id', 'room_id', 'defense_status_id', 'defense_score', 'defense_credit'], 'integer'],
            [['defense_date', 'defense_time_start', 'defense_time_end'], 'safe'],
            [['defense_comment'], 'string', 'max' => 2560],
            [['defense_type_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsAction::className(), 'targetAttribute' => ['defense_type_id' => 'action_id']],
            [['room_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsRoom::className(), 'targetAttribute' => ['room_id' => 'room_id']],
            [['defense_status_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsStatus::className(), 'targetAttribute' => ['defense_status_id' => 'status_id']],
            [['student_id', 'calendar_id', 'action_id', 'level_id', 'semester_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsUserRequest::className(), 'targetAttribute' => ['student_id' => 'student_id', 'calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id']],
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
            'defense_type_id' => 'Defense Type ID',
            'defense_date' => 'Defense Date',
            'defense_time_start' => 'Defense Time Start',
            'defense_time_end' => 'Defense Time End',
            'room_id' => 'Room ID',
            'defense_status_id' => 'Defense Status ID',
            'defense_score' => 'Defense Score',
            'defense_credit' => 'Defense Credit',
            'defense_comment' => 'Defense Comment',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsCommittees()
    {
        return $this->hasMany(EgsCommittee::className(), ['student_id' => 'student_id', 'calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id', 'defense_type_id' => 'defense_type_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDefenseType()
    {
        return $this->hasOne(EgsAction::className(), ['action_id' => 'defense_type_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getRoom()
    {
        return $this->hasOne(EgsRoom::className(), ['room_id' => 'room_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDefenseStatus()
    {
        return $this->hasOne(EgsStatus::className(), ['status_id' => 'defense_status_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStudent()
    {
        return $this->hasOne(EgsUserRequest::className(), ['student_id' => 'student_id', 'calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id']);
    }
}
