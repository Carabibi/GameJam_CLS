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

class marchand extends Phaser.Scene {
    constructor() {
        super("marchand");

    }
    preload() {
        //this.load.spritesheet('Lucy', 'assets/lucyanim.png',{frameWidth:1280,frameHeight:720})
        this.load.tilemapTiledJSON("mapShop", "assets/shop_1.json");
        this.load.image("tileset", "assets/placeholder.png");
        this.load.image("porte", "assets/porte.png");
        this.load.image("sol", "assets/sol_640x640_asterix.png");
        this.load.audio('Music5', 'audio/Music2!EXE.5marchand.mp3');

        this.load.spritesheet('perso',"assets/spritepotagoniste.png",{frameWidth:47,frameHeight:61})

        this.load.spritesheet('shuriken','assets/Shuriken-sheet.png',{frameWidth:32,frameHeight:32})
        this.load.spritesheet('HP','assets/HPBar180x37.png',{frameWidth:180,frameHeight:37})
        this.load.spritesheet('transi','assets/transiPortes_256x128.png',{frameWidth:256,frameHeight:128})
        this.load.spritesheet('heal', 'assets/corbeille.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('coin', 'assets/2coin.png', { frameWidth: 64, frameHeight: 64 })

        this.load.spritesheet('SHOP', 'assets/shop_complet.png',{frameWidth:768,frameHeight:224})
        this.load.spritesheet('RAM', 'assets/RAM.png',{frameWidth:64,frameHeight:64})
        this.load.spritesheet('SSD', 'assets/SSD.png',{frameWidth:64,frameHeight:64})
        this.load.spritesheet('4090', 'assets/4090rtx.png',{frameWidth:64,frameHeight:64})
        this.load.spritesheet('WATER', 'assets/Watercooling.png',{frameWidth:64,frameHeight:64})
        this.load.spritesheet('CPU', 'assets/Processeur.png',{frameWidth:64,frameHeight:64})
        this.load.spritesheet('SATA', 'assets/Satacable.png',{frameWidth:64,frameHeight:64})
        this.load.spritesheet('ALIM', 'assets/Alim.png',{frameWidth:64,frameHeight:64})
        this.load.spritesheet('VENTS', 'assets/Ventilateur.png',{frameWidth:64,frameHeight:64})

        this.load.image('RETOUR', 'assets/empty.png',{frameWidth:64,frameHeight:64})
        this.load.image('EMPTYNEO', 'assets/emptyforneo.png',{frameWidth:64,frameHeight:64})

    }
    create() {
        console.log("pd")
        this.map = this.add.tilemap("mapShop");
        this.add.image(64*6,64*6,"sol")
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
        this.table = this.map.createLayer(
            "table_neo",
            this.tileset
        );
        this.porte = this.map.createLayer(
            "porte",
            this.tileset
        );
        //this.grpporte = this.physics.add.group({ immovable: true, allowGravity: false })
        //this.porte = this.map.getObjectLayer("porte");
        //this.porte.objects.forEach(coord => {
        //    this.grpporte.create(coord.x + 32, coord.y + 32, "porte").angle = 90;
        //});

        this.mur.setCollisionByExclusion(-1, true);
        this.obstacle.setCollisionByExclusion(-1, true);

        // SPAWN JOUEUR
        //if (this.spawnx && this.spawny) {
        //    this.player = this.physics.add.sprite(this.spawnx, this.spawny, 'perso');
        //}
        //else {
            this.player = this.physics.add.sprite(5 * 64, 9 * 64, 'perso');
        //}
        this.emptyneo = this.physics.add.sprite(6* 64, 170, 'EMPTYNEO').setSize(256, 70);
        //CAMERA
        this.cameras.main.startFollow(this.player);
        //var camera = this.cameras.add(4*64, 4*64)
        //this.cameras.main.x = 4*64
        //this.cameras.main.y = 3*64

        //COLLIDER
        this.physics.add.collider(this.player, this.mur);
        this.physics.add.collider(this.player, this.obstacle);
        this.physics.add.collider(this.player, this.grpporte, this.Niveau2,null,this);
        //this.physics.
        //INPUT
        this.cursors = this.input.keyboard.createCursorKeys();
        this.clavier = this.input.keyboard.addKeys('SHIFT,E');

        //GROUPE / UI
        this.shuriken = this.physics.add.group();
        this.HPbar = this.add.sprite(2 * 64, 5 * 64,"HP").setScrollFactor(0);
        this.fil = this.add.sprite(64*14,64*6,"transi");

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
            frameRate: 10,
        });
        
