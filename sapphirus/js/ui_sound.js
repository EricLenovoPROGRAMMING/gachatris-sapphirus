const interfaceSound = new class {
  constructor() {
    this.s = {};
    this.arr = ["click", "hover", "back", "slide", "error", "notify", "intro"];
  }

  init() {
    for (let e of this.arr) {
      cacheManager.loadCache(
       `assets/sounds/system/${e}.ogg`, (fname) => {
       return new Howl({
          src: fname,
          volume: gameStorage.currentSettings.settings.volume.interface / 100,
          preload: false
         });
      }, "audio", fui => {
       this.s[e] = fui.value;
      this.s[e].load();
      }); /**/
     
    }
  }

  vol() {
    for (let e of this.arr) {
    	try{
      this.s[e].volume(gameStorage.currentSettings.settings.volume.interface / 100);
    	}catch(e){}
    }
  }

  playSound(e) {
  	try{
    this.s[e].stop();
    this.s[e].play();
    this.vol();
  	}catch(e){}
  }
}()

!function(){
interfaceSound.init();
document.addEventListener("mouseover", function(e) {
  var el = e.target.tagName;
  if (el == 'GTRIS-NORMAL-BUTTON' || el == 'GTRIS-MAINMENU-BUTTON' ||el == 'GTRIS-NORMAL-BUTTON2')
    interfaceSound.playSound("hover");
})
document.addEventListener("click", function(e) {
  var el = e.target;
  if (el.tagName == 'GTRIS-NORMAL-BUTTON' || el.tagName == 'GTRIS-MAINMENU-BUTTON' || el.tagName == 'GTRIS-NORMAL-BUTTON2')
    interfaceSound.playSound("click");
  if (el.id == 'headerBackButton')
    interfaceSound.playSound("back");
})
document.addEventListener("input", function(e) {
  var el = e.target;
  if (el.type == 'range'){
    interfaceSound.playSound("slide");
    interfaceSound.vol();
  }
})
}()


