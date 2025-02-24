let playerAttack, enemyAttack;
const elementalAttacksArray = ["FUEGO", "AGUA", "TIERRA"]

function iniciarJuego() {
    let btnPetPlayer = document.getElementById("btn-pet");
    btnPetPlayer.addEventListener("click", selectPlayerPet);

    const btnFire = document.getElementById('btn-fire');
    btnFire.addEventListener('click', function() {
        elementalAttack('FUEGO');
    });
    const btnWater = document.getElementById('btn-water');
    btnWater.addEventListener('click', function(){
        elementalAttack('AGUA');
    });
    const btnGround = document.getElementById('btn-ground');
    btnGround.addEventListener('click', function(){
        elementalAttack('TIERRA');
    });
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
            return element; // Retorna `true` para detener la iteración
        }
        return false; // Continúa iterando si el elemento no está seleccionado
    });

    // Si ninguna mascota fue seleccionada, muestra una alerta al usuario
    if (!selected) {
        alert("No seleccionaste ninguna mascota!");
    }

    selectEnemyPet();
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

function elementalAttack(type){
    playerAttack = type;
    randomEnemyAttack();
}

function randomEnemyAttack(){
    enemyAttack = elementalAttacksArray[random(0, 2)];
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);