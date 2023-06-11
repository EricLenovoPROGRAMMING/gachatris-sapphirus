class GachatrisLoopSwitch {
 constructor(on, off) {
  this.toggled = null;
  this.on = on;
  this.off = off;
 }
 toggle(bool) {
  if (typeof bool === "boolean" && bool && !this.movingReplay) {
   if (!this.toggled) {
    this.toggled = true;
    this.on();
   }
  } else {
   if (this.toggled || bool == "stop") {
    this.toggled = false;
    this.off();
   }
  }
 }
}

class GachatrisGameManager {
 constructor() {
  this.orientation = "";
  this.viewW = 0;
  this.viewH = 0;
  this.landscapeX = 0;
  this.landscapeY = 0;
  this.portraitX = 0;
  this.portraitY = 0;

  this.paddingX = 0;
  this.paddingY = 0;
  this.frames = 0;
  this.playingFrames = 0;
  this.syncFrames = 0;
  this.syncTime = 0;
  this.actualFrames = 0;
  this.totalFrames = 0;
  this.startFrame = 0;
  this.startTime;
  this.gameDelay = -9929;
  this.nextGameDelay = -9383;
  this.mode = null;
  this.currentMode = null;
  this.isProGachatris = false;
  this.gameRunner;
  this.gameRunning = false;
  this.isReplay = false;
  this.isPaused = false;
  this.players = [];
  this.currentPlayerCount = 1;
  this.playersCount = 81;
  this.activePlayer = 0;
  this.controllablePlayer = null;
  this.isAsyncOrSyncLoop = null;
  this.syncLoopRunning = false;
  this.replayData = {
   /*  keyLists: [{}, {}],
     tunings: [{}, {}],
     names: ["", ""],
     characters: [],
     mode: 0,
     parameter: {}*/
  };

  this.isOverheadLayerOn = null;

  this.isWarningDetected = false;
  this.isTopOutDetected = false;
  this.isFrenzyDetected = false;
  this.isFrenzySpecialDetected = false;

  this.isTeaming = true;
  this.images = {
   core: {},
   path: {}
  };
  this.miscellaneous = {

  };
  this.loadReady = true;
  this.isEnding = false;
  this.endingFrames = 0;
  this.nextSetFrames = 0;
  this.isNextSet = false;
  this.maxSet = 13;
  this.canStartAsyncLoop = true;
  this.currentParameters = {};
  this.keysPressed = 0;
  this.touchesPressed = 0;
  this.pauseDelay = 100;
  this.actualAsyncOrSyncLoop = null;
  this.movingReplay = false;
  this.particlesEnabled = true;
  this.particleLevel = 13;

  this.wormhole = {
   time: 1500,
   particleTime: 0,
   evalGarb: 0,
   isBlackHole: false,
   loopSwitch: new GachatrisLoopSwitch(() => {
    soundPlayer.playSfx("frenzy_wormhole||loop");
    this.wormhole.time++;

    //if (musicPlayer.checkMusic("frenzy")) musicPlayer.playMfx(["frenzy", "frenzy_support"]);
    $STYLE("gameBgClr", "opacity", "50%");
   }, () => {
    soundPlayer.stopSfx("frenzy_wormhole||loop");
    //if (musicPlayer.checkMusic("frenzy_support")) musicPlayer.killAllMfx();
    //musicPlayer.playMfx([this.currentMusic]);
    $STYLE("gameBgClr", "opacity", "0%");
   }),
   isWhiteHole: false
  };
  this.endable = false;
  this.delayHandlerArray = [];
 };
 endGame() {
  if (!this.endable) {
   this.gameRunning = false;
   musicPlayer.killAllMfx();
   clearInterval(this.gameRunner);
   particleManager.clear(particleManager.ctx);
   particleManager.particles = [];
   gameMenu.switchMenu("set", "end::2::false::true::true::game_over");
   gameMenu.showHideMenu(true);
   mobileButtons.enableButtons(false);
   this.isAsyncOrSyncLoop = null;
   this.actualAsyncOrSyncLoop = null;
   this.syncLoopRunning = null;
   this.isPaused = false;
   gameMenu.showHidePause(false);
  }
 }
 static toTimerString(i) {
  return gachatrisLanguage.transText1("timer", [Math.floor(i / (gachatrisCore.MAIN_FPS * 60 * 60)), `${Math.floor(i / (gachatrisCore.MAIN_FPS * 60)) % 60 >= 10 ? "" : "0"}${Math.floor(i / (gachatrisCore.MAIN_FPS * 60)) % 60}`, `${Math.floor(i / (gachatrisCore.MAIN_FPS)) % 60 >= 10 ? "" : "0"}${((i / gachatrisCore.MAIN_FPS) % 60).toFixed(3)}`])
 }

 pauseGame(bool, t) {
  if (this.isPaused !== bool && (t || (this.gameRunning && !this.isEnding))) {
   if (this.isPaused !== bool) {
    this.isPaused = bool;
    this.pauseDelay = 40;
   }
   if (this.isPaused) {
    mobileButtons.enableButtons(false);
    gameMenu.showHidePause(true);
    clearInterval(this.gameRunner);
    this.syncLoopRunning = false;
    this.pauseGameAnims(true);
    this.checkWarning("stop");
    this.checkFrenzy("stop");
    this.checkTopOut("stop");
    this.checkFrenzySpecial("stop");
    this.wormhole.loopSwitch.toggle("stop");
   } else {
      mobileButtons.enableButtons(gameStorage.currentSettings.settings.mobile_controls.isOn == 0);
    gameMenu.showHidePause(false);
    let temp = this.actualAsyncOrSyncLoop;
    this.switchLoopAsyncOrSync(false);
    this.actualAsyncOrSyncLoop = temp;
   }
  }

 }
 pauseGameAnims(bool) {
  let a = $QUERY("#SandboxArea *, #sandboxLayer *, #readySignalText");
  for (let b of a) {
   $STYLEELEM(b, "animationPlayState", !bool ? "running" : "paused");
  }
 }
 showCountDownText(canShow, text) {
  let e = `readySignalText`;
  $STYLE(e, "animation", "none");
  $ID(e).offsetHeight;
  if (typeof canShow === "boolean" && canShow) {
   $IH(e, text);
   $STYLE(e, "animation", "ready-signal-animation1 1200ms 1 linear");
  };
  if (canShow === "start") {
   $STYLE(e, "animation", "ready-signal-animation2 500ms 1 cubic-bezier(0.5,1,1,1)");
   $IH(e, text);
  };
  if (canShow === "pro_gachatris_start") {
   $STYLE(e, "animation", "pro-gachatris-startup 2000ms 1 cubic-bezier(0.5,1,1,1)");
   $IH(e, text);
  };
  if (canShow === "wormhole_start") {
   $STYLE(e, "animation", "wormhole-start 2400ms 1 cubic-bezier(0.5,1,1,1)");
   $IH(e, text);
  };
  if (canShow === "wormhole_ready") {
   $STYLE(e, "animation", "wormhole-ready 2400ms 1 cubic-bezier(0.5,1,1,1)");
   $IH(e, text);
  };
 };

