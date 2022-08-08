class Config {
    constructor(
        difficulties, selectedDiffName
    ) {
        this.tickSpeed = 20;
        this.difficulty = this.getDifficulty(difficulties, selectedDiffName);

        console.log(difficulties);
        console.log(selectedDiffName)
        console.log(this.difficulty)

        this.enemySpawnFactor = this.difficulty.starting_enemy_spawn_factor;
        this.enemySpeed = this.difficulty.starting_enemy_speed;
        this.speedIncrementFactor = this.difficulty.enemy_speed_incremental_factor;
        this.spawnIncrementFactor = this.difficulty.enemy_spawn_incremental_factor;
    }

    getDifficulty(difficulties, selectedDiffName) {
        for (var diff of difficulties) {
            if (diff.name === selectedDiffName) {
                return diff
            }
        }

        throw "No difficulty was found for the selection."
    }

    update() {
        this.enemySpawnFactor = this.enemySpawnFactor * this.spawnIncrementFactor;
        this.enemySpeed = this.enemySpeed * this.speedIncrementFactor;
    }
}

export {Config};