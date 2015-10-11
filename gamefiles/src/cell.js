

function Cell(x, y) {

    var size = cc.winSize;
    this._x=x;
    this._y=y;
   var menuItemPlay = new cc.MenuItemSprite(
        new cc.Sprite(res.CellNormal_png), // normal state image
        new cc.Sprite(res.Cell_Selected_png),
        new cc.Sprite(res.CellPressed_png),
         // select state image
        function(menuItem){

           // menuItem.selected = true;
            onClick(this,menuItem);
        }, this);



    this.status = 0;
    this.markedBee = 0;

         /*   var scoreSprite = new cc.Sprite(res.CellNormal_png);
        // sprite.setAnchorPoint(cc.p(0.5, 0.5));
        scoreSprite.setPosition(cc.p(size.width * 0.125, size.height * 0.7));
        //this.addChild(scoreSprite, 1);*/

    this._testsprite =  new cc.Menu(menuItemPlay);
    this._testsprite.setPosition(cc.p(size.width  - ((CELLX - y)*menuItemPlay.getContentSize().width)- ((menuItemPlay.getContentSize().width/2) * (x%2))  , size.height - (size.height/5) - (x*(menuItemPlay.getContentSize().height * 0.75)) ));
 //7. create the menu
//this._testsprite.setPosition(cc.p(size.width * 0.125, size.height * 0.7));
  
    //- ((menuItemPlay.getContentSize().width/2) * (y%2))
    //cc.log("Cell Position x="+this._x+"  y="+this._y+"  X="+this._testsprite.getPositionX() +"  Y ="+this._testsprite.getPositionY());

}

Cell.prototype._testsprite;
Cell.prototype._hasHoney;

Cell.prototype.getCellSprite = function() {
    //cc.log("getPLayerSprite");
    return this._testsprite;
}

Cell.prototype.getHasHoney = function(){
    return this._hasHoney;
}

Cell.prototype.setHasHoney = function(val){
    this._hasHoney = val;
}

Cell.prototype.gethasBomb = function() {
    //cc.log("getPLayerSprite");
    return this._hasBomb;
}

Cell.prototype.sethasBomb = function() {
    //cc.log("getPLayerSprite");
    this._hasBomb = 1;
}
Cell.prototype.setCellSpritePos = function (x, y) {
   // this._testsprite.setAnchorPoint(cc.p(0.5, 0.5));

    var size = cc.winSize;
    this._testsprite.getContentSize();
    //cc.p(size.width / 2, size.height / 2);
    //cc.log(x+","+ y);
    //cc.log(size.width+","+size.height );
   // cc.log();
    //cc.log(this._testsprite.getContentSize().width+","+this._testsprite.getContentSize().height);
    //cc.log();
    //cc.log(size.width - this._testsprite.getContentSize().width  - ((CELLX - x)*this._testsprite.getContentSize().width) - (this._testsprite.getContentSize().width * (x%2)) );
    //cc.log(size.height - (size.height/3) - ((CELLY - y)*this._testsprite.getContentSize().height) );
   //cc.log("Cell POsition X="+cc.p(size.width - this._testsprite.getContentSize().width  - ((CELLX - x)*this._testsprite.getContentSize().width) - ((this._testsprite.getContentSize().width/2) * (y%2))+"  Y="+ size.height - (size.height/5) - (y*(this._testsprite.getContentSize().height * 0.75)) ));
    this._testsprite.setPosition(cc.p(size.width   - ((CELLX - x)*this._testsprite.getContentSize().width) - ((this._testsprite.getContentSize().width/2) * (y%2)) , size.height - (size.height/5) - (y*(this._testsprite.getContentSize().height * 0.75)) ));


    //this._testsprite.setScale(0.5);

    //cc.log("Here");
}

Cell.prototype.count_bombs = function(c){
    var result = 0;
    if (c.n1) result += c.n1.bomb;
    if (c.n2) result += c.n2.bomb;
    if (c.n3) result += c.n3.bomb;
    if (c.n4) result += c.n4.bomb;
    if (c.n5) result += c.n5.bomb;
    if (c.n6) result += c.n6.bomb;
    cc.log("Bombs"+result);

    return result;
}

