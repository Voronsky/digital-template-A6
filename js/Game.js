//Initialize game physics

//Flag used to see if flag is spawned
var cellphoneIsAlive = false;

state.Game = function(game) {
	    
	    

};

state.Game.prototype = {
    
    preload: function(){
	this.load.spritesheet('player','assets/guy.png',33,34,9,0,4);
	this.load.spritesheet('dude','assets/dude.png',32,48);
	this.load.image('cellphone','assets/cellphone.png');
	this.load.image('ground','assets/platform.png'); //REMOVE THIS
    },

    create: function(){
	
	//Initialize game physics
	this.physics.startSystem(Phaser.Physics.ARCADE);
	this.world.setBounds(0,0,1240,450);

	//this.background = this.add.tileSprite(0,0,'home');
	this.background = this.add.tileSprite(0,0, this.world.width,this.cache.getImage('home').height,'home');

	//Making the invisible ground group so we don't fall LULZ
	this.platforms = this.add.group();
	this.platforms.enableBody = true;
	//The ground itself
	this.ground = this.platforms.create(0,this.world.height,'ground');
	this.ground.body.immovable = true;
	this.ground.scale.setTo(20,1);

	//Make and spawn player
	this.player = this.add.sprite(this.world.width - 100,this.world.height - 150, 'player');
	this.physics.arcade.enable(this.player);
	this.player.animations.add('left',[4,3,2,1],10,true);
	this.player.animations.add('right',[5,6,7,8],10,true);
	this.player.body.bounce.y = 0.1;
	this.player.body.gravity.y = 400;
	this.player.body.collideWorldBounds = true;

	//Make game camera follow the player
	this.camera.follow(this.player);

	//Spawning dude NPC
	this.dudeNPC = this.add.sprite(this.world.width -50,this.world.height - 50, 'dude');
	this.physics.arcade.enable(this.dudeNPC);
	this.dudeNPC.animations.add('left',[0,1,2,3],10,true);
	this.dudeNPC.animations.add('right',[5,6,7,8],10,true);
	this.dudeNPC.body.bounce.y = 0.1;
	this.dudeNPC.body.gravity.y = 400;
	this.dudeNPC.body.collideWorldBounds = true;

	//Make the Cellphone spawn from the NPC LOL
	this.time.events.add(Phaser.Timer.SECOND*2,this.spawnCellphone,this);
	
    },
    
    update: function(){

	this.physics.arcade.collide(this.player, this.platforms);
	this.physics.arcade.collide(this.dudeNPC, this.platforms);
	this.physics.arcade.collide(this.cellphone, this.platforms);
	this.physics.arcade.overlap(this.player, this.cellphones, this.pickUp,null,this);

	this.player.body.velocity.x = 0;

	//Make the npc run across the screen
	if(this.dudeNPC.x > this.world.width - 1200){
	    this.dudeNPC.body.velocity.x = -200;
	    this.dudeNPC.animations.play('left');
	} else {
	    //Destroy the npc and release the memory
	    this.dudeNPC.destroy();
	}
	
	//Run to the cellphone
	if(cellphoneIsAlive == true){
	    if(this.cellphone.x < this.player.x){
		this.player.body.velocity.x = -200;
		this.player.animations.play('left')

	    }else if(this.cellphone.x === this.player.x){
		cellphoneIsAlive = false;
		this.pickUp();

	    } else{
		this.player.animations.stop();
		this.player.frame = 0;
	    }
	}
    },

    spawnCellphone: function() {

	this.cellphones = this.add.group();
	this.cellphones.enableBody = true;
	this.cellphone = this.cellphones.create(this.dudeNPC.x,this.dudeNPC.y - 20,'cellphone');
	this.cellphone.body.gravity.y = 300;
	this.cellphone.body.bounce.y = 0.2;
	cellphoneIsAlive = true;


    },
    
    pickUp: function() {
	this.cellphones.destroy();
	this.tempText = this.add.text(this.player.x,this.player.y-20,"",{size: "6px", fill:"#FFF", align: "center"});
	this.tempText.setText("Huh..why he drop this?");
	this.state.pause('Game');
	this.state.start('textScene1');
    }


}
