// Enemies our player must avoid
// initialize some global variables that need to be passed between objects
var collision = false;
var charCount = 0;
var gameLives = 4;
var gameLevel = 1;
var gameScore = 0;
// array for coordinates for each square to keep stars aligned
var SQUARES_ARR = [[0,73],[101,73],[202,73],[303,73],[404,73],
    [0,156],[101,156],[202,156],[303,156],[404,156],
    [0,239],[101,239],[202,239],[303,239],[404,239]];

var Enemy = function(speed, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = speed;
    this.x = x;
    this.y = y;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position is a required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x+=(this.speed*dt);

    if (this.x > 505) {
        this.x = -75;
    }
    // describe a collision for a player and enemy
    if(this.x < (player.x+(player.x+100))/2 &&
        this.x+100 > (player.x+(player.x+100))/2 &&
        this.y < (player.y+(player.y+83))/2 &&
        this.y + 83 > (player.y+(player.y+83))/2){
        collision = true;
    }
    // speed up the game if player wins
    if (player.y <= 0){
        this.speed += gameLevel;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, image) {
    this.sprite = image;
    this.x = x;
    this.y = y;
    this.xcount = 0;
};

// update method for player that limits the players movement and keeps the player on screen
Player.prototype.update = function() {
    if (this.move === 'left') {
       // don't let the player go off to the left
        if(this.x <= 0){
            this.xcount = 0;
            this.x -= this.xcount;
        }
        // keep player from moving more than the amount set in handleInput function
        this.x -= this.xcount;
        this.xcount = 0;
        this.x -= this.xcount;
    }
    if (this.move === 'right') {
        // don't let the player go off to the right
        if(this.x >= 400) {
            this.xcount = 0;
            this.x += this.xcount;
        }
        // keep player from moving more than the amount set in handleInput function
        this.x += this.xcount;
        this.xcount = 0;
        this.x += this.xcount;
    }
    if (this.move === 'up') {
        // player makes it to the top. Update the score and level and reset the player to the bottom
        if (this.y <= 0){
            this.ycount = 0;
            this.y = 405;
            this.x = 200;
            gameLevel += 1;
            gameScore += 500;
            document.getElementById('level').innerHTML = 'level: ' + gameLevel;
            document.getElementById('points').innerHTML = 'score: ' + gameScore;
        }
        // keep player from moving more than the amount set in handleInput function
        this.y -= this.ycount;
        this.ycount = 0;
        this.y += this.ycount;
    }
    if (this.move === 'down') {
        //keep the player from going below the playing area
        if (this.y >= 405) {
            this.ycount = 0;
            this.y += this.ycount;
        }
        // keep player from moving more than the amount set in handleInput function
        this.y += this.ycount;
        this.ycount = 0;
        this.y += this.ycount;
    }
    if(collision === true) {
        // reset the player if there is a collision with the enemy
        this.x = 200;
        this.y = 405;
        this.coll();
        collision = false;
    }
};

// render function for player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// set the amount for distance the player moves when key is pressed
Player.prototype.handleInput = function(key) {
    this.move = key;
    this.xcount = 100;
    this.ycount = 83;
};

// function that changes the player if there is a collision with an enemy and decreases the number of lives
Player.prototype.coll = function() {
    this.playersArr =[boy, princess, catGirl, hornGirl, pinkGirl];
    if (collision === true){
        charCount +=1;
        player = this.playersArr[charCount];
        gameLives -= 1;
        document.getElementById('lives').innerHTML = 'lives: ' + gameLives;
        if(charCount >= this.playersArr.length) {
            charCount = 0;
            player = this.playersArr[charCount];
        }
    }
};

// create star prototype
var Star = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/Star.png';
};

// render star prototype
Star.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// describe a collision for a player and star and update the star after collision and when the player winsa 
Star.prototype.update = function() {
    if((player.x+(player.x+100))/2 > this.x &&
        (player.x+(player.x+100))/2 < this.x + 100 &&
        (player.y+(player.y+83))/2 > this.y &&
        (player.y+(player.y+83))/2 < this.y + 83) {
        // remove stars from playing board if there is a star collision
        this.x = -100;
        this.y = -100;
        gameScore += 100;
        document.getElementById('points').innerHTML = 'score: ' + gameScore;
    }
    // update stars if player wins
    if(player.y <=0 || collision === true){
        this.x = SQUARES_ARR[Math.floor(Math.random()*14)][0];
        this.y = SQUARES_ARR[Math.floor(Math.random()*14)][1];
    }
};

//now instantiate your ojects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// make each enemy
var jerry = new Enemy(50,-75 ,64);
var eddie = new Enemy(90, -75, 147);
var john = new Enemy(60, -75, 230);
var bob = new Enemy(50, -327.5, 64);
var chuck = new Enemy(60, -327.5, 230);

// make each player
var boy = new Player(200, 405, 'images/char-boy.png');
var princess = new Player(200, 405, 'images/char-princess-girl.png');
var catGirl = new Player(200, 405, 'images/char-cat-girl.png');
var hornGirl = new Player(200, 405, 'images/char-horn-girl.png');
var pinkGirl = new Player(200, 405, 'images/char-pink-girl.png');
var allEnemies = [jerry, eddie, john, bob, chuck];
var player = boy;
// make the stars
var star1 = new Star(SQUARES_ARR[Math.floor(Math.random()*14)][0],SQUARES_ARR[Math.floor(Math.random()*14)][1]);
var star2 = new Star(SQUARES_ARR[Math.floor(Math.random()*14)][0],SQUARES_ARR[Math.floor(Math.random()*14)][1]);
var star3 = new Star(SQUARES_ARR[Math.floor(Math.random()*14)][0],SQUARES_ARR[Math.floor(Math.random()*14)][1]);
var allStars = [star1, star2,star3];

//function to quickly build html elements for scoreboard and reset screen
var DomElement = function(element, parentid, id, elemClass, source) {
    this.element = element;
    this.parent = parentid;
    this.id = id;
    this.elemClass = elemClass;
    this.source = source;
};

// create the elements
DomElement.prototype.elementFactory= function(){
    var element = document.createElement(this.element);
    element.id = this.id;
    element.className = this.elemClass;
    element.innerHTML = this.source;
    document.getElementById(this.parent).appendChild(element);
};

// create the score box and place the scores in the score box
function renderScore() {
    var scoreBox = document.createElement('div');
    scoreBox.id = 'score-box';
    document.body.appendChild(scoreBox);
    var level = new DomElement('h2', 'score-box', 'level','score', 'level: ' + gameLevel);
    level.elementFactory();
    var lives = new DomElement('h2', 'score-box', 'lives', 'score', 'lives: ' + gameLives);
    lives.elementFactory();
    var points = new DomElement('h2','score-box', 'points', 'score', 'points: ' + gameScore);
    points.elementFactory();
}

renderScore();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

