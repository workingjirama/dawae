<?php

namespace app\modules\egs\controllers;


use app\modules\egs\models\EgsCalendar;
use Yii;

use yii\base\Module;
use yii\helpers\Json;
use yii\web\Controller;


class Language
{
    private $DEFAULT_LANGUAGE = 'th';

    public function get()
    {
        $lang = $this->DEFAULT_LANGUAGE;
        if (Yii::$app->session->has('lang'))
            $lang = Yii::$app->session->get('lang');
        return $lang;
    }

    public function getDbLang()
    {
        $lang = $this->get();
        if ($lang === $this->DEFAULT_LANGUAGE)
            return '';
        else
            return '_eng';
    }
}
