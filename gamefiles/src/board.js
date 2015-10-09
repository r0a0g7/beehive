
var BoardLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        this._cells = new Array;

        for (i = 0; i < 10; i++) {
            this.addCell(i);
        }

        //just check the first cell in array got the value for hasBall
        var doescellhaveball = this._cells[0].getHasBall();
        cc.log(doescellhaveball);

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

      /*  var sprite = new cc.Sprite.create(res.CellNormal_png);
        sprite.setAnchorPoint(cc.p(0.5, 0.5));
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(sprite, 0);*/
        /*var menuItemPlay = new cc.MenuItemSprite(
            new cc.Sprite(res.ck2), // normal state image
            new cc.Sprite(res.ck2), // select state image
            this.onPlay, this);


        var menuItem1 = new cc.MenuItemFont("Pop", pop);
        var menu = new cc.Menu(menuItem1);
        menu.alignItemsVertically();
        this.addChild(menu, 1);*/

        return true;
    },

    addCell : function(x) {
        try {

            var cell = new Cell(x);
            cell.setCellSpritePos(x,75);
            cell.setHasBall(true);
            cell.setHasBall(false);
            cc.log("Adding Menu");

            cc.log("Added Menu");
            this.addChild(cell.getCellSprite(), 3);

            cc.log("Adding PLayer");
            this._cells.push(cell);

            this._numberOfCells++;
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
