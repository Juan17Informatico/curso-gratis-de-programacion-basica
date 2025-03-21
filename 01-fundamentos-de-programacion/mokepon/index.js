const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

const players = [];

class Player {
    constructor(id){
        this.id = id;
    }

    assignMokepon(mokepon) {
        this.mokepon = mokepon;
    }

    updatePosition( x, y) {
        this.x = x;
        this.y = y;
    }

    assignAttacks(attacks) {
        this.attacks = attacks;
    }
}

class Mokepon {
    constructor ( name ) {
        this.name = name;
    }
}

app.get('/join', ( req, res ) => {
    const id = `${Math.random()}`;

    const player = new Player(id);

    players.push(player);

    res.send(id);
});

app.post("/mokepon/:playerId", ( req, res ) => {

    const playerId = req.params.playerId || "";
    const nameMokepon = req.body.mokepon || "";
    const mokepon = new Mokepon(nameMokepon);

    const playerIndex = players.findIndex((player) => player.id === playerId );

    if(playerIndex >= 0){
        players[playerIndex].assignMokepon(mokepon);
    }

    console.log(players);
    console.log(playerId);

    res.end();

});

app.post("/mokepon/:playerId/position", ( req, res ) => {

    const playerId = req.params.playerId || "";
    const x = req.body.x || 0;
    const y = req.body.y || 0;

    const playerIndex = players.findIndex((player) => player.id === playerId );

    if(playerIndex >= 0){
        players[playerIndex].updatePosition(x, y);
    }

    const enemys = players.filter( player =>  playerId !== player.id );

    res.send({
        enemys
    });

});

app.post("/mokepon/:playerId/attacks", ( req, res ) => {

    const playerId = req.params.playerId || "";
    const attacks = req.body.attacks || "";

    const playerIndex = players.findIndex((player) => player.id === playerId );

    if(playerIndex >= 0){
        players[playerIndex].assignAttacks(attacks);
    }

    res.end();

});

app.get("/mokepon/:playerId/attacks", ( req, res ) => {

    const playerId = req.params.playerId || "";

    const player = players.find((player) => player.id === playerId );

    res.send({
        attacks: player.attacks || []
    });

});

app.listen(8080, () => {
    console.log("Servidor Funcionando");
});