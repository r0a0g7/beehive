function Cell(xPos) {

    this._testsprite =   cc.Sprite.create(res.CellNormal_png);
    this._hasMoved = false;
    this._hasBall = false;
    this.xPos = xPos;

}

Cell.prototype._testsprite;
Cell.prototype._hasMoved;
Cell.prototype._hasBall;

Cell.prototype.getCellSprite = function() {
    cc.log("getPLayerSprite");
    return this._testsprite;
}
Cell.prototype.setCellSpritePos = function (x,y) {
   // this._testsprite.setAnchorPoint(cc.p(0.5, 0.5));
    this._testsprite.setPosition(x *100, 75);

    cc.log("Here");
}
Cell.prototype.setHasMoved = function (bool) {

    this._hasMoved = bool;
}
Cell.prototype.setHasBall = function (bool) {

    this._hasBall = bool;
}

Cell.prototype.getHasMoved = function() {

    return this._hasMoved;
}
Cell.prototype.getHasBall = function() {

    return this._hasBall;
}