let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game by setting up the start screen.
 */
function startgame() {
    document.getElementById('overlay').innerHTML = /*html*/`
            <div id="startscreen">
                <div id="controlls">
                    <img class="instructions" src="img/6.Botones/Instructions 1.png">
                    <img class="fullscreenbutton" src="img/6.Botones/Full Screen/Mesa de trabajo 9.png" onclick="enablefullscreen()">
                </div>
                <div id="startgame">
                    <img class="startgamebutton" src="img/6.Botones/Start/1.png" onclick="init()">
                </div>
            </div>   
    `;
}

/**
 * Initializes the game by removing the blur filter, setting up the canvas, and creating the game world.
 */
function init() {
    let removeblurfilter = document.getElementById('canvas');
    removeblurfilter.classList.remove('blurfilter')
    document.getElementById('overlay').innerHTML = ` `
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard)
    playAudio();
}


/**
 * Handles the keydown event and updates the keyboard state accordingly.
 * @param {KeyboardEvent} event - The keydown event.
 */
window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        keyboard.LEFT = true;
        world.idletime = 0;
    }
    if (event.key === 'ArrowRight') {
        keyboard.RIGHT = true;
        world.idletime = 0;
    }
    if (event.key === 'ArrowUp') {
        keyboard.UP = true;
        world.idletime = 0;
    }
    if (event.key === 'ArrowDown') {
        keyboard.DOWN = true;
        world.idletime = 0;
    }
    if (event.key === ' ') {
        keyboard.SPACE = true;
        world.idletime = 0;
    }
    if (event.key === 'd') {
        keyboard.D = true;
        world.idletime = 0;
        world.sounds.playBlub();
    }
});


/**
 * Handles the keyup event and updates the keyboard state accordingly.
 * @param {KeyboardEvent} event - The keyup event.
 */
window.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') {
        keyboard.LEFT = false;
        world.idletime = 0;
    }
    if (event.key === 'ArrowRight') {
        keyboard.RIGHT = false;
        world.idletime = 0;
    }
    if (event.key === 'ArrowUp') {
        keyboard.UP = false;
        world.idletime = 0;
    }
    if (event.key === 'ArrowDown') {
        keyboard.DOWN = false;
        world.idletime = 0;
    }
    if (event.key === ' ') {
        keyboard.SPACE = false;
        world.idletime = 0;
    }
    if (event.key === 'd') {
        keyboard.D = false;
        world.idletime = 0;
    }
});


/**
 * Handles the keydown event for additional actions.
 * @param {KeyboardEvent} event - The keydown event.
 */
window.addEventListener('keydown', (event) => {
    if (event.key === 'm') {
        stopAudio();
    }
    if (event.key === 'f') {
        enablefullscreen();
    }
    if (event.key === 'r') {
        realod();
    }
});


/**
 * Handles the keyup event for additional actions.
 * @param {KeyboardEvent} event - The keyup event.
 */
window.addEventListener('keyup', (event) => {
    if (event.key === 'm') {
        stopAudio();
    }
    if (event.key === 'f') {
        enablefullscreen();
    }
    if (event.key === 'r') {
        realod();
    }
});


/**
 * Represents the state of shooting and running.
 */
let schiesen = false;
let laufen = false;



// Erstelle eine Funktion, die wiederholt aufgerufen wird
function holdit(btn, action, start, speedup) {
    var t;
    var repeat = function () {
        action();
        t = setTimeout(repeat, start);
        start = start / speedup;
    };

    // Wenn der Button gedrückt wird, starte die Wiederholung
    btn.addEventListener("touchstart", function (event) {
        repeat();
        event.preventDefault();
    }, false);

    // Wenn der Button losgelassen wird, stoppe die Wiederholung
    btn.addEventListener("touchend", function (event) {
        clearTimeout(t);
        event.preventDefault();
        if (laufen) {
            keyboard.RIGHT = false;
            keyboard.UP = false;
            keyboard.DOWN = false;
            keyboard.LEFT = false;
            laufen = false;
        }
        if (schiesen) {
            keyboard.D = false;
            schiesen = false;
        }
    }, false);
}


window.addEventListener('load', () => {
    addEvent();
});


function addEvent() {
    mobileMoveUP();
    mobileMoveDOWN();
    mobileMoveLEFT();
    mobileMoveRIGHT();
    mobileShoot();
}


function mobileMoveUP() {
     // Verwende die Funktion mit deinem eigenen Code
     var meinButton = document.getElementById("btnMoveUP");
     holdit(meinButton, function () {
         keyboard.UP = true;
         laufen = true;
     }, 1000, 2); // x..1000ms..x..500ms..x..250ms..x
}



