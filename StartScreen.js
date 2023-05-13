class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");

    }
    preload() {
        this.load.image('1P', 'lignesverte.png');
        
        this.load.image('4P', 'background.png');
        this.load.image('titre', 'titre.png');
        this.load.image('nouvellepartie', 'newgame.png');
        this.load.image('continuer', 'continuer.png');
        this.load.image('options', 'options.png');

    }
    create() {
        this.image = this.add.image
        this.image = this.add.image(640, 360, '4P')

        this.image = this.add.image
        this.image = this.add.image(630, 100, 'titre')

        var button = this.add.sprite(666 ,350, 'nouvellepartie');
        button.setInteractive();
        button.on('pointerdown', () => {
            this.Startgame();
        });
        var button = this.add.sprite(550 ,470, 'continuer');
        button.setInteractive();
        button.on('pointerdown', () => {
            this.Startgame();
        });
        var button = this.add.sprite(480,570, 'options');
        button.setInteractive();
        button.on('pointerdown', () => {
            this.Startgame();
        });


        this.image = this.add.image
        this.image = this.add.image(640,360 , '1P')

        
    }
    update() {

    }
    Startgame() {
        this.scene.start('Village')

    }
}