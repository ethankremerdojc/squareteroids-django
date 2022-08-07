import {Player} from "./assets/sprites/player.js";
import { Game } from "./assets/game.js";
import { Enemy } from "./assets/sprites/enemy.js";
import { Timer } from "./assets/ui/timer.js";
import { Config } from "./utils/config.js";
import { Stats } from "./assets/ui/stats.js";
import * as utils from "./utils/utils.js";

const getNewEnemy = (speedFactor) => {

    const colors = [
        "red",
        "green",
        "blue",
        "yellow"
    ]

    var enemy = new Enemy(
        utils.randWholeNum(70) + 16,
        utils.randItem(colors)
        );

    var randPos = enemy.getRandomPointOnEdgeOfScreen(pageDimensions);
    enemy.obj = enemy.getDocObject(randPos.left, randPos.top);

    var closerToLeft = randPos.left < pageDimensions.width / 2;
    var closerToTop = randPos.top < pageDimensions.height / 2;

    var xFactor = null,
        yFactor = null;

    if (closerToLeft) {
        xFactor = 1;
    } else {
        xFactor = -1;
    }
    if (closerToTop) {
        yFactor = 1;
    } else {
        yFactor = -1;
    }

    var velX = (utils.randWholeNum(6) + 3) * xFactor * speedFactor;
    var velY = (utils.randWholeNum(6) + 3) * yFactor * speedFactor;

    enemy.setVelocities(velX, velY);
    return enemy
}

function runGame(pageDimensions) {
    // FIELD
    const game = new Game();
    game.obj = game.getDocObject();
    document.body.append(game.obj);
    
    const config = new Config(20, 0.06, 1);
    game.config = config;
    
    const timer = new Timer();
    game.timer = timer;
    
    // STATS
    const stats = new Stats(game.config)
    game.stats = stats;
    
    // PLAYER
    const player = new Player();
    player.obj = player.getDocObject(pageDimensions);
    game.obj.append(player.obj);
    
    player.followMouse();
    game.player = player;
    
    // ENEMIES
    for (var i = 0; i < 3; i++) {
        var e = getNewEnemy(config.enemySpeed);
        game.sprites.push(e);
    }
    
    game.placeObjects()
    
    game.timer.reset();
    game.timer.start();
    
    var startButton = document.getElementById("startGame");
    startButton.style.visibility = "hidden";
    
    gameRunning = true;
    update(game)
}

const sendPostData = (data) => {
    fetch("post", {
        method: "POST",
        headers: {'Content-Type': 'application/json', 'X-CSRFToken': csrftoken}, 
        body: JSON.stringify(data)
    }).then(res => {
        console.log("Request complete! response:", res);
    }).catch((error) => {
        console.log("error: ", error)
    });
}

const handleDeath = (game) => {
        
    var deathSound = new Audio("static/sounds/dead.mp3")
    deathSound.play();

    sendPostData({'username': game.player.username, 'time': game.timer.object.innerHTML})

    game.timer.stop();
    game.player.obj.style.visibility = "hidden";

    setTimeout(() => {
        document.getElementById("game").remove();

        var startButton = document.getElementById("startGame");
        startButton.style.visibility = "visible";
    }, 3000);
}

const update = (game) => {
    var livingSprites = [];

    game.stats.update(game.config)
    game.config.update()

    if (!gameRunning) {
        handleDeath(game)
        console.log("User resized...")
        return
    }

    if (game.config.enemySpawnFactor > Math.random()) {
        var e = getNewEnemy(game.config.enemySpeed);
        game.sprites.push(e);
        game.placeObject(e.obj);
    }

    for (var i = 0; i < game.sprites.length; i++) {
        var sprite = game.sprites[i];
        sprite.move();

        if (!sprite.isOutOfBounds(pageDimensions)) {
            livingSprites.push(sprite)
        } else {
            sprite.obj.remove()
        }

        if (sprite.collidesWith(game.player)) {
            handleDeath(game)
            return
        }
    }

    game.sprites = livingSprites;
    setTimeout(() => {update(game)}, game.config.tickSpeed);
}

function placeStartButton() {
    var startButton = document.getElementById("startGame");
    startButton.style.top = pageDimensions.height / 2;
    startButton.style.left = pageDimensions.width / 2;
    startButton.style.visibility = "visible";

    startButton.onclick = () => {
        playSong()
        runGame(pageDimensions)
    }
}

const playSong = () => {
    if (!songPlaying) {
        var song = new Audio("static/sounds/wash-away.mp3");
        song.loop = true;
        song.play()
        songPlaying = true;
    }
}

window.onresize = () => {
    pageDimensions = utils.getPageDimensions();
    placeStartButton();
    gameRunning = false;
}
const csrftoken = utils.getCookie('csrftoken');

var pageDimensions = utils.getPageDimensions();
var gameRunning = false;
var songPlaying = false;

placeStartButton();