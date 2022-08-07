class Config {
    constructor(
        tickSpeed, 
        initialEnemySpawnFactor,
        enemySpeed
    ) {
        this.tickSpeed = tickSpeed;
        this.enemySpawnFactor = initialEnemySpawnFactor;
        this.enemySpeed = enemySpeed;
    }

    update() {
        this.enemySpawnFactor = this.enemySpawnFactor * 1.0004;
        this.enemySpeed = this.enemySpeed * 1.00001;
    }
}

export {Config};