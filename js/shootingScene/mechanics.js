/**
 * Created by Daria on 21-Feb-17.
 */
var bmpSeq;

function shootingScene(){
    window.addEventListener("keydown", moveOrShootControls);
    window.addEventListener("keyup", resetControls);

    startText.text="DESTROY THE SPACESHIP: MOVE WITH ARROW CONTROLS AND SHOOT WITH SPACEBAR";

    enemyShip = new createjs.Bitmap(queue.getResult("spaceship"));
    enemyShip.width=350;
    enemyShip.height=150;
    enemyShip.regX=enemyShip.width/2;
    enemyShip.regY=enemyShip.height/2;
    enemyShip.x=window.innerWidth/2;
    enemyShip.y=stage.canvas.height/4;
    enemyShip.alive=true;
    enemyShip.health=5;
    enemyShip.x=2*stage.canvas.width/3;
    enemyShip.y=-500;
    stage.addChild(enemyShip);

    createjs.
    Tween.
    get(enemyShip).
    to({
            x:window.innerWidth/2,
            y:stage.canvas.height/4}
        , 1500,
        createjs.Ease.linear)
        .call(function(){
            effectActive=true;
        });

    shootInterval = setInterval(function(){
        enemyShoot();
    }, 1000);


    //LIVES METER DRAWING
    lives=[];
    heartDrawX=0;
    if (enemyShip.health>0){
        for (i=0;i<enemyShip.health;i++){
            var life = new createjs.Bitmap(queue.getResult("heart"));
            life.x=heartDrawX;
            lives.push(life);
            stage.addChild(life);
            heartDrawX+=64;
        }
    }

}


function shoot(){
    var shot = new createjs.Bitmap(queue.getResult("shot"));
    /*shot.graphics.beginFill("#ff9d18");
    shot.graphics.drawRect(0,0,10,10);*/
    shot.width = 10;
    shot.height = 10;
    shot.x = gun.x-shot.width/2;
    shot.y = gun.y-gun.width/2;
    shot.speed = 8;

    var shootSound = new createjs.Sound.play("shootSound");
    shootSound.setVolume(0.5);

    stage.addChild(shot);
    shots.push( shot );
}

function explode(){
    stage.removeChild(enemyShip);
    clearInterval(shootInterval);
    direction.x=0;
    direction.y=0;
    explosionSpriteSheet = new createjs.SpriteSheet(queue.getResult("explosionSprite"));
     var explosion = new createjs.Sprite(explosionSpriteSheet, "explode1");
     explosion.x = enemyShip.x-enemyShip.width/2;
     explosion.y = enemyShip.y-enemyShip.height/2;
     var n=40;
     setTimeout(function(){
         explosion.gotoAndPlay('explode2');
     },n);
    setTimeout(function(){
        explosion.gotoAndPlay('explode3');
    },2*n);
    setTimeout(function(){
        explosion.gotoAndPlay('explode4');
    },3*n);
    setTimeout(function(){
        explosion.gotoAndPlay('explode5');
    },4*n);
    setTimeout(function(){
        explosion.gotoAndPlay('explode6');
    },5*n);
    setTimeout(function(){
        explosion.gotoAndPlay('explode7');
    },6*n);
    setTimeout(function(){
        explosion.gotoAndPlay('explode8');
    },7*n);
    setTimeout(function(){
        createjs.Tween.get(explosion). to({
            alpha:0
        },200, createjs.Ease.linear)
            .call(function(){
                stage.removeChild(explosion);
            })
    },8*n);
     /*explosion.scaleX=3;
     explosion.scaleY=3;*/
    stage.addChild(explosion);

}

function enemyShoot(){
    var shot = new createjs.Bitmap(queue.getResult("shot2"));
    /*shot.graphics.beginFill("#ff6100");
    shot.graphics.drawRect(0,0,10,10);*/
    shot.width = 10;
    shot.height = 10;
    shot.x = enemyShip.x-shot.width/2;
    shot.y = enemyShip.y+enemyShip.height/2;
    shot.speed = 8;

    var enemyShootSound = new createjs.Sound.play("enemyShootSound");
    enemyShootSound.setVolume(0.5);

    stage.addChild(shot);
    enemyShots.push( shot );
}
