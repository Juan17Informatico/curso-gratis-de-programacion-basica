const selectPlayerPet = ( event ) => {
    alert('Seleccionaste tu mascota')
}

let btnPetPlayer = document.getElementById('btn-pet');

btnPetPlayer.addEventListener('click', selectPlayerPet);