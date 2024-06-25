class MovableObject extends DrawableObject {

    speed;
    speedY = 0;
    acceleration = 1;
    offsetY = 0;
    energy = 100;
    lastHit = 0;
    isDead = false;
    coins = 0;
    poison = 0;

    xOffset = 10;
    yOffset = 80;



    otherDirection = false;

    /**
     * Applies gravity to the object by updating its position and speed.
     */
    applyGravity() {
        setInterval(() => {
            if (this.y < 300) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25);
    };


    /**
     * Flips and draws an image on the canvas.
     *
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     * @param {HTMLImageElement} img - The image to be drawn.
     * @param {number} x - The x-coordinate of the top-left corner of the image.
     * @param {number} y - The y-coordinate of the top-left corner of the image.
     * @param {number} width - The width of the image.
     * @param {number} height - The height of the image.
     */
    flipImage(ctx, img, x, y, width, height) {
        ctx.save();
        ctx.translate(x + width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, y, width, height);
        ctx.restore();

        if (this.kasten){
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(x, y, width, height);
            ctx.stroke();
        }
    }


    /**
     * Checks if the current object is colliding with another moveable object.
     * @param {MoveableObject} mo - The moveable object to check collision with.
     * @returns {boolean} - Returns true if collision occurs, otherwise false.
     */
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    };


    /**
     * Checks if the current object is colliding with another moveable object.
     * @param {MoveableObject} mo - The moveable object to check collision with.
     * @returns {boolean} - True if collision occurs, false otherwise.
     */
    isCollidingcharacter(mo) {
        return this.x + this.width - this.xOffset > mo.x &&
            this.y + this.height - this.yOffset > mo.y &&
            this.x + this.xOffset < mo.x + mo.width &&
            this.y + this.yOffset < mo.y + mo.height;
    };


    /**
     * Decreases the energy of the object by 10 when it hits an enemy.
     * If the energy reaches 0 or below, it sets the energy to 0.
     * Otherwise, it updates the lastHit property with the current timestamp.
     */
    hitEnemy() {
        this.energy -= 10;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Increases the poison level of the object by 20.
     */
    addPoison() {
        this.poison += 20;
    }


    /**
     * Adds coins to the object.
     */
    addCoin() {
        this.coins += 20;
        if (world.sounds.muted == false)
            world.sounds.playCoin();
        else {
            return;
        }
    };


    /**
     * Decreases the energy of the object by 20 when hit by poison.
     * If the energy reaches 0 or below, it sets the energy to 0.
     * Otherwise, it updates the lastHit property with the current timestamp.
     */
    hitPoison() {
        this.energy += 20;
        // if (this.energy <= 0) {
        //     this.energy = 0;
        // } else {
        //     this.lastHit = new Date().getTime();
        // }
    }


    /**
     * Sets the object's state to dead if its energy is 0.
     * @returns {boolean} Returns true if the object's energy is 0, indicating it is dead.
     */
    setDead() {
        return this.energy == 0;
    };


    /**
     * Checks if the object is currently in a hurt state.
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }


    /**
     * Checks if the object is poisoned.
     * @returns {boolean} True if the object is poisoned, false otherwise.
     */
    isPoisend() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 1000;
    }


    /**
     * Plays the animation by updating the image of the moveable object.
     * @param {string[]} images - An array of image paths.
     */
    playAnimation2(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Moves the object to the right.
     * @returns {void}
     */
    moveRight() {
        setInterval(() => {
            this.x += this.speed;
        }, 1000 / 144);
    };


    /**
     * Moves the object to the left at a constant speed.
     */
    moveLeft() {
        setInterval(() => {
            if (this.x != 150)
            this.x -= this.speed;
        }, 1000 / 144);
    }


    /**
     * Moves the object upwards at a constant speed.
     * @returns {void}
     */
    moveUp() {
        setInterval(() => {
            this.y -= this.speed;
        }, 1000 / 144);
    }


    /**
     * Moves the object downwards at a constant speed.
     * @returns {void}
     */
    moveDown() {
        setInterval(() => {
            if (this.y == 0)
                this.y += this.speed;
            else
                this.y -= this.speed;
        }, 1000 / 144);
    }


    /**
     * Plays the animation of the moveable object.
     * @param {number} fps - The frames per second at which the animation should be played.
     */
    playAnimation(fps) {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, fps);
    }


    moveRandom() {
        if (this.x > 740 * 2) 
            this.moveLeft();
        else if (this.x < 740 * 2) 
            this.moveRight();
        
        if (this.y > 300) 
            this.moveDown();
        else if (this.y < 0)
            this.moveUp();
    }
}