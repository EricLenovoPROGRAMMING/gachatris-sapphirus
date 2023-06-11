const soundPlayer = new class {
 constructor() {
  this.sounds = {};
  this.usedSounds = {};
  this.current = 339;
  this.soundsArr = ["ready1", "ready2", "ready3", "start", "prespin", "prespinmini",
		"move", "rotate", "land", "lock", "bravo", "b2b", "garbage", "hold", "first_hold", "collapse", "lose", "first_hold_pro", "hold_pro", "fall_pro",
		"hurry", "hurry2", "time_up", "step", "frenzy", "ren_end", "topoutwarning", "alarm", "heartbeat", "irs", "ihs", "fall", "harddrop_pro", "knockout",
		"attr_lowhp", "attr_danger"
		];
  this.allSfxLoaded = true;
  this.soundBanksArr = ["default", "tetraplus"];
  this.customJSONAdded = [];
 };
 loadSfx(cur) {
  if (this.current !== cur) {
   this.current = cur;
   this.allSfxLoaded = false;
   var con = Howl;
   var ls, er;
   if (con == Howl) {
    ls = "load";
    er = "loaderror";
   }
   if (con == GTRISSoundObject) {
    ls = "canplaythrough";
    er = "error";
   }
   var directory = `assets/sounds/game/${this.soundBanksArr[cur]}`;
   for (let sounds of this.soundsArr) {
    this.sounds[sounds] = new GTRISNoSoundObject();
   };
   this.sounds = {};
   for (let sounds = 1; sounds <= 5; sounds++) {
    this.sounds[`line${sounds}`] = new GTRISNoSoundObject();
   };

   for (let sounds = 1; sounds <= 4; sounds++) {
    this.sounds[`b2b_lv${sounds}`] = new GTRISNoSoundObject();
   };

   for (let sounds = 1; sounds <= 5; sounds++) {
    this.sounds[`receive${sounds}`] = new GTRISNoSoundObject();;
   };

   for (let sounds = 1; sounds <= 4; sounds++) {
    this.sounds[`harddrop${sounds}`] = new GTRISNoSoundObject();
   };
   for (let sounds = 1; sounds <= 25; sounds++) {
    this.sounds[`ren${sounds}`] = new GTRISNoSoundObject();
   };

   for (let sounds = 0; sounds <= 3; sounds++) {
    this.sounds[`tspin${sounds}`] = new GTRISNoSoundObject();
    if (sounds > 0) this.sounds[`tspin${sounds}_b2b`] = new GTRISNoSoundObject();
   };

   for (let sounds = 0; sounds <= 3; sounds++) {
    this.sounds[`tspinmini${sounds}`] = new GTRISNoSoundObject();
    if (sounds > 0) this.sounds[`tspin${sounds}_b2b`] = new GTRISNoSoundObject();
   };
   this.sfxLoaded = 0;
   this.sfxLoadLimit = Infinity;

   $JSON(`${directory}/init.json`)
    .then(async object => {
     let nameSources = object.sources.main;
     let loads = {};
     let loadedSounds = {};
     /*soundSources = {};
     for (let y in nameSources) {
      let u = nameSources[y];
      soundSources[y] = new con({
       src: `${directory}/${u}`,
       preload: false,
       html5: false,
       loop: u.loop
      });
     }*/
     let func = (sounds) => {
      if (cacheManager.checkLoad(loads[sounds])) {
       this.sfxLoaded++;
       this.allSfxLoaded = this.sfxLoaded >= this.sfxLoadLimit;
      } else {
       this.sounds[sounds].load();
       this.usedSounds[sounds] = false;
       for (let e of [ls, er]) {
        this.sounds[sounds].once(e, () => {
         cacheManager.boolLoad(loads[sounds], true);
         this.sfxLoaded++;
         this.allSfxLoaded = this.sfxLoaded >= this.sfxLoadLimit;
        });
       };
      }
     };
     for (let r in object.objects_main) {
      let u = object.objects_main[r],
       wo = `${directory}/${nameSources[u.src]}`;
      cacheManager.loadCache(
       wo, (fname) => {
        return new con({
         src: fname,
         preload: false,
         html5: u.html5,
         loop: u.loop
        })
       }, "audio", fui => {
        this.sounds[r] = fui.value;
        func(r);
       }); /**/
      loads[r] = wo;
     }

     for (let g = 1; g <= 25; g++) {
      let o = object.sources.ren,
       wo = `${directory}/${o.prefix}${Math.min(g, object.sources.ren.count)}.${o.extension}`;
      await cacheManager.loadCache(wo, (fname) => new con({
       src: fname,
       preload: false,
       html5: o.html5,
       loop: false
      }), "audio", fui => {
       this.sounds[`ren${g}`] = fui.value;
       func(`ren${g}`);
      }); /**/
      loads[`ren${g}`] = wo;
     }

     this.sfxLoadLimit = Object.keys(object.objects_main).length;
     for (let sounds in this.sounds) {
      // ////console.log(sounds + "LOAD"
     }
    })
    .catch(e => {
     gachatrisLogNotification.error("", "Error", "", "", e);
     throw e.stack;
    });
  };
 };
 loadJsonSounds(name) {
  var directory = `assets/sounds/custom/${name}`;
  if (this.customJSONAdded.indexOf(`${directory}/init.json`) == -1) {
   var con = Howl;
   var ls, er;
   if (con == Howl) {
    ls = "load";
    er = "loaderror";
   }
   if (con == GTRISSoundObject) {
    ls = "canplaythrough";
    er = "error";
   }
   this.customJSONAdded.push(`${directory}/init.json`);
   $JSON(`${directory}/init.json`)
    .then(async object => {


     let func = (sounds) => {
      if (cacheManager.checkLoad(loads[sounds])) {
       this.sfxLoaded++;
       this.allSfxLoaded = this.sfxLoaded >= this.sfxLoadLimit;
      } else {
       this.sounds[sounds].load();
       this.usedSounds[sounds] = false;
       for (let e of [ls, er]) {
        this.sounds[sounds].once(e, () => {
         cacheManager.boolLoad(loads[sounds], true);
         this.sfxLoaded++;
         this.allSfxLoaded = this.sfxLoaded >= this.sfxLoadLimit;
        });
       };
      }
     };

     let nameSources = object.sources;
     let loads = {};
     for (let r in object.main) {
      let w = `${name}||${r}`;
      let u = object.main[r];
      let q = `${directory}/${nameSources[u.src]}`;
      await cacheManager.loadCache(q, (fname) => new con({
       src: fname,
       preload: false,
       html5: u.html5,
       loop: u.loop
      }), "audio", (uq) => {
       this.sounds[w] = uq.value;
       func(w);
      });
      loads[w] = q;
     }

     this.sfxLoadLimit += Object.keys(object.main).length;
     /*for (let so in object.main) {
      let sounds = `${name}||${so}`;

      if (cacheManager.checkLoad(loads[sounds])) {
       this.sfxLoaded++;
       this.allSfxLoaded = this.sfxLoaded >= this.sfxLoadLimit;
      } else {
       this.sounds[sounds].load();
       this.usedSounds[sounds] = false;
       for (let e of [ls, er]) {
        this.sounds[sounds].once(e, () => {
         this.sfxLoaded++;
         cacheManager.boolLoad(loads[sounds], true);
         this.allSfxLoaded = this.sfxLoaded >= this.sfxLoadLimit;
        });
       }
      }
     }*/
    })
    .catch(e => {
     gachatrisLogNotification.error("", "Error", "", "", e);
     throw e.stack;
    });
  }

 }
 resetSoundUsed() {
  for (let s in this.sounds) {
   this.usedSounds[s] = gameManager.movingReplay;
  }
 }
 changeVolume(volume) {
  for (let g in this.sounds) {
   this.sounds[g].volume(volume);
  }
 }
 changeSpeedIndividual(a, b) {
  if (this.sounds?.[a]) {
   this.sounds[a].rate(b)
  }
 }
 playSfx(name, intensity) {
  var e;
  //TODO settings to be made so its set to true
  if (!this.usedSounds[name] && gameStorage.currentSettings.settings.volume.sound >= 1) try {
   this.usedSounds[name] = true;
   this.sounds[name].volume(gameStorage.currentSettings.settings.volume.sound / 100);
   this.sounds[name].stop();
   this.sounds[name].rate(1);
   for (let h = 0; h < (intensity || 1); h++) {
    e = this.sounds[name].play();
   }
  } catch (y) {};
  return e;
 }
 stopSfx(name, variable) {
  //////console.log(name)
  try {
   this.sounds[name].stop(variable);
  } catch (e) {}
 }
}();

class GTRISSoundObject {
 constructor(obj) {
  this.doc = document.createElement("audio");
  this._volume = obj.volume || 0;
  this._loop = obj.loop || false;
  this._src = obj.src || "";
  this.doc.src = this._src;
  this.doc.volume = this._volume;
  this.doc.loop = this._loop;
  if (obj.preload) this.doc.load();
 }
 load() {
  this.doc.load();
 }
 play(seek) {
  this.doc.currentTime = seek || 0;
  this.doc.play()
   .catch(e => {
    console.error(`GTRISSoundObject object with the source destination "${this._src}" cannot play a non-existent sound file.`);
   });
 };
 stop() {
  this.doc.pause();
 }
 once(evt, func) {
  this.doc.addEventListener(evt, func, { once: true });
 }
 volume(v) {
  this._volume = v;
  this.doc.volume = v;
 }
 rate(e) {}
}

class GTRISNoSoundObject {
 constructor() {

 }

 play() {}
 stop() {}
 on() {}
 once() {}
 pause() {}
 volume() {}
 load() {}
 rate() {}
}