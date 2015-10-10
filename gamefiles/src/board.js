var CELLX = 10;
var CELLY = 10;
var PERCENTAGE = 0.1;

var consts = {};
consts.CLICK_MODE_OPEN = 1;
consts.CLICK_MODE_BEE = 2;

var gClickMode = consts.CLICK_MODE_OPEN;
var gCountOpen = 0;
var gCountBee = 0;
var gCountHoney = 0;

var _maps = new Array;
var BoardLayer = cc.Layer.extend({
    sprite:null,

    ctor:function () {

            this._super();

            for (i = 0; i < CELLX; i++) {
                for (j = 0; j < CELLY; j++) {
                    this.addCell(i, j);
                }
            }

        this.neighbourLogic();
        this.fixBees();


        var size = cc.winSize;

       var sprite = new cc.Sprite.create(res.HelloWorld_png);
       // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(sprite, 0);

        var menuItemBeeBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.CellBee_png), // normal state image
            new cc.Sprite(res.CellBee_png), // select state image
            this.onMarkBee, this);
        var menu = new cc.Menu(menuItemBeeBtn);  //7. create the menu
        menu.setPosition(cc.p(size.width *0.1, size.height*0.2));
        this.addChild(menu);

        var menuItemOpenBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.CellPressed_png), // normal state image
            new cc.Sprite(res.CellPressed_png), // select state image
            this.onMarkOpen, this);
        var menu2 = new cc.Menu(menuItemOpenBtn);  //7. create the menu
        menu2.setPosition(cc.p(size.width *0.1, size.height*0.35));
        this.addChild(menu2);

        return true;
    },

    onMarkBee : function() {
        gClickMode = consts.CLICK_MODE_BEE;
    },

    onMarkOpen : function() {
        gClickMode = consts.CLICK_MODE_OPEN;
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

            cell.bomb = 0;
            //cc.log("Adding PLayer");
            _maps[x, y] = cell;

        }
        catch (err) {
            cc.log("inside catch");
            cc.log(err);
        }
    },
    neighbourLogic : function() {
        cc.log("Inside neighbour function");
        for (var x=0; x<CELLX;x++){
            for (var y=0;y<CELLY;y++){
                _maps[x, y].bomb = 2;
            }
        }
    },

    fixBees : function() {
        cc.log("Inside Bee function");
        this.n_of_bombs=0;
        this.n_of_flags = 0;
        this.n_of_open_cells = 0;
        for (var x=0;x<CELLX;x++){
            cc.log("Inside Bee for");
            for (var y=0;y<CELLY;y++){
                cc.log("Inside Bee function");
                if (Math.random() < PERCENTAGE){
                    _maps[x, y].bomb=1;
                    cc.log("Bee value"+_maps[x, y].bomb );
                    this.n_of_bombs++;
                } else {
                    cc.log("Bee value"+_maps[x, y].bomb );
                    _maps[x, y].bomb=0;
                }
            }
        }
    }

});





var BoardScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
            var layer = new BoardLayer();
            this.addChild(layer);
    }
});
