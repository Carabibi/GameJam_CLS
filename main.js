import Menu from "./StartScreen";
import marchand from "./marchand";

import niveau1 from './niveau1.js'
import niveau2 from './niveau2.js'
import niveau3 from './niveau3.js';
import scene2 from './scene2.js';
import scene1 from './scene1.js';
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
    scene: [Menu,scene1,scene2,scene3,scene4,marchand, niveau1, niveau2, niveau3],
    pixelArt : true ,
} 
var game =  new Phaser.Game(config);