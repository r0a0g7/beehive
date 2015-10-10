var res = {
    HelloWorld_png : "res/HelloWorld.png",

    CloseNormal_png : "res/StartScreen.png",
    CellNormal_png : "res/Cell_Empty.png",
    CellPressed_png : "res/Cell_Closed.png",
    CellDisabled_png : "res/Cell_Honey.png",
    BG_png:"res/BG.png"

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

