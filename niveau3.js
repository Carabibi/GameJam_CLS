

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

class niveau3 extends Phaser.Scene {
    constructor() {
        super('niveau3');
        this.CanShoot = true;

    }

    init(data) {
    }
    preload() {
        this.load.tilemapTiledJSON("map3", "assets/niveau_3.json");
        this.load.image("tileset", "assets/placeholder.png");
        this.load.image("porte", "assets/porte.png");
        this.load.image("solGrand", "assets/sol_1280x1280_kaamelot.png");
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
        // CREATE MAP
        this.map = this.add.tilemap("map3");
        this.add.image(64 * 11, 64 * 11, "solGrand")
        this.tileset = this.map.addTilesetImage(
            "placeholder",
            "tileset"
        );
        this.mur = this.map.createLayer(
            "mur",
            this.tileset
        );
        this.obstacle = this.map.createLayer(
            "obstacle",
            this.tileset
        );
        this.picsLv3 = this.map.createLayer(
            "pique",
            this.tileset
        );
        this.trouLv3 = this.map.createLayer(
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
            this.grpporte.create(coord.x +32 , coord.y + 32, "porte").angle = 90;
        });


        this.grpcoin = this.physics.add.group({ immovable: true, allowGravity: false })
        this.coin = this.map.getObjectLayer("coin");
        this.coin.objects.forEach(coord => {
            this.grpcoin.create(coord.x + 32, coord.y - 32, "coin");
        });

        this.grpheal = this.physics.add.group({ immovable: true, allowGravity: false })
        this.heal = this.map.getObjectLayer("heal");
        this.heal.objects.forEach(coord => {
            this.grpheal.create(coord.x + 32, coord.y - 32, "heal");
        });

        this.mur.setCollisionByExclusion(-1, true);
        this.trouLv3.setCollisionByExclusion(-1, true);
        this.picsLv3.setCollisionByExclusion(-1, true);


        // GROUPE ENNEMIE
        this.GroupeEnnemi = this.physics.add.group({ immovable: true, allowGravity: false })
        this.EnnemiUn = this.GroupeEnnemi.create( 19 * 64 , 2 * 64, 'ennemie1');
        this.EnnemiDeux = this.GroupeEnnemi.create( 19 * 64 , 19 * 64, 'ennemie1');
        this.EnnemiTrois = this.GroupeEnnemi.create( 2 * 64 , 2 * 64, 'ennemie1');
        this.EnnemiQuatre = this.GroupeEnnemi.create( 2 * 64 , 19 * 64, 'ennemie1');
        this.EnnemiUn_HP= 100 ;
        this.EnnemiDeux_HP = 100 ;
        this.EnnemiTrois_HP= 100 ;
        this.EnnemiQuatre_HP = 100 ;

        //const ennemies = this.createEnemies()


        this.mur.setCollisionByExclusion(-1, true);
        this.obstacle.setCollisionByExclusion(-1, true);
        

        // SPAWN JOUEUR
        if (this.spawnx && this.spawny) {
            this.player = this.physics.add.sprite(this.spawnx, this.spawny, 'perso');
        }
        else {
            this.player = this.physics.add.sprite(2 * 64, 5 * 64, 'perso');
        }

        // Hitbox Coucou
        this.SpriteHitBoxUn = this.physics.add.sprite(this.EnnemiUn.x , this.EnnemiUn.y, 'SpriteHitBox').setSize(256, 128);
        this.SpriteHitBoxDeux = this.physics.add.sprite(this.EnnemiDeux.x , this.EnnemiDeux.y, 'SpriteHitBox').setSize(256, 128);
        this.SpriteHitBoxTrois = this.physics.add.sprite(this.EnnemiTrois.x , this.EnnemiTrois.y, 'SpriteHitBox').setSize(256, 128);
        this.SpriteHitBoxQuatre = this.physics.add.sprite(this.EnnemiQuatre.x , this.EnnemiQuatre.y, 'SpriteHitBox').setSize(256, 128);

