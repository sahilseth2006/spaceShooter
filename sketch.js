


var shooter,shooterAmmo,bg,enemy;

var shooterImg,shooterAmmoImg,enemy1Img,enemy2Img,enemy3Img,bgImage;

var enemyGroup,shooterAmmoGroup;

var score=0
function preload(){

	bgImage=loadImage("images/bg.jpg")	
	shooterImg=loadImage("images/shooter2.png");
	shooterAmmoImg=loadImage("images/ammo2.png");
	enemy1Img=loadImage("images/enemy1.png")
	enemy2Img=loadImage("images/enemy2.png")
	
	enemy3Img=loadImage("images/enemy7.png")
	
}

function setup() {
	createCanvas(displayWidth-10, displayHeight-10);




	//Create the Bodies Here.
	bg=createSprite(displayWidth/2,displayHeight/2-200,displayWidth,displayHeight)
	bg.addImage(bgImage)
	bg.velocityY=3


	shooter=createSprite(displayWidth/2,displayHeight/2+200,30,30)
	shooter.addImage(shooterImg)

	enemyGroup=new Group()
	shooterAmmoGroup=new Group();
  
}


function draw() {
	
  background(0);
   
  //console.log(bg.y)
  spawnEnemy()
 

	if(keyDown("space")){
		createAmmo()
	}


	if(keyDown(UP_ARROW)){
		shooter.y-=20
	}


	if(keyDown(DOWN_ARROW)){
		shooter.y+=20
	}


	if(keyDown(LEFT_ARROW)){
		shooter.x-=20
	}


	if(keyDown(RIGHT_ARROW)){
		shooter.x+=20
	}

	if(enemyGroup.isTouching(shooterAmmoGroup)){
		shooterAmmoGroup.destroyEach();
		enemyGroup.destroyEach();
		score=score+10
	}
	
	if(bg.y>600 ){
		bg.y=displayHeight/2
	}
	drawSprites();
	textSize(30)
	fill("blue")
	text("score:"+score,100,70)
}

function spawnEnemy(){

	//var r=Math.round(random(180,270))
    if(frameCount % 200===0){

        enemy=createSprite(random(100,600),0,30,30)

        var rand=Math.round(random(1,3))
        switch(rand){
            case 1:enemy.addImage(enemy1Img)
			//enemy.debug=true
			enemy.setCollider("circle",0,0,200)
            enemy.scale=0.2
            break;

            case 2:enemy.addImage(enemy2Img)
			//enemy.debug=true
          //  enemy.scale=0.5
            break;

            case 3:enemy.addImage(enemy3Img)
			//enemy.debug=true
           enemy.scale=0.2
            break;
            default:break;
          
        }
        enemy.velocityY=4
        enemy.lifetime=displayWidth/4
		enemyGroup.add(enemy)

		enemy.depth=shooter.depth
         shooter.depth+=1

       
     
        
    }

}

function createAmmo(){
	var shooterAmmo= createSprite(100, 500, 60, 10);
	//shooterAmmo.debug=true
	shooterAmmo.setCollider("rectangle",0,0,100,450)
	shooterAmmo.scale=0.5
	shooterAmmo.addImage(shooterAmmoImg);
	//arrow.x = 360;
	shooterAmmo.x=shooter.x;
	shooterAmmo.velocityY = -5;
	shooterAmmoGroup.add(shooterAmmo)
	shooterAmmo.lifetime=displayWidth/5

	
}
