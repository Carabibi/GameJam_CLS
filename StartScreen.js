class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");

    }
    preload() {
        this.load.image('1P', 'startscreen/lignesverte.png');
        
        this.load.image('4P', 'startscreen/background.png');
        this.load.image('titre', 'startscreen/titre.png');
        this.load.image('nouvellepartie', 'startscreen/newgame.png');
        this.load.image('continuer', 'startscreen/continuer.png');
        this.load.image('options', 'startscreen/options.png');
        this.load.audio('Music1', 'audio/Music2!EXE.1.mp3')
        this.load.audio('Music2', 'audio/Music2!EXE.2.mp3')
        this.load.audio('Music3', 'audio/Music2!EXE.3.mp3')
        this.load.audio('Music4', 'audio/Music2!EXE.4.mp3')
        
    }
    create() {
        //var audioContext = new (window.AudioContext || window.webkitAudio)();
        //    this.sound.context = audioContext;
        //    // Crée une instance de Phaser.Sound pour jouer la musique
        var musique = this.sound.add('Music4', { loop: true });
            // Joue la musique
            musique.play();
        
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
        this.scene.start('scene1')

    }
}