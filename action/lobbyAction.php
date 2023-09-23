<?php
    require_once("action/commonAction.php");

    class LobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $key = [];       
            $data = [];  
            $result = []; 
            $key = $_SESSION["key"];   
            $data["key"] = $_SESSION["key"];
            if (!empty($_GET["logout"])) {
             
                $result = parent::callAPI("signout", $data);

                if ($result == "SIGNED_OUT") {
                    session_unset();
                    session_destroy();
                    session_start();
                    header("location:index.php");
                    exit;
                }
            }

            if (!empty($_GET["practice"])) {
                $data["type"] = "TRAINING";
                $result = parent::callAPI("games/auto-match", $data);
                if ($result == "JOINED_TRAINING") {
                    header("location:game.php");
                    exit;
                }
            }

            if (!empty($_GET["play"])) {
                $data["type"] = "PVP";
                $result = parent::callAPI("games/auto-match", $data);
                if ($result == "JOINED_PVP" || $result == "CREATED_PVP") {
                    header("location:game.php");
                    exit;
                } 
            }

          

            return compact ("key");
        }
    }