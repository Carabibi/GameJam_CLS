var CDDash = true
class scene1 extends Phaser.Scene {
    constructor() {
        super('scene1');
    }

    init(data) {
    }
    preload() {
        this.load.image("perso", "assets/perso.png");
        this.load.tilemapTiledJSON("map", "assets/map.json");
        this.load.image("tileset", "assets/placeholder.png");
    }

    create() {
        this.map = this.add.tilemap("map");
        this.tileset = this.map.addTilesetImage(
            "placeholder",
            "tileset"
        );
        this.sol = this.map.createLayer(
            "sol",
            this.tileset
        );
        this.mur = this.map.createLayer(
            "mur",
            this.tileset
        );
        this.sol = this.map.createLayer(
            "obstacle",
            this.tileset
        );

        this.mur.setCollisionByExclusion(-1, true);

        // SPAWN JOUEUR
        if (this.spawnx && this.spawny) {
            this.player = this.physics.add.sprite(this.spawnx, this.spawny, 'perso');
        }
        else {
            this.player = this.physics.add.sprite(2 * 64, 5 * 64, 'perso');
        }
        this.physics.add.collider(this.player, this.mur);

        this.cursors = this.input.keyboard.createCursorKeys();
        //this.shuriken = this.physics.add.group();
        this.clavier = this.input.keyboard.addKeys('SHIFT');
    }


    update() {
        //                           DEPLACEMENT JOUEUR
        // Droite/gauche
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160)
            if(this.clavier.SHIFT.isDown && CDDash == true){
                this.player.setVelocityX(-800)
                setTimeout(() => {
                    CDDash = false
                }, 150);
                setTimeout(() => {
                    CDDash = true
                }, 3000);
            }
            
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            if(this.clavier.SHIFT.isDown && CDDash == true){
                this.player.setVelocityX(800)
                setTimeout(() => {
                    CDDash = false
                }, 150);
                setTimeout(() => {
                    CDDash = true
                }, 3000);
            }
        }
        else {
            this.player.setVelocityX(0)
        }
        // Haut/bas
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160)
            if(this.clavier.SHIFT.isDown && CDDash == true){
                this.player.setVelocityY(-800)
                setTimeout(() => {
                    CDDash = false
                }, 150);
                setTimeout(() => {
                    CDDash = true
                }, 3000);
            }
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160)
            if(this.clavier.SHIFT.isDown && CDDash == true){
                this.player.setVelocityY(800)
                setTimeout(() => {
                    CDDash = false
                }, 150);
                setTimeout(() => {
                    CDDash = true
                }, 3000);
            }
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