<?php

namespace app\modules\egs\controllers;


use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsEvaluation;
use app\modules\egs\models\EgsEvaluationTopic;
use app\modules\egs\models\EgsEvaluationTopicGroup;
use app\modules\egs\models\EgsPrinting;
use app\modules\egs\models\EgsPrintingComponent;
use app\modules\egs\models\EgsUserEvaluation;
use app\modules\egs\models\EgsUserEvaluationRate;
use Yii;

use yii\base\Module;
use yii\helpers\Json;
use yii\web\Controller;


class UserEvaluationController extends Controller
{
    public function actionAll()
    {
        $user_evaluation = EgsUserEvaluation::find()
            ->joinWith(['evaluation e'])
            ->where([
                'evaluation_active' => 1
            ])->all();
        return Json::encode(Format::user_evaluation($user_evaluation));
    }

    public function actionSubmitted()
    {
        $student_id = Config::get_user_id();
        $user_evaluation = EgsUserEvaluation::find()
            ->joinWith(['evaluation e'])
            ->where([
                'student_id' => $student_id,
                'e.evaluation_active' => 1
            ])->one();
        return Json::encode(!empty($user_evaluation));
    }

    public function actionInsert()
    {
        $post = Json::decode(Yii::$app->request->post('json'));
        $evaluation = $post['evaluation'];
        $student_id = Config::get_user_id();
        $user_evaluation = EgsUserEvaluation::findOne([
            'student_id' => $student_id,
            'evaluation_id' => $evaluation['evaluation_id']
        ]);
        if (empty($user_evaluation)) {
            $user_evaluation = new EgsUserEvaluation();
            $user_evaluation->student_id = $student_id;
            $user_evaluation->evaluation_id = $evaluation['evaluation_id'];
        } else {
            foreach ($user_evaluation->egsUserEvaluationRates as $user_evaluation_rate) {
                $user_evaluation_rate->delete();
            }
        }
        $user_evaluation->user_evaluation_data = $evaluation['data'];
        if ($user_evaluation->save()) {
            foreach ($evaluation['evaluation_topic_group'] as $evaluation_topic_group) {
                foreach ($evaluation_topic_group['evaluation_topic'] as $evaluation_topic) {
                    $user_evaluation_rate = new EgsUserEvaluationRate();
                    $user_evaluation_rate->student_id = $user_evaluation->student_id;
                    $user_evaluation_rate->evaluation_id = $user_evaluation->evaluation_id;
                    $user_evaluation_rate->evaluation_topic_id = $evaluation_topic['evaluation_topic_id'];
                    $user_evaluation_rate->evaluation_rate = $evaluation_topic['value'];
                    if (!$user_evaluation_rate->save()) return Json::encode($user_evaluation_rate->errors);
                }
            }
        } else {
            return Json::encode($user_evaluation->errors);
        }
        return Json::encode(true);
    }
}
