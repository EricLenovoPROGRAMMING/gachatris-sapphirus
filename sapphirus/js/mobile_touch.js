class MobileButton {
 constructor(event, img, type, func, px, py, lx, ly, len, height, dragTap) {
  this.portraitX = px;
  this.portraitY = py;
  this.landscapeX = lx;
  this.landscapeY = ly;
  this.sizeX = len;
  this.sizeY = height;
  this.image = new Image();
  this.src = img;
  this.image.src = img;
  this.type = type;
  this.func = func;
  this.id = `CONTROL-${event.toUpperCase()}`;
  this.active = true;
  this.isControllerActive = true;
  this.isWholeActive = true;
  this.isNotReplayToShow = true;
  this.dragTap = dragTap ? dragTap : false;
 };
 fire() {
  this.func();
 }
}

class MobileButtonSystem {
 constructor() {
  this.buttons = {};
  this.isActive = false;
  this.cellSize = 0;
  this.cellSizeX = 0;
  this.cellSizeY = 0;
  this.ratio = {
   width: 0,
   height: 0
  }

  /* this.ratio.width = SCREEN_WIDTH;
  this.ratio.height = SCREEN_HEIGHT;
  var aspectRatio = 16 / 9;
  if (SCREEN_WIDTH < SCREEN_HEIGHT) {
   this.ratio.height = Math.round(SCREEN_WIDTH * aspectRatio);
  } else {
   this.ratio.width = Math.round(SCREEN_HEIGHT * aspectRatio);
  }
  var aspectRatioResolution = Math.max(this.ratio.width, this.ratio.height);
  this.cellSize = Math.round(aspectRatioResolution / 50);
  this.cellSizeX = Math.round((Math.round(SCREEN_WIDTH * aspectRatio)) / 50);
  this.cellSizeY = Math.round((Math.round(SCREEN_HEIGHT * aspectRatio)) / 50);
*/
 }
 toggleControllers() {
  for (let buttons in this.buttons) {
   let btn = this.buttons[buttons];
   if (btn.type == "controller") btn.active = !btn.active;
  }
  this.checkButtons();
 }
 replayToggleControllers(bool) {
  for (let buttons in this.buttons) {
   let btn = this.buttons[buttons];
   if (btn.type == "controller") btn.isNotReplayToShow = bool;
  }
  this.checkButtons();
 }
 enableControllers(bool) {
  for (let buttons in this.buttons) {
   let btn = this.buttons[buttons];
   if (btn.type == "controller") btn.isControllerActive = bool;
  }
  this.checkButtons();
 }
 enableButtons(bool) {
  for (let buttons in this.buttons) {
   let btn = this.buttons[buttons];
   btn.isWholeActive = bool;
  }
  this.checkButtons();
 }
 checkButtons() {
  //var a = e => $IH("mobileButtonScreen", e),

  for (var e in this.buttons) {
   var o = this.buttons[e];
   var x = ((gameManager.orientation == "landscape" ? o.landscapeX : o.portraitX) / 100) * gameManager.viewW;
   var y = ((gameManager.orientation == "landscape" ? o.landscapeY : o.portraitY) / 100) * gameManager.viewH;
   var screen = Math.max(gameManager.viewW, gameManager.viewH) + Math.max(gameManager.paddingX, gameManager.paddingY);
   var padX = gameManager.orientation === "portrait" ? Math.max((((SCREEN_WIDTH * (16 / 9)) - SCREEN_HEIGHT) / 2) / 5148, 0) : 0,
    padY = gameManager.orientation === "portrait" ? (SCREEN_HEIGHT - gameManager.viewH) / 2 : 0;
   var id = $ID(o.id);
   id.style = `display:${o.active&&o.isWholeActive&&o.isControllerActive&&o.isNotReplayToShow?"block":"none"};opacity:${75}%;background:#938;top:${padY + y - (o.sizeY / 2)}px;left:${padX + x - (o.sizeX / 2)}px;width:${(o.sizeX / 100) * screen}px;height:${(o.sizeY / 100) * screen}px;position:absolute;pointer-events:none`;
  }
  //a(iH);
 };
 createButton(event, img, type, func, px, py, lx, ly, len, height) {
  if ((event in this.buttons)) return;
  this.buttons[event] = new MobileButton(event, img, type, func, px, py, lx, ly, len, height);
  $ELEM("gtris-mobile-button", button => {
   button.id = this.buttons[event].id;
    cacheManager.loadCache(img, (fname) => {
     let s = new Image();
     s.src = fname;
     return s;
    }, "characterimage", _img => {
     button.append(_img.value);
     $STYLEELEM(_img.value, "pointer-events", "none");
     $STYLEELEM(_img.value, "height", "100%");
     $STYLEELEM(_img.value, "width", "100%");
    });
   $ID("mobileButtonScreen").appendChild(button);
  })
  this.checkButtons();
 };
 showHide(bool) {
  this.isActive = bool;
  $STYLE("mobileButtonScreen", "display", bool ? "auto" : "none");
 }
 initiateButtons() {

  var NX = -90,
   NY = -90,
   AY = 6;
  this.createButton("harddrop", "assets/menu/control_mobile/harddrop.png", "controller", function() {
   if (gameManager.gameRunning && !gameManager.isPaused) gameManager.touchesPressed |= KEY_FLAGS.HARDDROP;
  }, 19, 67 + AY, 343*11, 47, 8.3, 8.3, true);
  this.createButton("softdrop", "assets/menu/control_mobile/softdrop.png", "controller", function() {
   if (gameManager.gameRunning && !gameManager.isPaused) gameManager.touchesPressed |= KEY_FLAGS.SOFTDROP;
  }, 19, 83 + AY, 334*11, 74, 8.3, 8.3, true);
  this.createButton("left", "assets/menu/control_mobile/left.png", "controller", function() {
   if (gameManager.gameRunning && !gameManager.isPaused) gameManager.touchesPressed |= KEY_FLAGS.LEFT;
  }, 4, 75 + AY, NX, NY, 8.3, 8.3, true);
  this.createButton("right", "assets/menu/control_mobile/right.png", "controller", function() {
   if (gameManager.gameRunning && !gameManager.isPaused) gameManager.touchesPressed |= KEY_FLAGS.RIGHT;
  }, 34, 75 + AY, NX, NY, 8.3, 8.3, true);

  this.createButton("hold", "assets/menu/control_mobile/hold.png", "controller", function() {
   if (gameManager.gameRunning && !gameManager.isPaused) gameManager.touchesPressed |= KEY_FLAGS.HOLD;
  }, 19 + 50, 67 + AY, NX, NY, 8.3, 8.3, true);
  this.createButton("ccw", "assets/menu/control_mobile/ccw.png", "controller", function() {
   if (gameManager.gameRunning && !gameManager.isPaused) gameManager.touchesPressed |= KEY_FLAGS.CCW;
  }, 19 + 50, 83 + AY, NX, NY, 8.3, 8.3, true);
  this.createButton("c180w", "assets/menu/control_mobile/c180w.png", "controller", function() {
   if (gameManager.gameRunning && !gameManager.isPaused) gameManager.touchesPressed |= KEY_FLAGS.C180W;
  }, 4 + 50, 75 + AY, NX, NY, 8.3, 8.3, true);
  this.createButton("cw", "assets/menu/control_mobile/cw.png", "controller", function() {
   if (gameManager.gameRunning && !gameManager.isPaused) gameManager.touchesPressed |= KEY_FLAGS.CW;
  }, 34 + 50, 75 + AY, NX, NY, 8.3, 8.3, true);

  this.createButton("restart", "assets/menu/control_mobile/restart.png", "button", function() {
   gameManager.prepareInitialization();
  }, 9, 1, -10, 6, 5, 5);
  this.createButton("controls", "assets/menu/control_mobile/ctrls.png", "button", function() {
   this.toggleControllers();
  }.bind(this), 25, 1, -10, 34, 5, 5);
  this.createButton("pause", "assets/menu/control_mobile/pause.png", "button", function() {
   gameManager.pauseGame(!gameManager.isPaused);
  }.bind(this), 40, 1, -10, 68.3, 5, 5);

  this.checkButtons()
  this.initialize();
  if (!window.mobileAndTabletCheck()) {
   this.toggleControllers();
   

  }
 }

