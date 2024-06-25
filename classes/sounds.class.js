class Sounds {

    muted = false;


    /**
     * Represents a Sounds object.
     * @constructor
     */
    constructor() {
        this.sounds = {
            Blub: new Audio('./audio/Blub.wav'),
            Coin: new Audio('./audio/Coin.wav'),
            Snoring: new Audio('./audio/Snoring.mp3'),
            Background: new Audio('./audio/Background.mp3'),
            Endboss: new Audio('./audio/Endboss.wav'),
            Gift: new Audio('./audio/Gift.wav'),
            Boom: new Audio('./audio/Boom.flac'),
            Hurt: new Audio('./audio/Hurt.mp3'),
            Win: new Audio('./audio/Win.mp3'),
            YouWin: new Audio('./audio/YouWin.mp3'),
            YouLose: new Audio('./audio/YouLose.mp3'),
        };
    }

    /**
     * Plays the background sound.
     */
    playBackground() {
        this.sounds.Background.muted = false;
        this.sounds.Background.play();

    }


    /**
     * Stops the background sound.
     */
    stopBackground() {
        this.sounds.Background.muted = true;
        this.sounds.Background.pause();

    }


    /**
     * Plays the Endboss sound.
     */
    playEndboss() {
        this.sounds.Endboss.muted = false;
        this.sounds.Endboss.play();

    }


    /**
     * Plays the "Blub" sound.
     */
    playBlub() {
        this.sounds.Blub.volume = 0.1;
        this.sounds.Blub.play();

    }

    /**
     * Stops the Endboss sound.
     */
    stopEndboss() {
        this.sounds.Endboss.muted = true;
        this.sounds.Endboss.pause();
    }


    /**
     * Plays the coin sound.
     */
    playCoin() {
        this.sounds.Coin.volume = 0.1;
        this.sounds.Coin.play();
    }


    /**
     * Plays the snoring sound.
     */
    playSnoring() {
        this.sounds.Snoring.play();
    }


    /**
     * Stops the snoring sound.
     */
    stopSnoring() {
        this.sounds.Snoring.muted = true;
        this.sounds.Snoring.pause();
    }


    /**
     * Plays the gift sound.
     */
    playGift() {
        this.sounds.Gift.muted = false;
        this.sounds.Gift.volume = 0.1;
        this.sounds.Gift.play();
    }


    /**
     * Plays the "Boom" sound.
     */
    playBoom() {
        this.sounds.Boom.muted = false;
        this.sounds.Boom.volume = 0.1;
        this.sounds.Boom.play();
    }


    /**
     * Plays the 'Hurt' sound.
     */
    playHurt() {
        this.sounds.Hurt.muted = false;
        this.sounds.Hurt.volume = 0.1;
        this.sounds.Hurt.play();
    }


    /**
     * Plays the win sound.
     */
    playWin() {
        this.sounds.Win.muted = false;
        this.sounds.Win.volume = 0.1;
        this.sounds.Win.play();
    }

    
    /**
     * Plays the "You Win" sound.
     */
    playYouWin() {
        this.sounds.YouWin.muted = false;
        this.sounds.YouWin.volume = 0.1;
        this.sounds.YouWin.play();
    }


    /**
     * Plays the "You Lose" sound.
     */
    playYouLose() {
        this.sounds.YouLose.muted = false;
        this.sounds.YouLose.volume = 0.1;
        this.sounds.YouLose.play();
    }
}