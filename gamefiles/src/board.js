var CELLX = 10;
var CELLY = 10;
var PERCENTAGE_BOMB =40;
var PERCENTAGE_HONEY=50;

var consts = {};
consts.CLICK_MODE_OPEN = 1;
consts.CLICK_MODE_BEE = 2;

var gClickMode = consts.CLICK_MODE_OPEN;
var gCountOpen = 0;
var gCountBee = 0;
var gCountHoney = 0;

var NO_OF_HONEY = 5;
var _maps =new Array(10);
var BoardLayer = cc.Layer.extend({
    sprite:null,

    ctor:function () {

            this._super();

        for(var i =0; i<10; i++){
             _maps[i]=new Array(10);
            }
            for (var i = 0; i < CELLX; i++) {
                for (var j = 0; j < CELLY; j++) {
                    this.addCell(i, j);
                }
            }

        this.neighbourLogic();
        this.fixBees();
        this.fixHoney();


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

            //cc.log("Adding PLayer");
            _maps[x][y] = cell;

        }
        catch (err) {
            cc.log("inside catch");
            cc.log(err);
        }
    },
    neighbourLogic : function() {
        for (var x=0;x<CELLX;x++){
            for (var y=0;y<CELLY;y++){
                var countNeighbout=0;

                var c = _maps[x][y];

                if (x>0) {
                    c.n1 = _maps[x-1][y];
                    if (y<CELLY-1 && x%2==0) {
                        c.n2 = _maps[x - 1][y + 1];
                    } else if (y>0 && x%2==1) {
                        c.n2 = _maps[x - 1][y - 1];
                    }
                }

                if (x<CELLX-1) {
                    c.n3 = _maps[x+1][y];

                    if(y<CELLY-1 && x%2==0) {
                        c.n4 = _maps[x+1][y+1];
                    } else if (y>0 && x%2==1) {
                        c.n4 = _maps[x+1][y-1];
                    }
                }

                if (y<CELLY-1) {
                    c.n5 = _maps[x][y+1];
                }

                if (y>0) {
                    c.n6 = _maps[x][y - 1];
                }

            }
        }
    },

    fixBees : function() {
        this.n_of_bombs=0;
        this.n_of_flags = 0;
        this.n_of_open_cells = 0;
        for (var x=0;x<CELLX;x++){
            for (var y=0;y<CELLY;y++){
                var randomValue = Math.floor((Math.random() * 100));
                if(randomValue < PERCENTAGE_BOMB){
                    _maps[x][y].bomb=1;
                    this.n_of_bombs++;
                }
            else{
                    _maps[x][y].bomb=0;
                }
                cc.log("At moment Bomb" +  _maps[x][y].bomb +"("+ x+","+y+")");
            }
        }

    },
    fixHoney : function() {
        this.n_of_bombs=0;
        this.n_of_flags = 0;
        this.n_of_open_cells = 0;
        this.n_of_honey_cells = 0;
        for (var x=0;x<CELLX;x++){
            for (var y=0;y<CELLY;y++){
                var randomValue = Math.floor((Math.random() * 100));
                if( _maps[x][y].bomb){
                    _maps[x][y].honey=0;
                }
                else if(randomValue < PERCENTAGE_HONEY){
                    _maps[x][y].honey=1;
                    this.n_of_honey_cells++;

                }
                else{
                    _maps[x][y].honey=0;
                }
                cc.log("At moment Honey" +  _maps[x][y].honey +"("+ x+","+y+")");
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
