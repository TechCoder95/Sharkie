class Poison extends MovableObject {

    height = 50;
    width = 50;

    IMAGES_WALKING = [
    './img/4.Marcadores/Posión/Animada/1.png',
    './img/4.Marcadores/Posión/Animada/2.png',
    './img/4.Marcadores/Posión/Animada/3.png',
    './img/4.Marcadores/Posión/Animada/4.png',
    './img/4.Marcadores/Posión/Animada/5.png',
    './img/4.Marcadores/Posión/Animada/6.png',
    './img/4.Marcadores/Posión/Animada/7.png',
    './img/4.Marcadores/Posión/Animada/8.png'
    ];

    constructor(){
        super().loadImage('./img/4.Marcadores/1.Coins/1.png');
        this.x = 300 + Math.random() * (740*2.5);
        this.y = 50 + Math.random() * 350;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }
   
    /**
     * Animates the poison.
     */
    animate(){
        this.playAnimation(100);
    }
}