var CDDash = true
var HPmax = 100
var HP = 100
var degat =34
var vitessedep=1
var vitessedatk=1
var speedatk=1

class scene1 extends Phaser.Scene {
    constructor() {
        super('scene1');
        this.CanShoot = true;
    
    }

    init(data) {
    }
    preload() {   
        this.load.tilemapTiledJSON("map", "assets/map.json");
        this.load.image("tileset", "assets/placeholder.png");
        this.load.spritesheet('perso',"assets/perso.png",{frameWidth:47,frameHeight:61})
        this.load.spritesheet('shuriken','assets/Shuriken-sheet.png',{frameWidth:16,frameHeight:16})
        this.load.spritesheet('HP','assets/HPBar180x37.png',{frameWidth:180,frameHeight:37})
    }

    create() {
        // CREATE MAP
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

        //CAMERA
        //this.cameras.main.startFollow(4*64,4*64);
        //var camera = this.cameras.add(4*64, 4*64)
        this.cameras.main.x = 4*64
        this.cameras.main.y = 3*64

        //COLLIDER
        this.physics.add.collider(this.player, this.mur);

        //INPUT
        this.cursors = this.input.keyboard.createCursorKeys();
        this.clavier = this.input.keyboard.addKeys('SHIFT,E');

        //GROUPE / UI
        this.shuriken = this.physics.add.group();
        this.HPbar = this.add.sprite(80,20,"HP")

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
  
    }


    update() {
        //                           DEPLACEMENT JOUEUR
        // Droite/gauche
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160*vitessedep)
            this.player.anims.play('anim gauche',true)
            if (this.clavier.SHIFT.isDown && CDDash == true) {
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
            this.player.setVelocityX(160*vitessedep);
            this.player.anims.play('anim droite',true)
            if (this.clavier.SHIFT.isDown && CDDash == true) {
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
            this.player.setVelocityY(-160*vitessedep)
            this.player.anims.play('anim dos',true)
            if (this.clavier.SHIFT.isDown && CDDash == true) {
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
            this.player.setVelocityY(160*vitessedep)
            this.player.anims.play('anim face',true)
            if (this.clavier.SHIFT.isDown && CDDash == true) {
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


        //BARRE HP
        if(HP==0){this.HPbar.anims.play("vie1")}
        if(HP==25){this.HPbar.anims.play("vie2")}
        if(HP==50){this.HPbar.anims.play("vie3")}
        if(HP==75){this.HPbar.anims.play("vie4")}
        if(HP==100){this.HPbar.anims.play("vie5")}

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
}