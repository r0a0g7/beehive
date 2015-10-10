

function Cell(x, y) {

    var size = cc.winSize;
    this._x=x;
    this._y=y;
    var menuItemPlay = new cc.MenuItemSprite(
        new cc.Sprite(res.CellNormal_png), // normal state image
        new cc.Sprite(res.CellPressed_png), // select state image
        function(menuItem){
            cc.log("Tag "+menuItem.getTag());
           // menuItem.selected = true;
            onClick(this,menuItem);
        }, this);
    menuItemPlay.setTag(x+"_"+y);


    this._testsprite = new cc.Menu(menuItemPlay);  //7. create the menu

    this._testsprite.setPosition(cc.p(size.width - menuItemPlay.getContentSize().width  - ((CELLX - x)*menuItemPlay.getContentSize().width) - ((menuItemPlay.getContentSize().width/2) * (y%2)) , size.height - (size.height/5) - (y*(menuItemPlay.getContentSize().height * 0.75)) ));


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

Cell.prototype.setHasHoney = function(){
    this._hasHoney = 1;
}

function onClick(currentCell, menuItem){
    try {
        if (gClickMode == consts.CLICK_MODE_OPEN) {
            var sprite = new cc.Sprite.create(res.CellPressed_png);
            gCountOpen++;
        } else {
            var sprite = new cc.Sprite.create(res.CellBee_png);
            gCountBee++;
        }
        for(var x=0; x < 10; x++){
            for(var y = 0; y<10; y++){
                cc.log("populated Value" +  _maps[x][y].bomb +"("+ x+","+y+")");
            }
        }
        var splitTag = menuItem.getTag().split("_");
        if(_maps[splitTag[0]][splitTag[1]].bomb){
            cc.log("has bomb" + _maps[splitTag[0]][splitTag[1]].bomb);
            var sprite = new cc.Sprite.create(res.CellBee_png);
        } else if(_maps[splitTag[0]][splitTag[1]].honey){
            var sprite = new cc.Sprite.create(res.CellHoney_png);
        }

        cc.log(menuItem.getTag());

        //sprite.setAnchorPoint(cc.p(0.5, 0.5));

        sprite.setPosition(cc.p(menuItem.getPositionX()+menuItem.getContentSize().width/2, menuItem.getPositionY()+menuItem.getContentSize().height/2));
        menuItem.addChild(sprite, 7);
    }catch(err){
        cc.log(err);
    }
    menuItem.enabled = false;
}
