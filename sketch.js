var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var PLAY = 0
var END = 1
var gameState = PLAY
var zombieGroup;
var gameOver, gameOverImg;
var life=3;

function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  gameOverImg = loadImage("assets/gameOver.jpg")
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/OIP.jpg")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   
    gameOver = createSprite(displayWidth-100,displayHeight-100,30,30)
    gameOver.addImage("gameOver",gameOverImg)
    gameOver.scale=0.5

    //creating group for zombies    
    zombieGroup = new Group();
}

function draw() {
  background(0); 
if(gameState == PLAY){
  gameOver.visible = false;
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  player.addImage(shooter_shooting)
}
//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
  for(var i=0;i<zombieGroup.length;i++){
    zombieGroup[i].destroy()
  }
}
//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){
 life = life-1;

  for(var i=0;i<zombieGroup.length;i++){     
       
   if(zombieGroup[i].isTouching(player) && life==0){
        gameState = END;
        heart1.visible = false;
        heart2.visible = false;
        heart3.visible = false;
        } 
        
        
  }
 }
 if(gameState==END){
  player.destroy();
         zombieGroup.destroyEach();
         gameOver.visible = true;
         zombieGroup.setVelocityEach(0);
 }
 //calling the function to spawn zombies
 enemy();
}
  

drawSprites();
}



//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
