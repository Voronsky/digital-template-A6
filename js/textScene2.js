state.textScene2 = function (game) {

};

state.textScene2.prototype = {

    preload: function(){

    },
    
    create: function(){
	this.world.setBounds(0,0,1240,450);
	this.sceneText = this.add.text(this.world.centerX - 300, this.world.height/5,"",{size: "32px", fill:"#FFF", align: "center"}); //Setting the introduction text object

	this.sceneText.anchor.setTo(0.5,0.5);
	
	this.scene();
    },

    update: function(){
	if(this.input.activePointer.isDown){
	   this.sceneText.setText("What an odd adventure");
	    //Event delay
	    this.time.events.add(Phaser.Timer.SECOND*4,this.startGame,this);
	}
    },
    
    scene: function() {
	this.sceneText.setText("Alright got the artifact!\n I wonder if he,\n will still be there\n where to return his cellphone.\n<click mouse to continue>");
    },

    startGame: function() {
	this.state.start('home2');
    }
}
