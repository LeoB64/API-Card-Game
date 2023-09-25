
<link rel="stylesheet" href="styles/game.css">
<script defer src="scripts/game.js"></script>
<?php
    require_once("action/GameAction.php");

    $action = new GameAction();
    $data = $action->execute();
    require_once("partials/header.php");
?>

<div id="EnemyHub">
    <div id="EnemyHand"></div>
    <div id="EnemyFrame"  onclick="heroTarget()">
        <div id="EnemyPortrait"></div>
        <div id="EnemyHp"></div>
    </div>
    <div id="EnemyToken"></div>
    <div id="EnemyDeckContainer">
        <div id="EnemyDeck"class="topDownCard"></div>
    </div>
</div>

<div id="EnemyBoard"></div>
<div id="Center" class="Center"></div>
<div id="PlayerBoard"></div>
<div id="PlayerHub">
    <div id="PlayerFrame">
        <div id="PlayerHp"></div>
        <div id="PlayerTokenDeck">
            <div id="PlayerTokenContainer">
                <div id="PlayerToken"class="coin"></div>
            </div>
            <div id="PlayerDeckContainer"> 
                <div id="PlayerDeck"class="topDownCard"></div>
            </div>

        </div>
    </div>
    <div id="PlayerHand"></div>
    <div id="PlayerActions">
        <div id="PlayerPower">
            <button id="HeroPower" onclick="playerAction('HERO_POWER')">Hero Power</button>
        </div>
        <div id="PlayerOpenCloseChat">
            <button id="OpenCloseChat" onclick="openCloseChat()">Open Chat</button>
        </div>
        <div id="PlayerEndTurn">
            <button id="endTurn" onclick="playerAction('END_TURN')">End Turn</button>
        </div>
      
        <div id="PlayerTimer"></div>
</div>
<div id="chat">    
    <iframe style="width:600px;height:240px;"onload="applyStyles(this)"
    src="https://cardGame.apps-de-cours.com/server/#/chat/<?= $data["key"]?>">
    </iframe>


    <template id="card-template">
        <div class='cost'></div>
        <div class='portrait'></div>
        <div class='text'></div>
        <div class='state'></div>
        <div class='attackHp'>
            <div class='attack'></div>
            <div class='hp'></div>
	</template>
<?php
require_once("partials/footer.php");
