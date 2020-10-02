var trex, trex_running, trex_collided, ground1, END, PLAY, gameState, count, cloudsGroup, obstaclesGroup, gameOver, restart;
    
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  ground_original = loadImage("sprite_0.png");
  cloud_img = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
 createCanvas(400, 400);
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  count = 0;
  ground1 = createSprite(200, 380, 400, 20);
  ground1.addAnimation("original", ground_original);
  ground2 = createSprite(200, 385, 400, 5);
  ground2.visible = false;
  trex = createSprite(200, 380, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.45;
  gameOver = createSprite(200, 300);
  gameOver.scale = 0.5;
  gameOver.addAnimation("gameover", gameOverImg);
  gameOver.visible = false;
  restart = createSprite(200, 340);
  restart.scale = 0.5;
  restart.addAnimation("restartimg", restartImg);
  restart.visible = false;
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
 
 
  
}

function draw() {
  background("white");
  text("Score: "+ count, 250, 100);
  
  if (gameState === PLAY){
  trex.x = 50;
  trex.collide(ground2);
  ground1.velocityX = -6;
    
    if (ground1.x < 0){
      ground1.x = ground1.width/2;
    }
    
    count = count + Math.round(frameRate/60);
    
    if (keyDown("space") && trex.y >= 359){
     trex.velocityY = -12;     
   }
    
    trex.velocityY = trex.velocityY + 0.8;
    
  spawnClouds();
  spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
     gameState = END;
    }
  }
  
  else if(gameState === END)  {
   
    ground1.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.changeAnimaton(trex_collided);
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1); 
    gameOver.visible = true;
    restart.visible = true;
    if (mousePressedOver(restart)){
      reset();
    }
    
  }
  
  drawSprites();
  
}

function spawnClouds() {
  
  if ( frameCount % 90 === 0){
  var cloud = createSprite(400, 320, 40, 10);
  cloud.y = random(280, 320);
  cloud.addAnimation("cloud", cloud_img);
  cloud.scale = 0.5;
  cloud.velocityX = -3;
  cloud.lifetime = 134;
  cloud.depth = trex.depth;
  trex.depth = trex.depth +1;
  cloudsGroup.add(cloud);
  }
  
  
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -6;
    var rand = Math.round(random(1,6));
    switch(rand) {
    case 1 : obstacle.addAnimation("obstacle1", obstacle1 ); 
    break;
    case 2 : obstacle.addAnimation("obstacle2", obstacle2 );
    break;
    case 3 : obstacle.addAnimation("obstacle3", obstacle3 );
    break;
    case 4 : obstacle.addAnimation("obstacle4", obstacle4 );
    break;
    case 5 : obstacle.addAnimation("obstacle5", obstacle5 );
    break;
    case 6 : obstacle.addAnimation("obstacle6", obstacle6 );
    break;
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    obstaclesGroup.add(obstacle);
  }
    
}

function reset(){
    count = 0;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    gameState = PLAY; 
}