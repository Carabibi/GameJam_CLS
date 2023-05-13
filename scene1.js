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
        this.dashCD1 = true;
        this.IsGoingLeft = false;
        this.IsGoingRight = false;
        this.IsGoingUp=false;
        this.IsGoingDown=false;
        this.isDashing = false;
        // SPAWN JOUEUR
        if (this.spawnx && this.spawny) {
            this.player = this.physics.add.sprite(this.spawnx, this.spawny, 'perso');
        }
        else {
            this.player = this.physics.add.sprite(0, 0, 'perso');
        }


        this.cursors = this.input.keyboard.createCursorKeys();
        //this.shuriken = this.physics.add.group();
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
        //shoot
        this.CanShoot = true;
        if (this.clavier.E.isDown && this.CanBDF == true) {
            this.SpriteFireBall.create(this.player.x + 50, this.player.y, "SpriteFireBall").body.setAllowGravity(false);
            this.SpriteFireBall.setVelocityX(600);
            this.Shoot = false;
            setTimeout(() => {
                this.Shoot = true;
            }, 500);
        }
        if (this.clavier.SHIFT.isDown && this.IsMoving == true && this.IsGoingRight == false && this.dashCD1 == true) {

            this.IsGoingRight = false;
            this.IsMoving = true;
            this.player.setVelocityX(-900);
            this.player.setVelocityY(0);
            
            
            setTimeout(() => {
                this.dashCD1 = false
                this.isDashing = true;
            }, 200);

            this.time.addEvent({
                delay: 3000, callback: () => {
                    this.dashCD1 = true
                    this.isDashing = false
                },
            })
        } 
    }
}