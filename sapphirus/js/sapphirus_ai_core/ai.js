const SapphirusAI = class {
 #worker;
 #base64;
 constructor(name) {
  this.#worker = workerManager.engageWorker(name || $UID(20), gameManager.miscellaneous.ai, (worker) => {
    this.#worker = worker.worker;
   }).worker;
   
 }

 evaluate(jsobj) {
  try {
  this.#worker.postMessage(jsobj);
  } catch(e) {
   //console.log(e);
  }
  
  return new Promise((res) => {
   this.#worker.addEventListener("message", (te) => {
    res(te.data);
   }, { once: true });
  });
 }



}; /**/