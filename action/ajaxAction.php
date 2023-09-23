<?php
    require_once("action/commonAction.php");

    class AjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $data = [];
            $data["key"] = $_SESSION["key"];
            if($_POST['type'] == "HERO_POWER" || $_POST['type'] == "END_TURN"){
                $data["type"] = $_POST['type'];
                $result = parent::callAPI("games/action", $data);
            }
            else if($_POST['type'] == "PLAY"){
                $data["type"] = $_POST['type'];
                $data["uid"] = $_POST['uid'];
                $result = parent::callAPI("games/action", $data);
            }   else if($_POST['type'] == "ATTACK"){
                $data["type"] = $_POST['type'];
                $data["uid"] = $_POST['uid'];
                $data["targetuid"] = $_POST['targetuid'];
                $result = parent::callAPI("games/action", $data);
            }

            return compact("result");
        }
    }