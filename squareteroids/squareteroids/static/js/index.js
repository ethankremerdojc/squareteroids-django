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
    
    const config = new Config(difficulties, selectedDifficulty);
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
    
    var startButton = document.getElementById("gameOptions");
    startButton.style.visibility = "hidden";
    
    // score block
    var highScoreBlock = document.getElementById('highScore');

    var highScoreValueBlock = highScoreBlock.querySelector(".value");
    highScoreValueBlock.innerHTML = highestScores[selectedDifficulty].time;

    var highScoreUsernameBlock = highScoreBlock.querySelector(".username");
    highScoreUsernameBlock.innerHTML = highestScores[selectedDifficulty].username;

    gameRunning = true;
    update(game)
}

const sendPostData = (data) => {

    console.log("Posting Data: ", data)

    fetch("/post", {
        method: "POST",
        headers: {'Content-Type': 'application/json', 'X-CSRFToken': csrftoken}, 
        body: JSON.stringify(data)
    }).then(res => {
    console.log("Request complete! response:", res);
    });
}

const timeStrToNum = (timeStr) => {
    var numStr = timeStr.replaceAll(':', '');
    var result = parseInt(numStr);
    console.log(numStr, result)
    return result
}

const handleDeath = (game) => {

    console.log("Player died...")
        
    var deathSound = new Audio("static/sounds/dead.mp3")
    deathSound.play();

    sendPostData({
        'username': username, 
        'time': game.timer.object.innerHTML,
        'enemy_speed': game.config.enemySpeed,
        'enemy_spawn_factor': game.config.enemySpawnFactor,
        'difficulty': game.config.difficulty.name
    })

    var highScoreBlock = document.getElementById('highScore');
    var valBlock = highScoreBlock.querySelector(".value");

    if (timeStrToNum(game.timer.object.innerHTML) > timeStrToNum(valBlock.innerHTML)) {
        highestScores[selectedDifficulty].time = game.timer.object.innerHTML;
        highestScores[selectedDifficulty].username = username;
    }

    console.log("updated scores", highestScores[selectedDifficulty])

    game.timer.stop();
    game.player.obj.style.visibility = "hidden";

    setTimeout(() => {
        document.getElementById("game").remove();

        var startButton = document.getElementById("gameOptions");
        startButton.style.visibility = "visible";
    }, 3000);

    return
}

const update = (game) => {
    var livingSprites = [];

    if (!gameRunning) {
        handleDeath(game)
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

    game.stats.update(game.config)
    game.config.update()
    game.sprites = livingSprites;
    setTimeout(() => {update(game)}, game.config.tickSpeed);
}

var highestScores = JSON.parse(document.getElementById('highestScores').textContent);
const difficulties = JSON.parse(document.getElementById('difficulties').textContent);

function placeStartButton() {
    var gameOptions = document.getElementById("gameOptions");
    gameOptions.style.top = pageDimensions.height / 2;
    gameOptions.style.left = pageDimensions.width / 2;
    gameOptions.style.visibility = "visible";

    var startButton = document.getElementById('startButton');
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
const selectedDifficulty = document.getElementById("difficulty").value;
var pageDimensions = utils.getPageDimensions();
var gameRunning = false;
var songPlaying = false;

placeStartButton();

console.log(difficulties)

var username = prompt("What is your username?");
if (!username) {
    username = "anonymous"
}