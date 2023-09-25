<link rel="stylesheet" href="styles/global.css">
<?php
    require_once("action/indexAction.php");

    $action = new IndexAction();
    $data = $action->execute();
    require_once("partials/header.php");
?>


<script src="scripts/index.js"></script>
<script src="scripts/background.js"></script>

<img src="img/global/cardGame-title.png" alt="cardGame">
<div class="box">
    <p>Entrer votre nom d'usager et mot de passe </p>
    <?php
        if ($data["hasConnectionError"]) {
            ?>
            <div class="error-div"><strong>Erreur : </strong>Connexion erronée</div>
            <?php
        }
    ?>
    <div class="box-content">
        <form method="post" action="index.php">
            <div class="form-line">
                <div class="form-txt" name="user">Nom d'usager: </div>
                <div class="form-input">
                    <input type="text" id="username" name="user">
                </div>
            </div>
            <div class="form-line">
                <div class="form-txt">Mot de passe: </div>
                <div class="form-input">
                    <input type="password" name="password">
                </div>

            </div>
            </div class="form-submit">
            <button id="connect" type="submit" onclick="remberLogInName()">Connection</button>
            </div>
        </form>
    </div>
  

<?php
require_once("partials/background.php");
require_once("partials/footer.php");
