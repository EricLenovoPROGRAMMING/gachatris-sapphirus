class GachatrisPlayer {
 constructor(player, assets) {
  this.assetsHTML = gachatrisCharacter.PLAYER_TEMPLATE(player);
  this.assetsStyle = gachatrisCharacter.PLAYER_TEMPLATE_STYLE(player);
  this.htmlElements = {};
  this.canvasses = {};
  this.canvasCtx = {};
  this.canCheckBar = {
   right: false,
   left: false
  };
  this.actualCellSize = 1;
  this.level = 1;
  this.modeGoals = {
   type: "off",
   marathon: {
    isOn: false,

   },
   sprint: {
    lines: 40,
    maxLines: 40
   }
  }

  this.gridCellFlashes = [];
  this.isGridFlashEnabled = true;
  
  this.fieldShakeDmgTolerance = 0;

  this.particleLevel = 29 * 1;
  this.piecePositionLast = {
   x: 0,
   y: 0
  };
  this.particlesEnabled = true;
  this.isClearTextShow = true;
  this.pgdDivisor = 1 / 4;
  this.isActive = false;
  this.team = 0;
  this.color = {
   r: 85,
   g: 0,
   b: 170,
   a: 255
  };
  this.defaultColor = {
   r: 85,
   g: 0,
   b: 170,
   a: 255
  };
  this.name = "";
  this.player = player;
  this.keysPressed = 0;
  this.flagsPressed = 0;
  this.touchesPressed = 0;
  this.score = 0;
  this.scoreTemplate = SCORE_TABLE;
  this.keysLast = 0;
  this.life = 4;
  this.canSendGarbage = "attack";
  this.target = "random";
  this.attackType = "tetr.io";
  this.garbageBlocking = "full";
  this.pieces = 0;
  this.combo = 0;
  this.b2b = -1;
  this.b2bLevel = 0;
  this.winSets = 0;

  this.attributesDefense = {
   maxHP: 40332,
   hp: 40332,
   isOn: false,
   hpDamage: 0,
  };
  this.attributesActivity = {
   isLow: new GachatrisLoopSwitch(() => {
    this.attrDelayLoops.lowHP.isOn = true;
   }, () => {
    this.attrDelayLoops.lowHP.isOn = false;
   }),
   isVeryLow: new GachatrisLoopSwitch(() => {

   }, () => {

   }),
   isDanger: new GachatrisLoopSwitch(() => {
    this.attrDelayLoops.danger.isOn = true;
    this.htmlAnimate("HP-WARNING-TEXT", "flicker-anim", "280m", "infinite", "linear");
   }, () => {
    this.htmlAnimate("HP-WARNING-TEXT");
    this.attrDelayLoops.danger.isOn = false;
   }),
   attributes: {
    attack: 100,
    atkTolerance: 100,
    defense: 100,
    lifesteal: 0.59
   }
  };
  this.attrDelayLoops = {
   lowHP: new GachatrisLoopingDelayTrigger(400, () => {
    this.playSound("attr_lowhp");
   }),
   danger: new GachatrisLoopingDelayTrigger(140, () => {
    this.playSound("attr_danger");
   })
  };




  this.character = {
   fieldArr: ["normal", "warning", "frenzy", "win", "lose", "winner_screen", "to_wormhole", "start"],
   path: {},
   load: {},
   activeField: "",
   extCharActive: "",
   details: {
    name: "UNDEFINED"
   },
   current: null
  };


  for (let names of this.character.fieldArr) {
   this.character.load[names] = new Image();
  }

  this.soundsEnabled = true;
  this.canHold = true;

  this.isWarningBlockCount = 0;
  this.isWarning = false;
  this.allAssetsLoaded = true;
  this.assetsLoaded = 0;
  this.assetsLength = null;
  this.isVisible = false;

  this.moveFailed = 0;
  this.playerclassareaSway = {
   on: true,
   x: 0,
   y: 1,
   rot: 0,
   intensity: 0,
   rotIntensity: 0,
   rotTimer: 0,
   translateTimer: 0,
   moveXTimer: 0,
   last: {
    x: 0,
    y: 0,
    rot: 0
   }
  };

  this.grid;
  this.isClutchable = true;
  this.width = 10;
  this.hiddenHeight = 30;
  this.visibleHeight = 20;
  this.height = 0;
  this.clearedLinesDelayed = [];
  this.clearedLinesReady = [];
  this.topoutCoordinates = [];
  this.garbage = [];
  this.isGarbageStackable = false;
  this.garbageStorage = 0;
  this.garbMultiplier = 1;
  this.delayedGarbage = 0;
  this.garbageLimit = 0;
  this.spike = {
   counter: 0,
   time: 0,
  };
  this.frenzy = {
   isOn: false,
   isReady: false,
   phase: 0,
   initialPhase: 4,
   isTurningOff: false,
   timer: 0,
   maxTime: 60 * gachatrisCore.MAIN_FPS,
   timerEnabled: false,
   fails: 0,
   successes: 0,
   boards: 0,
   requireLines: 0,
   isSuccess: false,
   isFail: false
  }
  this.statistics = {};
  this.isTSD = false;
  this.pieceDirty = false;
  this.piecesCount = 0;
  this.ghost = 1;
  this.pieceLast = {
   x: 0,
   y: 0,
  };
  this.spin = {
   line: false,
   zero: false,
   x: 0,
   y: 0,
   normal: 0,
   mini: 0
  };
  this.wallKick;
  this.kickDistance = {
   x: 0,
   y: 0,
  };
  this.isProGachatris = false;
  this.isAllSpin = false;
  this.isOSpin = false;
  this.enable180 = false;
  this.active = null;
  this.initialSystemEnabled = false;
  this.initialSystem = {
   rot: 0,
   hold: 0
  };
  this.activeMatrix;
  this.matrixTemplate;
  this.spinDetection;
  this.spinDetected = {
   normal: false,
   mini: false,
   kickx1y2: false
  };
  this.pieceX;
  this.pieceY;
  this.rot = 0;
  this.pieceXMoveRel = true;
  this.pieceXDirection = 0;
  this.isLanded = false;
  this.delay = {
   lifeReset: 0,
   beforeLine: 0,
   line: 0,
   piece: 0,
   frenzyReady: 200,
   frenzyIn: 150,
   frenzyOut: 150,
   frenzyDel: 47,
  };
  this.delayAdd = {
   lifeReset: 2 * gachatrisCore.MAIN_FPS,
   beforeLine: -7,
   line: -7,
   piece: -8,
   frenzyReady: 200,
   frenzyIn: 150,
   frenzyOut: 150,
   frenzyDel: 47,
  };
  this.wormhole = {
   hp: 1500,
   maxHP: 1500,
   lastHP: 1500,
   damageReceived: 0,
   isHigh: false
  };
  this.isOnlyFrenzy = false;
  this.defaultDelay = {
   lifeReset: 1 * gachatrisCore.MAIN_FPS,
   beforeLine: -7,
   line: -8,
   piece: -8,
   frenzyReady: 200,
   frenzyIn: 150,
   frenzyOut: 150,
   frenzyDel: 47,
  };

  this.lock = {
   delay: 0,
   limit: {
    move: 15,
    rotate: 15,
   },
  };
  this.handlingDelays = {
   autodel: 0,
   autorate: 0
  };
  this.playerSettings = {
   AUTODEL: 65,
   AUTORATE: 8,
   SOFTDROP: 9 / 500,
   PREVIEW: 5,
   GRAVITY: 1 / 500,
   LOCK: 25,
  };
  this.defaultPlayerSettings = {
   AUTODEL: 62,
   AUTORATE: 6,
   SOFTDROP: 29 / 500,
   PREVIEW: 5,
   GRAVITY: 1 / 500,
   LOCK: 250,
  };
  this.customPlayerSettings = {
   AUTODEL: 65,
   AUTORATE: 8,
   SOFTDROP: 19 / 500,
   PREVIEW: 5,
   GRAVITY: 1 / 500,
   LOCK: 250,
  };

  this.bag = [0, 1, 2, 3, 4, 5, 6];
  this.queueBag = [];
  this.previewRNG = new ParkMillerPRNG();
  this.fieldRNG = new ParkMillerPRNG();
  this.holdPiece;
  this.isHeld = false;

  this.isAi = false;
  var h = 66,
   Z = 0,
   T = 7;
  this.ai = {
   main: new SapphirusAI(this.player + "AI"),
   controlImg: {
    x: 0,
    y: 0,
    rot: 0,
    hold: 0
   },
   rotations: [
      [0],
      [
       1, 1, 1
      ],
      [
       2, 2, 2
      ]
    ],

   enableTspin: true,
   grid: [],
   delay: 0,
   delayReset: 50,
   ppsLimit: 289,
   movements: [],
   extraMovements: [],
   x: 0,
   y: 0,
   rot: 0,
   matrix: [],
   heuristicsWeight: {
    aggHeight: -0.0000510066,
    bump: -0.184483,
    lines: 0.1760666,
    holes: -41.0000300044,
    blockade: -0.0666,
    failedTspin: -994.0,
    failedWide: -Infinity,
    b2b: 0.75,
    possibleSpin: 0.202
   },
   failedWide: 0,
   tspinDetector: {
    tslot: [[0, 1], [1, 1], [2, 1], [1, 2]],
    bottom: [[0, 2], [2, 2] /*, [-1, 1], [3, 1]*/ ],
    tuck: [[0, 0, [[1, 0], [2, 0]]], [2, 0, [[0, 0], [1, 0]]]],
   },
   tspinHeight: 5,

   tspinDetected: {
    tslot: [],
    bottom: [],
    tuck: [],

    tLines: [],
    tBlock: [],
    tSlot: [],
    tAvoidColumn: []


   }
  };
 };

 levelHandicapConverter(type, level) {
  if (type == "level") {
   if (this.isMaster) return 200;
   if (level >= 20) return 200;
   if (level >= 15) return (this.level - 12) * 20 / 500;
   if (level >= 7) return (level - 1) * 4 / 512;
   if (level <= 1) return (level - 1) * 4 / 512;
   return (level - 1) * 1 / 500;
  }
  if (type == "lock") {
   if (this.isMaster) return Math.min(Math.max((level - 1) * 5, 0), 900);
   if (level >= 21) return Math.min(Math.max((level - 20) * 5, 0), 500);
   return 0;
  }
 }

 wormholeSetMaxHP(maxHP) {
  this.wormhole.maxHP = this.wormhole.hp = maxHP;
 }

 storeAllMainElementsToObject() {
  this.htmlElements = {};
  for (let y of $ID(`P${this.player}-PLAYERCLASSAREA`).getElementsByTagName("*")) {
   let { id } = y;
   this.htmlElements[id] = y;
  }
 }

 getAsset(id) {
  if (this.htmlElements?.[id]) return this.htmlElements[id];
  return $ID(id);
 }

 setStyle(id, prop, val) {
  return $STYLEELEM(this.getAsset(id), prop, val);
 }

 assetRect(id, prop) {
  return $RECTELEM(this.getAsset(id), prop);
 }

 editAssetHTMLText(id, text) {
  $IHELEM(this.getAsset(id), text);
 }

 setPlayerSettingsWithProGachatris(bool) {
  this.isProGachatris = bool;
  this.playerSettings = this.isProGachatris ? this.customPlayerSettings : this.defaultPlayerSettings;
 }

 playSound(name, intn) {
  if ( /*this.isVisible && /**/ this.soundsEnabled) {
   soundPlayer.playSfx(name, intn || 1);
  }
 }
 setCanvasses() {
  this.canvasses = {
   character: $ID(`P${this.player}-CANVAS-CHARACTER`),
   hold: $ID(`P${this.player}-CANVAS-HOLD`),
   field: $ID(`P${this.player}-CANVAS-FIELD`),
   lineClear: $ID(`P${this.player}-CANVAS-LINECLEAR`),
   piece: $ID(`P${this.player}-CANVAS-PIECE`),
   next: $ID(`P${this.player}-CANVAS-NEXT`),
   queue: $ID(`P${this.player}-CANVAS-QUEUE`),
   extChar: $ID(`P${this.player}-CANVAS-EXTCHAR`),
   fieldFlashes: $ID(`P${this.player}-CANVAS-FLASH-FIELD`),
   frenzyImage: $ID(`P${this.player}-FRENZY-IMAGE`),
  };
  /*this.canvasCtx = {
   character: this.canvasses.character.getContext("2d"),
   hold: this.canvasses.hold.getContext("2d"),
   field: this.canvasses.field.getContext("2d"),
   lineClear: this.canvasses.lineClear.getContext("2d"),
   piece: this.canvasses.piece.getContext("2d"),
   next: this.canvasses.next.getContext("2d"),
   queue: this.canvasses.queue.getContext("2d"),
  };*/
  for (let q = 0, len = Object.keys(this.canvasses); q < len.length; q++) {
   let f = this.canvasses[len[q]];
   /*f.width = 1000;
   f.height = 1000;*/
   this.canvasCtx[len[q]] = f.getContext("2d");
  }
 }
 //TODO: Finish this moveBoardToContainer in next updates.
 moveBoardToContainer(id) {
  if (!$ID(id).hasChildNodes(`P${this.player}-PLAYERCLASSAREA`)) {
   /**$ELEM("gtris-player-cell", function(e) {
    e.innerHTML = this.assetsHTML;
    this.getAsset(`P${this.player}-PLAYERCLASSAREA`).outerHTML.replace(this.assetsHTML, "");
    $ID(id).appendChild(e)
   }.bind(this))

   //$ID(id).append(this.getAsset(`P${this.player}-PLAYERCLASSAREA`));
   var a = `P${this.player}-PERFECTCLEAR1`,
    b = `P${this.player}-PERFECTCLEAR2`;
   $STYLE(a, "animationName", "none");
   $STYLE(b, "animationName", "none");
   $ID(a).offsetHeight;
   $ID(b).offsetHeight;/**/
   $ID(id).append(this.getAsset(`P${this.player}-PLAYERCLASSAREA`));
  }
 };

 setSidePlacements(leftright, o) {
  var op = "";
  switch (o) {
   case true:
    op = "block";
    break;
   case false:
    op = "none";
    break;
  }
  this.setStyle(`P${this.player}-${leftright}P`, "display", op);
 }

 setC4W(type) {
  switch (type) {
   case "add":
    for (var x = 0; x < this.width; x++) {
     if (x < 3 || x > 6) this.grid[x][this.height - 23] = 1;
    };
    break;
   case "prep":
    for (var y = 0; y < this.height; y++) {
     for (var x = 0; x < this.width; x++) {
      if ((x < 3 || x > 6) || (y == this.height - 1 && x !== 5)) this.grid[x][y] = 4;
     };
    }
  }
 }

 setSeed(seed) {
  this.previewRNG.seed = seed;
  this.fieldRNG.seed = seed;
 };
 clearCanvas(ctx) {
  this.canvasCtx[ctx].clearRect(
   0,
   0,
   this.canvasCtx[ctx].canvas.width,
   this.canvasCtx[ctx].canvas.height
  )
 };

 cnvSize(cnv, x, y) {
  this.canvasses[cnv].width = x;
  this.canvasses[cnv].height = y;
 };

 resize(cell_size, boardSize, actual, orientation) {
  this.isVisible = orientation == "landscape" || gameManager.activePlayer + 1 == this.player;

  this.setStyle(`P${this.player}-PLAYERCLASSAREA`, "display", (this.player == gameManager.activePlayer + 1 || orientation == "landscape") ? "flex" : "none");
  this.cellSize = cell_size;
  this.actualCellSize = actual;
  this.cnvSize(`frenzyImage`, 1280, 1280);
  this.clearCanvas("frenzyImage");
  this.canvasCtx.frenzyImage.drawImage(gameManager.images.core.frenzy, 0, 0, 1280, 1280);
  var pcPadding = this.cellSize * ((this.hiddenHeight / 4) + 1);
  this.setStyle(`P${this.player}-PLAYERCLASSAREA`, `fontSize`, `${this.cellSize}px`);
  this.setStyle(`P${this.player}-LP`, `width`, `${this.cellSize * 5}px`);
  this.setStyle(`P${this.player}-HOLDP`, `height`, `${this.cellSize * 1}px`);
  this.setStyle(`P${this.player}-CANVAS-HOLD`, `height`, `${this.cellSize * 3}px`);
  this.cnvSize(`hold`, actual * 5, actual * 3);
  this.setStyle(`P${this.player}-FIELD`, `width`, `${this.cellSize * this.width}px`);
  this.setStyle(`P${this.player}-FIELD`, `height`, `${this.cellSize * (this.visibleHeight + 0.4)}px`);
  for (let b of ["FRENZY-COLOR", "FRENZY-FRAME"]) {
   this.setStyle(`P${this.player}-${b}`, `width`, `${this.cellSize * this.width}px`);
   this.setStyle(`P${this.player}-${b}`, `height`, `${this.cellSize * (this.visibleHeight + 0.4)}px`);
  }
  this.setStyle(`P${this.player}-FRENZY-IMAGE`, `width`, `${this.cellSize * this.visibleHeight * 1.5}px`);
  this.setStyle(`P${this.player}-FRENZY-IMAGE`, `height`, `${this.cellSize * (this.visibleHeight * 1.5)}px`);
  this.setStyle(`P${this.player}-FRENZY-TIMER`, "fontSize", `${this.cellSize * 1.8}px`);
  this.setStyle(`P${this.player}-CANVAS-FIELD`, `width`, `${this.cellSize * this.width}px`);
  this.setStyle(`P${this.player}-CANVAS-FIELD`, `height`, `${this.cellSize * (this.visibleHeight + 0.4)}px`);
  this.setStyle(`P${this.player}-CANVAS-FLASH-FIELD`, `width`, `${this.cellSize * this.width}px`);
  this.setStyle(`P${this.player}-CANVAS-FLASH-FIELD`, `height`, `${this.cellSize * (this.visibleHeight + 0.4)}px`);
  this.setStyle(`P${this.player}-CANVAS-CHARACTER`, `width`, `${this.cellSize * this.width}px`);
  this.setStyle(`P${this.player}-CANVAS-CHARACTER`, `height`, `${this.cellSize * (this.visibleHeight + 0.4)}px`);
  this.cnvSize(`field`, actual * this.width, actual * (this.visibleHeight + 0.4));
  this.cnvSize(`fieldFlashes`, actual * this.width, actual * (this.visibleHeight + 0.4));
  this.setStyle(`P${this.player}-CANVAS-LINECLEAR`, `width`, `${this.cellSize * this.width}px`);
  this.setStyle(`P${this.player}-CANVAS-LINECLEAR`, `height`, `${this.cellSize * (this.visibleHeight + 0.4)}px`);
  this.cnvSize(`lineClear`, actual * this.width, actual * (this.visibleHeight + 0.4));
  this.setStyle(`P${this.player}-CANVAS-PIECE`, `width`, `${this.cellSize * this.width}px`);
  this.setStyle(`P${this.player}-CANVAS-PIECE`, `height`, `${this.cellSize * (this.visibleHeight + 0.4)}px`);
  this.cnvSize(`piece`, actual * this.width, actual * (this.visibleHeight + 0.4))
  this.setStyle(`P${this.player}-RP`, `width`, `${this.cellSize * 5}px`);
  this.setStyle(`P${this.player}-NEXTP`, `height`, `${this.cellSize * 1}px`);
  this.cnvSize(`next`, actual * 5, actual * 3);
  this.setStyle(`P${this.player}-CANVAS-NEXT`, `width`, `${this.cellSize * 5}px`);
  this.setStyle(`P${this.player}-CANVAS-NEXT`, `height`, `${this.cellSize * 3}px`);
  this.cnvSize(`queue`, actual * 5, actual * 11 * 3);
  this.setStyle(`P${this.player}-CANVAS-QUEUE`, `width`, `${(this.cellSize * 5) * (1 * 0.5)}px`);
  this.setStyle(`P${this.player}-CANVAS-QUEUE`, `height`, `${(this.cellSize * 3) * (11 * 0.5)}px`);
  this.setStyle(`P${this.player}-CLEARTEXTS`, `left`, `${this.cellSize * (-1 * (this.width / 2))}px`);
  this.setStyle(`P${this.player}-CLEARTEXTS`, `top`, `${this.cellSize * 4}px`);
  this.setStyle(`P${this.player}-CLEARTEXTS`, `width`, `${this.cellSize * this.width}px`);
  this.setStyle(`P${this.player}-CLEARTEXTS`, `height`, `${this.cellSize * 4}px`);
  for (let d of ["fontSize", "height"]) {
   this.setStyle(`P${this.player}-CLEARTEXT-REGULAR`, d, `${this.cellSize * 1.2}px`);
   this.setStyle(`P${this.player}-CLEARTEXT-SPIN`, d, `${this.cellSize * 0.5}px`);
   this.setStyle(`P${this.player}-CLEARTEXT-B2B`, d, `${this.cellSize * 0.7}px`);
   this.setStyle(`P${this.player}-CLEARTEXT-REN`, d, `${this.cellSize * 1.1}px`);
   this.setStyle(`P${this.player}-CLEARTEXT-SPIKE`, d, `${this.cellSize * 1.2}px`);
  }

  for (let side of ["RIGHT", "LEFT"]) {
   this.setStyle(`P${this.player}-METERBAR-CONTAINER-${side}`, `width`, `${this.cellSize * 0.5}px`);
   this.setStyle(`P${this.player}-METERBAR-CONTAINER-${side}`, `height`, `${this.cellSize * (this.visibleHeight + 0.4)}px`);
   this.setStyle(`P${this.player}-METERBAR-${side}`, `width`, `${this.cellSize * 0.5}px`);
   this.setStyle(`P${this.player}-METERBAR-${side}`, `height`, `${this.cellSize * (this.visibleHeight + 0.4)}px`);
  }
  this.setStyle(`P${this.player}-METERBAR-BEHIND-RIGHT`, `width`, `${this.cellSize * 0.5}px`);
  this.setStyle(`P${this.player}-METERBAR-BEHIND-RIGHT`, `height`, `${this.cellSize * (this.visibleHeight + 0.4)}px`);

  this.setStyle(`P${this.player}-SCORE`, `top`, `${this.cellSize * (this.visibleHeight + 0.8)}px`);

  // this.setStyle(`P${this.player}-PCDIV`, `paddingTop`, `${(this.cellSize * 8) + ((gameManager.viewH / 2) - pcPadding)}px`);
  this.setStyle(`P${this.player}-CANVAS-CHARACTER`, `transform`, `rotateY(${this.player % 2 == 0 ? "180" : "0"}deg)`);
  var isLeftBar = this.canCheckBar.left ? 0.5 : 0,
   isRightBar = this.canCheckBar.right ? 0.5 : 0;
  this.setStyle(`P${this.player}-PLAYERCLASSAREA`, 'width', `${this.cellSize * (11.5 + this.width + isLeftBar + isRightBar)}px`);
  this.setStyle(`P${this.player}-PLAYERCLASSAREA`, 'height', `${this.cellSize * (0.4 + this.visibleHeight)}px`);
  this.setStyle(`P${this.player}-BODY`, "height", `${(this.visibleHeight + 1) * this.cellSize}px`);
  this.setStyle(`P${this.player}-BODY-SWAY`, "height", `${(this.visibleHeight + 1) * this.cellSize}px`);
  this.setStyle(`P${this.player}-BODY-SHAKE`, "height", `${(this.visibleHeight + 1) * this.cellSize}px`);
  //  this.setStyle(`P${this.player}-BODY-SWAY`, 'width', `${this.cellSize * (this.width)}px`);

  this.setStyle(`P${this.player}-STATISTICS-BOX`, "width", `${(10 * 9) * this.cellSize}px`);
  this.setStyle(`P${this.player}-STATISTICS-BOX`, "right", `${(((this.width * 2) * this.cellSize)) - (this.cellSize * ((this.width * 0) + (this.width / (2.1 + isLeftBar + isRightBar))))}px`);
  for (var b = 1; b <= 4; b++) {
   this.setStyle(`P${this.player}-STATISTICS-NAME-${b}`, "fontSize", `${this.cellSize * 0.6}px`);
   this.setStyle(`P${this.player}-STATISTICS-VALUE-${b}`, "fontSize", `${this.cellSize * 1.6}px`);
  }
  this.setStyle(`P${this.player}-STATISTICS-TIMER`, "fontSize", `${this.cellSize * 0.8}px`);

  this.setStyle(`P${this.player}-CANVAS-EXTCHAR-DIV`, 'width', `${this.cellSize * (11.5 + this.width)}px`);
  this.setStyle(`P${this.player}-CANVAS-EXTCHAR-DIV`, 'height', `${this.cellSize * (0.4 + this.visibleHeight)}px`);

  this.setStyle(`P${this.player}-EXTERNAL-CHARFRAME`, 'width', `${this.cellSize * 21}px`);
  this.setStyle(`P${this.player}-EXTERNAL-CHARFRAME`, 'height', `${this.cellSize * 21}px`);

  this.setStyle(`P${this.player}-EXTERNAL-TEXT`, 'fontSize', `${this.cellSize * 3}px`);
  this.setStyle(`P${this.player}-EXTERNAL-TEXT`, 'top', `${this.cellSize * 2}px`);
  this.setStyle(`P${this.player}-EXTERNAL-CHARFRAME`, 'top', `${this.cellSize * 0}px`);
  this.setStyle(`P${this.player}-CANVAS-EXTCHAR`, `transform`, `rotateY(${this.player % 2 == 0 ? "180" : "0"}deg)`);

  this.setStyle(`P${this.player}-PLAYER-NAMEPLATE`, 'width', `${this.cellSize * (1 + this.width)}px`);
  this.setStyle(`P${this.player}-PLAYER-NAMEPLATE`, 'height', `${this.cellSize * (1.1)}px`);
  this.setStyle(`P${this.player}-PLAYER-NAMEPLATE`, `top`, `${this.cellSize * (this.visibleHeight + 2)}px`);
  this.setStyle(`P${this.player}-HPBAR-DIV`, `width`, `${this.cellSize * 20}px`);
  this.setStyle(`P${this.player}-HPBAR-DIV`, `height`, `${this.cellSize * 1.6}px`);
  this.setStyle(`P${this.player}-HP-TEXT-DIV`, `width`, `${this.cellSize * 2}px`);
  this.setStyle(`P${this.player}-HP-TEXT-DIV`, `height`, `${this.cellSize * 1.6}px`);
  this.setStyle(`P${this.player}-HPBAR-DIV`, `top`, `${this.cellSize * -2.2}px`);


  this.drawExternalCharacter();

  for (let side of ["", "-ACTIVE", "-BEHIND", "-CONTAINER"]) {
   this.setStyle(`P${this.player}-HP-METER${side}`, `width`, `${this.cellSize * 18}px`);
   this.setStyle(`P${this.player}-HP-METER${side}`, `height`, `${this.cellSize * 1.6}px`);
  }
 };

 checkBarStatisticsPos() {
  var isLeftBar = this.canCheckBar.left ? 0.5 : 0,
   isRightBar = this.canCheckBar.right ? 0.5 : 0;
  this.setStyle(`P${this.player}-STATISTICS-BOX`, "width", `${(10 + 9) * this.cellSize}px`);
  this.setStyle(`P${this.player}-STATISTICS-BOX`, "right", `${(((this.width * 2) * this.cellSize)) - (this.cellSize * (this.width / (2.1 + isLeftBar + isRightBar)))}px`);
 }
 updateTimer(i) {
  this.editAssetHTMLText(`P${this.player}-STATISTICS-TIMER`, GachatrisGameManager.toTimerString(i));
 }
 setStatisticsText(type, order, value) {
  if (type == "name") this.editAssetHTMLText(`P${this.player}-STATISTICS-NAME-${order}`, value);
  if (type == "val") this.editAssetHTMLText(`P${this.player}-STATISTICS-VALUE-${order}`, value);
 }
 checkRightBar(change) {
  if (this.canCheckBar.right == "garbage") {
   for (let mRight of ["RIGHT", "BEHIND-RIGHT"]) this.setStyle(`P${this.player}-METERBAR-${mRight}`, `marginTop`, `${Math.max(0,(this.cellSize*(this.visibleHeight + 0.4)) - (this.cellSize * this.garbage.length))}px`);
  } else if (this.canCheckBar.right == "custom") {
   for (let mRight of ["RIGHT", "BEHIND-RIGHT"]) this.setStyle(`P${this.player}-METERBAR-${mRight}`, `marginTop`, `${Math.max(0,(this.cellSize*(this.visibleHeight + 0.4)) - (this.cellSize * (change || 0) * (this.visibleHeight + 0.4)))}px`);
  }
 }
 checkLeftBar(change, color) {
  if (this.canCheckBar.left == "frenzy") {
   this.setStyle(`P${this.player}-METERBAR-LEFT`, `marginTop`, `${Math.max(0,(((0.4 + this.visibleHeight) * this.cellSize) - (this.frenzy.timer/this.frenzy.maxTime) * (0.4 +this.visibleHeight) * this.cellSize))}px`);
  } else if (this.canCheckBar.left == "custom") {
   this.setStyle(`P${this.player}-METERBAR-LEFT`, `marginTop`, `${Math.max(0,(this.cellSize*(this.visibleHeight + 0.4)) - (this.cellSize * (change || 0) * (this.visibleHeight + 0.4)))}px`);
   if (color !== void 0) {
    this.setStyle(`P${this.player}-METERBAR-LEFT`, "background", typeof color === "object" ? `rgba(${color.r},${color.g},${color.b},${color.a})` : color);
   }
   else this.setStyle(`P${this.player}-METERBAR-LEFT`, "background", "#a00");
  } else if (change === "reset") {
   this.setStyle(`P${this.player}-METERBAR-LEFT`, `marginTop`, `${((0.4 + this.visibleHeight) * 94949)}px`);
  }
 }
 openRightBar(bool, color) {
  this.canCheckBar.right = bool;
  this.setStyle(`P${this.player}-METERBAR-CONTAINER-RIGHT`, "display", (typeof bool !== "undefined" || bool !== void 0) && ["garbage", "custom"].indexOf(bool) !== -1 ? 'block' : 'none');
  switch (bool) {
   case "garbage":
    this.checkRightBar();
    break;
   case "custom":
    this.checkRightBar();
    break;
   default:
    this.canCheckBar.right = false;
    break;
  }
  if (color !== void 0) {
   this.setStyle(`P${this.player}-METERBAR-RIGHT`, "background", typeof color === "object" ? `rgba(${color.r},${color.g},${color.b},${color.a})` : color);
  }
  else this.setStyle(`P${this.player}-METERBAR-RIGHT`, "background", "#a00");
  this.checkBarStatisticsPos();
 };
 openLeftBar(bool) {
  this.canCheckBar.left = bool;
  this.setStyle(`P${this.player}-METERBAR-CONTAINER-LEFT`, "display", (typeof bool !== "undefined" || bool !== void 0) && ["frenzy", "custom"].indexOf(bool) !== -1 ? 'block' : 'none');
  switch (bool) {
   case "frenzy":
    this.checkLeftBar("reset");
    break;
   case "custom":
    this.checkLeftBar();
    break;
   default:
    this.checkLeftBar("reset");
    this.canCheckBar.left = false;
    break;
  }
  this.checkBarStatisticsPos();
 };
 checkScore() {
  this.editAssetHTMLText(`P${this.player}-SCORE`, ~~(this.score));
 }
 setMaxHP(num) {
  this.attributesDefense.hp = num;
  this.attributesDefense.maxHP = num;
  this.checkHPBar();
 }
 addHPCountText(add) {
  if ((add !== 0) && this.isActive && this.isVisible) $ELEM("gtris-damage-text", (a) => {
   let heal = "color: #33F",
    atk = "color: #F44";
   let de = this.assetRect(`P${this.player}-HPBAR-DIV`, "x"),
    df = this.assetRect(`P${this.player}-HPBAR-DIV`, "y");
   a.innerHTML = `<gtris-damage-text-color style="${add < 0 ? atk : heal}">${add}</gtris-damage-text-color>`;
   a.style.fontSize = `2em`;
   a.style.opacity = `0%`;
   a.style.position = "absolute";
   a.style.transform = `translateX(${de + (4 * this.cellSize)}px) translateY(${df + (1 * this.cellSize)}px)`;
   a.style.animation = `damage-text-animation 900ms 1 ease-out`;
   setTimeout(() => {
    try {
     a.parentNode.removeChild(a);
    } catch (e) {};
   }, 1000);
   $ID("particleElementDiv").appendChild(a);
  });
 }

 addHPBar(num, q) {
  let isAlreadyFull = false;
  if (this.attributesDefense.hp < this.attributesDefense.maxHP) {
   isAlreadyFull = true
  }
  this.attributesDefense.hp += num;
  if (this.attributesDefense.hp < this.attributesDefense.maxHP) {
   isAlreadyFull = true;
  }
  if (isAlreadyFull) {
   this.addHPCountText(num);
  }
  if (this.attributesDefense.hp > this.attributesDefense.maxHP) {
   this.attributesDefense.hp = this.attributesDefense.maxHP;
  }
  if (this.attributesDefense.hp < 0) {
   this.attributesDefense.hp = 0;
  }

  this.checkHPBar();
  this.checkHPBarDamage();
  this.checkHPIfLow();
 }
 checkHPIfLow(stop) {
  this.attributesActivity.isLow.toggle(!stop && this.attributesDefense.hp / this.attributesDefense.maxHP < 0.23);
  this.attributesActivity.isVeryLow.toggle(!stop && this.attributesDefense.hp / this.attributesDefense.maxHP < 0.10);
 }

 checkHPIfDanger(stop) {
  this.attributesActivity.isDanger.toggle(!stop && this.attributesDefense.hp < this.attributesDefense.hpDamage);
 }

 openHPBar(bool) {
  this.setStyle(`P${this.player}-HPBAR-DIV`, "display", (bool && bool !== void 0) ? 'flex' : 'none');
 };
 checkHPBar(change) {
  for (let side of ["-BEHIND", ""]) {
   this.setStyle(`P${this.player}-HP-METER${side}`, `right`, `${(Math.min(18 * this.cellSize, ((this.attributesDefense.maxHP - this.attributesDefense.hp) / this.attributesDefense.maxHP) * 18 * this.cellSize))}px`);
  }
  this.editAssetHTMLText(`P${this.player}-HP-NUM-TEXT`, Math.max(this.attributesDefense.hp, 0));
  this.checkHPBarDamage();
 }

 checkHPBarDamage() {

  let a = 0;
  for (let b = 0, c = this.garbage.length; b < c; b++) {
   a += this.garbage[b].damage;
  }

  this.attributesDefense.hpDamage = a;
  this.setStyle(`P${this.player}-HP-METER-ACTIVE`, `right`, `${Math.max(0, Math.min(18 * this.cellSize, ((this.attributesDefense.hpDamage) / this.attributesDefense.maxHP) * 18 * this.cellSize))}px`);
  //this.editAssetHTMLText(`P${this.player}-HP-NUM-TEXT`, Math.max(this.attributesDefense.hp, 0));
  this.checkHPIfDanger();
 }

 setBodyColor(red, green, blue, alpha, apply) {
  var cnbrdr = $CLASS(`P${this.player}-BORDER-CLASS`),
   cnbg = $CLASS(`P${this.player}-BACKGROUND-CLASS`);
  if (apply == "default") {
   let g = JSON.stringify(this.defaultColor);
   this.color = JSON.parse(g);
  }
  var clr = {
   r: red !== void 0 ? red : this.color.r,
   g: red !== void 0 ? green : this.color.g,
   b: red !== void 0 ? blue : this.color.b,
   a: red !== void 0 ? alpha : this.color.a,
  };
  if (apply == "set") {
   this.color = clr;
  }

  for (let a of cnbrdr) {
   a.style.borderColor = `rgba(${Math.max(0, Math.min(clr.r, 255))},${Math.max(0, Math.min(clr.g, 255))},${Math.max(0, Math.min(clr.b, 255))},${Math.max(0, Math.min(clr.a, 1))})`;
  }
  for (let a of cnbg) {
   a.style.backgroundColor = `rgba(${Math.max(0, Math.min(clr.r, 255))},${Math.max(0, Math.min(clr.g, 255))},${Math.max(0, Math.min(clr.b, 255))},${Math.max(0, Math.min(clr.a, 1))})`;
  }
  var nameplate = `P${this.player}-PLAYER-NAMEPLATE`;

  this.setStyle(nameplate, "backgroundColor", `rgba(${Math.max(0, Math.min(clr.r - 140, 255))},${Math.max(0, Math.min(clr.g - 140, 255))},${Math.max(0, Math.min(clr.b - 140, 255))},${Math.max(0, Math.min(clr.a, 1))})`);
  this.setStyle(nameplate, "borderColor", `rgba(${Math.max(0, Math.min(clr.r, 255))},${Math.max(0, Math.min(clr.g, 255))},${Math.max(0, Math.min(clr.b, 255))},${Math.max(0, Math.min(clr.a, 1))})`);
  var isDark = false,
   inPlace = $CLASS(`P${this.player}-TEXT-INPLACE`);
  for (let r of ["r", "g", "b"]) {
   if (clr[r] > 225) isDark = true;
  }
  for (let e of inPlace) {
   e.style.color = isDark ? "#000" : "#FFF";
  }
 }

 setNameplateName(name) {
  var _name = name || "No Name";
  this.editAssetHTMLText(`P${this.player}-NAMEPLATE-NAME`, _name);
 }

 openLoseWarning(bool) {
  var cnbrdr = $CLASS(`P${this.player}-BORDER-CLASS`),
   cnbg = $CLASS(`P${this.player}-BACKGROUND-CLASS`),
   a = {
    a: bool ? "warning-background" : "none",
    b: bool ? "warning-border" : "none"
   };
  for (let e of cnbrdr) {
   $ID(e.id).offsetHeight;
   $STYLE(e.id, "animationName", a.b);
   $STYLE(e.id, "animationDuration", `150ms`);
   $STYLE(e.id, "animationIterationCount", bool ? "infinite" : 1);
   $STYLE(e.id, "animationTimingFunction", "linear");
  }
  for (let e of cnbg) {
   $ID(e.id).offsetHeight;
   $STYLE(e.id, "animationName", a.a);
   $STYLE(e.id, "animationDuration", `150ms`);
   $STYLE(e.id, "animationIterationCount", bool ? "infinite" : 1);
   $STYLE(e.id, "animationTimingFunction", "linear");
  }
 }

 setFrenzyColor(hex) {
  this.setStyle(`P${this.player}-FRENZY-COLOR`, `background`, hex);
 }

 openFrenzy(bool) {
  var cnbrdr = $CLASS(`P${this.player}-BORDER-CLASS`),
   _cnbg = $CLASS(`P${this.player}-BACKGROUND-CLASS`),
   frbg = `P${this.player}-FRENZY-COLOR`,
   _frbg = this.getAsset(frbg),
   a = {
    a: bool ? "frenzy-background" : "none",
    b: bool ? "frenzy-border" : "none",
   },
   cnbg = [..._cnbg, this.getAsset(`P${this.player}-METERBAR-LEFT`)];
  $ID(frbg).offsetHeight;
  $STYLEELEM(_frbg, "animationName", "none");
  $STYLEELEM(_frbg, "animationDuration", `1200ms`);
  $STYLEELEM(_frbg, "animationIterationCount", "1");
  $STYLEELEM(_frbg, "animationTimingFunction", "linear");
  if (bool === "wormhole") {
   for (let e of cnbrdr) {
    $ID(e.id).offsetHeight;
    $STYLE(e.id, "animationName", a.b);
    $STYLE(e.id, "animationDuration", `2400ms`);
    $STYLE(e.id, "animationIterationCount", "infinite");
    $STYLE(e.id, "animationTimingFunction", "linear");
   }
   for (let e of cnbg) {
    $ID(e.id).offsetHeight;
    $STYLE(e.id, "animationName", a.a);
    $STYLE(e.id, "animationDuration", `2400ms`);
    $STYLE(e.id, "animationIterationCount", "infinite");
    $STYLE(e.id, "animationTimingFunction", "linear");
   }

   this.getAsset(frbg).offsetHeight;
   $STYLEELEM(_frbg, "animationName", "wormhole-rainbow");
   $STYLEELEM(_frbg, "animationDuration", `1200ms`);
   $STYLEELEM(_frbg, "animationIterationCount", "infinite");
   $STYLEELEM(_frbg, "animationTimingFunction", "linear");

   var frame = `P${this.player}-FRENZY-FRAME`,
    img = `P${this.player}-FRENZY-IMAGE`,
    o = "frenzy-spin";
   $STYLE(img, "animationName", o);
   $STYLE(frame, "display", "flex");
   this.setFrenzySpinSpeed(400);
   return;
  }
  for (let e of cnbrdr) {
   $ID(e.id).offsetHeight;
   $STYLE(e.id, "animationName", a.b);
   $STYLE(e.id, "animationDuration", `2400ms`);
   $STYLE(e.id, "animationIterationCount", bool ? "infinite" : 1);
   $STYLE(e.id, "animationTimingFunction", "linear");
  }
  for (let e of cnbg) {
   $ID(e.id).offsetHeight;
   $STYLE(e.id, "animationName", a.a);
   $STYLE(e.id, "animationDuration", `2400ms`);
   $STYLE(e.id, "animationIterationCount", bool ? "infinite" : 1);
   $STYLE(e.id, "animationTimingFunction", "linear");
  }

  var frame = `P${this.player}-FRENZY-FRAME`,
   img = `P${this.player}-FRENZY-IMAGE`,
   o = bool ? "frenzy-spin" : "none";
  $STYLE(img, "animationName", o);
  $STYLE(frame, "display", bool ? "flex" : "none");
  this.setFrenzySpinSpeed();
  this.setFrenzyColor("#111");
 }

 setFrenzySpinSpeed(speed) {
  var _ = `P${this.player}-FRENZY-IMAGE`,
   ms = speed || 2400;
  $STYLE(_, "animationDuration", `${ms}ms`);
 }

 addGarbageArr(count, x, atk, sender) {
  var r = Math.floor(x * this.width);
  for (var c = 0; c < count; c++) {
   this.garbage.push({
    row: r,
    frame: gameManager.frames + this.garbageDelay,
    damage: ~~(Math.round(atk.atk + (this.fieldRNG.next() * atk.tol)) * (150 / (150 + this.attributesActivity.attributes.defense))),
    sender: sender
   });
  }
  this.checkRightBar();
  if (this.attributesDefense.isOn) this.checkHPBarDamage();
  this.checkWarning();
 };
 addGarbageField() {
  var a = this.garbageLimit !== 0 ? this.garbageLimit : (Infinity),
   b = 0,
   add = 0,
   playerLifesteal = {},
   e = this.garbage.filter((i) => i.frame <= gameManager.frames);
  while (e.length > 0) {
   var r = e.shift();

   if (this.attributesDefense.isOn) {
    add -= r.damage;

    if (playerLifesteal?.[r.sender]) playerLifesteal[r.sender] += r.damage;
    else playerLifesteal[r.sender] = r.damage;
   }

   this.garbage.shift();
   b++;
   for (var x = 0; x < this.width; x++) {
    for (var y = 0; y < this.height; y++) {
     this.grid[x][y] = this.grid[x][y + 1];
    }
   }
   for (var x = 0; x < this.width; x++) {
    this.grid[x][this.height - 1] = 1;
   }
   this.grid[r.row][this.height - 1] = 0;
   if (a <= b) break;
  }
  if (b > 0) {
   this.drawGrid();
   this.isGarbageStackable = false;
   if (this.attributesDefense.isOn) {
    this.addHPBar(add);

    gameManager.iteratePlayers(player => {
     if (playerLifesteal?.[player.player]) player.addHPBar(~~(playerLifesteal[player.player] * player.attributesActivity.attributes.lifesteal));
    });
   }

   if (this.attributesDefense.hp <= 0) {
    this.isLose("Wrecked out", true);
   }

   if (this.canCheckBar.right == "garbage") this.checkRightBar();
   this.playSound("garbage")
  }
 }
 drawCell(ctx, x, y, color, row) {
  x = x * this.actualCellSize;
  x = ~~x;
  y = y * this.actualCellSize; //- (2 * this.actualCellSize);
  if (this.isVisible) this.canvasCtx[ctx].drawImage(
   gachatrisCore.GACHATRIS_CANVAS.skin,
   color * this.actualCellSize,
   row * this.actualCellSize,
   this.actualCellSize,
   this.actualCellSize,
   x,
   y,
   this.actualCellSize,
   this.actualCellSize,
  );
 };

 drawMatrix(ctx, matrix, cx, cy, color, row) {
  if (!gameManager.movingReplay)
   for (var x = 0, len = matrix.length; x < len; x++) {
    for (var y = 0, wid = matrix[x].length; y < wid; y++) {
     if (matrix[x][y])
      this.drawCell(ctx, x + cx, y + cy, color !== void 0 ? color : matrix[x][y], row)
    };
   };
 };

 loadCharacter(character) {
  //TODO settings to be made.
  character = character || "0-0";
  if (this.character.current !== character) {
   this.character.current = character;
   this.allAssetsLoaded = false;
   this.assetsLoaded = 0;
   let sp = this.character.current.split("-");
   let a = gachatrisCharacter.characters[sp[0]],
    b = gachatrisCharacter.characterDetails[a].versions[sp[1]];
   this.character.directory = `assets/characters/${a}/${b}`;
   //this.character.directory = this.directory;
   let charDet = gachatrisLanguage.characterText(a);
   this.character.details = {
    name: `${charDet.surname}, ${charDet.first_name} ${charDet.middle_name}`
   };
  };
 };
 tryLoadingAssets() {
  if (!this.allAssetsLoaded) {
   for (let names of this.character.fieldArr) {
    let w = `${this.character.directory}/${names}.png`;
    this.character.path[names] = w;
    cacheManager.loadCache(w, (fname) => {
     let o = new Image();
     o.src = fname;
     return o;
    }, "characterimage", (fui => {
     this.character.load[names] = fui.value;
     if (cacheManager.checkLoad(this.character.path[names])) {
      this.assetsLoaded++;
      this.checkLoaded();
     } else {
      for (let e of ["load", "error"])
       this.character.load[names].addEventListener(e, () => {
        this.assetsLoaded++;
        if (e === "error") this.character.load[names] = gameManager.images.core.icon;
        this.checkLoaded();
        cacheManager.boolLoad(this.character.path[names], true);
       }, { once: true });
     }
    }));
    //this.character.load[names].src = this.character.path[names];
    this.assetsLength = Object.keys(this.character.load).length;
   }


   for (let names of this.character.fieldArr) {

   };
  }
 }
 checkLoaded() {
  this.allAssetsLoaded = this.assetsLoaded >= this.assetsLength;
 }
 setFieldImage(name, isNotDraw) {
  this.character.activeField = name;
  /*if (!isNotDraw)/* */
  this.drawCharacterFieldImage();
 };
 drawCharacterFieldImage() {
  if (!gameManager.movingReplay) {
   let n = this.canvasses.character;
   this.clearCanvas("character");
   /*this.canvasCtx.character.drawImage(
    this.character.load[this.character.activeField],
    0,
    0,
    300,
    612,
    0,
    0,
    n.width,
    n.height
   );*//* */
  }
 }
 setExternalCharacter(type) {
  var _ = `P${this.player}-EXTERNAL-CHARFRAME`,
   $ = `P${this.player}-EXTERNAL-TEXT`;
  this.character.extCharActive = "";
  for (const e of [_, $]) {
   $STYLE(e, "opacity", "100%");
   $STYLE(e, "animationName", "none");
   $STYLE(e, "animationDuration", `400ms`);
   $STYLE(e, "animationIterationCount", "1");
   $STYLE(e, "animationTimingFunction", "ease-out");
   $ID(e).offsetHeight;
  }

  switch (type) {
   default:
    for (const r of [_, $]) $STYLE(r, "opacity", "0%");
    break;
   case "win":
    for (const e of [_, $]) {
     $STYLE(e, "opacity", "100%");
     $STYLE(e, "animationName", {
      [_]: "external-up",
      [$]: "external-down"
     } [e]);
     $STYLE(e, "animationDuration", `400ms`);
     $STYLE(e, "animationIterationCount", "1");
     $STYLE(e, "animationTimingFunction", "ease-out");
     $ID(e).offsetHeight;
    }
    this.character.extCharActive = "win";
    break;
   case "lose":
    for (const e of [_, $]) {
     $STYLE(e, "opacity", "100%");
     $STYLE(e, "animationName", {
      [_]: "external-down",
      [$]: "external-up"
     } [e]);
     $STYLE(e, "animationDuration", `400ms`);
     $STYLE(e, "animationIterationCount", "1");
     $STYLE(e, "animationTimingFunction", "ease-out");
     $ID(e).offsetHeight;
    }
    this.character.extCharActive = "lose";
    break;
   case "frenzy":
    for (const e of [_, $]) {
     $STYLE(e, "opacity", "0%");
     $STYLE(e, "animationName", {
      [_]: "frenzy-action-character",
      [$]: "frenzy-action-text"
     } [e]);
     $STYLE(e, "animationDuration", `700ms`);
     $STYLE(e, "animationIterationCount", "1");
     $STYLE(e, "animationTimingFunction", "ease-out");
     $ID(e).offsetHeight;
    }
    this.character.extCharActive = "frenzy";
    break;

   case "start":
    $STYLE(_, "opacity", "0%");
    $STYLE($, "opacity", "0%");
    $STYLE(_, "animationName", `start-action-character${(this.player % 2) + 1}`);
    $STYLE(_, "animationDuration", `1200ms`);
    $STYLE(_, "animationIterationCount", "1");
    $STYLE(_, "animationTimingFunction", "ease-out");
    //  $STYLE(_, "animationDirection", "reverse");
    $ID(_).offsetHeight;
    this.character.extCharActive = "start";
    break;

   case "wormhole":
    for (const e of [_, $]) {
     $STYLE(e, "opacity", "0%");
     $STYLE(e, "animationName", {
      [_]: "frenzy-action-character",
      [$]: "frenzy-action-text"
     } [e]);
     $STYLE(e, "animationDuration", `700ms`);
     $STYLE(e, "animationIterationCount", "1");
     $STYLE(e, "animationTimingFunction", "ease-out");
     $ID(e).offsetHeight;
    }
    this.character.extCharActive = "to_wormhole";
    break;
  }
  this.drawExternalCharacter();
 };
 drawExternalCharacter() {
  if (!gameManager.movingReplay) {
   let n = this.canvasses.extChar;
   this.clearCanvas("extChar");
   if (this.character.extCharActive !== "") this.canvasCtx.extChar.drawImage(
    this.character.load[this.character.extCharActive],
    0,
    0,
    600,
    600,
    0,
    0,
    n.width,
    n.height
   );
  }
 }
 resetPlayer() {
  this.keysPressed = this.flagsPressed = this.touchesPressed = 0;
  this.fieldAnimate();
  this.gridCellFlashes = [];
  this.isWarningBlockCount = 0;
  this.setStyle(`P${this.player}-BODY`, "opacity", "100%");
  this.resetPlayerClassAreaSwayPosition();
  this.isActive = true;
  this.piecePositionLast = {
   x: 0,
   y: 0
  };
  this.playerclassareaSway = {
   on: false,
   x: 0,
   y: 0,
   rot: 0,
   intensity: 0,
   rotIntensity: 0,
   rotTimer: 0,
   translateTimer: 0,
   moveXTimer: 0,
   maxTime: 60,
   last: {
    x: "",
    y: "",
    rot: ""
   }
  };
   let ww = gameStorage.currentSettings.settings.video;
   this.playerclassareaSway.on = ww.fieldSwayLevel !== 0;
   this.playerclassareaSway.intensity = ww.fieldSwayLevel;
   this.particleLevel = ww.particleLevel;
   this.particlesEnabled = ww.particleLevel > 0;
   this.ghost = ww.pieceGhost;
   this.isGridFlashEnabled = ww.pieceFlash;
   this.isClearTextShow = ww.cleartext;
   this.fieldShakeDmgTolerance = ww.fieldShakeDamage;
   
  
  this.delayedGarbage = 0;
  this.setInitialParameter("rot", "set", 0);
  this.setInitialParameter("hold", "set", 0);
  this.width = 10;
  this.hiddenHeight = 30;
  this.visibleHeight = 20;
  this.height = this.hiddenHeight + this.visibleHeight;
  this.grid = $GRID(this.width, this.height, 0);
  this.previewInit();
  this.isHeld = false;
  this.combo = -1;
  this.b2b = -1;
  this.b2bLevel = 0;
  this.pieceY = -20;
  this.holdPiece = void 0;
  this.pieceXMoveRel = true;
  this.pieceXDirection = 0;
  this.score = 0;
  this.piecesCount = 0;
  this.holdDraw();
  this.setFieldImage("normal", true);
  this.openHold(true);
  for (var e in this.delay) {
   this.delay[e] = -9999;
   this.delayAdd[e] = this.defaultDelay[e];
  };
  this.spike = {
   counter: 0,
   time: 0,
  };
  this.showSpikeCounter("disable");
  this.activeMatrix = [[]];
  this.garbage = [];
  this.garbageStorage = 0;
  this.wormhole = {
   hp: this.wormhole.maxHP,
   maxHP: this.wormhole.maxHP,
   lastHP: 1500,
   damageReceived: 0,
   isHigh: false
  };
  this.isGarbageStackable = false;

  this.checkRightBar();
  this.checkLeftBar("reset");
  this.clearedLinesDelayed = [];
  //this.clearedLinesDelayed = [];
  this.clearedLinesReady = [];

  this.showClearTextSpin(false);
  this.showClearTextRegular(false);
  this.showClearTextB2B(false);
  this.showClearTextREN(false);
  this.previewDraw();
  this.drawGrid();
  this.checkWarning("stop");
  this.statistics = {
   line1: 0,
   line2: 0,
   line3: 0,
   line4: 0,
   pc: 0,
   maxCmb: 0,
   attack: 0
  };
  for (let a = 0; a < 4; a++) {
   for (let b of ["spin", "spinmini"]) {
    for (let c of "z,l,o,s,t,i,j".split(",")) {
     this.statistics[`${c}${b}${a}`] = 0;
    }
   }
  }
  this.isRageMode = false;

  this.frenzy = {
   isOn: false,
   isReady: false,
   phase: 0,
   initialPhase: 1,
   isTurningOff: false,
   isMaster: false,
   isNasterReady: false,

   timer: 0,
   maxTime: this.frenzy.maxTime,
   timerEnabled: false,
   fails: 0,
   maxFails: 0,
   successes: 0,
   boards: 0,
   requireLines: 0,
   isSuccess: false,
   isFail: false
  };
  this.detailMemory = {
   grid: $GRID(this.width, this.height, 0),
   preview: [],
   combo: -1,
   b2b: -1,
   b2bLevel: 0,
   hold: void 0,
  };
  this.setBodyColor(void 0, void 0, void 0, void 0, "");
  this.openFrenzy(false);
  this.openLoseWarning(false);
  this.topoutCoordinates = [];
  this.checkTopoutWarning("stop");
  this.isTopOut = false;
  this.setExternalCharacter();
  this.checkHPIfLow(true);
  this.checkHPIfDanger(true);
 }

 setPlayerClassAreaSway(op, dir, b) {
  if (this.playerclassareaSway.on) {
   this.playerclassareaSway[op] = dir || 0;
   if (b) this.playerclassareaSway[b] = this.playerclassareaSway.maxTime;
  }
 }

 setDetailMemory(setload) {
  switch (setload) {
   case "set":
    this.detailMemory = {
     grid: $CLONE(this.grid),
     preview: $CLONE(this.queueBag),
     combo: this.combo,
     b2b: this.b2b,
     b2bLevel: this.b2bLevel,
     hold: this.holdPiece
    }
    break;
   case "load":
    var _ = {
     grid: $CLONE(this.detailMemory.grid),
     preview: $CLONE(this.detailMemory.preview),
     combo: this.detailMemory.combo,
     b2b: this.detailMemory.b2b,
     b2bLevel: this.detailMemory.b2bLevel,
     hold: this.detailMemory.hold,
    };
    return _;
  }
 }

 showSpikeCounter(bool) {
  if (this.isClearTextShow || bool == "disable") {
   var e = `P${this.player}-CLEARTEXT-SPIKE`,
    eid = $ID(e);
   $STYLE(e, "animation", "none");
   switch (bool) {
    case "bump":
     eid.offsetHeight;
     $STYLE(e, "opacity", "100%");
     $STYLE(e, "animation", "cleartext-animation-spike-bump 220ms 1 ease-out");
     break;
    case "exit":
     eid.offsetHeight;
     $STYLE(e, "opacity", "0%");
     $STYLE(e, "animation", "cleartext-animation-spike-exit 1500ms 1 ease-in");
     break;
    case "disable":
     eid.offsetHeight;
     $STYLE(e, "opacity", "0%");
     break;
   };
  }

 }

 addSpikeCount(count) {
  if (count > 0) {
   var e = `P${this.player}-CLEARTEXT-SPIKE`
   this.spike.counter += count;
   this.spike.time = 2 * gachatrisCore.MAIN_FPS;
   if (this.spike.counter >= 10) {
    $IH(e, gachatrisLanguage.transText1("spike", this.spike.counter));
    this.showSpikeCounter("bump");
   }
  }
 }

 injectPiece(id, isHeld) {
  if (this.putPiece(id, isHeld)) {
   if (this.initialSystem.hold == 1) {
    var holdTemp = this.holdPiece;
    if (!this.isHeld && this.canHold) {
     this.playSound("ihs");
     if (this.holdPiece !== void 0) {
      this.holdPiece = this.active;
      this.putPiece(holdTemp);
     } else {
      this.holdPiece = this.active;
      this.putPiece(this.previewNext());
     };
     this.isHeld = true;
     this.holdDraw();
    };
    this.setInitialParameter("hold", "set", 0);
   };

   if (this.initialSystem.rot !== 0) {
    if (this.initialSystem.rot > 0) {
     for (var i = 0; i < this.initialSystem.rot; i++) {
      this.rotatePiece(1);
     };
    };
    if (this.initialSystem.rot < 0) {
     for (var i = 0; i > this.initialSystem.rot; i--) {
      this.rotatePiece(-1);
     };
    };
    this.playSound("irs");
    this.setInitialParameter("rot", "set", 0);
   };
   if (!gameManager.isReplay && this.isAi) {
    let de = this.holdPiece !== void 0 ? this.holdPiece : this.queueBag[0];
    let pieceX = GACHAMINO_SET[de].x + Math.min((this.width - 5), ~~((this.width - 10) / 2)),
     pieceY = GACHAMINO_SET[de].y + this.hiddenHeight - 2;
    this.aiEvaluatePiece(id, this.isHeld, this.combo, this.b2b, this.grid, this.pieceX, this.pieceY, pieceX, pieceY, this.rot);
   }
   this.refreshTopOutWarning(GACHAMINO_SET[this.queueBag[0]]);
   this.spinDetected.normal = false;
   this.spinDetected.mini = false;
   this.spinDetected.kickx1y2 = false;
   this.isGarbageStackable = true;
  };
 };

 putPiece(ind, isHeld) {
  this.active = ind;
  this.wallKick = GACHAMINO_SET[ind].wallKick;
  this.matrixTemplate = GACHAMINO_SET[ind].matrix
  this.activeMatrix = this.matrixTemplate[0];
  this.rot = 0;
  this.spinDetection = GACHAMINO_SET[ind].spinDetection;
  this.pieceX = GACHAMINO_SET[ind].x + Math.min((this.width - 5), ~~((this.width - 10) / 2));
  this.pieceY = GACHAMINO_SET[ind].y;
  this.pieceY += this.hiddenHeight - 2;
  this.isLanded = false;
  this.pieceMoved = true;
  this.pieceDirty = true;
  this.isHardDrop = false;
  this.lock.delay = this.playerSettings.LOCK - this.levelHandicapConverter("lock", this.level);
  this.lock.limit = {
   move: 15,
   rotate: 15,
  };
  this.spinDetected = {
   normal: false,
   mini: false,
   kickx1y2: false
  };
  this.isLockLimit = true;
  this.canLockPiece = true;
  if ((this.garbageBlocking == "limited" || this.garbageBlocking == "none") && !isHeld && !this.frenzy.isOn && this.isGarbageStackable) this.addGarbageField();
  if (!this.checkValidation(0, 0, this.activeMatrix)) {
   this.checkLoseOrLifeLost("Block Out");
   return false;
  };
  this.pieceY += this.checkDrop(1);
  return true;
 };

 checkValidation(cx, cy, matrix) {
  cx = cx + this.pieceX;
  cy = Math.floor(cy + this.pieceY);
  for (var x = 0, len = matrix.length; x < len; x++) {
   for (var y = 0, wid = matrix[x].length; y < wid; y++) {
    if (
     matrix[x][y] && (
      x + cx < 0 ||
      x + cx >= this.width ||
      y + cy >= this.height ||
      this.grid[x + cx][y + cy])
    )
     return false;
   };
  };
  return true;
 };

 checkDrop(d) {
  for (var i = 1; i <= d; i++) {
   if (!this.checkValidation(0, i, this.activeMatrix)) return i - 1;
  };
  return i - 1;
 };

 softDrop() {
  if (this.checkValidation(0, 1, this.activeMatrix) && this.pieceY > -10) {
   this.pieceMoved = true
   var grav = this.playerSettings.SOFTDROP;
   if (grav > 1) {
    this.score += this.checkDrop(grav);
    for (var t = 0; t < this.checkDrop(grav); t++) {
     this.checkDropToParticle(t);
    }
    this.playSound(`fall${this.isProGachatris ? "_pro" : ""}`);
    this.pieceY += this.checkDrop(grav);
   }
   else if (grav === 1) {
    this.score++;
    this.checkDropToParticle(this.checkDrop(1));
    this.playSound(`fall${this.isProGachatris ? "_pro" : ""}`);
    this.pieceY += this.checkDrop(1);
   }
   else {
    if (this.pieceY >= Math.round(this.pieceY) - grav && this.pieceY <= Math.round(this.pieceY)) {
     this.score++;
     this.checkDropToParticle(1);
     this.playSound(`fall${this.isProGachatris ? "_pro" : ""}`);
    };
    this.pieceY += grav;
   };
  };
 };
 hardDrop() {
  if (this.pieceY > -10) {
   for (var t = 0; t < this.checkDrop(this.height); t++) {
    this.checkDropToParticle(t)
   }
   for (var i = Math.floor(this.pieceY); i <= this.height; i++) {
    if (this.checkValidation(0, 1, this.activeMatrix)) {
     this.pieceMoved = true;
     break;
    };
   };

   this.score += this.checkDrop(this.height) * 2;
   this.playSound(`harddrop${this.isProGachatris ? "_pro" : `${Math.floor(Math.random() * 4) + 1}`}`);
   this.pieceY += this.checkDrop(this.height);
   this.setPlayerClassAreaSway("y", 0.7, "translateTimer");
   let hm = this.isVisible && this.particlesEnabled && this.particleLevel >= 3;
   if (hm)
    for (let x = 0, len = this.activeMatrix.length; x < len; x++) {
     for (let y = 0, len2 = this.activeMatrix[x].length; y < len2; y++) {
      if (this.activeMatrix[x][y]) {


       for (let e = 0; e < 2; e++) {
        particleManager.addParticle(
         1,
         this.active + 2,
         this.assetRect(`P${this.player}-FIELD`, "x") + ((this.pieceX + x) * this.cellSize),
         this.assetRect(`P${this.player}-FIELD`, "y") + ((this.pieceY - this.hiddenHeight + 0.6 + y) * this.cellSize),
         this.assetRect(`P${this.player}-FIELD`, "x") + ((this.pieceX + (Math.random() * 6) + (Math.random() * -6)) * this.cellSize),
         this.assetRect(`P${this.player}-FIELD`, "y") + ((this.pieceY - this.hiddenHeight - 15 + y + (Math.random() * 6)) * this.cellSize),
         80 + Math.round(Math.random() * 130),
         0.8,
         "hardDrop",
        );
       }
      }
     }
    }
   this.isHardDrop = true;
  };
 };

 createGridFlash(x, y) {
  this.gridCellFlashes.push({
   x: x,
   y: y,
   frames: 0
  });
 }

 checkPieceXMovement(kp, kl) {
  var moveFailed = this.moveFailed;
  if (kp & KEY_FLAGS.LEFT && !(kl & KEY_FLAGS.LEFT)) {
   this.handlingDelays.autodel = 0;
   this.handlingDelays.autorate = 0;
   this.pieceXMoveRel = true;
   this.pieceXDirection = -1;
  } else if (kp & KEY_FLAGS.RIGHT && !(kl & KEY_FLAGS.RIGHT)) {
   this.handlingDelays.autodel = 0;
   this.handlingDelays.autorate = 0;
   this.pieceXMoveRel = true;
   this.pieceXDirection = 1;
  };
  if (
   this.pieceXDirection === 1 &&
   !(kp & KEY_FLAGS.RIGHT) &&
   kl & KEY_FLAGS.RIGHT &&
   kp & KEY_FLAGS.LEFT
  ) {
   this.handlingDelays.autodel = 0;
   this.handlingDelays.autorate = 0;
   this.pieceXMoveRel = true;
   this.pieceXDirection = -1;
  } else if (
   this.pieceXDirection === -1 &&
   !(kp & KEY_FLAGS.LEFT) &&
   kl & KEY_FLAGS.LEFT &&
   kp & KEY_FLAGS.RIGHT
  ) {
   this.handlingDelays.autodel = 0;
   this.handlingDelays.autorate = 0;
   this.pieceXMoveRel = true;
   this.pieceXDirection = 1;
  } else if (
   !(kp & KEY_FLAGS.RIGHT) &&
   kl & KEY_FLAGS.RIGHT &&
   kp & KEY_FLAGS.LEFT
  ) {
   this.pieceXDirection = -1;
  } else if (
   !(kp & KEY_FLAGS.LEFT) &&
   kl & KEY_FLAGS.LEFT &&
   kp & KEY_FLAGS.RIGHT
  ) {
   this.pieceXDirection = 1;
  } else if (
   (!(kp & KEY_FLAGS.LEFT) && kl & KEY_FLAGS.LEFT) ||
   (!(kp & KEY_FLAGS.RIGHT) && kl & KEY_FLAGS.RIGHT)
  ) {
   this.handlingDelays.autodel = 0;
   this.handlingDelays.autorate = 0;
   this.pieceXMoveRel = true;
   this.pieceXDirection = 0;
  };
  if (this.pieceXDirection) {
   if (this.pieceXMoveRel) {
    moveFailed = this.movePieceX(this.pieceXDirection);
    this.handlingDelays.autodel++;
    this.pieceXMoveRel = false;
   } else if (this.handlingDelays.autodel < this.playerSettings.AUTODEL) {
    this.handlingDelays.autodel++;
   } else if (this.handlingDelays.autodel === this.playerSettings.AUTODEL && this.playerSettings.AUTODEL !== 0) {
    moveFailed = this.movePieceX(this.pieceXDirection);
    if (this.playerSettings.AUTORATE !== 0) this.handlingDelays.autodel++;
   } else if (this.handlingDelays.autorate < this.playerSettings.AUTORATE) {
    this.handlingDelays.autorate++;
   } else if (this.handlingDelays.autorate === this.playerSettings.AUTORATE && this.playerSettings.AUTORATE !== 0) {
    moveFailed = this.movePieceX(this.pieceXDirection);
   };
  } else {
   moveFailed = 0;
  };
  this.moveFailed = moveFailed;
  if (moveFailed !== 0) this.setPlayerClassAreaSway("x", moveFailed, "moveXTimer");
 };

 movePieceX(d) {
  this.handlingDelays.autorate = 0;
  var isFail = false;
  if (this.pieceY > -10) {
   if (this.playerSettings.AUTORATE === 0 && this.handlingDelays.autodel === this.playerSettings.AUTODEL) {
    for (var i = 1; i < this.width; i++) {
     if (!this.checkValidation(i * d, 0, this.activeMatrix)) {
      this.pieceX += (i * d) - d;
      isFail = true;
      break;
     };
     this.playSound("move");
     this.pieceMoved = true;
     this.lock.delay = this.playerSettings.LOCK - this.levelHandicapConverter("lock", this.level);
     if (!this.checkValidation(0, 1, this.activeMatrix)) {
      if (this.isLockLimit) this.lock.limit.move--;
      this.playSound("step");
     }
    };
   } else if (this.checkValidation(d, 0, this.activeMatrix)) {
    let isMoved = !this.checkValidation(0, 1, this.activeMatrix);
    this.pieceX += d;
    this.lock.delay = this.playerSettings.LOCK - this.levelHandicapConverter("lock", this.level);
    this.pieceMoved = true;
    this.playSound("move");
    if (isMoved) {
     if (this.isLockLimit) this.lock.limit.move--;
     this.playSound("step");
    };
   } else {
    isFail = true;
   }
  }
  return isFail ? d : 0;
 };

 rotatePiece(rotDir) {
  let dir = rotDir;
  if (rotDir == 2 && !this.enable180) dir = 0;
  if (this.pieceY > -10) {
   let currentRot = ((this.rot % 4) + 4) % 4;
   let newRot = (((this.rot + dir) % 4) + 4) % 4;
   let rotateTemp = this.matrixTemplate[newRot];
   var dirType = "right";
   switch (dir) {
    case 1:
     dirType = "right";
     break;
    case -1:
     dirType = "left";
     break;
    case 2:
     dirType = "double";
     break;
   };

   let rot = 0;
   if (!this.checkValidation(0, 1, this.activeMatrix) && this.active == 2 && this.isOSpin) rot = 1;

   for (let ITERATION = rot, length = this.wallKick[dirType][newRot].length; ITERATION < length && dir !== 0; ITERATION++) {
    if (this.checkValidation(
      this.wallKick[dirType][currentRot][ITERATION][0],
      this.wallKick[dirType][currentRot][ITERATION][1],
      rotateTemp
     )) {
     this.pieceX += this.wallKick[dirType][currentRot][ITERATION][0];
     this.pieceY += this.wallKick[dirType][currentRot][ITERATION][1];
     this.kickDistance.x = this.wallKick[dirType][currentRot][ITERATION][0];
     this.kickDistance.y = this.wallKick[dirType][currentRot][ITERATION][1];
     /*this.spin.x = Math.floor(this.pieceX);
     this.spin.y = Math.floor(this.pieceY);*/
     this.activeMatrix = rotateTemp;
     let isLanded = this.checkValidation(0, 1, this.activeMatrix);
     this.rot = newRot;
     this.playSound("rotate");
     this.pieceMoved = false;
     this.lock.delay = this.playerSettings.LOCK - this.levelHandicapConverter("lock", this.level);
     this.detectSpin();
     if (!isLanded) {
      if (this.isLockLimit) this.lock.limit.rotate--;
      if (this.spinDetected.normal) {
       this.setPlayerClassAreaSway("rot", dir * 2, "rotTimer");
       this.playSound("prespin");
       this.checkSpinToParticle(2);
      } else if (this.spinDetected.mini) {
       this.setPlayerClassAreaSway("rot", dir, "rotTimer");
       this.checkSpinToParticle(1);
       this.playSound("prespinmini");
      } else if (this.spinDetected.kickx1y2) {
       this.setPlayerClassAreaSway("rot", dir * 2, "rotTimer");
       this.playSound("prespin");
      };
     }
     break;
    };
   };
  } else this.setInitialParameter("rot", "add", dir);
 };
 checkSpinToParticle(num) {
  if (this.isVisible && this.particlesEnabled && this.particleLevel >= 4)
   for (let x = 0, len = this.activeMatrix.length; x < len; x++) {
    for (let y = 0, len2 = this.activeMatrix[x].length; y < len2; y++) {
     if (this.activeMatrix[x][y])
      for (let e = 0; e < num; e++) {
       particleManager.addParticle(
        0,
        this.active + 2,
        this.assetRect(`P${this.player}-FIELD`, "x") + ((this.pieceX + x) * this.cellSize),
        this.assetRect(`P${this.player}-FIELD`, "y") + ((this.pieceY - this.hiddenHeight + 0.4 + y) * this.cellSize),
        this.assetRect(`P${this.player}-FIELD`, "x") + ((this.pieceX + (Math.random() * 14) + (Math.random() * -14)) * this.cellSize),
        this.assetRect(`P${this.player}-FIELD`, "y") + ((this.pieceY - this.hiddenHeight + 0.4 + y) * this.cellSize) + SCREEN_HEIGHT,
        80 + Math.round(Math.random() * 100),
        1,
        "fall"
       )
      }
    }
   }
 }
 checkDropToParticle(cy) {
  if (this.isVisible && this.particlesEnabled && this.particleLevel >= 4)
   for (let x = 0, len = this.activeMatrix.length; x < len; x++) {
    for (let y = 0, len2 = this.activeMatrix[x].length; y < len2; y++) {
     let scatterX = Math.random() * 1;
     if (this.activeMatrix[x][y])
      particleManager.addParticle(
       0,
       this.active + 2,
       this.assetRect(`P${this.player}-FIELD`, "x") + ((this.pieceX + x + scatterX) * this.cellSize),
       this.assetRect(`P${this.player}-FIELD`, "y") + ((this.pieceY - this.hiddenHeight + 0.6 + y + cy) * this.cellSize),
       this.assetRect(`P${this.player}-FIELD`, "x") + ((this.pieceX + x + scatterX /*+ (Math.random() * 2) + (Math.random() * -2)/**/ ) * this.cellSize),
       this.assetRect(`P${this.player}-FIELD`, "y") + ((this.pieceY - this.hiddenHeight - 5 + y + cy + (Math.random() * 6)) * this.cellSize),
       60 + Math.round(Math.random() * 60),
       0.5,
       "hardDrop"
      )
    }
   }
 }

 setInitialParameter(type, operation, value) {
  if (this.initialSystemEnabled)
   switch (type) {
    case "rot":
     if (operation == "set") {
      this.initialSystem.rot = value;
     };
     if (operation == "add") {
      this.initialSystem.rot += value;
     };

     if (this.initialSystem.rot === 4 || this.initialSystem.rot === -4) {
      this.initialSystem.rot = 0;
     };

     if (this.initialSystem.rot === 0) {
      this.editAssetHTMLText(`P${this.player}-NEXT`, gachatrisLanguage.transText1("next"))
     };

     if (this.initialSystem.rot === 2 || this.initialSystem.rot === -2) {
      this.editAssetHTMLText(`P${this.player}-NEXT`, gachatrisLanguage.transText1("rot_180"));
     };

     if (this.initialSystem.rot === 1 || this.initialSystem.rot === 3) {
      this.editAssetHTMLText(`P${this.player}-NEXT`, gachatrisLanguage.transText1("rot_cw", this.initialSystem.rot));
     };

     if (this.initialSystem.rot === -1 || this.initialSystem.rot === -3) {
      this.editAssetHTMLText(`P${this.player}-NEXT`, gachatrisLanguage.transText1("rot_cw", this.initialSystem.rot * -1));
     };

     break;
    case "hold":
     if (operation == "set") {
      this.initialSystem.hold = value;
     };
     if (operation == "add") {
      this.initialSystem.hold += value;
     };

     if (this.initialSystem.hold === 2) {
      this.initialSystem.hold = 0;
     };

     if (this.initialSystem.hold === 0) {
      this.editAssetHTMLText(`P${this.player}-HOLD`, gachatrisLanguage.transText1("hold"));
     } else {
      this.editAssetHTMLText(`P${this.player}-HOLD`, gachatrisLanguage.transText1("hold_initial"));
     };

     break
   };

 };

 openHold(bool) {
  var e = `P${this.player}-HOLDH`;
  this.canHold = bool;
  $STYLE(e, "opacity", `${bool ? "100" : "0"}%`);
 }

 swapHold() {
  if (this.pieceY > -10 && this.canHold) {
   var holdTemp = this.holdPiece;
   if (!this.isHeld) {
    this.isHeld = true;
    if (this.holdPiece !== void 0) {
     this.holdPiece = this.active;
     this.injectPiece(holdTemp, true);
     this.playSound(`hold${this.isProGachatris ? "_pro" : ""}`);
    } else {
     this.holdPiece = this.active;
     this.injectPiece(this.previewNext(), true);
     this.playSound(`first_hold${this.isProGachatris ? "_pro" : ""}`);
    };
    this.holdDraw();
   };
  } else this.setInitialParameter("hold", "add", 1);
 };

 pieceUpdate() {
  if (this.pieceY > -10) {
   let landed = this.checkValidation(0, 1, this.activeMatrix);
   if (landed) {
    this.isLanded = false;
    this.pieceMoved = true;
    //this.level = Math.max(this.b2b + 1, 1);
    this.lock.delay = this.playerSettings.LOCK - this.levelHandicapConverter("lock", this.level);
    let grav = this.playerSettings.GRAVITY + this.levelHandicapConverter("level", this.level);
    //this.setNameplateName(this.levelHandicapConverter("level", this.level))
    if (grav > 1) this.pieceY += this.checkDrop(grav);
    else if (grav === 1) this.pieceY += this.checkDrop(1);
    else this.pieceY += grav;
    landed = this.checkValidation(0, 1, this.activeMatrix);
   }
   if (!landed) {
    if (!this.isLanded) {
     this.isLanded = true;
     if (!this.isHardDrop)
      this.playSound("land");
    };
    this.pieceY = Math.floor(this.pieceY);
    if (this.lock.delay <= 0 ||
     this.lock.limit.rotate <= 0 ||
     this.lock.limit.move <= 0 ||
     this.isHardDrop
    ) {
     let isNoDelay = true;

     if (this.isGridFlashEnabled)
      for (let x = 0, len = this.activeMatrix.length; x < len; x++) {
       for (let y = 0, len2 = this.activeMatrix[x].length; y < len2; y++) {
        if (this.activeMatrix[x][y]) {

         this.createGridFlash(x + this.pieceX, y + ~~(this.pieceY));

        }
       }
      }

     if (!this.isHardDrop)
      this.playSound("lock");
     this.detectSpin();
     this.addMatrixToField(this.activeMatrix);
     this.delay.piece = this.delayAdd.piece;
     this.pieceY = -200;
     this.isHeld = false;
     for (var e in this.delay)
      if (this.delay[e] > 0) isNoDelay = false;
     if (isNoDelay) this.injectPiece(this.previewNext());
     this.holdDraw();
    } else {
     if (!this.pieceMoved) {
      if ((this.spinDetected.normal || ((this.kickDistance.x == -1 || this.kickDistance.x == 1) && this.kickDistance.y == 2)) && this.active == 6) {
       if ((this.lock.delay + 60) % 60 == 0) {
        this.drawMatrix(`piece`, this.activeMatrix, this.pieceX, Math.floor(this.pieceY) - (this.hiddenHeight - 0.4), void 0, 0);
       };
       if ((this.lock.delay + 40) % 60 == 0) {
        this.drawMatrix(`piece`, this.activeMatrix, this.pieceX, Math.floor(this.pieceY) - (this.hiddenHeight - 0.4), 9, 0);
       };
       if ((this.lock.delay + 20) % 60 == 0) {
        this.drawMatrix(`piece`, this.activeMatrix, this.pieceX, Math.floor(this.pieceY) - (this.hiddenHeight - 0.4), 10, 0);
       };
      };
      if (this.spinDetected.mini && this.active == 6) {
       if ((this.lock.delay + 60) % 60 == 0) {
        this.drawMatrix(`piece`, this.activeMatrix, this.pieceX, Math.floor(this.pieceY) - (this.hiddenHeight - 0.4), void 0, 0);
       };
       if ((this.lock.delay + 30) % 60 == 0) {
        this.drawMatrix(`piece`, this.activeMatrix, this.pieceX, Math.floor(this.pieceY) - (this.hiddenHeight - 0.4), 9, 0);
       };
      };
     }
     if (this.canLockPiece) this.lock.delay--;
    };
   };
  };
 };
 simulatePieceDraw() {
  if (
   this.pieceLast.x !== this.pieceX ||
   this.pieceLast.y !== Math.floor(this.pieceY) ||
   this.pieceLast.rot !== this.rot ||
   this.pieceDirty
  ) {
   this.clearCanvas(`piece`);
   this.drawPieceGhost();
   this.drawPiece();
   this.checkTopoutWarning();
   /*if (this.spinDetection && this.active == 6) {
    for (var g = 0; g < this.spinDetection.highX[this.rot].length; g++) {
     this.drawMatrix("piece", [[1]], this.pieceX + this.spinDetection.highX[this.rot][g], ~~(this.pieceY) + this.spinDetection.highY[this.rot][g] - (this.hiddenHeight - 0.4), 2, 1);
    }
    for (var g = 0; g < this.spinDetection.lowX[this.rot].length; g++) {
     this.drawMatrix("piece", [[1]], this.pieceX + this.spinDetection.lowX[this.rot][g], ~~(this.pieceY) + this.spinDetection.lowY[this.rot][g] - (this.hiddenHeight - 0.4), 7, 1);
    }
   } /**/

   if (this.pieceDirty) this.pieceDirty = false;
   this.pieceLast.x = this.pieceX;
   this.pieceLast.y = this.pieceY;
   this.pieceLast.rot = this.rot;
  };

 };

 drawPiece() {
  this.drawMatrix(`piece`, this.activeMatrix, this.pieceX, ~~(this.pieceY) - (this.hiddenHeight - 0.4), void 0, 0);
 };
 drawPieceGhost() {
  if (this.ghost == 1) this.drawMatrix(`piece`, this.activeMatrix, this.pieceX, (Math.floor(this.pieceY) + this.checkDrop(this.height)) - (this.hiddenHeight - 0.4), void 0, 1);
 };
 previewInit() {
  this.queueBag = this.previewGen();
  this.queueBag.push.apply(this.queueBag, this.previewGen());
  this.previewDraw();
 };
 previewGen() {
  let pieceList = [];
  if (this.queueBag.length > 20 + this.playerSettings.PREVIEW) return pieceList;
  this.bag.forEach(function(a) { pieceList.push(a) });
  for (var i = 0; i < pieceList.length - 1; i++)
  {
   var temp = pieceList[i];
   var rand = ~~((pieceList.length - i) * this.previewRNG.next()) + i;
   pieceList[i] = pieceList[rand];
   pieceList[rand] = temp;
  };
  return pieceList;
 };

 previewNext() {
  var next = this.queueBag.shift();
  this.queueBag.push.apply(this.queueBag, this.previewGen());
  this.previewDraw();
  return next;
 };

 previewDraw(rot) {
  this.clearCanvas(`next`);
  this.clearCanvas(`queue`);
  for (var i = 0; i < Math.min(this.playerSettings.PREVIEW); i++) {
   if (i == 0) {
    if (this.queueBag[i] == 4) {
     this.drawMatrix(
      `next`,
      GACHAMINO_SET[this.queueBag[i]].matrix[0],
      GACHAMINO_SET[this.queueBag[i]].x - 2.5,
      GACHAMINO_SET[this.queueBag[i]].y + 0,
      void 0,
      0
     )
    } else if (this.queueBag[i] == 2) {
     this.drawMatrix(
      `next`,
      GACHAMINO_SET[this.queueBag[i]].matrix[0],
      GACHAMINO_SET[this.queueBag[i]].x - 2.5,
      GACHAMINO_SET[this.queueBag[i]].y + 0.5,
      void 0,
      0
     )
    } else {
     this.drawMatrix(
      `next`,
      GACHAMINO_SET[this.queueBag[i]].matrix[0],
      GACHAMINO_SET[this.queueBag[i]].x - 2,
      GACHAMINO_SET[this.queueBag[i]].y + 0.5,
      void 0,
      0
     )
    };
   } else {
    if (this.queueBag[i] == 4) {
     this.drawMatrix(
      `queue`,
      GACHAMINO_SET[this.queueBag[i]].matrix[0],
      GACHAMINO_SET[this.queueBag[i]].x - 2.5,
      (GACHAMINO_SET[this.queueBag[i]].y + 0) + (i - 1) * 3,
      void 0,
      0
     )
    } else if (this.queueBag[i] == 2) {
     this.drawMatrix(
      `queue`,
      GACHAMINO_SET[this.queueBag[i]].matrix[0],
      GACHAMINO_SET[this.queueBag[i]].x - 2.5,
      (GACHAMINO_SET[this.queueBag[i]].y + 0.5) + (i - 1) * 3,
      void 0,
      0
     )
    } else {
     this.drawMatrix(
      `queue`,
      GACHAMINO_SET[this.queueBag[i]].matrix[0],
      GACHAMINO_SET[this.queueBag[i]].x - 2,
      (GACHAMINO_SET[this.queueBag[i]].y + 0.5) + (i - 1) * 3,
      void 0,
      0
     )
    };
   };

  };
 };

 holdDraw() {
  this.clearCanvas(`hold`)
  if (this.holdPiece == 4) {
   this.drawMatrix(
    `hold`,
    GACHAMINO_SET[this.holdPiece].matrix[0],
    GACHAMINO_SET[this.holdPiece].x - 2.5,
    GACHAMINO_SET[this.holdPiece].y,
    this.isHeld ? 1 : void 0,
    0
   )
  } else if (this.holdPiece == 2) {
   this.drawMatrix(
    `hold`,
    GACHAMINO_SET[this.holdPiece].matrix[0],
    GACHAMINO_SET[this.holdPiece].x - 2.5,
    GACHAMINO_SET[this.holdPiece].y + 0.5,
    this.isHeld ? 1 : void 0,
    0
   )
  } else if (this.holdPiece !== void 0) {
   this.drawMatrix(
    `hold`,
    GACHAMINO_SET[this.holdPiece].matrix[0],
    GACHAMINO_SET[this.holdPiece].x - 2,
    GACHAMINO_SET[this.holdPiece].y + 0.5,
    this.isHeld ? 1 : void 0,
    0
   )
  };
 };

 checkBlockGrid(x, y) {
  if (x < 0 || x >= this.width) {
   return true;
  }
  if (y < this.height) {
   if (typeof this.grid[x][y] !== "undefined" && this.grid[x][y] !== 0) {
    return true;
   }
   return false;
  }
  return true;

 };
 drawGrid() {
  this.clearCanvas(`field`);
  this.drawMatrix(`field`, this.grid, 0, -1 * (this.hiddenHeight - 0.4), void 0, 0);
  if (true) {
   let c = 0.1,
    cs = this.actualCellSize;
   let elem = {};
   $ELEM("CANVAS", (a) => {
    elem.elem = a;
    elem.ctx = a.getContext("2d");
   });
   elem.elem.width = this.width * cs;
   elem.elem.height = (this.height) * cs;
   elem.ctx.fillStyle = "rgba(255,255,255,1)";

   for (let x = 0; x < this.width; x++) {
    for (let my = this.hiddenHeight - 1; my < this.height; my++) {
     let y = my; // - this.hiddenHeight;
     if (this.checkBlockGrid(x, my)) {
      if (!this.checkBlockGrid(x - 1, my)) {
       elem.ctx.fillRect(cs * x, cs * y, cs * c, cs);
      }
      if (!this.checkBlockGrid(x + 1, my)) {
       elem.ctx.fillRect((cs * (x + 1)) - (cs * c), cs * y, cs * c, cs);
      }
      if (!this.checkBlockGrid(x, my - 1)) {
       elem.ctx.fillRect((cs * x), (cs * y), cs, cs * c);
      }
      if (!this.checkBlockGrid(x, my + 1)) {
       elem.ctx.fillRect((cs * x), (cs * (y + 1)) - (cs * c), cs, cs * c);
      }




      /*if (this.checkBlockGrid(x + 1, my + 1)) {
       elem.ctx.fillRect((cs * x), (cs * (y + 1)) - (cs * c), cs * c, cs * c);
      }
      if (this.checkBlockGrid(x - 1, my + 1)) {
       elem.ctx.fillRect((cs * (x + 1)) - (cs * c), (cs * (y + 1)) - (cs * c), cs * c, cs * c);
      }*/





     }
    }
   }
   //elem.ctx.fillRect(0,0,this.width*cs,this.height*cs)
   this.canvasCtx.field.drawImage(elem.elem, 0, cs * -1 * (this.hiddenHeight - 0.4), (this.width) * cs, this.height * cs);
  }

 };

 simulateGridFlashes() {
  if (this.isGridFlashEnabled) {
   if ((gameManager.frames % 20) === 0) {
    let a = this.gridCellFlashes.length;
    this.clearCanvas(`fieldFlashes`);
    for (let y = 0; y < a; y++) {
     let q = this.gridCellFlashes[y];
     if (q.frames > 11) {
      this.gridCellFlashes.shift();
      y--;
      a--;
     } else {
      this.drawMatrix(`fieldFlashes`, [[1]], q.x, (-1 * (this.hiddenHeight - 0.4)) + q.y, q.frames, 2);
      q.frames++;
     }

    }
   }
  }

 };


 detectSpin() {
  this.spinDetected.normal = false;
  this.spinDetected.mini = false;
  this.spin.normal = 0;
  this.spin.mini = 0;
  let isLanded = !this.checkValidation(0, 1, this.activeMatrix);
  let isKick = false;


  var checkPoints = 0;
  if (!this.pieceMoved && isLanded) {
   if (this.isAllSpin) {
    if (this.active !== 4 && (!this.isOSpin ? (this.active !== 2) : true)) {
     this.spin.normal = 0;
     for (var i = 0; i < this.spinDetection.highX[0].length; i++) {
      if ((this.checkBlockGrid(this.pieceX + this.spinDetection.highX[this.rot][i], this.pieceY + this.spinDetection.highY[this.rot][i]))) {
       this.spin.normal++;
       checkPoints++;
      };
     };
     for (var i = 0; i < this.spinDetection.lowX[0].length; i++) {
      if ((this.checkBlockGrid(this.pieceX + this.spinDetection.lowX[this.rot][i], this.pieceY + this.spinDetection.lowY[this.rot][i]))) {
       this.spin.mini++;
       checkPoints++;
      };
     };
     if (this.kickDistance.y == 2 && (this.kickDistance.x == 1 || this.kickDistance.x == -1)) {
      this.spin.normal++;
      isKick = true;
     };
    }
    else if (this.active == 4) {
     for (var i = 0; i < 2; i++) {
      this.spin.normal = 0;
      if (((this.checkBlockGrid(this.pieceX + this.spinDetection.highX[this.rot][i], this.pieceY + this.spinDetection.highY[this.rot][i]))) || ((this.checkBlockGrid(this.pieceX + this.spinDetection.highX[this.rot][i + 2], this.pieceY + this.spinDetection.highY[this.rot][i + 2])))) {
       this.spin.normal++;
       checkPoints++;
      }
     }
     for (var i = 0; i < 2; i++) {
      if (((this.checkBlockGrid(this.pieceX + this.spinDetection.lowX[this.rot][i], this.pieceY + this.spinDetection.lowY[this.rot][i]))) || ((this.checkBlockGrid(this.pieceX + this.spinDetection.lowX[this.rot][i + 2], this.pieceY + this.spinDetection.lowY[this.rot][i + 2])))) {
       this.spin.normal++;
       checkPoints++;
      }
     }
     if (this.kickDistance.y == 2 && (this.kickDistance.x == 1 || this.kickDistance.x == -1)) {
      this.spin.normal++;
      isKick = true;
     };
    };
   } else if (this.active == 6) {
    this.spin.normal = 0;
    for (var i = 0; i < this.spinDetection.highX[0].length; i++) {
     if ((this.checkBlockGrid(this.pieceX + this.spinDetection.highX[this.rot][i], this.pieceY + this.spinDetection.highY[this.rot][i])) == true) {
      this.spin.normal++;
      checkPoints++;
     };
    };
    for (var i = 0; i < this.spinDetection.lowX[0].length; i++) {
     if ((this.checkBlockGrid(this.pieceX + this.spinDetection.lowX[this.rot][i], this.pieceY + this.spinDetection.lowY[this.rot][i])) == true) {
      this.spin.mini++;
      checkPoints++;
     };
    };
    if (this.kickDistance.y == 2 && (this.kickDistance.x == 1 || this.kickDistance.x == -1)) {
     this.spin.normal++;
     isKick = true;
    };
   };
   if (checkPoints >= 3) {
    this.spinDetection.kickx1y2 = isKick;
    if (this.spin.normal >= 2) {
     this.spinDetected.normal = true;
    }
    else if (this.spin.mini < 3) {
     this.spinDetected.mini = true;
    };
   };

  };
 };

 getAttack(line, spin, combo, pc, b2b, b2blv) {
  var a = 0;
  var b = 0;
  switch (this.attackType) {
   case "normal":
    if (pc && line > 0) {
     a = 10;
    } else {
     if (line > 3) {
      a = 4
     } else if (line == 1) {
      a = spin ? 2 : 0;
     } else if (line == 2) {
      a = spin ? 4 : 1;
     } else if (line == 3) {
      a = spin ? 6 : 2;
     }
    }

    if (combo > 1 && combo <= 3) { a += 1; }
    else if (combo > 3 && combo <= 5) { a += 2; }
    else if (combo > 5 && combo <= 7) { a += 3; }
    else if (combo > 7 && combo <= 10) { a += 4; }
    else if (combo > 10) { a += 5; };

    if (b2b > 0) a += 1;
    break;
   case "tetr.io":

    if (line > 3) {
     b = 4;
    } else if (line == 1) {
     b = spin ? 2 : 0;
    } else if (line == 2) {
     b = spin ? 4 : 1;
    } else if (line == 3) {
     b = spin ? 6 : 2;
    }
    if (b2b > 0) b += 1 + b2blv;
    b *= this.garbMultiplier;

    a = b + ((b / 4) * combo);
    if (b == 0) a += [0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3][Math.min(combo, 20)] * this.garbMultiplier;
    if (pc && line > 0) {
     a += 10;
    }
    break;
  }
  return Math.floor(a);
 }


 stackDown() {
  var blocksExist = false;
  var lowest = 0;
  for (var y of this.clearedLinesDelayed) {
   lowest = y;
   for (var full = y; full >= 1; full--) {
    for (var x = 0; x < this.width; x++) {
     if (!blocksExist && this.checkBlockGrid(x, full)) blocksExist = true;
     this.grid[x][full] = this.grid[x][full - 1];
    };
   };
  };

  if (blocksExist) {
   this.playSound("collapse");
   this.setPlayerClassAreaSway("y", this.clearedLinesDelayed.length, "translateTimer");

   if (this.isVisible && this.particlesEnabled && this.particleLevel >= 6)
    for (let x = 0, len2 = this.width; x < len2; x++) {
     for (let e = 0; e < 14; e++) {
      particleManager.addParticle(
       0,
       ~~(Math.random() * 7) + 2,
       this.assetRect(`P${this.player}-FIELD`, "x") + (x * this.cellSize) + (Math.random() * this.cellSize),
       this.assetRect(`P${this.player}-FIELD`, "y") + ((lowest - this.hiddenHeight + 2.4) * this.cellSize),
       this.assetRect(`P${this.player}-FIELD`, "x") + ((x + (Math.random() * 6) + (Math.random() * -6)) * this.cellSize),
       this.assetRect(`P${this.player}-FIELD`, "y") + ((lowest - this.hiddenHeight - 5 + (Math.random() * 6)) * this.cellSize),
       100 + Math.round(Math.random() * 60),
       0.5,
       "hardDrop"
      )
     }
    }


  }
  this.clearedLinesDelayed = [];
  this.drawGrid();
  this.checkWarning();
 };
 checkLoseOrLifeLost(out, isLose) {
  if (this.attributesDefense.isOn) {
   if (this.delay.lifeReset <= 0) {
    this.addHPBar(-(~~(this.attributesDefense.maxHP * 0.25)) - ~~(this.fieldRNG.next() * 1), false);
    if (this.attributesDefense.hp == 0) this.life--;
   }
  } else this.life--;
  this.isLose(out, isLose || !(this.life > 0));
 }

 isLose(out, lose) {
  if (!lose) {
   this.delay.lifeReset = this.delayAdd.lifeReset;
   this.pieceY = -300;
   this.delay.piece = 250;
   this.queueBag.unshift(this.active);
   this.previewDraw();
   this.playSound("knockout");
  } else {
   if (this.isTSD && this.statistics.tspin2 >= 20) this.fieldResult("win", false, `${this.statistics.tspin2}TSD!!!`);
   else {
    this.fieldResult("lose", false, this.isTSD ? "Not TSD, failed" : out);
    this.setExternalCharacter("lose");
    this.editAssetHTMLText(`P${this.player}-EXTERNAL-TEXT`, gachatrisLanguage.transText1("lose"))
   }
  }
 }

 resetGrid() {
  this.grid = $GRID(this.width, this.height, 0);
  this.drawGrid();
  this.checkWarning();
 }

 fieldResult(type, isDownfall, text) {
  switch (type) {
   case "win":
    this.fieldAnimate("board-win", "4000m", 1, "ease-in")
    this.setStyle(`P${this.player}-BODY`, "opacity", "0%");
    this.checkWarning("stop");
    break;
   case "lose":
    this.fieldAnimate("board-downfall", "1900m", 1, "ease-in");
    this.setStyle(`P${this.player}-BODY`, "opacity", "0%");
    this.checkWarning("fall");
    this.playSound("lose");
    break;
  }
  this.pieceY = -30;
  this.isActive = false;
  for (var g in this.delay) {
   this.delay[g] = -4847;
  }
 };
 fieldAnimate(name, durationS, iterationCount, timingFunction, delay) {
  var e = `P${this.player}-BODY`;
  $STYLE(e, "animationName", "none");
  this.getAsset(e).offsetHeight;
  $STYLE(e, "animationName", name || "none");
  $STYLE(e, "animationDuration", `${durationS || 1}s`);
  $STYLE(e, "animationIterationCount", iterationCount || "1");
  $STYLE(e, "animationTimingFunction", timingFunction || "linear");
 }

 htmlAnimate(asset, name, durationS, iterationCount, timingFunction, delay) {
  let e = `P${this.player}-${asset}`;
  this.setStyle(e, "animationName", "none");
  this.getAsset(e).offsetHeight;
  this.setStyle(e, "animationName", name || "none");
  this.setStyle(e, "animationDuration", `${durationS || 1}s`);
  this.setStyle(e, "animationIterationCount", iterationCount || "1");
  this.setStyle(e, "animationTimingFunction", timingFunction || "linear");
 }

 sendGarbage(addGarbage, isCounter) {
  let p = [];
  if (addGarbage > 0) {
   switch (this.target) {
    case "random": {
     let currentPlayer = this.player,
      currentTeam = this.team;
     let j = gameManager.players.filter(y => y.player !== currentPlayer && y.isActive && (y.team !== currentTeam || !gameManager.isTeaming));
     let rand = j[Math.floor((this.fieldRNG.next() * (j.length * j.length * j.length)) % j.length)];
     rand.addGarbageArr(addGarbage, rand.fieldRNG.next(), {
      atk: this.attributesActivity.attributes.attack,
      tol: this.attributesActivity.attributes.atkTolerance
     }, currentPlayer);
     p.push(rand);
     break;
    }
    case "all": {
     let currentPlayer = this.player,
      currentTeam = this.team;
     let j = gameManager.players.filter(y => y.player !== currentPlayer && y.isActive && (y.team !== currentTeam || !gameManager.isTeaming));
     for (let rand of j) {
      rand.addGarbageArr(addGarbage, rand.fieldRNG.next(), {
       atk: this.attributesActivity.attributes.attack,
       tol: this.attributesActivity.attributes.atkTolerance
      }, currentPlayer);
      p.push(rand);
     }
     break;
    }
   }

   this.addSpikeCount(addGarbage);
  }
  return p;
 }

 emitAttack(add) {
  let addGarbage = 0,
   garbagePower = 0,
   garbageLength = this.garbage.length,
   isGarbageNeutralized = this.canSendGarbage === "storage",
   piece = this.active + 2;
  for (; garbagePower < add; garbagePower++) {
   if (this.garbage.length > 0 && this.garbageBlocking !== "none") {
    this.garbage.shift();
    isGarbageNeutralized = true;
   }
   else if (gameManager.players.length > 1 && this.canSendGarbage) addGarbage++;
  }
  if (this.isVisible && isGarbageNeutralized) {
   if (this.particlesEnabled && this.particleLevel >= 1) particleManager.addParticle(
    1,
    piece,
    this.assetRect(`P${this.player}-FIELD`, "x") + ((this.piecePositionLast.x) * this.cellSize),
    this.assetRect(`P${this.player}-FIELD`, "y") + ((this.piecePositionLast.y - this.hiddenHeight + 0.6) * this.cellSize),
    this.assetRect(`P${this.player}-METERBAR-CONTAINER-RIGHT`, "x") + (this.assetRect(`P${this.player}-METERBAR-CONTAINER-RIGHT`, "width") / 2),
    this.assetRect(`P${this.player}-METERBAR-CONTAINER-RIGHT`, "y") + (this.assetRect(`P${this.player}-METERBAR-CONTAINER-RIGHT`, "height") / 2),
    Math.floor(250 * this.pgdDivisor),
    3,
    "ease2"
   );
   gameManager.addDelayTrigger(250, () => {
    let gr = add,
     l = 1,
     w = 0;
    if (gr >= 1 && gr <= 2) {
     this.playSound("receive1");
     l = 3;
     w = 5;
    } else if (gr >= 3 && gr <= 4) {
     this.playSound("receive2");
     l = 5;
     w = 7;
    } else if (gr >= 5 && gr <= 6) {
     this.playSound("receive3");
     l = 7;
     w = 10;
    } else if (gr >= 7 && gr <= 8) {
     this.playSound("receive4");
     l = 12;
     w = 15;
    } else if (gr >= 9) {
     this.playSound("receive5");
     l = 17;
     w = 20;
    }

    if (this.particlesEnabled && this.particleLevel >= 2)
     for (let qq = 0; qq < w; qq++) particleManager.addParticle(
      1,
      piece,
      this.assetRect(`P${this.player}-METERBAR-CONTAINER-RIGHT`, "x") + (this.assetRect(`P${this.player}-METERBAR-CONTAINER-RIGHT`, "width") / 2),
      this.assetRect(`P${this.player}-METERBAR-CONTAINER-RIGHT`, "y") + (this.assetRect(`P${this.player}-METERBAR-CONTAINER-RIGHT`, "height") / 2),
      (this.assetRect(`P${this.player}-METERBAR-CONTAINER-RIGHT`, "x") + (this.assetRect(`P${this.player}-METERBAR-CONTAINER-RIGHT`, "width") / 2)) + (((Math.random() * l) + (Math.random() * -l)) * this.cellSize),
      (this.assetRect(`P${this.player}-METERBAR-CONTAINER-RIGHT`, "y") + (this.assetRect(`P${this.player}-METERBAR-CONTAINER-RIGHT`, "height") / 2)) + (((Math.random() * l) + (Math.random() * -l)) * this.cellSize),
      Math.floor(250 * this.pgdDivisor + (10 * Math.random())),
      0.7,
      "hardDrop"
     );

   });
  }
  let q = [];
  switch (this.canSendGarbage) {
   case "attack":
    q = this.sendGarbage(addGarbage);
    break;
   case "storage":
    this.garbageStorage += addGarbage;
    break;
  }


  for (let rand of q) {

   if (!isGarbageNeutralized && this.particlesEnabled && this.particleLevel >= 1 && this.isVisible && rand.isVisible && (rand.particlesEnabled || this.player == gameManager.activePlayer + 1)) {
    particleManager.addParticle(
     1,
     piece,
     this.assetRect(`P${this.player}-FIELD`, "x") + ((this.piecePositionLast.x) * this.cellSize),
     this.assetRect(`P${this.player}-FIELD`, "y") + ((this.piecePositionLast.y - this.hiddenHeight + 0.6) * this.cellSize),
     $RECT(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "x") + ($RECT(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "width") / 2),
     $RECT(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "y") + ($RECT(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "height") / 2),
     Math.floor(250 * this.pgdDivisor),
     3,
     "ease2"
    );
    gameManager.addDelayTrigger(250, () => {
     let gr = add,
      l = 1,
      w = 0;
     if (gr >= 1 && gr <= 2) {
      this.playSound("receive1");
      l = 3;
      w = 5;
     } else if (gr >= 3 && gr <= 4) {
      this.playSound("receive2");
      l = 5;
      w = 7;
     } else if (gr >= 5 && gr <= 6) {
      this.playSound("receive3");
      l = 7;
      w = 10;
     } else if (gr >= 7 && gr <= 8) {
      this.playSound("receive4");
      l = 12;
      w = 15;
     } else if (gr >= 9) {
      this.playSound("receive5");
      l = 17;
      w = 20;
     }
     
     
     if (rand.isVisible) {
      rand.simulateShake(w * 0.05 * this.fieldShakeDmgTolerance);
     }

     if (this.particlesEnabled && this.particleLevel >= 2 && this.isVisible && rand.isVisible && (rand.particlesEnabled || this.player == gameManager.activePlayer + 1))
      for (let qq = 0; qq < w; qq++) particleManager.addParticle(
       1,
       piece,
       this.assetRect(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "x") + (this.assetRect(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "width") / 2),
       this.assetRect(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "y") + (this.assetRect(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "height") / 2),
       (this.assetRect(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "x") + (this.assetRect(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "width") / 2)) + (((Math.random() * l) + (Math.random() * -l)) * this.cellSize),
       (this.assetRect(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "y") + (this.assetRect(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "height") / 2)) + (((Math.random() * l) + (Math.random() * -l)) * this.cellSize),
       Math.floor(250 * this.pgdDivisor + (10 * Math.random())),
       0.7,
       "hardDrop"
      );
    });
   }
   if (isGarbageNeutralized) {
    gameManager.addDelayTrigger(250, () => {
     if (this.particlesEnabled && this.particleLevel >= 1 && this.isVisible && rand.isVisible && (rand.particlesEnabled || this.player == gameManager.activePlayer + 1)) {
      particleManager.addParticle(
       1,
       piece,
       this.assetRect(`P${this.player}-METERBAR-CONTAINER-RIGHT`, "x") + (this.assetRect(`P${this.player}-METERBAR-CONTAINER-RIGHT`, "width") / 2),
       this.assetRect(`P${this.player}-METERBAR-CONTAINER-RIGHT`, "y") + (this.assetRect(`P${this.player}-METERBAR-CONTAINER-RIGHT`, "height") / 2),
       $RECT(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "x") + ($RECT(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "width") / 2),
       $RECT(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "y") + ($RECT(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "height") / 2),
       Math.floor(250 * this.pgdDivisor),
       3,
       "ease2"
      );
      gameManager.addDelayTrigger(250, () => {
       let gr = add,
        l = 1,
        w = 0;
       if (gr >= 1 && gr <= 2) {
        this.playSound("receive1");
        l = 3;
        w = 5;
       } else if (gr >= 3 && gr <= 4) {
        this.playSound("receive2");
        l = 5;
        w = 7;
       } else if (gr >= 5 && gr <= 6) {
        this.playSound("receive3");
        l = 7;
        w = 10;
       } else if (gr >= 7 && gr <= 8) {
        this.playSound("receive4");
        l = 12;
        w = 15;
       } else if (gr >= 9) {
        this.playSound("receive5");
        l = 17;
        w = 20;
       }
       
     if (rand.isVisible) {
      rand.simulateShake(w * 0.05 * this.fieldShakeDmgTolerance);
     }

       if (this.particlesEnabled && this.particleLevel >= 2 && this.isVisible && rand.isVisible && (rand.particlesEnabled || this.player == gameManager.activePlayer + 1))
        for (let qq = 0; qq < w; qq++) particleManager.addParticle(
         1,
         piece,
         this.assetRect(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "x") + (this.assetRect(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "width") / 2),
         this.assetRect(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "y") + (this.assetRect(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "height") / 2),
         (this.assetRect(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "x") + (this.assetRect(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "width") / 2)) + (((Math.random() * l) + (Math.random() * -l)) * this.cellSize),
         (this.assetRect(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "y") + (this.assetRect(`P${rand.player}-METERBAR-CONTAINER-RIGHT`, "height") / 2)) + (((Math.random() * l) + (Math.random() * -l)) * this.cellSize),
         Math.floor(250 * this.pgdDivisor + (10 * Math.random())),
         0.7,
         "hardDrop"
        );
      });
     }

    })

   }

  }

 }

 clearLines() {
  let spinDetected = this.spinDetected.normal,
   miniDetected = this.spinDetected.mini,
   lines = 0;
  var isPC = !this.frenzy.isOn;
  for (var y of this.clearedLinesReady) {
   for (var x = 0; x < this.width; x++) {
    lines++;
    this.delay.line = this.delayAdd.line;
    if (this.isVisible && this.particleLevel >= 5)
     for (var x = 0; x < this.width; x++) {
      if (this.particlesEnabled) particleManager.addParticle(
       2,
       this.grid[x][y],
       this.assetRect(`P${this.player}-FIELD`, "x") + ((x) * this.cellSize),
       this.assetRect(`P${this.player}-FIELD`, "y") + ((y - this.hiddenHeight + 2.4) * this.cellSize),
       this.assetRect(`P${this.player}-FIELD`, "x") + ((x + (Math.random() * 15) + (Math.random() * -15)) * this.cellSize),
       SCREEN_HEIGHT + ((y - 35.4 + y + (Math.random() * 6)) * this.cellSize),
       95 + Math.round(Math.random() * 39),
       1,
       "fall"
      );
     }

    if (this.delay.line >= 1) {
     this.clearedLinesDelayed.push(y);
     for (var x = 0; x < this.width; x++) {
      this.grid[x][y] = 0;
     };
    } else {
     for (var full = y; full >= 1; full--) {
      for (var x = 0; x < this.width; x++) {
       this.grid[x][full] = this.grid[x][full - 1];
      };
     };
    };
   };
  };
  this.clearedLinesReady = [];
  for (var x = 0; x < this.width; x++) {
   for (var y = 0; y < this.height; y++) {
    if (this.checkBlockGrid(x, y)) isPC = false;
   };
  };
  if (lines > 0) {
   this.setPlayerClassAreaSway("y", lines * 2, "translateTimer");
   this.combo++;
   if (this.combo >= 1) {
    this.showClearTextREN(true, gachatrisLanguage.transText1("ren", this.combo));
   };
   if (isPC) {
    this.playSound("bravo");
    this.showPerfectClear(gachatrisLanguage.transText1("perfectClear"));

    if (this.isVisible && this.particlesEnabled && this.particleLevel >= 6)
     for (let e = 0; e < 70; e++) {
      let tolerance = 2
      let fieldX = this.assetRect(`P${this.player}-FIELD`, "x");
      let fieldY = this.assetRect(`P${this.player}-FIELD`, "y");
      let fieldWidth = this.assetRect(`P${this.player}-FIELD`, "width") * Math.random();
      let fieldHeight = this.assetRect(`P${this.player}-FIELD`, "height") * Math.random();
      particleManager.addParticle(
       0,
       this.active + 2,
       (fieldWidth) + fieldX,
       (fieldHeight) + fieldY,
       (fieldWidth) + fieldX + (Math.random() * tolerance * this.cellSize) + (Math.random() * tolerance * this.cellSize * -1),
       (fieldHeight) + fieldY + (Math.random() * tolerance * this.cellSize) + (Math.random() * tolerance * this.cellSize * -1),

       180 + Math.round(Math.random() * 60),
       1.2,
       "hardDrop",
       "random"
      )
     }
   };
   if (spinDetected) {
    if (!this.frenzy.isOn) this.b2b++;
    this.playSound(`tspin${Math.min(lines, 3)}${(this.b2b > 0) ? "_b2b" : ""}`);
    this.showClearTextSpin(true, this.active, false);
   } else
   if (miniDetected) {
    if (!this.frenzy.isOn) this.b2b++;
    this.playSound(`tspinmini${Math.min(lines, 3)}${(this.b2b > 0) ? "_b2b" : ""}`);
    this.showClearTextSpin(true, this.active, true);
   } else {
    if (lines > 3) {
     if (!this.frenzy.isOn) this.b2b++;
    } else {
     if (!this.frenzy.isOn) {
      this.b2b = -1;
      this.b2bLevel = 0;
     }
    }
    this.playSound(`line${Math.min(lines, 5)}${(this.b2b > 0) ? "_b2b" : ""}`);
   };
   if (this.frenzy.isOn) {
    let colorSelect = ["#700", "#710", "#770", "#070", "#077", "#007", "#207"][this.active];
    this.setFrenzyColor(colorSelect);
    this.setFrenzySpinSpeed(800);
   } else if (this.attackType === "tetr.io") {
    if (this.b2b >= 1197) {
     this.b2bLevel = 7;
     if (this.b2b == 1197) {
      this.playSound("b2b_lv4");
     }
    } else
    if (this.b2b >= 666) {
     this.b2bLevel = 6;
     if (this.b2b == 666) {
      this.playSound("b2b_lv4");
     }
    } else
    if (this.b2b >= 256) {
     this.b2bLevel = 5;
     if (this.b2b == 256) {
      this.playSound("b2b_lv4");
     }
    } else
    if (this.b2b >= 68) {
     this.b2bLevel = 4;
     if (this.b2b == 68) {
      this.playSound("b2b_lv4");
     }
    } else
    if (this.b2b >= 21) {
     this.b2bLevel = 3;
     if (this.b2b == 21) {
      this.playSound("b2b_lv3");
     }
    } else
    if (this.b2b >= 7) {
     this.b2bLevel = 2;
     if (this.b2b == 7) {
      this.playSound("b2b_lv2");
     }
    } else
    if (this.b2b >= 3) {
     this.b2bLevel = 1;
     //this.delay.frenzyReady = 0.5 * gachatrisCore.MAIN_FPS;
     if (this.b2b == 3) {
      this.playSound("b2b_lv1");
     }
    }


   }
   this.statistics[`${spinDetected || miniDetected ? `${["z","l","o","s","i","j","t"][this.active]}spin` : "line"}${miniDetected ? "mini" : ""}${lines}`]++;
   if (this.isTSD && !(spinDetected && this.active == 6 && lines == 2)) this.checkLoseOrLifeLost("failed", true)
   var addGarbage = 0;
   let isGarbageNeutralized = false;
   let garbagePower = 0,
    garbageLength = this.garbage.length;
   this.delayedGarbage = 0;
   for (; garbagePower < Math.floor(this.getAttack(lines, spinDetected, this.combo, isPC, this.b2b, this.b2bLevel)); garbagePower++, this.statistics.attack++) {
    if (this.delay.line < 1) {
     if (this.garbage.length > 0 && this.garbageBlocking !== "none") {
      //this.garbage.shift();
      isGarbageNeutralized = true;
     }
     else if (gameManager.players.length > 1 && this.canSendGarbage) addGarbage++;
    } else {
     if (this.delay.line >= 0) this.delayedGarbage++;
     addGarbage++;
    }
   }
   if (gameManager.playersCount > 1) {
    this.makeGarbageCountText(addGarbage, garbagePower, garbagePower - garbageLength, garbageLength, garbageLength > 0 && garbageLength < garbagePower);
   }

   if (this.combo > 1 && addGarbage > 3) {
    this.isRageMode = true;
   }
   if (this.delay.line < 1) this.emitAttack(garbagePower);

   if (this.b2b > 0) {
    this.playSound("b2b");
    let u, r;
    if (this.b2bLevel > 0) {
     let clr = ["#00CC00", "#FFEE00", "#FF5500", "#FA0000"][Math.min(Math.max(this.b2bLevel - 1, 0), 3)];
     u = `<gtris-text-b2blevel style="display: inline-block; color: ${clr}">`;
     r = `</gtris-text-b2blevel>`;
    }
    this.showClearTextB2B(true, this.b2bLevel > 0 && this.attackType === "tetr.io" ? gachatrisLanguage.transText1("backtobacklevel", [
     this.b2b,
      u,
     this.b2bLevel,
      r
    ]) : gachatrisLanguage.transText1("backtoback", this.b2b));
   } else {
    this.showClearTextB2B(false);
   }
   if (!this.frenzy.isOn && this.combo > 0) this.playSound(`ren${Math.min(this.combo, 25)}`, 1 + (this.isRageMode ? 2 : 0));
   var lineText = gachatrisLanguage.transText1(`line${Math.min(lines, 5)}`);
   this.showClearTextRegular(lines > 3 ? "gtris" : true, lineText);
  } else {};
  this.score += this.scoreTemplate[isPC ? "pc" : "nopc"][`${this.b2b > 0 ? "" : "no"}b2b`][`${spinDetected ? "spin" : miniDetected ? "mini" : "line"}`][lines] + this.scoreTemplate.combo * Math.max(0, this.combo);
  this.drawGrid();
 }
 makeGarbageCountText(addGarbage, power, counterpower, length, isCounter) {
  if ((addGarbage > 0 || power > 0) && this.isActive && this.isVisible) $ELEM("gtris-damage-text", (a) => {
   var neu = "color: #88f",
    atk = "color: #f70";
   a.innerHTML = isCounter ? `<gtris-damage-text-color style="${neu}">${length}</gtris-damage-text-color>+<gtris-damage-text-color style="${atk}">${counterpower}<gtris-damage-text-color>` : `<gtris-damage-text-color style="${length > 0 ? neu : atk}">${power}</gtris-damage-text-color>`;
   a.style.fontSize = `2em`;
   a.style.fontFamily = "font-midnight";
   a.style.opacity = `0%`
   a.style.position = "absolute";
   a.style.transform = `translateX(${this.assetRect(`P${this.player}-FIELD`, "x") + (this.pieceX * this.cellSize)}px) translateY(${this.assetRect(`P${this.player}-FIELD`, "y") + ((this.pieceY - this.hiddenHeight) * this.cellSize)}px)`;
   a.style.animation = `damage-text-animation 900ms 1 linear`;
   setTimeout(() => {
    try {
     a.parentNode.removeChild(a);
    } catch (e) {};
   }, 1000)
   $ID("particleElementDiv").appendChild(a);
  });
 }
 addMatrixToField(matrix) {
  var matrixPos = [],
   spinDetected = this.spinDetected.normal,
   miniDetected = this.spinDetected.mini,
   lines = 0,
   pieceValidated = false;
  this.isValidated = false;
  for (var x = 0, len = matrix.length; x < len; x++) {
   for (var y = 0, wid = matrix[x].length; y < wid; y++) {
    if (matrix[x][y] !== 0) {
     this.grid[x + this.pieceX][this.pieceY + y] = matrix[x][y];
     if (matrixPos.indexOf(this.pieceY + y) == -1) matrixPos.push(this.pieceY + y);
     if (y + this.pieceY > this.hiddenHeight - 1) {
      this.isValidated = true;
      pieceValidated = true;
     }
    };
   };
  };
  if (!this.isValidated && !this.isClutchable) {
   this.checkLoseOrLifeLost("Lock Out");
   return false;
  };
  this.piecesCount++;
  this.piecePositionLast.x = this.pieceX;
  this.piecePositionLast.y = this.pieceY;

  //let aprilFools = ~~(this.fieldRNG.next() * 9);
  for (var y = 0; y < this.height; y++) {
   var fill = 0;
   for (var x = 0; x < this.width; x++) {
    if (this.grid[x][y] !== 0) {
     fill++;
    };
   };
   if (fill >= this.width) {
    lines++;
    this.delay.beforeLine = this.delayAdd.beforeLine;
    this.clearedLinesReady.push(y);
   };
  };

  if (lines == 0) {
   this.isRageMode = false;
   if (!this.isValidated && this.isClutchable) {
    this.checkLoseOrLifeLost("Lock Out");
    return false;
   };
   if (this.combo >= 0) {
    if (this.combo >= 2) this.playSound("ren_end");
    this.combo = -1;
    this.showClearTextREN(false);
    if (this.statistics.maxCmb < this.combo) this.statistics.maxCmb = this.combo;
   }
   if (spinDetected) {
    this.playSound("tspin0");
    this.showClearTextSpin(true, this.active, false);
    this.statistics.tspin0++;
   };
   if (miniDetected) {
    this.playSound("tspinmini0");
    this.showClearTextSpin(true, this.active, true);
    this.statistics.tspinmini0++;
   };
   if (this.frenzy.isOn) {
    if (this.frenzy.timer <= 0) this.delay.frenzyOut = 451;
    else {
     this.delay.frenzyDel = 280;
     this.frenzy.isFail = true;
     for (var fx = 0; fx < this.width; fx++) {
      for (var fy = this.hiddenHeight - 2; fy < this.height; fy++) {
       if (this.grid[fx][fy]) this.grid[fx][fy] = 1;
      }

     }
    }
   } else {
    if (this.garbageBlocking == "full") this.addGarbageField();
   }
  } else {
   if (this.isClutchable) {
    this.isValidated = true;
   }
   if (this.frenzy.isOn) {
    if (this.frenzy.timer <= 0) {
     this.delay.frenzyOut = 450;
    }
    else {
     this.frenzy.requireLines -= lines;
     if (this.frenzy.requireLines <= 0) {
      this.delay.frenzyDel = 240;
      this.frenzy.isSuccess = true;
     }
    }
   }
  }
  if (lines > 0 && this.delay.beforeLine <= 0) {
   this.clearLines();
  }

  this.checkWarning();
  this.drawGrid();
  return true;
 };

 modifyGrid(cy, gridArr, isFlipped) {
  if (!isFlipped) {
   for (let x = 0; x < this.width; x++) {
    for (let y = 0; y < gridArr[x].length; y++)
     this.grid[x][y + cy] = gridArr[x][y];
   }
  } else {
   for (let x = 0; x < this.width; x++) {
    for (let y = 0; y < gridArr[x].length; y++)
     this.grid[x][y + cy] = gridArr[(this.width - 1) - x][y];
   }
  };
  this.drawGrid();
 };
 modifyPreview(array, count) {
  if (count == void 0) {
   this.grabBag = array;
  } else {
   this.queueBag = [];
   for (let e = 0; e < count; e++) {
    for (let ee = 0; ee < array.length; ee++) {
     this.queueBag.push(array[ee]);
    }
   }
  }
  this.previewDraw();
 };
 showPerfectClear(text) {
  if (this.isClearTextShow) {

   var a = `P${this.player}-PERFECTCLEAR1`,
    b = `P${this.player}-PERFECTCLEAR2`;

   $IH(a, text);
   $IH(b, text);
   $STYLE(a, "animationName", "none");
   $STYLE(b, "animationName", "none");
   $ID(a).offsetHeight;
   $ID(b).offsetHeight;
   $STYLE(a, "animationName", "perfectClear1");
   $STYLE(b, "animationName", "perfectClear2");
  }
 };
 showClearTextRegular(canShow, text) {
  if (this.isClearTextShow || !canShow) {

   var e = `P${this.player}-CLEARTEXT-REGULAR`;
   $STYLE(e, "animationName", "none");
   $ID(e).offsetHeight;
   if (typeof canShow === "boolean" && canShow) {
    $IH(e, text);
    $STYLE(e, "animationName", "cleartext-animation");
   };
   if (canShow === "gtris") {
    $STYLE(e, "animationName", "cleartext-animation2");
    $IH(e, "");
    let r = text.split(""),
     x = "";
    r.forEach((el, ind) => {
     x += `<gtris-gtris-special-cleartext style="position: relative;	display: inline-block; opacity: 0%; animation: none; animation: gtris-special-cleartext-animation 1500ms 1 ease-out ${ind * 50}ms">${el}</gtris-gtris-special-cleartext>`;
    });
    $IH(e, x);
   };
  }
 };
 showClearTextSpin(canShow, index, isMini) {
  if (this.isClearTextShow || !canShow) {
   var e = `P${this.player}-CLEARTEXT-SPIN`;
   $STYLE(e, "animationName", "none");
   $ID(e).offsetHeight;
   if (canShow) {
    var colorSelect = ["#e00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f"][index];
    var letterSelect = ["z", "l", "o", "s", "i", "j", "t"][index];
    $IH(e, gachatrisLanguage.transText1(`${letterSelect}spin${isMini ? "mini" : ""}`));
    $STYLE(e, "color", colorSelect);
    $STYLE(e, "animationName", "cleartext-animation");
   };
  }
 };
 showClearTextB2B(canShow, text) {
  if (this.isClearTextShow || !canShow) {
   var e = `P${this.player}-CLEARTEXT-B2B`;
   $STYLE(e, "animationName", "none");
   $ID(e).offsetHeight;
   $IH(e, text);
   $STYLE(e, "opacity", "0%");
   if (canShow) {
    $STYLE(e, "opacity", "100%");
    $STYLE(e, "letterSpacing", "0.1em");
    $STYLE(e, "animationName", "cleartext-animation-nofadeout");
   };
  }
 };
 showClearTextREN(canShow, text) {
  if (this.isClearTextShow || !canShow) {
   var e = `P${this.player}-CLEARTEXT-REN`;
   if (canShow) {
    $STYLE(e, "opacity", "100%");
    $STYLE(e, "letterSpacing", "0.05em");
    $IH(e, text);
   } else {
    $STYLE(e, "opacity", "0%");
    $STYLE(e, "letterSpacing", "-0.2em");
   }
  }
 };
 checkWarning(cmd) {
  let check = false,
   count = 0;
  if (!this.frenzy.isOn)
   for (var x = 0; x < this.width; x++) {
    for (var y = 0; y < (this.height - this.visibleHeight + 4) + this.garbage.length; y++) {
     if (this.checkBlockGrid(x, y)) {
      check = true;
      count++;
     }
    };
   };
  if (cmd == "stop" || cmd == "fall") {
   check = false;
   count = 0;
  }
  this.isWarningBlockCount = count;

  if (check && cmd !== "fall") {
   if (!this.isWarning) {
    this.isWarning = true;
    this.setFieldImage("warning");
    this.setBodyColor(255, 0, 0, 1, "");
   };
  } else {
   if (this.isWarning) {
    this.isWarning = false;
    this.setFieldImage(cmd == "fall" ? "warning" : "normal");
    this.setBodyColor(void 0, void 0, void 0, void 0, "");
   };
  };
 };
 refreshTopOutWarning(s) {
  this.topoutCoordinates = [];
  for (var x = 0, len = s.matrix[0].length; x < len; x++) {
   for (var y = 0, wid = s.matrix[0][x].length; y < wid; y++) {
    if (s.matrix[0][x][y]) {
     this.topoutCoordinates.push([x + s.x + Math.min((this.width - 5), ~~((this.width - 10) / 2)), y + this.hiddenHeight - 2 + s.y]);
     if (this.isWarning) this.drawMatrix("field", [[1]], x + s.x + Math.min((this.width - 5), ~~((this.width - 10) / 2)), y + s.y - 1.4, 1, 1)
    }
   }
  }
 }
 checkTopoutWarning(cmd) {
  let isTopOut = false,
   isNotLockOut = false,
   isGridTopOut = false,
   isValid = false;
  let s = GACHAMINO_SET[this.queueBag[0]];
  let drop = this.checkDrop(999);

  if (cmd !== "stop" && !this.frenzy.isOn)
   for (var x = 0, len = this.activeMatrix.length; x < len; x++) {
    for (var y = 0, wid = this.activeMatrix[x].length; y < wid; y++) {
     if (this.activeMatrix[x][y]) {
      if (y + this.pieceY > this.hiddenHeight - 1) {
       isNotLockOut = true;
      }
      for (var e of this.topoutCoordinates) {
       /*if (e[0] == this.pieceX + x && e[1] + this.checkDrop(this.garbage.length) == Math.floor(this.pieceY + this.checkDrop(38)) + y) {
        isTopOut = true;
       }*/

       if (e[0] == this.pieceX + x && e[1] + this.checkDrop(this.garbage.length) == Math.floor(this.pieceY) + y + drop) isTopOut = true;
      }
     }
    }
   }
  if ( /*!this.isLanded/* ||/**/ this.pieceY < -2) isTopOut = false;
  if (cmd == void 0 && (!isTopOut)) isValid = isNotLockOut || cmd == "stop";
  for (var e of this.topoutCoordinates) {
   if (this.checkBlockGrid(e[0], e[1] + this.garbage.length)) {
    isGridTopOut = true;
   }
  }

  if (((!isValid || isGridTopOut) && this.pieceY > -9 && !this.frenzy.isOn)) {
   if (!this.isTopOut) {
    this.isTopOut = true;
    this.openLoseWarning(true);
   }
  } else {
   if (this.isTopOut) {
    this.isTopOut = false;
    this.openLoseWarning(false);
   }
  }
 }
 resetPlayerClassAreaSwayPosition() {

  this.setStyle(`P${this.player}-BODY-SWAY`, "transition", "none") //"transform 0ms ease-out, margin-top 0ms ease-out, margin-left 0ms ease-out");
  this.setStyle(`P${this.player}-BODY-SWAY`, "marginLeft", `0px`);
  this.setStyle(`P${this.player}-BODY-SWAY`, "marginTop", `0px`);
  this.setStyle(`P${this.player}-BODY-SWAY`, "transform", `rotateZ(0deg)`);
  var f = () => this.setStyle(`P${this.player}-BODY-SWAY`, "transition", "transform 1400ms ease-out, margin-top 700ms ease-out, margin-left 1200ms ease-out");
  requestAnimationFrame(f);
 }
 
 simulateShake(intensity) {
  let g = `P${this.player}-BODY-SHAKE`,
   delay = 500;
  $STYLE(g, "animation", "none");
  $ID(g).offsetHeight;
  $ID(g).style.setProperty(`--__P${this.player}_SHAKING_INTENSITY`, `${intensity}`);
  switch (intensity > 0) {
   case true: {
    $STYLE(g, "animation", `ANIM_P${this.player}_SHAKE_DMG ${delay}ms 1 linear`);
    break;
   }
   case false: {
    break;
   }
  } }

 animateBoardEntrance(bool) {
  let g = `P${this.player}-BODY`,
   delay = 500;
  $STYLE(g, "animation", "none");
  $ID(g).offsetHeight;
  switch (bool) {
   case true: {
    $STYLE(g, "animation", `board-entrance ${delay}ms 1 linear`);
    break;
   }
   case void 0: {
    break;
   }
  }
 }

 playerUpdate() {
  if (this.isActive) {
   if (!gameManager.isReplay) {
    this.flagsPressed = this.keysPressed | this.touchesPressed;
    if (this.flagsPressed !== this.keysLast) {
     gameManager.replayData.players[this.player].keyList[gameManager.frames] = this.flagsPressed;
    }
   } else if (gameManager.frames in gameManager.replayData.players[this.player].keyList) {
    this.flagsPressed = gameManager.replayData.players[this.player].keyList[gameManager.frames];
   }

   if (this.flagsPressed & KEY_FLAGS.HOLD && !(this.keysLast & KEY_FLAGS.HOLD)) {
    this.swapHold();
   };
   if (this.flagsPressed & KEY_FLAGS.CW && !(this.keysLast & KEY_FLAGS.CW)) {
    this.rotatePiece(1);
   };
   if (this.flagsPressed & KEY_FLAGS.CCW && !(this.keysLast & KEY_FLAGS.CCW)) {
    this.rotatePiece(-1);
   };
   if (this.flagsPressed & KEY_FLAGS.C180W && !(this.keysLast & KEY_FLAGS.C180W)) {
    this.rotatePiece(2);
   };

   if (this.flagsPressed & KEY_FLAGS.SOFTDROP) {
    this.softDrop();
   };
   this.checkPieceXMovement(this.flagsPressed, this.keysLast);
   if (this.flagsPressed & KEY_FLAGS.HARDDROP && !(this.keysLast & KEY_FLAGS.HARDDROP)) {
    this.hardDrop();
   };

   this.pieceUpdate();
   this.simulatePieceDraw();
   this.keysLast = this.flagsPressed;
   this.checkScore();
   this.checkTopoutWarning();
   if (this.spike.time >= 0) {
    this.spike.time--;
   }

   this.simulateGridFlashes();

   if (this.spike.time == 0) {
    if (this.spike.counter >= 10) this.showSpikeCounter("exit");
    this.spike.counter = 0;
   }
   if (this.playerclassareaSway.on) {
    for (let s of ["rotTimer", "translateTimer", "moveXTimer"])
     if (this.playerclassareaSway[s] >= 0) this.playerclassareaSway[s]--;
    let rot = 1 > this.playerclassareaSway.rotTimer < 25 ? 0.5 : 1;
    if (this.playerclassareaSway.rotTimer == 0) {
     this.playerclassareaSway.rot = 0;
    }
    if (this.playerclassareaSway.translateTimer == 0) {
     this.playerclassareaSway.y = 0;
    }

    this.setStyle(`P${this.player}-BODY-SWAY`, "marginLeft", `${this.playerclassareaSway.x * this.playerclassareaSway.intensity * this.cellSize}px`);
    this.setStyle(`P${this.player}-BODY-SWAY`, "marginTop", `${(this.playerclassareaSway.translateTimer * 0.05) * this.playerclassareaSway.y * this.playerclassareaSway.intensity * this.cellSize}px`);
    if (this.playerclassareaSway.rotIntensity) this.setStyle(`P${this.player}-BODY-SWAY`, "transform", `rotateZ(${(this.playerclassareaSway.rotTimer * 1.1) * this.playerclassareaSway.rot * this.playerclassareaSway.rotIntensity * 0.5}deg)`);

    this.playerclassareaSway.x = this.playerclassareaSway.moveXTimer ? 0 : 0.5;
   }
   if (!gameManager.isReplay && this.isAi) this.aiRun();
   let gr = this.garbage.filter(y => y.frame == gameManager.frames).length;
   if (gr >= 1 && gr <= 2) {
    this.playSound("receive1");
   } else if (gr >= 3 && gr <= 4) {
    this.playSound("receive2");
   } else if (gr >= 5 && gr <= 6) {
    this.playSound("receive3");
   } else if (gr >= 7 && gr <= 8) {
    this.playSound("receive4");
   } else if (gr >= 9) {
    this.playSound("receive5");
   }
   for (let e of ["beforeLine", "line", "frenzyReady", "frenzyIn", "frenzyDel", "frenzyOut", "lifeReset", "piece"]) {
    if (this.delay[e] >= 0 && gameManager.startFrame <= 0) {
     this.delay[e]--;
     break;
    }
   }
   if (this.delay.beforeLine == 0) {
    this.clearLines();
    if (this.delay.piece < 1 && this.delay.line < 1) {
     this.injectPiece(this.previewNext());
     this.delay.line = -999;
     this.delay.piece = -999;
    };
   }
   if (this.delay.line >= 0) {
    this.clearCanvas("lineClear");
    for (let f of this.clearedLinesDelayed) {
     //let r = EricLenovoMath.quadratic(this.delay.line / this.delayAdd.line, 1, 0, 0);
     let r = (this.delay.line / this.delayAdd.line) ** 4
     this.canvasCtx.lineClear.fillStyle = `rgba(255,255,255,1)`;
     this.canvasCtx.lineClear.fillRect(0, (f - this.hiddenHeight + 0.4) * this.actualCellSize, ((this.width / 2) * (r)) * this.actualCellSize, this.actualCellSize);
     this.canvasCtx.lineClear.fillRect(this.actualCellSize * (((1 - r) * (this.width / 2)) + (this.width / 2)), (f - this.hiddenHeight + 0.4) * this.actualCellSize, ((this.width / 2) * (r)) * this.actualCellSize, this.actualCellSize);
    }
   }
   if (this.delay.line == 0) {
    this.stackDown();
    this.clearCanvas("lineClear");
    this.emitAttack(this.delayedGarbage);
    if (this.delay.piece < 1) this.injectPiece(this.previewNext());
   }
   if (this.delay.frenzyReady == 0) {
    this.setDetailMemory("set");
    this.playSound("frenzy");
    this.delay.frenzyIn = 400;
    this.frenzy.isReady = true;
    this.setStyle(`P${this.player}-BODY`, "opacity", "0%");
    this.fieldAnimate("frenzy-board-in", "200m", "1", "ease-in", "0");
    this.delayAdd.piece = 100;
    this.frenzy.phase = this.frenzy.initialPhase;
    this.setExternalCharacter("frenzy");
    this.editAssetHTMLText(`P${this.player}-EXTERNAL-TEXT`, gachatrisLanguage.transText1("frenzy_attack"))
   }
   if (this.frenzy.timerEnabled) {
    if (this.frenzy.timer >= 0) this.frenzy.timer--;
    this.editAssetHTMLText(`P${this.player}-FRENZY-TIMER`, Math.ceil(this.frenzy.timer / gachatrisCore.MAIN_FPS))
    this.checkLeftBar();
    if (this.frenzy.timer == 30 * gachatrisCore.MAIN_FPS || this.frenzy.timer == 15 * gachatrisCore.MAIN_FPS) this.playSound("hurry");
    if (this.frenzy.timer % gachatrisCore.MAIN_FPS == 0 && this.frenzy.timer > 0 && this.frenzy.timer < gachatrisCore.MAIN_FPS * (10 + 1)) this.playSound(`hurry${this.frenzy.timer <= 3 * gachatrisCore.MAIN_FPS? "2" : ""}`);
    if (this.frenzy.timer == 0) this.playSound("time_up")
   }
   if (this.delay.frenzyIn >= 0) {
    if (this.delay.frenzyIn == 300) {
     this.delay.piece = 20;
     this.delayAdd.piece = 60;
     this.delayAdd.line = 200;
     this.delayAdd.beforeLine = 60;
     this.toFrenzyMap(this.frenzy.phase, this.fieldRNG.next(), this.fieldRNG.next(), this.fieldRNG.next());
     //this.toFrenzyMasterMap(0, 4 / 6, this.fieldRNG.next() * 0 + 0 / 2, this.fieldRNG.next() * 0)
     this.setStyle(`P${this.player}-BODY`, "opacity", "100%");
     this.fieldAnimate("frenzy-board-out", "200m", "1", "ease-out", "0");
     this.frenzy.isOn = true;
     this.checkWarning();
     this.openFrenzy(true);
     this.frenzy.timer = this.frenzy.maxTime;
     this.checkLeftBar();
     this.showClearTextB2B(false);
     this.showClearTextREN(false);
     this.showClearTextSpin(false);
     this.showClearTextRegular(false);
     this.combo = -1;
     this.b2b = -1;
     this.openHold(false);
     this.editAssetHTMLText(`P${this.player}-FRENZY-TIMER`, Math.ceil(this.frenzy.timer / gachatrisCore.MAIN_FPS));
    }
    if (this.delay.frenzyIn == 0) {
     this.frenzy.isReady = false;
     this.frenzy.timerEnabled = true;
    }
   }
   if (this.delay.frenzyOut >= 0) {
    if (this.delay.frenzyOut == 400) {
     this.frenzy.isOn = false;
     this.delay.piece = 20;
     this.delayAdd.piece = this.defaultDelay.piece;
     this.delayAdd.line = this.defaultDelay.line;
     this.delayAdd.beforeLine = this.defaultDelay.beforeLine;

     this.setStyle(`P${this.player}-BODY`, "opacity", "0%");
     this.fieldAnimate("frenzy-board-in", "200m", "1", "ease-in", "0");
     this.frenzy.timer = -99;
     this.checkLeftBar();
     this.frenzy.isTurningOff = true;
    }
    if (this.delay.frenzyOut == 300) {
     this.setStyle(`P${this.player}-BODY`, "opacity", "100%");
     this.fieldAnimate("frenzy-board-out", "200m", "1", "ease-out", "0");
     this.frenzy.timerEnabled = false;
     this.openFrenzy(false);
     var _ = this.setDetailMemory("load");
     this.modifyGrid(0, _.grid, false);
     this.modifyPreview(_.preview, 1);
     this.combo = _.combo;
     this.b2b = _.b2b;
     this.b2bLevel = _.b2bLevel;
     this.holdPiece = _.hold;
     this.openHold(true);
     this.showClearTextB2B(this.b2b > 0, this.b2b < 3 ? gachatrisLanguage.transText1("backtoback", this.b2b) : gachatrisLanguage.transText1("backtobacklevel", [
     this.b2b,
     this.b2bLevel,
     function() {
       var clr = ["#00CC00", "#FFEE00", "#FF5500", "#FA0000"][Math.min(Math.max(this.b2bLevel - 1, 0), 3)];
       var s = `<gtris-text-b2blevel style="display: inline-block; color: ${clr}">`;
       var e = `</gtris-text-b2blevel>`;
       return {
        start: s,
        end: e
       };
     }
     ]));
     this.showClearTextREN(this.combo > 0, gachatrisLanguage.transText1("combo", this.combo));
     this.showClearTextSpin(false);
     this.showClearTextRegular(false);
     this.frenzy.isFail = this.frenzy.isSuccess = false;
     this.checkWarning();
    }
    if (this.delay.frenzyOut == 0 && !this.isOnlyFrenzy) {
     this.frenzy.isTurningOff = false;
     this.delay.piece = -39399;
     if (this.delay.piece <= 0) this.injectPiece(this.previewNext());
    }
   }

   if (this.delay.frenzyDel == 0) {
    if (this.frenzy.isSuccess) {
     if (this.frenzy.phase < 13) this.frenzy.phase++;
     this.toFrenzyMap(this.frenzy.phase, this.fieldRNG.next(), this.fieldRNG.next(), this.fieldRNG.next());
     this.frenzy.isSuccess = false;
    }
    if (this.frenzy.isFail) {
     this.toFrenzyMap(this.frenzy.phase, this.fieldRNG.next(), this.fieldRNG.next(), this.fieldRNG.next());
     this.frenzy.isFail = false;
    }
    this.setFrenzySpinSpeed();
    this.delay.piece = 300;
   }
   if (this.delay.lifeReset == 0) {
    this.resetGrid();
    this.delay.piece = this.delayAdd.piece;
    if (this.delay.piece < 1) this.injectPiece(this.previewNext());
   };
   if (this.delay.piece == 0 && this.delayAdd.piece > this.delay.piece && (!this.isOnlyFrenzy || this.frenzy.isOn)) {
    this.injectPiece(this.previewNext());
   }
   this.checkRightBar();
   if (this.attributesDefense.isOn) {
    this.attrDelayLoops.danger.run(1);
    if (gameManager.frames % 555 == 0) {
     this.addHPBar(1);
    }
    this.attrDelayLoops.lowHP.run(this.attributesActivity.isVeryLow.toggled ? 1.5 : 0.8);
   }
  }
 };


 aiRun() {
  if (this.pieceY > -10) {
   if (this.keysPressed == 0 && this.ai.delay <= 0) {
    if (this.ai.extraMovements.length > 0 && this.frenzy.isOn) {
     let ev = this.ai.extraMovements.shift();
     this.ai.delay = this.keysPressed & KEY_FLAGS.SOFTDROP ? 2 : this.ai.delayReset;
     switch (ev) {
      case 1: {
       this.keysPressed |= KEY_FLAGS.HARDDROP;
       break
      }
      case 2: {
       this.keysPressed |= KEY_FLAGS.SOFTDROP;
       if (this.checkValidation(0, 1, this.activeMatrix)) {
        this.ai.extraMovements.unshift(2)
       }
       break
      }
      case 3: {
       this.keysPressed |= KEY_FLAGS.LEFT;
       break
      }
      case 4: {
       this.keysPressed |= KEY_FLAGS.RIGHT;
       break
      }
      case 5: {
       this.keysPressed |= KEY_FLAGS.CCW;
       break
      }
      case 6: {
       this.keysPressed |= KEY_FLAGS.CW;
       break
      }
      case 7: {
       if (this.enable180) {
        this.keysPressed |= KEY_FLAGS.C180W;
       } else {
        this.keysPressed |= KEY_FLAGS.CW;
        this.ai.extraMovements.push(6);
       }
       break
      }
      case 8: {
       this.keysPressed |= KEY_FLAGS.HOLD;
       break
      }
     }

    } else {
     /*if (this.ai.controlImg.hold === 1) {
      this.keysPressed |= KEY_FLAGS.HOLD;
      this.ai.controlImg.hold = 0;
     } else
     if (this.ai.controlImg.x > Math.round(this.pieceX) && this.checkValidation(1, 0, this.activeMatrix)) {
      this.keysPressed |= KEY_FLAGS.RIGHT;
      if (this.ai.controlImg.rot === 1) {
       this.keysPressed |= KEY_FLAGS.CW;
       this.ai.controlImg.rot = 0;
      } else
      if (this.ai.controlImg.rot === 2 && this.enable180) {
       this.keysPressed |= KEY_FLAGS.C180W;
       this.ai.controlImg.rot = 0;
      } else if (this.ai.controlImg.rot === 2 && !this.enable180) {
       this.keysPressed |= KEY_FLAGS.CW;
       this.ai.controlImg.rot--;
      } else
      if (this.ai.controlImg.rot === 3) {
       this.keysPressed |= KEY_FLAGS.CCW;
       this.ai.controlImg.rot = 0;
      }
     } else
     if (this.ai.controlImg.x < Math.round(this.pieceX) && this.checkValidation(-1, 0, this.activeMatrix)) {
      this.keysPressed |= KEY_FLAGS.LEFT;
      if (this.ai.controlImg.rot === 1) {
       this.keysPressed |= KEY_FLAGS.CW;
       this.ai.controlImg.rot = 0;
      } else
      if (this.ai.controlImg.rot === 2 && this.enable180) {
       this.keysPressed |= KEY_FLAGS.C180W;
       this.ai.controlImg.rot = 0;
      } else if (this.ai.controlImg.rot === 2 && !this.enable180) {
       this.keysPressed |= KEY_FLAGS.CW;
       this.ai.controlImg.rot--;
      } else
      if (this.ai.controlImg.rot === 3) {
       this.keysPressed |= KEY_FLAGS.CCW;
       this.ai.controlImg.rot = 0;
      }
     } else
     if (this.ai.controlImg.rot === 1) {
      this.keysPressed |= KEY_FLAGS.CW;
      this.ai.controlImg.rot = 0;
     } else
     if (this.ai.controlImg.rot === 2 && this.enable180) {
      this.keysPressed |= KEY_FLAGS.C180W;
      this.ai.controlImg.rot = 0;
     } else if (this.ai.controlImg.rot === 2 && !this.enable180) {
      this.keysPressed |= KEY_FLAGS.CW;
      this.ai.controlImg.rot--;
     } else
     if (this.ai.controlImg.rot === 3) {
      this.keysPressed |= KEY_FLAGS.CCW;
      this.ai.controlImg.rot = 0;
     } else
     if (this.ai.movements.length !== 0) {
      var f = this.ai.movements.shift();
      switch (f) {
       case 1: {
        this.keysPressed |= KEY_FLAGS.SOFTDROP;
        if (this.checkValidation(0, 1, this.activeMatrix))
         this.ai.movements.unshift(1);
        break;
       };
       case 2: {
        this.keysPressed |= KEY_FLAGS.HARDDROP;
        break;
       };
       case 4: {
        this.keysPressed |= KEY_FLAGS.CW;
        break;
       };
       case 5: {
        this.keysPressed |= KEY_FLAGS.CCW;
        break;
       };
       case 6: {
        if (this.enable180) this.keysPressed |= KEY_FLAGS.C180W;
        else {
         this.ai.movements.unshift(4);
         this.keysPressed |= KEY_FLAGS.CW;
        }
        break;
       };
      };
     } else {
      if ((this.ai.ppsLimit - (0.1 * Math.min(this.piecesCount, 0.01))) > ((this.piecesCount) / (gameManager.playingFrames / gachatrisCore.MAIN_FPS))) {
       this.keysPressed |= KEY_FLAGS.HARDDROP;
      }
      if (this.lock.delay < 11) {
       for (let e = 0; e < 4; e++) {
        this.ai.movements.push(6);
        this.ai.movements.push(5);
        this.ai.movements.push(4);
       }
      }
      /* else if (!this.checkValidation(0, 1, this.activeMatrix)) {
      				 for (var e = 0; e < 2; e++) {
           this.ai.movements.push(2);
      				 }
      				}
     }
     this.ai.delay = this.keysPressed & KEY_FLAGS.SOFTDROP ? 2 : this.ai.delayReset;
     /**/

     let moveRem = this.ai.movements.shift();

     this.keysPressed |= moveRem;




     this.ai.delay = this.keysPressed & KEY_FLAGS.SOFTDROP ? 2 : this.ai.delayReset;
    }
   } else {
    if ((this.pieceY > -2 && this.keysPressed & KEY_FLAGS.SOFTDROP) && this.checkValidation(0, 1, this.activeMatrix)) this.keysPressed |= KEY_FLAGS.SOFTDROP;
    else this.keysPressed = 0;
    this.ai.delay--;
   }
  }
 };


 aiEvaluatePiece(active, isHeld, combo, b2b, grid, px, py, hx, hy, prot) {
  if (isHeld) return;
  let jsobj = {
   grid: grid,
   b2b: b2b,
   preset: this.ai,
   pieceSet: GACHAMINO_SET,
   isWarning: this.isWarning,
   width: this.width,
   height: this.height,
   hiddenHeight: this.hiddenHeight,
   visibleHeight: this.visibleHeight,
   combo: combo,
   isEnable180: this.enable180,
   piecesCount: this.piecesCount,
   tFulfill: this.ai.tspinDetected.tFulfill || [],
   tPrevent: this.ai.tspinDetected.tPrevent || [],
   tLines: this.ai.tspinDetected.tLines || [],
   tAvoidColumn: this.ai.tspinDetected.tAvoidColumn || [],
  };
  this.ai.movements = [];
  /*
  let a1 = sapphirusAI.eval(jsobj(active)),
   a2 = sapphirusAI.eval(jsobj(this.queueBag[0])),
   a3,
   canHold = false,
   best = a1;

  if (this.holdPiece !== void 0) {
   a3 = sapphirusAI.eval(jsobj(this.holdPiece));
   if (a1.score < a3.score && !isHeld) {
    best = a3
    canHold = true;
   } else {
    best = a1;
    canHold = false;
   }
  } else {
   if (a1.score < a2.score && !isHeld) {
    best = a2;
    canHold = true;
   } else best = a1;
  }


  /*if (this.holdPiece !== void 0 && this.canHold) {
   a3 = this.aiEvaluate(this.holdPiece);
  };
  if (this.holdPiece == void 0) {
   if (a1.score < a2.score && !isHeld) {
    best = a2;
    canHold = true;
   } else best = a1;
  } else
  if (a1.score < a3.score && !isHeld && this.canHold) {
   best = a3
   canHold = true;
  } else {
   best = a1;
   canHold = false;
  }
  this.ai.controlImg.x = best.x;
  this.ai.controlImg.rot = best.rot;
  this.ai.controlImg.hold = canHold ? 1 : 0;
  this.ai.movements = best.move;
  this.ai.index = best.index;
  this.ai.tspinDetected.tLines = best.tlines;
  this.ai.tspinDetected.tAvoidColumn = best.tavoidcol;
  this.ai.tspinDetected.tPrevent = best.tprev;
  this.ai.tspinDetected.tFulfill = best.tfulfill;*/

  //this.drawMatrix(`field`, best.grid, best.x, best.y + (-1 * (this.hiddenHeight - 0.4)), 9, 0);

  requestAnimationFrame(async () => {
   let args = [active, this.holdPiece, this.queueBag[0], jsobj, px, py, hx, hy, prot]
   let best = await this.ai.main.evaluate(args);
   this.ai.movements = best.move;
   this.ai.tspinDetected.tLines = best.tl;
   this.ai.tspinDetected.tAvoidColumn = best.ta;
   this.ai.tspinDetected.tPrevent = best.tp;
   this.ai.tspinDetected.tFulfill = best.tf;
   this.drawMatrix(`field`, best.g, best.x, best.y + (-1 * (this.hiddenHeight - 0.4)), 9, 0);
  });

 }

 aiEvaluate(P) {
  let PIECE = P;
  let matrixTemp = GACHAMINO_SET[PIECE].matrix
  this.ai.matrix = matrixTemp[1];
  this.ai.index = PIECE;
  this.ai.wk = GACHAMINO_SET[PIECE].wallKick['right'];
  this.ai.rot = 0;

  let prediction = [];

  let rotationTrials;
  if (PIECE === 2) { rotationTrials = 1; }
  else rotationTrials = 4;
  for (let rotations = 0; rotations < rotationTrials; rotations++) {
   this.ai.y = 0;
   this.ai.x = GACHAMINO_SET[PIECE].x + Math.min((this.width - 5), ~~((this.width - 10) / 2));
   this.ai.matrix = matrixTemp[rotations];
   this.ai.grid = this.grid;
   if (rotations !== -1) {
    let currentRot = ((this.ai.rot % 4) + 4) % 4;
    let newRot = (((this.ai.rot + 1) % 4) + 4) % 4;
    let rotateTemp = matrixTemp[newRot];
    for (let ITERATION = 0, length = this.ai.wk[newRot].length; ITERATION < length; ITERATION++) {
     if (this.checkAIValidation(
       this.ai.wk[currentRot][ITERATION][0],
       this.ai.wk[currentRot][ITERATION][1],
       rotateTemp
      )) {
      this.ai.x += this.ai.wk[currentRot][ITERATION][0];
      this.ai.y += this.ai.wk[currentRot][ITERATION][1];

      this.ai.matrix = rotateTemp;
      this.ai.rot = newRot;
      break;
     };
    };
   }; /**/
   for (; this.checkAIValidation(-1, 0, this.ai.matrix); this.ai.x--) {};
   for (let movements = 0; movements < this.width; movements++) {
    this.ai.grid = JSON.parse(JSON.stringify(this.grid));
    //this.ai.x = lastX;
    if (movements !== 0 && this.checkAIValidation(1, 0, this.ai.matrix, void 0, void 0)) {
     this.ai.x++;
    }

    let moves = [];
    let is2To180 = 0;
    var mrot = this.ai.rot;
    var mx = this.ai.x;
    var my = 10;
    var lastX = this.ai.x,
     lastY = this.checkAIDrop(50, this.ai.x, 10, this.ai.matrix);

    let tPrevent = [],
     tFulfill = [],
     tLines = [],
     tAvoidColumn = [],
     tYes = 0,
     tSlot = 0,
     tZero = 0,
     tBlock = 0;
    /*if (this.ai.enableTspin) {
     for (var TI = 0; TI < 2; TI++) {
      for (let EX of [0, 1, 2, 3, 4, 5, 6, 7]) {
       for (let EY = 30, len = this.ai.grid[EX].length - 1; EY < len; EY++) {
        tSlot = 0;
        tZero = 0;
        tBlock = 0;
        for (let ECX = 0, len2 = this.ai.tSpinDetector[TI].length; ECX < len2; ECX++) {
         for (let ECY = 0, len3 = this.ai.tSpinDetector[TI][ECX].length; ECY < len3; ECY++) {
          if (this.ai.grid[EX + ECX][EY + ECY] == 0 && this.ai.tSpinDetector[TI][ECX][ECY] === 7) {
           tSlot++;
          }
          if (this.ai.grid[EX + ECX][EY + ECY] == 0 && this.ai.tSpinDetector[TI][ECX][ECY] === 0) {
           tZero++;
          }
          if (this.ai.grid[EX + ECX][EY + ECY] >= 1 && this.ai.tSpinDetector[TI][ECX][ECY] == 66) {
           tBlock++;
          }
         }
        }
        if (tSlot == 4 && tBlock == 3 && tZero == 2) {
         tYes++;
        }
        if (tYes >= 1) {
         for (let ECX = 0, len2 = this.ai.tSpinDetector[TI].length; ECX < len2; ECX++) {
          for (let ECY = 0, len3 = this.ai.tSpinDetector[TI][ECX].length; ECY < len3; ECY++) {
           if (this.ai.tSpinDetector[TI][ECX][ECY] == 0 || this.ai.tSpinDetector[TI][ECX][ECY] == 7) {
            tPrevent.push([EX + ECX, EY + ECY]);
           }
          }
         }
         break;
        }
       }
      }
     }
    };/**/
    if (this.ai.enableTspin) {
     let isTSlot = false;
     for (let x = 0; x < this.width - 3; x++) {
      for (let y = this.height - 3; y >= this.height - 3 - this.ai.tspinHeight; y--) {
       let v = [],
        f = [],
        w = [],
        g = [],
        tuckToZero = true;
       tSlot = 0,
        tZero = 0,
        tBlock = 0;
       if (isTSlot) break;
       for (let i1 of this.ai.tspinDetector.tslot) {
        if (this.ai.grid[x + i1[0]][y + i1[1]] === 0) {
         tSlot++;
         v.push([x + i1[0], y + i1[1]]);
         f.push([x + i1[0], y + i1[1]]);
         if (w.indexOf(y + i1[1]) === -1) w.push(y + i1[1]);
        }
       }
       for (let i1 of this.ai.tspinDetector.bottom) {
        if (this.ai.grid[x + i1[0]][y + i1[1]] !== 0) {
         tBlock++;
        }
       }
       for (let i1 of this.ai.tspinDetector.tuck) {
        if (!tuckToZero) break;
        if (this.ai.grid[x + i1[0]][y + i1[1]] !== 0 && tuckToZero) {
         tBlock++;
         tuckToZero = false;
         for (let i2 of i1[2]) {
          if (this.ai.grid[x + i2[0]][y + i2[1]] === 0) {
           tZero++;
           v.push([x + i2[0], y + i2[1]]);
           g.push(x + i2[0]);
          }
         }
        }
       }
       if (tSlot == 4 && tBlock == 3 && tZero == 2) {
        tPrevent = JSON.parse(JSON.stringify(v));
        tAvoidColumn = JSON.parse(JSON.stringify(g));
        f.push([x + 1, y]);
        tFulfill = JSON.parse(JSON.stringify(f));
        tLines = JSON.parse(JSON.stringify(w));
        isTSlot = true;
       }

      }
     }
    }

    for (let dropRotation = 0; dropRotation < this.ai.rotations; dropRotation++) {
     if (dropRotation !== 0 && dropRotation !== 2 || (rotations == 1 || rotations == 3) /*&& (PIECE == 0 || PIECE == 6 || PIECE == 3)*/ ) moves.push(1);
     let mt = this.ai.matrix;
     mx = this.ai.x;
     my = 0;
     let failedTspin = 0;
     this.ai.grid = JSON.parse(JSON.stringify(this.grid));
     my += this.checkAIDrop(this.height, mx, my, mt);
     for (let GX = 0; GX < this.width; GX++) {
      for (let GY = 0; GY < (this.height); GY++) {
       if (typeof this.ai.grid[GX][GY] == "undefined") this.ai.grid[GX][GY] = 0;
      }
     }
     if ( /*PIECE == 0 || PIECE == 6 || PIECE == 3*/ true) {
      if (this.ai.rot == 1 && dropRotation >= 1) {
       let currentRot = ((mrot % 4) + 4) % 4;
       let newRot = (((mrot + 1) % 4) + 4) % 4;
       let rotateTemp = matrixTemp[newRot];
       let length = this.ai.wk[newRot].length;
       for (var ITERATION = 0; ITERATION < length; ITERATION++) {
        if (this.checkAIValidation(
          this.ai.wk[currentRot][ITERATION][0],
          this.ai.wk[currentRot][ITERATION][1],
          rotateTemp, mx, my
         )) {
         mx += this.ai.wk[currentRot][ITERATION][0];
         my += this.ai.wk[currentRot][ITERATION][1];

         mt = rotateTemp;
         mrot = newRot;
         is2To180++;
         break;
        };
       };
      }
      if (this.ai.rot == 3 && dropRotation != 0) {
       let currentRot = ((mrot % 4) + 4) % 4;
       let newRot = (((mrot - 1) % 4) + 4) % 4;
       let rotateTemp = matrixTemp[newRot];
       let length = this.ai.wk[newRot].length;
       for (var ITERATION = 0; ITERATION < length; ITERATION++) {
        if (this.checkAIValidation(
          this.ai.wk[currentRot][ITERATION][0],
          this.ai.wk[currentRot][ITERATION][1],
          rotateTemp, mx, my
         )) {
         mx += this.ai.wk[currentRot][ITERATION][0];
         my += this.ai.wk[currentRot][ITERATION][1];
         mt = rotateTemp;
         mrot = newRot;
         is2To180--;
         break;
        };
       };
      }
     };
     /* if (is2To180 === 2 || is2To180 === 2) {
       moves.push(6);
      } else if (is2To180 === 1 || is2To180 === 3) {
       moves.push(4);
       if (is2To180 === 3) {
        moves.push(4);
        moves.push(4);
       }
      } else if (is2To180 === -1 || is2To180 === -3) {
       moves.push(5);
       if (is2To180 == -3) {
        moves.push(5);
        moves.push(5);
       }
      };*/
     if (is2To180 === 2 || is2To180 === -2) {
      if (moves.indexOf(4) !== -1 || moves.indexOf(5) !== -1) moves.pop();
      moves.push(6);
     }
     if (is2To180 === 1 || is2To180 === 3) {
      moves.push(4);
     }
     if (is2To180 === -1 || is2To180 === -3) {
      moves.push(5);
     }
     my += this.checkAIDrop(5, mx, my, mt);
     let isFourTspin = 0,
      foundTLines = 0;
     if (this.ai.enableTspin) {
      let len1 = this.ai.matrix.length,
       len2 = this.ai.matrix[0].length,
       len3 = tPrevent.length,
       len4 = tFulfill.length;
      for (let TX = 0; TX < len1; TX++) {
       for (let TY = 0; TY < len2; TY++) {
        for (var TE = 0; TE < len3 && PIECE !== 6; TE++) {
         if (PIECE !== 6 && mt[TX][TY] > 0 && this.ai.matrix[TX][TY] !== 8 && TX + mx == tPrevent[TE][0] && TY + my == tPrevent[TE][1]) {
          failedTspin++;
         }
        }
        for (var TE = 0; TE < len4 && PIECE == 6; TE++) {
         if (mt[TX][TY] == 8 && TX + mx == tFulfill[TE][0] && TY + my == tFulfill[TE][1]) {
          isFourTspin++;
         }
        }
       }
      }
     }
     if (isFourTspin > 3) failedTspin -= isFourTspin * 2;
     for (var x = 0, len = mt.length; x < len; x++) {
      for (var y = 0, hght = mt[x].length; y < hght; y++) {
       if (mt[x][y]) {
        for (let q of tLines)
         if (q == y + my) foundTLines = 1;
        for (let q of tFulfill)
         if (q[0] == x && q[1] == y) foundTLines--;
        this.ai.grid[x + mx][y + my] = mt[x][y];
       };
      };
     };

     let linesComplete = 0,
      holes = 0,
      blockade = 0,
      bump = 0,
      foundTspin = 0;

     if (moves.length == 1) {
      moves = [];
     };

     for (let lineTest = this.hiddenHeight - 1; lineTest < this.height; lineTest++) {
      let count = 0;
      for (let ex = 0; ex < this.width; ex++) {
       if (this.ai.grid[ex][lineTest] !== 0) count++;
      }
      if (count == this.width) {
       for (let full = lineTest; full >= 18; full--) {
        for (let x = 0; x < this.width; x++) {
         this.ai.grid[x][full] = this.ai.grid[x][full - 1];
        };
       };
       linesComplete++;
      }
     };




     let columnHeight = [];
     let aggHeight = 0;
     for (let gx = 0; gx < this.width; gx++) {
      for (let gy = this.hiddenHeight; gy < this.height; gy++) {}
      let r = 0;
      for (; r < this.height && (this.ai.grid[gx][r] == 0 || typeof this.ai.grid[gx][r] == "undefined"); r++);
      columnHeight[gx] = this.visibleHeight - r;
     }
     for (let value of columnHeight)
      aggHeight += value;

     for (let c = 0, T = columnHeight.length - 1; c < T; c++) {
      bump += Math.abs(columnHeight[c] - columnHeight[c + 1]);
     }

     let bCount = 0,
      availColummForTspin = 1;
     for (let x = 0; x < this.width; x++) {
      let block = false;
      for (let y = this.hiddenHeight; y < (this.height); y++) {
       if (this.ai.grid[x][y]) {
        block = true;
       } else if (this.ai.grid[x][y] == 0 && block) {
        holes++;
       }
      }
      let isHole = false;
      for (let y = (this.height); y >= this.visibleHeight - 1; y--) {
       if (this.ai.grid[x][y] == 0 || typeof this.ai.grid[x][y] == "undefined") {
        isHole = true;
       } else if ((this.ai.grid[x][y] != 0 && isHole || typeof this.ai.grid[x][y] !== "undefined" && isHole)) {
        bCount++;
       }
      }
      for (let y = this.hiddenHeight; y < (this.height); y++) {
       for (let k of tAvoidColumn)
        if (this.ai.grid[x][y] && x == k) {
         availColummForTspin = 0;
        }
      }
     };


     blockade = bCount;
     let failedWide = 0;
     for (let x = 0; x < mt.length; x++) {
      for (let y = 0; y < mt[x].length; y++) {
       if (mx + x > 8) failedWide += this.ai.failedWide;
      }
     };
     let maxHeightReached = true;
     for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height - 14; y++) {
       if (this.grid[x][y]) maxHeightReached = true;
      }
     };
     if (holes > 2) failedWide = 0;
     if (this.isWarning || this.combo > -1) failedWide = 0;

     if (this.ai.enableTspin) {
      for (let x = 0; x < this.width - 3; x++) {
       for (let y = this.height - 3; y >= this.height - 3 - this.ai.tspinHeight; y--) {
        let tuckToZero = true;
        tSlot = 0,
         tZero = 0,
         tBlock = 0;
        for (let i1 of this.ai.tspinDetector.tslot) {
         if (this.ai.grid[x + i1[0]][y + i1[1]] === 0) {
          tSlot++;
         }
        }
        for (let i1 of this.ai.tspinDetector.bottom) {
         if (this.ai.grid[x + i1[0]][y + i1[1]] !== 0) {
          tBlock++;
         }
        }
        for (let i1 of this.ai.tspinDetector.tuck) {
         if (!tuckToZero) break;
         if (this.ai.grid[x + i1[0]][y + i1[1]] !== 0 && tuckToZero) {
          tBlock++;
          tuckToZero = false;
          for (let i2 of i1[2]) {
           if (this.ai.grid[x + i2[0]][y + i2[1]] === 0) {
            tZero++;
           }
          }
         }
        }
        if (tSlot == 4 && tBlock == 3 && tZero == 2) {
         if (moves.length == 0 || PIECE == 6) foundTspin++;
        }

       }
      }
     }


     let score = (failedWide * -999) + (aggHeight * (this.ai.heuristicsWeight.aggHeight)) + (linesComplete * (this.ai.heuristicsWeight.lines * (maxHeightReached || this.combo > -1 ? 1 : -1839383883838))) + (bump * (this.ai.heuristicsWeight.bump)) + (holes * (this.ai.heuristicsWeight.holes)) + (blockade * (this.ai.heuristicsWeight.blockade)) + (failedTspin * (this.ai.heuristicsWeight.failedTspin) * 38) + (availColummForTspin * foundTspin * 43835) + (foundTLines * 79);


     if (linesComplete == 0 || linesComplete > 0 || (this.piecesCount > 150 && this.combo > -1)) prediction.push({
      x: this.ai.x,
      mx: mx,
      y: my,
      rot: this.ai.rot,
      index: prediction.length,
      move: $CLONE(moves),
      lines: linesComplete,
      score: score,
     })
    };


   }

  };
  let bestIndex = 0,
   bestIndexes = [],
   leastMovements = 99990,
   highestScore = -999999999999;

  for (let evaluate of prediction) {
   if (evaluate.score > highestScore) {
    bestIndexes = [evaluate.index];
    highestScore = evaluate.score;
   } else if (evaluate.score === highestScore) {
    bestIndexes.push(evaluate.index);
   }
  };
  if (bestIndexes.length > 1) {
   for (let e = bestIndexes.length - 1; e >= 0; e--) {
    if (prediction[bestIndexes[e]].move.length < leastMovements) {
     leastMovements = prediction[bestIndexes[e]].move.length;
     bestIndex = bestIndexes[e];
    }
   }
  } else {
   bestIndex = bestIndexes[0];
  }
  return prediction[bestIndex];
 };



 toFrenzyMap(phase, aA, bB, cC) {
  let $ = Math.round(6 * aA),
   i = Math.round(2 * bB),
   e = cC / .5 > 1;
  let [r, s, h, t, d, _, a] = [2, 3, 4, 5, 6, 7, 8], [f, n, y, o, m, v, c] = [0, 1, 2, 3, 4, 5, 6];
  if (phase <= 3) switch ($) {
   case 0:
    switch (i) {
     case 0: {
      let w = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, d, d, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, d, d, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, d, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, d, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, d, d], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, d], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, 0, 0, d], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, 0, 0, d], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, 0, 0, d], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, d, 0, d], ];
      this.modifyGrid(this.hiddenHeight - 2, w, e), this.modifyPreview([m], 130), this.frenzy.requireLines = 4;
      break
     }
     case 1: {
      let u = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, d, 0, d], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, d, 0, d], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, d, 0, d], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, d, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, d, d, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, 0, d, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, 0, d, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, 0, d, d], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, 0, d, d], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ];
      this.modifyGrid(this.hiddenHeight - 2, u, e), this.modifyPreview([m], 130), this.frenzy.requireLines = 4;
      break
     }
     case 2: {
      let g = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, d, d, d], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, d, d, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, d, d, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, d, d, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, d, d, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, 0, d, d], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, 0, d, d], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, 0, d, d], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, 0, d, d], ];
      this.modifyGrid(this.hiddenHeight - 2, g, e), this.modifyPreview([m], 130), this.frenzy.requireLines = 4
     }
    }
    break;
   case 1:
    switch (i) {
     case 0: {
      let l = !0 == e ? s : _;
      let q = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, 0, l, 0, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, 0, l, 0, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], ];
      this.modifyGrid(this.hiddenHeight - 2, q, e), this.modifyPreview(!0 == e ? [n] : [v], 130), this.frenzy.requireLines = 6;
      break
     }
     case 1: {
      let l = !0 == e ? s : _;
      let z = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, 0, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, 0, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, 0, 0, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, 0, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, 0, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l], ];
      this.modifyGrid(this.hiddenHeight - 2, z, e), this.modifyPreview(!0 == e ? [n] : [v], 130), this.frenzy.requireLines = 6;
      break
     }
     case 2: {
      let l = !0 == e ? s : _;
      let G = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, 0, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, 0, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, 0, 0, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, 0, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, 0, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, 0, 0], ];
      this.modifyGrid(this.hiddenHeight - 2, G, e), this.modifyPreview(!0 == e ? [n] : [v], 130), this.frenzy.requireLines = 6
     }
    }
    break;
   case 2:
    switch (i) {
     case 0: {
      let l = !0 == e ? s : _,
       H = !0 == e ? _ : s;
      let L = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, H, H, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, H, H, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, H, H, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, H, H, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, 0, 0, 0, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, 0, H, 0, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, H, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, H, H, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, H, H, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, H, H, l, l], ];
      this.modifyGrid(this.hiddenHeight - 2, L, e), this.modifyPreview(!0 == e ? [n, v] : [v, n], 130), this.frenzy.requireLines = 6;
      break
     }
     case 1: {
      let l = !0 == e ? s : _,
       H = !0 == e ? _ : s;
      let P = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, 0, 0, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, 0, H, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, 0, H, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, H, H, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, H, H, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, H, H, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, H, H, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, H, H, 0, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, H, H, 0, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, H, H, 0, 0], ];
      this.modifyGrid(this.hiddenHeight - 2, P, e), this.modifyPreview(!0 == e ? [n, v] : [v, n], 130), this.frenzy.requireLines = 6;
      break
     }
     case 2: {
      let l = !0 == e ? s : _,
       H = !0 == e ? _ : s;
      let b = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, H, H, 0, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, H, H, 0, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, H, H, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, H, H, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, 0, 0, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, 0, H, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, 0, H, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, H, H, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, H, H, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, H, H, l, l], ];
      this.modifyGrid(this.hiddenHeight - 2, b, e), this.modifyPreview(!0 == e ? [n, v] : [v, n], 130), this.frenzy.requireLines = 6
     }
    }
    break;
   case 3:
    switch (i) {
     case 0: {
      let l = !0 == e ? t : r;
      let k = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], ];
      this.modifyGrid(this.hiddenHeight - 2, k, e), this.modifyPreview(!0 == e ? [o] : [f], 130), this.frenzy.requireLines = 6;
      break
     }
     case 1: {
      let l = !0 == e ? t : r;
      let j = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, 0, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, 0, 0, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, 0, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l], ];
      this.modifyGrid(this.hiddenHeight - 2, j, e), this.modifyPreview(!0 == e ? [o] : [f], 130), this.frenzy.requireLines = 6;
      break
     }
     case 2: {
      let l = !0 == e ? t : r;
      let p = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, 0, 0, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, 0, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, 0, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, l, l, l, l], ];
      this.modifyGrid(this.hiddenHeight - 2, p, e), this.modifyPreview(!0 == e ? [o] : [f], 130), this.frenzy.requireLines = 6
     }
    }
    break;
   case 4:
    switch (i) {
     case 0:
      var x = !0 == e ? t : r,
       A = !0 == e ? r : t,
       B = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, B, e), this.modifyPreview(!0 == e ? [o, f] : [f, o], 130), this.frenzy.requireLines = 6;
      break;
     case 1: {
      var x = !0 == e ? t : r,
       A = !0 == e ? r : t;
      let C = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, C, e), this.modifyPreview(!0 == e ? [o, f] : [f, o], 130), this.frenzy.requireLines = 6;
      break
     }
     case 2: {
      var x = !0 == e ? t : r,
       A = !0 == e ? r : t;
      let D = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, D, e), this.modifyPreview(!0 == e ? [o, f] : [f, o], 130), this.frenzy.requireLines = 6
     }
    }
    break;
   case 5:
    switch (i) {
     case 0: {
      var x = a;
      let E = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, E, e), this.modifyPreview([c], 130), this.frenzy.requireLines = 6;
      break
     }
     case 1: {
      var x = a;
      let F = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, F, e), this.modifyPreview([c], 130), this.frenzy.requireLines = 6;
      break
     }
     case 2: {
      var x = a;
      let I = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, I, e), this.modifyPreview([c], 130), this.frenzy.requireLines = 6
     }
    }
    break;
   case 6:
    switch (i) {
     case 0: {
      var x = h;
      let J = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, J, e), this.modifyPreview([y], 130), this.frenzy.requireLines = 6;
      break
     }
     case 1: {
      var x = h;
      let K = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, K, e), this.modifyPreview([y], 130), this.frenzy.requireLines = 6;
      break
     }
     case 2: {
      var x = h;
      let M = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, M, e), this.modifyPreview([y], 130), this.frenzy.requireLines = 6
     }
    }
  }
  if (phase >= 4 && phase < 7) switch ($) {
   case 0:
    switch (i) {
     case 0: {
      var x = d;
      let N = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, 0, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, 0, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, N, e), this.modifyPreview([m], 130), this.frenzy.requireLines = 6;
      break
     }
     case 1: {
      var x = d;
      let O = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, 0, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, O, e), this.modifyPreview([m], 130), this.frenzy.requireLines = 7;
      break
     }
     case 2: {
      var x = d;
      let Q = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, Q, e), this.modifyPreview([m], 130), this.frenzy.requireLines = 7
     }
    }
    break;
   case 1:
    switch (i) {
     case 0: {
      var x = !1 == e ? _ : s;
      let R = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, x, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, R, e), this.modifyPreview(!1 == e ? [v] : [n], 130), this.frenzy.requireLines = 12;
      break
     }
     case 1: {
      var x = !1 == e ? _ : s;
      let S = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, 0, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, 0, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, 0, 0, 0]];
      this.modifyGrid(this.hiddenHeight - 2, S, e), this.modifyPreview(!1 == e ? [v] : [n], 130), this.frenzy.requireLines = 12;
      break
     }
     case 2: {
      var x = !1 == e ? _ : s;
      let T = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, 0, 0, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, x, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, 0, 0, x, x, 0, 0, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, x, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, x, x, x, x, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, T, e), this.modifyPreview(!1 == e ? [v] : [n], 130), this.frenzy.requireLines = 12
     }
    }
    break;
   case 2:
    switch (i) {
     case 0: {
      var x = !1 == e ? _ : s,
       A = !1 == e ? s : _;
      let U = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, x, 0, 0, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, A, 0, x, 0, A, 0, x, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, 0, 0, 0, A, 0, 0, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, U, e), this.modifyPreview(!1 == e ? [v, n] : [n, v], 130), this.frenzy.requireLines = 12;
      break
     }
     case 1: {
      var x = !1 == e ? _ : s,
       A = !1 == e ? s : _;
      let V = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, 0, A, 0, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, x, A, A, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, 0, A, 0, 0, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, 0, 0, 0, x, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, 0, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, V, e), this.modifyPreview(!1 == e ? [v, n] : [n, v], 130), this.frenzy.requireLines = 12;
      break
     }
     case 2: {
      var x = !1 == e ? _ : s,
       A = !1 == e ? s : _;
      let W = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, 0, 0, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, A, x, x, 0, A, x, x, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, A, x, x, 0, A, x, x, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x, A, A, 0, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x, A, A, 0, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, A, A, 0, 0, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, W, e), this.modifyPreview(!1 == e ? [v, n] : [n, v], 130), this.frenzy.requireLines = 12
     }
    }
    break;
   case 3:
    switch (i) {
     case 0: {
      var x = !1 == e ? r : t;
      let X = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, X, e), this.modifyPreview(!1 == e ? [f] : [o], 130), this.frenzy.requireLines = 10;
      break
     }
     case 1: {
      var x = !1 == e ? r : t;
      let Y = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, Y, e), this.modifyPreview(!1 == e ? [f] : [o], 130), this.frenzy.requireLines = 10;
      break
     }
     case 2: {
      var x = !1 == e ? r : t;
      let Z = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, x]];
      this.modifyGrid(this.hiddenHeight - 2, Z, e), this.modifyPreview(!1 == e ? [f] : [o], 130), this.frenzy.requireLines = 10
     }
    }
    break;
   case 4:
    switch (i) {
     case 0: {
      var x = !1 == e ? r : t,
       A = !1 == e ? t : r;
      let $$ = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, 0, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, 0, 0, 0, 0, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, A, A, 0, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $$, e), this.modifyPreview(!1 == e ? [f, o] : [o, f], 130), this.frenzy.requireLines = 12;
      break
     }
     case 1: {
      var x = !1 == e ? t : r,
       A = !1 == e ? r : t;
      let $i = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, x, x, A, A, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, 0, x, A, A, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, 0, 0, A, A, 0, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, 0, 0, 0, 0, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, 0, A, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, A, A, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, A, A, x, x, 0, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, A, A, x, x, A, A, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, A, A, x, x, A, A, 0, 0]];
      this.modifyGrid(this.hiddenHeight - 2, $i, e), this.modifyPreview(!1 == e ? [f, o] : [o, f], 130), this.frenzy.requireLines = 12;
      break
     }
     case 2: {
      var x = !1 == e ? r : t,
       A = !1 == e ? t : r;
      let $e = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, 0, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, 0, 0, 0, 0, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, A, A, 0, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, A, A, x, x, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, 0, 0]];
      this.modifyGrid(this.hiddenHeight - 2, $e, e), this.modifyPreview(!1 == e ? [f, o] : [o, f], 130), this.frenzy.requireLines = 12
     }
    }
    break;
   case 5:
    switch (i) {
     case 0: {
      var x = a;
      let $r = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, x, x, x, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $r, e), this.modifyPreview([c], 130), this.frenzy.requireLines = 12;
      break
     }
     case 1: {
      var x = a;
      let $s = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, 0, 0, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, 0, 0, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, x, 0, 0, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $s, e), this.modifyPreview([c], 130), this.frenzy.requireLines = 12;
      break
     }
     case 2: {
      var x = a;
      let $h = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, 0, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, x, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $h, e), this.modifyPreview([c], 130), this.frenzy.requireLines = 12
     }
    }
    break;
   case 6:
    switch (i) {
     case 0: {
      var x = a,
       A = !0 == e ? r : t;
      let $t = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, 0, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, x, 0, 0, 0, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, 0, 0, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $t, e), this.modifyPreview(!0 == e ? [c, f] : [c, o], 130), this.frenzy.requireLines = 12;
      break
     }
     case 1: {
      var x = a,
       A = !0 == e ? r : t;
      let $d = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, A, A, 0, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, 0, 0, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, x, A, A, 0, x, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, A, A, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x, 0, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, 0, 0, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x, A, A, x, x, A, A]];
      this.modifyPreview(!0 == e ? [c, f] : [c, o], 130), this.modifyGrid(this.hiddenHeight - 2, $d, e), this.frenzy.requireLines = 12;
      break
     }
     case 2: {
      var A = a,
       x = !0 == e ? r : t;
      let $_ = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, x, x, 0, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, 0, 0, 0, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, A, x, x, 0, A, 0, 0, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $_, e), this.modifyPreview(!0 == e ? [f, c] : [o, c], 130), this.frenzy.requireLines = 12
     }
    }
  }
  if (phase >= 7 && phase < 10) switch ($) {
   case 0:
    switch (i) {
     case 0: {
      var x = d;
      let $a = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, 0, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, 0, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0, 0, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $a, e), this.modifyPreview([m], 130), this.frenzy.requireLines = 9;
      break
     }
     case 1: {
      var x = d;
      let $f = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, x, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, x, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $f, e), this.modifyPreview([m], 130), this.frenzy.requireLines = 8;
      break
     }
     case 2: {
      var x = d;
      let $n = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $n, e), this.modifyPreview([m], 130), this.frenzy.requireLines = 8
     }
    }
    break;
   case 1:
    switch (i) {
     case 0: {
      var x = !1 == e ? t : r;
      let $y = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, 0, 0, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, x, x, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $y, e), this.modifyPreview(!1 == e ? [o] : [f], 130), this.frenzy.requireLines = 12;
      break
     }
     case 1: {
      var x = !1 == e ? t : r;
      let $o = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, 0, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $o, e), this.modifyPreview(!1 == e ? [o] : [f], 130), this.frenzy.requireLines = 12;
      break
     }
     case 2: {
      var x = !1 == e ? t : r;
      let $m = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, 0, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, 0, 0]];
      this.modifyGrid(this.hiddenHeight - 2, $m, e), this.modifyPreview(!1 == e ? [o] : [f], 130), this.frenzy.requireLines = 11
     }
    }
    break;
   case 2:
    switch (i) {
     case 0: {
      var x = !1 == e ? t : r,
       A = !1 == e ? r : t;
      let $v = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, A, x, x, A, A, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, A, A, x, x, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, 0, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, 0, 0, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, 0, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, 0, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, 0, 0, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $v, e), this.modifyPreview(!1 == e ? [o, f] : [f, o], 130), this.frenzy.requireLines = 12;
      break
     }
     case 1: {
      var x = !1 == e ? t : r,
       A = !1 == e ? r : t;
      let $0 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, 0, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, 0, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, 0, 0, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x, 0, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, 0, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, 0, 0, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $0, e), this.modifyPreview(!1 == e ? [o, f] : [f, o], 130), this.frenzy.requireLines = 12;
      break
     }
     case 2: {
      var x = !1 == e ? t : r,
       A = !1 == e ? r : t;
      let $c = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, 0, 0, 0, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, 0, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, x, A, A, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, A, x, x, A, A, 0, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, 0, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $c, e), this.modifyPreview(!1 == e ? [o, f] : [f, o], 130), this.frenzy.requireLines = 12
     }
    }
    break;
   case 3:
    switch (i) {
     case 0: {
      var x = !1 == e ? _ : s;
      let $w = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, 0, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, x, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0, x, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $w, e), this.modifyPreview(!1 == e ? [v] : [n], 130), this.frenzy.requireLines = 12;
      break
     }
     case 1: {
      var x = !1 == e ? _ : s;
      let $1 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, x, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, 0, x, x, x, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, x, x, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $1, e), this.modifyPreview(!1 == e ? [v] : [n], 130), this.frenzy.requireLines = 12;
      break
     }
     case 2: {
      var x = !1 == e ? _ : s;
      let $u = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $u, e), this.modifyPreview(!1 == e ? [v] : [n], 130), this.frenzy.requireLines = 10
     }
    }
    break;
   case 4:
    switch (i) {
     case 0: {
      var x = !1 == e ? _ : s,
       A = !1 == e ? s : _;
      let $g = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, A, A, A, A, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, A, A, A, A, 0, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, A, A, A, A, 0, 0, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0, A, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, A, A, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, A, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, A, A, A, A, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, A, A, A, A, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, A, A, A, A, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, A, A, A, A, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $g, e), this.modifyPreview(!1 == e ? [v, v, n, n] : [n, n, v, v], 130), this.frenzy.requireLines = 12;
      break
     }
     case 1: {
      var x = !1 == e ? _ : s,
       A = !1 == e ? s : _;
      let $l = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, 0, 0, A, 0, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, A, x, 0, A, 0, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, A, x, 0, 0, 0, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, 0, x, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, 0, 0, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $l, e), this.modifyPreview(!1 == e ? [v, n] : [n, v], 130), this.frenzy.requireLines = 12;
      break
     }
     case 2: {
      var x = !1 == e ? _ : s,
       A = !1 == e ? s : _;
      let $q = [[0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, x, x, x, A, A, 0, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x, x, A, A, 0, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, 0, 0, A, A, 0, 0, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, 0, A, 0, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, 0, A, 0, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, x, 0, 0, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, A, x, x, x, A, A, x, x, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, 0, x, x, A, A, x, x, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, x, A, A, x, x, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $q, e), this.modifyPreview(!1 == e ? [v, n] : [n, v], 130), this.frenzy.requireLines = 13
     }
    }
    break;
   case 5:
    switch (i) {
     case 0: {
      var A = a,
       x = !1 == e ? t : r;
      let $z = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, A, A, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, A, A, x, x, A, A, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, A, A, x, x, A, A, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, A, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, 0, x, 0, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, A, 0, 0, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, A, A, x, x, 0, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, A, A, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, A, x, x, A, A, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $z, e), this.modifyPreview(!1 == e ? [c, o] : [c, f], 130), this.frenzy.requireLines = 12;
      break
     }
     case 1: {
      var x = a,
       A = h;
      let $G = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, 0, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, x, 0, 0, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, 0, 0, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, 0, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $G, e), this.modifyPreview([c, y], 130), this.frenzy.requireLines = 12;
      break
     }
     case 2: {
      var x = !1 == e ? _ : s,
       A = !1 == e ? t : r,
       $H = !1 == e ? r : t,
       $L = !1 == e ? s : _;
      let $P = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, 0, $H, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, $L, 0, 0, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, $L, $H, 0, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, $L, $L, $H, $H, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, $L, $L, $H, $H, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, $L, $L, $H, $H, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, $L, $L, $H, $H, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, $L, $L, $H, $H, 0, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, $L, $L, $H, $H, 0, 0, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, $L, $L, $H, $H, 0, 0, 0, 0]];
      this.modifyGrid(this.hiddenHeight - 2, $P, e), this.modifyPreview(!1 == e ? [o, v, n, f] : [f, n, v, o], 130), this.frenzy.requireLines = 12
     }
    }
    break;
   case 6:
    switch (i) {
     case 0: {
      var A = a,
       x = !1 == e ? t : r;
      let $b = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, A, x, 0, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, 0, 0, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, A, 0, x, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, A, A, x, x, x, 0, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, A, A, x, x, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, A, A, x, x, 0, x, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, A, A, x, x, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, A, A, A, x, x, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, A, A, A, x, x, x, x, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $b, e), this.modifyPreview(!1 == e ? [o, c, c, o] : [f, c, c, f], 130), this.frenzy.requireLines = 12;
      break
     }
     case 1: {
      var A = a,
       x = !1 == e ? _ : s;
      let $k = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, 0, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, 0, 0, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, 0, 0, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, 0, A, x, x, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $k, e), this.modifyPreview(!1 == e ? [c, v] : [c, n], 130), this.frenzy.requireLines = 12;
      break
     }
     case 2: {
      var A = a,
       x = !1 == e ? r : t,
       $H = !1 == e ? t : r;
      let $4 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, $H, $H, $H, $H, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, $H, $H, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, $H, $H, 0, 0, 0, 0, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, $H, $H, $H, $H, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, $H, $H, $H, $H, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, $H, $H, $H, $H, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, $H, $H, $H, $H, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, $H, $H, $H, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, $H, $H, A, A, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, $H, $H, $H, $H, A, A, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $4, e), this.modifyPreview(!1 == e ? [o, c, f, f, c, o] : [f, c, o, o, c, f], 130), this.frenzy.requireLines = 12
     }
    }
  }
  if (phase >= 10 && phase < 13) switch ($) {
   case 0:
    switch (i) {
     case 0: {
      var x = d;
      let $2 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, x, 0, 0, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $2, e), this.modifyPreview([m], 130), this.frenzy.requireLines = 9;
      break
     }
     case 1: {
      var x = d;
      let $3 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, x, 0, 0, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $3, e), this.modifyPreview([m], 130), this.frenzy.requireLines = 8;
      break
     }
     case 2: {
      var x = d;
      let $5 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $5, e), this.modifyPreview([m], 130), this.frenzy.requireLines = 9
     }
    }
    break;
   case 1:
    switch (i) {
     case 0: {
      var x = !1 == e ? t : r;
      let $6 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, 0, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0, x, x, 0, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, 0, x, x, x, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $6, e), this.modifyPreview(!1 == e ? [o] : [f], 130), this.frenzy.requireLines = 12;
      break
     }
     case 1: {
      var x = !1 == e ? t : r;
      let $7 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, 0, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $7, e), this.modifyPreview(!1 == e ? [o] : [f], 130), this.frenzy.requireLines = 11;
      break
     }
     case 2: {
      var x = !1 == e ? t : r;
      let $j = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, 0, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, x, x, x, x, x, 0, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $j, e), this.modifyPreview(!1 == e ? [o] : [f], 130), this.frenzy.requireLines = 11
     }
    }
    break;
   case 2:
    switch (i) {
     case 0: {
      var x = !1 == e ? t : r,
       A = !1 == e ? r : t;
      let $p = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, 0, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, A, A, x, 0, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, x, A, A, 0, 0, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, 0, A, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, 0, 0, x, x, A, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, A, x, x, A, 0, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, 0, x, x, A, A, x, x, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $p, e), this.modifyPreview(!1 == e ? [o, f] : [f, o], 130), this.frenzy.requireLines = 12;
      break
     }
     case 1: {
      var x = !1 == e ? t : r,
       A = !1 == e ? r : t;
      let $x = [[0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, A, x, x, A, A, x, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, A, x, x, A, A, x, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, 0, 0, x, x, A, A, x, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, A, x, x, A, A, x, x, x, 0, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, A, x, x, A, A, 0, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, A, x, x, 0, 0, x, 0, 0, A, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, A, x, 0, 0, A, x, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, A, 0, 0, A, A, x, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, A, 0, x, A, A, x, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, A, x, x, A, A, x, x, x, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $x, e), this.modifyPreview(!1 == e ? [o, f] : [f, o], 130), this.frenzy.requireLines = 14;
      break
     }
     case 2: {
      var x = !1 == e ? t : r,
       A = !1 == e ? r : t;
      let $A = [[0, 0, 0, 0, 0, 0, 0, 0, x, 0, A, A, x, x, x, 0, A, x, x, A, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, x, 0, 0, x, x, A, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, x, x, x, A, 0, x, x, A, A, A], [0, 0, 0, 0, 0, 0, 0, A, x, x, A, A, x, x, x, A, A, x, x, A, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, 0, 0, x, A, A, x, x, A, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, 0, 0, A, A, x, x, 0, 0, A], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, x, x, x, A, A, x, x, A, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, A, x, x, x, A, A, x, 0, A, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, x, A, A, 0, 0, A, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, A, 0, x, x, x, A, A, 0, x, A, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $A, e), this.modifyPreview(!1 == e ? [o, f] : [f, o], 130), this.frenzy.requireLines = 14
     }
    }
    break;
   case 3:
    switch (i) {
     case 0: {
      var x = !1 == e ? _ : s;
      let $B = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, x, x, x, 0, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, 0, 0, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $B, e), this.modifyPreview(!1 == e ? [v] : [n], 130), this.frenzy.requireLines = 12;
      break
     }
     case 1: {
      var x = !1 == e ? _ : s;
      let $C = [[0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, 0, x, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, x, x, x, x, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, 0, x, x, 0, x, 0, x, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, 0, 0, 0, x, x, x, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $C, e), this.modifyPreview(!1 == e ? [v] : [n], 130), this.frenzy.requireLines = 14;
      break
     }
     case 2: {
      var x = !1 == e ? _ : s;
      let $D = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, x, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, 0, x, x, 0, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, 0, 0, 0, 0, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, x, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, x, x, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, x, x, x, 0, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $D, e), this.modifyPreview(!1 == e ? [v] : [n], 130), this.frenzy.requireLines = 13
     }
    }
    break;
   case 4:
    switch (i) {
     case 0: {
      var x = !1 == e ? _ : s,
       A = !1 == e ? s : _;
      let $E = [[0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, x, x, A, A, x, x, A, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, 0, 0, A, A, x, x, A, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, x, 0, A, A, x, x, A, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, A, A, x, 0, A, A, x, x, 0, A, A], [0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0, A, A, x, x, A, A, 0, 0, 0, A, A], [0, 0, 0, 0, 0, 0, x, 0, x, x, 0, 0, 0, x, x, A, A, x, x, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, 0, x, x, A, 0, x, x, A, A, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, x, x, A, 0, x, x, A, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, x, x, 0, 0, x, x, A, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, x, x, A, A, x, x, A, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $E, e), this.modifyPreview(!1 == e ? [v, n] : [n, v], 130), this.frenzy.requireLines = 14;
      break
     }
     case 1: {
      var x = !1 == e ? _ : s,
       A = !1 == e ? s : _;
      let $F = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, A, A, 0, 0, A, A, 0, 0, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, A, 0, x, 0, A, 0, x, 0, A, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, A, 0, x, 0, A, 0, x, 0, A, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, x, x, 0, 0, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $F, e), this.modifyPreview(!1 == e ? [v, n] : [n, v], 130), this.frenzy.requireLines = 12;
      break
     }
     case 2: {
      var x = !1 == e ? _ : s,
       A = !1 == e ? s : _;
      let $I = [[0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, A, A, A, A, A, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, A, A, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, 0, A, A, A, A, A, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0, A, A, A, A, A, x, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, A, A, A, A, A, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, A, A, A, A, A, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, A, 0, 0, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, A, 0, A, A, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, 0, A, A, A, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, A, A, A, A, A, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $I, e), this.modifyPreview(!1 == e ? [v, v, n, n] : [n, n, v, v], 130), this.frenzy.requireLines = 14
     }
    }
    break;
   case 5:
    switch (i) {
     case 0: {
      var x = a;
      let $J = [[0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, 0, x, 0, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, x, 0, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, 0, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $J, e), this.modifyPreview([c], 130), this.frenzy.requireLines = 12;
      break
     }
     case 1: {
      var x = a;
      let $K = [[0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, 0, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, 0, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, x, x, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, x, x, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, 0, x, x, x, 0, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $K, e), this.modifyPreview([c], 130), this.frenzy.requireLines = 14;
      break
     }
     case 2: {
      var x = a;
      let $M = [[0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, 0, x, 0, x, 0, x, 0, x, x, 0, x], [0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, x, x, x, 0, x, 0, x, 0, x, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $M, e), this.modifyPreview([c], 130), this.frenzy.requireLines = 14
     }
    }
    break;
   case 6:
    switch (i) {
     case 0: {
      var x = a,
       A = !1 == e ? t : r;
      let $N = [[0, 0, 0, 0, 0, 0, x, x, x, x, x, A, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0, 0, 0, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, A, 0, 0, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, 0, x, A, 0, 0, x, A, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, A, A, A, 0, x, 0, A, 0, x, 0, A], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, A, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, A, A, x, x, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $N, e), this.modifyPreview(!1 == e ? [c, o] : [c, f], 130), this.frenzy.requireLines = 14;
      break
     }
     case 1: {
      var x = a,
       A = !1 == e ? _ : s;
      let $O = [[0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, 0, 0, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, 0, x, A, 0, 0, x, A, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, 0, 0, A, 0, 0, 0, A, 0], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, A, A, A, 0, x, A, A, 0, x, A, A], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, A, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, A, A, 0, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0, 0, 0, 0, x, x, A, A, x, x, A, A], [0, 0, 0, 0, 0, 0, x, x, x, x, x, A, A, A, x, x, A, A, x, x, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $O, e), this.modifyPreview(!1 == e ? [c, v] : [c, n], 130), this.frenzy.requireLines = 14;
      break
     }
     case 2: {
      var x = a,
       A = !1 == e ? _ : s,
       $H = !1 == e ? t : r;
      let $Q = [[0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, $H, 0, x, x, 0, 0, $H, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, 0, 0, x, x, A, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, 0, $H, x, x, A, 0, 0, $H], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, $H, $H, x, x, A, A, $H, $H], [0, 0, 0, 0, 0, 0, x, x, x, x, x, A, A, A, $H, $H, 0, x, A, A, $H, $H], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, $H, $H, 0, 0, A, A, $H, $H], [0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, A, A, 0, $H, $H, 0, x, A, A, $H, $H], [0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0, 0, 0, 0, $H, $H, x, x, A, A, $H, $H], [0, 0, 0, 0, 0, 0, x, x, x, x, x, A, A, A, $H, $H, x, x, A, A, $H, $H], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, $H, $H, x, x, A, A, $H, $H]];
      this.modifyGrid(this.hiddenHeight - 2, $Q, e), this.modifyPreview(!1 == e ? [c, v, o] : [c, n, f], 130), this.frenzy.requireLines = 14
     }
    }
  }
  if (phase >= 13) switch ($) {
   case 0:
    switch (i) {
     case 0: {
      var x = d;
      let $R = [[0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, x, x, 0, 0, 0, 0, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, 0, 0, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, x, x, x, 0, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, 0, x, x, x, x, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, 0, 0, x, 0, x, x, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, x, 0, x, 0, 0, x, x, x, 0, x, x, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, x, x, x, x, x, x, 0, x]];
      this.modifyGrid(this.hiddenHeight - 2, $R, e), this.modifyPreview([m], 130), this.frenzy.requireLines = 15;
      break
     }
     case 1: {
      var x = d;
      let $S = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, x, 0, 0, 0, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0, 0, x, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, 0, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, 0, x, 0, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $S, e), this.modifyPreview([m], 130), this.frenzy.requireLines = 11;
      break
     }
     case 2: {
      var x = d;
      let $T = [[0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, x, x, 0, x, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, 0, x, x, 0, x, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, x, 0, 0, x, 0, x, x, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $T, e), this.modifyPreview([m], 130), this.frenzy.requireLines = 13
     }
    }
    break;
   case 1:
    switch (i) {
     case 0: {
      var x = !1 == e ? _ : s;
      let $U = [[0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, 0, x, x, x, 0, 0, 0, x, x, x, x, x, 0], [0, 0, 0, 0, 0, x, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, 0, 0, 0], [0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, 0, 0, 0, x, x, x, x, x, 0, x, x, x], [0, 0, 0, 0, 0, x, 0, x, x, x, x, x, x, x, x, x, 0, 0, 0, x, x, x], [0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $U, e), this.modifyPreview(!1 == e ? [v] : [n], 130), this.frenzy.requireLines = 15;
      break
     }
     case 1: {
      var x = !1 == e ? _ : s;
      let $V = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, x, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, x, x, 0, 0, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, x, 0, 0, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, 0, 0, x, x, 0, x, x, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0, x, x, x, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $V, e), this.modifyPreview(!1 == e ? [v] : [n], 130), this.frenzy.requireLines = 12;
      break
     }
     case 2: {
      var x = !1 == e ? _ : s;
      let $W = [[0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, 0, x, x, x, x, x, x], [0, 0, 0, 0, x, 0, 0, x, x, x, x, x, 0, 0, 0, 0, x, x, 0, x, x, x], [0, 0, 0, 0, x, x, 0, x, x, 0, 0, 0, 0, x, x, x, 0, 0, 0, x, x, 0], [0, 0, 0, 0, x, x, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, 0, 0, 0], [0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $W, e), this.modifyPreview(!1 == e ? [v] : [n], 130), this.frenzy.requireLines = 15
     }
    }
    break;
   case 2:
    switch (i) {
     case 0: {
      var A = !1 == e ? _ : s,
       x = !1 == e ? s : _;
      let $X = [[0, 0, 0, 0, 0, x, x, A, A, A, x, x, x, A, A, A, x, x, x, A, A, A], [0, 0, 0, 0, 0, x, 0, A, A, A, x, x, x, A, A, A, 0, 0, 0, A, A, A], [0, 0, 0, 0, 0, 0, 0, A, A, A, 0, 0, 0, A, A, A, x, x, 0, A, A, A], [0, 0, 0, 0, 0, 0, 0, A, A, A, x, x, 0, A, A, A, x, x, x, A, A, A], [0, 0, 0, 0, 0, 0, 0, A, A, A, x, x, x, A, A, A, x, x, x, A, A, A], [0, 0, 0, 0, 0, 0, 0, A, A, A, x, x, x, A, A, A, x, x, x, A, A, 0], [0, 0, 0, 0, A, 0, 0, A, A, A, x, x, x, A, A, 0, x, x, x, 0, 0, 0], [0, 0, 0, 0, A, A, 0, A, A, 0, x, x, x, 0, 0, 0, x, x, x, A, A, A], [0, 0, 0, 0, A, A, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A], [0, 0, 0, 0, A, A, A, A, A, A, x, x, x, A, A, A, x, x, x, A, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $X, e), this.modifyPreview(!1 == e ? [v, n] : [n, v], 130), this.frenzy.requireLines = 15;
      break
     }
     case 1: {
      var x = !1 == e ? _ : s,
       A = !1 == e ? s : _;
      let $Y = [[0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, 0, A, A, A, x, x, x, A, A, A, x, x, 0], [0, 0, 0, 0, 0, x, 0, 0, 0, 0, A, A, A, x, x, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, A, 0, x, x, x, 0, 0, 0, 0, 0, 0, A, A, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, 0, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $Y, e), this.modifyPreview(!1 == e ? [v, n] : [n, v], 130), this.frenzy.requireLines = 15;
      break
     }
     case 2: {
      var A = !1 == e ? _ : s,
       x = !1 == e ? s : _;
      let $Z = [[0, 0, 0, 0, 0, x, x, A, A, x, x, A, A, x, x, A, A, x, x, A, A, A], [0, 0, 0, 0, 0, x, 0, A, A, 0, 0, 0, A, x, x, A, A, 0, 0, 0, A, A], [0, 0, 0, 0, 0, 0, 0, A, A, x, x, 0, A, 0, 0, 0, A, x, x, 0, A, A], [0, 0, 0, 0, 0, 0, 0, A, A, x, x, A, A, x, x, 0, A, x, x, A, A, A], [0, 0, 0, 0, 0, 0, 0, A, A, x, x, A, A, x, x, A, A, x, x, A, A, A], [0, 0, 0, 0, 0, 0, 0, A, A, x, x, A, A, x, x, A, A, x, x, A, A, A], [0, 0, 0, 0, 0, 0, 0, A, A, 0, x, A, A, x, x, A, A, 0, x, A, A, A], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, 0, x, 0, 0, 0, x, A, A, 0], [0, 0, 0, 0, 0, A, 0, A, A, x, x, 0, 0, 0, x, A, A, x, x, 0, 0, 0], [0, 0, 0, 0, 0, A, A, A, A, x, x, A, A, x, x, A, A, x, x, A, A, A]];
      this.modifyGrid(this.hiddenHeight - 2, $Z, e), this.modifyPreview(!1 == e ? [v, n] : [n, v], 130), this.frenzy.requireLines = 14
     }
    }
    break;
   case 3:
    switch (i) {
     case 0: {
      var x = !1 == e ? t : r;
      let $8 = [[0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, 0, 0, x], [0, 0, 0, 0, 0, 0, 0, x, 0, 0, x, x, x, x, x, x, x, x, x, x, 0, 0], [0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, 0, 0, x, x, x, x, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0, x, x, x, x, 0, 0, x, x, x], [0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $8, e), this.modifyPreview(!1 == e ? [o] : [f], 130), this.frenzy.requireLines = 15;
      break
     }
     case 1: {
      var x = !1 == e ? t : r;
      let $9 = [[0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, x, 0, 0, 0, x, x, x, x, x, x, x, 0, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, 0, 0, x, x, x, x, x, x, x, 0, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, x, 0, x, x, x, 0, 0, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0, x, x, x, x, x, x, 0, 0, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, x, x, x, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, 0, 0, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, $9, e), this.modifyPreview(!1 == e ? [o] : [f], 130), this.frenzy.requireLines = 15;
      break
     }
     case 2: {
      var x = !1 == e ? t : r;
      let i$ = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, x, 0, x, x, x, 0, 0, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, 0, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, 0, 0, x, x, x, 0, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, 0, 0, x, x, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, 0, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, 0, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, i$, e), this.modifyPreview(!1 == e ? [o] : [f], 130), this.frenzy.requireLines = 14
     }
    }
    break;
   case 4:
    switch (i) {
     case 0: {
      var x = !1 == e ? t : r,
       A = !1 == e ? r : t;
      let ii = [[0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, A, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, 0, 0, 0, 0, x, A, 0, 0, 0, 0, x], [0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0, A, x, 0, 0, 0, 0, A, x, 0, 0], [0, 0, 0, 0, 0, 0, x, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, ii, e), this.modifyPreview(!1 == e ? [o, f] : [f, o], 130), this.frenzy.requireLines = 15;
      break
     }
     case 1: {
      var x = !1 == e ? t : r,
       A = !1 == e ? r : t;
      let ie = [[0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, A, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, 0, 0, x, x, x, A, 0, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, 0, 0, A, x, x, x, 0, 0, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, A, A, A, 0, 0, x, A, A, A, 0, 0, x], [0, 0, 0, 0, 0, 0, 0, x, 0, 0, A, A, A, x, 0, 0, A, A, A, x, 0, 0], [0, 0, 0, 0, 0, 0, x, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, ie, e), this.modifyPreview(!1 == e ? [o, f] : [f, o], 130), this.frenzy.requireLines = 15;
      break
     }
     case 2: {
      var x = !1 == e ? t : r,
       A = !1 == e ? r : t;
      let ir = [[0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, 0, 0, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, 0, 0], [0, 0, 0, 0, 0, 0, A, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, 0, 0, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, 0, 0, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, A, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, 0, 0, x, A, 0, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, 0, 0, 0, 0, A, x, x, x], [0, 0, 0, 0, 0, 0, x, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, ir, e), this.modifyPreview(!1 == e ? [o, f] : [f, o], 130), this.frenzy.requireLines = 15
     }
    }
    break;
   case 5:
    switch (i) {
     case 0: {
      var x = a;
      let is = [[0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, x, x, 0, x, x, x, x, x, 0, x], [0, 0, 0, 0, 0, x, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, 0, x, x, x, x, x, 0, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, is, e), this.modifyPreview([c], 130), this.frenzy.requireLines = 15;
      break
     }
     case 1: {
      var x = a;
      let ih = [[0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, 0, x, x, 0, 0, 0, x, 0, 0, 0, x, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, 0, x, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, 0, x, x, x, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0, x, 0, 0, 0, x, 0, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, ih, e), this.modifyPreview([c], 130), this.frenzy.requireLines = 13;
      break
     }
     case 2: {
      var x = a;
      let it = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, 0, x, x, 0, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, 0, x, x, x, x, x, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0, x, x, x, x, 0, 0, x, 0, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, 0, x, x, x, x, x, 0, x, x, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, x, x, x, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, it, e), this.modifyPreview([c], 130), this.frenzy.requireLines = 12
     }
    }
    break;
   case 6:
    switch (i) {
     case 0: {
      var x = a,
       A = !1 == e ? t : r;
      let id = [[0, 0, 0, 0, 0, x, x, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, x, 0, 0, 0, 0, 0, 0, A, 0, 0, 0, 0, 0, A, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, x, 0, x, A, 0, 0, x, 0, x, A, 0, 0, x, 0, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, id, e), this.modifyPreview(!1 == e ? [c, o] : [c, f], 130), this.frenzy.requireLines = 15;
      break
     }
     case 1: {
      var x = a,
       A = !1 == e ? _ : s;
      let i_ = [[0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, x, x, A, A, 0, x, x, x, A, A, 0, x, x, x], [0, 0, 0, 0, 0, 0, 0, x, 0, x, 0, 0, 0, x, 0, x, 0, 0, 0, x, 0, x], [0, 0, 0, 0, 0, x, 0, 0, 0, 0, A, A, A, 0, 0, 0, A, A, A, 0, 0, 0], [0, 0, 0, 0, 0, x, x, x, x, x, A, A, A, x, x, x, A, A, A, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, i_, e), this.modifyPreview(!1 == e ? [c, v] : [c, n], 130), this.frenzy.requireLines = 15;
      break
     }
     case 2: {
      var x = a,
       A = !1 == e ? t : r;
      let ia = [[0, 0, 0, 0, 0, 0, x, x, A, A, x, x, x, x, x, A, A, x, x, x, x, x], [0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0, x, x, 0, x, 0, 0, 0, x, x, 0, x], [0, 0, 0, 0, 0, 0, 0, 0, A, 0, 0, 0, x, 0, 0, A, 0, 0, 0, x, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, A, 0, 0, 0, 0, x, x, A, 0, 0, 0, 0, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, x, x, x, 0, 0, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, 0, A, x, x, x, x, x, 0, A, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, x, x, x, A, A, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, x, x, x, A, A, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, x, x, x, A, A, x, x, x, x, x], [0, 0, 0, 0, 0, 0, 0, 0, A, A, x, x, x, x, x, A, A, x, x, x, x, x]];
      this.modifyGrid(this.hiddenHeight - 2, ia, e), this.modifyPreview(!1 == e ? [c, c, c, o] : [c, c, c, f], 130), this.frenzy.requireLines = 14
     }
    }
  }
  this.aiFrenzyEvaluator(phase, $, i, e);
 }

 toFrenzyMasterMap(phase, aA, bB, cC) {
  var mapSet = Math.round(6 * aA),
   map = Math.round(2 * bB),
   boolean = cC / .5 > 1;
  let [z, l, o, s, i, j, t] = [2, 3, 4, 5, 6, 7, 8], [qz, ql, qo, qs, qi, qj, qt] = [0, 1, 2, 3, 4, 5, 6];
  let _;
  if (phase <= 3) {
   _ = {
    0: {
     0: function(flip) {
      let a = i,
       grid = [
       	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, 0, a, a, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a]];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([qi], 100);
      this.frenzy.requireLines = 5;
     },
     1: function(flip) {
      let a = i,
       grid = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, 0]];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([qi], 100);
      this.frenzy.requireLines = 6;
     },
     2: function(flip) {
      let a = i,
       grid = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a]];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([qi], 100);
      this.frenzy.requireLines = 5;
     },
    },
    1: {
     0: function(flip) {
      let a = flip ? j : l,
       grid = [
       	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, 0, 0, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, 0, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, 0, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a]];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview(flip ? [qj] : [ql], 100);
      this.frenzy.requireLines = 6;
     },
     1: function(flip) {
      let a = flip ? j : l,
       grid = [
       	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, 0, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, 0, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, 0, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, 0, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, 0, 0, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a]];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview(flip ? [qj] : [ql], 100);
      this.frenzy.requireLines = 6;
     },
     2: function(flip) {
      let a = flip ? j : l,
       grid = [
       	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, 0, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, 0, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a]];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview(flip ? [qj] : [ql], 100);
      this.frenzy.requireLines = 4;
     },
    },
    2: {
     0: function(flip) {
      let a = flip ? j : l,
       b = flip ? l : j,
       grid = [
       	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, 0, b, b, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, 0, 0, b, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, b, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, 0, 0, 0, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, 0, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a]];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview(flip ? [qj, ql] : [ql, qj], 100);
      this.frenzy.requireLines = 6;
     },
     1: function(flip) {
      let b = flip ? j : l,
       a = flip ? l : j,
       grid = [
       	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, 0, b, a, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, 0, b, a, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, b, b, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, b, b, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, b, b, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a]];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview(!flip ? [qj, ql] : [ql, qj], 100);
      this.frenzy.requireLines = 6;
     },
     2: function(flip) {
      let b = flip ? j : l,
       a = flip ? l : j,
       grid = [
       	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, 0, b, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, 0, b, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, 0, 0, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, 0, b, b, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, 0, b, b, 0, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, b, b, 0, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a]];

      this.modifyGrid(this.hiddenHeight - 2, grid, !flip);
      this.modifyPreview(!flip ? [qj, ql] : [ql, qj], 100);
      this.frenzy.requireLines = 6;
     },

    },
    3: {
     0: function(flip) {
      let a = s,
       grid = [
       	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, 0, 0, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, 0, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a]];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([qs], 100);;
      this.frenzy.requireLines = 6;
     },
     1: function(flip) {
      let a = z,
       grid = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, 0, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, 0, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a, a]];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([qz], 100);
      this.frenzy.requireLines = 6;
     },
     2: function(flip) {
      let a = s,
       grid = [
       	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, 0, 0, 0, 0, 0, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a, a],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, a, a, a, a, a]];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([qs], 100);
      this.frenzy.requireLines = 6;
     },
    },
    4: {
     0: function(flip) {
      let b = flip ? z : s,
       a = flip ? s : z,
       grid = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, 0, 0, 0, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, b, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, b, b, 0, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a, a, b, b, a, a]];

      this.modifyGrid(this.hiddenHeight - 2, grid, !flip);
      this.modifyPreview(flip ? [qs, qz] : [qz, qs], 100);
      this.frenzy.requireLines = 6;
     },
     1: function(flip) {
      ;
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    5: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    6: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
   } [mapSet][map].bind(this)(boolean);
  }
  if (phase >= 4 && phase < 7) {
   _ = {
    0: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    1: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    2: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    3: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    4: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    5: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    6: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
   } [mapSet][map].bind(this)(boolean);
  }
  if (phase >= 7 && phase < 10) {
   _ = {
    0: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    1: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    2: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    3: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    4: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    5: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    6: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
   } [mapSet][map].bind(this)(boolean);
  }
  if (phase >= 10 && phase < 13) {
   _ = {
    0: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    1: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    2: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    3: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    4: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    5: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    6: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
   } [mapSet][map].bind(this)(boolean);
  }
  if (phase >= 13) {
   _ = {
    0: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    1: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    2: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    3: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    4: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    5: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
    6: {
     0: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     1: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
     2: function(flip) {
      let a = i,
       grid = [];

      this.modifyGrid(this.hiddenHeight - 2, grid, flip);
      this.modifyPreview([], 100);
      this.frenzy.requireLines = 8;
     },
    },
   } [mapSet][map].bind(this)(boolean);
  }
 }
 aiFrenzyEvaluator(phase, color, map, flip) {
  let isAnotherWay = Math.round(Math.random()) == 0;
  if (phase >= 7 && phase < 10) {
   switch (color) {
    case 0: {
     switch (map) {
      case 0: {
       this.ai.extraMovements = [];
       break;
      }
      case 1: {
       this.ai.extraMovements = flip ? [3, 3, 3, 5, 1, 4, 4, 1, 4, 1, 5, 3, 2, 5, 1, 5, 3, 1, 4, 4, 4, 1] : [4, 4, 4, 6, 1, 3, 3, 1, 3, 1, 6, 4, 2, 6, 1, 6, 4, 1, 3, 3, 3, 1]
       break;
      }
      case 2: {
       this.ai.extraMovements = [];;
       break;
      }
     }
     break;
    }
    case 1: {
     switch (map) {
      case 0: {
       this.ai.extraMovements = flip ? [5, 3, 3, 3, 1, 5, 2, 5, 1, 6, 1, 4, 4, 6, 1, 6, 4, 4, 4, 4, 1, 5, 1] : [6, 4, 4, 4, 4, 1, 6, 4, 2, 6, 1, 6, 1, 3, 5, 1, 5, 3, 3, 3, 1, 6, 4, 1];
       break;
      }
      case 1: {
       this.ai.extraMovements = flip ? [5, 3, 3, 3, 1, 5, 4, 4, 2, 5, 1, 5, 1, 6, 4, 1, 4, 4, 4, 4, 5, 1, 3, 5, 1] : [6, 4, 4, 4, 4, 1, 6, 3, 2, 6, 1, 4, 6, 1, 5, 1, 3, 3, 3, 6, 1, 4, 4, 6, 1];
       break;
      }
      case 2: {
       this.ai.extraMovements = flip ? [6, 4, 4, 4, 4, 1, 4, 6, 1, 5, 2, 5, 1, 4, 4, 4, 4, 5, 1, 5, 1, 5, 3, 3, 3, 1] : [5, 3, 3, 3, 1, 5, 1, 4, 6, 2, 6, 1, 3, 3, 3, 6, 1, 4, 6, 1, 6, 4, 4, 4, 4, 1];
       break;
      }
     }
     break;
    }
    case 2: {
     switch (map) {
      case 0: {
       this.ai.extraMovements = flip ? [6, 4, 4, 4, 4, 1, 6, 4, 2, 6, 1, 3, 6, 1, 5, 3, 1, 5, 3, 3, 3, 1, 6, 4, 4, 1] : [5, 3, 3, 3, 1, 5, 2, 5, 1, 6, 4, 1, 4, 4, 6, 1, 6, 4, 4, 4, 4, 1, 5, 3, 1];
       break;
      }
      case 1: {
       this.ai.extraMovements = flip ? [5, 2, 5, 1, 6, 1, 4, 6, 2, 6, 1, 3, 5, 1, 5, 3, 3, 3, 1, 6, 4, 4, 4, 4, 1] : [6, 4, 2, 6, 1, 6, 1, 5, 2, 5, 1, 4, 4, 6, 1, 6, 4, 4, 4, 4, 1, 5, 3, 3, 3, 1];
       break;
      }
      case 2: {
       this.ai.extraMovements = flip ? [5, 3, 2, 5, 1, 6, 3, 3, 3, 2, 6, 1, 5, 4, 4, 2, 4, 5, 1, 4, 4, 6, 1, 3, 5, 1, 6, 1] : [6, 4, 4, 2, 6, 1, 5, 4, 4, 4, 4, 2, 5, 1, 2, 6, 3, 6, 1, 3, 5, 1, 4, 4, 6, 1, 6, 1];
       break;
      }
     }
     break;
    }
    case 3: {
     switch (map) {
      case 0: {
       if (isAnotherWay) {
        this.ai.extraMovements = flip ? [4, 7, 1, 4, 2, 5, 2, 6, 1, 3, 3, 7, 1, 3, 5, 2, 6, 1, 4, 4, 4, 4, 7, 1, 4, 4, 4, 5, 4, 4, 2, 6, 1] : [7, 1, 6, 3, 2, 5, 1, 4, 4, 4, 7, 1, 6, 4, 4, 2, 5, 1, 3, 3, 3, 7, 1, 3, 3, 6, 3, 3, 2, 5, 1];
       } else {
        this.ai.extraMovements = flip ? [4, 7, 1, 4, 2, 5, 2, 6, 1, 5, 3, 3, 3, 3, 1, 5, 3, 2, 6, 1, 3, 3, 6, 1, 4, 4, 4, 5, 1, 5, 4, 4, 4, 4, 4, 2, 6, 1, 6, 4, 4, 4, 4, 1] : [7, 1, 6, 3, 2, 5, 1, 4, 4, 4, 4, 6, 1, 4, 4, 6, 2, 5, 1, 4, 4, 4, 5, 1, 3, 3, 6, 1, 6, 3, 3, 3, 3, 2, 5, 1, 5, 3, 3, 3, 3, 1];
       }
       break;
      }
      case 1: {
       if (isAnotherWay) {
        this.ai.extraMovements = flip ? [4, 4, 4, 4, 7, 1, 4, 4, 4, 5, 2, 6, 1, 7, 1, 3, 5, 2, 6, 1, 4, 4, 4, 7, 1, 4, 4, 5, 2, 6, 1] : [3, 3, 3, 7, 1, 3, 3, 6, 2, 5, 1, 4, 7, 1, 4, 4, 6, 2, 5, 1, 3, 3, 7, 1, 6, 3, 2, 5, 1];
       } else {
        this.ai.extraMovements = flip ? [4, 4, 4, 4, 7, 1, 4, 4, 4, 5, 2, 6, 1, 7, 1, 3, 5, 1, 5, 3, 3, 3, 2, 7, 1, 4, 4, 4, 7, 1, 4, 4, 5, 1, 5, 2, 7, 1] : [3, 3, 3, 7, 1, 3, 3, 6, 2, 5, 1, 4, 7, 1, 4, 4, 6, 1, 4, 6, 4, 4, 4, 2, 7, 1, 3, 3, 7, 1, 6, 3, 1, 6, 4, 2, 7, 1];
       }
       break;
      }
      case 2: {
       if (isAnotherWay) {
        this.ai.extraMovements = flip ? [4, 7, 1, 3, 7, 1, 3, 3, 3, 7, 1, 4, 4, 4, 4, 5, 2, 6, 1, 4, 4, 5, 2, 6, 1] : [7, 1, 4, 4, 7, 1, 4, 4, 4, 4, 7, 1, 3, 3, 3, 6, 2, 5, 1, 3, 6, 2, 5, 1];
       } else {
        this.ai.extraMovements = flip ? [4, 7, 1, 3, 7, 1, 3, 3, 3, 7, 1, 4, 4, 4, 4, 5, 2, 6, 1, 4, 4, 5, 1, 5, 2, 7, 1] : [7, 1, 4, 4, 7, 1, 4, 4, 4, 4, 7, 1, 3, 3, 3, 6, 2, 5, 1, 3, 6, 1, 4, 6, 2, 7, 1];
       }
       break;
      }
     }
     break;
    }
    case 4: {
     switch (map) {
      case 0: {
       this.ai.extraMovements = flip ? [3, 3, 7, 1, 3, 5, 2, 6, 1, 4, 7, 1, 6, 2, 5, 1, 4, 4, 4, 4, 7, 1, 5, 4, 4, 4, 4, 4, 2, 6, 1] : [4, 4, 4, 7, 1, 4, 4, 6, 2, 5, 1, 7, 1, 4, 5, 2, 6, 1, 3, 3, 3, 7, 1, 6, 3, 3, 3, 3, 2, 5, 1];
       break;
      }
      case 1: {
       if (isAnotherWay) {
        this.ai.extraMovements = flip ? [4, 4, 4, 4, 7, 1, 4, 7, 1, 4, 4, 5, 2, 6, 1, 6, 2, 5, 1, 3, 3, 7, 1, 3, 3, 7, 1] : [3, 3, 3, 7, 1, 7, 1, 3, 6, 2, 5, 1, 4, 5, 2, 6, 1, 4, 4, 4, 7, 1, 4, 4, 4, 7, 1];
       } else {
        this.ai.extraMovements = flip ? [4, 4, 4, 4, 7, 1, 4, 7, 1, 4, 4, 5, 2, 6, 1, 6, 2, 5, 1, 3, 3, 7, 1, 3, 3, 1, 3, 5, 1] : [3, 3, 3, 7, 1, 7, 1, 3, 6, 2, 5, 1, 4, 5, 2, 6, 1, 4, 4, 4, 7, 1, 4, 4, 4, 1, 4, 4, 6, 1];
       }
       break;
      }
      case 2: {
       this.ai.extraMovements = flip ? [4, 4, 4, 4, 5, 1, 3, 3, 3, 6, 1, 4, 4, 5, 2, 6, 1, 3, 6, 2, 5, 1, 4, 4, 4, 7, 1, 3, 3, 7, 1] : [3, 3, 3, 6, 1, 4, 4, 4, 4, 5, 1, 3, 6, 2, 5, 1, 4, 4, 5, 2, 6, 1, 3, 3, 7, 1, 4, 4, 4, 7, 1];
       break;
      }
     }
     break;
    }
    case 5: {
     switch (map) {
      case 0: {
       this.ai.extraMovements = flip ? [5, 3, 3, 3, 1, 5, 3, 3, 3, 1, 7, 4, 1, 6, 1, 5, 2, 5, 1, 4, 4, 4, 4, 5, 1] : [6, 4, 4, 4, 4, 1, 6, 4, 4, 4, 4, 1, 7, 1, 6, 1, 4, 6, 2, 6, 1, 3, 3, 3, 6, 1];
       break;
      }
      case 1: {
       this.ai.extraMovements = flip ? [5, 3, 3, 2, 5, 1, 3, 3, 3, 1, 4, 6, 2, 6, 1, 4, 1, 4, 4, 4, 4, 7, 1, 4, 4, 4, 1] : [4, 4, 4, 6, 2, 6, 1, 4, 4, 4, 1, 5, 2, 5, 1, 3, 1, 3, 3, 3, 7, 1, 3, 3, 3, 1];
       break;
      }
      case 2: {
       this.ai.extraMovements = flip ? [5, 3, 3, 3, 1, 7, 3, 3, 3, 1, 4, 4, 4, 4, 7, 1, 6, 4, 4, 4, 2, 6, 1, 5, 3, 3, 3, 1, 7, 3, 3, 3, 1] : [6, 4, 4, 4, 4, 1, 7, 4, 4, 4, 4, 1, 3, 3, 3, 7, 1, 5, 3, 3, 2, 5, 1, 6, 4, 4, 4, 4, 1, 7, 4, 4, 4, 4, 1];
       break;
      }
     }
     break;
    }
    case 6: {
     switch (map) {
      case 0: {
       if (isAnotherWay) {
        this.ai.extraMovements = flip ? [3, 3, 5, 2, 5, 1, 3, 3, 3, 7, 1, 4, 4, 4, 4, 7, 1, 5, 4, 4, 4, 4, 4, 2, 5, 1, 4, 4, 5, 2, 5, 1, 4, 7, 1] : [4, 4, 4, 6, 2, 6, 1, 7, 4, 4, 4, 4, 1, 3, 3, 3, 7, 1, 3, 3, 3, 6, 3, 2, 6, 1, 6, 2, 3, 6, 1, 7, 1];
       } else {
        this.ai.extraMovements = flip ? [3, 3, 5, 2, 5, 1, 3, 3, 3, 7, 1, 4, 4, 4, 4, 7, 1, 5, 4, 4, 4, 4, 4, 2, 5, 1, 4, 4, 5, 2, 5, 1, 4, 6, 1, 5, 1] : [4, 4, 4, 6, 2, 6, 1, 7, 4, 4, 4, 4, 1, 3, 3, 3, 7, 1, 3, 3, 3, 6, 3, 2, 6, 1, 6, 2, 3, 6, 1, 6, 1, 3, 5, 1];
       }
       break;
      }
      case 1: {
       if (isAnotherWay) {
        this.ai.extraMovements = []
       } else {
        this.ai.extraMovements = flip ? [4, 4, 4, 4, 5, 1, 4, 4, 4, 4, 1, 4, 4, 4, 6, 1, 3, 3, 3, 5, 3, 1, 3, 3, 3, 6, 3, 1, 3, 3, 5, 1, 5, 4, 1, 4, 1, 7, 1] : [3, 3, 3, 6, 1, 3, 3, 3, 1, 3, 3, 5, 1, 4, 4, 4, 4, 6, 4, 1, 4, 4, 5, 4, 4, 4, 1, 4, 4, 4, 6, 1, 6, 1, 1, 4, 7, 1];
       }
       break;
      }
      case 2: {
       this.ai.extraMovements = []
       break;
      }
     }
     break;
    }
   }
  }
  if (phase >= 10 && phase < 13) {
   switch (color) {
    case 0: {
     switch (map) {
      case 0: {
       this.ai.extraMovements = flip ? [3, 3, 3, 5, 2, 5, 1, 3, 3, 3, 5, 1, 4, 4, 4, 6, 2, 6, 1, 4, 4, 4, 6, 1, 5, 2, 5, 1, 5, 1] : [4, 4, 4, 6, 2, 6, 1, 4, 4, 4, 6, 1, 3, 3, 3, 5, 2, 5, 1, 3, 3, 3, 5, 1, 6, 2, 6, 1, 6, 1];
       break;
      }
      case 1: {
       this.ai.extraMovements = flip ? [4, 4, 4, 6, 2, 6, 1, 4, 4, 4, 6, 1, 3, 3, 3, 6, 2, 6, 1, 3, 3, 3, 6, 1, 6, 1] : [3, 3, 3, 5, 2, 5, 1, 3, 3, 3, 5, 1, 4, 4, 4, 5, 2, 5, 1, 4, 4, 4, 5, 1, 5, 1];
       break;
      }
      case 2: {
       this.ai.extraMovements = flip ? [3, 3, 3, 6, 2, 5, 1, 3, 3, 5, 2, 5, 1, 3, 3, 3, 6, 1, 4, 4, 4, 5, 2, 5, 1, 4, 4, 6, 2, 6, 1, 4, 4, 4, 5, 1] : [4, 4, 4, 5, 2, 6, 1, 4, 4, 6, 2, 6, 1, 4, 4, 4, 5, 1, 3, 3, 3, 6, 2, 6, 1, 3, 3, 5, 2, 5, 1, 3, 3, 3, 6, 1];
       break;
      }
     }
     break;
    }
    case 1: {
     switch (map) {
      case 0: {
       if (isAnotherWay) {
        this.ai.extraMovements = flip ? [5, 3, 2, 5, 1, 5, 2, 4, 5, 1, 4, 2, 5, 4, 5, 1, 5, 4, 4, 4, 4, 4, 2, 5, 1, 4, 4, 4, 4, 5, 2, 5, 1, 4, 4, 5, 2, 5, 1] : [4, 4, 6, 2, 6, 1, 6, 2, 6, 1, 3, 3, 6, 2, 6, 1, 6, 3, 3, 3, 3, 2, 6, 1, 6, 3, 3, 3, 2, 6, 1, 3, 6, 2, 6, 1];
       } else {
        this.ai.extraMovements = flip ? [3, 3, 3, 1, 5, 2, 5, 1, 1, 6, 4, 2, 6, 1, 5, 4, 4, 4, 4, 4, 2, 5, 1, 4, 4, 4, 4, 5, 2, 5, 1, 4, 4, 5, 2, 5, 1] : [4, 4, 4, 4, 1, 4, 4, 4, 5, 2, 5, 1, 4, 1, 3, 6, 3, 2, 6, 1, 6, 3, 3, 3, 2, 3, 6, 1, 3, 3, 3, 6, 2, 6, 1, 2, 6, 6, 1];
       }
       break;
      }
      case 1: {
       this.ai.extraMovements = flip ? [6, 4, 4, 2, 6, 1, 4, 4, 2, 6, 1, 3, 5, 2, 5, 1, 5, 2, 5, 1, 4, 4, 2, 5, 5, 1] : [3, 5, 2, 5, 1, 3, 2, 5, 1, 4, 4, 6, 2, 6, 1, 6, 4, 2, 6, 1, 3, 3, 2, 6, 6, 1];
       break;
      }
      case 2: {
       this.ai.extraMovements = flip ? [3, 3, 5, 2, 5, 1, 5, 2, 5, 1, 4, 4, 4, 6, 2, 6, 1, 3, 4, 4, 4, 4, 5, 4, 2, 5, 1, 3, 2, 4, 5, 1] : [4, 4, 4, 6, 2, 6, 1, 6, 4, 2, 6, 1, 5, 3, 3, 2, 5, 1, 6, 3, 3, 3, 2, 6, 1, 4, 4, 2, 3, 6, 1];
       break;
      }
     }
     break;
    }
    case 2: {
     switch (map) {
      case 0: {
       this.ai.extraMovements = flip ? [5, 4, 4, 4, 4, 4, 2, 5, 1, 6, 3, 3, 3, 3, 2, 6, 1, 4, 4, 4, 5, 2, 5, 1, 2, 6, 3, 6, 1, 4, 2, 5, 4, 5, 1, 2, 6, 3, 6, 1] : [6, 3, 3, 3, 3, 2, 6, 1, 5, 4, 4, 4, 4, 4, 2, 5, 1, 6, 3, 3, 2, 6, 1, 4, 5, 4, 4, 2, 5, 1, 2, 6, 3, 6, 1, 2, 5, 4, 5, 1];
       break;
      }
      case 1: {
       this.ai.extraMovements = flip ? [4, 4, 4, 4, 5, 1, 2, 4, 4, 4, 5, 1, 3, 5, 2, 5, 1, 5, 1, 2, 6, 1, 6, 2, 6, 1] : [3, 3, 3, 6, 1, 2, 3, 3, 6, 1, 2, 4, 4, 6, 6, 1, 4, 6, 1, 2, 4, 5, 1, 2, 5, 4, 5, 1];
       break;
      }
      case 2: {
       this.ai.extraMovements = flip ? [4, 4, 4, 4, 5, 4, 2, 5, 1, 6, 3, 3, 3, 3, 2, 6, 1, 2, 6, 1, 4, 4, 4, 6, 2, 6, 1, 3, 3, 5, 2, 5, 1, 4, 2, 5, 1] : [3, 3, 3, 6, 3, 2, 6, 1, 4, 4, 4, 4, 5, 4, 2, 5, 1, 4, 2, 5, 1, 3, 3, 5, 2, 5, 1, 4, 4, 4, 6, 2, 6, 1, 2, 6, 1];
       break;
      }
     }
     break;
    }
    case 3: {
     switch (map) {
      case 0: {
       this.ai.extraMovements = flip ? [3, 3, 5, 2, 6, 1, 4, 5, 2, 6, 1, 5, 4, 4, 4, 4, 4, 2, 6, 1, 5, 2, 6, 1, 4, 4, 4, 5, 2, 6, 1, 4, 4, 5, 2, 6, 1] : [4, 4, 4, 6, 2, 5, 1, 6, 2, 5, 1, 3, 6, 3, 3, 3, 2, 5, 1, 4, 6, 2, 5, 1, 3, 3, 6, 2, 5, 1, 3, 6, 2, 5, 1];
       break;
      }
      case 1: {
       this.ai.extraMovements = flip ? [4, 4, 5, 2, 6, 1, 4, 5, 2, 6, 6, 1, 4, 5, 2, 6, 1, 4, 4, 5, 2, 6, 6, 1, 4, 4, 5, 2, 6, 1, 4, 5, 2, 6, 1] : [3, 6, 2, 5, 1, 6, 2, 5, 5, 1, 6, 2, 5, 1, 3, 6, 2, 5, 5, 1, 6, 3, 2, 5, 1, 6, 2, 5, 1];
       break;
      }
      case 2: {
       this.ai.extraMovements = flip ? [5, 4, 4, 4, 4, 4, 2, 6, 1, 3, 3, 5, 2, 6, 1, 5, 4, 4, 4, 4, 4, 2, 6, 6, 1, 5, 4, 4, 4, 4, 4, 2, 6, 1, 3, 3, 5, 2, 6, 1, 5, 4, 4, 4, 4, 4, 2, 6, 1] : [6, 3, 3, 3, 3, 2, 5, 1, 6, 4, 4, 4, 2, 5, 1, 6, 3, 3, 3, 3, 2, 5, 5, 1, 6, 3, 3, 3, 3, 2, 5, 1, 6, 4, 4, 4, 2, 5, 1, 6, 3, 3, 3, 3, 2, 5, 1];
       break;
      }
     }
     break;
    }
    case 4: {
     switch (map) {
      case 0: {
       this.ai.extraMovements = flip ? [4, 4, 4, 2, 3, 3, 6, 1, 3, 3, 2, 4, 5, 1, 4, 4, 4, 4, 5, 2, 6, 1, 3, 3, 3, 6, 2, 5, 1, 4, 4, 4, 2, 3, 3, 6, 1, 3, 3, 2, 4, 5, 1] : [3, 3, 2, 4, 5, 1, 4, 4, 4, 2, 3, 3, 6, 1, 3, 3, 3, 6, 2, 5, 1, 4, 4, 4, 4, 5, 2, 6, 1, 3, 3, 2, 4, 5, 1, 4, 4, 4, 2, 3, 3, 6, 1, 3, 3, 3, 6, 2, 5, 1];
       break;
      }
      case 1: {
       this.ai.extraMovements = flip ? [4, 4, 5, 2, 6, 1, 3, 6, 2, 5, 1, 4, 4, 5, 2, 6, 1, 3, 6, 2, 5, 1, 4, 4, 5, 2, 6, 1, 3, 6, 2, 5, 1] : [3, 6, 2, 5, 1, 4, 4, 5, 2, 6, 1, 3, 6, 2, 5, 1, 4, 4, 5, 2, 6, 1, 3, 6, 2, 5, 1, 4, 4, 5, 2, 6, 1];
       break;
      }
      case 2: {
       this.ai.extraMovements = flip ? [4, 4, 4, 4, 5, 2, 6, 6, 1, 4, 4, 4, 4, 5, 2, 6, 1, 3, 3, 3, 6, 2, 5, 5, 1, 3, 3, 3, 6, 2, 5, 1, 4, 4, 4, 4, 5, 2, 6, 1, 4, 4, 5, 2, 6, 1] : [3, 3, 3, 6, 2, 5, 5, 1, 3, 3, 3, 6, 2, 5, 1, 4, 4, 4, 4, 5, 2, 6, 6, 1, 4, 4, 4, 4, 5, 2, 6, 1, 3, 3, 3, 6, 2, 5, 1, 3, 6, 2, 5, 1];
       break;
      }
     }
     break;
    }
    case 5: {
     switch (map) {
      case 0: {
       if (isAnotherWay) {
        this.ai.extraMovements = flip ? [2, 3, 3, 6, 1, 2, 3, 3, 6, 1, 4, 4, 4, 5, 2, 5, 1, 4, 4, 4, 5, 2, 5, 1, 4, 4, 4, 5, 2, 5, 1] : [2, 4, 4, 4, 5, 1, 2, 4, 4, 4, 5, 1, 3, 3, 6, 2, 6, 1, 3, 3, 6, 2, 6, 1, 3, 3, 6, 2, 6, 1];
       } else {
        this.ai.extraMovements = flip ? [2, 3, 3, 6, 1, 2, 3, 3, 6, 1, 4, 4, 4, 5, 2, 5, 1, 4, 4, 4, 5, 2, 5, 1, 4, 4, 4, 5, 2, 7, 1, 4, 4, 5, 1] : [2, 4, 4, 4, 5, 1, 2, 4, 4, 4, 5, 1, 3, 3, 6, 2, 6, 1, 3, 3, 6, 2, 6, 1, 3, 3, 6, 2, 7, 1, 3, 6, 1];
       }
       break;
      }
      case 1: {
       if (isAnotherWay) {
        this.ai.extraMovements = flip ? [4, 4, 4, 2, 3, 6, 1, 3, 2, 4, 5, 1, 3, 3, 3, 6, 2, 6, 1, 4, 4, 4, 4, 5, 2, 5, 1, 3, 3, 3, 6, 2, 6, 1, 4, 4, 4, 4, 5, 2, 5, 1] : [3, 3, 2, 4, 5, 1, 4, 4, 4, 2, 3, 3, 6, 1, 4, 4, 4, 4, 5, 2, 5, 1, 3, 3, 3, 6, 2, 6, 1, 4, 4, 4, 4, 5, 2, 5, 1, 3, 3, 3, 6, 2, 6, 1];
       } else {
        this.ai.extraMovements = flip ? [4, 4, 4, 2, 3, 6, 1, 3, 2, 4, 5, 1, 3, 3, 3, 6, 2, 6, 1, 4, 4, 4, 4, 5, 2, 5, 1, 3, 3, 3, 6, 2, 7, 1, 3, 3, 6, 1, 4, 4, 4, 4, 5, 2, 7, 1, 4, 4, 4, 5, 1] : [3, 3, 2, 4, 5, 1, 4, 4, 4, 2, 3, 3, 6, 1, 4, 4, 4, 4, 5, 2, 5, 1, 3, 3, 3, 6, 2, 6, 1, 4, 4, 4, 4, 5, 2, 7, 1, 4, 4, 4, 5, 1, 3, 3, 3, 6, 2, 7, 1, 3, 3, 6, 1];

       }
       break;
      }
      case 2: {
       this.ai.extraMovements = flip ? [4, 4, 2, 3, 6, 6, 1, 4, 4, 2, 3, 6, 6, 1, 4, 4, 2, 3, 6, 6, 1, 4, 4, 2, 3, 6, 6, 1, 4, 4, 2, 3, 6, 1, 4, 4, 2, 3, 6, 1] : [3, 2, 4, 5, 5, 1, 3, 2, 4, 5, 5, 1, 3, 2, 4, 5, 5, 1, 3, 2, 4, 5, 5, 1, 3, 2, 4, 5, 1, 3, 2, 4, 5, 1];
       break;
      }
     }
     break;
    }
    case 6: {
     switch (map) {
      case 0: {
       this.ai.extraMovements = flip ? [4, 2, 4, 4, 5, 1, 4, 2, 4, 4, 5, 1, 6, 2, 6, 1, 2, 5, 5, 1, 6, 2, 6, 1, 2, 5, 5, 1] : [2, 3, 3, 6, 1, 2, 3, 3, 6, 1, 4, 5, 2, 5, 1, 4, 2, 6, 6, 1, 4, 5, 2, 5, 1, 4, 2, 6, 6, 1];
       break;
      }
      case 1: {
       this.ai.extraMovements = flip ? [3, 2, 3, 6, 1, 3, 2, 3, 6, 1, 4, 4, 4, 6, 2, 6, 1, 5, 4, 4, 4, 4, 4, 2, 6, 1, 4, 4, 4, 6, 2, 6, 1, 5, 4, 4, 4, 4, 4, 2, 6, 1] : [4, 4, 2, 4, 5, 1, 4, 4, 2, 4, 5, 1, 3, 3, 5, 2, 5, 1, 6, 3, 3, 3, 3, 2, 5, 1, 3, 3, 5, 2, 5, 1, 6, 3, 3, 3, 3, 2, 5, 1];
       break;
      }
      case 2: {
       this.ai.extraMovements = flip ? [5, 2, 6, 6, 1, 5, 2, 6, 6, 1, 4, 4, 4, 4, 5, 4, 2, 5, 1, 5, 2, 5, 1, 4, 4, 4, 4, 5, 4, 2, 6, 1, 4, 4, 4, 4, 5, 4, 2, 5, 1] : [4, 6, 2, 5, 5, 1, 4, 6, 2, 5, 5, 1, 6, 3, 3, 3, 3, 2, 6, 1, 4, 6, 2, 6, 1, 6, 3, 3, 3, 3, 2, 5, 1, 6, 3, 3, 3, 3, 2, 6, 1];
       break;
      }
     }
     break;
    }
   }
  }
  if (phase >= 13) {
   switch (color) {
    case 0: {
     switch (map) {
      case 0: {
       this.ai.extraMovements = flip ? [6, 3, 3, 3, 2, 6, 1, 6, 3, 3, 3, 2, 5, 1, 5, 3, 3, 2, 5, 1, 6, 3, 3, 3, 1, 5, 4, 4, 4, 2, 5, 1, 6, 4, 4, 2, 6, 1, 5, 4, 4, 4, 2, 5, 1, 6, 4, 4, 1, 3, 3, 3, 5, 2, 5, 1, 3, 3, 3, 5, 1] : [5, 4, 4, 4, 2, 5, 1, 6, 4, 4, 2, 6, 1, 5, 4, 4, 4, 2, 5, 1, 4, 4, 6, 1, 3, 6, 3, 3, 2, 6, 1, 5, 3, 3, 2, 5, 1, 3, 3, 6, 3, 2, 6, 1, 3, 3, 3, 6, 1, 4, 4, 4, 6, 2, 6, 1, 4, 4, 4, 6, 1];
       break;
      }
      case 1: {
       this.ai.extraMovements = flip ? [3, 3, 3, 6, 2, 6, 1, 3, 3, 3, 6, 1, 4, 4, 4, 5, 2, 5, 1, 4, 4, 4, 5, 1, 3, 6, 2, 6, 1, 3, 6, 1, 4, 4, 5, 2, 5, 1, 4, 4, 5, 1] : [4, 4, 4, 5, 2, 5, 1, 4, 4, 4, 5, 1, 3, 3, 3, 6, 2, 6, 1, 3, 3, 3, 6, 1, 4, 5, 2, 5, 1, 6, 1, 3, 3, 6, 2, 6, 1, 3, 5, 1];
       break;
      }
      case 2: {
       this.ai.extraMovements = flip ? [3, 3, 3, 6, 2, 6, 1, 3, 3, 3, 6, 1, 3, 3, 3, 6, 2, 6, 1, 3, 3, 3, 6, 2, 6, 1, 3, 3, 5, 2, 5, 1, 3, 3, 5, 2, 6, 1, 3, 3, 5, 1] : [4, 4, 4, 5, 2, 5, 1, 4, 4, 4, 5, 1, 4, 4, 4, 5, 2, 5, 1, 4, 4, 4, 5, 2, 5, 1, 4, 4, 6, 2, 6, 1, 4, 4, 6, 2, 5, 1, 4, 4, 6, 1];
       break;
      }
     }
     break;
    }
    case 1: {
     switch (map) {
      case 0: {
       this.ai.extraMovements = flip ? [4, 4, 4, 2, 3, 6, 1, 3, 5, 2, 6, 6, 1, 4, 4, 4, 2, 3, 6, 1, 3, 5, 2, 6, 6, 1, 4, 4, 4, 2, 3, 6, 1] : [3, 3, 2, 4, 5, 1, 4, 4, 6, 2, 5, 5, 1, 3, 3, 2, 4, 5, 1, 4, 4, 6, 2, 5, 5, 1, 3, 3, 2, 4, 5, 1];
       break;
      }
      case 1: {
       this.ai.extraMovements = flip ? [2, 3, 3, 6, 1, 5, 4, 4, 4, 4, 4, 2, 6, 6, 1, 2, 3, 3, 6, 1, 5, 4, 4, 4, 4, 4, 2, 6, 6, 1, 2, 3, 3, 6, 1, 5, 4, 4, 4, 4, 4, 2, 6, 6, 1, 2, 3, 3, 6, 1] : [4, 2, 4, 4, 5, 1, 6, 3, 3, 3, 3, 2, 5, 5, 1, 4, 2, 4, 4, 5, 1, 6, 3, 3, 3, 3, 2, 5, 5, 1, 4, 2, 4, 4, 5, 1, 6, 3, 3, 3, 3, 2, 5, 5, 1, 4, 2, 4, 4, 5, 1];
       break;
      }
      case 2: {
       this.ai.extraMovements = flip ? [4, 2, 3, 3, 3, 6, 1, 4, 2, 3, 3, 6, 1, 4, 2, 3, 3, 6, 1, 4, 2, 3, 3, 6, 1, 4, 2, 3, 3, 3, 6, 1, ] : [2, 4, 4, 4, 5, 1, 2, 4, 4, 5, 1, 2, 4, 4, 5, 1, 2, 4, 4, 5, 1, 2, 4, 4, 4, 5, 1];
       break;
      }
     }
     break;
    }
    case 2: {
     switch (map) {
      case 0: {
       this.ai.extraMovements = flip ? [4, 2, 3, 3, 3, 6, 1, 4, 2, 4, 4, 5, 1, 4, 2, 3, 3, 3, 6, 1, 4, 2, 4, 4, 5, 1, 4, 2, 3, 3, 6, 1] : [2, 4, 4, 4, 5, 1, 2, 3, 3, 6, 1, 2, 4, 4, 4, 5, 1, 2, 3, 3, 6, 1, 2, 4, 5, 1];
       break;
      }
      case 1: {
       this.ai.extraMovements = flip ? [4, 4, 4, 4, 2, 3, 3, 3, 6, 1, 6, 3, 2, 5, 5, 1, 4, 4, 4, 4, 2, 3, 3, 3, 6, 1, 6, 3, 2, 5, 5, 1, 4, 4, 4, 4, 2, 3, 3, 3, 6, 1] : [6, 3, 2, 5, 5, 1, 4, 4, 4, 4, 2, 3, 3, 3, 6, 1, 6, 3, 2, 5, 5, 1, 4, 4, 4, 4, 2, 3, 3, 3, 6, 1, 6, 3, 2, 5, 5, 1];
       break;
      }
      case 2: { //also Tspin
       this.ai.extraMovements = flip ? [2, 3, 3, 6, 1, 2, 4, 4, 4, 5, 1, 2, 3, 3, 6, 1, 2, 4, 4, 4, 5, 1, 2, 3, 3, 6, 1, 2, 4, 4, 4, 5, 1, 2, 3, 3, 6, 1] : [2, 4, 4, 4, 5, 1, 2, 3, 3, 6, 1, 2, 4, 4, 4, 5, 1, 2, 3, 3, 6, 1, 2, 4, 4, 4, 5, 1, 2, 3, 3, 6, 1, 2, 4, 4, 4, 5, 1];
       break;
      }
     }
     break;
    }
    case 3: {
     switch (map) {
      case 0: {
       this.ai.extraMovements = flip ? [4, 4, 4, 2, 6, 1, 2, 6, 1, 3, 3, 3, 2, 6, 1, 2, 6, 1, 4, 4, 4, 2, 6, 1] : [3, 3, 2, 5, 1, 4, 2, 5, 1, 4, 4, 4, 4, 2, 5, 1, 4, 2, 5, 1, 3, 3, 2, 5, 1];
       break;
      }
      case 1: {
       this.ai.extraMovements = flip ? [4, 4, 6, 2, 5, 5, 1, 3, 3, 2, 4, 5, 1, 3, 3, 3, 2, 6, 1, 4, 4, 6, 2, 5, 5, 1, 3, 3, 2, 4, 5, 1] : [3, 5, 2, 6, 6, 1, 4, 4, 4, 2, 3, 6, 1, 4, 4, 4, 4, 2, 5, 1, 3, 5, 2, 6, 6, 1, 4, 4, 4, 2, 3, 6, 1];
       break;
      }
      case 2: {
       this.ai.extraMovements = flip ? [4, 4, 4, 4, 2, 6, 1, 2, 4, 5, 1, 2, 3, 6, 1, 6, 3, 3, 3, 3, 2, 6, 1, 2, 3, 6, 1] : [3, 3, 3, 2, 5, 1, 4, 2, 3, 6, 1, 4, 2, 4, 5, 1, 4, 4, 5, 4, 4, 4, 2, 5, 1, 4, 2, 4, 5, 1];
       break;
      }
     }
     break;
    }
    case 4: {
     switch (map) {
      case 0: {
       this.ai.extraMovements = flip ? [4, 4, 2, 6, 1, 4, 4, 4, 2, 5, 1, 4, 4, 2, 6, 1, 4, 4, 4, 2, 5, 1, 4, 4, 2, 6, 1] : [3, 2, 5, 1, 3, 3, 2, 6, 1, 3, 2, 5, 1, 3, 3, 2, 6, 1, 3, 2, 5, 1];
       break;
      }
      case 1: {
       this.ai.extraMovements = flip ? [2, 3, 3, 6, 1, 4, 4, 4, 2, 5, 1, 2, 3, 3, 6, 1, 4, 4, 4, 2, 5, 1, 2, 3, 3, 6, 1] : [4, 4, 4, 2, 5, 1, 2, 3, 3, 6, 1, 4, 4, 4, 2, 5, 1, 2, 3, 3, 6, 1, 4, 4, 4, 2, 5, 1];
       break;
      }
      case 2: {
       this.ai.extraMovements = flip ? [2, 6, 1, 4, 2, 4, 5, 1, 3, 3, 3, 2, 6, 1, 3, 3, 2, 5, 1, 4, 4, 4, 4, 2, 6, 1] : [2, 4, 5, 1, 2, 3, 6, 1, 4, 4, 4, 4, 2, 5, 1, 4, 4, 4, 2, 6, 1, 3, 3, 3, 2, 5, 1];
       break;
      }
     }
     break;
    }
    case 5: {
     switch (map) {
      case 0: {
       this.ai.extraMovements = flip ? [4, 4, 2, 3, 6, 1, 3, 3, 2, 4, 5, 1, 4, 4, 2, 3, 6, 1, 3, 3, 2, 4, 5, 1, 4, 4, 2, 3, 6, 1] : [3, 2, 4, 5, 1, 4, 4, 4, 2, 3, 6, 1, 3, 2, 4, 5, 1, 4, 4, 4, 2, 3, 6, 1, 3, 2, 4, 5, 1];
       break;
      }
      case 1: {
       this.ai.extraMovements = flip ? [2, 3, 3, 6, 1, 2, 4, 4, 4, 5, 1, 2, 3, 3, 6, 1, 2, 4, 4, 4, 5, 1, 2, 3, 3, 6, 1, 2, 4, 4, 4, 5, 1, 2, 3, 3, 6, 1] : [2, 4, 4, 4, 5, 1, 2, 3, 3, 6, 1, 2, 4, 4, 4, 5, 1, 2, 3, 3, 6, 1, 2, 4, 4, 4, 5, 1, 2, 3, 3, 6, 1, 2, 4, 4, 4, 5, 1];
       break;
      }
      case 2: {
       this.ai.extraMovements = flip ? [5, 4, 4, 4, 4, 4, 2, 6, 6, 1, 6, 3, 3, 3, 3, 2, 5, 5, 5, 1, 5, 4, 4, 4, 4, 4, 2, 6, 6, 1, 5, 4, 4, 4, 4, 4, 2, 6, 6, 1, 6, 3, 3, 3, 3, 2, 5, 5, 5, 1, 5, 4, 4, 4, 4, 4, 2, 6, 6, 1, 6, 3, 3, 3, 3, 2, 5, 5, 1] : [6, 3, 3, 3, 3, 2, 5, 5, 1, 5, 4, 4, 4, 4, 4, 2, 6, 6, 6, 1, 6, 3, 3, 3, 3, 2, 5, 5, 1, 6, 3, 3, 3, 3, 2, 5, 5, 1, 5, 4, 4, 4, 4, 4, 2, 6, 6, 6, 1, 6, 3, 3, 3, 3, 2, 5, 5, 1, 5, 4, 4, 4, 4, 4, 2, 6, 6, 1];
       break;
      }
     }
     break;
    }
    case 6: {
     switch (map) {
      case 0: {
       this.ai.extraMovements = flip ? [2, 4, 4, 4, 5, 1, 2, 4, 4, 4, 5, 1, 2, 4, 4, 4, 5, 1, 2, 4, 4, 4, 5, 1, 2, 4, 4, 4, 5, 1] : [2, 3, 3, 6, 1, 2, 3, 3, 6, 1, 2, 3, 3, 6, 1, 2, 3, 3, 6, 1, 2, 3, 3, 6, 1, ];
       break;
      }
      case 1: {
       this.ai.extraMovements = flip ? [2, 3, 3, 6, 1, 2, 3, 3, 6, 1, 2, 3, 3, 6, 1, 2, 3, 3, 6, 1, 2, 3, 3, 6, 1, ] : [2, 4, 4, 4, 5, 1, 2, 4, 4, 4, 5, 1, 2, 4, 4, 4, 5, 1, 2, 4, 4, 4, 5, 1, 2, 4, 4, 4, 5, 1];
       break;
      }
      case 2: {
       if (isAnotherWay) {
        this.ai.extraMovements = flip ? [2, 4, 4, 4, 5, 5, 5, 1, 2, 4, 4, 4, 5, 5, 5, 1, 2, 4, 4, 4, 5, 1, 4, 4, 5, 2, 5, 1, 2, 4, 4, 4, 5, 5, 5, 1, 2, 4, 4, 4, 5, 5, 5, 1, 2, 4, 4, 4, 5, 1, 4, 4, 5, 2, 5, 1] : [2, 3, 3, 6, 6, 6, 1, 2, 3, 3, 6, 6, 6, 1, 2, 3, 3, 6, 1, 3, 6, 2, 6, 1, 2, 3, 3, 6, 6, 6, 1, 2, 3, 3, 6, 6, 6, 1, 2, 3, 3, 6, 1, 3, 6, 2, 6, 1];
       } else {
        this.ai.extraMovements = flip ? [2, 4, 4, 4, 5, 6, 6, 3, 1, 2, 4, 4, 4, 5, 5, 5, 1, 2, 4, 4, 4, 5, 1, 4, 4, 5, 2, 5, 1, 2, 4, 4, 4, 5, 6, 6, 3, 1, 2, 4, 4, 4, 5, 5, 5, 1, 2, 4, 4, 4, 5, 1, 4, 4, 5, 2, 5, 1] : [2, 3, 3, 6, 5, 5, 4, 1, 2, 3, 3, 6, 6, 6, 1, 2, 3, 3, 6, 1, 3, 6, 2, 6, 1, 2, 3, 3, 6, 5, 5, 4, 1, 2, 3, 3, 6, 6, 6, 1, 2, 3, 3, 6, 1, 3, 6, 2, 6, 1];
       }
       break;
      }
     }
     break;
    }
   }
  }
 }

};