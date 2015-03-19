state.home2 = function(game) {
	    
	    

};

state.home2.prototype = {
    
    preload: function(){
	this.load.spritesheet('player','assets/guy.png',33,34,9,0,4);
	this.load.spritesheet('dude','assets/dude.png',32,48);
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
	this.player = this.add.sprite(this.world.centerX + 150,this.world.height - 50, 'player');
	this.physics.arcade.enable(this.player);
	this.player.animations.add('left',[4,3,2,1],10,true);
	this.player.animations.add('right',[5,6,7,8],10,true);
	this.player.body.bounce.y = 0.1;
	this.player.body.gravity.y = 400;
	this.player.body.collideWorldBounds = true;

	//Make game camera follow the player
	this.camera.follow(this.player);

	//Spawning dude NPC
	this.dudeNPC = this.add.sprite(this.world.centerX - 50,this.world.height - 50, 'dude');
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

	this.player.body.velocity.x = 0;
	this.dudeNPC.frame = 4;

	//Make the npc run across the screen
	if(this.player.x > this.dudeNPC.x){
	    this.player.body.velocity.x = -200;
	    this.player.animations.play('left');

	}else if(this.player.x === (this.dudeNPC.x + 10)){
	    //If the guy is at least 10 steps away
	    this.player.animations.stop();
	    this.player.frame = 0;
	    this.playerText;
	}
	else{
	    this.player.animations.stop();
	    this.player.frame = 0;
	}
	    
    },

    playerText: function(){
	this.tempText = this.add.text(this.player.x - 10,this.player.y-20,"",{size: "6px", fill:"#FFF", align: "center"});
	this.tempText.setText("You got that guy?\nGot Your Stuff");

	this.time.events.add(Phaser.Timer.SECOND*3,this.npcTalk,this);

    },
    npcTalk: function(){
	this.npcText = this.add.text(this.dudeNPC.x - 10,this.dudeNPC.y-20,"",{size: "6px", fill:"#FFF", align: "center"});
	this.npcText.setText("Perfect! Thanks\n");
	this.time.events.add(Phaser.Timer.SECOND*2,function(){this.npcText.setText("Say goodbye to your home");},this);

    }
	

}
