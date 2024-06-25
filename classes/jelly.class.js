class Jelly extends MovableObject {
    height = 100;
    width = 80;
    speedY = 0;
    energy = 50;

    IMAGES_WALKING = [
        './img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        './img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        './img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        './img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
    ];


    IMAGES_JELLY_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/green/g1.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g2.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g3.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g4.png'
    ];


    constructor() {
        super().loadImage('./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png');
        this.x = 300 + Math.random() * (740 * 2.5);
        this.y = 50 + Math.random() * 400;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JELLY_DEAD);
        this.speed = 0.02 + Math.random() * 0.1;
        this.animate();
    }


    /**
     * Animates the jelly.
     */
    animate() {
        this.playAnimation(120);
    }


    /**
     * Decreases the energy of the jellyfish by 50.
     * If the energy becomes negative, it is set to 0.
     */
    jellyFishIsHit() {
        this.energy -= 50;
        if (this.energy < 0) {
            this.energy = 0;
        };
    };


    /**
     * Raises the dead by animating the movement of the jelly.
     */
    raiseDead() {
        this.speedY = 0.03;
        setInterval(() => {
            this.x += 2;
            this.y -= this.speedY;
            this.speedY += 0.1;
        }, 25)
    };


    /**
     * Checks if the jellyfish is dead.
     * @returns {boolean} Returns true if the jellyfish's energy is 0, otherwise returns false.
     */
    jellyFishIsDead() {
        return this.energy == 0;
    };


    /**
     * Animates the jellyfish by continuously playing different animations.
     */
    animate() {
        this.moveRandom();
        setInterval(() => {
            if (this.jellyFishIsDead()) {
                this.playAnimation2(this.IMAGES_JELLY_DEAD);
                this.raiseDead();
            } else {
                this.playAnimation2(this.IMAGES_WALKING);
            }
        }, 200);
    }
}