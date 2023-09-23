<?php
    require_once("action/ajaxAction.php");

    $action = new AjaxAction();
    $data = $action->execute();

    echo json_encode($data["result"]);