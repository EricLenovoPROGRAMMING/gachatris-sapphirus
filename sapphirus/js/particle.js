class GachatrisParticle {
 constructor(duration, spriteRow, spriteCol, startX, startY, endX, endY, size, type, color, fn) {
  this.x = startX;
  this.y = startY;
  this.startX = startX;
  this.startY = startY;
  this.spriteCell = spriteCol;
  this.spriteRow = spriteRow;
  this.endX = endX;
  this.endY = endY;
  this.duration = duration;
  this.size = size;
  this.maxDuration = duration;
  this.elapsed = 0;
  this.type = type;
  this.color = {
   r: color.r,
   g: color.g,
   b: color.b
  }
  this.color.isRandom = color == "random";
  this.callback = fn;
  if (this.type === "randomEase") {
   this.random1 = (Math.random() * 2);
   this.random2 = (Math.random() * 2);
  }
 };
 update() {
  this.duration--;
  this.elapsed++;
  if (this.type == "linear") {
   this.x = this.startX + ((this.endX - this.startX) * (this.duration / this.maxDuration));
   this.y = this.startY + ((this.endY - this.startY) * (this.duration / this.maxDuration));
  } else if (this.type == "ease") {
   this.y = (this.bezier(
    this.duration / this.maxDuration,
    this.startY,
    this.startY * 1.2,
    this.endY * 1.9,
    this.endY
   ));
   this.x = this.startX + ((this.endX - this.startX) * (this.duration / this.maxDuration));
  } else if (this.type == "ease2") {
   this.x = this.startX + ((this.endX - this.startX) * this.bezier(this.duration / this.maxDuration,
    0,
    0.8,
    1,
    1));
   this.y = this.startY + ((this.endY - this.startY) * this.bezier(this.duration / this.maxDuration,
    0,
    1,
    1,
    1));
  } else if (this.type == "hardDrop") {
   this.x = this.startX + ((this.endX - this.startX) * this.bezier(this.duration / this.maxDuration,
    0,
    0,
    0,
    1));
   this.y = this.startY + ((this.endY - this.startY) * this.bezier(this.duration / this.maxDuration,
    0,
    0,
    0,
    1));
  } else if (this.type == "randomEase") {
   this.x = this.startX + ((this.endX - this.startX) * this.bezier(this.duration / this.maxDuration,
    0,
    this.random1,
    this.random2,
    1));
   this.y = this.startY + ((this.endY - this.startY) * this.bezier(this.duration / this.maxDuration,
    0,
    1,
    1,
    1));
  } else if (this.type == "fall") {
   this.x = this.startX + ((this.endX - this.startX) * this.duration / this.maxDuration);
   this.y = this.startY + ((this.endY - this.startY) * this.bezier(this.duration / this.maxDuration,
    0,
    0,
    1,
    1));
  }
 };
 getX() {
  return this.x;
 };
 getY() {
  return this.y;
 }
 opacityFade() {
  return (Math.min(1, (this.duration * 2.5) / this.maxDuration));
 }
 basicParticle(ctx) {
  let size = this.size * gachatrisCore.CELL_SIZE * 0.2;
  let color = !this.color.isRandom ? this.color : {
   r: ~~(Math.random() * 255),
   g: ~~(Math.random() * 255),
   b: ~~(Math.random() * 255)
  };
  ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${Math.floor(Math.min(100, (this.duration * 250) / this.maxDuration))}%`;
  //ctx.arc(this.x, this.y, size, 0, 2 * Math.PI, 0);
  //ctx.fill();
  ctx.fillRect(this.x, this.y, size, size);
 }
 bezier(t, initial, p1, p2, final) {
  return (1 - t) * (1 - t) * (1 - t) * initial +
   3 * (1 - t) * (1 - t) * t * p1 +
   3 * (1 - t) * t * t * p2 +
   t * t * t * final;
 }
}

const particleManager = new class {
 constructor() {
  this.canvas = $ID("particleCanvas");
  this.ctx = this.canvas.getContext("2d");
  this.canvas2;
  $ELEM("CANVAS", (e) => {
   this.canvas2 = e;
  });
  this.ctx2 = this.canvas2.getContext("2d");
  this.intrv = 10;
  this.particles = [];
  this.isClear = false;
 }

 refresh() {
  if (this.intrv < 0) {
   this.intrv = gameManager.isAsyncOrSyncLoop ? 2 : -7;
   //this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
   if (this.particles.length > 0) {
    this.clear(this.ctx);
    for (let i = 0, len = this.particles.length; i < len; i++) {
     if (typeof this.particles[i] !== "undefined") {
      this.particles[i].update();
      if (this.particles[i].spriteRow > 0) {
       this.dynamicDraw(
        this.particles[i].getX(),
        this.particles[i].getY(),
        this.particles[i].spriteRow,
        this.particles[i].spriteCell,
        this.particles[i].duration > 0 ? this.particles[i].size : 0
       );
      } else {
       this.particles[i].basicParticle(this.ctx);
      }
      if (this.particles[i].duration < -30) {
       this.particles.splice(i, 1);
       len--;
       i--
      }
     }
     this.isClear = false;
    }
    this.ctx2.globalAlpha = 0.2;
    this.ctx.drawImage(this.canvas2, 0, 0, this.canvas.width, this.canvas.height);
    this.ctx2.globalCompositeOperation = "destination-out";
    this.ctx2.fillRect(0, 0, this.canvas2.width, this.canvas2.height);
    this.ctx2.globalCompositeOperation = "source-over"; /**/
    this.ctx2.globalAlpha = 1;
   } else {
    if (!this.isClear) {
     this.clear(this.ctx);
     this.clear(this.ctx2);
     this.isClear = true
    }
   }
  } else {
   this.intrv--;
  }
 }

 addParticle(spriteRow, spriteCell, startX, startY, endX, endY, duration, size, type, clr, fn) {
  if (!gameManager.movingReplay) {
   let color = clr ? clr : {
    r: 255,
    g: 255,
    b: 255
   }
   this.particles.push(new GachatrisParticle(duration, spriteRow, spriteCell, endX - ((size * gachatrisCore.PLAYERCLASSAREA_SIZE) / 2), endY - ((size * gachatrisCore.PLAYERCLASSAREA_SIZE) / 2), startX - ((size * gachatrisCore.PLAYERCLASSAREA_SIZE) / 2), startY - ((size * gachatrisCore.PLAYERCLASSAREA_SIZE) / 2), size, type ? type : "ease", color, fn))
  }
  
 };

 dynamicDraw(x, y, r, cell, size) {
  x = ~~x;
  var row;
  var type;

  if (r == 1) {
   type = gachatrisCore.GACHATRIS_CANVAS.skinParticle;
   row = 0;
  }
  else {
   type = gachatrisCore.GACHATRIS_CANVAS.skin;
   row = r - 2;
  }
  this.ctx2.drawImage(
   type,
   cell * gachatrisCore.CELL_SIZE,
   row * gachatrisCore.CELL_SIZE,
   gachatrisCore.CELL_SIZE,
   gachatrisCore.CELL_SIZE,
   x,
   y,
   size * gachatrisCore.PLAYERCLASSAREA_SIZE,
   size * gachatrisCore.PLAYERCLASSAREA_SIZE,
  );
 };

 size(w, h) {
  this.canvas.width = w;
  this.canvas.height = h;
  this.canvas2.width = w;
  this.canvas2.height = h;
 }

 clear(context) {
  context.clearRect(
   0,
   0,
   context.canvas.width,
   context.canvas.height
  )
 }


}();