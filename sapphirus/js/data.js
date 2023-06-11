var GACHAMINO_SET;

const GACHAMINO_MATRIX = [
	 [
 	[
 		[2, 0, 0],
 		[2, 2, 0],
 		[0, 2, 0],
 	],
 	[
 		[0, 0, 0],
 		[0, 2, 2],
 		[2, 2, 0],
 	],
 	[
 		[0, 2, 0],
 		[0, 2, 2],
 		[0, 0, 2],
 	],
 	[
 		[0, 2, 2],
 		[2, 2, 0],
 		[0, 0, 0],
 	],
 ],
 [
 	[
 		[0, 3, 0],
 		[0, 3, 0],
 		[3, 3, 0]
 	],
  [
 		[0, 0, 0],
 		[3, 3, 3],
 		[0, 0, 3],
 	],
 	[
 		[0, 3, 3],
 		[0, 3, 0],
 		[0, 3, 0]
 	],
 	[
 		[3, 0, 0],
 		[3, 3, 3],
 		[0, 0, 0]
 	],

 ],
 [
 	[
 		[4, 4],
 		[4, 4],
 	],
 	[
 		[4, 4],
 		[4, 4],
 	],
 	[
 		[4, 4],
 		[4, 4],
 	],
 	[
 		[4, 4],
 		[4, 4],
 	]
 ],
  [
 	[
 		[0, 5, 0],
 		[5, 5, 0],
 		[5, 0, 0]
 	],
 	[
 		[0, 0, 0],
 		[5, 5, 0],
 		[0, 5, 5],
 	],
 	[
 		[0, 0, 5],
 		[0, 5, 5],
 		[0, 5, 0],
 	],
 	[
 		[5, 5, 0],
 		[0, 5, 5],
 		[0, 0, 0],
 	],
 ],
 [
  [
   [0, 6, 0, 0],
   [0, 6, 0, 0],
   [0, 6, 0, 0],
   [0, 6, 0, 0],
  ],
  [
   [0, 0, 0, 0],
   [0, 0, 0, 0],
   [6, 6, 6, 6],
   [0, 0, 0, 0]
  ],
  [
   [0, 0, 6, 0],
   [0, 0, 6, 0],
   [0, 0, 6, 0],
   [0, 0, 6, 0]
  ],
  [
   [0, 0, 0, 0],
   [6, 6, 6, 6],
   [0, 0, 0, 0],
   [0, 0, 0, 0]
  ]
 ],
 [
 	[
 		[7, 7, 0],
 		[0, 7, 0],
 		[0, 7, 0],
 	],
 	[
 		[0, 0, 0],
 		[7, 7, 7],
 		[7, 0, 0],
 	],
 	[
 		[0, 7, 0],
 		[0, 7, 0],
 		[0, 7, 7],
 	],
 	[
 		[0, 0, 7],
 		[7, 7, 7],
 		[0, 0, 0],
 	],
 ],
 [
 	[
 		[0, 8, 0],
 		[8, 8, 0],
 		[0, 8, 0],
 	],
 	[
 		[0, 0, 0],
 		[8, 8, 8],
 		[0, 8, 0],
 	],
 	[
 		[0, 8, 0],
 		[0, 8, 8],
 		[0, 8, 0],
 	],
 	[
 		[0, 8, 0],
 		[8, 8, 8],
 		[0, 0, 0],
 	],
 ],


];

