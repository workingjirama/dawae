<?php

namespace app\modules\egs\models;

use Yii;

/**
 * This is the model class for table "egs_document_type".
 *
 * @property integer $document_type_id
 * @property string $document_type_name_th
 * @property string $document_type_name_en
 *
 * @property EgsDocument[] $egsDocuments
 */
class EgsDocumentType extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'egs_document_type';
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
            [['document_type_id', 'document_type_name_th', 'document_type_name_en'], 'required'],
            [['document_type_id'], 'integer'],
            [['document_type_name_th', 'document_type_name_en'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'document_type_id' => 'Document Type ID',
            'document_type_name_th' => 'Document Type Name Th',
            'document_type_name_en' => 'Document Type Name En',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsDocuments()
    {
        return $this->hasMany(EgsDocument::className(), ['document_type_id' => 'document_type_id']);
    }
}
