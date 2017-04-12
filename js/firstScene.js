/**
 * Created by Daria on 02-Mar-17.
 */
var modules, grid=[], boxModules=[], modulesAdded=[];
var gridWidth=100, gridHeight=100;
var spaceBetween, n=0, animation, modulesCounter=0;
var buttonStart, startText, house;

function firstScene(){
    var row, col, img;

    house = new createjs.Bitmap(queue.getResult("house"));
    house.width=300;
    house.height=200;
    house.x=0;
    house.y=stage.canvas.height-house.height-(stage.canvas.height/11);

    buttonStart = new createjs.Bitmap(queue.getResult("doneButton"));
    /*buttonStart.graphics.clear();*/
    buttonStart.width=150;
    buttonStart.height=50;
   /* buttonStart.graphics.beginFill("blue").drawRect(0,0,buttonStart.width,buttonStart.height);*/
    buttonStart.regX=buttonStart.width/2;
    buttonStart.regY=buttonStart.height/2;
    buttonStart.x=window.innerWidth-buttonStart.width*2;
    buttonStart.y=window.innerHeight/2+2*buttonStart.height;

    startText = new createjs.Text("CHOOSE THE MODULES YOU NEED", "20px Arial", "#FFF");
    startText.textAlign="center";
    startText.textBaseline="middle";
    startText.x=stage.canvas.width/2;
    startText.y=stage.canvas.height-30;

    /*startContainer = new createjs.Container();
    startContainer.addChild(buttonStart, startText);*/
    stage.addChild(buttonStart);
    buttonStart.cursor = "pointer";

    buttonStart.addEventListener('click', goToSpaceship);

    modules = queue.getResult("modules").tiles;

    var sheet = new createjs.SpriteSheet(queue.getResult("moduleSprites"));

    for (row = 0; row < modules.length; row++) {
        grid.push([]);
        for (col=0; col<modules[row].length; col++){
            switch(modules[row][col]){
                case 0:
                    img = "billing";
                    break;
                case 1:
                    img = "community";
                    break;
                case 2:
                    img = "meetingRooms";
                    break;
                case 3:
                    img = "cafe";
                    break;
                case 4:
                    img = "machines";
                    break;
                case 5:
                    img = "memberChat";
                    break;

            }

            var t = new createjs.Sprite(sheet, img);

            t.scaleX=0.25;
            t.scaleY=0.25;

            t.row = row;
            t.col = col;

            t.regX=gridWidth/2;
            t.regY=gridHeight/2;

           /* t.x=stage.canvas.width/3*col;
            t.y=stage.canvas.height/3*row;*/

           /* if (col==0){
                t.x=t.x+stage.canvas.width/6;
            }
            if (col==modules[row].length-1){
                t.x=t.x-stage.canvas.width/6;
            }

            if (row==0){
                t.y=t.y+stage.canvas.height/6
            }*/

            t.clicked=0;
            t.cursor = "pointer";
            t.moduleAdded=0;

            grid[row].push(t);
            stage.addChild(t);

            addModules();
        }
    }
}

function addModules(){
    for (var row=0;row<grid.length;row++){
        for (var col=0; col<grid[row].length;col++){
            var t = grid[row][col];
            if (!t.moduleAdded){
                t.addEventListener('click', moduleEffect);
                t.moduleAdded=1;
            }

        }
    }
    stage.addChild(train, gun, trees, trees2, startText, house);


function moduleEffect(e){
    //modulesCounter++;
    //console.log(modulesCounter);
    e.target.clicked++;
    console.log(e.target.clicked);
    e.target.removeEventListener(e.type, arguments.callee);
    e.target.cursor="default";
    /*e.target.addEventListener('click', removeModule);
    if(e.target.clicked % 2 ==0){
        removeModule();

    } else {
        //add stuff
        var box = new createjs.Shape();
        box.width=60;
        box.height=50;
        box.graphics.beginFill("#f7bf76").drawRect(0,0, box.width,box.height);
        box.alpha=0;

        spaceBetween=box.width/3;

        box.y=platform.y-box.height;
        box.x=spaceBetween+platform.x+(boxModules.length-n)*(spaceBetween+box.width);
        boxModules.push(box);

        if(boxModules.length>0) {
            if (boxModules.length % 3 == 0) {
                n++;
                box.x = platform.x + spaceBetween * (3 + (n - 1) * 8);
                box.y = platform.y - 2 * box.height;
            }
        }

        stage.addChild(box, trees, trees2);

        createjs.
        Tween.
        get(box).
        to({
                alpha:1}
            , 300,
            createjs.Ease.linear)

    }*/

        createjs.
            Tween.
            get(e.target).
            to({
                x:stage.canvas.width/2,
                y:train.y,
                scaleX:0.14,
                scaleY:0.14},
            1000, createjs.Ease.linear);

    modulesAdded.push(e.target);
}

/*function removeModule(){
    if (boxModules.length % 3 == 0){
        n--;
    }*/
    /*stage.removeChild( boxModules[boxModules.length-1]);
    boxModules.splice( boxModules.length-1, 1 );*/

    /*e.target.removeEventListener(e.type, arguments.callee);
    e.target.addEventListener('click', moduleEffect);*/
}

function goToSpaceship(){
    if (modulesAdded.length>0){
        for (var row=0;row<grid.length;row++){
            for (var col=0;col<grid[row].length;col++){
                let t=grid[row][col];
                createjs.
                Tween.
                get(t).
                to({
                        alpha:0}
                    , 300,
                    createjs.Ease.linear)
                    .call(function(){
                        stage.removeChild(t, buttonStart);
                        animation=1;
                        setTimeout(function(){
                            animation=0;
                            effectActive=1;

                        },3000);
                    })
            }
        }
        createjs.
            Tween.
            get(house).
            to({
            alpha:0}
            ,300, createjs.Ease.linear);

        setTimeout(shootingScene, 3000)
    }
}
