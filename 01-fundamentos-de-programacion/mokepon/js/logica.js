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

const sectionSeeMap = document.getElementById("see-map");
const map = document.getElementById("map");

let pets;
const elementalAttacksArray = ["FUEGO", "AGUA", "TIERRA"];
let optionMokepones;
let playerAttack = [],
    enemyAttack = [];
let livesEnemy = 3,
    livesPlayer = 3;
const mokepones = [];
let playerPet;
let btnFire;
let btnWater;
let btnGround;
let buttons;
let playerVictory = 0,
    enemyVictory = 0;
let indexPlayerAttack, indexEnemyAttack;
let playerAttackTextContent = [];
let enemyMokeponAttack = [];
let canvas = map.getContext("2d");
let interval;

class Mokepon {
    constructor(name, photo, live) {
        this.name = name;
        this.photo = photo;
        this.live = live;
        this.attacks = [];
        this.x = 20;
        this.y = 30;
        this.width = 80;
        this.height = 80;
        this.mapPhoto = new Image();
        this.mapPhoto.src = photo;
        this.speedX = 0;
        this.speedY = 0;
    }
}

const capipepo = new Mokepon(
    "capipepo",
    "http://127.0.0.1:5500/01-fundamentos-de-programacion/mokepon/assets/capipepo.png",
    3
);

capipepo.attacks = [
    {
        id: "btn-ground",
        name: "🌱",
    },
    {
        id: "btn-ground",
        name: "🌱",
    },
    {
        id: "btn-ground",
        name: "🌱",
    },
    {
        id: "btn-water",
        name: "💧",
    },
    {
        id: "btn-fire",
        name: "🔥",
    },
];

dataMokepones.forEach((element) => {
    const mokepon = new Mokepon(element.name, element.photo, element.live);
    mokepon.attacks = [...element.attacks];
    mokepones.push(mokepon);
});

const iniciarJuego = () => {
    sectionAttackSelect.style.display = "none";
    sectionReset.style.display = "none";
    sectionSeeMap.style.display = "none";

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
        // sectionAttackSelect.style.display = "flex";
        sectionSeeMap.style.display = "flex";
        startMap();

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
        btnAttacksContainerId.innerHTML += `<button class="btn-attack bAttack" id=${attack.id}>${attack.name}</button>`;
    });

    btnFire = document.getElementById("btn-fire");
    btnWater = document.getElementById("btn-water");
    btnGround = document.getElementById("btn-ground");
    buttons = document.querySelectorAll(".bAttack");
};

const attackSequence = () => {
    buttons.forEach((button) => {
        button.addEventListener("click", ({ target }) => {
            if (target.textContent === "🔥") {
                playerAttack.push("FUEGO");
                console.log(playerAttack);
                button.style.background = "#112f58";
                button.disabled = true;
            } else if (target.textContent === "💧") {
                playerAttack.push("AGUA");
                console.log(playerAttack);
                button.style.background = "#112f58";
                button.disabled = true;
            } else {
                playerAttack.push("TIERRA");
                console.log(playerAttack);
                button.style.background = "#112f58";
                button.disabled = true;
            }
            elementalRandomEnemyAttack();
        });
    });
};

const selectEnemyPet = () => {
    // const petsArray = [...pets];
    const randomAttackEnemy = random(0, mokepones.length - 1);

    if (mokepones[randomAttackEnemy]) {
        const charToUpperCase = mokepones[randomAttackEnemy].name.charAt(0).toUpperCase(); // Convierte la primera letra en mayúscula
        const formattedText = charToUpperCase + mokepones[randomAttackEnemy].name.slice(1);
        spanEnemyPet.innerHTML = formattedText;
        enemyMokeponAttack = mokepones[randomAttackEnemy].attacks;
        attackSequence();
    }
};

const elementalRandomEnemyAttack = () => {
    const attackRandomEnemy = random(0, enemyMokeponAttack.length - 1);

    if (enemyMokeponAttack[attackRandomEnemy].name === "🔥") {
        enemyAttack.push("FUEGO");
    } else if (enemyMokeponAttack[attackRandomEnemy].name === "💧") {
        enemyAttack.push("AGUA");
    } else {
        enemyAttack.push("TIERRA");
    }

    console.log(enemyAttack);

    startFight();
};

