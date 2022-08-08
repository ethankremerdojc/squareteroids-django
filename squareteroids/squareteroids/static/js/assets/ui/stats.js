class Stats {
    constructor() {
        this.hr = 0;
        this.min = 0;
        this.sec = 0;
        this.stoptime = true;
        this.obj = document.getElementById("stats");
    }

    updateHighscore(newHighscore) {
        var highScoreBlock = document.getElementById('highScore');
        var highScoreValue = highScoreBlock.querySelector(".value");
        highScoreValue.innerHTML = `${newHighscore.username} : ${newHighscore.time}`
    }

    update(config, newHighscore=null) {
        var speedBlock = document.getElementById('enemySpeed');
        var spawnFactorBlock = document.getElementById('spawnFactor');

        var speedValue = speedBlock.querySelector(".value");
        var spawnValue = spawnFactorBlock.querySelector(".value");

        speedValue.innerHTML = Math.round(config.enemySpeed * 100) / 100;
        spawnValue.innerHTML = Math.round(config.enemySpawnFactor * 100) / 100;
    }
}

export {Stats};