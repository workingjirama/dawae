<?php

namespace app\modules\egs\models;

use Yii;

/**
 * This is the model class for table "egs_printing_component".
 *
 * @property integer $printing_id
 * @property string $printing_component_id
 * @property string $printing_value
 *
 * @property EgsPrinting $printing
 */
class EgsPrintingComponent extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'egs_printing_component';
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
            [['printing_id', 'printing_component_id'], 'required'],
            [['printing_id'], 'integer'],
            [['printing_component_id', 'printing_value'], 'string', 'max' => 255],
            [['printing_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsPrinting::className(), 'targetAttribute' => ['printing_id' => 'printing_id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'printing_id' => 'Printing ID',
            'printing_component_id' => 'Printing Component ID',
            'printing_value' => 'Printing Value',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPrinting()
    {
        return $this->hasOne(EgsPrinting::className(), ['printing_id' => 'printing_id']);
    }
}