 initialize() {
  var event = (e) => {
   //e.preventDefault();
   //e.stopPropagation() ; 
   if ((e.type == "touchstart" || (e.type == "touchmove") || e.type == "touchend") && (this.isActive)) {
    if (!gameManager.isReplay) gameManager.touchesPressed = 0;
    for (var touches = 0; touches < e.touches.length; touches++) {
     var tX = e.touches[touches].pageX;
     var tY = e.touches[touches].pageY;
     for (var i in this.buttons) {
      var button = $ID(this.buttons[i].id),
       buttonClass = this.buttons[i];
      var buttonOffsetTop = $RECT(this.buttons[i].id, "y");
      var buttonOffsetLeft = $RECT(this.buttons[i].id, "x");
      var buttonOffsetHeight = $RECT(this.buttons[i].id, "height");
      var buttonOffsetWidth = $RECT(this.buttons[i].id, "width");
      if (
       tX >= buttonOffsetLeft && tX < buttonOffsetWidth + buttonOffsetLeft &&
       tY >= buttonOffsetTop && tY < buttonOffsetHeight + buttonOffsetTop &&
       buttonClass.active && buttonClass.isWholeActive && buttonClass.isControllerActive &&
       buttonClass.isNotReplayToShow
      ) {
       if (e.type == "touchstart") $STYLE(buttonClass.id, "opacity", "100%");
       if (e.type == "touchend") $STYLE(buttonClass.id, "opacity", "75%");
       if ((e.type == "touchstart" || e.type == "touchend") || (buttonClass.dragTap && e.type == "touchmove")) buttonClass.func(e);
      } else {
       $STYLE(buttonClass.id, "opacity", "75%");
      }
     }
    }
   }
  }
  for (let p of ["start", "end"]) _doc.addEventListener(`touch${p}`, e => event(e), false);

 }
};

const mobileButtons = new MobileButtonSystem();