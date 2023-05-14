

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

class niveau4 extends Phaser.Scene {
    constructor() {
        super('niveau4');
        this.CanShoot = true;

    }

    init(data) {
    }
    preload() {
        this.load.tilemapTiledJSON("map4", "assets/niveau_4.json");
        this.load.image("tileset", "assets/placeholder.png");
        this.load.image("porte", "assets/porte.png");
        this.load.image("sol", "assets/sol_640x640_asterix.png");
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

        this.EnnemiUnFollow = false;
        // CREATE MAP
        this.map = this.add.tilemap("map4");
        this.add.image(64 * 6, 64 * 6, "sol")
        this.tileset = this.map.addTilesetImage(
            "placeholder",
            "tileset"
        );
        this.mur = this.map.createLayer(
            "mur",
            this.tileset
        );
        this.picsLv4 = this.map.createLayer(
            "pique",
            this.tileset
        );
        this.trouLv4 = this.map.createLayer(
            "trou",
            this.tileset
        );
        this.entree = this.map.createLayer(
            "porte",
            this.tileset
        );

        this.grpporte = this.physics.add.group({ immovable: true, allowGravity: false })
        this.porte = this.map.getObjectLayer("porte_sortie");
        this.porte.objects.forEach(coord => {
            this.grpporte.create(coord.x -32, coord.y + 32, "porte").angle = 180;
        });
        // GROUPE ENNEMIE
        this.GroupeEnnemi = this.physics.add.group({ immovable: true, allowGravity: false })
        this.GroupeEnnemi = this.physics.add.group({ immovable: true, allowGravity: false })
        this.EnnemiUn = this.GroupeEnnemi.create( 10 * 64 , 2 * 64, 'ennemie1');
        this.EnnemiUn_HP= 100

        this.EnnemiDeux = this.GroupeEnnemi.create( 9 * 64 , 2 * 64, 'ennemie1');
        this.EnnemiDeux_HP= 100

        this.EnnemiTrois = this.GroupeEnnemi.create( 8 * 64 , 9 * 64, 'ennemie1');
        this.EnnemiTrois_HP= 100


        this.mur.setCollisionByExclusion(-1, true);
        this.trouLv4.setCollisionByExclusion(-1, true);
        this.picsLv4.setCollisionByExclusion(-1, true);
        // SPAWN JOUEUR
        if (this.spawnx && this.spawny) {
            this.player = this.physics.add.sprite(this.spawnx, this.spawny, 'perso');
        }
        else {
            this.player = this.physics.add.sprite(2 * 64, 5 * 64, 'perso');
        }

        // Hitbox Coucou
        this.SpriteHitBoxun = this.physics.add.sprite(this.EnnemiUn.x , this.EnnemiUn.y, 'SpriteHitBox').setSize(256, 128);
        this.SpriteHitBoxdeux = this.physics.add.sprite(this.EnnemiDeux.x , this.EnnemiDeux.y, 'SpriteHitBox').setSize(256, 128);
        this.SpriteHitBoxtrois = this.physics.add.sprite(this.EnnemiTrois.x , this.EnnemiTrois.y, 'SpriteHitBox').setSize(256, 128);

        //CAMERA
        this.cameras.main.startFollow(this.player);
        //var camera = this.cameras.add(4*64, 4*64)
        //this.cameras.main.x = 4*64
        //this.cameras.main.y = 3*64

        //COLLIDER
        this.physics.add.collider(this.player, this.mur);
        
        this.physics.add.collider(this.player, this.grpporte, this.Niveau5, null, this);
        this.collide_trou = this.physics.add.collider(this.player, this.trouLv4);
        
        
        this.physics.add.collider(this.GroupeEnnemi, this.grpporte,);
        this.physics.add.collider(this.GroupeEnnemi, this.GroupeEnnemi,);
        this.physics.add.collider(this.GroupeEnnemi, this.mur,);
        this.physics.add.collider(this.GroupeEnnemi, this.obstacle,);
        this.physics.add.collider(this.player, this.picsLv4, this.touche_pique, null, this);



        this.physics.add.collider(this.player, this.GroupeEnnemi,);
        this.physics.add.overlap(this.SpriteHitBoxun, this.player, this.EnnemiUnAggro, null, this);
        this.physics.add.overlap(this.SpriteHitBoxdeux, this.player, this.EnnemiDeuxAggro, null, this);
        this.physics.add.overlap(this.SpriteHitBoxtrois, this.player, this.EnnemiTroisAggro, null, this);
        //INPUT
        this.cursors = this.input.keyboard.createCursorKeys();
        this.clavier = this.input.keyboard.addKeys('SHIFT,E');

        //GROUPE / UI
        this.shuriken = this.physics.add.group();
        this.physics.add.collider(this.shuriken, this.EnnemiUn, this.killun, null, this);
        this.physics.add.collider(this.shuriken, this.EnnemiDeux, this.killdeux, null, this);
        this.physics.add.collider(this.shuriken, this.EnnemiTrois, this.killtrois, null, this);
        this.HPbar = this.add.sprite(80, 20, "HP").setScrollFactor(0);
        this.fil = this.add.sprite(64 * 6, 64*14, "transi");
        this.fil.setAngle(90);
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

    }


