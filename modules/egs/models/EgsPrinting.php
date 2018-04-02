<?php

namespace app\modules\egs\models;

use Yii;

/**
 * This is the model class for table "egs_printing".
 *
 * @property integer $printing_id
 * @property integer $printing_type_id
 * @property integer $owner_id
 *
 * @property EgsPrintingType $printingType
 * @property EgsPrintingComponent[] $egsPrintingComponents
 */
class EgsPrinting extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'egs_printing';
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
            [['printing_type_id', 'owner_id'], 'required'],
            [['printing_type_id', 'owner_id'], 'integer'],
            [['printing_type_id'], 'exist', 'skipOnError' => true, 'targetClass' => EgsPrintingType::className(), 'targetAttribute' => ['printing_type_id' => 'printing_type_id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'printing_id' => 'Printing ID',
            'printing_type_id' => 'Printing Type ID',
            'owner_id' => 'Owner ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPrintingType()
    {
        return $this->hasOne(EgsPrintingType::className(), ['printing_type_id' => 'printing_type_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsPrintingComponents()
    {
        return $this->hasMany(EgsPrintingComponent::className(), ['printing_id' => 'printing_id']);
    }
}