function mobileMoveDOWN() {
    // Verwende die Funktion mit deinem eigenen Code
    var meinButton = document.getElementById("btnMoveDOWN");
    holdit(meinButton, function () {
        keyboard.DOWN = true;
        laufen = true;
    }, 1000, 2); // x..1000ms..x..500ms..x..250ms..x
}


function mobileMoveLEFT() {
    // Verwende die Funktion mit deinem eigenen Code
    var meinButton = document.getElementById("btnMoveLEFT");
    holdit(meinButton, function () {
        keyboard.LEFT = true;
        laufen = true;
    }, 1000, 2); // x..1000ms..x..500ms..x..250ms..x
}


/**
 * Sets the `laufen` variable to `true`, indicating that the mobile is moving.
 */
function mobileMoveRIGHT() {
    // Verwende die Funktion mit deinem eigenen Code
    var meinButton = document.getElementById("btnMoveRIGHT");
    holdit(meinButton, function () {
        keyboard.RIGHT = true;
        laufen = true;
    }, 1000, 2); // x..1000ms..x..500ms..x..250ms..x
}


/**
 * Enables shooting on mobile devices.
 */
function mobileShoot() {
    // Verwende die Funktion mit deinem eigenen Code
    var meinButton = document.getElementById("btnAttack");
    holdit(meinButton, function () {
        keyboard.D = true;
        world.sounds.playBlub();
        schiesen = true;
    }, 1000, 2); // x..1000ms..x..500ms..x..250ms..x
}


/**
 * Stops or starts playing audio based on the current state.
 */
function stopAudio() {
    if (world.sounds.muted) {
        world.sounds.muted = false;
        world.sounds.sounds.Snoring.muted = false;
        world.sounds.sounds.Blub.muted = false;
        world.sounds.sounds.Coin.muted = false;
        world.sounds.sounds.Background.muted = false;
        world.sounds.sounds.Endboss.muted = false;
        world.sounds.sounds.Gift.muted = false;
        world.sounds.sounds.Boom.muted = false;
        world.sounds.sounds.Hurt.muted = false;
        world.sounds.sounds.Win.muted = false;
        world.sounds.sounds.YouWin.muted = false;
        world.sounds.sounds.YouLose.muted = false;

        playAudio();
    } else {
        world.sounds.muted = true;
        world.sounds.sounds.Snoring.muted = true;
        world.sounds.sounds.Blub.muted = true;
        world.sounds.sounds.Coin.muted = true;
        world.sounds.sounds.Background.muted = true;
        world.sounds.sounds.Endboss.muted = true;
        world.sounds.sounds.Gift.muted = true;
        world.sounds.sounds.Boom.muted = true;
        world.sounds.sounds.Hurt.muted = true;
        world.sounds.sounds.Win.muted = true;
        world.sounds.sounds.YouWin.muted = true;
        world.sounds.sounds.YouLose.muted = true;
    }
}


/**
 * Plays the audio based on the character's position in the game world.
 */
function playAudio() {
    if (world.character.x > 800 * 2) {
        world.sounds.stopBackground();
        world.sounds.playEndboss();
    } else {
        world.sounds.playBackground();
    }
}


/**
 * Enables fullscreen mode and adjusts the size of the canvas and fixed buttons accordingly.
 */
function enablefullscreen() {
    if (document.fullscreenElement == "" || document.fullscreenElement == null) {
        document.getElementById('canvas').style.width = "100vw"
        document.getElementById('canvas').style.height = "100vh"
        document.getElementById('fixedButtons').style.right = "20px"
        document.getElementById('fixedButtons').style.top = "20px"
        document.getElementById('headline').style.display = "none"
    } else {
        document.exitFullscreen();
        document.getElementById('canvas').style.width = "720px"
        document.getElementById('canvas').style.height = "480px"
        document.getElementById('fixedButtons').style.right = "30%"

    };
};


/**
 * Handles the fullscreenchange event and adjusts the size of the canvas and fixed buttons accordingly.
 */
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement === null) {
        document.getElementById('canvas').style.width = "720px";
        document.getElementById('canvas').style.height = "480px";
        document.getElementById('fixedButtons').style.right = "40%"

    } else {
        document.getElementById('canvas').style.width = "95vw"
        document.getElementById('canvas').style.height = "90vh"
        document.getElementById('fixedButtons').style.right = "40%"
    };
});


/**
 * Reloads the current page.
 */
function realod() {
    location.reload();
};


