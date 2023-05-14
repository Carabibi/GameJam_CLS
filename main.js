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
    scene: [scene4],
=======
    scene: [marchand,scene1,scene2,niveau1,niveau2,niveau3, niveau4],
>>>>>>> Stashed changes
    pixelArt : true ,
} 
var game =  new Phaser.Game(config);