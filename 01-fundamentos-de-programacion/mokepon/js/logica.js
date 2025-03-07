const sectionAttackSelect = document.getElementById("attack-select");
const sectionReset = document.getElementById("reset");
const btnPetPlayer = document.getElementById("btn-pet");
const botonReiniciar = document.getElementById("btn-reset");
const cardsContainer = document.getElementById("cards");

// Selecciona todos los elementos con la clase "pets" (radio buttons)
const spanPlayerPet = document.getElementById("pet-player");
const sectionPetPlayerSelect = document.getElementById("character-select");

const spanEnemyPet = document.getElementById("pet-enemy");

const spanPlayerLives = document.getElementById("lives-player");
const spanEnemyLives = document.getElementById("lives-enemy");

const sectionMessages = document.getElementById("result");
const playerAttackDiv = document.getElementById("player-attack");
const enemyAttackDiv = document.getElementById("enemy-attack");

const btnAttacksContainerId = document.getElementById("btn-attacks-container-id");

let pets;
const elementalAttacksArray = ["FUEGO", "AGUA", "TIERRA"];
let optionMokepones;
let playerAttack, enemyAttack;
let livesEnemy = 3,
    livesPlayer = 3;
const mokepones = [];
let playerPet;
let btnFire;
let btnWater;
let btnGround;

class Mokepon {
    constructor(name, photo, live) {
        this.name = name;
        this.photo = photo;
        this.live = live;
        this.attacks = [];
    }
}

dataMokepones.forEach((element) => {
    const mokepon = new Mokepon(element.name, element.photo, element.live);
    mokepon.attacks = [...element.attacks];
    mokepones.push(mokepon);
});

const iniciarJuego = () => {
    sectionAttackSelect.style.display = "none";
    sectionReset.style.display = "none";

    mokepones.forEach((mokepon) => {
        const charToUpperCase = mokepon.name.charAt(0).toUpperCase(); // Convierte la primera letra en mayúscula
        const formattedText = charToUpperCase + mokepon.name.slice(1);
        optionMokepones = `
            <input type="radio" name="pets" id=${mokepon.name} class="pets" value=${mokepon.name} />
            <label class="mokepon-card" for=${mokepon.name}>
                <p>${formattedText}</p>
                <img src=${mokepon.photo} alt=${mokepon.name} />
            </label><br />
        `;
        cardsContainer.innerHTML += optionMokepones;
    });

    pets = document.querySelectorAll(".pets");

    btnPetPlayer.addEventListener("click", selectPlayerPet);
    botonReiniciar.addEventListener("click", reiniciarJuego);
};

const selectPlayerPet = () => {
    const selected = [...pets].find((element) => {
        if (element.checked) {
            // Verifica si el elemento está seleccionado
            const charToUpperCase = element.value.charAt(0).toUpperCase(); // Convierte la primera letra en mayúscula
            const formattedText = charToUpperCase + element.value.slice(1);
            spanPlayerPet.innerHTML = formattedText;
            playerPet = element.value;
            return element; // Retorna el elemento que coincida con la condición
        }
        return false; // Continúa iterando si el elemento no está seleccionado
    });

    // Si la mascota fue seleccionada, muestra la siguiente sección
    if (selected) {
        // Mostrar siguiente sección y esconder la selección de personajes
        sectionPetPlayerSelect.style.display = "none";
        sectionAttackSelect.style.display = "flex";
        getAttacks(playerPet);
        selectEnemyPet();
        return;
    }

    alert("No seleccionaste ninguna mascota!");
};

const getAttacks = (playerPetString) => {
    let attacks;
    for (let i = 0; i < mokepones.length; i++) {
        if (playerPetString === mokepones[i].name) {
            attacks = mokepones[i].attacks;
        }
    }
    showAttacks(attacks);
};

const showAttacks = (arrayAttacks) => {
    arrayAttacks.forEach((attack) => {
        btnAttacksContainerId.innerHTML += `<button class="btn-attack" id=${attack.id}>${attack.name}</button>`;
    });

    btnFire = document.getElementById("btn-fire");
    btnWater = document.getElementById("btn-water");
    btnGround = document.getElementById("btn-ground");

    btnFire.addEventListener("click", function () {
        elementalAttack("FUEGO");
    });
    btnWater.addEventListener("click", function () {
        elementalAttack("AGUA");
    });
    btnGround.addEventListener("click", function () {
        elementalAttack("TIERRA");
    });
};

const selectEnemyPet = () => {
    const petsArray = [...pets];
    const randomAttackEnemy = random(0, petsArray.length - 1);

    if (petsArray[randomAttackEnemy]) {
        const charToUpperCase = petsArray[randomAttackEnemy].value.charAt(0).toUpperCase(); // Convierte la primera letra en mayúscula
        const formattedText = charToUpperCase + petsArray[randomAttackEnemy].value.slice(1);
        spanEnemyPet.innerHTML = formattedText;
    }
};

const elementalAttack = (type) => {
    playerAttack = type;
    elementalRandomEnemyAttack();
};

const elementalRandomEnemyAttack = () => {
    const attackRandomEnemy = random(0, 2);
    enemyAttack = elementalAttacksArray[attackRandomEnemy];

    fight();
};

const fight = () => {
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
};

const checkLives = () => {
    if (livesEnemy == 0) {
        createMessage("FELICITACIONES GANASTE 🎆", true);
    } else if (livesPlayer == 0) {
        createMessage("PERDISTE POR MALO 😢", true);
    }
};

const createMessage = (result, disabledGame = false) => {
    const newPlayerAttackParagraph = document.createElement("p");
    const newEnemyAttackParagraph = document.createElement("p");

    sectionMessages.innerHTML = result;
    newPlayerAttackParagraph.innerHTML = playerAttack;
    newEnemyAttackParagraph.innerHTML = enemyAttack;

    playerAttackDiv.appendChild(newPlayerAttackParagraph);
    enemyAttackDiv.appendChild(newEnemyAttackParagraph);

    if (disabledGame) {
        btnFire.disabled = true;
        btnWater.disabled = true;
        btnGround.disabled = true;
        // Habilitar botón para reiniciar juego
        sectionReset.style.display = "block";
    }
};

const reiniciarJuego = () => {
    location.reload();
};

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

window.addEventListener("load", iniciarJuego);
