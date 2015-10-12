var HelloWorldLayer = cc.Layer.extend({
    sprite: null,
    audioEngine: null,
    musicPlayer: null,
    ctor: function () {
        this._super();

        try {
            var size = cc.winSize;
            cc.audioEngine.playEffect(res.s_music_background,true);
           
            var sprite = new cc.Sprite(res.Forest_BG_png);
            sprite.attr({
                x: 0,
                y: 0,
                anchorX: 0,
                anchorY: 0
            });
            this.addChild(sprite);

            var gameNameLabel = cc.LabelTTF.create("Buzz..", res.LDFComicSans, 100);
            gameNameLabel.setPosition(size.width / 2, size.height / 2 + size.height * .35);
            gameNameLabel.setAnchorPoint(.5, .5);
            this.addChild(gameNameLabel);

            var buttonFont = "Arial Rounded MT Bold";
            var buttonFontSize = 20;

            var item1 = new cc.MenuItemImage(res.StartButton_png, res.StartButtonPressed_png, res.CellNormal_png,startGame, this);
            item1.setPosition(cc.p(size.width/2 , size.height / 2 + 50));
            var menu = new cc.Menu(item1);
            menu.setPosition(cc.p(0, 0));

         this.addChild(menu);


            //6.create a menu and assign onPlay event callback to it
           
          

            //musicPlayer = new cc.MenuItemSprite(
            //    new cc.Sprite(res.stopMusic), // normal state image
            //    new cc.Sprite(res.playMusic), // select state image
            //    this.stopPlay, this);
            //var musicMenu = new cc.Menu(musicPlayer);  //7. create the menu
            //musicMenu.setPosition(cc.p(winsize.width - 10, winsize.height - 40))
            //this.addChild(musicMenu);

        } catch (err) {
            cc.log(err);
        }

        return true;
    },


});

var startGame = function()
{
    cc.audioEngine.playEffect(res.Bee_mp3);
    //For higher levels pass parameters to this one
    cc.log("inside Level 1");
    var scene = new ForestScene();
   // cc.director.runScene(new cc.TransitionFadeUp(3,scene));
    cc.director.runScene(scene);
};

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        //to close app in android
        if (cc.sys.isNative) {
            createBackButtonListener.call(this);
        }
        var layer = new HelloWorldLayer();

        this.addChild(layer);
    }
});

var createBackButtonListener = function () {
    cc.eventManager.addListener({
        event: cc.EventListener.KEYBOARD,

        onKeyReleased: function (key, event) {
            if (key == cc.KEY.back) {
                cc.director.end(); //this will close app
            }
        }
    }, this);
};

