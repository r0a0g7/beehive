var CELLX = 10;
var CELLY = 10;
var PERCENTAGE_BOMB =0.1;
var PERCENTAGE_HONEY=0.1;
var n_of_open_cells;
var game_is_over;
var n_of_bombs;
var INITIALISED_2 = false;

var consts = {};
consts.CLICK_MODE_OPEN = 1;
consts.CLICK_MODE_BEE = 2;

var gClickMode = consts.CLICK_MODE_OPEN;
var gCountOpen = 0;
var gCountBee = 0;
var gCountHoney = 0;

var NO_OF_HONEY = 5;
var NO_OF_BOMBS = 10;
var _maps =new Array(10);
var BoardLayer = cc.Layer.extend({
    sprite:null,

    ctor:function () {

            this._super();
        game_is_over = false;
        n_of_open_cells = 0;

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

       var sprite = new cc.Sprite.create(res.Forest_BG_png);
       // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(sprite, 0);


        //I am going to hack my way thru to get th ecorrect positions!!
        var dummySprite =new cc.Sprite(res.CellNormal_png);
        var boardSprite = new cc.Sprite.create(res.BeeHive_BG_png);
        // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        boardSprite.setPosition(cc.p(_maps[4][4]._testsprite.getPositionX()+dummySprite.getContentSize().width/4, _maps[CELLX/2][CELLY/2]._testsprite.getPositionY()+dummySprite.getContentSize().height * 0.3));
        boardSprite.setScaleX(1.15);
        this.addChild(boardSprite, 1);

        var scoreSprite = new cc.Sprite.create(res.ScoreBoard_png);
        // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        scoreSprite.setPosition(cc.p(size.width * 0.125, size.height * 0.7));
        this.addChild(scoreSprite, 1);

        var menuItemBeeBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.Cell_BeeClickMe_png), // normal state image
            new cc.Sprite(res.CellBee_png),
            new cc.Sprite(res.CellBee_png),// select state image
            onBeeClick, this);
        var menu = new cc.Menu(menuItemBeeBtn);  //7. create the menu
        menu.setPosition(cc.p(size.width *0.1, size.height*0.2));
        this.addChild(menu);


        var beeCount = new cc.LabelTTF.create(gCountBee+"/"+NO_OF_BOMBS, "Helvetica", 25);
        beeCount.setPosition(cc.p(size.width * 0.9,  size.height * 0.9));
        this.addChild(beeCount,4);
        this.beeCount_lbl = beeCount;

        var honeyCount = new cc.LabelTTF.create(gCountHoney+"/"+ NO_OF_HONEY, "Helvetica", 25);
        honeyCount.setPosition(cc.p(size.width * 0.95,  size.height * 0.9));
        this.addChild(honeyCount,4);
        this.honeyCount_lbl = honeyCount;

        return true;
    },

    onMarkBee : function() {
        if(gClickMode == consts.CLICK_MODE_OPEN){
            gClickMode = consts.CLICK_MODE_BEE;


            var sprite = new cc.Sprite.create(res.CellBee_png);
            var children = this.getChildren();
            //cc.log("3 cell Child Just C " +c._x+"," + c._y);
            sprite.setPosition(cc.p(children[1].getPositionX()+children[1].getContentSize().width/2, children[1].getPositionY()+children[1].getContentSize().height/2));
            this.addChild(sprite, 8);

        }else {
            gClickMode = consts.CLICK_MODE_OPEN;
        }
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
            cell.honey = 0;
            cell.board = this;

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

        for (var i=0;i<NO_OF_BOMBS;i++){
           // cc.log("cellx"+(Math.random() *10 )%CELLX);
            var x= Math.floor((Math.random() *10 )%CELLX);
            var y = Math.floor((Math.random() *10 )%CELLY)
            _maps[x][y].bomb = 1;


        }
       /* for (var x=0;x<CELLX;x++){
            for (var y=0;y<CELLY;y++){

                    //var randomValue = Math.floor((Math.random() * 100));
                    if (Math.random() < PERCENTAGE_BOMB) {
                        _maps[x][y].bomb = 1;
                        this.n_of_bombs++;

                }else {
                    _maps[x][y].bomb = 0;


                }
               cc.log("At moment Bomb" +  _maps[x][y].bomb +"("+ x+","+y+")");
            }
        }*/

    },
    fixHoney : function() {

var i=0;
        while(i<NO_OF_HONEY){
            // cc.log("cellx"+(Math.random() *10 )%CELLX);
            var x= Math.floor((Math.random() *10 )%CELLX);
            var y = Math.floor((Math.random() *10 )%CELLY);
            if(_maps[x][y].bomb != 1) {
                _maps[x][y].honey = 1;

                i++;
            }


        }

    /*    for (var x=0;x<CELLX;x++){
            for (var y=0;y<CELLY;y++){
                //var randomValue = Math.floor((Math.random() * 100));
                if( _maps[x][y].bomb){
                    _maps[x][y].honey=0;
                }
                else if(Math.random() < PERCENTAGE_HONEY){
                    _maps[x][y].honey=1;
                    this.n_of_honey_cells++;

                }
                else{
                    _maps[x][y].honey=0;
                }
              //  cc.log("At moment Honey" +  _maps[x][y].honey +"("+ x+","+y+")");
            }
        }*/

    }



});
function foundHoney(board){

    cc.log("I AM AWESOME");

    board.beeCount_lbl.setString(gCountHoney+"/"+NO_OF_HONEY);


}

function markBee(board){

    cc.log("I AM AWESOME");

    board.honeyCount_lbl.setString(gCountBee+"/"+NO_OF_BOMBS);


}

function goBactToLevelSelector(){

    INITIALISED_2 = false;
    cc.director.popScene();
    cc.log("Creating New Gameoverscene");
    var scene = new GameOverScene();
    cc.director.runScene(scene);


}

function onBeeClick(menuItem){

    cc.log("Works");
    cc.log(menuItem.getChildren().length);
    if(gClickMode == consts.CLICK_MODE_OPEN){
        gClickMode = consts.CLICK_MODE_BEE;
        menuItem.setNormalImage(new cc.Sprite.create(res.CellBee_png));
    }else {
        gClickMode = consts.CLICK_MODE_OPEN;
        menuItem.setNormalImage(new cc.Sprite.create(res.Cell_BeeClickMe_png));
    }

}




var BoardScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        if(INITIALISED_2 == false){
            INITIALISED_2 = true;
            var layer = new BoardLayer();
            this.addChild(layer);
        }
    }
});
