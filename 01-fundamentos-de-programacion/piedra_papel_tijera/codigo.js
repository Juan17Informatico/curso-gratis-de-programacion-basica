function aleatorio(min,max) {
    return Math.floor(Math.random() *(max - min + 1) + min);
}

function eleccion( jugada ) {
    if ( jugada == 1 ) {
        return "Piedra 🥌";
    } else if ( jugada == 2 ) {
        return "Papel 📄";
    } else if ( jugada == 3 ) {
        return "Tijera ✂";
    } else {
        return "Error";
    }
}

// 1 es piedra, 2 es papel, 3 es tijera

let conteoJugador1 = 0;
let conteoPc = 0;

while (!(conteoJugador1 < 3) || (conteoPc <= 3)) {
    let pc = aleatorio(1,3);
    let jugador = prompt("Elige: 1 para piedra, 2 para papel, 3 para tijera");

    alert("PC elige: " + eleccion(pc));
    alert("Jugador elige: " + eleccion(jugador));
    // COMBATE
    if(conteoJugador1 > conteoPc && conteoJugador1 === 3){
        alert("GANASTE EL JUEGO")
        break;
    }else if (conteoPc > conteoJugador1 && conteoPc === 3) {
        alert("PERDISTE EL JUEGO");
        break;
    } else {
        if ( pc == jugador ) {
            alert("Empate");
        } else if ( jugador == 1 && pc == 3 ){
            conteoJugador1++;
            alert("Ganaste");
        } else if ( jugador == 2 && pc == 1) {
            conteoJugador1++;
            alert("Ganaste");
        } else if ( jugador == 3 && pc == 2 ) {
            conteoJugador1++;
            alert("Ganaste");
        } else {
            conteoPc++;
            alert("Perdiste");
        }
    }
}

alert("Ganaste " + conteoJugador1 + " veces. Perdiste: " + conteoPc)