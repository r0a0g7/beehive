

function Cell(x, y) {

    var size = cc.winSize;

    var menuItemPlay = new cc.MenuItemSprite(
        new cc.Sprite(res.CellNormal_png), // normal state image
        new cc.Sprite(res.Cell_Selected_png), // select state image
        function(menuItem){
            cc.log("Tag "+menuItem.getTag());
           // menuItem.selected = true;
            onClick(this,menuItem);
        }, this);
    menuItemPlay.setTag(x+"_"+y);


    this.status = 0;


    this._testsprite = new cc.Menu(menuItemPlay);  //7. create the menu

    this._testsprite.setPosition(cc.p(size.width - menuItemPlay.getContentSize().width  - ((CELLX - x)*menuItemPlay.getContentSize().width) - ((menuItemPlay.getContentSize().width/2) * (y%2)) , size.height - (size.height/5) - (y*(menuItemPlay.getContentSize().height * 0.75)) ));

    this._x = x;
    this._y = y;

}

Cell.prototype._testsprite;
Cell.prototype._hasBomb;
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
    this._testsprite.setPosition(cc.p(size.width - this._testsprite.getContentSize().width  - ((CELLX - x)*this._testsprite.getContentSize().width) - ((this._testsprite.getContentSize().width/2) * (y%2)) , size.height - (size.height/5) - (y*(this._testsprite.getContentSize().height * 0.75)) ));


    //this._testsprite.setScale(0.5);

    cc.log("Here");
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
   // if (c.board.game_is_over) return;
   // if (c.status == FLAG) return;
   /* if (c.bomb==1){
        c.image.src = IMAGE_BOMB_EXPLODED;
        c.bomb=0;//?
        c.board.gameover();
        return;
    }
*/
    c.status = 1;


  //  c.board.n_of_open_cells++;*/
try {
    switch (c.count_bombs(c)) { //dá pra usar this em vez de ter que passar c ?
        case 0:
            var sprite = new cc.Sprite.create(res.CellEmpty_png);
            var children = c._testsprite.getChildren();
            cc.log("0 cell Child "+children[0]);
            sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+children[0].getContentSize().height/2));
            children[0].addChild(sprite, 7);

          /*  var menuItem = c._testsprite.getChildByTag(0);
            cc.log(menuItem);
            sprite.setPosition(cc.p(menuItem.getPositionX() + menuItem.getContentSize().width / 2, menuItem.getPositionY() + menuItem.getContentSize().height / 2));
            children[0].addChild(sprite, 7);*/

            if (c.n1 && c.n1.status == 0) c.on_clicked(c.n1);
            if (c.n2 && c.n2.status == 0) c.on_clicked(c.n2);
            if (c.n3 && c.n3.status == 0) c.on_clicked(c.n3);
            if (c.n4 && c.n4.status == 0) c.on_clicked(c.n4);
            if (c.n5 && c.n5.status == 0) c.on_clicked(c.n5);
            if (c.n6 && c.n6.status == 0) c.on_clicked(c.n6);
            break;
        case 1:
            var sprite = new cc.Sprite.create(res.CellCount1_png);
            var children = c._testsprite.getChildren();
            cc.log("1 cell Child "+children[0]);
            sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+children[0].getContentSize().height/2));
            children[0].addChild(sprite, 7);
            break;
        case 2:
            var sprite = new cc.Sprite.create(res.CellCount2_png);
            var children = c._testsprite.getChildren();
            cc.log("2 cell Child "+children[0]);
            sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+children[0].getContentSize().height/2));
            children[0].addChild(sprite, 7);
            break;
        case 3:
            var sprite = new cc.Sprite.create(res.CellCount3_png);
            var children = c._testsprite.getChildren();
            cc.log("3 cell Child "+children[0]);
            sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+children[0].getContentSize().height/2));
            children[0].addChild(sprite, 7);
            break;
        case 4:
            var sprite = new cc.Sprite.create(res.CellCount4_png);
            var children = c._testsprite.getChildren();
            cc.log("4 cell Child "+children[0]);
            sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+children[0].getContentSize().height/2));
            children[0].addChild(sprite, 7);
            break;
        case 5:
            var sprite = new cc.Sprite.create(res.CellCount5_png);
            var children = c._testsprite.getChildren();
            cc.log("5 cell Child "+children[0]);
            sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+children[0].getContentSize().height/2));
            children[0].addChild(sprite, 7);
            break;
        case 6:
            var sprite = new cc.Sprite.create(res.CellCount6_png);
            var children = c._testsprite.getChildren();
            cc.log("6 cell Child "+children[0]);
            sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+children[0].getContentSize().height/2));
            children[0].addChild(sprite, 7);
            break;
    }
}catch(err){
    cc.log(err);
}
    //if (c.board.n_of_open_cells + c.board.n_of_bombs == c.board.xmax*c.board.ymax) c.board.win_game();
}

