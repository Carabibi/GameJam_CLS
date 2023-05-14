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
<<<<<<< Updated upstream
    scene: [niveau3],
=======
    scene: [niveau2],
>>>>>>> Stashed changes
=======
    scene: [Menu,scene1,scene2,scene3,scene4,niveau1,niveau2,niveau3,niveau4,niveau5,niveau6,niveau7,niveau8,Boss,],
>>>>>>> Stashed changes
    pixelArt : true ,
} 
var game =  new Phaser.Game(config);