 resolution() {
  SCREEN_WIDTH = window.innerWidth;
  SCREEN_HEIGHT = window.innerHeight;
  let ratioWidth = SCREEN_WIDTH,
   ratioHeight = SCREEN_HEIGHT,
   aspectRatio = 16 / 9;
  this.landscapeX = this.portraitX = SCREEN_WIDTH;
  this.landscapeY = this.portraitY = SCREEN_HEIGHT;
  if (SCREEN_WIDTH <= SCREEN_HEIGHT) {
   this.orientation = "portrait";
   ratioHeight = (Math.round(Math.min(SCREEN_WIDTH * aspectRatio, SCREEN_HEIGHT)));
   if (SCREEN_WIDTH * aspectRatio >= SCREEN_HEIGHT) {
    ratioWidth = SCREEN_WIDTH - (((SCREEN_WIDTH * aspectRatio) - SCREEN_HEIGHT) / 2);
    //interfaceSound.playSound("error")
   }
   this.portraitY = ratioHeight;
   this.portraitX = ratioWidth;
   this.landscapeX = ratioWidth
   this.landscapeY = Math.round(ratioWidth / aspectRatio);
  } else {
   this.orientation = "landscape";
   ratioWidth = (Math.round(SCREEN_HEIGHT * aspectRatio));
   this.landscapeY = ratioHeight;
   this.landscapeX = ratioWidth;
   this.portraitX = ratioHeight
   this.portraitY = Math.round(ratioHeight / aspectRatio);
  }
  //////console.log(`${ratioWidth}x${SCREEN_WIDTH * aspectRatio},\nSCREEN-HEIGHT: ${SCREEN_HEIGHT}; RATIO HEIGHT: ${SCREEN_WIDTH * aspectRatio}\n OP: ${SCREEN_WIDTH} x ${SCREEN_HEIGHT}, \n OR: ${this.orientation}\n(rH - SH): ${(SCREEN_WIDTH * aspectRatio) - SCREEN_HEIGHT}`)
  let aspectRatioResolution = Math.max(ratioWidth, ratioHeight);
  gachatrisCore.CELL_SIZE = Math.round(aspectRatioResolution / 50);
  let fieldSize = SETTINGS_RANGE.video.fieldSize.values[gameStorage.currentSettings.settings.video.fieldSize];
  gachatrisCore.PLAYERCLASSAREA_SIZE = gachatrisCore.CELL_SIZE * fieldSize;
  let sizeMult = 1,
   arrangeInt;
  if (this.players.length >= 3) {
   arrangeInt = Math.max(this.players.length - 1, 4)
   sizeMult = 1 / (Math.ceil(Math.sqrt(arrangeInt)));
  }
  this.viewW = ratioWidth;
  this.viewH = ratioHeight;
  let PADDING = ((ratioHeight / 2) - (gachatrisCore.PLAYERCLASSAREA_SIZE * 11));
  //for (let e of $TAG(`GTRIS-PLAYERCLASSAREA-PADDING`)) e.style.paddingTop = `${PADDING}px`;

  $STYLE("contentHeader", "height", `${gachatrisCore.CELL_SIZE * 2}px`);
  for (let f of "width.height".split(".")) {
   $STYLE("headerIcon", f, `${gachatrisCore.CELL_SIZE * 2}px`);
   $STYLE("headerBackButton", f, `${gachatrisCore.CELL_SIZE * 2}px`);
   $STYLE("headerBackIcon", f, `${gachatrisCore.CELL_SIZE * 2}px`);
  }

  $STYLE("loaderImageDiv", "display", "landscape" === this.orientation ? "block" : "none")

  $STYLE("screen", "width", `${SCREEN_WIDTH}px`);
  $STYLE("screen", "height", `${SCREEN_HEIGHT}px`);

  $STYLE("mobileButtonScreen", "width", `${SCREEN_WIDTH}px`);
  $STYLE("mobileButtonScreen", "height", `${SCREEN_HEIGHT}px`);

  $STYLE(`SkinImage`, `width`, `${gachatrisCore.CELL_SIZE * 11}px`);
  $STYLE(`SkinImage`, `height`, `${gachatrisCore.CELL_SIZE * 3}px`);
  $STYLE(`SkinCanvas`, `width`, `${gachatrisCore.CELL_SIZE * 11}px`);
  $STYLE(`SkinCanvas`, `height`, `${gachatrisCore.CELL_SIZE * 3}px`);

  gachatrisCore.canvasSize(`skin`, gachatrisCore.CELL_SIZE * 11, gachatrisCore.CELL_SIZE * 3);

  $STYLE(`SkinImageParticle`, `width`, `${gachatrisCore.CELL_SIZE * 11}px`);
  $STYLE(`SkinImageParticle`, `height`, `${gachatrisCore.CELL_SIZE * 1}px`);
  $STYLE(`SkinCanvasParticle`, `width`, `${gachatrisCore.CELL_SIZE * 11}px`);
  $STYLE(`SkinCanvasParticle`, `height`, `${gachatrisCore.CELL_SIZE * 1}px`);

  $STYLE(`particleHolder`, `width`, `${SCREEN_WIDTH}px`);
  $STYLE(`particleHolder`, `height`, `${SCREEN_HEIGHT}px`);

  $STYLE(`particleCanvas`, `width`, `${SCREEN_WIDTH}px`);
  $STYLE(`particleCanvas`, `height`, `${SCREEN_HEIGHT}px`);


  $STYLE(`gameBg`, `width`, `${this.landscapeY * aspectRatio}px`);
  $STYLE(`gameBg`, `height`, `${this.landscapeY}px`);
  
  $STYLE(`splashVideo`, `width`, `${this.landscapeY * aspectRatio}px`);
  $STYLE(`splashVideo`, `height`, `${this.landscapeY}px`);


  $STYLE("overheadLayer", "height", `${gachatrisCore.CELL_SIZE * 1.4}px`);
  particleManager.size(SCREEN_WIDTH, SCREEN_HEIGHT);

  gachatrisCore.canvasSize(`skinParticle`, gachatrisCore.CELL_SIZE * 11, gachatrisCore.CELL_SIZE * 1);

  $STYLE("overflow-fullMenu", "width", `${ratioWidth}px`);
  $STYLE("overflow-fullMenu", "height", `${ratioHeight}px`);
  _docElem.style.fontSize = `${gachatrisCore.PLAYERCLASSAREA_SIZE * 0.8}px`;
  $QS("*").style.fontSize = `${gachatrisCore.CELL_SIZE * 0.8}px`;

  for (let y of $CLASS("fullScreen")) {
   $STYLE(y.id, "width", `${ratioWidth}px`)
   $STYLE(y.id, "height", `${ratioHeight}px`)
  }
  $STYLE("menuViewer", "height", `${this.viewH - (gachatrisCore.CELL_SIZE * 2)}px`);
  this.paddingX = $RECT("core", "x");
  this.paddingY = $RECT("core", "y");

  let winCharPadNum = 3,
   winCharSize = 15,
   winCharMoveLeftward = 0,
   winCharMoveUpward = 0;
  if (this.orientation == "portrait") {
   winCharSize = 30;
   winCharMoveLeftward = 35;
   winCharMoveUpward = 4;
  }
  if (this.orientation == "landscape") {
   winCharSize = 20;
   winCharMoveLeftward = 15;
   winCharMoveUpward = 6;
  }
  $STYLE("winnerCharacterDiv", "width", `${gachatrisCore.CELL_SIZE * 3 * winCharSize}px`);
  $STYLE("winnerCharacterDiv", "height", `${gachatrisCore.CELL_SIZE * 2 * winCharSize}px`);
  $STYLE("winnerCharacterDiv", "right", `-${gachatrisCore.CELL_SIZE * 1 * winCharMoveLeftward}px`);
  $STYLE("winnerCharacterDiv", "top", `-${gachatrisCore.CELL_SIZE * 1 * winCharMoveUpward}px`);
  mobileButtons.checkButtons();

  gachatrisCore.createSkin(gachatrisCore.CELL_SIZE);

  gameMainMenu.resize(gachatrisCore.CELL_SIZE, ratioWidth, ratioHeight, aspectRatio);

  gachatrisCharacter.resize();
  gachatrisPlayerContainer.resize();
  ////////console.log(sizeMult, " ", `${arrangeInt}, ${Math.ceil(Math.sqrt(arrangeInt))}`)

  this.iteratePlayers((player, number) => {
   player.resize(gachatrisCore.PLAYERCLASSAREA_SIZE * (this.activePlayer + 1 == player.player ? 1 : sizeMult), PADDING, gachatrisCore.CELL_SIZE, this.orientation);
   if (player.queueBag.length > 0) player.previewDraw();
   if (player.holdPiece) player.holdDraw();
   if (typeof player.grid === "object") player.drawGrid();
    player.soundsEnabled = player.isVisible;
   if (player.activePiece) {
    player.drawPiece();
    player.drawPieceGhost();
   }
   if (this.players.length >= 3) {
    /*if (this.activePlayer + 1 !== player.player) player.moveBoardToContainer("GTRIS-MP-GRID");
    player.setSidePlacements("L", this.activePlayer + 1 === player.player);
    player.setSidePlacements("R", this.activePlayer + 1 === player.player);
    player.soundsEnabled = 
    player.particlesEnabled = this.activePlayer + 1 === player.player;*/
   }
   if (this.players.length > 2) {

    //$STYLE("GTRIS-MP-GRID", "width", `${this.viewW - (this.players[this.activePlayer].width * this.players[this.activePlayer].cellSize)}px`);
   } else {}

  });
  if (this.players.length > 2) {}
 }

 updateInputs() {
  if (this.isReplay) return;
  this.iteratePlayers(player => {
   if (player.isAi || player.player !== this.controllablePlayer + 1) return;
   player.touchesPressed = this.touchesPressed;
   player.keysPressed = this.keysPressed;
  })
 }

 setWinnerAnimation(showhide, obj) {
  let g = "winnerScreen";
  let delay = 400;
  if (showhide !== void 0) {
   let r = _ => $STYLE(g, "opacity", `${_ ? 100 : 0}%`);
   $STYLE(g, "animation", "none");
   $ID(g).offsetHeight;
   switch (showhide) {
    case true: {
     r(true);
     $STYLE(g, "animation", `fade-in ${delay * 2}ms 1 linear`);
     break;
    }
    case false: {
     r(false);
     //$STYLE(g, "animation", `fade-out ${delay}ms 1 linear`);
     break;
    }
    case "reset": {
     r(false);
     break;
    }
   }
  }
  if (obj !== void 0) {
   let img = "winnerCharacter",
    div = `${img}Div`,
    wtdiv = "WINNER-DIV-TEXT",
    wtext = "WINNER-TEXT";

   $ID(img).src = $BN(obj.src);
   $IH(`${wtext}1`, "WINNER:");
   $IH(`${wtext}2`, obj.name);
   $IH(`${wtext}3`, `(${obj.character})`);
   for (let z = 1; z <= 3; z++) {
    $STYLE(`${wtdiv}${z}`, "animation", "none");
    $ID(`${wtdiv}${z}`).offsetHeight;
    $STYLE(`${wtdiv}${z}`, "animation", `slide-from-${z % 2 == 0 ? "left" : "right"} ${delay + (z* 100)}ms 1 ease-out`);
   }
   $STYLE(div, "animation", "none");
   $ID(div).offsetHeight;
   $STYLE(div, "animation", `slide-from-left ${delay}ms 1 ease-out`);
  }
 }

 setOverheadLayer(f, e, clr) {
  let g = "overheadLayer";
  if (f !== void 0 && this.isOverheadLayerOn !== f) {
   this.isOverheadLayerOn = f;
   let delay = 100;
   let r = _ => $STYLE(g, "opacity", `${_ ? 100 : 0}%`);
   $STYLE(g, "animation", "none");
   $ID(g).offsetHeight;
   switch (f) {
    case true: {
     r(true);
     $STYLE(g, "animation", `fade-in ${delay}ms 1 linear`);
     break;
    }
    case false: {
     r(false);
     $STYLE(g, "animation", `fade-out ${delay}ms 1 linear`);
     break;
    }
    case "reset": {
     r(false);
     break;
    }
   }
  }
  if (e) $IH(g, e);

 }

