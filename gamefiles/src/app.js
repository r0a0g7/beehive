var INITIALIZED = false;

var HelloWorldLayer = cc.Layer.extend({
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

        var sprite = new cc.Sprite.create(res.HelloWorld_png);
        sprite.setAnchorPoint(cc.p(0.5, 0.5));
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(sprite, 0);


        var transitionTime = 1;
// Create the next scene
        var nextScene = new ForestScene();
// Create the transition scene with the next scene
        var transitionScene = new cc.TransitionProgressInOut(transitionTime, nextScene);

        cc.director.runScene(new cc.TransitionFadeUp(1,transitionScene));

       /* var menuItem1 = new cc.MenuItemFont("Push", play);
        var menu = new cc.Menu(menuItem1);
        menu.alignItemsVertically();
        this.addChild(menu,2);*/

        return true;
    }
});

var play = function()
{


};

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        if (INITIALIZED == false)
        {
            INITIALIZED = true;

            var layer = new HelloWorldLayer();
            this.addChild(layer);
        }
    }
});