Cell.prototype.on_cell_clicked = function(c){
    if (game_is_over) return;
    if (c.status == 2) return;
    if (c.bomb==1){
         cc.audioEngine.playEffect(res.Bee_mp3);
        
cc.log("GAME OVER");
        var sprite = new cc.Sprite(res.Cell_Bee_GameOver_png);
        var children = c._testsprite.getChildren();
       // cc.log("0 cell Child "+children[0]);
        sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+children[0].getContentSize().height/2));
        children[0].addChild(sprite, 7);

        //c.bomb=0;
        goBactToLevelSelector();

        return;
    }
    c.status = 1;
    var children = c._testsprite.getChildren();
    children[0].enabled = false;
    n_of_open_cells++;




cc.audioEngine.playEffect(res.openCell_mp3);




    //cc.log("0 Cell Just C " +c._x+"," + c._y + "Position"+ c._testsprite.getPositionX()+ " , "+c._testsprite.getPositionY());
  //  c.board.n_of_open_cells++;*/
try {
    cc.log("inside onclicl()");
    switch (c.count_bombs(c)) { //dá pra usar this em vez de ter que passar c ?
        case 0:
            var sprite = new cc.Sprite(res.CellEmpty_png);
            if (c.honey==1){

            }
            var children = c._testsprite.getChildren();
            //cc.log("0 cell Child "+children[0]);
            sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+children[0].getContentSize().height/2));
            children[0].addChild(sprite, 7);

          /*  var menuItem = c._testsprite.getChildByTag(0);
            cc.log(menuItem);
            sprite.setPosition(cc.p(menuItem.getPositionX() + menuItem.getContentSize().width / 2, menuItem.getPositionY() + menuItem.getContentSize().height / 2));
            children[0].addChild(sprite, 7);*/
//cc.log("0 Cell Just C " +c._x+"," + c._y );//+ "Position"+ c._testsprite.getPositionX()+ " , "+c._testsprite.getPositionY());
            if (c.n1 && c.n1.status == 0) {
                //cc.log(c._x+"," + c._y+"n1 " +c.n1._x+"," + c.n1._y);
                c.on_cell_clicked(c.n1);
            }
            if (c.n2 && c.n2.status == 0) {
                c.on_cell_clicked(c.n2);
                //cc.log(c._x+"," + c._y+"n2 " +c.n2._x+"," + c.n2._y);
            }
            if (c.n3 && c.n3.status == 0){
                c.on_cell_clicked(c.n3);
                //cc.log(c._x+"," + c._y+"n3 " +c.n3._x+"," + c.n3._y);
            }
            if (c.n4 && c.n4.status == 0) {
                c.on_cell_clicked(c.n4);
                //cc.log(c._x+"," + c._y+"n4 " +c.n4._x+"," + c.n4._y);
            }
            if (c.n5 && c.n5.status == 0) {
                c.on_cell_clicked(c.n5);
                //cc.log(c._x+"," + c._y+"n5 " +c.n5._x+"," + c.n5._y);
            }
            if (c.n6 && c.n6.status == 0) {
                c.on_cell_clicked(c.n6);
                //cc.log(c._x+"," + c._y+"n6 " +c.n6._x+"," + c.n6._y);
            }
            break;
        case 1:
            var sprite = new cc.Sprite(res.CellCount1_png);
            var children = c._testsprite.getChildren();
            //cc.log("1 cell Child Just C " +c._x+"," + c._y);
            sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+children[0].getContentSize().height/2));
            children[0].addChild(sprite, 7);
            break;
        case 2:
            var sprite = new cc.Sprite(res.CellCount2_png);
            var children = c._testsprite.getChildren();
            //cc.log("2 cell Child Just C " +c._x+"," + c._y);
            sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+children[0].getContentSize().height/2));
            children[0].addChild(sprite, 7);
            break;
        case 3:
            var sprite = new cc.Sprite(res.CellCount3_png);
            var children = c._testsprite.getChildren();
            //cc.log("3 cell Child Just C " +c._x+"," + c._y);
            sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+children[0].getContentSize().height/2));
            children[0].addChild(sprite, 7);
            break;
        case 4:
            var sprite = new cc.Sprite(res.CellCount4_png);
            var children = c._testsprite.getChildren();
            //cc.log("4 cell Child Just C " +c._x+"," + c._y);
            sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+children[0].getContentSize().height/2));
            children[0].addChild(sprite, 7);
            break;
        case 5:
            var sprite = new cc.Sprite(res.CellCount5_png);
            var children = c._testsprite.getChildren();
            //cc.log("5 cell Child Just C " +c._x+"," + c._y);
            sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+children[0].getContentSize().height/2));
            children[0].addChild(sprite, 7);
            break;
        case 6:
            var sprite = new cc.Sprite(res.CellCount6_png);
            var children = c._testsprite.getChildren();
            //cc.log("6 cell Child Just C " +c._x+"," + c._y);
            sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+children[0].getContentSize().height/2));
            children[0].addChild(sprite, 7);
            break;


    }

    if (c.honey==1){
        cc.log("Honey!!!");
        c.status = 0;
        var children = c._testsprite.getChildren();
        children[0].enabled = true;
        n_of_open_cells--;

            var sprite = new cc.Sprite(res.CellNormal_png);
            var children = c._testsprite.getChildren();
            //cc.log("3 cell Child Just C " +c._x+"," + c._y);
            sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+children[0].getContentSize().height/2));
            children[0].addChild(sprite, 7);



        //  c.parent.gameover();
    }



    if (n_of_open_cells + gCountBee == CELLX*CELLY) {
        cc.log("YOU HAVE WON");
        //c.board.win_game();
    }
}catch(err){
    cc.log(err);
}

}

