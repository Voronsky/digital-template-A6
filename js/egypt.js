var keys = Phaser.Keyboard;
var jumpEnable = false;

state.egypt = function (game) {


};

state.egypt.prototype = {
    preload: function(){
	//18 frames
	this.load.spritesheet('mummy','assets/mummy.png',37,45,18);

	this.load.tilemap('map','assets/egypt.json',null,Phaser.Tilemap.TILED_JSON);
	this.load.image('tiles','assets/tiles/tiles3.png');
    },

    create: function(){
	this.physics.startSystem(Phaser.Physics.ARCADE);

	//Importing tilemap tiles
	this.map = this.add.tilemap('map');
	this.map.addTilesetImage('tiles3','tiles');
	this.layer = this.map.createLayer('maze');
	this.boundsLayer = this.map.createLayer('enemyBounds');
	this.layer.resizeWorld(); //Resize game world to layer
	console.log("Game world width is "+this.world.width + " and game world height is " + this.world.height);
	
	//this.layer = this.map.createLayer('rename');
	//this.layer.resizeWorld();
	
	//We use tile indexes 44, 55 and 66
	this.map.setCollisionBetween(0,67); 
	this.map.setCollision(132); //Is an ice cube that will check the bounds to prevent NPC from falling
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
	this.physics.arcade.collide(this.enemies, this.boundsLayer, function(){ this.enemy.body.velocity.x *= -1; console.log("It collided HERE NIGGAH\t(" + this.enemy.body.x + ", " +this.enemy.body.y+")"); },null,this);
	
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
	    
	    this.player.body.velocity.y = -225;
	    jumpEnable = false;
	}
	
	console.log(this.player.body.x + " " + this.player.body.y)
    },

    spawnEnemy: function() {
	
	for (var i=0; i<45; i++) {
	    
	    this.enemy = this.enemies.create(this.world.randomX,this.rnd.integerInRange(20,this.world.height - 40),'mummy');
	    this.physics.arcade.enable(this.enemy);
	    this.enemy.body.gravity.y = 400;
	    this.enemy.body.bounce.y = 0.1;
	    //this.enemy.animations.add('left',[],10,true);
	    //this.enemy.animations.add('right',[],10,true);
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

    }

}