const GACHAMINO_WK_SRSX = {
 I: {
  right: [
  [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]],
  [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
  [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
  [[0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]]],
  left: [
  [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
  [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
  [[0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]],
  [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]]],
  double: [
  [[0, 0], [-1, 0], [-2, 0], [1, 0], [2, 0], [0, 1], [0, 0]],
  [[0, 0], [0, 1], [0, 2], [0, -1], [0, -2], [-1, 0], [0, 0]],
  [[0, 0], [1, 0], [2, 0], [-1, 0], [-2, 0], [0, -1], [0, 0]],
  [[0, 0], [0, 1], [0, 2], [0, -1], [0, -2], [1, 0], [0, 0]]],
 },
 other: {
  right: [
  [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]]],
  left: [
  [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]]],
  double: [
  [[0, 0], [1, 0], [2, 0], [1, 1], [2, 1], [-1, 0], [-2, 0], [-1, 1], [-2, 1], [0, -1], [3, 0], [-3, 0], [0, 0]],
  [[0, 0], [0, 1], [0, 2], [-1, 1], [-1, 2], [0, -1], [0, -2], [-1, -1], [-1, -2], [1, 0], [0, 3], [0, -3], [0, 0]],
  [[0, 0], [-1, 0], [-2, 0], [-1, -1], [-2, -1], [1, 0], [2, 0], [1, -1], [2, -1], [0, 1], [-3, 0], [3, 0], [0, 0]],
  [[0, 0], [0, 1], [0, 2], [1, 1], [1, 2], [0, -1], [0, -2], [1, -1], [1, -2], [-1, 0], [0, 3], [0, -3], [0, 0]]],
 },
 O: {
  right: [
  [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2], [0, 3], [-1, 3], [0, 0]],
  [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2], [0, -3], [1, -3], [0, 0]],
  [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2], [0, 3], [1, 3], [0, 0]],
  [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2], [0, 3], [-1, -3], [0, 0]]],
  left: [
  [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2], [0, 3], [1, 3], [0, 0]],
  [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2], [0, -3], [1, -3], [0, 0]],
  [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2], [0, 3], [-1, 3], [0, 0]],
  [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2], [0, 3], [-1, -3], [0, 0]]],
  double: [
  [[0, 0], [1, 0], [2, 0], [1, 1], [2, 1], [-1, 0], [-2, 0], [-1, 1], [-2, 1], [0, -1], [3, 0], [-3, 0], [0, 0]],
  [[0, 0], [0, 1], [0, 2], [-1, 1], [-1, 2], [0, -1], [0, -2], [-1, -1], [-1, -2], [1, 0], [0, 3], [0, -3], [0, 0]],
  [[0, 0], [-1, 0], [-2, 0], [-1, -1], [-2, -1], [1, 0], [2, 0], [1, -1], [2, -1], [0, 1], [-3, 0], [3, 0], [0, 0]],
  [[0, 0], [0, 1], [0, 2], [1, 1], [1, 2], [0, -1], [0, -2], [1, -1], [1, -2], [-1, 0], [0, 3], [0, -3], [0, 0]]],
 },

};


const GACHAMINO_SPIN = {
  I: {
   highX: [[1, 2, 2, 1], [1, 3, 1, 3], [1, 2, 2, 1], [0, 2, 0, 2]],
   highY: [[0, 2, 0, 2], [1, 2, 2, 1], [1, 3, 1, 3], [1, 2, 2, 1]],
   lowX: [[-1, 4, -1, 4], [2, 2, 2, 2], [-1, 4, -1, 4], [1, 1, 1, 1]],
   lowY: [[1, 1, 1, 1], [-1, 4, -1, 4], [2, 2, 2, 2], [-1, 4, -1, 4]]
  },
  J: {
   highX: [[1, 2], [2, 2], [1, 0], [0, 0]],
   highY: [[0, 0], [1, 2], [2, 2], [1, 0]],
   lowX: [[0, 2], [0, 0], [2, 0], [2, 2]],
   lowY: [[2, 2], [0, 2], [0, 0], [2, 0]]
  },
  L: {
   highX: [[1, 0], [2, 2], [1, 2], [0, 0]],
   highY: [[0, 0], [1, 0], [2, 2], [1, 2]],
   lowX: [[2, 0], [0, 0], [0, 2], [2, 2]],
   lowY: [[2, 2], [2, 0], [0, 0], [0, 3]]
  },
  O: {
   highX: [[0, 1], [2, 2], [1, 0], [-1, -1]],
   highY: [[-1, -1], [0, 1], [2, 2], [1, 0]],
   lowX: [[1, 0], [-1, -1], [0, 1], [2, 2]],
   lowY: [[2, 2], [1, 0], [-1, -1], [0, 1]]
  },
  S: {
   highX: [[0, 2], [1, 2], [2, 0], [1, 0]],
   highY: [[0, 1], [2, 0], [2, 1], [0, 2]],
   lowX: [[0, -1], [1, 2], [-1, 3], [1, 0]],
   lowY: [[0, 1], [-1, 3], [2, 1], [3, -1]]
  },
  T: {
   highX: [[0, 2], [2, 2], [0, 2], [0, 0]],
   highY: [[0, 0], [0, 2], [2, 2], [0, 2]],
   lowX: [[0, 2], [0, 0], [0, 2], [2, 2]],
   lowY: [[2, 2], [0, 2], [0, 0], [0, 2]]
  },
  Z: {
   highX: [[2, 0], [2, 1], [0, 2], [0, 1]],
   highY: [[0, 1], [2, 0], [2, 1], [0, 2]],
   lowX: [[-1, 3], [2, 1], [3, -1], [0, 1]],
   lowY: [[0, 1], [-1, 3], [2, 1], [3, -1]]
  },
 },
 GACHAMINO_SPAWN_OFFSETS = {
  Z: [3, 0],
  L: [3, 0],
  O: [4, 0],
  S: [3, 0],
  I: [3, 0],
  J: [3, 0],
  T: [3, 0],
 };

