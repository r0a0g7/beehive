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
consts.COUNTER_VALUE = 60;
var gClickMode = consts.CLICK_MODE_OPEN;
var gCountOpen = 0;
var gCountBee = 0;
var gCountHoney = 0;

var gameCounterSec = 60;

var NO_OF_HONEY = 5;
var NO_OF_BOMBS = 10;
var _maps =new Array(10);
var BoardLayer = cc.Layer.extend({
    sprite:null,

    ctor:function () {
gCountBee = 0;
gCountHoney = 0;


            this._super();
       game_is_over = false;
        n_of_open_cells = 0;
        var size = cc.winSize;

        for(var i =0; i<10; i++){

             _maps[i]=new Array(10);
            }
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {

                    this.addCell(i, j);
                }
            }

        this.neighbourLogic();
        this.fixBees();
        this.fixHoney();


        

        var sprite = new cc.Sprite(res.Forest_BG_png);
       // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(sprite, 0);


        //I am going to hack my way thru to get th ecorrect positions!!
        var dummySprite =new cc.Sprite(res.CellNormal_png);
        var boardSprite = new cc.Sprite(res.BeeHive_BG_png);
        // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        boardSprite.setPosition(cc.p(_maps[4][4]._testsprite.getPositionX(), _maps[CELLX/2][CELLY/2]._testsprite.getPositionY()+dummySprite.getContentSize().height * 0.3));
        boardSprite.setScaleX(1.15);
        this.addChild(boardSprite, 1);

        var scoreSprite = new cc.Sprite(res.ScoreBoard_png);
        // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        scoreSprite.setPosition(cc.p(size.width * 0.125, size.height * 0.7));
        this.addChild(scoreSprite, 1);

                var scoreMeterSprite = new cc.Sprite(res.ScoreMeter_0);
        // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        scoreMeterSprite.setPosition(cc.p(size.width * 0.125, size.height * 0.3));
        this.addChild(scoreMeterSprite, 1);
        this.scoreMeter = scoreMeterSprite;
                        var titleSprite = new cc.Sprite(res.Tittle_png);
        // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        titleSprite.setPosition(cc.p(size.width * 0.2, size.height * 0.9));
        this.addChild(titleSprite, 1);

                                var PowerUpSprite = new cc.Sprite(res.Powerup_png);
        // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        PowerUpSprite.setPosition(cc.p(size.width * 0.9, size.height * 0.9));
        this.addChild(PowerUpSprite, 1);


        var menuItemBeeBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.CellPressed_png), // normal state image
            new cc.Sprite(res.CellBee_png),
            new cc.Sprite(res.CellBee_png),// select state image
            onBeeClick, this);
        var menu = new cc.Menu(menuItemBeeBtn);  //7. create the menu
        menu.setPosition(cc.p(size.width *0.2, size.height*0.625));
        this.addChild(menu,2);


        var beeCount = new cc.LabelTTF.create(gCountBee+"/"+NO_OF_BOMBS, "Verdana", 25);
        beeCount.setPosition(cc.p(size.width * 0.13,  size.height * 0.7));
        beeCount.color = cc.color(255,0,255);
        this.addChild(beeCount,4);
        this.beeCount_lbl = beeCount;
        var beeText = new cc.LabelTTF.create("Mark'em bees", "Verdana", 18);
        beeText.setPosition(cc.p(size.width * 0.1,  size.height * 0.6));
        this.addChild(beeText,4);

        var honeyCount = new cc.LabelTTF.create(gCountHoney+"/"+ NO_OF_HONEY, "Verdana", 25);
        honeyCount.setPosition(cc.p(size.width * 0.13,  size.height * 0.12));
        honeyCount.color = cc.color(255,0,255);
        this.addChild(honeyCount,4);
        this.honeyCount_lbl = honeyCount;


        var gameCounterLabel = new cc.LabelTTF.create(gameCounterSec);
        gameCounterLabel.setPosition(cc.p(size.width * 0.5,  size.height * 0.95));
        gameCounterLabel.color = cc.color(255,0,0);
        this.addChild(gameCounterLabel,4);
        this.gameCounterValue = gameCounterLabel;

        this.schedule(this.gameCounterFunction, 1);

        return true;


    },


    gameCounterFunction:function(){
        if(gameCounterSec--) {
            this.gameCounterValue.setString(gameCounterSec);
        }
        else{
            goBactToLevelSelector();
        }
    },
    onMarkBee : function() {
        if(gClickMode == consts.CLICK_MODE_OPEN){
            gClickMode = consts.CLICK_MODE_BEE;


            var sprite = new cc.Sprite(res.CellBee_png);
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
var size = cc.winSize;


            var cell = new Cell(x,y);



            this.addChild(cell.getCellSprite(), 3);
            cc.log("Added Menu2");
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

var i=0;
        while(i<10){
            // cc.log("cellx"+(Math.random() *10 )%CELLX);
            var x= Math.floor((Math.random() *10 )%CELLX);
            var y = Math.floor((Math.random() *10 )%CELLY);
            if(_maps[x][y].bomb != 1 ) {
                _maps[x][y].bomb = 1;

                i++;
            }


        }


    },
    fixHoney : function() {

var i=0;
        while(i<5){
            // cc.log("cellx"+(Math.random() *10 )%CELLX);
            var x= Math.floor((Math.random() *10 )%CELLX);
            var y = Math.floor((Math.random() *10 )%CELLY);
            if(_maps[x][y].bomb != 1 &&  _maps[x][y].honey !=1) {
                _maps[x][y].honey = 1;

                i++;
            }
        }
    }



});
function foundHoney(board){

    cc.log("I AM AWESOME");
    var size = cc.winSize;
    board.removeChild(board.scoreMeter);

    switch(gCountHoney){
        case 0: 
        board.scoreMeter = new cc.Sprite(res.ScoreMeter_0);
        // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        board.scoreMeter.setPosition(cc.p(size.width * 0.125, size.height * 0.3));
        board.addChild(board.scoreMeter, 1);//var scoreMeterImage = ScoreMeter_0;
        break;
        case 1:board.scoreMeter = new cc.Sprite(res.ScoreMeter_1);
        // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        board.scoreMeter.setPosition(cc.p(size.width * 0.125, size.height * 0.3));
        board.addChild(board.scoreMeter, 1);
        break;
        case 2: board.scoreMeter = new cc.Sprite(res.ScoreMeter_2);
        // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        board.scoreMeter.setPosition(cc.p(size.width * 0.125, size.height * 0.3));
        board.addChild(board.scoreMeter, 1);
        break;
        case 3: board.scoreMeter = new cc.Sprite(res.ScoreMeter_3);
        // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        board.scoreMeter.setPosition(cc.p(size.width * 0.125, size.height * 0.3));
        board.addChild(board.scoreMeter, 1);
        break;
        case 4: board.scoreMeter = new cc.Sprite(res.ScoreMeter_4);
        // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        board.scoreMeter.setPosition(cc.p(size.width * 0.125, size.height * 0.3));
        board.addChild(board.scoreMeter, 1);
        case 5: board.scoreMeter = new cc.Sprite(res.ScoreMeter_5);
        // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        board.scoreMeter.setPosition(cc.p(size.width * 0.125, size.height * 0.3));
        board.addChild(board.scoreMeter, 1);
        break;


    }


    board.honeyCount_lbl.setString(gCountHoney+"/"+NO_OF_HONEY);


}

function markBee(board){

    cc.log("I AM AWESOME");
    

    board.beeCount_lbl.setString(gCountBee+"/"+NO_OF_BOMBS);


}

function goBactToLevelSelector(){

    INITIALISED_2 = false;
    cc.director.popScene();
    cc.log("Creating New Gameoverscene");
    var scene = new GameOverScene();
    cc.director.runScene(scene);


}

function onBeeClick(menuItem){

 cc.audioEngine.playEffect(res.select_mp3);
    cc.log(gClickMode);
  //  cc.log(menuItem.getChildren().length);
    if(gClickMode == 1){
        cc.log("OPEN");
        gClickMode = 2;
        menuItem.setNormalImage(new cc.Sprite(res.CellBee_png));
    }else {
        cc.log("BEE");
        gClickMode = 1;
        menuItem.setNormalImage(new cc.Sprite(res.CellPressed_png));
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
