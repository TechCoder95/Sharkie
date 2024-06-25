class DrawableObject {

    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 400;
    height = 200;
    width = 200;

    kasten = false;


    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    };


    /**
     * Loads images into the image cache.
     * @param {string[]} arr - An array of image source URLs.
     */
    loadImages(arr) {
        arr.forEach((src) => {
            let img = new Image(); // Declare the img variable properly
            img.src = src;
            this.imageCache[src] = img;
        });
    };

    
    /**
     * Draws an image on the canvas.
     *
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     * @param {HTMLImageElement} img - The image to be drawn.
     * @param {number} x - The x-coordinate of the top-left corner of the image.
     * @param {number} y - The y-coordinate of the top-left corner of the image.
     * @param {number} width - The width of the image.
     * @param {number} height - The height of the image.
     */
    drawImage(ctx, img, x, y, width, height) {
        ctx.drawImage(img, x, y, width, height);


        if (this.kasten){
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "red";
        ctx.rect(x, y, width, height);
        ctx.stroke();
    }
    };
}