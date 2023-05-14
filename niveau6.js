

var CDDash = true
var HPmax = 100
var HP = 100
var degat = 34
var vitessedep = 1
var vitessedatk = 1
var speedatk = 1
var overcloack = false;
var cg = false;
var alim = false;
var watercooling = false;
var cpu = false;
var ventilo = false;
var ram = false;
var coinsCollected = 0
var depth = false

class niveau6 extends Phaser.Scene {
    constructor() {
        super('niveau6');
        this.CanShoot = true;

    }

    init(data) {
    }
    preload() {
        this.load.tilemapTiledJSON("map6", "assets/niveau_6.json");
        this.load.image("tileset", "assets/placeholder.png");
        this.load.image("porte", "assets/porte.png");
        this.load.image("sol", "assets/sol_1280x1280_kaamelot.png");
        this.load.spritesheet('perso', "assets/spritepotagoniste.png", { frameWidth: 47, frameHeight: 61 })
        this.load.spritesheet('shuriken', 'assets/Shuriken-sheet.png', { frameWidth: 16, frameHeight: 16 })
        this.load.spritesheet('HP', 'assets/HPBar180x37.png', { frameWidth: 180, frameHeight: 37 })
        this.load.spritesheet('transi', 'assets/transiPortes_256x128.png', { frameWidth: 256, frameHeight: 128 })
        this.load.spritesheet('heal', 'assets/corbeille.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('coin', 'assets/2coin.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('4090', 'assets/4090rtx.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('avast', 'assets/Avast.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('overcloacking', 'assets/Overclocking.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('ssd', 'assets/discCitem.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('proco', 'assets/Processeur.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('RAM', 'assets/RAM.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('sata', 'assets/Satacable.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('ventilo', 'assets/Ventilateur.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('watercooling', 'assets/Watercooling.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('ennemie1', 'mechant/spriteun.png', { frameWidth: 40, frameHeight: 40 })

        this.load.image("SpriteHitBox", "assets/SpriteHitBox.png");
    }

    create() {

        this.EnnemiUnFollow = false;
        this.EnnemiDeuxFollow = false;
        this.EnnemiTroisFollow = false;
        this.EnnemiQuatreFollow = false;
        this.EnnemiCinqFollow = false;
        this.EnnemiSixFollow = false;
        this.EnnemiSeptFollow = false;
        this.EnnemiHuitFollow = false;
        this.EnnemiNeufFollow = false;
        // CREATE MAP
        this.map = this.add.tilemap("map6");
        this.add.image(64 * 11, 64 * 11, "sol")
        this.tileset = this.map.addTilesetImage(
            "placeholder",
            "tileset"
        );
        this.mur = this.map.createLayer(
            "mur",
            this.tileset
        );

        this.trouLv6 = this.map.createLayer(
            "trou",
            this.tileset
        );
        this.entree = this.map.createLayer(
            "porte",
            this.tileset
        );

        this.grpcoin = this.physics.add.group({ immovable: true, allowGravity: false })
        this.coin = this.map.getObjectLayer("coin");
        this.coin.objects.forEach(coord => {
            this.grpcoin.create(coord.x + 32, coord.y - 32, "coin");
        });

        this.grpporte = this.physics.add.group({ immovable: true, allowGravity: false })
        this.porte = this.map.getObjectLayer("porte_sortie");
        this.porte.objects.forEach(coord => {
            this.grpporte.create(coord.x + 32, coord.y + 32, "porte").angle = 90;
        });

        // GROUPE ENNEMIE
        this.GroupeEnnemi = this.physics.add.group({ immovable: true, allowGravity: false })
        this.EnnemiUn = this.GroupeEnnemi.create(20 * 64, 2 * 64, 'ennemie1');
        this.EnnemiUn_HP = 100

        this.EnnemiDeux = this.GroupeEnnemi.create(19 * 64, 2 * 64, 'ennemie1');
        this.EnnemiDeux_HP = 100

        this.EnnemiTrois = this.GroupeEnnemi.create(18 * 64, 2 * 64, 'ennemie1');
        this.EnnemiTrois_HP = 100

        this.EnnemiQuatre = this.GroupeEnnemi.create(20 * 64, 3 * 64, 'ennemie1');
        this.EnnemiQuatre_HP = 100

        this.EnnemiCinq = this.GroupeEnnemi.create(19 * 64, 3 * 64, 'ennemie1');
        this.EnnemiCinq_HP = 100

        this.EnnemiSix = this.GroupeEnnemi.create(18 * 64, 3 * 64, 'ennemie1');
        this.EnnemiSix_HP = 100

        this.EnnemiSept = this.GroupeEnnemi.create(20 * 64, 4 * 64, 'ennemie1');
        this.EnnemiSept_HP = 100

        this.EnnemiHuit = this.GroupeEnnemi.create(19 * 64, 4 * 64, 'ennemie1');
        this.EnnemiHuit_HP = 100

        this.EnnemiNeuf = this.GroupeEnnemi.create(18 * 64, 4 * 64, 'ennemie1');
        this.EnnemiNeuf_HP = 100


        this.GroupeEnnemi.setDepth(-1);
        //const ennemies = this.createEnemies()


        this.mur.setCollisionByExclusion(-1, true);
        this.trouLv6.setCollisionByExclusion(-1, true);

        this.entree.setCollisionByExclusion(-1, true);

        // SPAWN JOUEUR
        if (this.spawnx && this.spawny) {
            this.player = this.physics.add.sprite(this.spawnx, this.spawny, 'perso');
        }
        else {
            this.player = this.physics.add.sprite(2 * 64, 5 * 64, 'perso');
        }

        // Hitbox Coucou
        this.SpriteHitBox = this.physics.add.sprite(this.EnnemiUn.x, this.EnnemiUn.y, 'SpriteHitBox').setSize(1280, 1280);
        this.SpriteHitBox2 = this.physics.add.sprite(this.EnnemiDeux.x, this.EnnemiDeux.y, 'SpriteHitBox').setSize(1280, 1280);
        this.SpriteHitBox3 = this.physics.add.sprite(this.EnnemiTrois.x, this.EnnemiTrois.y, 'SpriteHitBox').setSize(1280, 1280);
        this.SpriteHitBox4 = this.physics.add.sprite(this.EnnemiQuatre.x, this.EnnemiQuatre.y, 'SpriteHitBox').setSize(1280, 1280);
        this.SpriteHitBox5 = this.physics.add.sprite(this.EnnemiCinq.x, this.EnnemiCinq.y, 'SpriteHitBox').setSize(1280, 1280);
        this.SpriteHitBox6 = this.physics.add.sprite(this.EnnemiSix.x, this.EnnemiSix.y, 'SpriteHitBox').setSize(1280, 1280);
        this.SpriteHitBox7 = this.physics.add.sprite(this.EnnemiSept.x, this.EnnemiSept.y, 'SpriteHitBox').setSize(1280, 1280);
        this.SpriteHitBox8 = this.physics.add.sprite(this.EnnemiHuit.x, this.EnnemiHuit.y, 'SpriteHitBox').setSize(1280, 1280);
        this.SpriteHitBox9 = this.physics.add.sprite(this.EnnemiNeuf.x, this.EnnemiNeuf.y, 'SpriteHitBox').setSize(1280, 1280);


        //CAMERA
        this.cameras.main.startFollow(this.player);
        //var camera = this.cameras.add(4*64, 4*64)
        //this.cameras.main.x = 4*64
        //this.cameras.main.y = 3*64

        //COLLIDER
        this.physics.add.collider(this.player, this.mur);

        this.physics.add.collider(this.player, this.entree);

        this.physics.add.collider(this.player, this.grpporte, this.Niveau7, null, this);
        this.collide_trou = this.physics.add.collider(this.player, this.trouLv6);
        this.physics.add.collider(this.GroupeEnnemi, this.mur,);
        this.physics.add.collider(this.GroupeEnnemi, this.trouLv6,);

        this.physics.add.collider(this.GroupeEnnemi, this.grpporte,);
        this.physics.add.collider(this.GroupeEnnemi, this.GroupeEnnemi,);

        this.physics.add.overlap(this.player, this.grpcoin, this.touche_coin, this.RushEnnemies, null, this);




        this.physics.add.collider(this.player, this.GroupeEnnemi,);


        this.physics.add.overlap(this.SpriteHitBox, this.player, this.EnnemiUnAggro, null, this);
        this.physics.add.overlap(this.SpriteHitBox2, this.player, this.EnnemiDeuxAggro, null, this);
        this.physics.add.overlap(this.SpriteHitBox3, this.player, this.EnnemiTroisAggro, null, this);
        this.physics.add.overlap(this.SpriteHitBox4, this.player, this.EnnemiQuatreAggro, null, this);
        this.physics.add.overlap(this.SpriteHitBox5, this.player, this.EnnemiCinqAggro, null, this);
        this.physics.add.overlap(this.SpriteHitBox6, this.player, this.EnnemiSixAggro, null, this);
        this.physics.add.overlap(this.SpriteHitBox7, this.player, this.EnnemiSeptAggro, null, this);
        this.physics.add.overlap(this.SpriteHitBox8, this.player, this.EnnemiHuitAggro, null, this);
        this.physics.add.overlap(this.SpriteHitBox9, this.player, this.EnnemiNeufAggro, null, this);
        //INPUT
        this.cursors = this.input.keyboard.createCursorKeys();
        this.clavier = this.input.keyboard.addKeys('SHIFT,E,O');

        //GROUPE / UI
        this.shuriken = this.physics.add.group();
        this.physics.add.collider(this.shuriken, this.EnnemiUn, this.kill, null, this);
        this.physics.add.collider(this.shuriken, this.EnnemiDeux, this.kill2, null, this);
        this.physics.add.collider(this.shuriken, this.EnnemiTrois, this.kill3, null, this);
        this.physics.add.collider(this.shuriken, this.EnnemiQuatre, this.kill4, null, this);
        this.physics.add.collider(this.shuriken, this.EnnemiCinq, this.kill5, null, this);
        this.physics.add.collider(this.shuriken, this.EnnemiSix, this.kill6, null, this);
        this.physics.add.collider(this.shuriken, this.EnnemiSept, this.kill7, null, this);
        this.physics.add.collider(this.shuriken, this.EnnemiHuit, this.kill8, null, this);
        this.physics.add.collider(this.shuriken, this.EnnemiNeuf, this.kill9, null, this);

        this.HPbar = this.add.sprite(80, 20, "HP").setScrollFactor(0);
        this.fil = this.add.sprite(64 * 24, 64 * 11, "transi");
        this.fil.setAngle(0);
        //ANIMATIONS
        this.anims.create({
            key: 'vie1',
            frames: this.anims.generateFrameNumbers('HP', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'vie2',
            frames: this.anims.generateFrameNumbers('HP', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'vie3',
            frames: this.anims.generateFrameNumbers('HP', { start: 2, end: 2 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'vie4',
            frames: this.anims.generateFrameNumbers('HP', { start: 3, end: 3 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'vie5',
            frames: this.anims.generateFrameNumbers('HP', { start: 4, end: 4 }),
            frameRate: 1,
            repeat: -1
        });
        // ANIMATION SHURIKEN
        this.anims.create({
            key: 'shu',
            frames: this.anims.generateFrameNumbers('shuriken', { start: 0, end: 3 }),
            frameRate: 10,
        });

        this.anims.create({
            key: 'anim droite',
            frames: this.anims.generateFrameNumbers('perso', { start: 14, end: 20 }),
            frameRate: 10,
        })
        this.anims.create({
            key: 'anim gauche',
            frames: this.anims.generateFrameNumbers('perso', { start: 21, end: 27 }),
            frameRate: 10,
        })
        this.anims.create({
            key: 'anim face',
            frames: this.anims.generateFrameNumbers('perso', { start: 0, end: 6 }),
            frameRate: 10,
        })
        this.anims.create({
            key: 'anim dos',
            frames: this.anims.generateFrameNumbers('perso', { start: 7, end: 13 }),
            frameRate: 10,
        })
        //ANIMATION FIL
        this.anims.create({
            key: 'transi1',
            frames: this.anims.generateFrameNumbers('transi', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'transi2',
            frames: this.anims.generateFrameNumbers('transi', { start: 7, end: 0 }),
            frameRate: 8,
            repeat: -1
        });
        // ANIMATION COIN
        this.anims.create({
            key: 'coin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        })
        this.grpcoin.getChildren().forEach(function (child) {
            child.anims.play('coin', true)
        }, this)

    }


    update() {
        //OVERCLOCKING

        if(this.clavier.O.isDown && canOC == true){
            OCing= 2
            canOC=false
            setTimeout(() => {
                OCing = 1
            }, 10000);
            setTimeout(() => { 
                canOC=true
            }, 70000);
        }

        if (depth == true) {
            this.GroupeEnnemi.setDepth(+1);
        }

        if (this.EnnemiUnFollow == true && this.EnnemiUn_HP > 0) {
            this.EnnemiUn.setVelocityX(this.player.x - this.EnnemiUn.x);
            this.EnnemiUn.setVelocityY(this.player.y - this.EnnemiUn.y);
        }

        this.SpriteHitBox.x = this.EnnemiUn.x
        this.SpriteHitBox.y = this.EnnemiUn.y
        this.SpriteHitBox2.x = this.EnnemiDeux.x
        this.SpriteHitBox2.y = this.EnnemiDeux.y
        this.SpriteHitBox3.x = this.EnnemiTrois.x
        this.SpriteHitBox3.y = this.EnnemiTrois.y
        this.SpriteHitBox4.x = this.EnnemiQuatre.x
        this.SpriteHitBox4.y = this.EnnemiQuatre.y
        this.SpriteHitBox5.x = this.EnnemiCinq.x
        this.SpriteHitBox5.y = this.EnnemiCinq.y
        this.SpriteHitBox6.x = this.EnnemiSix.x
        this.SpriteHitBox6.y = this.EnnemiSix.y
        this.SpriteHitBox7.x = this.EnnemiSept.x
        this.SpriteHitBox7.y = this.EnnemiSept.y
        this.SpriteHitBox8.x = this.EnnemiHuit.x
        this.SpriteHitBox8.y = this.EnnemiHuit.y
        this.SpriteHitBox9.x = this.EnnemiNeuf.x
        this.SpriteHitBox9.y = this.EnnemiNeuf.y

        //Deplacements de l'ennemi Un
        if (this.EnnemiUn.x >= 640) {
            this.EnnemiUn.setVelocityX(-100);
        }
        else if (this.EnnemiUn.x <= 128) {
            this.EnnemiUn.setVelocityX(100);
        }

        if (this.EnnemiDeuxFollow == true && this.EnnemiDeux_HP > 0) {
            this.EnnemiDeux.setVelocityX(this.player.x - this.EnnemiDeux.x);
            this.EnnemiDeux.setVelocityY(this.player.y - this.EnnemiDeux.y);
        }

        this.SpriteHitBox.x = this.EnnemiDeux.x
        this.SpriteHitBox.y = this.EnnemiDeux.y

        //Deplacements de l'ennemi Un
        if (this.EnnemiDeux.x >= 640) {
            this.EnnemiDeux.setVelocityX(-100);
        }
        else if (this.EnnemiDeux.x <= 128) {
            this.EnnemiDeux.setVelocityX(100);
        }

        if (this.EnnemiTroisFollow == true && this.EnnemiTrois_HP > 0) {
            this.EnnemiTrois.setVelocityX(this.player.x - this.EnnemiTrois.x);
            this.EnnemiTrois.setVelocityY(this.player.y - this.EnnemiTrois.y);
        }

        this.SpriteHitBox.x = this.EnnemiTrois.x
        this.SpriteHitBox.y = this.EnnemiTrois.y

        //Deplacements de l'ennemi Un
        if (this.EnnemiTrois.x >= 640) {
            this.EnnemiTrois.setVelocityX(-100);
        }
        else if (this.EnnemiTrois.x <= 128) {
            this.EnnemiTrois.setVelocityX(100);
        }

        if (this.EnnemiQuatreFollow == true && this.EnnemiQuatre_HP > 0) {
            this.EnnemiQuatre.setVelocityX(this.player.x - this.EnnemiQuatre.x);
            this.EnnemiQuatre.setVelocityY(this.player.y - this.EnnemiQuatre.y);
        }

        this.SpriteHitBox.x = this.EnnemiQuatre.x
        this.SpriteHitBox.y = this.EnnemiQuatre.y

        //Deplacements de l'ennemi Un
        if (this.EnnemiQuatre.x >= 640) {
            this.EnnemiQuatre.setVelocityX(-100);
        }
        else if (this.EnnemiQuatre.x <= 128) {
            this.EnnemiQuatre.setVelocityX(100);
        }

        if (this.EnnemiCinqFollow == true && this.EnnemiCinq_HP > 0) {
            this.EnnemiCinq.setVelocityX(this.player.x - this.EnnemiCinq.x);
            this.EnnemiCinq.setVelocityY(this.player.y - this.EnnemiCinq.y);
        }

        this.SpriteHitBox.x = this.EnnemiCinq.x
        this.SpriteHitBox.y = this.EnnemiCinq.y

        //Deplacements de l'ennemi Un
        if (this.EnnemiCinq.x >= 640) {
            this.EnnemiCinq.setVelocityX(-100);
        }
        else if (this.EnnemiCinq.x <= 128) {
            this.EnnemiCinq.setVelocityX(100);
        }

        if (this.EnnemiSixFollow == true && this.EnnemiSix_HP > 0) {
            this.EnnemiSix.setVelocityX(this.player.x - this.EnnemiSix.x);
            this.EnnemiSix.setVelocityY(this.player.y - this.EnnemiSix.y);
        }

        this.SpriteHitBox.x = this.EnnemiSix.x
        this.SpriteHitBox.y = this.EnnemiSix.y

        //Deplacements de l'ennemi Un
        if (this.EnnemiSix.x >= 640) {
            this.EnnemiSix.setVelocityX(-100);
        }
        else if (this.EnnemiSix.x <= 128) {
            this.EnnemiSix.setVelocityX(100);
        }

        if (this.EnnemiSeptFollow == true && this.EnnemiSept_HP > 0) {
            this.EnnemiSept.setVelocityX(this.player.x - this.EnnemiSept.x);
            this.EnnemiSept.setVelocityY(this.player.y - this.EnnemiSept.y);
        }

        this.SpriteHitBox.x = this.EnnemiSept.x
        this.SpriteHitBox.y = this.EnnemiSept.y

        //Deplacements de l'ennemi Un
        if (this.EnnemiSept.x >= 640) {
            this.EnnemiSept.setVelocityX(-100);
        }
        else if (this.EnnemiSept.x <= 128) {
            this.EnnemiSept.setVelocityX(100);
        }

        if (this.EnnemiHuitFollow == true && this.EnnemiHuit_HP > 0) {
            this.EnnemiHuit.setVelocityX(this.player.x - this.EnnemiHuit.x);
            this.EnnemiHuit.setVelocityY(this.player.y - this.EnnemiHuit.y);
        }

        this.SpriteHitBox.x = this.EnnemiHuit.x
        this.SpriteHitBox.y = this.EnnemiHuit.y

        //Deplacements de l'ennemi Un
        if (this.EnnemiHuit.x >= 640) {
            this.EnnemiHuit.setVelocityX(-100);
        }
        else if (this.EnnemiHuit.x <= 128) {
            this.EnnemiHuit.setVelocityX(100);
        }

        if (this.EnnemiNeufFollow == true && this.EnnemiNeuf_HP > 0) {
            this.EnnemiNeuf.setVelocityX(this.player.x - this.EnnemiNeuf.x);
            this.EnnemiNeuf.setVelocityY(this.player.y - this.EnnemiNeuf.y);
        }

        this.SpriteHitBox.x = this.EnnemiNeuf.x
        this.SpriteHitBox.y = this.EnnemiNeuf.y

        //Deplacements de l'ennemi Un
        if (this.EnnemiNeuf.x >= 640) {
            this.EnnemiNeuf.setVelocityX(-100);
        }
        else if (this.EnnemiNeuf.x <= 128) {
            this.EnnemiNeuf.setVelocityX(100);
        }







        //                           DEPLACEMENT JOUEUR
        // Droite/gauche
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160 * vitessedep*OCing)
            this.player.anims.play('anim gauche', true)
            if (this.clavier.SHIFT.isDown && CDDash == true) {
                this.player.setVelocityX(-800)
                this.collide_trou.active = false
                setTimeout(() => {
                    CDDash = false
                    this.collide_trou.active = true
                }, 150);
                setTimeout(() => {
                    CDDash = true
                }, 3000);
            }

        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160 * vitessedep*OCing);
            this.player.anims.play('anim droite', true)
            if (this.clavier.SHIFT.isDown && CDDash == true) {
                this.player.setVelocityX(800)
                this.collide_trou.active = false
                setTimeout(() => {
                    this.collide_trou.active = true
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
            this.player.setVelocityY(-160 * vitessedep*OCing)
            this.player.anims.play('anim dos', true)
            if (this.clavier.SHIFT.isDown && CDDash == true) {
                this.player.setVelocityY(-800)
                this.collide_trou.active = false
                setTimeout(() => {
                    this.collide_trou.active = true
                    CDDash = false
                }, 150);
                setTimeout(() => {
                    CDDash = true
                }, 3000);
            }
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160 * vitessedep*OCing)
            this.player.anims.play('anim face', true)
            if (this.clavier.SHIFT.isDown && CDDash == true) {
                this.player.setVelocityY(800)
                this.collide_trou.active = false
                setTimeout(() => {
                    this.collide_trou.active = true
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


        //BARRE HP
        if (HP == 0) { this.HPbar.anims.play("vie1") }
        if (HP == 25) { this.HPbar.anims.play("vie2") }
        if (HP == 50) { this.HPbar.anims.play("vie3") }
        if (HP == 75) { this.HPbar.anims.play("vie4") }
        if (HP == 100) { this.HPbar.anims.play("vie5") }

        //shoot

        if (this.clavier.E.isDown && this.CanShoot == true) {
            if (this.cursors.right.isDown) {
                this.shuriken.create(this.player.x + 50, this.player.y, "shuriken").setVelocityX(475 * speedatk);
            }
            else if (this.cursors.left.isDown) {
                this.shuriken.create(this.player.x - 50, this.player.y, "shuriken").setVelocityX(-475 * speedatk);
            }
            else if (this.cursors.up.isDown) {
                this.shuriken.create(this.player.x, this.player.y - 50, "shuriken").setVelocityY(-475 * speedatk);
            }
            else if (this.cursors.down.isDown) {
                this.shuriken.create(this.player.x, this.player.y + 50, "shuriken").setVelocityY(475 * speedatk);
            }
            this.CanShoot = false;
            setTimeout(() => {
                this.CanShoot = true;
            }, 500 * vitessedatk);
        }
        this.shuriken.getChildren().forEach(function (child) {
            child.anims.play('shu', true)
        }, this)

        //this.ennemies.getChildren().forEach(function (petitUn) {
        //    if (Phaser.Math.Distance.Between(petitUn.x, petitUn.y, this.player.x, this.player.y) < 250) {
        //        this.ennemie1.deplacement(petitUn.x, petitUn.y, this.player.x, this.player.y)
        //    }
        //    else {
        //        this.ennemie1.deplacement(0, 0, 0, 0)
        //    }
        //},)

    }
    kill(shu, ene) {
        if (this.EnnemiUn_HP > 0) {
            console.log(this.EnnemiUn_HP)
            this.EnnemiUn_HP -= degat;
            console.log(this.EnnemiUnFollow)
        } else {
            this.EnnemiUnFollow = false
            this.SpriteHitBox.destroy();
            this.EnnemiUn.destroy();
            //salut
        }
        ene.destroy()
    }
    kill2(shu, ene) {
        if (this.EnnemiDeux_HP > 0) {
            console.log(this.EnnemiDeux_HP)
            this.EnnemiDeux_HP -= degat;
            console.log(this.EnnemiDeuxFollow)
        } else {
            this.EnnemiDeuxFollow = false
            this.SpriteHitBox2.destroy();
            this.EnnemiDeux.destroy();
            //salut
        }
        ene.destroy()
    }
    kill3(shu, ene) {
        if (this.EnnemiTrois_HP > 0) {
            console.log(this.EnnemiTrois_HP)
            this.EnnemiTrois_HP -= degat;
            console.log(this.EnnemiTroisFollow)
        } else {
            this.EnnemiTroisFollow = false
            this.SpriteHitBox3.destroy();
            this.EnnemiTrois.destroy();
            //salut
        }
        ene.destroy()
    }
    kill4(shu, ene) {
        if (this.EnnemiQuatre_HP > 0) {
            console.log(this.EnnemiQuatre_HP)
            this.EnnemiQuatre_HP -= degat;
            console.log(this.EnnemiQuatreFollow)
        } else {
            this.EnnemiQuatreFollow = false
            this.SpriteHitBox4.destroy();
            this.EnnemiQuatre.destroy();
            //salut
        }
        ene.destroy()
    }
    kill5(shu, ene) {
        if (this.EnnemiCinq_HP > 0) {
            console.log(this.EnnemiCinq_HP)
            this.EnnemiCinq_HP -= degat;
            console.log(this.EnnemiCinqFollow)
        } else {
            this.EnnemiCinqFollow = false
            this.SpriteHitBox5.destroy();
            this.EnnemiCinq.destroy();
            //salut
        }
        ene.destroy()
    }
    kill6(shu, ene) {
        if (this.EnnemiSix_HP > 0) {
            console.log(this.EnnemiUn_HP)
            this.EnnemiSix_HP -= degat;
            console.log(this.EnnemiUnFollow)
        } else {
            this.EnnemiSixFollow = false
            this.SpriteHitBox6.destroy();
            this.EnnemiSix.destroy();
            //salut
        }
        ene.destroy()
    }
    kill7(shu, ene) {
        if (this.EnnemiSept_HP > 0) {
            console.log(this.EnnemiUn_HP)
            this.EnnemiSept_HP -= degat;
            console.log(this.EnnemiUnFollow)
        } else {
            this.EnnemiSeptFollow = false
            this.SpriteHitBox7.destroy();
            this.EnnemiSept.destroy();
            //salut
        }
        ene.destroy()
    }
    kill8(shu, ene) {
        if (this.EnnemiHuit_HP > 0) {
            console.log(this.EnnemiUn_HP)
            this.EnnemiHuit_HP -= degat;
            console.log(this.EnnemiUnFollow)
        } else {
            this.EnnemiHuitFollow = false
            this.SpriteHitBox8.destroy();
            this.EnnemiHuit.destroy();
            //salut
        }
        ene.destroy()
    }
    kill9(shu, ene) {
        if (this.EnnemiNeuf_HP > 0) {
            console.log(this.EnnemiUn_HP)
            this.EnnemiNeuf_HP -= degat;
            console.log(this.EnnemiUnFollow)
        } else {
            this.EnnemiNeufFollow = false
            this.SpriteHitBox9.destroy();
            this.EnnemiNeuf.destroy();
            //salut
        }
        ene.destroy()
    }

    Niveau7() {
        this.fil.anims.play('transi1')
        setTimeout(() => {
            this.scene.start('niveau7')
        }, 1000);

    }
    EnnemiUnAggro(player, SpriteHitBox) {
        this.EnnemiUnFollow = true;


    }
    EnnemiDeuxAggro(player, SpriteHitBox) {
        this.EnnemiDeuxFollow = true;


    }
    EnnemiTroisAggro(player, SpriteHitBox) {
        this.EnnemiTroisFollow = true;


    }
    EnnemiQuatreAggro(player, SpriteHitBox) {
        this.EnnemiQuatreFollow = true;


    }
    EnnemiCinqAggro(player, SpriteHitBox) {
        this.EnnemiCinqFollow = true;


    }
    EnnemiSixAggro(player, SpriteHitBox) {
        this.EnnemiSixFollow = true;


    }
    EnnemiSeptAggro(player, SpriteHitBox) {
        this.EnnemiSeptFollow = true;


    }
    EnnemiHuitAggro(player, SpriteHitBox) {
        this.EnnemiHuitFollow = true;


    }
    EnnemiNeufAggro(player, SpriteHitBox) {
        this.EnnemiNeufFollow = true;


    }

    touche_coin(player, coincoin) {
        coin += 1
        coincoin.destroy()
    }


    createEnemies() {
        const ennemies = this.physics.add.group();
        for (var i = 0; i < 3; i++) {
            let ennemie1 = null;
            ennemie1 = new Enemy(this, i * 128, 196, 'ennemie1');
            console.log("mdr")
            console.log(ennemie1.x)
            console.log(ennemie1.y)
            ennemies.add(ennemie1)
            //individu.body.velocity.y = 100; // Ajouter une vitesse à l'individu
        }

        return ennemies;
    }

    RushEnnemies(player, coincoin) {
        coinsCollected += 1
        if (coinsCollected == 24) {
            depth = true
            console.log(depth)
        }
    }
    take_damage() {
        if (invulnerability == false) {
            if (OCing == 2) {
                HP -= 25 * 2
            }
            else if (OCing == 1) {
                HP -= 25
            }
            invulnerability = true
            setTimeout(() => {
                invulnerability = false
            }, 750);
        }

        if (HP <= 0) {
            this.scene.start("fin")
        }
    }
}
