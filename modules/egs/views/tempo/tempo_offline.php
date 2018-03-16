<?php /* @var array $temp */ ?>
<div id="content" class="padding-20">
    <div class="panel panel-default">
        <div class="panel-heading panel-heading-transparent">
            <div class="header">
                <strong>TEMPO</strong>
            </div>
        </div>
        <div class="panel-body">
            <table class="table table-bordered table-vertical-middle nomargin">
                <thead>
                <tr>
                    <th>user_type</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr style="text-align: center">
                    <td>นักศึกษา</td>
                    <td>
                        <a href="<?= Yii::getAlias('@web/egs/tempo/login-offline?type=0') ?>" class="btn btn-success">login</a>
                    </td>
                </tr>
                <tr style="text-align: center">
                    <td>อาจารย์</td>
                    <td>
                        <a href="<?= Yii::getAlias('@web/egs/tempo/login-offline?type=1') ?>" class="btn btn-success">login</a>
                    </td>
                </tr>
                <tr style="text-align: center">
                    <td>แอดมิน</td>
                    <td>
                        <a href="<?= Yii::getAlias('@web/egs/tempo/login-offline?type=2') ?>" class="btn btn-success">login</a>
                    </td>
                </tr>
                <tr style="text-align: center">
                    <td>เจ้าหน้าที่</td>
                    <td>
                        <a href="<?= Yii::getAlias('@web/egs/tempo/login-offline?type=3') ?>" class="btn btn-success">login</a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>