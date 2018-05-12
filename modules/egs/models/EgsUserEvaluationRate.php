<?php

namespace app\modules\egs\models;

use Yii;

/**
 * This is the model class for table "egs_user_evaluation_rate".
 *
 * @property integer $evaluation_id
 * @property integer $student_id
 * @property integer $evaluation_topic_id
 * @property integer $evaluation_rate
 *
 * @property EgsEvaluationTopic $evaluationTopic
 * @property EgsUserEvaluation $evaluation
 */
class EgsUserEvaluationRate extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'egs_user_evaluation_rate';
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
            [['evaluation_id', 'student_id', 'evaluation_topic_id', 'evaluation_rate'], 'required'],
            [['evaluation_id', 'student_id', 'evaluation_topic_id', 'evaluation_rate'], 'integer'],
            [['evaluation_topic_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsEvaluationTopic::className(), 'targetAttribute' => ['evaluation_topic_id' => 'evaluation_topic_id']],
            [['evaluation_id', 'student_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsUserEvaluation::className(), 'targetAttribute' => ['evaluation_id' => 'evaluation_id', 'student_id' => 'student_id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'evaluation_id' => 'Evaluation ID',
            'student_id' => 'Student ID',
            'evaluation_topic_id' => 'Evaluation Topic ID',
            'evaluation_rate' => 'Evaluation Rate',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEvaluationTopic()
    {
        return $this->hasOne(EgsEvaluationTopic::className(), ['evaluation_topic_id' => 'evaluation_topic_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEvaluation()
    {
        return $this->hasOne(EgsUserEvaluation::className(), ['evaluation_id' => 'evaluation_id', 'student_id' => 'student_id']);
    }
}
