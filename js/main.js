/**
 * Created by Daria on 31-Jan-17.
 */
var cloudA, cloudB, cloudA2, cloudB2, city, city2, mountain, mountain2;
var stage, timeoutResize;
var train, gun, enemyShip, platform;
var effectActive=false, moveStop=false, moveToRocket=false;
var shots=[], enemyShots=[];
var renderedTheFirstTime=false;
var muteButton, isMuted=false;

var controls={
    left:false,
    right:false
};
var direction={
    x:4,
    y:1
};
var heartDrawX, lives=[];

window.addEventListener('resize', resize, false);

function init() {
    if(!renderedTheFirstTime){
        renderedTheFirstTime=true;
    }

    createBackground();

    resize();

    muteButton = new createjs.Bitmap(queue.getResult("mute"));
    muteButton.width=50;
    muteButton.height=500;
    muteButton.x=stage.canvas.width-muteButton.width-50;
    muteButton.y=50;
    muteButton.cursor='pointer';
    stage.addChild(muteButton);


    createjs.Ticker.setFPS(45);
    createjs.Ticker.addEventListener('tick', tock);

    stage.enableMouseOver(10);

    muteButton.addEventListener("click", function () {
         if (isMuted) {
            isMuted = false;
            createjs.Sound.muted = isMuted;
         } else {
            isMuted = true;
            createjs.Sound.muted = isMuted;
         }
    });
    game();


}

function game(){
    setTimeout(function(){
        document.querySelector('#demoCanvas').classList.add('show');
    }, 300);

    createContent();
    resize();


    firstScene();
}

function tock() {
    if (!moveStop){
        moveTrain();
    }
    
    if (effectActive){
        backgroundEffect(2);
        moveSpaceship();

    }
    moveShots();
    moveEnemyShots();

    if (enemyShip){
        if(!enemyShip.alive){
            goToRocket();
        }
    }

    if(animation){
        backgroundEffect(4);
        cloudEffect(4);
    }
    if(cloudA){
        cloudEffect(1);
    }

    stage.update();

}

function resize() {
    if (timeoutResize){
        clearTimeout(timeoutResize);
    }
    timeoutResize = setTimeout(function() {
        // Resize the canvas element
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;

        /*if (stage.canvas.width<700){
            document.querySelector('#demoCanvas').classList.add('not-displayed');
            noGame();
        }
*/
        resizeContent();
    },200);

}

//BACKGROUND
function createBackground() {
    createClouds();
    createMountains();
    createCity();
    /*createTrees();*/
    stage.addChild(cloudA, cloudA2, cloudB, cloudB2, mountain, mountain2, city, city2);
}

function backgroundResize(bg){
    bg.graphics.clear();
    bg.graphics.beginBitmapFill(bg.img, "no-repeat").drawRect(0, 0, bg.img.width, bg.img.height);

    bg.scaleX = parseFloat(stage.canvas.width / bg.img.width);
    bg.scaleY = parseFloat(stage.canvas.height / bg.img.height);
}

function createClouds(){
    cloudA = new createjs.Shape();
    cloudA.x=0;
    cloudA.img=queue.getResult('cloudA');

    cloudA2 = new createjs.Shape();
    cloudA2.x=stage.canvas.width;
    cloudA2.img=queue.getResult('cloudA');

    /*cloudB = new createjs.Shape();
    cloudB.x=0;
    cloudB.img=queue.getResult('cloudB');

    cloudB2 = new createjs.Shape();
    cloudB2.x=stage.canvas.width;
    cloudB2.img=queue.getResult('cloudB');*/

}

function createMountains(){
    mountain = new createjs.Shape();
    mountain.x=0;
    mountain.img=queue.getResult('mountain');

    mountain2 = new createjs.Shape();
    mountain2.x=stage.canvas.width;
    mountain2.img=queue.getResult('mountain');
}

function createCity(){
    city = new createjs.Shape();
    city.x=0;
    city.y=22;
    city.img = queue.getResult('city');

    city2 = new createjs.Shape();
    city2.x=0;
    city2.y=22;
    city2.img = queue.getResult('city');

}

/*function createTrees(){
    trees = new createjs.Shape();
    trees.x=0;
    trees.img = queue.getResult('trees');
    trees.scaleX=1.5;
    trees.scaleY=1.5;

    trees2 = new createjs.Shape();
    trees2.x=0;
    trees2.img = queue.getResult('trees');
    trees2.scaleX=1.5;
    trees2.scaleY=1.5;

}*/

function backgroundEffect(speed){
    city.x-=speed*0.8;
    city2.x-=speed*0.8;
    if (city.x<=-stage.canvas.width){
         city.x=city2.x+stage.canvas.width;
    }
    if (city2.x<=-stage.canvas.width){
        city2.x=city.x+stage.canvas.width;
    }

   /* trees.x-=speed;
    trees2.x-=speed;
    if (trees.x<=-stage.canvas.width){
        trees.x=trees2.x+stage.canvas.width;
    }
    if (trees2.x<=-stage.canvas.width){
        trees2.x=trees.x+stage.canvas.width;
    }*/

    mountain.x-=speed*0.5;
    mountain2.x-=speed*0.5;
    if (mountain.x<=-stage.canvas.width){
        mountain.x=mountain2.x+stage.canvas.width;
    }
    if (mountain2.x<=-stage.canvas.width){
        mountain2.x=mountain.x+stage.canvas.width;
    }
}


