class Level{
    enemies;
    coins;
    poison;
    endboss;
    backgroundObjects;
    level_end_x = 720*4 - 550;

    constructor(enemies, endboss, coins, poison, backgroundObjects){
        this.enemies = enemies;
        this.coins = coins;
        this.endboss = endboss;
        this.poison = poison;
        this.backgroundObjects = backgroundObjects;
    }

}