const startFight = () => {
    if (playerAttack.length === 5) {
        fight();
    }
};

const indexBothOpponents = (playerAttackNumber, enemyAttackNumber) => {
    indexPlayerAttack = playerAttack[playerAttackNumber];
    indexEnemyAttack = enemyAttack[enemyAttackNumber];
};

const fight = () => {
    for (let i = 0; i < playerAttack.length; i++) {
        let attackMessage = `Tu mascota atacó con ${playerAttack[i]}, las mascota del enemigo atacó con ${enemyAttack[i]}`;
        if (playerAttack[i] === enemyAttack[i]) {
            indexBothOpponents(i, i);
            createMessage(`${attackMessage} - Empate`);
        } else if (playerAttack[i] == "FUEGO" && enemyAttack[i] == "TIERRA") {
            playerVictory++;
            spanPlayerLives.innerHTML = playerVictory;
            indexBothOpponents(i, i);
            createMessage(`${attackMessage} - Ganaste`);
        } else if (playerAttack[i] == "AGUA" && enemyAttack[i] == "FUEGO") {
            playerVictory++;
            spanPlayerLives.innerHTML = playerVictory;
            indexBothOpponents(i, i);
            createMessage(`${attackMessage} - Ganaste`);
        } else if (playerAttack[i] == "TIERRA" && enemyAttack[i] == "AGUA") {
            playerVictory++;
            spanPlayerLives.innerHTML = playerVictory;
            indexBothOpponents(i, i);
            createMessage(`${attackMessage} - Ganaste`);
        } else {
            enemyVictory++;
            spanEnemyLives.innerHTML = enemyVictory;
            indexBothOpponents(i, i);
            createMessage(`${attackMessage} - Perdiste`);
        }
    }
    checkLives();
};

const checkLives = () => {
    if (playerVictory === enemyVictory) {
        createMessage("ESTO FUE UN EMPATE!! 🕊", true);
    } else if (playerVictory > enemyVictory) {
        createMessage("FELICITACIONES GANASTE 🎆", true);
    } else {
        createMessage("PERDISTE POR MALO 😢", true);
    }
};

const createMessage = (result, disabledGame = false) => {
    const newPlayerAttackParagraph = document.createElement("p");
    const newEnemyAttackParagraph = document.createElement("p");

    sectionMessages.innerHTML = result;
    newPlayerAttackParagraph.innerHTML = indexPlayerAttack;
    newEnemyAttackParagraph.innerHTML = indexEnemyAttack;

    playerAttackDiv.appendChild(newPlayerAttackParagraph);
    enemyAttackDiv.appendChild(newEnemyAttackParagraph);

    if (disabledGame) {
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

const getPlayerSelected = () => {
    console.log(selectPlayerPet);

    return mokepones.find((mokepon) => mokepon.name == selectPlayerPet);
};

const paintCharacter = () => {
    // const { name, photo, x, y, width, height, mapPhoto } = getPlayerSelected();
    capipepo.x = capipepo.x + capipepo.speedX;
    capipepo.y = capipepo.y + capipepo.speedY;
    canvas.clearRect(0, 0, map.width, map.height);
    canvas.drawImage(capipepo.mapPhoto, capipepo.x, capipepo.y, capipepo.width, capipepo.height);
};

const moveUp = () => {
    capipepo.speedY = -5;
    paintCharacter();
};
const moveLeft = () => {
    capipepo.speedX = -5;
    paintCharacter();
};
const moveDown = () => {
    capipepo.speedY = 5;
    paintCharacter();
};
const moveRight = () => {
    capipepo.speedX = 5;
    paintCharacter();
};

const moveStop = () => {
    capipepo.speedX = 0;
    capipepo.speedY = 0;
};

const keyPressed = (event) => {
    switch (event.key) {
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowRight":
            moveRight();
            break;
        default:
            break;
    }
};

const startMap = () => {
    interval = setInterval(paintCharacter, 50);
    window.addEventListener("keydown", keyPressed);
    window.addEventListener("keyup", moveStop);
};

console.log(mokepones);

window.addEventListener("load", iniciarJuego);
