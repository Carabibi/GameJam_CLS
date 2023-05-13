class scene1 extends Phaser.Scene {
    constructor() {
        super('scene1');
    }

    init(data) {
    }
    preload() {
        this.load.image("perso", "GameJam_Carabistouilles/perso.png");
    }

    create() {
        // SPAWN JOUEUR
        if (this.spawnx && this.spawny) {
            this.player = this.physics.add.sprite(this.spawnx, this.spawny, 'perso');
        }
        else {
            this.player = this.physics.add.sprite(0, 0, 'perso');
        }


        this.cursors = this.input.keyboard.createCursorKeys();
    }


    update() {
        //                           DEPLACEMENT JOUEUR
        // Droite/gauche
        if (this.cursors.left.isDown || this.clavier.Q.isDown) {
            this.player.setVelocityX(-160)
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown || this.clavier.D.isDown) {
            this.player.setVelocityX(160)
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0)
        }
        // Haut/bas
        if (this.cursors.up.isDown || this.clavier.Z.isDown) {
            this.player.setVelocityY(-160)
            this.player.anims.play('back', true);
        }
        else if (this.cursors.down.isDown || this.clavier.S.isDown) {
            this.player.setVelocityY(160)
            this.player.anims.play('front', true);
        }
        else {
            this.player.setVelocityY(0)
        }

    }
}