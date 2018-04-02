<?php

namespace app\modules\egs\models;

use Yii;

/**
 * This is the model class for table "egs_on_status".
 *
 * @property integer $on_status_id
 * @property string $on_status_name_th
 * @property string $on_status_name_en
 *
 * @property EgsActionOnStatus[] $egsActionOnStatuses
 */
class EgsOnStatus extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'egs_on_status';
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
            [['on_status_id', 'on_status_name_th', 'on_status_name_en'], 'required'],
            [['on_status_id'], 'integer'],
            [['on_status_name_th', 'on_status_name_en'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'on_status_id' => 'On Status ID',
            'on_status_name_th' => 'On Status Name Th',
            'on_status_name_en' => 'On Status Name En',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsActionOnStatuses()
    {
        return $this->hasMany(EgsActionOnStatus::className(), ['on_status_id' => 'on_status_id']);
    }
}
