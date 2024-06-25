class Character extends MovableObject {

    IMAGES_WALKING = [
        './img/1.Sharkie/3.Swim/1.png',
        './img/1.Sharkie/3.Swim/2.png',
        './img/1.Sharkie/3.Swim/3.png',
        './img/1.Sharkie/3.Swim/4.png',
        './img/1.Sharkie/3.Swim/5.png',
        './img/1.Sharkie/3.Swim/6.png'
    ];

    IMAGES_DEAD = [
        './img/1.Sharkie/6.dead/1.Poisoned/1.png',
        './img/1.Sharkie/6.dead/1.Poisoned/2.png',
        './img/1.Sharkie/6.dead/1.Poisoned/3.png',
        './img/1.Sharkie/6.dead/1.Poisoned/4.png',
        './img/1.Sharkie/6.dead/1.Poisoned/5.png',
        './img/1.Sharkie/6.dead/1.Poisoned/6.png',
        './img/1.Sharkie/6.dead/1.Poisoned/7.png',
        './img/1.Sharkie/6.dead/1.Poisoned/8.png',
        './img/1.Sharkie/6.dead/1.Poisoned/9.png',
        './img/1.Sharkie/6.dead/1.Poisoned/10.png',
        './img/1.Sharkie/6.dead/1.Poisoned/11.png',
        './img/1.Sharkie/6.dead/1.Poisoned/12.png',
    ];

    IMAGES_HURT = [
        './img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        './img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        './img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        './img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
    ];

    IMAGES_ELECTROCUTED = [
        './img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        './img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        './img/1.Sharkie/5.Hurt/2.Electric shock/3.png',
    ];

    IMAGES_ATTACK = [
        './img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        './img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        './img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        './img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        './img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        './img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        './img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        './img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
    ];

    IMAGES_IDLE = [
        './img/1.Sharkie/1.IDLE/1.png',
        './img/1.Sharkie/1.IDLE/2.png',
        './img/1.Sharkie/1.IDLE/3.png',
        './img/1.Sharkie/1.IDLE/4.png',
        './img/1.Sharkie/1.IDLE/5.png',
        './img/1.Sharkie/1.IDLE/6.png',
        './img/1.Sharkie/1.IDLE/7.png',
        './img/1.Sharkie/1.IDLE/8.png',
        './img/1.Sharkie/1.IDLE/9.png',
        './img/1.Sharkie/1.IDLE/10.png',
        './img/1.Sharkie/1.IDLE/11.png',
        './img/1.Sharkie/1.IDLE/12.png',
        './img/1.Sharkie/1.IDLE/13.png',
        './img/1.Sharkie/1.IDLE/14.png',
        './img/1.Sharkie/1.IDLE/15.png',
        './img/1.Sharkie/1.IDLE/16.png',
        './img/1.Sharkie/1.IDLE/17.png',
        './img/1.Sharkie/1.IDLE/18.png',
    ];

    IMAGES_LONG_IDLE = [
        './img/1.Sharkie/2.LongIDLE/21.png',
        './img/1.Sharkie/2.LongIDLE/22.png',
        './img/1.Sharkie/2.LongIDLE/23.png',
        './img/1.Sharkie/2.LongIDLE/24.png',
        './img/1.Sharkie/2.LongIDLE/25.png',
        './img/1.Sharkie/2.LongIDLE/26.png',
        './img/1.Sharkie/2.LongIDLE/27.png',
        './img/1.Sharkie/2.LongIDLE/28.png',
        './img/1.Sharkie/2.LongIDLE/29.png',
        './img/1.Sharkie/2.LongIDLE/210.png',
        './img/1.Sharkie/2.LongIDLE/211.png',
        './img/1.Sharkie/2.LongIDLE/212.png',
        './img/1.Sharkie/2.LongIDLE/213.png',
    ];

    IMAGES_SLEEP = [
        './img/1.Sharkie/2.LongIDLE/211.png',
        './img/1.Sharkie/2.LongIDLE/212.png',
        './img/1.Sharkie/2.LongIDLE/213.png',
    ];


    world;

    constructor() {
        super().loadImage('./img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ELECTROCUTED);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.x = 100;
        this.y = 50;
        this.animate();
    };


    /**
     * Animates the character by continuously executing different animations based on its state.
     * The animation is updated at a rate of 10 frames per second.
     */
    animate() {
        setInterval(() => {
            this.move();
        }, 1000 / 60);
        setInterval(() => {
            if (this.setDead()) {
                this.playAnimation2(this.IMAGES_DEAD);
                this.stayInLastFrame();
                this.world.gameOver();
            }
            else if (this.isHurt() && this.energy > 0)
                this.playAnimation2(this.IMAGES_HURT);
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.playAnimation2(this.IMAGES_WALKING);
                this.world.sounds.stopSnoring();
            }
            else if (this.world.keyboard.D) {
                this.world.statusbar_poison.setPercentage(this.poison);
                if (this.energy > 0 && this.poison > 0) {
                    this.playAnimation2(this.IMAGES_ATTACK);
                    this.world.sounds.stopSnoring();
                }
            }
            else if (this.world.idletime > 0 && this.energy > 0 && this.world.idletime < 20)
                this.playAnimation2(this.IMAGES_IDLE);
            else if (this.world.idletime == 20)
                this.playAnimation2(this.IMAGES_LONG_IDLE);
            else if (this.world.idletime > 21) {
                this.playAnimation2(this.IMAGES_SLEEP);
                this.world.sounds.playSnoring();
            }
        }, 1000 / 10);
    };

    i = 0;


    /**
     * Moves the character based on keyboard input.
     */
    move() {


        if (this.x > 740*2) {
            this.world.endboss.hadFirstConcact = true
        }


        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x - 100) {
            this.x += 5;
            this.otherDirection = false;
            this.world.camera_x -= 5;
        }
        if (this.world.keyboard.LEFT && this.x > 100) {
            this.x -= 5;
            this.otherDirection = true;
            this.world.camera_x += 5;
        }
        if (this.world.keyboard.UP && this.y > -90) {
            this.y -= 5;
        }
        if (this.world.keyboard.DOWN && this.y < 320) {
            this.y += 5;
        }


        if (this.world && this.world.character.x > 790 * 2 && this.i == 0) {
            this.i++;
            world.sounds.stopBackground();
            world.sounds.playEndboss();
        }


    };

    /**
     * Sets the current image of the character to the last frame after a delay of 1 second.
     */
    stayInLastFrame() {
        setTimeout(() => {
            this.currentImage = this.IMAGES_DEAD.length - 1;
        }, 1000);
    };


};
