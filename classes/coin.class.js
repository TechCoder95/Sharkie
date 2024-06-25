class Coin extends MovableObject {

    height = 50;
    width = 50;

    IMAGES_WALKING = [
    './img/4.Marcadores/1.Coins/1.png',
    './img/4.Marcadores/1.Coins/2.png',
    './img/4.Marcadores/1.Coins/3.png',
    './img/4.Marcadores/1.Coins/4.png',
    ];

    constructor(){
        super().loadImage('./img/4.Marcadores/1.Coins/1.png');
        this.x = 300 + Math.random() * (740*2.5);
        this.y = 50 + Math.random() * 350;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }
   
    /**
     * Animates the coin.
     */
    animate(){
        this.playAnimation(100);
    }
}