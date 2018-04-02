<?php

namespace app\modules\egs\controllers;


use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsPrinting;
use app\modules\egs\models\EgsPrintingComponent;
use Yii;

use yii\base\Module;
use yii\helpers\Json;
use yii\web\Controller;


class PrintingController extends Controller
{

    public function actionGetReview()
    {
        $reviews = EgsPrinting::find()->all();
        return Json::encode(Format::printingForListing($reviews));
    }

    public function actionInsertReviewComponent()
    {
        $post = Json::decode(Yii::$app->request->post('json'));
        $printing = EgsPrinting::findOne([
            'printing_type_id' => 1,
            'owner_id' => $post['owner_id']
        ]);
        if (!empty($printing->egsPrintingComponents)) {
            foreach ($printing->egsPrintingComponents as $printing_component) {
                $printing_component->delete();
            }
        }
        foreach ($post['post'] as $name => $value) {
            $printing_component = new EgsPrintingComponent();
            $printing_component->printing_id = $printing->printing_id;
            $printing_component->printing_component_id = $name;
            $printing_component->printing_value = $value;
            if (!$printing_component->save()) return Json::encode($printing_component->errors);

        }
        return Json::encode($printing->egsPrintingComponents);
    }

    public function actionInsertReview()
    {
        $owner_id = Config::get_user_id();
        $post = Json::decode(Yii::$app->request->post('json'));
//        return Json::encode($post);
        $printing = EgsPrinting::findOne([
            'printing_type_id' => 1,
            'owner_id' => $owner_id
        ]);
        if (empty($printing)) {
            $printing = new EgsPrinting();
            $printing->printing_type_id = 1;
            $printing->owner_id = $owner_id;
        }
        return Json::encode($printing->save() ? $printing : $printing->errors);
    }

}
