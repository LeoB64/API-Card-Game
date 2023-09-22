window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});

let cardSelected;
let attackerIsSelected;
let targetCard;
let targetIsSelected;
let chatIsOpen = true;

const state = () => {
        fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
            method : "POST",       // l’API (games/state)
            credentials: "include"
        })
    .then(response => response.json())
    .then(data => {
        // contient les cartes/état du jeu.
        if (typeof data !== "object") {
            if (data == "WAITING") {
                updateTextOnGame("WAITING","#Center");
            } else if (data == "LAST_GAME_WON") {
                updateTextOnGame("GAME WON","#Center");
            } else if (data == "LAST_GAME_LOST") {
                updateTextOnGame("GAME LOST","#Center");
            }
        }
        else {
            updateTextOnGame("","#Center");
            updateGame(data);
        }
        setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}

const updateGame = data => {
    updatePlayerSide(data);
    updateEnemySide(data);
}

const updatePlayerSide = data => {
    updateTextOnGame(data.remainingTurnTime, "#PlayerTimer");
    updateTextOnGame(data.hp, "#PlayerHp");
    updateTextOnGame(data.mp, "#PlayerToken");
    updateTextOnGame(data.remainingCardsCount, "#PlayerDeck");
    updateCardsOnGame(data["hand"], data, "#PlayerHand");
    updateCardsOnGame(data["board"], data,"#PlayerBoard");
    updateHeroPower(data ,"#HeroPower");
    updateEndTurn(data,"#endTurn");
}

const updateEnemySide = data => {
    updateTextOnGame(data.opponent.hp, "#EnemyHp");
    updateTextOnGame(data.opponent.remainingCardsCount, "#EnemyDeck");
    updateTextOnGame(data.mp, "#PlayerToken");
    updateTextOnGame(data.opponent.heroClass, "#EnemyPortrait");
    updateEnemyHandOrToken(data.opponent.handSize,"#EnemyHand","topDownCard");
    updateEnemyHandOrToken(data.opponent.mp ,"#EnemyToken", "coin");
    updateCardsOnGame(data.opponent["board"], data ,"#EnemyBoard");
}

const updateHeroPower = (data,board) => {
    if(data["yourTurn"] && !data["heroPowerAlreadyUsed"] && data["mp"] >= 2){
        document.querySelector(board).style.boxShadow = "0px 0px 20px rgb(222, 198, 36)";
    }
    else{
        document.querySelector(board).style.boxShadow = "";
    }
}

const updateEndTurn = (data,board) => {
    if(data["yourTurn"]){
        updateTextOnGame("End Turn", board);
        document.querySelector(board).style.boxShadow = "0px 0px 20px rgb(222, 198, 36)";
    }
    else{
        updateTextOnGame("Opponent Turn", board);
        document.querySelector(board).style.boxShadow = "";
    }
}

const updateTextOnGame = (n, board) => {
    document.querySelector(board).innerText = n;
}

const updateEnemyHandOrToken = (size, position, divClass)=> {
    document.querySelector(position).innerHTML = "";
    for(let i = 0; i < size;i++){
        let div = document.createElement("div");
        div.className = divClass;
        document.querySelector(position).append(div);
    }
}

const updateCardsOnGame = (cards,data,board) => {
    let templateHTML = document.querySelector("#card-template").innerHTML;
    document.querySelector(board).innerHTML = "";
    cards.forEach(element => {
        let div = document.createElement("div");
 
        div.className = "card";
        div.innerHTML = templateHTML;

        div.querySelector(".cost").innerText = element["cost"];
        div.querySelector(".text").innerText = element["mechanics"];
        div.querySelector(".attack").innerText = element["atk"];
        div.querySelector(".hp").innerText = element["hp"];
     
        if(board == "#PlayerHand"){
            div.onclick = () => {
                handAction(element["uid"]);
            }

            if(data["yourTurn"]){
                if(element["cost"] <= data.mp){
                    div.style.boxShadow = "0px 0px 10px rgb(222, 198, 36)";
                }

            }

        } else {    
            if (element["state"] == "SLEEP") {
                div.querySelector(".state").innerText = "Sleeping";
            }
            if (element["mechanics"].indexOf("Taunt") > -1 ) {
                div.style.border = "4px solid rgb(120, 118, 118)";
            }
            if (element["mechanics"].indexOf("Stealth") > -1 ) {
                div.style.opacity = "0.8";
                div.style.boxShadow = "0px 0px 10px rgb(120, 118, 118)";
            }

            if(board == "#PlayerBoard"){
           
                if(data["yourTurn"]){
                    if (element["state"].indexOf("SLEEP") == -1 ) {
                        div.style.boxShadow = "0px 0px 10px red";
                    }
                }

                div.onclick = () => { 
                    if (element["state"] != "SLEEP"){
                        attackerCard = element["uid"];
                        attackerIsSelected = true;
                    } 
                }
            } else if(board == "#EnemyBoard"){
             
                div.onclick = () => { 
                    if (attackerIsSelected) {
                        targetCard = element["uid"];
                        targetIsSelected = true;
                        attack(attackerCard, targetCard);
                    }
                }
            }
        }
        document.querySelector(board).append(div);
    })
}

const handAction = (e) => {
    let formData = new FormData();
    formData.append("type", "PLAY");
    formData.append("uid", e); 

    fetch("ajax-action.php", {
        method : "POST",
        credentials: "include",
        body : formData
    })
    .then(response => response.json())
    .then(data => {
       
        if (typeof data !== "object") {
            updateTextOnGame("Non valide","#Center");
        } 
        else {
             //il faut updater pour ne pas avoir d'erreur avec la console
            updateGame(data);
        }
    })      
}

const playerAction = (key) => {
    let formData = new FormData();
    formData.append("type", key);

    fetch("ajax-action.php", {
        method : "POST",
        credentials : "include", 
        body : formData
    })
    .then(response => response.json()) 
    .then(data => {
        if (typeof data !== "object") {
            updateTextOnGame("Non valide","#Center");
        } 
        else {
            //il faut updater pour ne pas avoir d'erreur avec la console
            updateGame(data);
        }
    })
}

const heroTarget = () => {
    if (attackerIsSelected) {
        attack(attackerCard, 0);
    } 
}

const attack = (attacker, target) => {

    let formData = new FormData();
    formData.append("type", "ATTACK");
    formData.append("uid", attacker);
    formData.append("targetuid", target);
    

    fetch("ajax-action.php", {
        method : "POST",
        credentials: "include",
        body : formData
    })
    .then(response => response.json())
    .then(data => {
        if (typeof data !== "object") {
            updateTextOnGame("Non valide","#Center");
        }
        else {
            updateGame(data);
        }
    })

    attackerCard = null;
    targetCard = null;
    attackerIsSelected = false;
    targetIsSelected = false;
}

const applyStyles = iframe => {
	let styles = {
		fontColor : "#333",
		backgroundColor : "rgba(87, 41, 5, 0.2)",
		fontGoogleName : "Sofia",
		fontSize : "20px",
	}
	
	iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
}

const openCloseChat = () => {
    chatIsOpen = !chatIsOpen;

    if (chatIsOpen) {
        updateTextOnGame("Open Chat", "#OpenCloseChat");
        document.querySelector("#chat").style.display =  "none";
    } else{ 
        updateTextOnGame("Close Chat", "#OpenCloseChat");
        document.querySelector("#chat").style.display =  "block";
    }
}