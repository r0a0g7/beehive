var INITIALIZED_1 = false;

var ForestLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        var sprite = new cc.Sprite.create(res.CloseNormal_png);
        sprite.setAnchorPoint(cc.p(0.5, 0.5));
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(sprite, 0);

        var menuItem1 = new cc.MenuItemFont("Push", play);
        var menu = new cc.Menu(menuItem1);
        menu.alignItemsVertically();
        this.addChild(menu,3);

        return true;
    }
});

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
