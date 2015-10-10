var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/StartScreen.png",
    CellNormal_png : "res/Cell_Empty.png",
    CellPressed_png : "res/Cell_Closed.png",
    CellBee_png : "res/Cell_Bee.png",
    CellDisabled_png : "res/Cell_Honey.png",
    BG_png:"res/BG.png",
    Forest_BG_png:"res/ForestBG.png",
    Level_disabled_png:"res/Level_disabled.png",
    Level_enabled_png:"res/Level_enabled.png",
    Level_Selected_png:"res/Level_Selected.png"

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

