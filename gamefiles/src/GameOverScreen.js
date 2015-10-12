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
        restart.setPosition(cc.p(size.width*0.65 , size.height *0.15));
        goToMap.setPosition(cc.p(size.width*0.35 , size.height *0.15));

        var UpperBGr = new cc.Sprite(res.UpperBG);
        UpperBGr.setPosition(cc.p(size.width * 0.5, size.height * 0.7));
        this.addChild(UpperBGr, 1);

        var LowerBGr = new cc.Sprite(res.UpperBG);
        LowerBGr.setPosition(cc.p(size.width * 0.5, size.height * 0.25));
        this.addChild(LowerBGr, 1);

        var youWon = new cc.LabelTTF.create("You found all honey!",res.LDFComicSans, 50);
        youWon.setPosition(cc.p(size.width*0.5 , size.height *0.85));

        this.addChild(youWon,4);

        var youLost = new cc.LabelTTF.create("You got stung!",res.LDFComicSans, 50);
        youLost.setPosition(cc.p(size.width*0.5 , size.height *0.85));

        this.addChild(youLost,4);



        var honeyCollectedSprite = new cc.LabelTTF.create("0"+gCountHoney, res.LDFComicSans, 40);
        honeyCollectedSprite.setPosition(cc.p(size.width * 0.55,  size.height * 0.65));
        this.addChild(honeyCollectedSprite,5);
        this.honeyCollectedLabel = honeyCollectedSprite;

        var Honeycollected = new cc.Sprite(res.HoneyIcon);
        Honeycollected.setPosition(cc.p(size.width * 0.45, size.height * 0.65));
        this.addChild(Honeycollected, 1);


        var gameLifeLabelOver = new cc.LabelTTF.create(gameLifeLeft, res.LDFComicSans, 40);
        gameLifeLabelOver.setPosition(cc.p(size.width * 0.55,  size.height * 0.35));
        this.addChild(gameLifeLabelOver,4);
        this.gameLifeValue = gameLifeLabelOver;

        var LifeSpriteOver = new cc.Sprite(res.Life_left_Big);
        LifeSpriteOver.setPosition(cc.p(size.width * 0.45, size.height * 0.35));
        this.addChild(LifeSpriteOver, 1);

        cc.log("number of honey colleceted: " + gCountHoney);
        if(gCountHoney < NO_OF_HONEY){
            youWon.visible = false;
        } else {
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
