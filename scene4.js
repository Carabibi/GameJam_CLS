var coincollect = 0;

class scene4 extends Phaser.Scene {
    constructor() {
        super('scene4');
        this.CanShoot = true;
    
    }

    init(data) {
    }
    preload() {   
        this.load.tilemapTiledJSON("map4", "assets/tuto_4.json");
        this.load.image("tileset", "assets/placeholder.png");
        this.load.image("porte", "assets/porte.png");
        this.load.image("sol4", "assets/sol_1280x1280_kaamelot.png");
        this.load.spritesheet('perso',"assets/perso.png",{frameWidth:47,frameHeight:61})
        this.load.spritesheet('shuriken','assets/Shuriken-sheet.png',{frameWidth:16,frameHeight:16})
        this.load.spritesheet('HP','assets/HPBar180x37.png',{frameWidth:180,frameHeight:37})
        this.load.spritesheet('transi','assets/transiPortes_256x128.png',{frameWidth:256,frameHeight:128})
        this.load.spritesheet('coin', 'assets/2coin.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('heal', 'assets/corbeille.png', { frameWidth: 64, frameHeight: 64 })
    }

    create() {
        // CREATE MAP
        this.map = this.add.tilemap("map4");
        this.add.image(64*11,64*11,"sol4")
        this.tileset = this.map.addTilesetImage(
            "palceholder",
            "tileset"
        );
        this.mur = this.map.createLayer(
            "mur",
            this.tileset
        );
        this.porte = this.map.createLayer(
            "porte",
            this.tileset
        );
        this.trou = this.map.createLayer(
            "trou",
            this.tileset
        );
        this.pique = this.map.createLayer(
            "pique",
            this.tileset
        );
        
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

        //this.grpporte = this.physics.add.group({ immovable: true, allowGravity: false })
        //this.porte = this.map.getObjectLayer("porte");
        //this.porte.objects.forEach(coord => {
        //    this.grpporte.create(coord.x + 32, coord.y + 32, "porte").angle = 90;
        //});

        this.mur.setCollisionByExclusion(-1, true);
        this.trou.setCollisionByExclusion(-1, true);
        this.pique.setCollisionByExclusion(-1, true);
        this.porte.setCollisionByExclusion(-1, true);

        // SPAWN JOUEUR
        if (this.spawnx && this.spawny) {
            this.player = this.physics.add.sprite(this.spawnx, this.spawny, 'perso');
        }
        else {
            this.player = this.physics.add.sprite(20 * 64, 19 * 64, 'perso');
        }

        //CAMERA
        this.cameras.main.startFollow(this.player);
        //var camera = this.cameras.add(4*64, 4*64)
        //this.cameras.main.x = 4*64
        //this.cameras.main.y = 3*64

        //COLLIDER
        this.physics.add.collider(this.player, this.mur);
        this.physics.add.collider(this.player, this.porte);
        this.collide_trou = this.physics.add.collider(this.player, this.trou);
        this.physics.add.collider(this.player, this.pique);
        this.physics.add.collider(this.player, this.grpporte, this.Niveau2,null,this);
        this.physics.add.overlap(this.player, this.grpcoin, this.touche_coin, null, this);
        this.physics.add.overlap(this.player, this.grpheal, this.touche_heal, null, this);

        //INPUT
        this.cursors = this.input.keyboard.createCursorKeys();
        this.clavier = this.input.keyboard.addKeys('SHIFT,E');

        //GROUPE / UI
        this.shuriken = this.physics.add.group();
        this.HPbar = this.add.sprite(80,20,"HP").setScrollFactor(0)

        //ANIMATIONS
        this.anims.create({
            key: 'vie1',
            frames: this.anims.generateFrameNumbers('HP', {start: 0, end: 0}),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'vie2',
            frames: this.anims.generateFrameNumbers('HP', {start: 1, end: 1}),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'vie3',
            frames: this.anims.generateFrameNumbers('HP', {start: 2, end: 2}),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'vie4',
            frames: this.anims.generateFrameNumbers('HP', {start: 3, end: 3}),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'vie5',
            frames: this.anims.generateFrameNumbers('HP', {start: 4, end: 4}),
            frameRate: 1,
            repeat: -1
        });
        // ANIMATION SHURIKEN
        this.anims.create({
            key: 'shu',
            frames: this.anims.generateFrameNumbers('shuriken', {start: 0, end: 3}),
            frameRate: 20,
        });
        
        this.anims.create({
            key:'anim droite',
            frames: this.anims.generateFrameNumbers('perso',{start:6,end:8 }),
            frameRate:20,
        })
        this.anims.create({
            key:'anim gauche',
            frames: this.anims.generateFrameNumbers('perso',{start:9,end:11 }),
            frameRate:20,
        })
        this.anims.create({
            key:'anim face',
            frames: this.anims.generateFrameNumbers('perso',{start:0,end:2 }),
            frameRate:20,
        })
        this.anims.create({
            key:'anim dos',
            frames: this.anims.generateFrameNumbers('perso',{start:3,end:5 }),
            frameRate:20,
        })
        //ANIMATION FIL
        this.anims.create({
            key: 'transi1',
            frames: this.anims.generateFrameNumbers('transi', {start: 0, end: 7}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'transi2',
            frames: this.anims.generateFrameNumbers('transi', {start: 7, end: 0}),
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
        // ANIMATION HEAL
        this.anims.create({
            key: 'corbeille',
            frames: this.anims.generateFrameNumbers('heal', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        })
        this.grpheal.getChildren().forEach(function (child) {
            child.anims.play('corbeille', true)
        }, this)
    }


    update() {
        if(coincollect == 10){
            this.scene.start('niveau1')
        }
        //                           DEPLACEMENT JOUEUR
        // Droite/gauche
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160*vitessedep)
            this.player.anims.play('anim gauche',true)
            if (this.clavier.SHIFT.isDown && CDDash == true) {
                this.player.setVelocityX(-800)
                this.collide_trou.active = false 
                setTimeout(() => {
                    CDDash = false
                    this.collide_trou.active =true
                }, 150);
                setTimeout(() => {
                    CDDash = true
                }, 3000);
            }

        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160*vitessedep);
            this.player.anims.play('anim droite',true)
            if (this.clavier.SHIFT.isDown && CDDash == true) {
                this.player.setVelocityX(800)
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
        else {
            this.player.setVelocityX(0)
        }
        // Haut/bas
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160*vitessedep)
            this.player.anims.play('anim dos',true)
            if (this.clavier.SHIFT.isDown && CDDash == true) {
                this.player.setVelocityY(-800)
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
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160*vitessedep)
            this.player.anims.play('anim face',true)
            if (this.clavier.SHIFT.isDown && CDDash == true) {
                this.player.setVelocityY(800)
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
        else {
            this.player.setVelocityY(0)
        }


        //BARRE HP
        if(HP==0){this.HPbar.anims.play("vie5")}
        if(HP==25){this.HPbar.anims.play("vie4")}
        if(HP==50){this.HPbar.anims.play("vie3")}
        if(HP==75){this.HPbar.anims.play("vie2")}
        if(HP==100){this.HPbar.anims.play("vie1")}

        //shoot
        
        if (this.clavier.E.isDown && this.CanShoot == true) {
            if(this.cursors.right.isDown){
                this.shuriken.create(this.player.x + 50, this.player.y, "shuriken").setVelocityX(475*speedatk);   
            }
            else if(this.cursors.left.isDown){
                this.shuriken.create(this.player.x + 50, this.player.y, "shuriken").setVelocityX(-475*speedatk);
            }
            else if(this.cursors.up.isDown){
                this.shuriken.create(this.player.x + 50, this.player.y, "shuriken").setVelocityY(-475*speedatk);
            }
            else if(this.cursors.down.isDown){
                this.shuriken.create(this.player.x + 50, this.player.y, "shuriken").setVelocityY(475*speedatk);
            }
            this.CanShoot = false;
            setTimeout(() => {
                this.CanShoot = true;
            }, 500*vitessedatk);
        }  
        this.shuriken.getChildren().forEach(function(child){
            child.anims.play('shu', true)
        },this)
        
    }

        
    
    touche_coin(player, coincoin) {
        console.log("test")
        coin += 1
        coincollect +=1
        coincoin.destroy()
        console.log(coincollect)
    }
    touche_heal(player, heal) {
        HP += 25
        heal.destroy()
    }
}