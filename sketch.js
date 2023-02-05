var backgroundImg, backgroundSprite
var jake, jakeImg
var creature1, creature1Img
var bow,bowImg, heading
var Score
var creature2, creature2Img
var creature01group, creature02group
var bowgroup
var heart1,heart2,heart3,heartImg
var life = 3
var gamestate
var restart, restartImg
var gameOver, gameOverImg
var youWin,winImg
var arrowMusic,GameOverMusic,monsterMusic
var backgroundMusic
var crowdC

gamestate = "play"
Score = 0


function preload(){
backgroundImg=loadImage("Images/underwaterBg3.jpg")
jakeImg = loadImage("Images/jakeSully.png")
creature1Img = loadImage("Images/creature1.png")
bowImg = loadImage("Images/bow.png")
creature2Img = loadImage("Images/creature2.png")
heartImg = loadImage("Images/heart.png")
restartImg = loadImage("Images/Restart.png")
gameOverImg = loadImage("Images/GameOver.png")
winImg = loadImage("Images/YouWin.png")
arrowMusic = loadSound("Music/arrowSound.mp3")
GameOverMusic = loadSound("Music/GameOverSound.mp3")
monsterMusic = loadSound("Music/monsterRoar.mp3")
backgroundMusic = loadSound("Music/bgMusic.mp3")
crowdC = loadSound("Music/crowdCheer.mp3")
}



function setup(){
  createCanvas(800,700);
  
  backgroundMusic.play()
  backgroundMusic.setVolume(0.5)


  //backgroundSprite = createSprite(400,250,800,2000)
  //backgroundSprite.addImage("myBg",backgroundImg)
  //backgroundSprite.scale = 2.22
  

  bowgroup = createGroup()
  creature01group = createGroup()
  creature02group = createGroup()

  jake = createSprite(100,425,50,50)
  jake.addImage("jake", jakeImg)
  jake.scale = 0.3

  heart1 = createSprite(600,100,100,100)
  heart1.addImage("heart1",heartImg)
  heart1.scale = 0.1

  heart2 = createSprite(650,100,50,50)
  heart2.addImage("heart2",heartImg)
  heart2.scale = 0.1

  heart3 = createSprite(700,100,50,50)
  heart3.addImage("heart3",heartImg)
  heart3.scale = 0.1

  gameOver = createSprite(400,150,200,200)
  gameOver.addImage("GameOver",gameOverImg)
  gameOver.scale = 0.4

  restart = createSprite(400,250,200,200)
  restart.addImage("restart",restartImg)
  restart.scale = 0.2

  youWin = createSprite(400,250,200,200)
  youWin.addImage("Win",winImg)
  youWin.scale = 0.4

}
function draw() {  
  background(backgroundImg)
  if (gamestate === "play") {
    var switchCase = Math.round(random (1,2))
    switch (switchCase)
    {
    case 1: creature01()
    break
    case 2: creature02()
    break
    }
  gameOver.visible = false
  restart.visible = false
  youWin.visible = false

    
    if (Score == 10) {
      gamestate = "youWinState"
      crowdC.play()
      crowdC.setVolume(0.3)
    }
    if (jake.isTouching(creature01group)){
      life = life-1
      monsterMusic.play()
      monsterMusic.setVolume(0.4)
      creature01group.destroyEach()
      if (life ===2){
       heart3.visible = false
       monsterMusic.play()
       monsterMusic.setVolume(0.4)
      }
      if (life===1){
        heart2.visible = false
        monsterMusic.play()
        monsterMusic.setVolume(0.4)
      }
      if (life === 0 ) {
        heart1.visible = false
        gamestate = "end"
        GameOverMusic.play()
      }
      
    }

    if (jake.isTouching(creature02group)){
      life = life-1
      monsterMusic.play()
      monsterMusic.setVolume(0.4)
      creature02group.destroyEach()
      if (life ===2){
       heart3.visible = false
       monsterMusic.play()
       monsterMusic.setVolume(0.4)
      }
      if (life===1){
        heart2.visible = false
        monsterMusic.play()
        monsterMusic.setVolume(0.4)
      }
      if (life === 0 ) {
        heart1.visible = false
        gamestate = "end"
        GameOverMusic.play()
      }
    }

    if (keyDown("right")) {
      bow = createSprite(150,425,50,50)
      bow.addImage("bow",bowImg)
      bow.scale = 0.3
      bow.velocityX = 2
      bow.y = jake.y
      bowgroup.add(bow)
      arrowMusic.play()
      
    }

    if (keyDown("up")) {
      jake.y = jake.y-5
    }
    
    if (keyDown("down")) {
      jake.y=jake.y+5
    }

    if (creature01group.isTouching(bowgroup)) {

      Score = Score + 1
      bowgroup.destroyEach()
      creature01group.destroyEach()
    
    }
  
    if (creature02group.isTouching(bowgroup)) {
      Score = Score + 1
      bowgroup.destroyEach()
      creature02group.destroyEach()
    }

  
  }

  textSize(50)
  text("Avatar",180,70)

  text("Score:"+Score, 360,70)
  
   drawSprites();
  if(gamestate === "end") {
   gameOver.visible = true
   restart.visible = true
   backgroundMusic.stop()

   if (mousePressedOver(restart)){
    gamestate = "play"
    GameOverMusic.stop()
    life = 3
    Score = 0
    heart1.visible = true
    heart2.visible = true
    heart3.visible = true
   }
  }

  if (gamestate === "youWinState"){
    youWin.visible = true
  }
  

}

function creature01() {

if (frameCount%200 === 0) {
  creature1 = createSprite(700,425,50,50)
  creature1.addImage("creature1",creature1Img)
  creature1.scale = 0.3
  creature1.velocityX = Math.round(random(-5,-10))
  console.log(creature1.velocityX)
  creature1.y = Math.round(random(100,500))
  creature01group.add(creature1)
  }
}

function creature02() {
  if (frameCount%200 === 0) {
  creature2 = createSprite(700,425,50,50)
  creature2.addImage("creature2", creature2Img)
  creature2.scale = 0.3
  creature2.velocityX = Math.round(random(-5,-10))
  console.log(creature2.velocityX)
  creature2.y = Math.round(random(100,500))
  creature02group.add(creature2)
}
  }



