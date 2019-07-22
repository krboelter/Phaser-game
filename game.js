var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y : 2000 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var sky;
var player;
var platforms;
var cursors;
const SPEED = 360;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'Assets/Environment/sky.png');
    this.load.image('player', 'Assets/Player/player.png');
    this.load.image('platform', 'Assets/Environment/platform.png');
}

function create() {
    console.log(this);
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();
    
    cursors = this.input.keyboard.createCursorKeys();

    //******Level******

    platforms.create(400, 575, 'platform');

    platforms.create(400, 375, 'platform').setScale(.3).refreshBody();

    // ******Player******

    player = this.physics.add.sprite(400, 300, 'player');

    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);

}

function update(delta) {
    // if(gameOver) {
    //     return;
    // }

    playerMovement(delta);
}

function playerMovement (delta) {
    let gainVelocity = function() {
        let increaseSpeed = 0.25 * delta;
        if (SPEED > increaseSpeed) {
            return increaseSpeed;
        }
        else {
            return SPEED;
        }
    }

    if (cursors.left.isDown) {
        player.setVelocityX(Math.max(-SPEED, -gainVelocity()));
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(Math.min(SPEED, gainVelocity()));
    }
    else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down){
        player.setVelocityY(-900);
    }

}