        //CAMERA
        this.cameras.main.startFollow(this.player);
        //var camera = this.cameras.add(4*64, 4*64)
        //this.cameras.main.x = 4*64
        //this.cameras.main.y = 3*64

        //COLLIDER
        this.physics.add.collider(this.player, this.mur);
        this.physics.add.collider(this.player, this.obstacle);
        this.physics.add.collider(this.player, this.grpporte, this.Niveau4, null, this);
        this.physics.add.collider(this.GroupeEnnemi, this.mur,);
        this.physics.add.collider(this.GroupeEnnemi, this.obstacle,);
        this.collide_trou = this.physics.add.collider(this.player, this.trouLv3);
        this.physics.add.collider(this.GroupeEnnemi, this.grpporte,);
        this.physics.add.collider(this.GroupeEnnemi, this.GroupeEnnemi,);
        this.physics.add.collider(this.player, this.picsLv3, this.touche_pique, null, this);



        this.physics.add.collider(this.player, this.GroupeEnnemi,);
        this.physics.add.overlap(this.SpriteHitBoxUn, this.player, this.EnnemiUnAggro, null, this);
        this.physics.add.overlap(this.SpriteHitBoxDeux, this.player, this.EnnemiDeuxAggro, null, this);
        this.physics.add.overlap(this.SpriteHitBoxTrois, this.player, this.EnnemiTroisAggro, null, this);
        this.physics.add.overlap(this.SpriteHitBoxQuatre, this.player, this.EnnemiQuatreAggro, null, this);
        //INPUT
        this.cursors = this.input.keyboard.createCursorKeys();
        this.clavier = this.input.keyboard.addKeys('SHIFT,E');

        //GROUPE / UI
        this.shuriken = this.physics.add.group();
        this.physics.add.collider(this.shuriken, this.EnnemiUn, this.killUn, null, this);
        this.physics.add.collider(this.shuriken, this.EnnemiDeux, this.killDeux, null, this);
        this.physics.add.collider(this.shuriken, this.EnnemiTrois, this.killTrois, null, this);
        this.physics.add.collider(this.shuriken, this.EnnemiQuatre, this.killQuatre, null, this);
        this.HPbar = this.add.sprite(80, 20, "HP").setScrollFactor(0);
        this.fil = this.add.sprite(64 * 24, 192, "transi");
        
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

        if (this.EnnemiDeuxFollow == true && this.EnnemiDeux_HP >0){
            this.EnnemiDeux.setVelocityX(this.player.x - this.EnnemiDeux.x);
            this.EnnemiDeux.setVelocityY(this.player.y -this.EnnemiDeux.y);
        }

        if (this.EnnemiTroisFollow == true && this.EnnemiTrois_HP >0){
            this.EnnemiTrois.setVelocityX(this.player.x - this.EnnemiTrois.x);
            this.EnnemiTrois.setVelocityY(this.player.y -this.EnnemiTrois.y);
        }

        if (this.EnnemiQuatreFollow == true && this.EnnemiQuatre_HP >0){
            this.EnnemiQuatre.setVelocityX(this.player.x - this.EnnemiQuatre.x);
            this.EnnemiQuatre.setVelocityY(this.player.y -this.EnnemiQuatre.y);
        }

        this.SpriteHitBoxUn.x = this.EnnemiUn.x
        this.SpriteHitBoxUn.y = this.EnnemiUn.y

        this.SpriteHitBoxDeux.x = this.EnnemiDeux.x
        this.SpriteHitBoxDeux.y = this.EnnemiDeux.y

        this.SpriteHitBoxTrois.x = this.EnnemiTrois.x
        this.SpriteHitBoxTrois.y = this.EnnemiTrois.y

        this.SpriteHitBoxQuatre.x = this.EnnemiQuatre.x
        this.SpriteHitBoxQuatre.y = this.EnnemiQuatre.y