 setParamsForModes(mode) {
  musicPlayer.loadedMFX = true;
  this.isProGachatris = false
  this.maxSet = 1;
  this.currentMusic = ["sapphyra", "hanriade", "boss"][gameStorage.currentSettings.settings.audio.musicbank];
  musicPlayer.loadMfx({ str: this.currentMusic, sup: 0 });
  musicPlayer.loadMfx({ str: "frenzy", sup: "frenzy_support" });
  musicPlayer.loadMfx({ str: "frenzy_support", sup: "" });
  this.iteratePlayers(player => {
   player.setBodyColor(void 0, void 0, void 0, void 0, "default");
   /* if (player.team == "sapphirus") {
     player.setBodyColor(187, 0, 170, 1, "set");
    }*/
   player.name = this.replayData.players[player.player].name;
   player.setNameplateName(player.name);
  });
  try {
   let count = 0,
    sPlayers = gameStorage.sessionSettings.playerAI;
   this.iteratePlayers(player => {
    player.ai.enableTspin = false;
    //  player.ai.rotations = 4;
    player.ai.delayReset = SETTINGS_RANGE.ai.speed.values[sPlayers[count].delayReset];
    if (player.player !== this.activePlayer + 1) {
     if (sPlayers[count].enableTspin) {
      player.ai.enableTspin = true;
      //  player.ai.rotations = 4;
     }
     count++;
    }
   });
  } catch (e) {}
  let _ = {
   0: function() {
    this.iteratePlayers(player => {
     player.frenzy.maxTime = 60 * gachatrisCore.MAIN_FPS;
     player.delay.frenzyReady = this.replayData.parameters.frenzy ? 90 : -83;
     player.isOSpin = this.replayData.parameters.allspin;
     player.isAllSpin = this.replayData.parameters.allspin;
    });
    this.isProGachatris = this.replayData.parameters.pro_gachatris;
   },
   1: function() {
    this.maxSet = 3;
    this.maxSet = this.replayData.parameters.wincount + 1;
    this.iteratePlayers(player => {
     player.setStatisticsText("name", 1, gachatrisLanguage.transText1("m_lines_sent"));
     player.setStatisticsText("name", 2, gachatrisLanguage.transText1("m_win_sets"));
     player.delay.frenzyReady = this.replayData.parameters.frenzy ? 100 : -83;
     player.frenzy.maxTime = 60 * gachatrisCore.MAIN_FPS;
     player.isOSpin = this.replayData.parameters.allspin;
     player.isAllSpin = this.replayData.parameters.allspin;
     player.openRightBar("garbage");
     player.canSendGarbage = "attack";
    });
    this.isProGachatris = this.replayData.parameters.pro_gachatris;
   },
   2: function() {
    this.iteratePlayers(player => {
     player.setStatisticsText("name", 1, gachatrisLanguage.transText1("m_wormhole_frenzytimer"));
     player.setStatisticsText("name", 2, gachatrisLanguage.transText1("m_wormhole_hp"));
     player.delay.frenzyReady = 120;
     player.frenzy.maxTime = 60 * gachatrisCore.MAIN_FPS;
     player.isOSpin = this.replayData.parameters.allspin;
     player.isAllSpin = this.replayData.parameters.allspin;
     player.isOnlyFrenzy = true;
     player.canSendGarbage = "storage";
     player.wormholeSetMaxHP(200);
     player.openLeftBar("frenzy");
     player.openRightBar("custom", "#77f");
     //player.wormhole.maxHP = 200;
    });
    soundPlayer.loadJsonSounds("frenzy_wormhole");
    this.isProGachatris = this.replayData.parameters.pro_gachatris;
   },
   3: function() {
    this.maxSet = 1;
    this.iteratePlayers(player => {
     player.setStatisticsText("name", 1, gachatrisLanguage.transText1("m_lines_sent"));
     player.delay.frenzyReady = this.replayData.parameters.frenzy ? 100 : -83;
     player.frenzy.maxTime = 60 * gachatrisCore.MAIN_FPS;
     player.isOSpin = this.replayData.parameters.allspin;
     player.isAllSpin = this.replayData.parameters.allspin;
     player.openRightBar("garbage");
     player.canSendGarbage = "attack";
     player.attributesDefense.isOn = true;
     player.setMaxHP(player.player !== 1 ? 1500 : 1500);
     player.openHPBar(true);
    });
    this.isProGachatris = this.replayData.parameters.pro_gachatris;
   },
  } [mode].bind(this)();
 }
 setParamsActual(u) {

  this.currentParameters = {
   characters: [],
   names: [],
   isPresetParameterPrioritized: false
  };


  switch (u) {
   case 0:
    this.replayData.parameters = {
     name: "zen",
     pro_gachatris: gameStorage.currentSettings.modes.overall.pro_gachatris,
     frenzy: gameStorage.currentSettings.modes.zen.is_frenzy,
     allspin: gameStorage.currentSettings.modes.zen.allspin,
    };
    this.currentParameters = {
     isPresetParameterPrioritized: false,
     characters: (function() {
      let q = [];
      q.push(gameStorage.currentSettings.settings.misc.character);
      return q;
     })(),
     names: (() => {
      let q = [];
      q.push(gameStorage.currentSettings.settings.misc.name);
      return q;
     })()
    };
    break;
   case 1:
    this.replayData.parameters = {
     name: "versus",
     pro_gachatris: gameStorage.currentSettings.modes.overall.pro_gachatris,
     allspin: gameStorage.currentSettings.modes.vs.allspin,
     frenzy: gameStorage.currentSettings.modes.vs.is_frenzy,
     wincount: gameStorage.currentSettings.modes.vs.wincount,
     reception: gameStorage.currentSettings.modes.vs.reception
    };
    this.currentParameters = {
     isPresetParameterPrioritized: false,
     characters: (function() {
      let q = [];
      q.push(gameStorage.currentSettings.settings.misc.character);
      for (let y of gameStorage.sessionSettings.playerAI) q.push(y.character);
      return q
     })(),
     names: (() => {
      let q = [];
      q.push(gameStorage.currentSettings.settings.misc.name);
      for (let y of gameStorage.sessionSettings.playerAI) q.push(y.name);
      return q
     })()
    };
    break;
   case 2:
    this.replayData.parameters = {
     name: "versus",
     pro_gachatris: gameStorage.currentSettings.modes.overall.pro_gachatris,
     allspin: gameStorage.currentSettings.modes.vs.allspin,
    };
    this.currentParameters = {
     isPresetParameterPrioritized: false,
     characters: (function() {
      let q = [];
      q.push(gameStorage.currentSettings.settings.misc.character);
      for (let y of gameStorage.sessionSettings.playerAI) q.push(y.character);
      return q
     })(),
     names: (() => {
      let q = [];
      q.push(gameStorage.currentSettings.settings.misc.name);
      for (let y of gameStorage.sessionSettings.playerAI) q.push(y.name);
      return q;
     })()
    };
    break;
   case 3:
    this.replayData.parameters = {
     name: "defense",
     pro_gachatris: gameStorage.currentSettings.modes.overall.pro_gachatris,
     allspin: gameStorage.currentSettings.modes.defense.allspin,
     frenzy: gameStorage.currentSettings.modes.defense.is_frenzy
    };
    this.currentParameters = {
     isPresetParameterPrioritized: false,
     characters: (function() {
      let q = [];
      q.push(gameStorage.currentSettings.settings.misc.character);
      for (let y of gameStorage.sessionSettings.playerAI) q.push(y.character);
      return q;
     })(),
     names: (() => {
      let q = [];
      q.push(gameStorage.currentSettings.settings.misc.name);
      for (let y of gameStorage.sessionSettings.playerAI) q.push(y.name);
      return q;
     })()
    };
    break;
  }
  //if (this.currentParameters?.characters && this.currentParameters.characters.length > 0) this.currentPlayerCount = Math.max(1, this.currentParameters.characters.length)
 }

 iteratePlayers(func) {
  for (let player = 0, e = this.players.length; player < e; player++) func(this.players[player], player);
 };
 createPlayer(integer) {
  let int = integer ? integer : 1;

  if (int !== this.playersCount) {
   $IH("SandboxArea", "");
   this.players = [];
   this.playersCount = int ? int : 1;

   for (let e = 0; e < int; e++) /**/
    this.players.push(new GachatrisPlayer(this.players.length + 1));
   let html = `<gtris-grid-players id="GTRIS-MP-GRID" style="position:absolute;display:block flex;flex-wrap:wrap;justify-content:space-evenly;overflow:hidden;height:55%;width:55%"></gtris-grid-players>`,
    style = "";
   this.iteratePlayers(player => {
    html += player.assetsHTML;
    style += player.assetsStyle;
   })
   $IH("SandboxArea", html);
   $IH("playerStyles", style);
   this.iteratePlayers(player => {
    player.setCanvasses();
    player.storeAllMainElementsToObject();
   })

  }

 };

 startReplay() {
  this.initialize("r");
  gameMenu.showHideMenu(false);
  gameMenu.showHidePause(false);
  gameMainMenu.show(false);
  gameMainMenu.showMenu(false);
 }



 prepareInitialization(r, players, parameters) {
  let replayOrMode = r;
  //this.currentMode = r || 0;
  if (replayOrMode !== "r" && replayOrMode > -1){
   this.currentMode = replayOrMode;
  }
  //let mode = replayOrMode !== "r" ? this.curre;

  //this.currentModemode = replayOrMode !== void 0 ? replayOrMode : this.mode;
  this.initialize(replayOrMode || this.currentMode, players || this.currentPlayerCount || 1, parameters || this.currentParameters);
  gameMenu.showHideMenu(false);
  gameMenu.showHidePause(false);
  gameMainMenu.show(false);
  gameMainMenu.showMenu(false);
 }

