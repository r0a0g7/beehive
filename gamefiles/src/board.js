var CELLX = 10;
var CELLY = 10;
var _maps = new Array;
var BoardLayer = cc.Layer.extend({
    sprite:null,

    ctor:function () {
        //////////////////////////////
        // 1. super init first

            this._super();
            //this._maps = new Array;

            for (i = 0; i < CELLX; i++) {

                for (j = 0; j < CELLY; j++) {

                    this.addCell(i, j);
                }
            }


        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

       var sprite = new cc.Sprite.create(res.HelloWorld_png);
       // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(sprite, 0);

        return true;
    },

    addCell : function(x,y) {
        try {

            var cell = new Cell(x,y);
            //var size = cc.winSize;
            //cc.p(size.width / 2, size.height / 2);
            //
            //cell.setCellSpritePos(x,y);

           // cell.setUpEventListner();

            this.addChild(cell.getCellSprite(), 3);

            //cc.log("Adding PLayer");
            _maps[x, y] = cell;
            cc.log(_maps[x, y]);
            _maps[x,y].sethasMoved();
            cc.log(_maps[x,y].gethasMoved());

        }
        catch (err) {
            cc.log("inside catch");
            cc.log(err);
        }
    }

});
/*
var pop = function()
{
    INITIALIZED_2 = false;
    cc.director.popScene();

};


*/




var BoardScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
            var layer = new BoardLayer();
            this.addChild(layer);
    }
});
