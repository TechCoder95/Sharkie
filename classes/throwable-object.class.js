class ThrowableObject extends MovableObject{    
    
    
    /**
     * Represents a throwable object.
     * @constructor
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     */
    constructor(x,y){
        super().loadImage('./img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.width = 40;
        this.height = 40;
        this.speed = 10;
        this.throw(x,y);
    }


    /**
     * Throws the object to a specified position.
     * @param {number} x - The x-coordinate of the position to throw the object to.
     * @param {number} y - The y-coordinate of the position to throw the object to.
     */
    throw(x,y){
        this.x = x;
        this.y = y;
        this.speedX = -5;
        setInterval(() => {
            this.x -= this.speedX;
        }, 25);
    }
}