class World {

    fps = 60;
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    idletime = 0;
    statusbar_live = new StatusBar_live();
    statusbar_coins = new StatusBar_coins();
    statusbar_poison = new StatusBar_poison();
    statusbar_endbosslive = new StatusBar_EndbossLive();
    throwableObjects = [];
    hasExecuted = false;
    enemy = new Jelly();
    endboss = new Endboss();
    sounds = new Sounds();


    
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.run();
    }


    setWorld() {
        this.character.world = this;

    }


    /**
     * Runs the world simulation.
     */
    run() {
        this.draw();
        this.setWorld();
        this.checkCollisons();
        this.checkIdleTime();
    }


    /**
     * Checks the idle time and updates the `idletime` property.
     * @returns {void}
     */
    checkIdleTime() {
        setInterval(() => {
            if (this.keyboard.RIGHT || this.keyboard.LEFT || this.keyboard.UP || this.keyboard.DOWN || this.keyboard.SPACE || this.keyboard.D)
                this.idletime = 0;
            else
                this.idletime++;
        }, 500);
    }


    /**
     * Checks for throwable objects and adds them to the list of throwable objects.
     */
    checkThrowableObjects() {
        if (this.hasExecuted == false && this.keyboard.D && this.character.energy > 0 && this.character.poison > 0) {
            this.hasExecuted = true;
            this.character.poison -= 20;
            setTimeout(() => {
                let bubble = new ThrowableObject(this.character.x + this.character.width - 30, this.character.y + this.character.height / 2);
                this.throwableObjects.push(bubble);
            }, 600);
            setTimeout(() => {
                this.hasExecuted = false;
            }, 800);
        }
    }


    /**
     * Checks for collisions between different game objects.
     * This method is responsible for checking collisions between enemies, end bosses, coins, poisons,
     * throwable objects, and bubbles.
     * It sets up two intervals: one for checking enemy and end boss collisions every second,
     * and another for checking coin, poison, throwable object, and bubble collisions every 1/60th of a second.
     */
    checkCollisons() {
        setInterval(() => {
            this.checkenemyCollisions();
            this.checkendbossCollisions();
        }, 1000);
        setInterval(() => {
            this.checkcoinCollisions();
            this.checkpoisonCollisions();
            this.checkThrowableObjects();
            this.checkbubbleCollisions();
        }, 1000 / 60);
    }


    /**
     * Checks for collisions between the character and enemies.
     */
    checkenemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingcharacter(enemy)) {
                this.character.hitEnemy();
                this.statusbar_live.setPercentage(this.character.energy);
                if (this.character.energy <= 0) {
                    this.character.setDead();
                }
                if (this.sounds.muted == false && this.character.energy > 0)
                    this.sounds.playHurt();

            }
        });
    }


    /**
     * Checks for collisions between the character and coins in the level.
     */
    checkcoinCollisions() {
        this.level.coins.forEach((coin) => {
            if (this.character.isCollidingcharacter(coin)) {
                this.level.coins = this.level.coins.filter((c) => c != coin);
                this.character.addCoin();
                this.statusbar_coins.setPercentage(this.character.coins);
                    ;
            }
        });
    }


    /**
     * Checks for collisions between the character and poison objects.
     */
    checkpoisonCollisions() {
        this.level.poison.forEach((poison) => {
            if (this.character.isCollidingcharacter(poison)) {
                this.level.poison = this.level.poison.filter((c) => c != poison);
                this.character.hitPoison();
                this.character.addPoison();
                this.statusbar_poison.setPercentage(this.character.poison);
                if (this.sounds.muted == false)
                this.sounds.playGift();
                if (this.character.energy <= 0) {
                    this.character.setDead();
                }
            }
        });
    }


    /**
     * Checks for collisions between enemies and throwable objects (bubbles).
     */
    checkbubbleCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((bubble) => {

                if (enemy.isColliding(bubble)) {
                    this.throwableObjects = this.throwableObjects.filter((b) => b != bubble);
                    enemy.jellyFishIsHit();
                    if (world.sounds.muted == false)
                    world.sounds.playBoom();
                }
            });
        });

    }


    /**
     * Checks for collisions between throwable objects and the end boss,
     * as well as collisions between the character and the end boss.
     */
    checkendbossCollisions() {
        this.throwableObjects.forEach((bubble) => {
            if (this.endboss.isColliding(bubble)) {
                this.throwableObjects = this.throwableObjects.filter((b) => b != bubble);
                this.endboss.endbossIsHit();
                this.statusbar_endbosslive.setbosspercentage(this.endboss.energy);
            }
        });

        if (this.character.isCollidingcharacter(this.endboss)) {
            this.character.hitEnemy();
            this.statusbar_live.setPercentage(this.character.energy);
            if (this.character.energy <= 0) {
                this.character.setDead();
            }
        };
    }


    /**
     * Draws the game world on the canvas.
     * @returns {void}
     */
    draw() {
        setTimeout(() => {
            requestAnimationFrame(() => {
                this.draw();
            }, 1000 / this.fps);
        });
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectstoMap(this.level.backgroundObjects);
        this.addtoMap(this.character);
        this.addObjectstoMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addtoMap(this.statusbar_live);
        if (this.character.x > 800 * 2) {
            this.addtoMap(this.statusbar_endbosslive);
        }
        this.addtoMap(this.statusbar_coins);
        this.addtoMap(this.statusbar_poison);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectstoMap(this.level.enemies);
        this.addtoMap(this.endboss);
        this.addObjectstoMap(this.level.coins);
        this.addObjectstoMap(this.level.poison);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * Adds objects to the map.
     * @param {Array} objects - An array of objects to be added to the map.
     */
    addObjectstoMap(objects) {
        objects.forEach((object) => {
            this.addtoMap(object);
        });
    }


    /**
     * Adds a map object to the world.
     * @param {MapObject} mo - The map object to be added.
     */
    addtoMap(mo) {
        if (!mo.otherDirection) {
            mo.drawImage(this.ctx, mo.img, mo.x, mo.y, mo.width, mo.height);
        }
        else {
            mo.flipImage(this.ctx, mo.img, mo.x, mo.y, mo.width, mo.height);
        }
    }


    /**
     * Displays the game over screen and performs necessary actions when the game is over.
     */
    gameOver() {
        document.getElementById('overlay').innerHTML =
            `<img class="gameover" src="img/6.Botones/Tittles/Game Over/Recurso 10.png">
            <img class="tryagainbutton" src="img/6.Botones/Try again/Recurso 16.png" onclick="realod()">`;
        let addBlurToElement = document.getElementById('canvas');
        addBlurToElement.classList.add('blurfilter');

        //Gameover Sound
        if (this.sounds.muted == false && this.character.energy <= 0) {
            this.sounds.stopEndboss();
            this.sounds.stopBackground();
            this.sounds.playWin();
            this.sounds.playYouLose();
        }

    }


    /**
     * Starts the game by updating the HTML content and applying a blur filter to the canvas element.
     */
    startgame() {
        document.getElementById('overlay').innerHTML =
            `<img class="gameover" src="img/6.Botones/Tittles/Game Over/Recurso 10.png">
            <img class="tryagainbutton" src="img/6.Botones/Try again/Recurso 16.png" onclick="realod()">`;
        let addBlurToElement = document.getElementById('canvas');
        addBlurToElement.classList.add('blurfilter');
    }


}