 initialize(replayOrMode, players, params) {
  if (replayOrMode == "r") {
   this.isReplay = true;
   this.activePlayer = 0;
  } else {
   this.isReplay = false;
   this.activePlayer = 0;
   this.replayData = {
    players: {},
    mode: replayOrMode,
    parameters: {},
   }

   this.setParamsActual(replayOrMode);
   this.currentPlayerCount = Math.max(players);
   for (let e = 1; e <= this.currentPlayerCount; e++) this.replayData.players[e] = {
    keyList: {},
    tuning: {
     AUTODEL: 60,
     AUTORATE: 7,
     SOFTDROP: 265,
     PREVIEW: 5,
     GRAVITY: 0,
     LOCK: 25,
    },
    mode: replayOrMode,
    character: this.currentParameters.characters[e - 1] || "0-0",
    rng: Math.round(Math.random() * 2147483647),
    name: this.currentParameters.names[e - 1] || `Player ${e}`,
    team: (this.activePlayer + 1 >= e) ? "sapphirus" : "enemy",
   }
   let { tune } = gameStorage.currentSettings.settings;
   let tuneValues = SETTINGS_RANGE.tune;
   if (!this.currentParameters.isPresetParameterPrioritized) {
    this.replayData.players[this.activePlayer + 1].tuning = {
     AUTODEL: tune.autodel,
     AUTORATE: tune.autorate,
     SOFTDROP: tune.softdrop,
     PREVIEW: tune.preview,
     GRAVITY: tune.gravity,
     LOCK: tune.lock,
    };
    this.replayData.players[this.activePlayer + 1].character = gameStorage.currentSettings.settings.misc.character;
   }
  }
  this.prepareAssetsForGame();
  this.resolution();
  
   this.loopLoad();
 }
 prepareAssetsForGame() {
  this.createPlayer(Object.keys(this.replayData.players).length);
  this.setWinnerAnimation(false);
  this.mode = this.replayData.mode;
  this.gameDelay = 20;
  this.totalFrames = 0;
  this.delayHandlerArray = [];
  this.wormhole.time = 1500;
  this.wormhole.evalGarb = 0;
  this.wormhole.isBlackHole = false;
  this.wormhole.isWhiteHole = false;
  this.iteratePlayers((player, number) => {
   player.setSeed(this.replayData.players[number + 1].rng)
   player.openLeftBar(false);
   player.openRightBar();
   player.life = 1;
   player.enable180 = false;

   player.defaultDelay.line = 220;
   player.defaultDelay.piece = 40;

   player.attributesDefense = {
    maxHP: 40332,
    hp: 40332,
    isOn: false,
    hpDamage: 0,
   }
   player.openHPBar();

   player.team = this.replayData.players[number + 1].team;
   player.isAi = true;
   player.target = "all";
   player.isOSpin = false;
   player.isAllSpin = false;
   player.attackType = "normal";
   let q = this.replayData.players[player.player],
    b = q.tuning;
   let tuneValues = SETTINGS_RANGE.tune;
   player.customPlayerSettings.SOFTDROP = tuneValues.softdrop.values[b.SOFTDROP];
   player.customPlayerSettings.GRAVITY = tuneValues.softdrop.values[b.GRAVITY];
   player.customPlayerSettings.AUTODEL = b.AUTODEL;
   player.customPlayerSettings.AUTORATE = b.AUTORATE;
   player.customPlayerSettings.PREVIEW = b.PREVIEW;
   player.customPlayerSettings.LOCK = tuneValues.lock.values[b.LOCK];
   player.isTSD = false;
   player.garbageDelay = 250;
   player.frenzy.maxTime = 30;
   player.winSets = 0;
   player.garbageBlocking = "limited";
   player.loadCharacter(q.character);
   player.isOnlyFrenzy = false;
   player.canSendGarbage = false;
   player.setPlayerSettingsWithProGachatris(false);
   for (let e = 1; e <= 4; e++) {
    for (let y of ["NAME", "VALUE"]) $IH(`P${player.player}-STATISTICS-${y}-${e}`, "");
   }
  });
  this.isTeaming = true;
  this.setOverheadLayer(false);
  this.setFadeForeground("reset");
  soundPlayer.loadSfx(gameStorage.currentSettings.settings.audio.soundbank);
  this.startFrame = 4 * gachatrisCore.MAIN_FPS + 2;
  this.frames = 0;
  this.isWarningDetected = false;
  this.isFrenzyDetected = false;

  this.playingFrames = 0;
  let a = 1;
  this.players[this.activePlayer].isAi = false;
  // this.players[this.activePlayer].playerSettings.GRAVITY = 0.1
  gameBackground.loadImage("assets/background/bg.png");
  gachatrisCore.loadSkin("default");
  // this.players[this.activePlayer].setC4W("prep")
  this.setParamsForModes(this.mode);
  if (this.isProGachatris) {
   this.gameDelay = 120;
   this.iteratePlayers(player => {
    player.setPlayerSettingsWithProGachatris(true);
    player.defaultDelay.piece = -84;
    player.defaultDelay.line = -84;
    player.enable180 = true;
    player.attackType = "tetr.io";
    player.garbageBlocking = "full";
   });
  }
  this.isAsyncOrSyncLoop = false;
  this.iteratePlayers(player => {
   let ftemp = player.delay.frenzyReady;
   player.resetPlayer();
   player.openHPBar(player.attributesDefense.isOn);
   player.delay.frenzyReady = ftemp;
   player.tryLoadingAssets();
  });
  mobileButtons.enableButtons(gameStorage.currentSettings.settings.mobile_controls.isOn == 0)
  this.checkWarning("stop");
  this.checkFrenzy("stop");
  this.checkTopOut("stop");
  this.checkFrenzySpecial("stop");
  this.wormhole.loopSwitch.toggle("stop");
  musicPlayer.killAllMfx();
    mobileButtons.enableButtons(gameStorage.currentSettings.settings.mobile_controls.isOn == 0);
  mobileButtons.replayToggleControllers(!this.isReplay);
  this.endingFrames = 301;
  this.nextSetFrames = 301;
  this.isNextSet = false;
  this.isEnding = false;
  

 }
 nextSetGameReset() {
  this.checkWarning("stop");
  this.checkFrenzy("stop");
  this.checkFrenzySpecial("stop");
  this.wormhole.loopSwitch.toggle("stop");
  this.playingFrames = 0;
  this.nextSetFrames = 301;
  this.isNextSet = false;
  this.setFadeForeground(false, 250);
  this.iteratePlayers(player => {
   player.resetPlayer();
  });
  this.switchLoopAsyncOrSync(true);
  this.startFrame = 4 * gachatrisCore.MAIN_FPS + 2;
 }
 startLoad() {

 }
 loopLoad() {
  let canStart = true;
  let loadingCount = 0;
  this.iteratePlayers(player => {
   if (!player.allAssetsLoaded) {
    canStart = false;
   } else loadingCount++;
  });
  if (
   !gachatrisCore.currentSkin.isOk1 || !gachatrisCore.currentSkin.isOk2 ||
   !soundPlayer.allSfxLoaded || !gameBackground.imageLoaded || !musicPlayer.loadedMFX) {
   canStart = false;
  };
  if (canStart) {
   $STYLE("loader", "display", "none");
   mobileButtons.showHide(true);
   gachatrisCore.createSkin(gachatrisCore.CELL_SIZE);
   this.gameRunning = true;
     mobileButtons.enableButtons(gameStorage.currentSettings.settings.mobile_controls.isOn == 0);
   /* let temp = this.actualAsyncOrSyncLoop = false;
    this.switchLoopAsyncOrSync(true);
    //if (this.canStartAsyncLoop) this.canStartAsyncLoop = true;
    this.actualAsyncOrSyncLoop = temp;
    if (this.canStartAsyncLoop) this.startLoopRAF();*/
   this.pauseDelay = -12;
   //this.isAsyncOrSyncLoop = true;
     mobileButtons.enableButtons(gameStorage.currentSettings.settings.mobile_controls.isOn == 0);
   let temp = this.isAsyncOrSyncLoop;
   this.switchLoopAsyncOrSync(true);
   this.isAsyncOrSyncLoop = temp;
   this.pauseGame(false, true);
   this.pauseGameAnims(false);
   this.iteratePlayers(player => {
    player.drawCharacterFieldImage();
    player.drawExternalCharacter();
   })
   if (!this.loadReady) {
    this.loadReady = true;
    this.setFadeForeground(false, 250);
    this.iteratePlayers(e => {
     e.animateBoardEntrance(true);
    })
   }
  } else {
   $STYLE("loader", "display", "flex");
   let loadPercent = 100 * (((loadingCount + soundPlayer.sfxLoaded) / (this.players.length + Object.keys(soundPlayer.sounds).length)));
   $IH("loadingDetail", `<gtris-load-loadingbar style="width:${loadPercent}%; height: ${gachatrisCore.CELL_SIZE}px; background: #fff; position: absolute; color: #000">${~~(loadPercent)}%</gtris-load-loadingbar>`);
   requestAnimationFrame(() => {
    this.loopLoad();
    this.loopRAF(true);
    this.isAsyncOrSyncLoop = null;
   //this.switchLoopAsyncOrSync(false);
    });
   if (this.loadReady) {
    mobileButtons.enableButtons(false);
    this.loadReady = false;
    let rnd = ~~((Math.random() * 4) + 1);
    $ID("loaderImage").src = this.images.core[`dyk${rnd}`].src;
    $IH("loaderText", gachatrisLanguage.transText1(`dyktext${rnd}`));
   }
  }
 }

