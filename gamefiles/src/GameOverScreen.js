var GameOverLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;
        var sprite = new cc.Sprite(res.Forest_BG_png);
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(sprite, 0);

        var restart = new cc.MenuItemImage(res.Restart_Game, res.Restart_Game, res.Restart_Game, restartGame, this);       //Go toMap Button
        var goToMap = new cc.MenuItemImage(res.Goto_Menu, res.Goto_Menu, res.Goto_Menu, gotoMap, this);   //Go to Restart Button
        restart.setPosition(cc.p(size.width*0.5 , size.height *0.25));
        goToMap.setPosition(cc.p(size.width*0.5 , size.height *0.5));

        var youWon = new cc.LabelTTF.create("You found all honey!","Verdana", 25);
        youWon.setPosition(cc.p(size.width*0.4 , size.height *0.7));
        youWon.color = cc.color(0,255,0);
        this.addChild(youWon,4);

        var youLost = new cc.LabelTTF.create("You got stung!","Verdana", 25);
        youLost.setPosition(cc.p(size.width*0.4 , size.height *0.7));
        youLost.color = cc.color(255,0,0);
        this.addChild(youLost,4);

        var honeyCollected = new cc.LabelTTF.create("You Collected  "+gCountHoney + " Honey!!", "Verdana", 25);
        honeyCollected.setPosition(cc.p(size.width * 0.5,  size.height * 0.84));
        honeyCollected.color = cc.color(0,255,0);
        this.addChild(honeyCollected,4);
        this.honeyCollectedLabel = honeyCollected;

        var gameLifeLabelOver = new cc.LabelTTF.create(gameLifeLeft, "Verdana", 25);
        gameLifeLabelOver.setPosition(cc.p(size.width * 0.6,  size.height * 0.68));
        this.addChild(gameLifeLabelOver,4);
        this.gameLifeValue = gameLifeLabelOver;

        var LifeSpriteOver = new cc.Sprite(res.Life_left_Big);
        LifeSpriteOver.setPosition(cc.p(size.width * 0.55, size.height * 0.7));
        this.addChild(LifeSpriteOver, 1);

        cc.log("number of honey colleceted: " + gCountHoney);
        if(gCountHoney < NO_OF_HONEY){
            youWon.visible = false;
        } else {
            honeyCollected.visible = false;
            youLost.visible = false;
        }

        var menu = new cc.Menu(restart, goToMap);
        menu.setPosition(cc.p(0, 0));
        cc.log("Selection Menu on restart");
        this.addChild(menu,2);
        return true;
    }
});


var gotoMap = function()
{
    cc.log("gameover to map");
    gCountOpen = 0;
    gCountBee = 0;
    gCountHoney = 0;
    gameCounterSec=consts.COUNTER_VALUE;
    INITIALIZED_1=false;
    var scene = new ForestScene();
    cc.director.runScene(scene);
};

var restartGame = function()
{
    cc.log("gameover to game");
    gCountOpen = 0;
    gCountBee = 0;
    gCountHoney = 0;
    gameCounterSec=consts.COUNTER_VALUE;
    var scene = new BoardScene();
    cc.director.pushScene(scene);
};

var doNothing = function()
{
};


var GameOverScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        cc.log("GameOver");

            var layer = new GameOverLayer();
            this.addChild(layer);
    }
});
