class Puffer extends MovableObject{


    width = 80;
    height = 80;


    IMAGES_WALKING = [
        './img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        './img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
        './img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        './img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        './img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png',
    ];


    constructor(){
        super().loadImage('./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png');
        this.x = 300 + Math.random() * (740*4);
        this.y = 50 + Math.random() * 360;
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.1 + Math.random() * 0.2;
        this.animate();
    }
    

    /**
     * Animates the puffer by moving it to the left and playing the animation.
     */
    animate(){
        this.moveLeft();
        this.playAnimation(100);
    }
}