function cloudEffect(speed){
    cloudA.x-=speed;
    cloudA2.x-=speed;
    /*cloudB.x-=speed;
    cloudB2.x-=speed;*/

    if (cloudA.x<=-stage.canvas.width){
        cloudA.x=cloudA2.x+stage.canvas.width;
    }
    if (cloudA2.x<=-stage.canvas.width){
        cloudA2.x=cloudA.x+stage.canvas.width;
    }
    /*if (cloudB.x<=-stage.canvas.width){
        cloudB.x=cloudB2.x+stage.canvas.width;
    }
    if (cloudB2.x<=-stage.canvas.width){
        cloudB2.x=cloudB.x+stage.canvas.width;
    }*/
}


//CONTENT
function createContent() {

    train = new createjs.Bitmap(queue.getResult("train"));
    train.width=400;
    train.height=75;
    train.regX=train.width/2;
    train.regY=train.height/2;
    train.speed=6;

    gun = new createjs.Bitmap(queue.getResult("gun"));
    gun.width=50;
    gun.height=50;
    gun.regX=gun.width/2;
    gun.regY=gun.height/2;

    stage.addChild(train, gun, platform/*, trees, trees2*/)

}

function resizeContent(){
    muteButton.x=stage.canvas.width-muteButton.width-50;
    muteButton.y=50;

    if (cloudA){
        backgroundResize(cloudA);
        cloudA.x=0;

        backgroundResize(cloudA2);
        cloudA2.x=stage.canvas.width;

        /*backgroundResize(cloudB);
        cloudB.x=stage.canvas.width/4;

        backgroundResize(cloudB2);
        cloudB2.x=stage.canvas.width+stage.canvas.width/4;*/
    }

    if (mountain){
        backgroundResize(mountain);
        mountain.x=0;

        backgroundResize(mountain2);
        mountain2.x=stage.canvas.width;
    }

    if (city){
        backgroundResize(city);
        city.x=0;

        backgroundResize(city2);
        city2.x=stage.canvas.width;

        city.scaleX=city.scaleX*1.001;
        city.scaleY=city.scaleY*1.001;
        city2.scaleX=city2.scaleX*1.001;
        city2.scaleY=city2.scaleY*1.001;
    }

    /*if (trees){
        backgroundResize(trees);
        trees.x=0;
        trees.y=30;

        backgroundResize(trees2);
        trees2.x=stage.canvas.width;
        trees2.y=30;
    }*/

    if (train){
        if (arrived || moveToRocket){
            train.x = stage.canvas.width / 2-150;
        }else{
            train.x=stage.canvas.width/2;
        }
        train.y=stage.canvas.height-(stage.canvas.height/6.7);
    }

    if (gun){
        gun.y=train.y-train.height+gun.height/2;
        gun.x=train.x;
    }


    if(enemyShip){
        enemyShip.x=window.innerWidth/2;
        enemyShip.y=stage.canvas.height/4;
    }

    if (rocket){
        if (rocketUp){
            fire.x=stage.canvas.width/2-32;
            rocket.x=stage.canvas.width/2;
        }else{
            rocket.x=4*stage.canvas.width/5;
        }
        rocket.y=stage.canvas.height/2+100;
    }

    if(button){
        button.x=stage.canvas.width/2;
        button.y=stage.canvas.height/4;

    }

    if (grid.length>0 && counter<0) {
        for (row = 0; row < modules.length; row++) {
            for (col = 0; col < modules[row].length; col++) {
                var t = grid[row][col];

                if(!t.clicked){
                    t.x = stage.canvas.width / 3 * (col+0.5);
                    t.y = stage.canvas.height / 3 * (row+0.5);

                    if (col == 0) {
                        t.x = t.x + stage.canvas.width / 5;
                    }
                    if (col == modules[row].length - 1) {
                        t.x = t.x - stage.canvas.width / 5;
                    }

                    if (row == 0) {
                        t.y = t.y + stage.canvas.height / 7;
                    }
                }else{
                    t.x=stage.canvas.width/2;
                    t.y=train.y;
                }


            }
        }
    }

    /*if (boxModules.length>0){
        n=0;
        for (var i=0;i<boxModules.length;i++){
            var box=boxModules[i];
            box.y=platform.y-box.height;
            box.x=spaceBetween+platform.x+(i-n)*(spaceBetween+box.width);

            if ((i+1) % 3 == 0) {
                n++;
                box.x = platform.x + spaceBetween * (3 + (n - 1) * 8);
                box.y = platform.y - 2 * box.height;
            }
        }

    }*/

    if (buttonStart){
        buttonStart.x=window.innerWidth-buttonStart.width*2;
        buttonStart.y=window.innerHeight/2+buttonStart.height;

        startText.x=stage.canvas.width/2;
        startText.y=stage.canvas.height-30;

    }

    if (cloudBig){
        cloudBig.x=stage.canvas.width/2;
        cloudBig.y=stage.canvas.height/2;

        logo.x=stage.canvas.width/2;
        logo.y=stage.canvas.height/2;

        siteButton.x=stage.canvas.width/2;
        siteButton.y=logo.y+logo.width/2;
    }

}
