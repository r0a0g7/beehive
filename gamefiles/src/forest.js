var INITIALIZED_1 = false;

var ForestLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image,    which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
//cc.log(size.width+","+size.height);
        var sprite = new cc.Sprite(res.Forest_BG_png);
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(sprite, 0);
try {

    var item1 = new cc.MenuItemImage(res.Cell_Bee_GameOver_png, res.CellBee_png, res.CellNormal_png, level1Run, this)
    var item2 = new cc.MenuItemImage(res.Cell_Bee_GameOver_png, res.CellBee_png, res.Level_disabled_png, level2Run, this)
    var item3 = new cc.MenuItemImage(res.Cell_Bee_GameOver_png, res.CellBee_png, res.Level_disabled_png, level3Run, this)

    item1.setPosition(cc.p(size.width *0.25 , size.height *0.3));
    item2.setPosition(cc.p(size.width*0.4 , size.height *0.7));
    item3.setPosition(cc.p(size.width*0.6 , size.height *0.4 ));
    //menuItem4.setPosition(new cc.Point(size.width / 2, size.height / 2 - 100));
    cc.log("Setting POsition ");
    var menu = new cc.Menu(item1, item2, item3);
   menu.setPosition(cc.p(0, 0));

    this.addChild(menu,2);


}catch(err){
            cc.log(err);
        }

        return true;
    }
});


var level1Run = function()
{
    //For higher levels pass parameters to this one
    cc.audioEngine.playEffect(res.select_mp3);
    cc.log("inside Level 1");
    var scene = new BoardScene();
    cc.director.pushScene(scene);
};

var level2Run = function()
{
    //For higher levels pass parameters to this one
    cc.audioEngine.playEffect(res.select_mp3);
    var scene = new BoardScene();
    cc.director.pushScene(scene);
};

var level3Run = function()
{
    //For higher levels pass parameters to this one
    cc.audioEngine.playEffect(res.select_mp3);
    var scene = new BoardScene();
    cc.director.pushScene(scene);
};


var ForestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
cc.log("ForestScene");
        if (INITIALIZED_1 == false)
        {
            INITIALIZED_1 = true;

            var layer = new ForestLayer();
            this.addChild(layer);
        }
    }
});