 loopLoadAfterReplaySeek() {
  let canStart = true;
  let loadingCount = 0;
  this.iteratePlayers(player => {
   if (!player.allAssetsLoaded) {
    canStart = false;
   } else loadingCount++;
  });
  if (this.movingReplay || !soundPlayer.allSfxLoaded || !gameBackground.imageLoaded || !musicPlayer.loadedMFX) {
   canStart = false;
  };
  if (canStart) {
   $STYLE("loader", "display", "none");
   if (!this.loadReady) {
    this.loadReady = true;
    this.setFadeForeground(false, 1000);
    $STYLE("SandboxArea", "animation", "none");
    $ID("SandboxArea").offsetHeight;
    $STYLE("SandboxArea", "animation", "scale-in 1000ms 1 cubic-bezier(0,1,1,1)");
    /*this.iteratePlayers(e => {
     e.animateBoardEntrance(true);
    })*/
   }
   mobileButtons.showHide(true);
   this.gameRunning = true;
   this.pauseDelay = 100;
   //this.isAsyncOrSyncLoop = true;
   this.canStartAsyncLoop = true;
     mobileButtons.enableButtons(gameStorage.currentSettings.settings.mobile_controls.isOn == 0);
   let temp = this.actualAsyncOrSyncLoop;
   //this.switchLoopAsyncOrSync(false);
   this.actualAsyncOrSyncLoop = temp;
   //this.startLoopRAF();
   this.pauseGame(false, true);
   this.pauseGameAnims(false);
   this.iteratePlayers(player => {
    player.drawGrid();
    player.previewDraw();
    player.holdDraw();
    player.drawPiece();
    player.drawPieceGhost();
    player.drawCharacterFieldImage();
    player.drawExternalCharacter();
   })
  } else {
   $STYLE("loader", "display", "flex");
   let loadPercent = 100 * ((this.totalFrames / gameReplayer.targetSeek) * ((loadingCount + soundPlayer.sfxLoaded) / (this.players.length + Object.keys(soundPlayer.sounds).length)));
   $IH("loadingDetail", `<gtris-load-loadingbar style="width:${loadPercent}%; height: ${gachatrisCore.CELL_SIZE}px; background: #fff; position: absolute; color: #000">${~~(loadPercent)}%</gtris-load-loadingbar>`);
   /*if (!this.movingReplay)/**/
   requestAnimationFrame(() => this.loopLoadAfterReplaySeek());
   if (this.loadReady) {
    mobileButtons.enableButtons(false);
    this.loadReady = false;
    let rnd = ~~((Math.random() * 4) + 1);
    $ID("loaderImage").src = this.images.core[`dyk${rnd}`].src;
    $IH("loaderText", gachatrisLanguage.transText1(`dyktext${rnd}`));
   }
  }
 }
 setFadeForeground(bool, delay) {
  let g = "foregroundColor";
  let r = _ => $STYLE(g, "opacity", `${_ ? 100 : 0}%`);
  $STYLE(g, "animation", "none");
  $ID(g).offsetHeight;
  switch (bool) {
   case true: {
    r(true);
    $STYLE(g, "animation", `fade-in ${delay}ms 1 linear`);
    break;
   }
   case "flash": {
    r(false);
    $STYLE(g, "animation", `wormhole-fade-out-white ${delay}ms 1 linear`);
    break;
   }
   case false: {
    r(false);
    $STYLE(g, "animation", `fade-out ${delay}ms 1 linear`);
    break;
   }
   case "reset": {
    r(false);
    break;
   }
  }
 }
 checkWarning(warning) {
  if (typeof warning === "boolean" && warning && !this.movingReplay) {
   if (!this.isWarningDetected) {
    this.isWarningDetected = true;
    soundPlayer.playSfx("alarm");
    soundPlayer.playSfx("heartbeat");
    $STYLE("gameBgClr", "opacity", "50%");
   }
  } else {
   if (this.isWarningDetected || warning == "stop") {
    this.isWarningDetected = false;
    soundPlayer.stopSfx("alarm");
    soundPlayer.stopSfx("heartbeat");
    $STYLE("gameBgClr", "opacity", "0%");
   }
  }
 }
 checkFrenzy(y) {
  if (typeof y === "boolean" && y && !this.movingReplay) {
   if (!this.isFrenzyDetected) {
    this.isFrenzyDetected = true;
    if (musicPlayer.checkMusic("frenzy")) musicPlayer.playMfx(["frenzy", "frenzy_support"]);
    $STYLE("gameBgClr", "opacity", "50%");
   }
  } else {
   if (this.isFrenzyDetected || y == "stop") {
    this.isFrenzyDetected = false;
    if (musicPlayer.checkMusic("frenzy_support") && y !== "stop") musicPlayer.killAllMfx();
    if (y !== "stop") musicPlayer.playMfx([this.currentMusic]);
    $STYLE("gameBgClr", "opacity", "0%");
   }
  }
 }
 checkFrenzySpecial(y) {
  if (typeof y === "boolean" && y && !this.movingReplay) {
   if (!this.isFrenzySpecialDetected) {
    this.isFrenzySpecialDetected = true;
    musicPlayer.changeIndividualVol("frenzy_support", 100);

   }
  } else {
   if (this.isFrenzySpecialDetected || y == "stop") {
    this.isFrenzySpecialDetected = false;
    musicPlayer.changeIndividualVol("frenzy_support", 0);

   }
  }
 }

 checkFrenzyWormhole(y) {
  if (typeof y === "boolean" && y && !this.movingReplay) {
   if (!this.isFrenzyWormholeDetected) {
    this.isFrenzyWormholeDetected = true;
    if (musicPlayer.checkMusic("frenzy")) musicPlayer.playMfx(["frenzy", "frenzy_support"]);
    $STYLE("gameBgClr", "opacity", "50%");
   }
  } else {
   if (this.isFrenzyWormholeDetected || y == "stop") {
    this.isFrenzyWormholeDetected = false;
    if (musicPlayer.checkMusic("frenzy_support") && y !== "stop") musicPlayer.killAllMfx();
    if (y !== "stop") musicPlayer.playMfx([this.currentMusic]);
    $STYLE("gameBgClr", "opacity", "0%");
   }
  }
 }


 checkTopOut(warning) {
  if (typeof warning === "boolean" && warning && !this.movingReplay) {
   if (!this.isTopOutDetected) {
    this.isTopOutDetected = true;
    soundPlayer.playSfx("topoutwarning");
    $STYLE("gameBgClr", "background", "#f00");
   }
  } else {
   if (this.isTopOutDetected || warning == "stop") {
    this.isTopOutDetected = false;
    soundPlayer.stopSfx("topoutwarning");
    $STYLE("gameBgClr", "background", "#000");
   }
  }
 }

 addDelayTrigger(delay, func) {
  this.delayHandlerArray.push(new GachatrisDelayTrigger(delay, func));
 }

 loopRAF(isContinue) {

  /*window.setTimeout(() => {
   this.loopRAF();
  }, 1000 / 60);/**/
  let isLoopable = false;
  if (!this.isPaused || isContinue)
   do {
    if (!this.loadReady) {
     //isLoopable = true;
     break;
    }
    if (this.pauseDelay >= 0) {
     this.pauseDelay--;
     if (this.pauseDelay == 0) {
      this.pauseGameAnims(false);
      if (this.actualAsyncOrSyncLoop) {
       this.switchLoopAsyncOrSync(true);
       break;
      }
     }
     isLoopable = true;
     break;
    }
    soundPlayer.resetSoundUsed();
    particleManager.refresh();
    for (let ow = 0; ow < 4; ow++) /**/ this.runHandlerDelays();
    this.totalFrames++;
    if (this.gameDelay >= 0) {
     this.gameDelay--;
     isLoopable = true;
     if (this.gameDelay == 119 && this.isProGachatris) this.showCountDownText("pro_gachatris_start", gachatrisLanguage.transText1(`pro_gachatris_startup`));
     if (this.gameDelay == 0) {
      this.switchLoopAsyncOrSync(true);
     }
    }
    if (this.isNextSet) {
     if (this.nextSetFrames > -1) {
      this.nextSetFrames--;
      isLoopable = true;
      if (this.nextSetFrames === 30) this.setFadeForeground(true, 250);
      if (this.nextSetFrames === 0) this.nextSetGameReset();
     }
    }
    if (this.isEnding) {
     this.endingFrames--;
     if (this.endingFrames == 298) musicPlayer.killAllMfx();
     if (this.endingFrames == 190) {
      let winners = [];
      this.iteratePlayers(player => {
       if (player.winSets >= this.maxSet) winners.push(player.player);
      })
      if (winners.length == 1) {
       let winner = this.players[winners[0] - 1];
       this.setWinnerAnimation(true, {
        src: winner.character.path.winner_screen,
        name: winner.name,
        character: winner.character.details.name
       });
      }
     }
     if (this.endingFrames == 0) {
      this.endGame();
      break;
     }

     isLoopable = true;
    }
   } while (false);
  this.canStartAsyncLoop = isContinue || !isLoopable;
  return isLoopable;
 }

 runHandlerDelays() {
  if (this.delayHandlerArray.length > 0) {
   for (let i = 0, len = this.delayHandlerArray.length; i < len; i++) {
    if (typeof this.delayHandlerArray[i] !== "undefined") {
     this.delayHandlerArray[i].run();
    }
    if (this.delayHandlerArray[i].delay < -2) {
     this.delayHandlerArray.splice(i, 1);
     len--;
     i--;
    }
   }
  }
 }

