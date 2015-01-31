// Enemies our player must avoid
var Enemy = function (posY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // setting positions
    this.x = -101;
    // posY is passed for each instance separately
    this.y = posY;
    // default level
    this.level = 1;
    // speed is randomly created by getRandSpeed(level) fn
    this.speed = this.getRandSpeed(this.level);
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.getRandSpeed = function (level) {
    //creating random speed value and multiplying by level;
    return ((Math.floor(Math.random() * 4) + 1) * 100) + level;

};

Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
        this.x = -101;
        this.speed = this.getRandSpeed(this.level);
    }
    this.x = this.x + (this.speed * dt);
    // checking for collision with player
    // adding 81px to x to narrow colision area
    if (((this.x + 81) >= player.x  && this.x <= (player.x + 81)) && this.y === player.y) {
        // player collided with an enemy
        lifes.decrease();
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
};

Player.prototype.reset = function () {
    //setting player position
    this.x = 202;
    this.y = 390;
};

Player.prototype.update = function () {
    // moving player up
    if (this.ctlKey === 'up' && this.y > 0) {
        this.y = this.y - 83;
    }
    // moving player down    
    if (this.ctlKey === 'down' && this.y < 317) {
        this.y = this.y + 83;
    }
    // moving player left
    if (this.ctlKey === 'left' && this.x > 0) {
        this.x = this.x - 101;
    }
    // moving player right
    if (this.ctlKey === 'right' && this.x < 404) {
        this.x = this.x + 101;
    }
    // clearing key val
    this.ctlKey = null;
    // if player reaches other side increase level (speed)
    if (this.y < 58) {
        var i = 0, length = allEnemies.length;
        for (i; i < length; i++) {
            allEnemies[i].level = allEnemies[i].level + 50;
        }
        // change level indicator and render it
        level.changeLevel(level.level + 1);
        level.render();
        // put player at default location
        this.reset();
    }

};

// drawing player 
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// assigning key 
Player.prototype.handleInput = function (key) {
    this.ctlKey = key;
};

// paysing game by removing speed value
function gamePause() {
    // remove enemies
    allEnemies = [];
}

// creating player's life obj
var Life = function () {
  // scaled down star image
    this.sprite = 'images/Star_sm.png';
    this.lifes = 4;
    this.y = 545;
};

Life.prototype.render = function () {
    var x = 0, i = 0;
    // drawing life stars
    for (i; i < this.lifes; i++) {
        ctx.drawImage(Resources.get(this.sprite), x, this.y);
        x = x + 40;
    }
};


Life.prototype.decrease = function () {
  // checking is any lifes left
    if (this.lifes > 0) {
        this.lifes = this.lifes - 1;
    }
    // game over
    if (this.lifes === 0) {
    // pausing 
        gamePause();
        this.render = function () {
            // draw game end view
            ctx.drawImage(Resources.get('images/game_end.png'), 0, 50);
        };
    }
};


var Level = function () {
    this.level = 1;
    this.sprite = 'images/lv' + this.level + '.png';
    this.render = function () {
        ctx.drawImage(Resources.get('images/lv' + this.level + '.png'), 420, 550);
    };
    this.changeLevel = function (lv) {
        this.level = lv;
    };
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// creating enemies and specifying y positions 
var enemy1 = new Enemy(58); // first row y = 58px;
var enemy2 = new Enemy(141); // second row y = 141px;
var enemy3 = new Enemy(224); // third row y = 224px;
var allEnemies = [enemy1, enemy2, enemy3]; // enemies array
var player = new Player(); // instantiating player obj
var lifes = new Life(); // lifes indicator
var level = new Level(); // level indicator
player.reset(); // put player at default position


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// UPDATED: changed 'keyup' to 'keydown' to make control more responsive
document.addEventListener('keydown', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