        //Deplacements de l'ennemi Un
        if(this.EnnemiUn.x >= 640){
            this.EnnemiUn.setVelocityX(-100);
        }
        else if (this.EnnemiUn.x <= 128){
            this.EnnemiUn.setVelocityX(100);
        }

        if(this.EnnemiDeux.x >= 640){
            this.EnnemiDeux.setVelocityX(-100);
        }
        else if (this.EnnemiDeux.x <= 128){
            this.EnnemiDeux.setVelocityX(100);
        }

        if(this.EnnemiTrois.x >= 640){
            this.EnnemiTrois.setVelocityX(-100);
        }
        else if (this.EnnemiTrois.x <= 128){
            this.EnnemiTrois.setVelocityX(100);
        }

        if(this.EnnemiQuatre.x >= 640){
            this.EnnemiQuatre.setVelocityX(-100);
        }
        else if (this.EnnemiQuatre.x <= 128){
            this.EnnemiQuatre.setVelocityX(100);
        }




        //                           DEPLACEMENT JOUEUR
        // Droite/gauche
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160 * vitessedep)
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
                }, 1000);
            }

        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160 * vitessedep);
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
                }, 1000);
            }
        }
        else {
            this.player.setVelocityX(0)
        }
        // Haut/bas
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160 * vitessedep)
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
                }, 1000);
            }
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160 * vitessedep)
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
                }, 1000);
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
    killUn(shu, ene) {
        if(this.EnnemiUn_HP > 0){
            console.log(this.EnnemiUn_HP)
            this.EnnemiUn_HP -= degat;
            console.log(this.EnnemiUnFollow)
        }else{
            this.EnnemiUnFollow = false
            this.SpriteHitBoxUn.destroy();
            this.EnnemiUn.destroy();
            //salut
        
        }
        ene.destroy()
        console.log("j'ai detruit le shuriken")
       
        
    }
    killDeux(shu, ene) {
        if(this.EnnemiDeux_HP > 0){
            console.log(this.EnnemiDeux_HP)
            this.EnnemiDeux_HP -= degat;
            console.log(this.EnnemiDeuxFollow)
        }else{
            this.EnnemiDeuxFollow = false
            this.SpriteHitBoxDeux.destroy();
            this.EnnemiDeux.destroy();
            //salut
        
        }
        ene.destroy()
        console.log("j'ai detruit le shuriken")
       
        
    }
    killTrois(shu, ene) {
        if(this.EnnemiTrois_HP > 0){
            console.log(this.EnnemiTrois_HP)
            this.EnnemiTrois_HP -= degat;
            console.log(this.EnnemiTroisFollow)
        }else{
            this.EnnemiTroisFollow = false
            this.SpriteHitBoxTrois.destroy();
            this.EnnemiTrois.destroy();
            //salut
        
        }
        ene.destroy()
        console.log("j'ai detruit le shuriken")
       
        
    }
    killQuatre(shu, ene) {
        if(this.EnnemiQuatre_HP > 0){
            console.log(this.EnnemiQuatre_HP)
            this.EnnemiQuatre_HP -= degat;
            console.log(this.EnnemiQuatreFollow)
        }else{
            this.EnnemiQuatreFollow = false
            this.SpriteHitBoxQuatre.destroy();
            this.EnnemiQuatre.destroy();
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


    Niveau4() {
        this.fil.anims.play('transi1')
        setTimeout(() => {
            this.scene.start('niveau4')
        }, 1000);

    }
    EnnemiUnAggro(player, SpriteHitBox){
        this.EnnemiUnFollow = true;

        
    }
    EnnemiDeuxAggro(player, SpriteHitBox){
        this.EnnemiDeuxFollow = true;

        
    }
    EnnemiTroisAggro(player, SpriteHitBox){
        this.EnnemiTroisFollow = true;

        
    }
    EnnemiQuatreAggro(player, SpriteHitBox){
        this.EnnemiQuatreFollow = true;

        
    }


   
}