        this.anims.create({
            key:'anim droite',
            frames: this.anims.generateFrameNumbers('perso',{start:14,end:20 }),
            frameRate:10,
        })
        this.anims.create({
            key:'anim gauche',
            frames: this.anims.generateFrameNumbers('perso',{start:21,end:27 }),
            frameRate:10,
        })
        this.anims.create({
            key:'anim face',
            frames: this.anims.generateFrameNumbers('perso',{start:0,end:6 }),
            frameRate:10,
        })
        this.anims.create({
            key:'anim dos',
            frames: this.anims.generateFrameNumbers('perso',{start:7,end:13 }),
            frameRate:10,
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
        //var audioContext = new (window.AudioContext || window.webkitAudio)();
        //    this.sound.context = audioContext;
        //    // Crée une instance de Phaser.Sound pour jouer la musique
        var musique = this.sound.add('Music5', { loop: true });
            // Joue la musique
            musique.play();

        var button = this.add.sprite(666 ,350, 'SHOP');
            button.setInteractive();
            button.on('pointerdown', () => {
                this.Startgame();
            });
        var button = this.add.sprite(666 ,350, 'RAM');
        button.setInteractive();
        button.on('pointerdown', () => {
            this.Startgame();
        });

        var button = this.add.sprite(666 ,350, 'SSD');
        button.setInteractive();
        button.on('pointerdown', () => {
            this.Startgame();
        }); 
        var button = this.add.sprite(666 ,350, '4090');
        button.setInteractive();
        button.on('pointerdown', () => {
            this.Startgame();
        });
        var button = this.add.sprite(666 ,350, 'CPU');
        button.setInteractive();
        button.on('pointerdown', () => {
            this.Startgame();
        });
        var button = this.add.sprite(666 ,350, 'WATER');
        button.setInteractive();
        button.on('pointerdown', () => {
            this.Startgame();
        });
        var button = this.add.sprite(666 ,350, 'SATA');
        button.setInteractive();
        button.on('pointerdown', () => {
            this.Startgame();
        });
        var button = this.add.sprite(666 ,350, 'ALIM');
        button.setInteractive();
        button.on('pointerdown', () => {
            this.Startgame();
        });
        var button = this.add.sprite(666 ,350, 'VENTS');
        button.setInteractive();
        button.on('pointerdown', () => {
            this.Startgame();
        });
        var button = this.add.sprite(550 ,470, 'RETOUR');
        button.setInteractive();
        button.on('pointerdown', () => {
            this.Startgame();
        });

        //Création des sprites pour le marchand
        this.anims.create({
            key: 'Base',
            frames: this.anims.generateFrameNumbers('SHOP', {start: 0, end: 0}),
            frameRate: 1,
            repeat: 0
        });
        this.anims.create({
            key: 'Base2',
            frames: this.anims.generateFrameNumbers('SHOP', {start: 1, end: 1}),
            frameRate: 1,
            repeat: 0
        });
        this.anims.create({
            key: 'RAM',
            frames: this.anims.generateFrameNumbers('SHOP', {start: 2, end: 2}),
            frameRate: 1,
            repeat: 0
        });
        this.anims.create({
            key: 'SSD',
            frames: this.anims.generateFrameNumbers('SHOP', {start: 2, end: 2}),
            frameRate: 1,
            repeat: 0
        });
        this.anims.create({
            key: '4090',
            frames: this.anims.generateFrameNumbers('SHOP', {start: 2, end: 2}),
            frameRate: 1,
            repeat: 0
        });
        this.anims.create({
            key: 'RAM',
            frames: this.anims.generateFrameNumbers('SHOP', {start: 2, end: 2}),
            frameRate: 1,
            repeat: -1
        });
        
    }
    update() {
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
    Niveau2(){
        this.fil.anims.play('transi1')
        setTimeout(() => {
            this.scene.start('scene2')
        }, 1000);
        
    }

}
export default marchand