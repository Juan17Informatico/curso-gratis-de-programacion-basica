function iniciarJuego (){
    let btnPetPlayer = document.getElementById('btn-pet');
    btnPetPlayer.addEventListener('click', selectPlayerPet);
}

const selectPlayerPet = () => {
    // Selecciona todos los elementos con la clase "pets" (radio buttons)
    const pets = document.querySelectorAll('.pets');
    
    const spanMascotaJugador = document.getElementById('pet-player');

    const selected = [...pets].find(element => {
        if (element.checked) { // Verifica si el elemento está seleccionado
            const charToUpperCase = element.value.charAt(0).toUpperCase(); // Convierte la primera letra en mayúscula
            const formattedText = charToUpperCase + element.value.slice(1);
            spanMascotaJugador.innerHTML = formattedText;
            return element; // Retorna `true` para detener la iteración
        }
        return false; // Continúa iterando si el elemento no está seleccionado
    });

    console.log({selected});

    // Si ninguna mascota fue seleccionada, muestra una alerta al usuario
    if (!selected) {
        alert('No seleccionaste ninguna mascota!');
    }
};


window.addEventListener('load', iniciarJuego);