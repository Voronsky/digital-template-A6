var state = {};

state.Boot = function (game) {

};

state.Boot.prototype = {

    preload: function(){
	this.load.image('home','assets/home.png');
	//this.load.spritesheet('player','assets/guy.png',33,34,9,0.4);
	//this.load.spritesheet('dude','assets/dude.png',32,48);

    },
    create: function(){

	this.intro = this.add.text(this.world.centerX - 100, this.world.height/5,"",{size: "32px", fill:"#FFF", align: "center"}); //Setting the introduction text object

	this.intro.anchor.setTo(0.5,0.5); //Anchoring it to top center

	this.introText(); //Calling text
    },

    update: function(){
	if(this.input.activePointer.isDown){
	   this.intro.setText("....");
	    //Event delay
	    this.time.events.add(Phaser.Timer.SECOND*3,this.startGame,this);
	}
    },

    introText: function(){
	this.intro.setText("Just another day...\n<click Mouse>");

    },

    startGame: function(){

	this.state.start('Game');
    }

}
