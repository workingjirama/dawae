<?php

namespace app\modules\egs\controllers;

use Yii;

use yii\helpers\Json;
use yii\helpers\Url;
use yii\web\Controller;

class TempoController extends Controller
{

    private $VIEW_NAME = "view_pis_user";

    private $DEFAULT_LANGUAGE = 'th';

    public function actionTest()
    {
        return Json::encode($_FILES['paper']);
    }

    public function actionIndex()
    {
        $datas = [];
        $persons = Yii::$app->getDb()->createCommand('SELECT * FROM view_pis_user')->queryAll();
        foreach ($persons as $person) {
            $person['program'] = Yii::$app->getDb()->createCommand(
                'SELECT * FROM reg_program WHERE PROGRAMID LIKE "' . $person['program_id'] . '"'
            )->queryOne()['PROGRAMNAME'];
            array_push($datas, $person);
        }
        return $this->render('tempo', ['temp' => $datas]);
    }

    public function actionJson()
    {
        $temp = Yii::$app->getDb()->createCommand('SELECT * FROM view_pis_user')->queryAll();
        $user_id = Yii::$app->session->get('id');
        return Json::encode($temp);
    }

    public function actionLogin($id)
    {
        $session = Yii::$app->session;
        $session->set('id', $id);
        $this->redirect(Url::base() . '/egs');
    }

    public function actionLoginOffline($type)
    {
        $session = Yii::$app->session;
        $session->set('type', $type);
        $this->redirect(Url::base() . '/egs');
    }


    public function actionLogout()
    {
        $session = Yii::$app->session;
        $session->removeAll();
        $this->redirect(Url::base() . '/egs');
    }

    public function actionLanguage($lang)
    {
        Yii::$app->session->set('lang', $lang);
        return $this->redirect(\Yii::$app->request->referrer);
    }

    public function actionGetLanguage()
    {
        $lang = $this->DEFAULT_LANGUAGE;
        if (Yii::$app->session->has('lang'))
            $lang = Yii::$app->session->get('lang');
        return Json::encode($lang);
    }
}
