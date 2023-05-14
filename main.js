var config = {
    type: Phaser.AUTO,
    width: 1280, height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    input: { gamepad: true },
    scene: [niveau4,Menu, niveau6, niveau7],
    pixelArt : true ,
} 
var game =  new Phaser.Game(config);