<?php

namespace app\modules\egs;

use Yii;

/**
 * egs module definition class
 */
class Module extends \yii\base\Module
{
    /**
     * @inheritdoc
     */
    public $controllerNamespace = 'app\modules\egs\controllers';

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();

        Yii::$app->request->enableCsrfValidation = false;

        Yii::setAlias('@here', __DIR__);

        $this->layout = '@here/views/layouts/main';
//        $this->layout = '@here/views/layouts/main_offline';

        date_default_timezone_set('Asia/Bangkok');
    }
}
