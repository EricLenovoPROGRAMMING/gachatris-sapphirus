const gachatrisCore = new class {
 constructor() {
  this.CELL_SIZE = 0;
  this.PLAYERCLASSAREA_SIZE = 2;
  this.MAIN_FPS = 500;
  this.GRAVITY_CONSTANT = 1 / 2048;
  this.currentSkin = {
   img1: new Image(),
   src1: "",
   img2: new Image(),
    src2: "",
    
   img3: new Image(),
    src3: "",
   isOk1: true,
   isOk2: true,
    isOk3: true
  };
  
  this.GRAVITY_ARRAY = (function() {
    var arr = [];
    for (var i = 0; i < this.MAIN_FPS; i++) {
     arr.push(i / 512);
    };
    for (var i = 0; i < 20; i++) {
     arr.push(i);
    };
    return arr;
   }).bind(this)(),
   this.GACHATRIS_CANVAS = {
    skin: $ID(`SkinCanvas`),
    skinParticle: $ID(`SkinCanvasParticle`),
   }
  this.GACHATRIS_CANVAS_CTXS = {
   skin: this.GACHATRIS_CANVAS.skin.getContext(`2d`),
   skinParticle: this.GACHATRIS_CANVAS.skinParticle.getContext(`2d`),
  };
  this.charactersList = "sapphirus.ericlenovo".split(".")
 }
 canvasSize(cnv, x, y) {
  this.GACHATRIS_CANVAS[cnv].width = x;
  this.GACHATRIS_CANVAS[cnv].height = y;
 }
 
 loadSkin(d) {
  let dir1 = `assets/skin/${d}/block.png`;
  let dir2 = `assets/skin/${d}/particle.png`;
  let dir3 = `assets/skin/${d}/flash_block.png`;
  if (this.currentSkin.src1 !== dir1) {
   //const skinImg = $ID(`SkinImage`);
   this.currentSkin.src1 = dir1;
   this.currentSkin.isOk1 = false;
   cacheManager.loadCache(dir1, (fname) => {
    let s = new Image();
    s.src = fname;
    return s;
   }, "skin", fui => {
    this.currentSkin.img1.src = fui.value.src;
    if (!cacheManager.checkLoad(dir1)) {
     for (let e of ["load", "error"]) {
      this.currentSkin.img1.addEventListener(e, evt => {
       this.currentSkin.isOk1 = true;
       cacheManager.boolLoad(dir1, true);
      });
     }

    } else this.currentSkin.isOk1 = true;
   });

  }
  if (this.currentSkin.src2 !== dir2) {
   //const skinImg = $ID(`SkinImage`);
   this.currentSkin.src2 = dir2;
   this.currentSkin.isOk2 = false;
   cacheManager.loadCache(dir2, (fname) => {
    let s = new Image();
    s.src = fname;
    return s;
   }, "skin", fui => {
    this.currentSkin.img2.src = fui.value.src;
    if (!cacheManager.checkLoad(dir2)) {
     for (let e of ["load", "error"]) {
      this.currentSkin.img2.addEventListener(e, evt => {
       this.currentSkin.isOk2 = true;
       cacheManager.boolLoad(dir2, true);
      });
     }

    } else this.currentSkin.isOk2 = true;
   });

  }
  if (this.currentSkin.src3 !== dir3) {
   //const skinImg = $ID(`SkinImage`);
   this.currentSkin.src3 = dir3;
   this.currentSkin.isOk3= false;
   cacheManager.loadCache(dir3, (fname) => {
    let s = new Image();
    s.src = fname;
    return s;
   }, "skin", fui => {
    this.currentSkin.img3.src = fui.value.src;
    if (!cacheManager.checkLoad(dir3)) {
     for (let e of ["load", "error"]) {
      this.currentSkin.img3.addEventListener(e, evt => {
       this.currentSkin.isOk3 = true;
       cacheManager.boolLoad(dir3, true);
      });
     }

    } else this.currentSkin.isOk3 = true;
   });

  }
  
  
 }


 createSkin(cellSize) {
  this.clearCanvas("skin");
//  const skinImg = $ID(`SkinImage`);
   this.GACHATRIS_CANVAS_CTXS.skin.drawImage(
    this.currentSkin.img1,
    0,
    0,
    cellSize * 11,
   cellSize * 2
   )
   this.GACHATRIS_CANVAS_CTXS.skin.drawImage(
    this.currentSkin.img3,
    0,
    cellSize * 2,
    cellSize * 11,
   cellSize
   )

/*  const skinImgParticle = $ID(`SkinImageParticle`);
  skinImgParticle.src = `sapphirus/skin/default/particle.png`;*/
  //skinImgParticle.onload = () => {
   this.GACHATRIS_CANVAS_CTXS.skinParticle.drawImage(
    this.currentSkin.img2,
    0,
    0,
    this.GACHATRIS_CANVAS.skinParticle.width,
    this.GACHATRIS_CANVAS.skinParticle.height
   )
 };
 
 drawFullScreenCanvas(ctx, input, w, h) {
  let gh = this.GACHATRIS_CANVAS_CTXS[ctx];
    gh.drawImage(
   input,
   0,
   0,
   w,
   h,
   0,
   0,
   gh.canvas.width,
   gh.canvas.height,
  );

 }

 cellDraw(ctx, x, y, color, row) {
  x = x * this.PLAYERCLASSAREA_SIZE;
  x = ~~x;
  y = y * this.TETRION_SIZE - (2 * this.PLAYERCLASSAREA_SIZE);
  this.GACHATRIS_CANVAS_CTXS[ctx].drawImage(
   this.GACHATRIS_CANVAS.skin,
   color * this.PLAYERCLASSAREA_SIZE,
   row * this.PLAYERCLASSAREA_SIZE,
   this.PLAYERCLASSAREA_SIZE,
   this.PLAYERCLASSAREA_SIZE,
   x,
   y,
   this.PLAYERCLASSAREA_SIZE,
   this.PLAYERCLASSAREA_SIZE,
  );
 };

 drawMatrix(ctx, matrix, cx, cy, color, row) {
  for (var x = 0, len = matrix.length; x < len; x++) {
   for (var y = 0, wid = matrix[x].length; y < wid; y++) {
    if (matrix[x][y])
     this.cellDraw(ctx, x + cx, y + cy, color !== void 0 ? color : matrix[x][y], row)
   }
  }
 }

 clearCanvas(ctx) {
  this.GACHATRIS_CANVAS_CTXS[ctx].clearRect(
   0,
   0,
   this.GACHATRIS_CANVAS_CTXS[ctx].canvas.width,
   this.GACHATRIS_CANVAS_CTXS[ctx].canvas.height
  )
 }

}()
/**/
