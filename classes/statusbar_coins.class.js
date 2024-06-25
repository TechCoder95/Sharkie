class StatusBar_coins extends DrawableObject{

    IMAGES_LIVE = [
        './img/4.Marcadores/Purple/0_ _1.png',
        './img/4.Marcadores/Purple/20_ .png',
        './img/4.Marcadores/Purple/40_ _1.png',
        './img/4.Marcadores/Purple/60_ _1.png',
        './img/4.Marcadores/Purple/80_ _1.png',
        './img/4.Marcadores/Purple/100__1.png',
    ];

    percentage = 0;


    /**
     * Represents a status bar for coins.
     * @constructor
     */
    constructor(){
        super().loadImage('./img/4.Marcadores/Purple/100__1.png');
        this.loadImages(this.IMAGES_LIVE)
        this.x = 20;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }


    /**
     * Sets the percentage value for the status bar.
     * @param {number} percentage - The percentage value to set.
     */
    setPercentage(percentage){
        this.percentage = percentage;
        this.img = this.resolveImage();
    }

    
    /**
     * Resolves and returns the appropriate image based on the percentage value.
     * @returns {string} The URL of the image.
     */
    resolveImage(){
        if(this.percentage == 100){
            return this.imageCache[this.IMAGES_LIVE[5]];
        }
        if(this.percentage >= 80){
            return this.imageCache[this.IMAGES_LIVE[4]];
        }
        if(this.percentage >= 60){
            return this.imageCache[this.IMAGES_LIVE[3]];
        }
        if(this.percentage >= 40){
            return this.imageCache[this.IMAGES_LIVE[2]];
        }
        if(this.percentage >= 20){
            return this.imageCache[this.IMAGES_LIVE[1]];
        }
        if(this.percentage >= 0 && this.percentage < 20){
            return this.imageCache[this.IMAGES_LIVE[0]];
        }
    }
}