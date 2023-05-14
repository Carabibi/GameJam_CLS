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
    scene: [niveau3, niveau4],
    pixelArt : true ,
} 
var game =  new Phaser.Game(config);