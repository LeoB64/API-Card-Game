<link rel="stylesheet" href="styles/global.css">

<?php
    require_once("action/LobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();
    require_once("partials/header.php");
?>

<script src="scripts/lobby.js"></script>
<script src="scripts/background.js"></script>

<img src="img/global/magix-title.png" alt="Magix">
<div class="box">
    <p>Choisir une option</p>
    <div class="box-content">
        <div>
        <button onclick="window.location.href='?practice=true'" id="practice" name="practice" type="submit">Pratique</button>
        </div>
        <div>
        <button onclick="window.location.href='?play=true'" id="play" type="submit">Jouer</button>
        </div>
   
        <div>
        <button onclick="window.location.href='?logout=true'" id="quit"  type="submit">Quitter</button>
        </div>
    </div>
</div>
<div class="chat">
    <iframe style="width:600px;height:240px;"onload="applyStyles(this)"
        src="https://magix.apps-de-cours.com/server/#/chat/<?= $data["key"]?>">
    </iframe>
</div>
<div id="boxCanvas">   
    <canvas id="canvas" width="500" height="300">
                Not gonna happen...
    </canvas>
</div>

<?php
require_once("partials/background.php");
require_once("partials/footer.php");
 
