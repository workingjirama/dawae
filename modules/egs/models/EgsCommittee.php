<?php

namespace app\modules\egs\models;

use Yii;

/**
 * This is the model class for table "egs_committee".
 *
 * @property integer $teacher_id
 * @property integer $position_id
 * @property integer $student_id
 * @property integer $calendar_id
 * @property integer $action_id
 * @property integer $level_id
 * @property integer $semester_id
 * @property integer $defense_type_id
 * @property integer $committee_fee
 *
 * @property EgsDefense $student
 * @property EgsPosition $position
 */
class EgsCommittee extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'egs_committee';
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
            [['teacher_id', 'position_id', 'student_id', 'calendar_id', 'action_id', 'level_id', 'semester_id', 'defense_type_id', 'committee_fee'], 'required'],
            [['teacher_id', 'position_id', 'student_id', 'calendar_id', 'action_id', 'level_id', 'semester_id', 'defense_type_id', 'committee_fee'], 'integer'],
            [['student_id', 'calendar_id', 'action_id', 'level_id', 'semester_id', 'defense_type_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsDefense::className(), 'targetAttribute' => ['student_id' => 'student_id', 'calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id', 'defense_type_id' => 'defense_type_id']],
            [['position_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsPosition::className(), 'targetAttribute' => ['position_id' => 'position_id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'teacher_id' => 'Teacher ID',
            'position_id' => 'Position ID',
            'student_id' => 'Student ID',
            'calendar_id' => 'Calendar ID',
            'action_id' => 'Action ID',
            'level_id' => 'Level ID',
            'semester_id' => 'Semester ID',
            'defense_type_id' => 'Defense Type ID',
            'committee_fee' => 'Committee Fee',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStudent()
    {
        return $this->hasOne(EgsDefense::className(), ['student_id' => 'student_id', 'calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id', 'defense_type_id' => 'defense_type_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPosition()
    {
        return $this->hasOne(EgsPosition::className(), ['position_id' => 'position_id']);
    }
}
