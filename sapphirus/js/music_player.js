class MusicPlayer {
 constructor() {
  this.current = [];
  this.mfx = {};
  this.vol = 100;
  this.loadedMFX = 0;
  this.loadLength = 0;
  this.allLoaded = true;
 }
 checkMusic(name = "") {
  return this.mfx?.[name];
 }
 async loadMfx(obj) {
  let string = obj.str,
   support = obj.sup;
  if (typeof this.mfx[string] === "undefined") {
   this.allLoaded = false;
   var o = Howl;
   var ls, er;
   if (o == Howl) {
    ls = "load";
    er = "loaderror";
   }
   if (o == GTRISSoundObject) {
    ls = "canplaythrough";
    er = "error";
   }
   this.mfx[string] = {
    volume: 100,
   };
   this.loadLength += 2;

   for (let a of ["start", "loop"]) {
    cacheManager.loadCache(`./assets/music/${string}/${a}.ogg`, (fname) => new o({
     src: fname,
     volume: (gameStorage.currentSettings.settings.volume.music / 100) * (this.vol / 100),
     onend: () => {
      try {
      this.mfx[string].loop.play();
      if (support !== 0) {
       this.mfx[support].loop.stop();
       this.mfx[support].loop.play();
      }
      } catch (e){}
     },
     preload: false
    }), "music", (re) => {
     this.mfx[string][a] = re.value;
     if (cacheManager.checkLoad(`assets/music/${string}/${a}.ogg`)) {
      this.loadedMFX++;
      this.checkLoad();
     } else {
      this.mfx[string][a].load();
      for (let ye of [ls, er]) {
       this.mfx[string][a].once(ye, () => {
        this.loadedMFX++;
        cacheManager.boolLoad(`assets/music/${string}/${a}.ogg`, true);
        this.checkLoad();
        //this.mfx[string][a].play()
       });
      }
     }
    })
   }

   /*////console.log(cacheManager.loadCache(`assets/music/${string}/start.ogg`, (fname) => new o({
      src: fname,
      volume: (gameStorage.currentSettings.settings.volume.music / 100) * (this.vol / 100),
      onend: () => {
       this.mfx[string].loop.play();
       if (support !== 0) {
        this.mfx[support].loop.stop();
        this.mfx[support].loop.play();
       }
      },
      preload: false
     }), "music"), "NUU")/**/

   for (let a in this.mfx[string]) {
    if (a !== "volume") {
     if (await cacheManager.checkLoad(`assets/music/${string}/${a}.ogg`)) {
      this.loadedMFX++;
      this.checkLoad();
     } else {
      ////console.log(this.mfx[string][a])
     }
    }
   }
  }
 }

 checkLoad() {
  this.allLoaded = this.loadedMFX >= this.loadLength;
 }

 playMfx(t) {
  if (typeof this.current !== "object") this.current = [];
  var selection = [...t] || this.current;
  ////console.log(selection, this.current, typeof this.current)
  let selected = false;
  for (let q of selection) {
   if (this.current.indexOf(q) === -1) selected = true;
  }
  for (let q of this.current) {
   if (selection.indexOf(q) === -1) selected = true;
  }
  

  if (selected) {
   this.killAllMfx();
   this.current = [...selection];
   for (let e of this.current) {
    this.mfx[e].start.play();
    for (let y in this.mfx[e])
     if (y !== "volume") {
      this.mfx[e][y].volume((this.vol / 100) * (gameStorage.currentSettings.settings.volume.music / 100) * (this.mfx[e].volume / 100));
      this.mfx[e][y].rate(1);
     }
   }
  }
 }


 killMfx(string) {
  var selection = string || this.current;
  for (let e of ['start', 'loop']) {
   this.mfx[selection][e].stop();
  }
 }
 killAllMfx(isNoCurrent) {
  for (let name of this.current) {
   for (let e of ['start', 'loop']) {
    ////console.log(name, e, this.mfx[name][e])
    this.mfx[name][e].stop();
   }
  }
  this.current = [];
 }
 switchCurrent(name) {
  if (typeof this.mfx[name] == 'object')
   this.current = name;
 }
 changeIndividualVol(e, int) {
  try {
   var volumeInt = int !== void 0 ? int : 100;
   this.mfx[e].volume = volumeInt;
   for (let y in this.mfx[e])
    if (y !== "volume") {
     this.mfx[e][y].volume((this.vol / 100) * (gameStorage.currentSettings.settings.volume.music / 100) * (this.mfx[e].volume / 100));
    }
   //////console.log("CHANGED SOUND TO " + this.mfx[e].volume)
  } catch (r) {}
 }
 changeVol(int) {
  var volumeInt = int || this.vol;
  this.vol = Math.min(100, Math.max(volumeInt, 0));
  for (let name in this.mfx) {
   for (let e of ['start', 'loop']) {
    this.mfx[name][e].volume((this.vol / 100) * (gameStorage.currentSettings.settings.volume.music / 100) * (this.mfx[name].volume / 100));
   }
  }
 }
 muteAllMfx(bool) {
  for (let name in this.mfx) {
   for (let e of ['start', 'loop']) {
    this.mfx[name][e].mute(typeof bool !== "undefined" ? bool : false);
   }
  }
 }
}

const musicPlayer = new MusicPlayer();