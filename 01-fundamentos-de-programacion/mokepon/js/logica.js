function iniciarJuego (){
    let btnPetPlayer = document.getElementById('btn-pet');
    btnPetPlayer.addEventListener('click', selectPlayerPet);
}

function random(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function selectPlayerPet() {
    // Selecciona todos los elementos con la clase "pets" (radio buttons)
    const pets = document.querySelectorAll('.pets');
    
    const spanPlayerPet = document.getElementById('pet-player');

    const selected = [...pets].find(element => {
        if (element.checked) { // Verifica si el elemento está seleccionado
            const charToUpperCase = element.value.charAt(0).toUpperCase(); // Convierte la primera letra en mayúscula
            const formattedText = charToUpperCase + element.value.slice(1);
            spanPlayerPet.innerHTML = formattedText;
            return element; // Retorna `true` para detener la iteración
        }
        return false; // Continúa iterando si el elemento no está seleccionado
    });

    console.log({selected});

    // Si ninguna mascota fue seleccionada, muestra una alerta al usuario
    if (!selected) {
        alert('No seleccionaste ninguna mascota!');
    }

    selectEnemyPet();
};

function selectEnemyPet(){

    const pets = document.querySelectorAll('.pets');
    const petsArray = [...pets]
    const randomAttack = random( 0, petsArray.length - 1);
    const spanEnemyPet = document.getElementById('pet-enemy');

    if(petsArray[randomAttack]){
        const charToUpperCase = petsArray[randomAttack].value.charAt(0).toUpperCase(); // Convierte la primera letra en mayúscula
        const formattedText = charToUpperCase + petsArray[randomAttack].value.slice(1);
        spanEnemyPet.innerHTML = formattedText;
    }

}


window.addEventListener('load', iniciarJuego);