function onClick(cell,menuItem){
    try {
        if (gClickMode == consts.CLICK_MODE_OPEN) {
            var sprite = new cc.Sprite.create(res.CellEmpty_png);
            gCountOpen++;
            if(true){//hasHoney
                var sprite = new cc.Sprite.create(res.CellHoney_png);
            gCountHoney++
            }
        } else {
            var sprite = new cc.Sprite.create(res.CellBee_png);
            gCountBee++;
        }

        cc.log("tag"+menuItem.getTag());
        cc.log("x"+cell._x +" "+"y"+cell._y)
cc.log("maps"+_maps[cell._x,cell._y].bomb);
        cc.log("maps nei"+_maps[cell._x,cell._y].n1);
        cc.log("maps honey"+_maps[cell._x,cell._y].getHasHoney());
       // cc.log("cell"+cell.getHasHoney());

        //sprite.setAnchorPoint(cc.p(0.5, 0.5));

        var thisCell = _maps[cell._x,cell._y];
        var children = _maps[cell._x,cell._y]._testsprite.getChildren();
        cc.log("cell Child 1 Ini"+children[0].getTag());
        sprite.setPosition(cc.p(children[0].getPositionX()+children[0].getContentSize().width/2, children[0].getPositionY()+menuItem.getContentSize().height/2));
        children[0].addChild(sprite, 7);

/*
        var children = _maps[1,0]._testsprite.getChildren();
        cc.log("cell Child 2 Ini"+children[0].getTag());

        var children = _maps[0,1]._testsprite.getChildren(9);
        cc.log("cell Child 3 Ini"+children[0].getTag());
        var thisCell = _maps[1,0];
        var children = thisCell._testsprite.getChildren();
        cc.log("cell Child"+children[0]);*/

        thisCell.on_cell_clicked(thisCell);
    }catch(err){
        cc.log(err);
    }
    menuItem.enabled = false;




    /*
    if (c.bomb==1){
        c.image.src = IMAGE_BOMB_EXPLODED;
        c.bomb=0;//?
        c.board.gameover();
        return;
    }*/

  //  c.status = OPENED;

   // c.board.n_of_open_cells++;
  /*  cc.log(thisCell.count_bombs(thisCell));
    switch (thisCell.count_bombs(thisCell)){
        //dá pra usar this em vez de ter que passar c ?
        case 0:
            thisCell.image.src = IMAGE_VOID;
             thisCell.on_clicked(thisCell.n1,);
             thisCell.on_clicked(thisCell.n2);
             thisCell.on_clicked(thisCell.n3);
             thisCell.on_clicked(thisCell.n4);
             thisCell.on_clicked(thisCell.n5);
             thisCell.on_clicked(thisCell.n6);
            break;
        case 1: thisCell.image.src = IMAGE_1; break;
        case 2: thisCell.image.src = IMAGE_2; break;
        case 3: thisCell.image.src = IMAGE_3; break;
        case 4: thisCell.image.src = IMAGE_4; break;
        case 5: thisCell.image.src = IMAGE_5; break;
        case 6: thisCell.image.src = IMAGE_6; break;
    }*/
  //  if (c.board.n_of_open_cells + c.board.n_of_bombs == c.board.xmax*c.board.ymax) c.board.win_game();




}
