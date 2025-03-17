const apiURL = "http://localhost:8080";
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

let playerId = null;
let pets;
const elementalAttacksArray = ["FUEGO", "AGUA", "TIERRA"];
let optionMokepones;
let playerAttack = [],
    enemyAttack = [];
let livesEnemy = 3,
    livesPlayer = 3;
const mokepones = [];
const mokeponesEnemies = [];
let mokeponesEnemiesArray = [];
let playerPet;
let playerPetObject;
let enemyPetObject;
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
let mapBackground = new Image();
mapBackground.src = "./assets/mokemap.webp";
let heightSearch;
let widthMap = window.innerWidth - 20;
const widthMaxMap = 600;

if (widthMap > widthMaxMap) {
    widthMap = widthMaxMap - 20;
}

heightSearch = (widthMap * 600) / 800;
map.width = widthMap;
map.height = heightSearch;

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

class Mokepon {
    constructor(name, photo, live, photoMap, id = null) {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.live = live;
        this.attacks = [];
        this.width = 80;
        this.height = 80;
        this.x = random(0, map.width - this.width);
        this.y = random(0, map.height - this.height);
        this.mapPhoto = new Image();
        this.mapPhoto.src = photoMap;
        this.speedX = 0;
        this.speedY = 0;
    }

    paintMokepon = () => {
        canvas.drawImage(this.mapPhoto, this.x, this.y, this.width, this.height);
    };
}

dataMokepones.forEach((element) => {
    const mokepon = new Mokepon(element.name, element.photo, element.live, element.photoFace);
    const mokeponEnemy = new Mokepon(element.name, element.photo, element.live, element.photoFace);
    // Crear Array de ataques
    mokepon.attacks = [...element.attacks];
    mokeponEnemy.attacks = [...element.attacks];
    // Agregar al array
    mokeponesEnemies.push(mokeponEnemy);
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

    joinGame();
};

const joinGame = () => {
    fetch(`${apiURL}/join`).then((response) => {
        console.log(response);
        if (response.ok) {
            response.text().then((resFinal) => {
                console.log(resFinal);
                playerId = resFinal;
            });
        }
    });
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

        selectMokeponApi(playerPet);

        sectionSeeMap.style.display = "flex";
        startMap();
        getAttacks(playerPet);
        return;
    }

    alert("No seleccionaste ninguna mascota!");
};

const selectMokeponApi = (playerPetName) => {
    fetch(`${apiURL}/mokepon/${playerId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            mokepon: playerPetName,
        }),
    });
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
    // const randomAttackEnemy = random(0, mokeponesEnemies.length - 1);

    if (enemyPetObject.name) {
        const charToUpperCase = enemyPetObject.name.charAt(0).toUpperCase(); // Convierte la primera letra en mayúscula
        const formattedText = charToUpperCase + enemyPetObject.name.slice(1);
        spanEnemyPet.innerHTML = formattedText;
        enemyMokeponAttack = enemyPetObject.attacks;
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

const getPetPlayerSelected = (arrayMokepones, playerPetName) => {
    return arrayMokepones.find((mokepon) => mokepon.name == playerPetName);
};

const paintCanvas = () => {
    // const { name, photo, x, y, width, height, mapPhoto } = getPlayerSelected();
    playerPetObject.x = playerPetObject.x + playerPetObject.speedX;
    playerPetObject.y = playerPetObject.y + playerPetObject.speedY;
    canvas.clearRect(0, 0, map.width, map.height);
    canvas.drawImage(mapBackground, 0, 0, map.width, map.height);
    playerPetObject.paintMokepon();
    sendPosition(playerPetObject.x, playerPetObject.y);
    mokeponesEnemiesArray.forEach((mokeponEnemy) => {
        enemyPetObject = mokeponEnemy;
        enemyPetObject.paintMokepon();
    })
    // enemyPetObject.paintMokepon();
    if (playerPetObject.speedX !== 0 || playerPetObject.speedY !== 0) {
        // checkCollision(enemyPetObject);
    }
};

const sendPosition = (x, y) => {
    fetch(`${apiURL}/mokepon/${playerId}/position`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            x,
            y,
        }),
    }).then((res) => {
        if (res.ok) {
            res.json().then(({ enemys }) => {
                mokeponesEnemiesArray = enemys.map((enemy) => {
                    let mokeponEnemyOnline = null
                    const mokeponName = enemy.mokepon?.name || "";
                    mokeponEnemyOnline = getPetPlayerSelected(mokeponesEnemies, mokeponName);
                    if(mokeponEnemyOnline){
                        mokeponEnemyOnline.x = enemy.x;
                        mokeponEnemyOnline.y = enemy.y;
                    }
                    return mokeponEnemyOnline;
                });

            });
        }
    });
};

const moveUp = () => {
    playerPetObject.speedY = -5;
};
const moveLeft = () => {
    playerPetObject.speedX = -5;
};
const moveDown = () => {
    playerPetObject.speedY = 5;
};
const moveRight = () => {
    playerPetObject.speedX = 5;
};

const moveStop = () => {
    playerPetObject.speedX = 0;
    playerPetObject.speedY = 0;
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
    playerPetObject = getPetPlayerSelected(mokepones, playerPet);

    // const enemyCharacter = mokeponesEnemies[random(0, mokeponesEnemies.length - 1)];
    // enemyPetObject = getPetPlayerSelected(mokeponesEnemies, enemyCharacter.name);
    interval = setInterval(paintCanvas, 50);
    window.addEventListener("keydown", keyPressed);
    window.addEventListener("keyup", moveStop);
};

const checkCollision = (enemy) => {
    const enemyUp = enemy.y;
    const enemyDown = enemy.y + enemy.height;
    const enemyRight = enemy.x + enemy.width;
    const enemyLeft = enemy.x;

    const petUp = playerPetObject.y;
    const petDown = playerPetObject.y + playerPetObject.height;
    const petRight = playerPetObject.x + playerPetObject.width;
    const petLeft = playerPetObject.x;

    if (petDown < enemyUp || petUp > enemyDown || petRight < enemyLeft || petLeft > enemyRight) {
        return;
    }

    moveStop();
    clearInterval(interval);
    sectionAttackSelect.style.display = "flex";
    sectionSeeMap.style.display = "none";
    selectEnemyPet();
};

console.log(mokepones);

window.addEventListener("load", iniciarJuego);
