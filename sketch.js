/***********************************************************************************
  Simple
  by Scott Kildalls

  Uses the p5.2DAdventure.js class 

  To do:
  ** cleanup p5.2DAdventure.js class + document it
  ** add mouse events, other interactions
  ** finish MazeMapper
  
------------------------------------------------------------------------------------
	To use:
	Add this line to the index.html

  <script src="p5.2DAdventure.js"></script>
***********************************************************************************/

// adventure manager global  
var adventureManager;

// p5.plau
var playerSprite;
var playerAnimation;
var spriteFrontIdle;

// Allocate Adventure Manager with states table and interaction tables
function preload() {
  adventureManager = new AdventureManager("data/adventureStates.csv", "data/interactionTable.csv");
  spriteFrontIdle = loadAnimation('assets/em_spritefront1.png', 'assets/em_spritefront2.png');
  spriteLeftIdle = loadAnimation('assets/em_spriteleftstand1.png', 'assets/em_spriteleftstand2.png');
  spriteRightIdle = loadAnimation('assets/em_spriterightstand1.png', 'assets/em_spriterightstand2.png');
  spriteBackIdle = loadAnimation('assets/em_spriteback1.png', 'assets/em_spriteback2.png');
  spriteFrontWalk = loadAnimation('assets/em_spritefrontwalk1.png', 'assets/em_spritefront1.png',
   'assets/em_spritefrontwalk2.png', 'assets/em_spritefront1.png');
  spriteLeftWalk = loadAnimation('assets/em_spriteleft1.png', 'assets/em_spriteleftstand1.png',
   'assets/em_spriteleft2.png', 'assets/em_spriteleftstand1.png');
  spriteRightWalk = loadAnimation('assets/em_spriteright1.png', 'assets/em_spriterightstand1.png',
   'assets/em_spriteright2.png', 'assets/em_spriterightstand1.png');
  spriteBackWalk = loadAnimation('assets/em_spritebackwalk1.png', 'assets/em_spriteback1.png',
   'assets/em_spritebackwalk2.png', 'assets/em_spriteback1.png');
}

// Setup the adventure manager
function setup() {
  createCanvas(1280, 720);

  // This will load the images, go through state and interation tables, etc
  adventureManager.setup();

    // create a sprite and add the 3 animations
  playerSprite = createSprite(width/2, height/2);
  spriteFrontIdle.frameDelay = 14;
  spriteLeftIdle.frameDelay = 14;
  spriteRightIdle.frameDelay = 14;
  spriteBackIdle.frameDelay = 14;
  spriteFrontWalk.frameDelay = 12;
  spriteLeftWalk.frameDelay = 12;
  spriteRightWalk.frameDelay = 12;
  spriteBackWalk.frameDelay = 12;
  playerSprite.addAnimation('regular', spriteFrontWalk);

  // use this to track movement from toom to room in adventureManager.draw()
  adventureManager.setPlayerSprite(playerSprite);
}

// Adventure manager handles it all!
function draw() {
  // draws background rooms and handles movement from one to another
  adventureManager.draw();

  // responds to keydowns
  moveSprite();

  // this is a function of p5.js, not of this sketch
  drawSprites();
}

// pass to adventure manager, this do the draw / undraw events
function keyPressed() {
  // toggle fullscreen mode
  if( key === 'f') {
    fs = fullscreen();
    fullscreen(!fs);
  }

  // dispatch key events for adventure manager to move from state to 
  // state or do special actions - this can be disabled for NPC conversations
  // or text entry
  adventureManager.keyPressed(key);  
}

//-------------- YOUR SPRITE MOVEMENT CODE HERE  ---------------//
function moveSprite() {
  if(keyIsDown(RIGHT_ARROW))
    playerSprite.velocity.x = 10;
  else if(keyIsDown(LEFT_ARROW))
    playerSprite.velocity.x = -10;
  else
    playerSprite.velocity.x = 0;

  if(keyIsDown(DOWN_ARROW))
    playerSprite.velocity.y = 10;
  else if(keyIsDown(UP_ARROW))
    playerSprite.velocity.y = -10;
  else
    playerSprite.velocity.y = 0;
}


//-------------- SUBCLASSES / YOUR DRAW CODE CAN GO HERE ---------------//
