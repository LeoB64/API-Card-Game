<?php
    require_once("action/commonAction.php");

    class AjaxState extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $data = [];
         
            $data["key"] = $_SESSION["key"];
          
            $result = parent::callAPI("games/state", $data);

            return compact("result");
        }
    }