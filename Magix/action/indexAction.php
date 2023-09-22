<?php
    require_once("action/commonAction.php");

    class IndexAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            
            $hasConnectionError = false;
            $data = [];
            $key = [];
            $result = [];
            if (isset($_POST["user"])) {
                $data["username"] = $_POST["user"];
                $data["password"] = $_POST["password"];
                $result = parent::callAPI("signin", $data);

                if ($result == "INVALID_USERNAME_PASSWORD") {
                    $hasConnectionError = true;
                }
                else {
                    $key = $result->key;
                    $_SESSION["key"] = $key;
                    $_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;
                    $hasConnectionError = false;
                    header("location:lobby.php");
                    exit;
                }
            }

            return compact ("hasConnectionError");
        }
    }