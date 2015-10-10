

function Cell(x, y) {

    var size = cc.winSize;

    var menuItemPlay = new cc.MenuItemSprite(
        new cc.Sprite(res.CellNormal_png), // normal state image
        new cc.Sprite(res.CellPressed_png), // select state image
        new cc.Sprite(res.CellDisabled_png), // select disabled image
        function(menuItem){
            cc.log("Tag "+menuItem.getTag());
           // menuItem.selected = true;
            onClick(menuItem);
        }, this);
    menuItemPlay.setTag(i);


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

Cell.prototype.setHasHoney = function(){
    this._hasHoney = 1;
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

function onClick(menuItem){
    try {
        var sprite = new cc.Sprite.create(res.CellPressed_png);
        //sprite.setAnchorPoint(cc.p(0.5, 0.5));

        sprite.setPosition(cc.p(menuItem.getPositionX()+menuItem.getContentSize().width/2, menuItem.getPositionY()+menuItem.getContentSize().height/2));
        menuItem.addChild(sprite, 7);
    }catch(err){
        cc.log(err);
    }
    menuItem.enabled = false;
}
