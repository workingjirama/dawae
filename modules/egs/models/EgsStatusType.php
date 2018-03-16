<?php

namespace app\modules\egs\models;

use Yii;

/**
 * This is the model class for table "egs_status_type".
 *
 * @property integer $status_type_id
 * @property string $status_type_name
 *
 * @property EgsStatus[] $egsStatuses
 */
class EgsStatusType extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'egs_status_type';
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
            [['status_type_id', 'status_type_name'], 'required'],
            [['status_type_id'], 'integer'],
            [['status_type_name'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'status_type_id' => 'Status Type ID',
            'status_type_name' => 'Status Type Name',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsStatuses()
    {
        return $this->hasMany(EgsStatus::className(), ['status_type_id' => 'status_type_id']);
    }
}
