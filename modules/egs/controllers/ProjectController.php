<?php

namespace app\modules\egs\controllers;


use app\modules\egs\controllers\Format;
use app\modules\egs\models\EgsActionItem;
use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsCalendarLevel;
use app\modules\egs\models\EgsLevel;
use app\modules\egs\models\EgsProject;
use app\modules\egs\models\EgsSemester;
use Yii;

use yii\base\Module;
use yii\helpers\ArrayHelper;
use yii\helpers\Json;
use yii\web\Controller;

class ProjectController extends Controller
{
    public function actionCurrentUser()
    {
        $user_id = Config::get_user_id();
        $project = EgsProject::find()->where([
            'student_id' => $user_id,
        ])->one();
        return Json::encode(empty($project) ? null : Format::project($project));
    }

    public function actionUpdate()
    {
        $user_id = Config::get_user_id();
        $post = Json::decode(Yii::$app->request->post('json'));
        $project = EgsProject::find()->where(['student_id' => $user_id, 'project_active' => 1])->one();
        if (!empty($project)) {
            $project->project_active = false;
            if (!$project->save()) return Json::encode($project->errors);
        }
        $project = new EgsProject();
        $project->student_id = $user_id;
        $project->project_name_th = $post['name_th'];
        $project->project_name_en = $post['name_en'];
        $project->project_active = 1;
        if (!$project->save()) return Json::encode($project->errors);
        return Json::encode(Format::project($project));
    }
}