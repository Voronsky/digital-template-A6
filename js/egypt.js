var keys = Phaser.Keyboard;
var jumpEnable = false;
var collectedKey = false;

state.egypt = function (game) {


};

state.egypt.prototype = {
    preload: function(){
	//18 frames
	this.load.spritesheet('mummy','assets/mummy.png',37,45,18);

	this.load.tilemap('map','assets/egypt.json',null,Phaser.Tilemap.TILED_JSON);
	this.load.image('tiles','assets/tiles/tiles3.png');
	this.load.image('door','assets/door.jpg');
	this.load.image('key','assets/key.png');
	this.load.image('artifact','assets/artifact.png');

    },

    create: function(){

	this.jump = this.add.audio('jump');
	this.music = this.add.audio('thriller');
	this.music.volume = 0.8;
	this.music.loop = true;
	this.music.play();


	//Importing tilemap tiles
	this.map = this.add.tilemap('map');
	this.map.addTilesetImage('tiles3','tiles');
	this.map.addTilesetImage('key');
	this.map.addTilesetImage('door');
	this.map.addTilesetImage('artifact');
	this.layer = this.map.createLayer('maze');
	this.boundsLayer = this.map.createLayer('enemyBounds');
//	this.doorLayer = this.map.createLayer("gate");
	//this.keyLayer = this.map.createLayer("key");
	this.layer.resizeWorld(); //Resize game world to layer
	
	this.physics.startSystem(Phaser.Physics.ARCADE);
	this.physics.arcade.enable(this.boundsLayer);

	//Importing key object from the map
	this.doorKeys = this.add.group();
	this.doorKeys.enableBody = true;

	this.map.createFromObjects('key',145,'key',0,true,false,this.doorKeys);
    
	//importing artifact object
	this.artifacts = this.add.group();
	this.artifacts.enableBody = true;
	this.map.createFromObjects('artifact',146,'artifact',0,true,false,this.artifacts);

	//Importing door object from the map
	this.doors = this.add.group();
	this.doors.enableBody = true;

	this.map.createFromObjects('gate',144,'door',0,true,false,this.doors);
	this.doorBody;
	
	
	//We use tile indexes 44, 55 and 66
	this.map.setCollisionBetween(0,67); 
	this.map.setCollisionBetween(0,133,true,'enemyBounds'); //Is an ice cube that will check the bounds to prevent NPC from falling

//	this.map.setCollision(0,144,true,'gate'); //Door shit
	this.boundsLayer.alpha = 0;
	
	//Spawning in the player, inherting from it's parent Game
	this.player = this.add.sprite(20,0,'player'); //Top left of maze
	this.physics.arcade.enable(this.player);
	this.player.body.bounce.y = 0.2;
	this.player.body.gravity.y = 400;
	this.player.body.collideWorldBounds = true;
	this.player.animations.add('left',[4,3,2,1],10,true);
	this.player.animations.add('right',[5,6,7,8],10,true);
	
	//Adding game camera
	this.camera.follow(this.player);
	
	//Adding the enemy group
	this.enemies = this.add.group();
	this.spawnEnemy();
	this.time.events.loop(Phaser.Timer.SECOND, this.enemyMove,this);

    },

    update: function(){

	this.physics.arcade.collide(this.player, this.layer,function(){ jumpEnable = true; },null,this);

	this.physics.arcade.collide(this.enemies, this.layer);

	this.physics.arcade.collide(this.enemies, this.boundsLayer);

	this.physics.arcade.overlap(this.player, this.doors, this.openDoor,null,this); //doesn't work

	this.physics.arcade.overlap(this.player, this.doorKeys, this.collectKey,null,this);

	this.physics.arcade.overlap(this.player, this.artifacts, this.collectArtifact, null,this);

	
	this.player.body.velocity.x = 0;


	if(this.input.keyboard.isDown(keys.LEFT)){
	    
	    this.player.animations.play('left');
	    this.player.body.velocity.x = -200;

	}
	else if(this.input.keyboard.isDown(keys.RIGHT)){
	    
	    this.player.animations.play('right');
	    this.player.body.velocity.x = 200;
	    
	} else {

	    this.player.animations.stop();
	    this.player.frame = 0;

	}
		
	//Jump
	if(this.input.keyboard.isDown(keys.UP) &&
	   jumpEnable === true){
	    
	    this.jump.volume = 0.4;
	    this.jump.play();
	    this.player.body.velocity.y = -225;
	    jumpEnable = false;
	}
	
    },

    spawnEnemy: function() {
	
	for (var i=0; i<25; i++) {
	    
	    this.enemy = this.enemies.create(this.world.randomX,this.rnd.integerInRange(20,this.world.height - 40),'mummy');
	    this.physics.arcade.enable(this.enemy);
	    this.enemy.body.gravity.y = 400;
	    this.enemy.body.bounce.y = 0.1;
	    this.enemy.animations.add('walk');
	}


	
    },

    enemyMove: function() {
	this.enemies.forEach(function(enemy) {
	  
	    //Binary decision making for enemy movement
	    var x = Math.round(Math.random());
	    if(x == 1){
		enemy.animations.play('walk',20,true);
		enemy.body.velocity.x = -100;
	    }
	    if(x == 0){

		enemy.animations.play('right',20,true);
		enemy.body.velocity.x = 100;
	    }
	    
	}, this);

    },

    collectKey: function(player, key){

	key.kill();
	collectedKey = true;
    },

    doorBody: function(){
	this.doors.forEach(function(door) {
	    this.physics.arcade.enable(this.door);
	    this.door.body.immovable = true;
	},this);
    },
    openDoor: function(player, door){
	//console.log("works");
    },

    collectArtifact: function(player, artifact){
	artifact.kill();
	this.state.start('textScene2');
    }

}
