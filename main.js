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
<<<<<<< Updated upstream
    scene: [niveau3],
=======
    scene: [niveau2],
>>>>>>> Stashed changes
    pixelArt : true ,
} 
var game =  new Phaser.Game(config);