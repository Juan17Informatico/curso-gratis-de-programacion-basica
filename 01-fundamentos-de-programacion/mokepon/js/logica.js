function iniciarJuego (){
    let btnPetPlayer = document.getElementById('btn-pet');
    btnPetPlayer.addEventListener('click', selectPlayerPet);
}

const selectPlayerPet = () => {
    // Selecciona todos los elementos con la clase "pets" (radio buttons)
    const pets = document.querySelectorAll('.pets');
    console.log({ pets }); // Muestra en la consola el NodeList de mascotas encontradas

    /**
     * Convierte el NodeList en un array y usa el método `.some()` para recorrer los elementos.
     * `.some()` detiene la iteración cuando encuentra un elemento que cumple la condición.
     * Si algún elemento tiene `checked` en `true`, muestra una alerta con su nombre formateado.
     */
    const selected = [...pets].some(element => {
        if (element.checked) { // Verifica si el elemento está seleccionado
            const charToUpperCase = element.value.charAt(0).toUpperCase(); // Convierte la primera letra en mayúscula
            alert(`Seleccionaste a: ${charToUpperCase + element.value.slice(1)}`); // Muestra el mensaje con el nombre formateado
            return true; // Retorna `true` para detener la iteración
        }
        return false; // Continúa iterando si el elemento no está seleccionado
    });

    // Si ninguna mascota fue seleccionada, muestra una alerta al usuario
    if (!selected) {
        alert('No seleccionaste ninguna mascota!');
    }
};


window.addEventListener('load', iniciarJuego);