    update() {

        if (this.EnnemiUnFollow == true && this.EnnemiUn_HP >0){
            this.EnnemiUn.setVelocityX(this.player.x - this.EnnemiUn.x);
            this.EnnemiUn.setVelocityY(this.player.y -this.EnnemiUn.y);
        }

        this.SpriteHitBoxun.x = this.EnnemiUn.x
        this.SpriteHitBoxun.y = this.EnnemiUn.y

        //Deplacements de l'ennemi Un
        if(this.EnnemiUn.x >= 640){
            this.EnnemiUn.setVelocityX(-100);
        }
        else if (this.EnnemiUn.x <= 128){
            this.EnnemiUn.setVelocityX(100);
        }

        






        if (this.EnnemiDeuxFollow == true && this.EnnemiDeux_HP >0){
            this.EnnemiDeux.setVelocityX(this.player.x - this.EnnemiDeux.x);
            this.EnnemiDeux.setVelocityY(this.player.y -this.EnnemiDeux.y);
        }

        this.SpriteHitBoxdeux.x = this.EnnemiDeux.x
        this.SpriteHitBoxdeux.y = this.EnnemiDeux.y

        //Deplacements de l'ennemi Un
        if(this.EnnemiDeux.y >= 300){
            this.EnnemiDeux.setVelocityY(-100);
        }
        else if (this.EnnemiDeux.y <= 200){
            this.EnnemiDeux.setVelocityY(100);
        }





        if (this.EnnemiTroisFollow == true && this.EnnemiTrois_HP >0){
            this.EnnemiTrois.setVelocityX(this.player.x - this.EnnemiTrois.x);
            this.EnnemiTrois.setVelocityY(this.player.y -this.EnnemiTrois.y);
        }

        this.SpriteHitBoxtrois.x = this.EnnemiTrois.x
        this.SpriteHitBoxtrois.y = this.EnnemiTrois.y

        //Deplacements de l'ennemi Un
        if(this.EnnemiTrois.x >= 500){
            this.EnnemiTrois.setVelocityX(-100);
        }
        else if (this.EnnemiTrois.x <= 128){
            this.EnnemiTrois.setVelocityX(100);
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
    killun(shu, ene) {
        if(this.EnnemiUn_HP > 0){
            console.log(this.EnnemiUn_HP)
            this.EnnemiUn_HP -= degat;
            console.log(this.EnnemiUnFollow)
        }else{
            this.EnnemiUnFollow = false
            this.SpriteHitBoxun.destroy();
            this.EnnemiUn.destroy();
            //salut
        
        }
        ene.destroy()
        console.log("j'ai detruit le shuriken")
       
        
    }

    killdeux(shu, ene) {
        if(this.EnnemiDeux_HP > 0){
            console.log(this.EnnemiDeux_HP)
            this.EnnemiUn_HP -= degat;
            console.log(this.EnnemiDeuxFollow)
        }else{
            this.EnnemiDeuxFollow = false
            this.SpriteHitBoxdeux.destroy();
            this.EnnemiDeux.destroy();
            //salut
        
        }
        ene.destroy()
        console.log("j'ai detruit le shuriken")
       
        
    }

    killtrois(shu, ene) {
        if(this.EnnemiTrois_HP > 0){
            console.log(this.EnnemiTrois_HP)
            this.EnnemiTrois_HP -= degat;
            console.log(this.EnnemiTroisFollow)
        }else{
            this.EnnemiTroisFollow = false
            this.SpriteHitBoxtrois.destroy();
            this.EnnemiDeux.destroy();
            //salut
        
        }
        ene.destroy()
        console.log("j'ai detruit le shuriken")
       
        
    }

    touche_pique() {
        console.log("aie");
        if (HP > 0) {
            HP -= 25
        }
    }


    Niveau5() {
        this.fil.anims.play('transi1')
        setTimeout(() => {
            this.scene.start('niveau5')
        }, 1000);

    }
    
    EnnemiUnAggro(player, SpriteHitBoxun){
        this.EnnemiUnFollow = true;

        
    }

    EnnemiDeuxAggro(player, SpriteHitBoxdeux){
        this.EnnemiDeuxFollow = true;

        
    }

    EnnemiTroisAggro(player, SpriteHitBoxtrois){
        this.EnnemiTroisFollow = true;

        
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
