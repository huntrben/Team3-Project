/// <reference path="../app/components/phaser/typescript/phaser.d.ts"/>
import creature = require('./creature');

class PacmanGame {
    private game: Phaser.Game;
    
    private player: creature.Pacman;
    private tilemap: Phaser.Tilemap;
    private layer: Phaser.TilemapLayer;
    constructor() {
        console.log("Yo!");
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-div', { preload: this.preload, create: this.create, update: this.update});
    }

    
    // Called by phaser to preload resources.
    preload(): void {
        this.game.load.image('badpacman', 'assets/awesomePacman.png');
        this.game.load.image('testset', 'assets/testtileset.png');
        this.game.load.tilemap('tiled2', 'assets/titled2.csv', null, Phaser.Tilemap.CSV);
    }

    // Called by phaser to set up the game world.
    create(): void {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.tilemap = this.game.add.tilemap('tiled2');
        //this.tilemap.create('layer', 20, 20, 32 ,32);
        //this.tilemap.putTile(1,4,4);

        this.layer = this.tilemap.createLayer('layer')
        this.tilemap.addTilesetImage('testset');

        
        this.tilemap.setCollision([0,1,2], true, this.layer);
        

        console.log(this.layer)
        //this.layer.resizeWorld()
        
        
        //tilemap.fill(0,0,0,20,20);
        //this.game.add.existing(tilemap);
        this.player = new creature.PlayerPacman(this.game, 10, 10);
    }

    // Called by phaser once per tick to update the game world.
    update(): void {
        this.game.physics.arcade.collide(this.player, this.layer);
        this.game.physics.arcade.collide(this.player, this.layer, (s,t) => {
            console.log("Collide " + s + " " + t)
        });
    }

}

window.onload = () => {

    var game: PacmanGame = new PacmanGame();

};
