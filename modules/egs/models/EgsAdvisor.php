<?php

namespace app\modules\egs\models;

use Yii;

/**
 * This is the model class for table "egs_advisor".
 *
 * @property integer $student_id
 * @property integer $calendar_id
 * @property integer $action_id
 * @property integer $level_id
 * @property integer $semester_id
 * @property integer $teacher_id
 * @property integer $position_id
 *
 * @property EgsPosition $position
 * @property EgsUserRequest $student
 */
class EgsAdvisor extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'egs_advisor';
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
            [['student_id', 'calendar_id', 'action_id', 'level_id', 'semester_id', 'teacher_id', 'position_id'], 'required'],
            [['student_id', 'calendar_id', 'action_id', 'level_id', 'semester_id', 'teacher_id', 'position_id'], 'integer'],
            [['position_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsPosition::className(), 'targetAttribute' => ['position_id' => 'position_id']],
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
            'teacher_id' => 'Teacher ID',
            'position_id' => 'Position ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPosition()
    {
        return $this->hasOne(EgsPosition::className(), ['position_id' => 'position_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStudent()
    {
        return $this->hasOne(EgsUserRequest::className(), ['student_id' => 'student_id', 'calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id']);
    }
}
