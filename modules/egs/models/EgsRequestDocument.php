<?php

namespace app\modules\egs\models;

use Yii;

/**
 * This is the model class for table "egs_request_document".
 *
 * @property integer $student_id
 * @property integer $calendar_id
 * @property integer $action_id
 * @property integer $level_id
 * @property integer $semester_id
 * @property integer $document_id
 * @property string $request_document_path
 * @property integer $request_document_id
 *
 * @property EgsDocument $document
 * @property EgsUserRequest $student
 */
class EgsRequestDocument extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'egs_request_document';
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
            [['student_id', 'calendar_id', 'action_id', 'level_id', 'semester_id', 'document_id'], 'required'],
            [['student_id', 'calendar_id', 'action_id', 'level_id', 'semester_id', 'document_id', 'request_document_id'], 'integer'],
            [['request_document_path'], 'string', 'max' => 255],
            [['document_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsDocument::className(), 'targetAttribute' => ['document_id' => 'document_id']],
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
            'document_id' => 'Document ID',
            'request_document_path' => 'Request Document Path',
            'request_document_id' => 'Request Document ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDocument()
    {
        return $this->hasOne(EgsDocument::className(), ['document_id' => 'document_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStudent()
    {
        return $this->hasOne(EgsUserRequest::className(), ['student_id' => 'student_id', 'calendar_id' => 'calendar_id', 'action_id' => 'action_id', 'level_id' => 'level_id', 'semester_id' => 'semester_id']);
    }
}