 gameLoopStarter() {
  if (!this.syncLoopRunning) {
   this.syncLoopRunning = true;
   this.startTime = Date.now();
   this.actualFrames = 0;
   this.syncFrames = 0;
   let interval = 1000 / gachatrisCore.MAIN_FPS;
   this.gameRunner = setInterval(() => {
    let syncTime = Math.floor((Date.now() - this.startTime) / (1000 / gachatrisCore.MAIN_FPS));
    let syncFrames = syncTime - this.actualFrames;

    for (let i = 0; i < syncFrames; i++, this.actualFrames++) {
     this.loop();
    } /**/
    /*do {
     this.loop();
    } while (this.startFrame > 0 && this.gameDelay < 0 && !this.isEnding);/**/
   }, interval);
  };
 };
 switchLoopAsyncOrSync(boolean) {
  if (boolean !== this.isAsyncOrSyncLoop && typeof boolean === "boolean") {
   this.isAsyncOrSyncLoop = this.actualAsyncOrSyncLoop = boolean;
   if (!this.movingReplay) {
    if (this.isAsyncOrSyncLoop) {
     this.gameLoopStarter();
    }
    else {
     this.syncLoopRunning = false;
     clearInterval(this.gameRunner);
    }
   }
  }
  if (!this.movingReplay && !boolean && typeof boolean === "boolean") this.startLoopRAF();

 }
 loopRAFLoop() {
  if (this.loopRAF() && this.loadReady) requestAnimationFrame(() => {
   this.loopRAFLoop();
  })
 }
 startLoopRAF() {
  this.isAsyncOrSyncLoop = false;
  if (this.canStartAsyncLoop) {
   ////console.log("started loop reqanimframe", this.canStartAsyncLoop);
   this.loopRAFLoop();
  }
 }
 loop(isContinue) {
  if (this.loadReady || isContinue)
   do {
    soundPlayer.resetSoundUsed();
    if (this.gameDelay > 0) {
     this.switchLoopAsyncOrSync(false);
     break;
    }
    if (this.gameRunning) try {
     this.totalFrames++;
     this.updateInputs();
     if (!this.isEnding && this.syncLoopRunning) {
      this.frames++;
      if (this.frames == 10) musicPlayer.playMfx([this.currentMusic]);
      if (this.startFrame >= 0) {
       this.startFrame -= 1;
      } else {
       if (!this.isNextSet) this.playingFrames++;
      }
      /*for (let sounds in soundPlayer.sounds) {
       soundPlayer.sounds[sounds].rate(1+(this.players[this.activePlayer].score * 0.0001))
      }/**/
      switch (this.startFrame) {
       case 3 * gachatrisCore.MAIN_FPS:
        soundPlayer.playSfx("ready3");
        this.showCountDownText(true, gachatrisLanguage.transText1(`ready3`))
        break;
       case 3 * gachatrisCore.MAIN_FPS - 60: {
        let q = true;
        this.iteratePlayers(function(a) {
         a.previewDraw();
         a.holdDraw();
         if (a.winSets > 0) q = false;
        });
        if (q) {
         this.iteratePlayers((player) => {
          player.setExternalCharacter("start");
         });
        }
        break;
       }
       case 2 * gachatrisCore.MAIN_FPS:
        soundPlayer.playSfx("ready2");
        this.showCountDownText(true, gachatrisLanguage.transText1(`ready2`))
        break;
       case 1 * gachatrisCore.MAIN_FPS:
        soundPlayer.playSfx("ready1");
        this.showCountDownText(true, gachatrisLanguage.transText1(`ready1`))
        break;
       case 0 * gachatrisCore.MAIN_FPS:
        soundPlayer.playSfx("start");
        this.showCountDownText("start", gachatrisLanguage.transText1(`start`));
         this.iteratePlayers((player) => {
          player.setExternalCharacter(false);
         });
        this.iteratePlayers(player => {
         let isDelay = false;
         
         for (let e in player.delay) {
          if (player.delay[e] > 0) isDelay = true;
         }
         if (!isDelay) player.injectPiece(player.previewNext());

        })
        break;
      }

      let isActive = false,
       teamActive = [],
       countActive = 0,
       warning = false,
       topout = false,
       frenzy = false,
       frenzySpecial = 0,
       noDelay = true,
       isEnd = false;
      this.iteratePlayers(player => {
       player.playerUpdate();
       //player.attributesDefense.maxHP = 21330;
       //if (this.frames % 5 == 0) player.addGarbageArr(1, 0)
       // player.checkHPBar();
       if (player.isActive) countActive++;
       player.updateTimer(this.playingFrames);
       if (!gameManager.isTeaming || (teamActive.indexOf(player.team) == -1 && player.isActive)) {
        teamActive.push(player.team);
       }
       if ((countActive > 1 && player.isActive && this.playersCount > 1 && teamActive.length > 1) || (this.playersCount == 1 && player.isActive)) isActive = true;
      });

      this.keysLast = this.keysPressed;
      switch (this.mode) {
       case 0: {
        break;
       }
       case 1: {
        this.iteratePlayers(player => {
         player.setStatisticsText("val", 1, player.statistics.attack);
         player.setStatisticsText("val", 2, gachatrisLanguage.transText1("m_win_sets_fraction", [player.winSets, this.maxSet]));
        })
        break;
       }
       case 2: {
        let isFrenzyRunning = false;
        this.iteratePlayers(player => {
         //if (player.wormhole.lastHP !== player.wormhole.hp) {
         // }
         if (player.isActive && (player.delay.frenzyOut > 0 || player.frenzy.isOn || player.frenzy.timer > 0 || player.delay.frenzyReady > 0 || player.delay.frenzyIn > 0)) {
          isFrenzyRunning = true;
         } else {

         }
        });
        if (isFrenzyRunning) {
         if (this.wormhole.time < 14 * gachatrisCore.MAIN_FPS) this.wormhole.time = 15 * gachatrisCore.MAIN_FPS;
        } else {
         this.wormhole.time--;
         switch (this.wormhole.time) {
          case 14.8 * gachatrisCore.MAIN_FPS:
           musicPlayer.killAllMfx();
           this.showCountDownText("wormhole_ready", gachatrisLanguage.transText1("m_wormhole_ready"));
           soundPlayer.playSfx("frenzy_wormhole||start");
           break;
          case 12.5 * gachatrisCore.MAIN_FPS: {
           let isWormholable = false;
           let delay = 500;
           this.iteratePlayers(player => {
            let a = ~~(player.garbageStorage / 6);
            player.garbageStorage = a;
            if (a > 0) isWormholable = true;
           });

           if (isWormholable) {
            this.setFadeForeground("flash", 1000);
            this.showCountDownText("wormhole_start", gachatrisLanguage.transText1("m_wormhole_wormhole"));
            soundPlayer.playSfx("frenzy_wormhole||blackhole");
            soundPlayer.stopSfx("frenzy_wormhole||start");
            let highest = 0,
             highestPlayer = null,
             highestTeam = null,
             lowest = Infinity;
            this.wormhole.time--;
            this.wormhole.isBlackHole = true;
            this.iteratePlayers(player => {
             if (player.isActive) {
              player.openFrenzy("wormhole");
              player.setExternalCharacter("wormhole");
              player.editAssetHTMLText(`P${player.player}-EXTERNAL-TEXT`, gachatrisLanguage.transText1("m_wormhole_attack"));
              let a = player.garbageStorage;
              if (highest < a) {
               highest = a;
               highestTeam = player.team
               highestPlayer = player.player;
              }
              if (lowest >= a) lowest = a;
             }
            });
            if (this.players.length > 2 && this.isTeaming) {
             this.iteratePlayers(player => {
              if (player.team == highestTeam && player.isActive)
               player.garbageStorage = highest;
             });
            }
            this.iteratePlayers(player => {
             if (player.isActive) {
              player.wormhole.damageReceived = highest - player.garbageStorage;
              //if (highest - player.garbageStorage > 0) isTie = false;
             }
            });
            let blackHoleTotalDelay = delay,
             prevDelay = delay;
            this.iteratePlayers(player => {
             delay = 130;
             for (let w = 0; w < lowest && player.isActive; w++) {
              this.addDelayTrigger(delay, () => {
               player.playSound("frenzy_wormhole||transmit");

               if (player.isVisible && player.particlesEnabled && player.particleLevel >= 1) {
                let fieldX = player.assetRect(`P${player.player}-FIELD`, "x"),
                 fieldY = player.assetRect(`P${player.player}-FIELD`, "y"),
                 fieldWidth = player.assetRect(`P${player.player}-FIELD`, "width"),
                 fieldHeight = player.assetRect(`P${player.player}-FIELD`, "height");
                particleManager.addParticle(
                 1,
                 ~~(Math.random() * 7) + 2,
                 fieldX + (fieldWidth / 2),
                 fieldY + (fieldHeight / 2),
                 fieldX + (fieldWidth / 2) + ~~(((Math.random() * 18) + Math.random() * -18) * player.cellSize),
                 fieldY + (fieldHeight / 2) + ~~(((Math.random() * 18) + Math.random() * -18) * player.cellSize),
                 Math.floor(250 / 8),
                 3,
                 "randomEase"
                )
               }
              });
              delay += 40;
              if (blackHoleTotalDelay < delay) blackHoleTotalDelay = delay;
             }
            });
            delay = blackHoleTotalDelay;
            delay += 400;
            this.addDelayTrigger(delay, () => {
             soundPlayer.playSfx("frenzy_wormhole||whitehole");
             this.wormhole.isBlackHole = false;
             this.setFadeForeground("flash", 1000);
             this.iteratePlayers(player => {
              if (player.isActive) {
               player.openFrenzy(false);
              }
             });
            });
            delay += 600;
            prevDelay = delay;

            this.addDelayTrigger(delay, () => {
             this.iteratePlayers(player => {
              if (highest == player.garbageStorage && player.isActive) {
               player.wormhole.isHigh = true;
               player.setStyle(`P${player.player}-BODY`, "opacity", "0%");
               player.fieldAnimate("frenzy-board-in", "200m", "1", "ease-in", "0");
              }
             });
            });
            delay += 110;
            this.addDelayTrigger(delay, () => {
             this.iteratePlayers(player => {
              this.wormhole.isWhiteHole = true;
              if (highest == player.garbageStorage && player.isActive) {
               player.setStyle(`P${player.player}-BODY`, "opacity", "100%");
               player.fieldAnimate("frenzy-board-out", "200m", "1", "ease-in", "0");
               player.openFrenzy("wormhole");
              }
             });
            });
            delay += 110;
            prevDelay = delay;
            let highestDelay = -380;

            this.iteratePlayers(player => {
             delay = prevDelay;
             for (let w = 0; w < player.wormhole.damageReceived && player.isActive; w++) {
              this.addDelayTrigger(delay, () => {
               this.players[highestPlayer - 1].playSound("frenzy_wormhole||transmit");

               if (player.isVisible && player.particlesEnabled && player.particleLevel >= 1 && player.wormhole.damageReceived > 0) {
                let fieldX = player.assetRect(`P${highestPlayer}-FIELD`, "x"),
                 fieldY = player.assetRect(`P${highestPlayer}-FIELD`, "y"),
                 fieldWidth = player.assetRect(`P${highestPlayer}-FIELD`, "width"),
                 fieldHeight = player.assetRect(`P${highestPlayer}-FIELD`, "height");

                let fieldX2 = player.assetRect(`P${player.player}-FIELD`, "x"),
                 fieldY2 = player.assetRect(`P${player.player}-FIELD`, "y"),
                 fieldWidth2 = player.assetRect(`P${player.player}-FIELD`, "width"),
                 fieldHeight2 = player.assetRect(`P${player.player}-FIELD`, "height");


                particleManager.addParticle(
                 1,
                 ~~(Math.random() * 7) + 2,
                 fieldX + (fieldWidth / 2),
                 fieldY + (fieldHeight / 2),
                 fieldX2 + (fieldWidth2 / 2) + ~~(((Math.random() * 6) + Math.random() * -6) * player.cellSize),
                 fieldY2 + (fieldHeight2 / 2) + ~~(((Math.random() * 6) + Math.random() * -6) * player.cellSize),
                 Math.floor(450 / 4),
                 3,
                 "randomEase"
                )
               }
              });
              if (player.isActive) this.addDelayTrigger(delay + (450), () => {
               player.playSound("frenzy_wormhole||hit");
               player.wormhole.hp -= 3;
               if (player.wormhole.hp < 0) player.wormhole.hp = 0;
               player.fieldAnimate("wormhole-shake", "40m", "1", "ease-in", `-${Math.random() * 30}ms`);
              });
              delay += 70;
              if (highestDelay <= delay) highestDelay = delay;
             }
             if (highestDelay <= delay) highestDelay = delay;
            });
            delay = highestDelay
            let afterDelay = delay + 450;
            prevDelay = delay;
            this.addDelayTrigger(delay, () => {
             this.iteratePlayers(player => {
              if (highest == player.garbageStorage && player.isActive) {
               player.wormhole.isHigh = false
               player.setStyle(`P${player.player}-BODY`, "opacity", "0%");
               player.fieldAnimate("frenzy-board-in", "200m", "1", "ease-in", "0");
              }
             });
            });
            delay += 110;
            this.addDelayTrigger(delay, () => {
             this.iteratePlayers(player => {
              this.wormhole.isWhiteHole = false;
              if (highest == player.garbageStorage && player.isActive) {
               player.setStyle(`P${player.player}-BODY`, "opacity", "100%");
               player.fieldAnimate("frenzy-board-out", "200m", "1", "ease-in", "0");
               player.openFrenzy(false);
              }
             });
            });
            //delay = prevDelay;
            this.addDelayTrigger(afterDelay, () => {
             this.iteratePlayers(player => {
              if (player.isActive && player.wormhole.hp <= 0) {
               player.playSound("frenzy_wormhole||break");
              }
             });
             let delay2 = 400;
             this.addDelayTrigger(delay2, () => {
              this.iteratePlayers(player => {
               if (player.isActive && player.wormhole.hp <= 0) {
                player.checkLoseOrLifeLost("", true)
               }
              });
              // delay2 += 200;
              let playersActive = 0,
               activeTeams = [];
              this.iteratePlayers(player => {
               if (player.isActive && activeTeams.indexOf(player.team) === -1) {
                playersActive++;
                activeTeams.push(player.team);
               }
               player.garbageStorage = player.wormhole.damageReceived = 0;
              });
              if (playersActive > 1) {
               this.addDelayTrigger(300, () => {
                this.iteratePlayers(player => {
                 if (player.isActive) {
                  player.delay.frenzyReady = 200;

                 }
                });
               });
              }
             })

            });

            //console.log(this.delayHandlerArray)
           } else {
            soundPlayer.stopSfx("frenzy_wormhole||start");
            soundPlayer.playSfx("frenzy_wormhole||whitehole");
            this.iteratePlayers(player => {
             if (player.isActive) {
              player.delay.frenzyReady = 500;

             }
            });
           }


           break;
          }
         }

        }
        this.iteratePlayers(player => {
         player.checkRightBar(player.wormhole.hp / player.wormhole.maxHP);
        });
        if (this.wormhole.isWhiteHole) {
         if (this.frames % 7 == 0) {
          this.iteratePlayers(player => {
           if (player.isVisible && player.particlesEnabled && player.particleLevel >= 3 && player.wormhole.isHigh && player.isActive) {
            let fieldX = player.assetRect(`P${player.player}-FIELD`, "x");
            let fieldY = player.assetRect(`P${player.player}-FIELD`, "y"),
             fieldWidth = player.assetRect(`P${player.player}-FIELD`, "width"),
             fieldHeight = player.assetRect(`P${player.player}-FIELD`, "height");
            particleManager.addParticle(
             0,
             "white",
             fieldX + (fieldWidth / 2),
             fieldY + (fieldHeight / 2),
             fieldX + (fieldWidth / 2) + ~~(((Math.random() * 18) + Math.random() * -18) * player.cellSize),
             fieldY + (fieldHeight / 2) + ~~(((Math.random() * 18) + Math.random() * -18) * player.cellSize),
             60 + Math.round(Math.random() * 120),
             1,
             "hardDrop"
            )
           }
          });
         }
        }
        if (this.wormhole.isBlackHole) {
         this.iteratePlayers(player => {
          if (player.isVisible && player.particlesEnabled && player.particleLevel >= 3 && player.isActive)
           if (this.wormhole.particleTime == 0) {
            let fieldX = player.assetRect(`P${player.player}-FIELD`, "x"),
             fieldY = player.assetRect(`P${player.player}-FIELD`, "y"),
             fieldWidth = player.assetRect(`P${player.player}-FIELD`, "width"),
             fieldHeight = player.assetRect(`P${player.player}-FIELD`, "height");
            particleManager.addParticle(
             0,
             "random",
             fieldX + (fieldWidth / 2),
             fieldY + (fieldHeight / 2),
             fieldX + (fieldWidth / 2) + ~~(((Math.random() * 18) + Math.random() * -18) * player.cellSize),
             fieldY + (fieldHeight / 2) + ~~(((Math.random() * 18) + Math.random() * -18) * player.cellSize),
             60 + Math.round(Math.random() * 120),
             1,
             "hardDrop"
            )
            this.wormhole.particleTime = 10;
           } else {
            this.wormhole.particleTime--;
           }
         })
        }
        this.wormhole.loopSwitch.toggle(this.wormhole.isBlackHole);

        this.iteratePlayers(player => {
         player.setStatisticsText("val", 1, GachatrisGameManager.toTimerString(Math.max(player.frenzy.timer, 0)));
         player.setStatisticsText("val", 2, player.wormhole.hp);
        });
        break;

       }
       case 3: {
        this.iteratePlayers(player => {
         player.setStatisticsText("val", 1, player.statistics.attack);
        })
        break;
       }
      }
      if (!this.isNextSet) {

       let warningBlockCount = 0;
       this.iteratePlayers(player => {
        if (isActive && player.isWarning && player.isActive && player.isVisible) warning = true;
        if (isActive && player.isTopOut && player.isActive && player.isVisible) topout = true;
        if (isActive && (player.frenzy.isReady || player.frenzy.isOn) && player.isActive && player.isVisible) {
         frenzy = true;
         frenzySpecial++;
        }
        for (let r in player.delay) {
         if (player.delay[r] > 0 && player.isActive) noDelay = false;
        }
        if (warningBlockCount < player.isWarningBlockCount) warningBlockCount = player.isWarningBlockCount;
       });

       this.runHandlerDelays();


       this.checkWarning(warning);
       this.checkFrenzy(frenzy);
       this.checkFrenzySpecial(frenzySpecial >= Math.max(this.players.length - 1, 2));
       this.checkTopOut(topout);
       soundPlayer.changeSpeedIndividual("heartbeat", Math.max(1, 1 + (warningBlockCount * 0.0091)))

       if (this.players.length == 1 && !this.players[0].isActive) {
        isEnd = true;
        isActive = false;
       }
       if (this.players.length > 1 && countActive == 0) {
        isEnd = true;
        this.isNextSet = true;
       }



       if (!isActive) {
        this.iteratePlayers((player, number) => {
         player.pieceY = -88;
         if (player.isActive && noDelay) {
          player.fieldResult("win", false, "");
          player.winSets++;
          player.playerclassareaSway.x = player.playerclassareaSway.y = player.playerclassareaSway.rot = 0;
          player.resetPlayerClassAreaSwayPosition();
          player.setExternalCharacter("win");
          $IH(`P${player.player}-EXTERNAL-TEXT`, gachatrisLanguage.transText1("win"));
          isEnd = true;
         }
        })
        if (isEnd) {
         this.isNextSet = true;
        }
       }
      } else {
       if (this.players.length === 1) {
        this.isEnding = true;
       }
       {
        let isSetFoundWin = false;
        let matchPointTiebreakerArr = [];
        this.iteratePlayers(player => {
         if (this.maxSet - 1 == player.winSets) matchPointTiebreakerArr.push(player.player);
         if (player.winSets >= this.maxSet) isSetFoundWin = true;
        });
        let matchPointTiebreakerLength = matchPointTiebreakerArr.length;
        if (isSetFoundWin) {
         this.isEnding = true;
         this.setOverheadLayer(false);
         if (this.maxSet > 1) {
          this.showCountDownText(true, gachatrisLanguage.transText1("m_1v1_game"));
         }
        } else {
         if (matchPointTiebreakerLength > 0 && this.maxSet > 1) {
          this.setOverheadLayer(true, gachatrisLanguage.transText1("pvp_tiebreaker"));
         }
         if (this.maxSet > 1 && matchPointTiebreakerLength == 1) {
          this.setOverheadLayer(true, gachatrisLanguage.transText1("pvp_match_point", this.players[matchPointTiebreakerArr[0] - 1].name));
         }
        }
       }
       ////console.log("NEXT SET")
       this.switchLoopAsyncOrSync(false);
       if (this.isEnding) {
        this.isNextSet = false;
       }
      }
     } else if (this.isEnding) {

      /*
           this.endingFrames--;f
           if (this.endingFrames == 1498) musicPlayer.killAllMfx();
           if (this.endingFrames == 1000) {
            let winners = [];
            this.iteratePlayers(player => {
             if (player.winSets >= this.maxSet) winners.push(player.player);
            })
            if (winners.length == 1) {
             let winner = this.players[winners[0] - 1];
             this.setWinnerAnimation(true, {
              src: winner.character.path.winner_screen,
              name: winner.name,
              character: winner.character.details.name
             })
            }
           }

           particleManager.refresh();
           if (this.endingFrames < 1) throw new Error("ended");
          /**/
      this.switchLoopAsyncOrSync(false);
     }
     particleManager.refresh();
    } catch (e) {
     this.gameRunning = false;
     this.syncLoopRunning = false;
     musicPlayer.killAllMfx();
     clearInterval(this.gameRunner);
     particleManager.clear(particleManager.ctx);
     particleManager.particles = [];
     console.log(e.stack);
     gameMenu.switchMenu("set", "end::2::false::true::true::game_over")
     gameMenu.showHideMenu(true);
     mobileButtons.enableButtons(false);

    }
   } while (false);
 }
}
const gameManager = new GachatrisGameManager();

