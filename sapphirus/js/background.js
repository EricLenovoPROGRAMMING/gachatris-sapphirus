const gameBackground = new class {
 constructor() {
  this.background = $ID("gameBg");
  this.image = $ID("gameBgImg");
  this.currentSrc = "";
  this.imageLoaded = true;
  this.currentImage = new Image();
 }
 async loadImage(src) {
  if (src !== this.currentSrc) {
   this.currentSrc = src;
   

   cacheManager.loadCache(this.currentSrc, (fname) => {
    let s = new Image();
    s.src = fname;
    return s;
   }, "background", fui => {
   this.currentImage.src = fui.value.src;
   this.image.src = fui.value.src;
   if (!cacheManager.checkLoad(this.currentSrc)) {
    for (let e of ["load", "error"]) {
     this.currentImage.addEventListener(e, evt => {
      this.imageLoaded = true;
      cacheManager.boolLoad(this.currentSrc, true);
      this.switchBg(true);
     })
    }

   } else this.imageLoaded = true;
   });
   
   this.imageLoaded = false;
  }
 }
 switchBg(bool) {
  this.background.style.display = bool ? "block" : "none"
 }
}();