function onClick(cell,menuItem){
    try {
        cc.audioEngine.playEffect(res.select_mp3);

        //cc.log("Clocked Cell Just C " +cell._x+"," + cell._y + "Position"+ cell._testsprite.getPositionX()+ " , "+cell._testsprite.getPositionY());
        if (gClickMode == 1) {
            //var sprite = new cc.Sprite.create(res.CellEmpty_png);
            gCountOpen++;
            cell.status = 1; // else the state will remain flaged and cell click logic will not work
            menuItem.enabled = false;
            if(cell.markedBee == 1){
                cell.markedBee =0;
                gCountBee--;
                cc.log("Unmarking Bee");
                markBee(cell.board);

            }

            if(cell.honey){
                cc.log(" HONEY CLICKED!!");
                cc.audioEngine.playEffect(res.Honey_mp3);
                //cc.audioEngine.playEffect(res.Slurp_mp3);
                var sprite = new cc.Sprite(res.CellHoney_png);
                var children = cell._testsprite.getChildren();
                //cc.log("3 cell Child Just C " +c._x+"," + c._y);
                sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+children[0].getContentSize().height/2));
                children[0].addChild(sprite, 8);
                n_of_open_cells++;
                gCountHoney++;
                foundHoney(cell.board);
                if(gCountHoney >= NO_OF_HONEY){
                    cc.audioEngine.playEffect(res.Win_mp3);
                    cc.log("honey clicked and honey num"+gCountHoney +"need->" + NO_OF_HONEY);

                    goBactToLevelSelector();
                }

            }
            else {
                cc.log("CELL CLICKED");
                cell.on_cell_clicked(cell);
            }
            /*if(true){//hasHoney
                var sprite = new cc.Sprite.create(res.CellHoney_png);
            gCountHoney++
            }*/
        } else {
            cc.log("Bee Count"+gCountBee);
           // var sprite = new cc.Sprite.create(res.CellBee_png);
            var sprite = new cc.Sprite(res.CellBee_png);
            var children = cell._testsprite.getChildren();
            //cc.log("3 cell Child Just C " +c._x+"," + c._y);
            sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+children[0].getContentSize().height/2));
            children[0].addChild(sprite, 7);
            cell.status=2;
            cell.markedBee= 1;
            cc.log("Marking Bee");
            gCountBee++;
            markBee(cell.board);
        }
     /*   for(var x=0; x < 10; x++){
            for(var y = 0; y<10; y++){
                cc.log("populated Value" +  _maps[x][y].bomb +"("+ x+","+y+")");
            }
        }*/




       // cell.on_cell_clicked(cell);
    }catch(err){
        cc.log(err);
    }

}
