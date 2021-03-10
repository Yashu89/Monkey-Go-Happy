var monkey,monkey_run
var score
var forest,ju1,invisibleGround
var banana1,bananaGroup
var stone1,stoneGroup


function preload(){
  monkey_run = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  ju1 = loadImage("jungle.jpg")
  
  banana1 = loadImage("banana.png")
  
  stone1 = loadImage("stone.png")
}

function setup() {
  createCanvas(700, 300);
  
  monkey = createSprite(100,260,10,10) 
  monkey.addAnimation("monkeyrun",monkey_run)
  monkey.scale = 0.1
  monkey.setCollider("circle",0,0,150)
  
  score = 0
  
  forest = createSprite(350,100,10,400)
  forest.addImage("back",ju1)
  forest.x = forest.width /2;
  forest.velocityX = -5;
  
  invisibleGround = createSprite(350,290,700,30)
  invisibleGround.visible = false
  
  
  bananaGroup = createGroup()
  
  stoneGroup = createGroup()
  
}

function draw() {
  background(220);
  
  if(keyDown("space")&&monkey.y>240){ 
    monkey.velocityY = -10
  }
  
  if(monkey.y<245){
    monkey.velocityY = monkey.velocityY+0.5
  }
  
  edges = createEdgeSprites()
    
  monkey.collide(invisibleGround)
  monkey.collide(edges)
  
  monkey.depth = forest.depth
  monkey.depth = monkey.depth+1
  
  if(forest.x<200){
    forest.x = forest.width/2
  }
  
  switch(score){
    case 10: monkey.scale = 0.12
      break;
    case 20: monkey.scale = 0.14
      break;
    case 30: monkey.scale = 0.16
      break;
    case 40: monkey.scale = 0.18
      break;
    case 50: monkey.scale = 0.2
      break;
    case 60: monkey.scale = 0.22
      break;
    case 70: monkey.scale = 0.24
      default:break;
  }
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach()
    score = score+2
  }
  
  if(stoneGroup.isTouching(monkey)){
    monkey.scale = 0.08
  }
  
  spawnBananas()
  spawnStones()
  
  drawSprites()

  text("Score: "+ score, 500,50)
}



function spawnBananas(){
  if(frameCount%160===0){
    var banana = createSprite(700,50,10,10)
    banana.velocityX = -5
    banana.y = random(100,180)
    banana.addImage("bananaimage",banana1)
    banana.scale = 0.05
    banana.lifetime = 140
    bananaGroup.add(banana)
    
    
  }
}

function spawnStones(){
  if(frameCount%Math.round(random(60,180))===0){
    var stone = createSprite(700,250,10,10)
    stone.velocityX = -6
    stone.addImage("stoneimage",stone1)
    stone.scale = 0.2  
    stone.lifetime = 116
    stoneGroup.add(stone)
  }
}