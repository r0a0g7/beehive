

function Cell(x, y) {

    this._testsprite =   cc.Sprite.create(res.CellNormal_png);
    this._x = x;
    this._y = y;

}

Cell.prototype._testsprite;
Cell.prototype._hasMoved;
Cell.prototype._hasBall;

Cell.prototype.getCellSprite = function() {
    //cc.log("getPLayerSprite");
    return this._testsprite;
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

Cell.prototype.setUpEventListner = function() {

    cc.log("Here");

    cc.eventManager.addListener({
        event: cc.EventListener.MOUSE,
        onMouseUp: function (event) {

            cc.log("onMouseUp");
            alert("Hi Mouse");
            cc.eventManager.removeEventListener(cc.EventListener.MOUSE, this._testsprite);
        }
    }, this._testsprite);

}