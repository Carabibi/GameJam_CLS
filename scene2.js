class scene2 extends Phaser.Scene {
    constructor() {
        super('scene2');
        this.CanShoot = true;
        this.cible_detruite = 0
        this.porte_ouverte = false
    }

    init(data) {
    }
    preload() {   
        this.load.tilemapTiledJSON("map2", "assets/tuto_2.json");
        this.load.image("tileset", "assets/placeholder.png");
        
        this.load.image("porte_ouverte", "assets/porte.png");
        this.load.image("porte", "assets/porte_ferme.png");

        this.load.spritesheet('cible','assets/cible.png',{frameWidth:64,frameHeight:64})
        this.load.image("sol2", "assets/sol_640x640_asterix.png");
        this.load.spritesheet('perso',"assets/perso.png",{frameWidth:47,frameHeight:61})
        this.load.spritesheet('shuriken','assets/Shuriken-sheet.png',{frameWidth:32,frameHeight:32})
        this.load.spritesheet('HP','assets/HPBar180x37.png',{frameWidth:180,frameHeight:37})
        this.load.image("tuto2", "assets/clippy/shuriken.png");
    }

    create() {
        // CREATE MAP
        this.map = this.add.tilemap("map2");
        this.add.image(64*6,64*6,"sol2")
        this.tileset = this.map.addTilesetImage(
            "placeholder",
            "tileset"
        );
        this.mur = this.map.createLayer(
            "mur",
            this.tileset
        );
        this.trou = this.map.createLayer(
            "trou",
            this.tileset
        );

        this.grpporte = this.physics.add.group({ immovable: true, allowGravity: false })
        this.porte = this.map.getObjectLayer("porte_sortie");
        this.porte.objects.forEach(coord => {
            this.grpporte.create(coord.x + 32, coord.y -32 , "porte");
        });

        this.grpcible = this.physics.add.group({ immovable: true, allowGravity: false })
        this.cible = this.map.getObjectLayer("cible");
        this.cible.objects.forEach(coord => {
            this.grpcible.create(coord.x + 32, coord.y + 32, "cible");
        });



        this.mur.setCollisionByExclusion(-1, true);
        this.trou.setCollisionByExclusion(-1, true);
        // SPAWN JOUEUR
        if (this.spawnx && this.spawny) {
            this.player = this.physics.add.sprite(this.spawnx, this.spawny, 'perso');
        }
        else {
            this.player = this.physics.add.sprite(2 * 64, 5 * 64, 'perso');
        }

        //CAMERA
        this.cameras.main.startFollow(this.player);
        //var camera = this.cameras.add(4*64, 4*64)
        //this.cameras.main.x = 4*64
        //this.cameras.main.y = 3*64

        

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
        //ANIMATION CIBLE
        this.anims.create({
            key: 'cible',
            frames: this.anims.generateFrameNumbers('cible', {start: 0, end: 2}),
            frameRate: 4.5,
            repeat: -1
        });
        this.grpcible.getChildren().forEach(function(child){
            child.anims.play('cible', true)
        },this)
  
        //COLLIDER
        this.physics.add.collider(this.player, this.mur);
        this.collide_trou = this.physics.add.collider(this.player, this.trou);
        this.physics.add.collider(this.player, this.grpporte, this.Niveau3,null,this);
        this.physics.add.overlap(this.shuriken, this.grpcible, this.touche_cible,null,this);
        this.tuto2 = this.add.image(64*10,64*6.3,"tuto2").setScrollFactor(0)
    }
    


    update() {
        if(this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown|| this.cursors.down.isDown){this.tuto2.destroy()}
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
                    this.collide_trou.active = true
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
                this.shuriken.create(this.player.x - 50, this.player.y, "shuriken").setVelocityX(-475*speedatk);
            }
            else if(this.cursors.up.isDown){
                this.shuriken.create(this.player.x , this.player.y-50, "shuriken").setVelocityY(-475*speedatk);
            }
            else if(this.cursors.down.isDown){
                this.shuriken.create(this.player.x, this.player.y+50, "shuriken").setVelocityY(475*speedatk);
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
    Niveau3(){
        if(this.porte_ouverte== true){
        this.scene.start('scene3')}
    }
    touche_cible(shuriken, cible){
        shuriken.destroy()
        cible.destroy()
        this.cible_detruite+=1
        if(this.cible_detruite >= 2){
            this.porte_ouverte = true 
            this.grpporte.getChildren()[0].setTexture("porte_ouverte")
            this.grpporte.getChildren()[1].setTexture("porte_ouverte")
        }
    }
}