GACHAMINO_SET = (function() {
 var a = [];
 var b = ["Z", "L", "O", "S", "I", "J", "T"];
 for (let i = 0; i < 7; i++) {
  a.push({
   index: i,
   x: GACHAMINO_SPAWN_OFFSETS[b[i]][0],
   y: GACHAMINO_SPAWN_OFFSETS[b[i]][1],
   matrix: GACHAMINO_MATRIX[i],
   wallKick: GACHAMINO_WK_SRSX[b[i] == "I" ? "I" : (b[i] == "O" ? "O" : "other")],
   spinDetection: GACHAMINO_SPIN[b[i]]
  });
 };
 return a;
})();
//////console.log(GACHAMINO_SET)
const SCORE_TABLE = {
  pc: {
   b2b: {
    spin: [0, 2300, 3500, 5400],
    mini: [0, 1500, 2100, 2400],
    line: [0, 0, 0, 0, 3200, 4200],
   },
   nob2b: {
    spin: [0, 1200, 2400, 3600],
    mini: [0, 1000, 1400, 1800],
    line: [0, 800, 1200, 1800, 2000, 2800],
   }
  },
  nopc: {
   b2b: {
    spin: [400, 1200, 1600, 2400],
    mini: [100, 300, 600, 900],
    line: [0, 0, 0, 0, 1200, 1900],
   },
   nob2b: {
    spin: [400, 800, 1200, 1600],
    mini: [100, 200, 400, 600],
    line: [0, 100, 300, 500, 800, 1400],
   }
  },
  combo: 50,
 },

 GAME_PARAMETERS = {
  overall: {
   pro_gachatris: ["mode_off", "mode_on"],
  },
  vs: {
   is_frenzy: ["mode_off", "mode_on"],
   allspin: ["mode_off", "mode_on"]
  },
  wormhole: {
   is_frenzy: ["mode_off", "mode_on"],
   allspin: ["mode_off", "mode_on"]
  },
  defense: {
   is_frenzy: ["mode_off", "mode_on"],
   allspin: ["mode_off", "mode_on"]
  },
  zen: {
   is_frenzy: ["mode_off", "mode_on"],
   allspin: ["mode_off", "mode_on"]
  }
 },
 SETTINGS_RANGE = {
  ai: {
   speed: (function() {
    var a = [],
     b = [];
    for (var f = 1; f <= 5000; f++) {
     a.push(f);
     b.push(`${f} / 5000 (${(500 / f).toFixed(3)}Hz)`);
    }
    return {
     values: a,
     textValues: b
    }
   })(),
  },
  tune: {
   autodel: {
    values: $RANGE(0, 1000),
    textValues: $RANGE(0, 1000)
   },
   autorate: {
    values: $RANGE(0, 1000),
    textValues: $RANGE(0, 1000)
   },
   gravity: (function() {
    var a = [],
     b = [];
    b.push(`${1} / 500G (${((1 / 500) * (1000 / 60)).toFixed(3)}Hz)∆`);
    a.push(1 / 500);
    for (var f = 0; f < 500; f++) {
     a.push(f / 500);
     b.push(`${f} / 500G (${((f / 500) * 60).toFixed(3)}Hz)`);
    }
    for (var f = 1; f < 20; f++) {
     a.push(f);
     b.push(`${f}F(${((f) * 60).toFixed(3)}Hz)`);
    }
    return {
     values: a,
     textValues: b
    };
   })(),
   softdrop: (function() {
    var a = [],
     b = [];
    for (var f = 1; f <= 500; f++) {
     a.push(f / 500);
     b.push(`${f} / 500G`);
    }
    for (var f = 1; f <= 20; f++) {
     a.push(f);
     b.push(`${f}G`);
    }
    return {
     values: a,
     textValues: b
    };
   })(),
   preview: {
    values: $RANGE(0, 14),
    textValues: $RANGE(0, 14)
   },
   lock: (function() {
    var a = [];
    for (let z = 0; z <= 3000; z += 10) {
     a.push(`${z}F (${(z / 500) * 1000}ms)`)
    }
    return {
     textValues: a,
     values: $RANGE(0, 3000, 10)
    };
   })(),
  },
  volume: {
   sound: (function() {
    var a = [];
    for (let z = 0; z <= 100; z += 1) {
     a.push(`${z}%`)
    }
    return {
     textValues: a,
     values: $RANGE(0, 100, 1)
    }
   })(),
   music: (function() {
    var a = [];
    for (let z = 0; z <= 100; z += 1) {
     a.push(`${z}%`);
    }
    return {
     textValues: a,
     values: $RANGE(0, 100, 1)
    }
   })(),
   interface: (function() {
    var a = [];
    for (let z = 0; z <= 100; z += 1) {
     a.push(`${z}%`);
    }
    return {
     textValues: a,
     values: $RANGE(0, 100, 1)
    };
   })(),
  },
  video: {
   fieldSize: (function() {
    var a = [];
    for (let z = 0.15; z <= 2.5; z += 0.050) {
     a.push(`x${z.toFixed(2)}`);
    }
    return {
     textValues: a,
     values: $RANGE(0.15, 2.5, 0.05)
    };
   })(),

   blurLevel: (function() {
    var a = [];
    for (let z = 0; z <= 4; z += 1) {
     a.push(`${z}`);
    }
    return {
     textValues: a,
     values: $RANGE(0, 4, 1)
    };
   })(),
   particleLevel: (function() {
    var a = [];
    for (let z = 0; z <= 6; z += 1) {
     a.push(`${z}`);
    }
    return {
     textValues: a,
     values: $RANGE(0, 6, 1)
    };
   })(),
   fieldSwayLevel: (function() {
    var a = [];
    for (let z = 0; z <= 8; z += 1) {
     a.push(`${z}`);
    }
    return {
     textValues: a,
     values: $RANGE(0, 8, 1)
    };
   })(),
   fieldShakeDamage: (function() {
    var a = [];
    for (let z = 0; z <= 2; z += 0.1) {
     a.push(`x${z.toFixed(1)}`);
    }
    return {
     textValues: a,
     values: $RANGE(0, 2, 0.1)
    };
   })(),
  },
  vs: {
   wincount: {
    values: $RANGE(1, 14),
    textValues: $RANGE(1, 14)
   },
   reception: {
    values: $RANGE(0, 20),
    textValues: $RANGE(0, 20)
   },
  }
 },
 SETTINGS_LIST = {
  ai: {
   tspin: ["ai_tspin_off", "ai_tspin_on"],
  },
  audio: {
   soundbank: ["setting_soundbank_default", "setting_soundbank_tetraplus"],
   musicbank: ["setting_musicbank_sapphyra", "setting_musicbank_hanriade", "setting_musicbank_boss"]
  },
  video: {
   cleartext: ["setting_off", "setting_on"],
   pieceGhost: ["setting_off", "setting_on"],
   pieceFlash: ["setting_off", "setting_on"],
  },
  mobile_controls: {
   isOn: ["setting_on", "setting_off"],
  }
 },
 CHARACTERS = [];

