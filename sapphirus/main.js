/** MEDIA COPYRIGHT 2022 - 2023 EricLenovo
 * Gachatris Sapphirus
 * 
 */

const eval = function(args) {
    throw "JS Console Not Allowed";
   } /**/
   "use strict";
   
   //alert("loaded")
   //I found this code to detect whether the Game is running on PC or mobile.
   window.mobileAndTabletCheck = function() {
    let check =
     (function(a) {
      let c = false
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) c = true;
      return c;
     })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
   };
   
   const GAME_METADATA = {};
   /* EricLenovo Polyfill */
   const _doc = document,
    _docElem = _doc.documentElement;
   
   var SCREEN_HEIGHT = window.innerHeight,
    SCREEN_WIDTH = window.innerWidth;
   
   const $BN = (query) => {
    if (query.startsWith("/")) query = query.replace("/", "");
    return `./sapphirus/${query}`;
   };
   
   const $UID = function(length) {
    let str = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    for (let a = 0; a < length; a++) {
     str += chars[~~(chars.length * Math.random())];
    }
    return str;
   }
   
   
   const $ID = function(id) {
    if (typeof $ID_STORAGE[id] === "undefined") $ID_STORAGE[id] = _doc.getElementById(id);
    return $ID_STORAGE[id];
   };
   var $ID_STORAGE = {};
   const $QS = function(id) {
     return _doc.querySelector(id);
    },
    $IH = function(id, iH) {
     let d = $ID(id);
     if (d.innerHTML !== iH) {
      d.innerHTML = iH;
      $ID_STORAGE = {};
     }
    },
    $IHELEM = function(id, iH) {
     let d = id;
     if (d.innerHTML !== iH) {
      d.innerHTML = iH;
      $ID_STORAGE = {};
     }
    },
    $IHA = function(id, iH) {
     $ID(id).innerHTML += iH;
    },
    $CLASS = function(c, n) {
     if (n !== void 0)
      return _doc.getElementsByClassName(c)[n];
     return _doc.getElementsByClassName(c);
    },
    $QUERY = function(c, n) {
     if (n !== void 0)
      return _doc.querySelectorAll(c)[n];
     return _doc.querySelectorAll(c);
    },
    $TAG = function(c, n) {
     if (n !== void 0)
      return _doc.getElementsByTagName(c)[n];
     return _doc.getElementsByTagName(c);
    },
    $STYLE = function(id, prop, s) {
     let d = $ID(id);
     if (d.style[prop] !== s) {
      d.style[prop] = s;
     };
    },
    $STYLEELEM = function(id, prop, s) {
     if (id.style[prop] !== s) {
      id.style[prop] = s;
     };
    },
    $MAL = function(i, val) {
     var a = [];
     for (var e = 0; e < i; e++) {
      a.push(val !== void 0 ? val : null);
     }
     return a;
    },
    $GRID = function(x, y, val) {
     var a = [];
     for (var e = 0; e < x; e++) {
      a.push([]);
      for (var f = 0; f < y; f++) {
       a[e].push(val);
      }
     };
     return a;
    },
    $ELEM = function(tag, func) {
     var a = _doc.createElement(tag);
     func.bind(a)(a);
    },
    $CLONE = function(arr) {
     var ARR = [];
     var len = arr.length,
      len2;
     for (let a = 0; a < len; a++) {
      if (typeof arr[a] == "object" && arr[a] instanceof Array) {
       ARR.push([]);
       if (typeof arr[a] == "object") len2 = arr[a].length;
       for (let b = 0; b < len2; b++) {
        ARR[a].push(arr[a][b]);
       };
      }
      else {
       ARR.push(arr[a]);
      }
     };
     return ARR;
    },
    $CLONE1D = function(arr) {
     var ARR = [];
     for (let a = 0, len = arr.length; a < len; a++) {
      ARR.push(arr[a]);
     };
     return ARR;
    },
    $RANGE = function(min, max, p) {
     var h = p || 1;
     var array = [];
     for (var i = min; i <= max; i += h) {
      array.push(i);
     }
     return array;
    },
    $RECT = function(doc, pos) {
     return $ID(doc).getBoundingClientRect()[pos];
    },
    $RECTELEM = function(elem, pos) {
     return elem.getBoundingClientRect()[pos];
    },
    $JSON = function(directory) {
     return new Promise((res, rej) => {
      let dir = $BN(directory);
      //console.log(dir)
      let cacheData = cacheManager.directLoad(dir);
      if (cacheData) {
       res(JSON.parse(cacheData));
       return;
      }
   
      nativeLDBManager.read("misc", dir, async fu => {
       //alert(dir + fu)
       if (typeof fu !== "undefined") {
        res(JSON.parse(fu.val));
        return;
       }
       await fetch(dir, { cache: 'no-store' }).then(async fetched => {
        return await fetched.text();
       }).then(json => {
        cacheManager.directSave(dir, () => json);
        res(JSON.parse(json));
       });
      });
     });
   
   
   
     /*const json = await fetch(`sapphirus/json/${directory}.json`, { cache: 'no-store' });
     
     return await json.json();*/
    },
   
    $PROMISE = function(func) {
     return new Promise((res, rej) => {
      func(res, rej);
     });
    },
    $TEXT = function(directory) {
     return new Promise((res, rej) => {
      let dir = $BN(directory);
   
      let cacheData = cacheManager.directLoad(dir);
      if (cacheData) {
       res(cacheData);
       return;
      }
   
      nativeLDBManager.read("misc", dir, async fu => {
       ////console.log(fu)
       if (fu) {
        res(fu.val);
        return;
       }
       await fetch(dir, { cache: 'no-store' }).then(async fetched => {
        return await fetched.text();
       }).then(text => {
        cacheManager.directSave(dir, () => text);
        res(text);
       });
      });
     });
   
    },
    $BLOB = function(directory) {
     return new Promise((res, rej) => {
      let dir = $BN(directory);
   
      let cacheData = cacheManager.directLoad(dir);
      if (cacheData) {
       res(cacheData);
       return;
      }
   
      nativeLDBManager.read("misc", dir, async fu => {
       ////console.log(fu)
       if (fu) {
        res(fu.val);
        return;
       }
       await fetch(dir, { cache: 'no-store' }).then(async fetched => {
        return await fetched.blob();
       }).then(blob => {
        cacheManager.directSave(dir, () => blob);
        res(blob);
       });
      });
     });
    },
    $BTOBASE64 = function(blob, call) {
     var reader = new FileReader();
     reader.readAsDataURL(blob);
     reader.onloadend = function() {
      var base64 = reader.result;
      call(base64);
     };
    };
   const cacheManager = new class {
    constructor() {
     this.cacheData = {};
    }
   
    checkLoad(cach) {
     let cacheDir = $BN(cach);
     if (this.cacheData?.[cacheDir]) return this.cacheData[cacheDir].isLoaded;
     return false;
    }
   
    boolLoad(cach, bool) {
     let cacheDir = $BN(cach);
     if (this.cacheData?.[cacheDir]) this.cacheData[cacheDir].isLoaded = true;
    }
   
    directLoad(cache) {
     let a = this.cacheData[cache] || {
      value: null,
     };
     return a.value;
    }
   
    directSave(cache, value) {
     this.cacheData[cache] = {
      isLoaded: false,
      value: value(cache)
     };
    }
   
    loadCache(cach, value, category, on) {
     let cacheData = $BN(cach);
     nativeLDBManager.read(category, cacheData, (u) => {
      let nldbValue = false;
      if (!u) {
       nldbValue = false;
      } else {
       let _value = u.value;
       let url = _value;
       if (_value instanceof Blob) {
        url = window.URL.createObjectURL(_value);
       }
       nldbValue = url;
      }
      if (!(this.cacheData?.[cacheData])) this.cacheData[cacheData] = {
       isLoaded: false,
       value: value(nldbValue || cacheData)
      }
   
      on(this.cacheData[cacheData]);
     })
   
   
     /*let nldbValue = await this.promise(category, cacheData).then(u => {
      ////console.log(u)
     });*/
   
     //////console.log(this.promise(category, cacheData))
   
   
    }
   
    promise(cat, p) {
     let categ = cat,
      path = p;
     return new Promise((resolve) => {
      nativeLDBManager.read(categ, path, (u) => {
       if (typeof u === "undefined") {
        resolve(path);
        return;
       }
       let value = u.val;
       let url = value;
       if (value instanceof Blob) {
        url = window.URL.createObjectURL(value);
       }
       resolve(url);
      })
     });
    }
   
   }()
   const EricLenovoMath = class {
    constructor() {}
    /**
     * Returns a quadratic equation of number x
     */
    static quadratic(x, a, b, c) {
     return (a * (x * x)) + (b * x) + c;
    }
   };
   /*$JSON("ui/play")
    .then((a) => {
     //////console.log(a)
    })
    .catch((e) => {
     throw "a file is not found"
    })*/
   
   class ParkMillerPRNG {
    #mersennePrime = 2147483647;
    constructor() {
     this.seed = 1;
    }
    next() {
     return this.gen() / this.#mersennePrime;
    }
    gen() {
     return (this.seed = (this.seed * 16807) % this.#mersennePrime);
    }
   };
   void
   
   function() {
   
    if (!(nativeLDBManager)) return;
   
    var splashScreen = "splashScreen";
    let scriptString = "";
    let fonts = {
     "font-default": '/fonts/default.ttf',
     "font-ns": "/fonts/ns.ttf",
     "font-midnight": "/fonts/bo-midnight.ttf"
    };
    var arr = ['background', "worker_manager", "sapphirus_ai_core/ai", 'player_template', 'lib/howler', 'localization', 'splash', 'data', 'sound_player', 'music_player', 'ui_sound', 'player', 'core', 'game', "particle", 'menu', 'mobile_touch'],
     loaded = 0,
     imagesArray = [
      {
       dir: `assets/menu/dyk`,
       imageCount: $RANGE(1, 4),
       name: "dykimg",
       prefix: "dyk"
      },
      {
       dir: `assets/menu`,
       name: "icon",
       imageCount: $RANGE(1, 1),
       prefix: "icon"
      },
      {
       dir: `assets/menu`,
       name: "back",
       imageCount: $RANGE(1, 1),
       prefix: "back"
      },
      {
       dir: `assets/playerclassarea`,
       name: "frenzy",
       imageCount: $RANGE(1, 1),
       prefix: "frenzy"
      },
      {
       dir: `assets/menu/mainmenu`,
       name: "bg",
       imageCount: $RANGE(1, 1),
       prefix: "mainmenu_background"
      },
      {
       dir: `assets/menu/mainmenu`,
       name: "logo",
       imageCount: $RANGE(1, 1),
       prefix: "mainmenu_logo"
      }
   
     ],
     pcaFiles = ["playerclassarea/body.html", "playerclassarea/body.css", "misc/ai/eval.js"],
     max = arr.length + pcaFiles.length;
    for (let xw of imagesArray) {
     max += xw.imageCount.length
    }
   
    $STYLE(splashScreen, "display", "block");
   
    function ye() {
     fetch($BN("metadata.json")).then(gw => { return gw.json(); }).then(cjn => {
      for (let gh in cjn) GAME_METADATA[gh] = cjn[gh];
      fc();
     });
   
    }
   
    function fc() {
     let count = 0;
   
     let str = "";
   
     for (let hw in fonts) {
      nativeLDBManager.read("font", fonts[hw], (found) => {
       function tes(f) {
        $BTOBASE64(f, (fj) => {
         str += `@font-face {
                  font-family: '${hw}';
                  font-style: normal;
                  src: url('${fj}') format('truetype')} \n`;
         count++;
         if (count === 3) {
          l();
          $ELEM("style", style => {
           style.innerHTML = str;
           _doc.head.appendChild(style);
          })
          loaded++;
         }
   
         checkLoad(fonts[hw]);
   
        })
       }
       if (found !== void 0) {
        tes(found.val);
        return;
       }
       $BLOB(fonts[hw]).then(gn => {
        tes(gn);
       });
      })
     }
   
   
   
    }
   
    let orderedScripts = [];
   
    function l() {
     let isOnce = true;
     /*$ELEM("script", function(a) {
      a.src = `js/${arr[loaded]}.js`;
      a.type = "text/javascript";
      document.head.appendChild(a);
     });*/
     for (let oo = 0; oo < arr.length; oo++) {
      let reference = arr[oo];
      let rs = oo;
      if (arr?.[oo]) nativeLDBManager.read("script", reference, gaw => {
       function lye(suc) {
        loaded++;
        orderedScripts[rs] = suc;
        if (loaded < arr.length) {
         checkLoad(reference);
        }
        if (loaded > arr.length && isOnce) {
         isOnce = false;
         for (let hwwz of orderedScripts) {
          scriptString += hwwz + ";;";
         }
         let rep = new Blob([scriptString], { type: "text/plain" });
         $ELEM("script", (fil) => {
          fil.src = URL.createObjectURL(rep);
          document.head.appendChild(fil);
          fil.onload = () => {
           c();
           q();
           //if (scriptString.split("const gameBackground").length > 1) document.documentElement.innerText = ("wtf" + scriptString.split("const gameBackground").join("\n\n\nn\n\n\n\n\n\n\n\n\n\n\n\n========$==¥=$==$===$=$=$=$=$=€=€==€=€=€=€=€{=€=€=€=€=€=€×°$}™${^$×^$×^$$×°$°××°$$°×${°{¥°^π7₱8₱8373+₱+₱(₱((#(#(#(#(#(2!₱(_!₱8!_+_+_++_!_+_;_(_!8_!_(_!_(!_(_!_(₱!₱(!_\n"))
          }
         })
         // let plugScript = x
        }
       } /**/
       /*function lye(y) {
        $ELEM("script", hh => {
         let sc = $BN(`/js/${reference}.js`);
         hh.src = $BN(`/js/${reference}.js`);
         hh.addEventListener("load", () => {
          if (loaded < arr.length) {
           loaded++;
           checkLoad(sc || reference);
   
          }
          if (loaded == arr.length) {
           c();
           q();
          }
         });
         document.body.appendChild(hh);
        })
       } /**/
       if (gaw) {
        lye(gaw.val);
        return;
       }
       $TEXT(`js/${reference}.js`).then(suc => lye(suc));
      });
     }
    }
   
   
   
   
    //fetch(`js/${arr[loaded]}.js`).then(yw => yw.text())
    function checkLoad(src) {
     let loadPercent = (loaded / (max)) * 100;
     $IH("splashText", `
        <gtris-loading-empty style="width:100%;height:6%; display: flex;background:#888;position:relative">
         <gtris-load-loadingbar style="width:${~~(loadPercent)}%; height: 100%; background: #fff; position: absolute; color: #000;">
          ${~~(loadPercent)}%
         </gtris-load-loadingbar>
        </gtris-loading-empty>
        <br/>
        <gtris-loading-text style="display: flex;width:100%;height:1em;">${src}</gtris-loading-text>
        `);
    }
   
   
    function c() {
     for (let q of imagesArray) {
      for (let _g of q.imageCount) {
       let g = _g;
       if (q.imageCount.length === 1) g = "";
       let dir = `${q.dir}/${q.name}${g}.png`;
       cacheManager.loadCache(dir, (fname) => {
        let s = new Image();
        s.src = fname;
        return s;
       }, "image", img => {
        gameManager.images.path[`${q.prefix}${g}`] = img.value.src;
        gameManager.images.core[`${q.prefix}${g}`] = img.value;
        for (let e of ["load", "error"]) gameManager.images.core[`${q.prefix}${g}`].addEventListener(e, function() {
         loaded++;
         if (loaded < max) {
          checkLoad(dir);
          //////console.log("image" + ` ${g} ${e}`);
         }
         prepare();
        }, false);
       });
   
   
      }
     }
   
    }
   
    function qw() {
     $IH("splashText", gachatrisLanguage.transText1("splash_instruction", [gachatrisLanguage.transText1(`splash_${window.mobileAndTabletCheck() ? "mobile" : "pc"}`)]));
     addEventListener('keydown', initialize, { once: true });
     addEventListener('click', initialize, { once: true });
     musicPlayer.loadMfx({ str: "menu", sup: 0 });
     gameMainMenu.initializeMenu();
    }
   
    function launch() {
     $IH("splashText", "DATABASE INITIALIZING");
     nativeLDBManager.initialize(["font", "replay", "image", "characterimage", "background", "audio", "music", "script", "skin", "misc", "worker", "video"], {
      open: () => {
       ye();
      },
      update: () => {
       $IH("splashText", "Database Updating...");
      }
     });
    }
   
    function hwy() {
     //alert(navigator.language)
     gachatrisLanguage.loadLanguage("en-US", () => {
      he();
     });
    }
   
    function he() {
     gtrisSplash.prepareCanvasVideo({
      loaded: () => {
       qw();
      },
      error: () => {},
      time: (21 * 1000)
     });
    }
   
    function prepare() {
     if (loaded >= max) {
      addEventListener(`resize`, () => gameManager.resolution(), false);
      gameManager.resolution();
      $STYLE("screen", "alignItems", "center");
      hwy();
      let b = null;
      $ELEM("canvas", canvas => {
       let iconLoad = gameManager.images.core.icon;
       let ctx = canvas.getContext("2d");
       canvas.width = 128;
       canvas.height = 128; //iconLoad.height;
       ctx.drawImage(iconLoad, 0, 0, canvas.width, canvas.height);
       canvas.toBlob(blubb => {
   
        b = URL.createObjectURL(blubb);
   
        $ELEM("link", link => {
         link.rel = "icon";
         //link.type = "image/png";
         link.href = b;
         _doc.head.appendChild(link);
        });
        $ID("headerIcon").src = b;
       });
      });
   
      let c = null;
      $ELEM("canvas", canvas => {
       let iconLoad = gameManager.images.core.back;
       let ctx = canvas.getContext("2d");
       canvas.width = 128;
       canvas.height = 128; //iconLoad.height;
       ctx.drawImage(iconLoad, 0, 0, canvas.width, canvas.height);
       canvas.toBlob(blubb => {
   
        c = URL.createObjectURL(blubb);
   
        $ID("headerBackIcon").src = c;
       });
      });
     }
    }
   
    function q() {
     let x = gachatrisCharacter;
     for (let cc = 0, len = pcaFiles.length, o; cc < len; cc++) {
      nativeLDBManager.read("misc", `./assets/${pcaFiles[cc]}`, (found) => {
       let hm = (mm) => {
   
        loaded++;
        prepare();
        switch (cc) {
         case 0:
          x.bodyTemp = mm;
          break;
         case 1:
          x.bodyStyleTemp = mm;
          break;
         case 2:
          gameManager.miscellaneous.ai = mm;
          break;
        }
   
       }
       if (found) {
        hm(found.val);
        return;
       }
       $TEXT(`./assets/${pcaFiles[cc]}`).then(mkm => {
        hm(mkm);
       });
      });
     }
    }
   
    function skipKey() {
     addEventListener("keyup", e => keyboardControls.interact(e), false);
     addEventListener("keydown", e => keyboardControls.interact(e), false);
     $STYLE(splashScreen, "display", "none");
     //gameMenu.showHideMenu(true);
     removeEventListener('keydown', canSkipKey);
     removeEventListener('click', skipKey);
    }
    //addEventListener("DOMContentLoaded", l, false);
    launch();
    //alert("start")
    let isOK = true;
    function canSkipKey() {
     if (gtrisSplash.isLeavable) {
      gtrisSplash.videoStarted = false;
      gtrisSplash.time = 1;
      gtrisSplash.soundIntro.fade((gameStorage.currentSettings.settings.volume.music * 100) / 100, 0, 400);
      gtrisSplash.sound.fade((gameStorage.currentSettings.settings.volume.music * 100) / 100, 0, 400)
      removeEventListener('keydown', canSkipKey, false);
      removeEventListener('click', canSkipKey, false);
     }
    }
   
    function initialize() {
     if(isOK) {
      isOK = false;
     gameStorage.loadStorage();
     gameMenu.changeBlur();
     removeEventListener('keydown', initialize);
     removeEventListener('click', initialize);
     addEventListener('keydown', canSkipKey, false);
     addEventListener('click', canSkipKey, false);
     gtrisSplash.setSequence(11000, {
      10999: function() {
       mobileButtons.initiateButtons();
       mobileButtons.enableButtons();
       //$ID("screen").requestFullscreen();
       this.soundIntro.play();
       this.soundIntro.volume(gameStorage.currentSettings.settings.volume.music / 100);
       $IH("splashText", gachatrisLanguage.transText1("splash1"));
       this.setSplashFade("splashText", "in", 500);
       this.isLeavable = true;
      },
      8200: function() {
       this.setSplashFade("splashText", "out", 500);
      },
      7700: function() {
       $IH("splashText", gachatrisLanguage.transText1("splash2"));
       this.setSplashFade("splashText", "in", 500);
      },
      4200: function() {
       this.setSplashFade("splashText", "out", 500);
      },
      3700: function() {
       $IH("splashText", gachatrisLanguage.transText1("splash3", GAME_METADATA.version));
       this.setSplashFade("splashText", "in", 500);
      },
      500: function() {
       this.setSplashFade("splashText", "out", 500);
   
      },
      50: function() {
       this.startVideo();
      },
   
      0: function() {
       gameMainMenu.show(true);
       gameMainMenu.showMenu(true)
       //gachatrisLogNotification.notification(gachatrisLanguage.transText1("browser_user_agent"), navigator.mediaDevices)
       //gameMenu.switchMenuSection(0);
       //gameMenu.showHideLoading(true)
       musicPlayer.playMfx(["menu"]);
       skipKey();
       removeEventListener('keydown', canSkipKey, false);
       removeEventListener('click', canSkipKey, false);
       /*$ID("MAINMENU-START").onclick = () => {
        //gameManager.initialize(0, 1);
        //gameMenu.showHideMenu(false);
        gameMenu.switchMenu("add", "ui/play");
       }
       $ID("MAINMENU-SETTINGS").onclick = () => {
        gameMenu.switchMenu("add", "ui/settings");
       }
       $ID("MAINMENU-REPLAY").onclick = () => {
        gameMenu.switchMenu("add", "ui/replay");
        //gameReplayer.loadSavedReplays()
       }*/
   
      }
     })
     }
    }
   }();
   //Globally handle errors
   window.onerror = (event, source, lineno, colno, error) => {
    if (error instanceof SyntaxError) {
     try {
      document.body.innerHTML = (`FATAL ERROR!!! At ${source}, ${lineno}:${colno}, ${event.indexOf('Strict mode code')!==-1||event.indexOf('Identifier \'')!==-1?'':"there is"} ${['a','e','i','o','u'].indexOf(event.toLowerCase().replace('uncaught syntaxerror: ', '').charAt(0)) !== -1?'an':'a'} ${event.replace('Uncaught SyntaxError: ','').toLowerCase()}. Please contact the Gachatris developer and he will fix a discovered bug to recover the game.`)
      document.body.style = "background:#000;color:#fff;";
     } catch (e) {}
    } else {
     gachatrisLogNotification.error(event, source, lineno, colno, error);
     //alert(`At ${source}, ${lineno}:${colno}, there is ${[`a`,`e`,`i`,`o`,`u`].indexOf(event.toLowerCase().charAt(0)) !== -1?'an':'a'} ${event}. If you see this error mesage, contact the Gachatris developer.`)
    }
   }
   
   const gachatrisLogNotification = new class {
    error(event, source, lineno, colno, error) {
     try {
      $ELEM("gtris-error-error", function(e) {
       e.className = "error-content";
       let g = _doc.createElement("gtris-error-source");
       g.innerHTML = `${source} ${lineno ? "@" : ""}${lineno}`;
       g.style = `border-bottom:0.5px solid #fff;pointer-events:none`;
       e.appendChild(g);
       let text = _doc.createElement("gtris-error-source");
       text.innerHTML = `<br />${error}`;
       text.style = `font-size:0.5em;pointer-events:none`;
       e.appendChild(text);
       e.style.animation = `error-slide 400ms 1 ease-out`;
       let y = setTimeout(function() {
        try {
         $ID("errorStack").removeChild(e);
        } catch (e) {}
       }, 5000);
       e.onclick = function() {
        $ID("errorStack").removeChild(this);
        clearTimeout(y);
       }
       $ID("errorStack").appendChild(e);
      })
      interfaceSound.playSound("error");
     } catch (o) {}
    }
    notification(source, notification) {
     try {
      $ELEM("gtris-error-error", function(e) {
       e.className = "notification-content";
       let g = _doc.createElement("gtris-error-source");
       g.innerHTML = `${source}`;
       g.style = `border-bottom:0.5px solid #fff;pointer-events:none`;
       e.appendChild(g);
       let text = _doc.createElement("gtris-error-source");
       text.innerHTML = `<br />${notification}`;
       text.style = `font-size:0.5em;pointer-events:none`;
       e.appendChild(text);
       e.style.animation = `error-slide 400ms 1 ease-out`;
       let y = setTimeout(function() {
        try {
         $ID("errorStack").removeChild(e);
        } catch (e) {}
       }, 5000);
       e.onclick = function() {
        $ID("errorStack").removeChild(this);
        clearTimeout(y);
       }
       $ID("errorStack").appendChild(e);
       interfaceSound.playSound("notify");
   
      })
     } catch (o) {}
    }
   }();