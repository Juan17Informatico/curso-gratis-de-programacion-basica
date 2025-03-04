const elementalAttacksArray = ["FUEGO", "AGUA", "TIERRA"];
let playerAttack, enemyAttack;
let livesEnemy = 3,
    livesPlayer = 3;

function iniciarJuego() {
    const sectionAttackSelect = document.getElementById('attack-select');
    sectionAttackSelect.style.display = 'none';
    const sectionReset = document.getElementById('reset');
    sectionReset.style.display = 'none';
    
    const btnPetPlayer = document.getElementById("btn-pet");
    btnPetPlayer.addEventListener("click", selectPlayerPet);

    const btnFire = document.getElementById("btn-fire");
    btnFire.addEventListener("click", function () {
        elementalAttack("FUEGO");
    });
    const btnWater = document.getElementById("btn-water");
    btnWater.addEventListener("click", function () {
        elementalAttack("AGUA");
    });
    const btnGround = document.getElementById("btn-ground");
    btnGround.addEventListener("click", function () {
        elementalAttack("TIERRA");
    });

    const botonReiniciar = document.getElementById('btn-reset');
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function selectPlayerPet() {
    // Selecciona todos los elementos con la clase "pets" (radio buttons)
    const pets = document.querySelectorAll(".pets");
    const spanPlayerPet = document.getElementById("pet-player");

    const selected = [...pets].find((element) => {
        if (element.checked) {
            // Verifica si el elemento está seleccionado
            const charToUpperCase = element.value.charAt(0).toUpperCase(); // Convierte la primera letra en mayúscula
            const formattedText = charToUpperCase + element.value.slice(1);
            spanPlayerPet.innerHTML = formattedText;
            return element; // Retorna el elemento que coincida con la condición
        }
        return false; // Continúa iterando si el elemento no está seleccionado
    });

    // Si la mascota fue seleccionada, muestra la siguiente sección
    if (selected) {
        // Mostrar siguiente sección y esconder la selección de personajes
        const sectionPetPlayerSelect = document.getElementById('character-select');
        sectionPetPlayerSelect.style.display = 'none';
        const sectionAttackSelect = document.getElementById('attack-select');
        sectionAttackSelect.style.display = 'flex';

        selectEnemyPet();
        return;
    }

    alert("No seleccionaste ninguna mascota!");

}

function selectEnemyPet() {
    const pets = document.querySelectorAll(".pets");
    const petsArray = [...pets];
    const randomAttackEnemy = random(0, petsArray.length - 1);
    const spanEnemyPet = document.getElementById("pet-enemy");

    if (petsArray[randomAttackEnemy]) {
        const charToUpperCase = petsArray[randomAttackEnemy].value.charAt(0).toUpperCase(); // Convierte la primera letra en mayúscula
        const formattedText = charToUpperCase + petsArray[randomAttackEnemy].value.slice(1);
        spanEnemyPet.innerHTML = formattedText;
    }
}

function elementalAttack(type) {
    playerAttack = type;
    elementalRandomEnemyAttack();
}

function elementalRandomEnemyAttack() {
    const attackRandomEnemy = random(0, 2);
    enemyAttack = elementalAttacksArray[attackRandomEnemy];

    fight();
}

function fight() {
    const spanPlayerLives = document.getElementById("lives-player");
    const spanEnemyLives = document.getElementById("lives-enemy");

    let attackMessage = `Tu mascota atacó con ${playerAttack}, las mascota del enemigo atacó con ${enemyAttack}`;

    if (enemyAttack == playerAttack) {
        createMessage(`${attackMessage} - Empate`);
    } else if (playerAttack == "FUEGO" && enemyAttack == "TIERRA") {
        createMessage(`${attackMessage} - Ganaste`);
        livesEnemy--;
        spanEnemyLives.innerHTML = livesEnemy;
    } else if (playerAttack == "AGUA" && enemyAttack == "FUEGO") {
        createMessage(`${attackMessage} - Ganaste`);
        livesEnemy--;
        spanEnemyLives.innerHTML = livesEnemy;
    } else if (playerAttack == "TIERRA" && enemyAttack == "AGUA") {
        createMessage(`${attackMessage} - Ganaste`);
        livesEnemy--;
        spanEnemyLives.innerHTML = livesEnemy;
    } else {
        createMessage(`${attackMessage} - Perdiste`);
        livesPlayer--;
        spanPlayerLives.innerHTML = livesPlayer;
    }

    checkLives();
}

function checkLives() {
    if (livesEnemy == 0) {
        createMessage("FELICITACIONES GANASTE 🎆", true);
    } else if (livesPlayer == 0) {
        createMessage("PERDISTE POR MALO 😢", true);
    }
}

function createMessage(result, disabledGame = false) {
    const sectionMessages = document.getElementById("result");
    const playerAttackDiv = document.getElementById("player-attack");
    const enemyAttackDiv = document.getElementById("enemy-attack");
    
    const newPlayerAttackParagraph = document.createElement("p");
    const newEnemyAttackParagraph = document.createElement("p");

    sectionMessages.innerHTML = result;
    newPlayerAttackParagraph.innerHTML = playerAttack;
    newEnemyAttackParagraph.innerHTML = enemyAttack;

    playerAttackDiv.appendChild(newPlayerAttackParagraph);
    enemyAttackDiv.appendChild(newEnemyAttackParagraph);

    if(disabledGame){
        const btnFire = document.getElementById("btn-fire");
        btnFire.disabled = true;
        const btnWater = document.getElementById("btn-water");
        btnWater.disabled = true;
        const btnGround = document.getElementById("btn-ground");
        btnGround.disabled = true;
        // Habilitar botón para reiniciar juego
        const sectionReset = document.getElementById('reset');
        sectionReset.style.display = 'block';
    }

}

function reiniciarJuego(){
    location.reload();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