const gameStorage = new class {
  constructor() {
   this.ls = (window.localStorage);
   this.name = window.location + "::GTS_LOCALSTORAGE";
   //////console.log(this.name);
   this.currentSettings;
   this.defaultSettings = {
    binds: {
     pause: 27,
     LEFT: 37,
     RIGHT: 39,
     SOFTDROP: 40,
     HARDDROP: 32,
     HOLD: 67,
     CW: 88,
     CCW: 90,
     C180W: 16,
     retry: 82,
    },
    modes: {
     overall: {
      pro_gachatris: 0
     },
     vs: {
      tspin: 0,
      is_frenzy: 0,
      allspin: 0,
      wincount: 1,
      reception: 0
     },
     defense: {
      tspin: 0,
      is_frenzy: 0,
      allspin: 0,
     },
     wormhole: {
      tspin: 0,
      is_frenzy: 0,
      allspin: 0,
     },
     zen: {
      is_frenzy: 0,
      allspin: 0,
     }
    },
    settings: {
     tune: {
      gravity: 0,
      autodel: 40,
      autorate: 1,
      softdrop: 355,
      preview: 5,
      lock: 25,
     },
     volume: {
      music: 100,
      sound: 100,
      interface: 100
     },
     audio: {
      soundbank: 0,
      musicbank: 0
     },
     mobile_controls: {
      isOn: 0,
     },
     video: {
      fieldSwayLevel: 0,
      particleLevel: 0,
      cleartext: 1,
      blurLevel: 0,
      pieceGhost: 1,
      fieldSize: SETTINGS_RANGE.video.fieldSize.values.indexOf(0.85),
      pieceFlash: 1,
      fieldShakeDamage: 2,
      
     },
     misc: {
      name: "Player",
      character: "0-0",
      nldb: 0,
     }
    }
   };
   this.currentSettings = this.defaultSettings;
   this.sessionSettings = {
    playerAI: [
     {
      isAi: true,
      delayReset: 577,
      enableTspin: 0,
      character: "0-0",
      name: "Computer 1",
      isCmb: 1,
      ppsLimit: 999
    },
   ],
   }
  }
  loadStorage() {
   let evaluator = JSON.parse(this.ls.getItem(this.name));
   /*for (let a in evaluator) {
    for (let b in evaluator[a]) {
     if (typeof this.currentSettings[a][b] !== "object") {
      this.currentSettings[a][b] = evaluator[a][b];
     } else
      for (let c in evaluator[a][b]) {
       this.currentSettings[a][b][c] = evaluator[a][b][c];
      }
    }
   }*/
   if (this.ls.getItem(this.name) === null || Object.keys(evaluator).length == 0) return;
   let func = (base, check) => {
    //console.log(base, check)
    if (typeof check !== "undefined") for (let a in base) {
     if (typeof base[a] !== "object") {
      if (typeof check[a] !== "object") base[a] = check[a];
     } else func(base[a], check[a]);
    }

   }
   func(this.currentSettings, evaluator);
   ////console.log(this.currentSettings)
  }

  saveStorage() {
   this.ls.setItem(this.name, JSON.stringify(this.currentSettings))
  }
 }(),
 CONTAINER_DEFAULT = {
  ais: [
   {
    isAi: true,
    delayReset: 47,
    enableTspin: false,
    character: 1,
    name: "",
    isCmb: false,
    ppsLimit: 999
   },
  ]
 }


