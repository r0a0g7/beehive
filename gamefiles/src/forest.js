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
cc.log(size.width+","+size.height);
        var sprite = new cc.Sprite.create(res.CloseNormal_png);
       // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(sprite, 0);
try {

    var item1 = cc.MenuItemImage.create(res.CellNormal_png, res.CellNormal_png, res.CellNormal_png, level1Run, this)
    var item2 = cc.MenuItemImage.create(res.Level_enabled_png, res.Level_Selected_png, res.Level_disabled_png, level2Run, this)
    var item3 = cc.MenuItemImage.create(res.Level_enabled_png, res.Level_Selected_png, res.Level_disabled_png, level3Run, this)
    cc.log("initializing ");

    var menuItem1 = new cc.MenuItemFont("Play Sound", this, this.playSound);
    var menuItem2 = new cc.MenuItemFont("Play Song", this, this.playSong);
    var menuItem3 = new cc.MenuItemFont("Stop Playing Song", this, this.stopPlayingSound);
   // var menuItem4 = new cc.MenuItemFont("Exit", this, this.exit);

    item1.setPosition(cc.p(size.width/2 , size.height / 2 + 50));
    item2.setPosition(cc.p(size.width/2 , size.height / 2));
    item3.setPosition(cc.p(size.width/2 , size.height / 2 - 50));
    //menuItem4.setPosition(new cc.Point(size.width / 2, size.height / 2 - 100));
    cc.log("Setting POsition ");
    var menu = cc.Menu.create(item1, item2, item3);
   menu.setPosition(cc.p(0, 0));
    cc.log("Initialising Menu");
    this.addChild(menu,2);
    cc.log("Done Menu");
/*
    var newSprite = cc.Sprite.create(res.CellNormal_png);
    newSprite.setPosition(cc.p(size.width / 2, size.height / 2 +100));
    this.addChild(newSprite,5);
*/
}catch(err){
            cc.log(err);
        }

        return true;
    }
});


var level1Run = function()
{
    //For higher levels pass parameters to this one
    cc.log("inside Level 1");
    var scene = new BoardScene();
    cc.director.runScene(scene);
};

var level2Run = function()
{
    //For higher levels pass parameters to this one
    var scene = new BoardScene();
    cc.director.runScene(scene);
};

var level3Run = function()
{
    //For higher levels pass parameters to this one
    var scene = new BoardScene();
    cc.director.runScene(scene);
};
var play = function()
{
    var scene = new BoardScene();
    cc.director.runScene(scene);
};

var ForestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
cc.log("ForestScene");
        if (INITIALIZED_1 == false)
        {
            cc.log("initializing layer");
            INITIALIZED_1 = true;

            var layer = new ForestLayer();
            this.addChild(layer);
        }
    }
});
