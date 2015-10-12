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
        restart.setPosition(cc.p(size.width*0.5 , size.height *0.2));
        goToMap.setPosition(cc.p(size.width*0.5 , size.height *0.4));

        var youWon =new cc.MenuItemImage(res.Won_Game, res.Won_Game, res.Won_Game, doNothing, this);       //you won display
        var youLost = new cc.MenuItemImage(res.Lost_Game, res.Lost_Game, res.Lost_Game, doNothing, this);      //you lost display
        youWon.setPosition(cc.p(size.width*0.5 , size.height *0.6));
        youLost.setPosition(cc.p(size.width*0.5 , size.height *0.7));

        var honeyCollected = new cc.LabelTTF.create("You Collected  "+gCountHoney + " Honey!!");
        honeyCollected.setPosition(cc.p(size.width * 0.5,  size.height * 0.9));
        honeyCollected.color = cc.color(0,255,0);
        this.addChild(honeyCollected,4);
        this.honeyCollectedLabel = honeyCollected;


        cc.log("number of honey colleceted: " + gCountHoney);
        if(gCountHoney < NO_OF_HONEY){
            youWon.visible = false;
        } else {
            youLost.visible = false;
        }

        var menu = new cc.Menu(restart, goToMap, youWon, youLost );
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
