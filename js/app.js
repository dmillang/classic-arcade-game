// Enemies our player must avoid
// Convert function to an ES2015 class
class Enemy {
    constructor(x,y,speed) {
        this.x = x;
        this.y = y + 55;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
        this.step = 101;
        // Set up horizontal boundry
        this.boundry = this.step * 5;
        // Set reset position off bourd boundries
        this.resetPos = -this.step;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // stop enemy after it passes the board boundry (so it gets hidden)
        if(this.x < this.boundry) {
            // Move forward
            // Increment x by speed * dt
            this.x += this.speed * dt;
        } else {
            // Reset position to resetPos
            this.x = this.resetPos;
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Hero {
    constructor() {
        // Fetch image to render from images folder
        this.sprite = 'images/char-boy.png';
        // Set length of a horizontal move
        this.step = 101;
        // Set length of a vertical move
        this.jump = 83;
        // Set inital position
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
    }

    // Draw hero sprite on current x and y coord position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Update hero's x and y property according to input
    handleInput(input) {
        // Use of a switch instead of a regular "if...else"
        switch(input) {
            case 'up':
                // Prevent player from moving to the first row (water)
                if (this.y > this.jump) {
                    this.y -= this.jump;
                }
                break;
            case 'down':
                // Prevent player from moving down the board
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;
            case 'left':
                // Prevent player from moving left of the board
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'right':
            // Prevent player from moving right of the board
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
        }
    }

    // Reset hero
    reset() {
        // Set x and y to starting x and y
        this.y = this.startY;
        this.x = this.startX;
    }

    update() {
        // Check if there is a collision with an enemy
        for(let enemy of allEnemies) {
            // Did player x and y collide with enemy?
            if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2) ) {
                this.reset();
            }
        }
    }
}

// Initiate a bug1 object from class Enemy;
const allEnemies = [];
// Call 3 bug objects from Enemy object passing different values for 'x' and 'y' in each object to make them start at different positions
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 300);
const bug3 = new Enemy((-101*2.5), 83, 300);
allEnemies.push(bug1,bug2,bug3);

// Initiate a plater object from class Hero;
const player = new Hero();


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// PSEUDO-CODE
// New Hero object
// Init allEnemies array
// For each enemy create and push new Enemy object into above array

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
