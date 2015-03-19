state.textScene1 = function (game) {

};

state.textScene1.prototype = {

    preload: function(){
	
    },
    
    create: function(){
	this.intro = this.add.text(this.world.centerX - 300, this.world.height/5,"",{size: "32px", fill:"#FFF", align: "center"}); //Setting the introduction text object

	this.intro.anchor.setTo(0.5,0.5);
	
	this.introText();
    },

    update: function(){
	if(this.input.activePointer.isDown){
	   this.intro.setText("Huh..Odd..On my way");
	    //Event delay
	    this.time.events.add(Phaser.Timer.SECOND*4,this.startGame,this);
	}
    },
    
    introText: function() {
	this.intro.setText("Cellphone screen: Don't ask, Don't think.\nWe need you.\nGo to Egypt and help us find an artifact.\n<click mouse to continue>");
    },

    startGame: function() {
	this.state.start('egypt');
    }
}
