<?php

namespace app\modules\egs\models;

use Yii;

/**
 * This is the model class for table "egs_printing_type".
 *
 * @property integer $printing_type_id
 * @property string $printing_type_name_th
 * @property string $printing_type_name_en
 *
 * @property EgsPrinting[] $egsPrintings
 */
class EgsPrintingType extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'egs_printing_type';
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
            [['printing_type_id', 'printing_type_name_th', 'printing_type_name_en'], 'required'],
            [['printing_type_id'], 'integer'],
            [['printing_type_name_th', 'printing_type_name_en'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'printing_type_id' => 'Printing Type ID',
            'printing_type_name_th' => 'Printing Type Name Th',
            'printing_type_name_en' => 'Printing Type Name En',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsPrintings()
    {
        return $this->hasMany(EgsPrinting::className(), ['printing_type_id' => 'printing_type_id']);
    }
}