const gameReplayer = new class {
 constructor() {
  this.data = "";
  this.gm = gameManager;
  this.replayRunner;
  this.targetSeek = 5500
  this.differenceSeek = 1000;
  this.saveDetails = {};
 }
 evaluateReplay(data) {
  let isSuccessful = false;
  let evaluateJSON, decode;
  try {
   let encoded = data !== void 0 ? data : this.data;
   decode = atob(encoded);
   evaluateJSON = JSON.parse(decode);
   isSuccessful = true;
  } catch (error) {

   gachatrisLogNotification.error("", "Replayer Error", "", "", error.message)
  } finally {
   if (isSuccessful) {
    this.gm.replayData = evaluateJSON;
    this.gm.startReplay();
   }
  }
 }
 generateReplay() {
  let jsonStringToDecode = JSON.stringify(gameManager.replayData);
  let decode = btoa(jsonStringToDecode);
  this.data = decode;
  return decode;

 }
 seek(frame) {
  try {
   if (typeof frame !== "number") throw 1;
   this.targetSeek = frame;
   this.differenceSeek = 1;
  } catch (j) {

  }
  this.gm.movingReplay = true;
  this.gm.isPaused = true;
  if (this.gm.totalFrames > this.targetSeek) this.gm.AssetsForGame();
  clearInterval(this.gm.gameRunner);
  this.differenceSeek *= (this.targetSeek - this.gm.totalFrames) * 1;
  this.gm.loopLoadAfterReplaySeek();
  this.replayRunner = setInterval(() => {
   for (let _ = 0; _ < this.differenceSeek && this.gm.movingReplay; _++) this.loopSeek();
  }, 1)
 }
 loopSeek() {
  if (this.gm.totalFrames < this.targetSeek) {
   let a = this.gm;
   //////console.log("replay seeking at", `game frame: ${a.totalFrames}, gameDelay: ${a.gameDelay}, keypressFrame: ${a.frames}, loopRafEnabled: ${a.canStartAsyncLoop}`)
   if (a.isAsyncOrSyncLoop) {
    a.syncLoopRunning = true;
    a.loop(true);
   }
   else a.loopRAF(true);
  } else {
   clearInterval(this.replayRunner);
   this.gm.isPaused = false;
   // this.gm.canStartAsyncLoop = !this.gm.isAsyncOrSyncLoop;
   //gachatrisLogNotification.notification("finish");
   this.gm.movingReplay = false;
   this.gm.iteratePlayers(player => {
    player.tryLoadingAssets();
   });
   /// this.gm.loopLoadAfterReplaySeek();
  }
 }

 saveReplayLocal() {
  let q = this.saveDetails;
  let players = [];
  this.gm.iteratePlayers(player => {
   players.push({
    name: player.name,
    char: player.character.current
   });
  })


  let json = {
   name: q.name,
   version: GAME_METADATA.version,
   description: q.description,
   mode: this.gm.mode,
   players: players,
   value: JSON.stringify(this.generateReplay())
  };

  if (!json.name) return;
  gameMenu.showHideLoading(true);

  function save() {
   nativeLDBManager.write("replay", json.name, JSON.stringify(json));
   nativeLDBManager.read("replay", json.name, (r) => {
    ////console.log(r)
    if (typeof r !== "undefined") {
     gachatrisLogNotification.notification("Local Replay Saved Successfully");
    } else {
     gachatrisLogNotification.error("", "Local Replay Saving Error", "", "", "Error saving a replay data to local database");
    }
   })
  }

  nativeLDBManager.read("replay", json.name, (qe) => {
   let query = qe || {}; //JSON.parse(qe || {});
   ////console.log(qe)
   gameMenu.showHideLoading(false);
   if (qe && json.name === query.index) {
    gachatrisLogNotification.error("", "Replay Saving Error", "", "", "A local replay entity with the name you have put for a replay you are trying to save already exists. Please paraphrase the name.");
    return;
   }
   save();
  })
 }

 loadOneSavedReplay(index) {
  gameMenu.showHideLoading(true);
  nativeLDBManager.read("replay", index, (qe) => {
   let error = false;
   let query;
   try {
    //let qw = query.value;
    ////console.log(qe)
    query = JSON.parse(qe.value) || {}; //JSON.parse(qe || {});

    let encoded = query.value.replace(/"/g, "");
    let decode = atob(encoded);
    let evaluateJSON = JSON.parse(decode);
    ////console.log(evaluateJSON)

   } catch (e) {
    error = true;
   }
   gameMenu.showHideLoading(false);
   if (error) {
    gachatrisLogNotification.error("", "Replay Loading Error", "", "", "Unfortunately, the replay data entity you are trying to load is corrupted.");
    return;
   }
   this.evaluateReplay(query.value.replace(/"/g, ""));



  })
 }

 loadSavedReplays() {
  gameMenu.showHideLoading(true);
  nativeLDBManager.readAll("replay", (y) => {
   gameMenu.showHideLoading(false);
   //gameMenu.switchMenu("add", "ui/replay/save")
   if (y.length === 0) {
    gachatrisLogNotification.error("", "Local Replay List Error", "", "", "You do not have saved local replay entities. Try playing a game and then save a replay locally.");
    return;
   }

   let qu = [];
   let c = ["zen", "1v1", "wormhole"];

   for (let t of y) {
    let w = JSON.parse(t.value);

    qu.push({
     "string_raw": w.name,
     "type": "button_replaylist",
     "desc_raw": gachatrisLanguage.transText1("replaycenter_det_list_details", [new Date(t.timestamp).toLocaleString("en-US"), gachatrisLanguage.transText1(`mode_${c[w.mode]}`), w.version]),
     "action": "onclick",
     "onclick": `
      gameReplayer.loadOneSavedReplay(\`${w.name}\`);
     `
    })
   }

   $IH("SAVED-REPLAY-LIST", gameMenu.renderHTML(qu));

   gameMenu.switchMenu("add", "replaylist", "false", "5", "false", "false", "replaycenter_ls_header");
  })
 }
}();

class GachatrisDelayTrigger {
 constructor(delay, func) {
  this.func = func;
  this.delay = delay;
 }
 run() {
  this.delay--;
  if (this.delay == 0) this.func();
 }
}



class GachatrisLoopingDelayTrigger {
 constructor(delay, func) {
  this.func = func;
  this.maxDel = delay;
  this.delay = delay;
  this.isOn = false
 }
 run(amt) {
  this.delay -= this.isOn ? amt : 0;
  if (this.delay <= 0) {
   this.delay = this.maxDel;
   this.func();
  }
 }
}