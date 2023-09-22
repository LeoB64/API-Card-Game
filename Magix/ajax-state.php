<?php
    require_once("action/ajaxState.php");

    $action = new AjaxState();
    $data = $action->execute();

    echo json_encode($data["result"]);