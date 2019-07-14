var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y : 300 },
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

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'Assets/Environment/sky.png');
    this.load.image('player', 'Assets/Player/player.png');
    this.load.image('platform', 'Assets/Environment/platform.png');
}

function create() {
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();
    
    cursors = this.input.keyboard.createCursorKeys();

    //******Level******

    platforms.create(400, 575, 'platform');

    // ******Player******

    player = this.physics.add.sprite(400, 300, 'player');

    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);

}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
    }
    else {
        player.setVelocityX(0);
    }
}

