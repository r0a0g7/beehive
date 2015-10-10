var CELLX = 10;
var CELLY = 10;
var PERCENTAGE = 0.1;
var NO_OF_HONEY = 5;
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

        this.neighbourLogic();
        this.fixBees();
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
    },
    neighbourLogic : function() {
        for (var x=0;x<this.CELLX;CELLX++){
            for (var y=0;y<this.CELLY;CELLY++){
                var c = this.map[x][y];
                if (x>0){
                    c.n1 = this.map[x-1][y];
                    if (y>0)
                        c.n2 = this.map[x-1][y-1];
                    if (y<CELLY-1)
                        c.n3 = this.map[x-1][y+1];
                }
                if (y>0)
                    c.n4 = this.map[x][y-1];
                if (y<this.CELLY-1)
                    c.n5 = this.map[x][y+1];
                if (x<this.CELLX-1)
                    c.n6 = this.map[x+1][y];

                //odd lines:
                if (y%2){
                    if (x<this.CELLX-1){
                        if (y>0)
                            c.n2 = this.map[x+1][y-1];
                        if (y<this.CELLY-1)
                            c.n3 = this.map[x+1][y+1];
                    } else {
                        c.n2 = false;
                        c.n3 = false;
                    }
                }
            }
        }
    },

    fixBees : function() {

        this.n_of_bombs=0;
        this.n_of_flags = 0;
        this.n_of_open_cells = 0;
        for (var x=0;x<this.CELLX;x++){
            for (var y=0;y< this.CELLY;y++){
                this.map[x][y].init();
                if (Math.random() < this.PERCENTAGE){
                    this.map[x][y].bomb=1;
                    this.n_of_bombs++;
                } else {
                    this.map[x][y].bomb=0;
                }
            }
        }
    },

    fixHoney : function(){

        this.n_of_honey=0;
        this.n_of_flags = 0;
        this.n_of_open_cells = 0;
        for (var x=0;x<this.CELLX;x++){
            for (var y=0;y< this.CELLY;y++){
                this.map[x][y].init();
                //this.map[x][y].honey = 0;
                if(this.map[x][y].gethasBomb() ==0) {
                    if (Math.random() < 0.5 && this.n_of_honey < this.NO_OF_HONEY) {
                        this.map[x][y].honey = 1;
                        this.n_of_honey++;
                    } else {
                        this.map[x][y].honey = 0;
                    }
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