const KEY_FLAGS = {
 LEFT: 1,
 RIGHT: 2,
 SOFTDROP: 4,
 HARDDROP: 8,
 HOLD: 16,
 CW: 32,
 CCW: 64,
 C180W: 128,
};


const keyboardControls = new class {
 #isSelectingKey = null;

 #cancelChange() {
  this.editActiveKeybinding(true);
 }

 checkTextAreaOut(e, func) {
  let checkTextarea = $QUERY("textarea"),
   isCheckTextArea = false;
  for (let o of checkTextarea) {
   if (o.style.display !== "none") isCheckTextArea = true;
  }
  if (!isCheckTextArea) {
   func(e);
  }
 }

 kFlag(code) {
  if (code) {
   for (let r = Object.keys(KEY_FLAGS)[0], f = 0, g = Object.keys(KEY_FLAGS).length; f < g; f++, r = Object.keys(KEY_FLAGS)[f]) {
    if (gameStorage.currentSettings.binds[r] === code) {
     if (KEY_FLAGS?.[r]) {
      return KEY_FLAGS[r];
     }
    }
   }
  }
  return 0;
 }
 editActiveKeybinding(cancel, name, config) {
  if (cancel) {
   this.#isSelectingKey = null;
   gameMenu.showHideLoading(false);
   $ID("loadingMenu").removeEventListener("mousedown", () => this.#cancelChange(), false);
   return;
  }
  if (name in gameStorage.currentSettings.binds) {
   this.#isSelectingKey = name;
   $ID("loadingMenu").addEventListener("mousedown", () => this.#cancelChange(), false);
   gameMenu.showHideLoading(true, gachatrisLanguage.transText1("set_bind_loadtext_configuring", gachatrisLanguage.transText1(config)));
  }
 }
 interact(evt) {
  if (this.#isSelectingKey !== null) {
   gameMenu.switchMenu("restart");
   let bind = gameStorage.currentSettings.binds;

   for (let o in bind) {
    if (bind[o] == evt.keyCode) bind[o] = "NONE";
   }

   bind[this.#isSelectingKey] = evt.keyCode;
   this.editActiveKeybinding(true);
   this.#isSelectingKey = null;
   return;
  }
  if (gameMenu.loadingMenuShown) return;
  if ([32, 37, 38, 39, 40].indexOf(evt.keyCode) !== -1)
   evt.preventDefault();
  if (evt.type === "keydown") {
   switch (evt.keyCode) {
    case gameStorage.currentSettings.binds.pause: {
     this.checkTextAreaOut(evt, () => {
      gameManager.pauseGame(!gameManager.isPaused);
     });
     break;
    }
    case gameStorage.currentSettings.binds.retry: {
     this.checkTextAreaOut(evt, () => {
      gameManager.prepareInitialization(gameManager.mode);
     });
     break;
    }
   }
  }
  if (!gameManager.isReplay && gameManager.players?.[0]) {
   var flag = this.kFlag(evt.keyCode);
   if (evt.type === "keydown") {
    gameManager.keysPressed |= flag;
   } else if (evt.type === "keyup") {
    gameManager.keysPressed &= ~flag;
   }
  }
 }
}();