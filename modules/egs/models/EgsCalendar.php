<?php

namespace app\modules\egs\models;

use Yii;

/**
 * This is the model class for table "egs_calendar".
 *
 * @property integer $calendar_id
 * @property integer $calendar_active
 *
 * @property EgsCalendarItem[] $egsCalendarItems
 * @property EgsActionItem[] $semesters
 */
class EgsCalendar extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'egs_calendar';
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
            [['calendar_id', 'calendar_active'], 'required'],
            [['calendar_id', 'calendar_active'], 'integer'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'calendar_id' => 'Calendar ID',
            'calendar_active' => 'Calendar Active',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEgsCalendarItems()
    {
        return $this->hasMany(EgsCalendarItem::className(), ['calendar_id' => 'calendar_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSemesters()
    {
        return $this->hasMany(EgsActionItem::className(), ['semester_id' => 'semester_id', 'action_id' => 'action_id', 'level_id' => 'level_id'])->viaTable('egs_calendar_item', ['calendar_id' => 'calendar_id']);
    }
}
