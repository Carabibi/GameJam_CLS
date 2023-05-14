class Fin extends Phaser.Scene {
    constructor() {
        super("fin");

    }
    preload() {
        this.load.image("Fin", "assets/ecran_fin.png");

        
    }
    create() {
        this.add.image(640,360,"Fin")

    }
    update() {
       

    }

}