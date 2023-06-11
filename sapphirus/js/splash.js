

const gtrisSplash = new class {
 constructor() {
  this.time = 3000;
  this.sequence = {};
  this.splashText = "splashText";
  this.startTime = 0;
  this.skippedFrsme = 0;
  this.actualFrames = 0;
  this.interval;
  this.video = $ID("splashVideo");
  this.sound;
  this.frames = 0;
  this.maxFrames = 0;
  this.videoStarted = false;
  this.videoBase64 = "";
  this.isVideoPlayedBack = false;
  this.isLeavable = false;
  this.videoBlob;
  this.isActive = true;
  this.soundIntro
 };

 async prepareCanvasVideo(obj) {
  this.maxFrames = obj.time;

  let ok = {
   video: false,
   audio: false,
   intro: false
  };

  let func = () => {
   if (ok.video && ok.audio && ok.intro) {
    obj.loaded();
   }
  }

  cacheManager.loadCache(
   `assets/misc/splashvideo/splash.ogg`, (fname) => {
    return new Howl({
     src: fname,
     volume: gameStorage.currentSettings.settings.volume.music / 100,
     preload: false
    });
   }, "audio", fui => {
    this.sound = fui.value;
    this.sound.load();
    for (let g of ["load", "loaderror"]) {
     this.sound.once(g, () => {
      if (g == "error") {
       obj.error();
       return;
      }
      ok.audio = true;
      func();
     })
    }
   }); /**/
   
  cacheManager.loadCache(
   `assets/misc/splashvideo/intro.ogg`, (fname) => {
    return new Howl({
     src: fname,
     volume: gameStorage.currentSettings.settings.volume.music / 100,
     preload: false
    });
   }, "audio", fui => {
    this.soundIntro = fui.value;
    for (let g of ["load", "loaderror"]) {
     this.soundIntro.once(g, () => {
      if (g == "error") {
       obj.error();
       return;
      }
      ok.intro = true;
      func();
     });
    this.soundIntro.load();
    }
   }); /**/
  /*cacheManager.loadCache(
   `assets/misc/splashvideo/splash.mp4`, (fname) => {
    let g = document.createElement("video");
    let w = document.createElement("source");
    w.setAttribute("src", fname);
    w.setAttribute('type', 'video/mp4');
    w.setAttribute('autoplay', 'true');
    

    g.autoplay = false;
    g.controls = false;
    g.currentTime = 0;
    g.setAttribute("width", 960);
    g.setAttribute("height", 540);
    g.appendChild(w);
    g.setAttribute("controls", "false");
    
    return g;


   }, "video", fui => {
    this.video = fui.value;
    //console.log(this.video)
    this.video.load();
    this.video.click();
    this.video.pause();
    this.video.onloadeddata = e => {
     ok.video = true;
     func();
    }
    this.video.onerror = () => {
     obj.error();
    }
   }); /**/
   
   $BLOB("assets/misc/splashvideo/splash.mp4").then((e) => {
    this.videoBlob = e;
    //console.log(this.video);
    /*$BTOBASE64(e, (o) => {
     this.videoBase64 = o;
    })*/
    //this.videoBase64;
    ok.video = true;
    func();
   });
 }
 setSequence(time, object) {
  this.sequence = object; //obvious
  this.time = time || 4000;
  this.startLoop();
 };
 startVideo() {
 //this.videoStarted = true;
 this.video.addEventListener("play", () => {
  this.videoStarted = true;
  this.sound.play();
  this.sound.volume(gameStorage.currentSettings.settings.volume.music / 100);
  this.time--;
  this.isActive = true;
  this.isLeavable = true;
  $STYLEELEM(this.video, "opacity", "100%");
 }, {once: true});
 
 this.video.addEventListener("loadeddata", () => {
  //this.videoStarted = true;
 });
  this.isLeavable = false;
  $ELEM("source", (i) => {
   i.src = window.URL.createObjectURL(this.videoBlob);
   this.video.appendChild(i);
  });
  this.isActive = false;
 }

 setSplashFade(e, inout, delay) {
  let _ = r => $STYLE(e, "opacity", r && typeof r === "boolean" ? 1 : 0);
  $STYLE(e, "animation", `none`);
  $ID(e).offsetHeight;
  switch (inout) {
   case "in":
    _(true);
    $STYLE(e, "animation", `fade-in ${delay}ms 1 linear`);
    break;
   case "out":
    _(false);
    $STYLE(e, "animation", `fade-out ${delay}ms 1 linear`);
    break;
  }
 }

 run() {
  try {
   if (this.time >= -1) {
    if (this.time in this.sequence) {
     if (typeof this.sequence[this.time] == "function") {
      this.sequence[this.time].bind(this)(this.time);
     };


    }
    if (!this.videoStarted) { this.time--; }
    else {
     this.time = 999999999999999;
     //this.video.currentTime = this.frames // (30);
     this.frames++;
     //console.log(this.time, this.frames, this.maxFrames)
     if (this.frames > this.maxFrames) {
      this.videoStarted = false;
      this.time = 3;
     }
    }
   } else {
    throw (() => { return {} })();
   }
  } catch (e) {
   var { stack } = e;
   this.isRunning = false;
   if (e?.stack) gachatrisLogNotification.notification(gachatrisLanguage.transText1("browser_user_agent"), stack)
   clearInterval(this.interval);
   this.videoStarted = false;
  }
 }
 startLoop() {
  if (!this.isRunning) {
   this.startTime = Date.now();
   this.frames = 0;
   this.actualFrames = 0;
   this.isRunning = true;
   this.interval = setInterval(() => {
    this.syncTime = Math.floor((Date.now() - this.startTime));
    var syncFrames = this.syncTime - this.actualFrames;
    for (var i = 0; i < syncFrames && this.isRunning; i++, this.actualFrames++)
     if (this.isActive) this.run();
   }, 1000 / 30);
  };
 }
}();
/*WORK IN PROGRESS*/