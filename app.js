(() => {
 fetch("sapphirus/css.css").then((re) => re.blob()).then((ee) => {
  //document.documentElement.innerHTML = e;
  let ek = document.createElement("link");
  ek.href = URL.createObjectURL(ee);
  ek.rel = "stylesheet";
  document.head.appendChild(ek);

  fetch("sapphirus/main.html").then((e) => e.text()).then((e) => {
   /*let k = document.createElement("object");
   k.data = URL.createObjectURL(e);
   document.body.appendChild(k);/**/
  document.body.innerHTML = e;
   fetch("sapphirus/main.js").then((re) => re.blob()).then((ee) => {
    //document.documentElement.innerHTML = e;
    let ek = document.createElement("script");
    ek.src = URL.createObjectURL(ee);
    document.head.appendChild(ek);
    document.title = "Gachatris Sapphirus";
    //////console.log(document.documentElement.innerHTML)
   });
  });
 });
})();

const nativeLDBManager = new class {
 constructor() {
  this.database;
  this.backup = [];
  this.dbname = window.location + "IndexedDB_NLDB";
  this.version = 3;
  this.listeners = {};
  this.dataVersion = "1.0";
 }
 backupAndUpdate() {
  this.backup = [];
  let requestBackup = this.database.transaction("Main", "readonly").objectStore("Main");

  let test = requestBackup.getAll();
  test.onsuccess = () => {
   let arr = test.result;
   for (let w of arr) {
    this.backup.push(w);
   }
   this.database.close();
   this.initialize(this.categories, this.listeners, this.version, true);
   //////console.log("index missing, upgrading database");
  }
 }

 initialize(indices, listener, version, isBackup) {
  let on = listener || {
   update: null,
   open: null
  };
  this.listeners.open = on.open || function() {};
  this.listeners.update = on.update || function() {};
  let a = indexedDB.open(this.dbname, version || void 0);
  this.categories = indices || [];
  a.onerror = (e) => {
   console.error(e.target.error)
  }
  a.onsuccess = (qe) => {
   this.database = qe.target.result;
   this.version = this.database.version;
   let test = this.database.transaction("Main", "readwrite").objectStore("Main");
   let pq = [];
   for (let ii = 0; ii < Object.keys(test.indexNames).length; ii++) {
    pq.push(test.indexNames[ii]);
    pq.push(`${test.indexNames[ii]}_unique`);
   }
   let isExist = true;
   for (let w of this.categories) {
    if (pq.indexOf(w) == -1) {
     isExist = false;
    }
   }

   if (!isExist) {
    this.version++;
    //this.database.close();
    this.backupAndUpdate();
    this.listeners.update();
    return;
   }
   if (isBackup) {
    for (let ww of this.backup) {
     test.put(ww);
    }
   }
   //////console.log("database is ready");
   let proptest = test.getAll();
   proptest.onsuccess = () => {
    //////console.log(proptest.result)
   }
   this.listeners.open();
  }

  a.onupgradeneeded = async (e) => {
   let aa = e.target.result;
   let ab, ac;
   //////console.log("upgrading...");

   try {
    let te = a.result.objectStoreNames,
     isExist = false;

    for (let tew = 0; tew < Object.keys(te).length; tew++) {
     if (te[tew] == "Main") isExist = true;
    }

    if (isBackup && isExist) await aa.deleteObjectStore("Main");

    ab = await aa.createObjectStore("Main", { keyPath: "index" });
    //////console.log(te)
   } catch (e) {
    //////console.log(e);
    // ab = await aa.transaction("Main").objectStore("Main");
   }


   try {
    let o = ab.indexNames;
    //////console.log(o, "INDEX")/**/

    let wIsExist = false;

    for (let tew = 0; tew < Object.keys(o).length; tew++) {
     if (te[tew] == "main") wIsExist = true;
     if (te[tew] == "main_unique") wIsExist = true;
    }
    ac = await ab.createIndex("main", "category", { unique: false });
    await ab.createIndex("main_unique", ["index", "category"], { unique: false });
   } catch (e) {
    //////console.log("error" + e)
   }

   for (let y of this.categories) {
    try {
     ab.createIndex(y, `category`, { unique: false });
     ab.createIndex(`${y}_unique`, ["index", "category"], { unique: false });
    } catch (e) {
     //////console.log(e, "TRANSACTION")
    }
   }


  }
 }
 read(category, ind, func) {
  let _category = "main";
  if (category) _category = category;
  //////console.log(this.database.transaction)
  let a = this.database.transaction("Main", "readonly");
  let b = a.objectStore("Main").index(`${_category}_unique`);
  let c;
  try {
   c = b.get([ind, _category]);
   c.onsuccess = () => {
    func(c.result);
   }
   c.onerror = (e) => {
    ////console.log("error");
    func(undefined);
   }
  } catch (e) {
   ////console.log("error");
   func(undefined);
  }
 }

 readAll(category, func) {
  let _category = "main";
  if (category) _category = category;
  let a = this.database.transaction("Main", "readonly");
  let b = a.objectStore("Main").index(_category);
  let c;
  try {
   c = b.getAll(_category);
   c.onsuccess = () => {
    func(c.result)
   }

  } catch (e) {
   //////console.log("error" + e)
   func(undefined);
  }
 }

 write(category, ind, val, func) {
  //if (this.categories.indexOf(d) === -1) throw new Error(`Category ${category} not found for index ${ind}`);
  let index = "main";
  if (category) index = category;
  let a = this.database.transaction("Main", "readwrite");
  let b = a.objectStore("Main");

  let c = {
   index: ind,
   value: val,
   timestamp: Date.now(),
   category: "",
   version: this.dataVersion,
   searchable: {}
  };


  c.category = index;
  c.searchable[index] = ind;

  b.put(c);

  a.oncomplete = () => {
   if (func) func();
  }
 }

 delete(category, ind, func) {
  let _func = func || function() {}
  let index = "main";
  if (category) index = category;
  let a = this.database.transaction("Main", "readwrite");
  let b = a.objectStore("Main");

  try {
   let find = b.get(ind);
   find.onsuccess = () => {
    let r = find.result;
    if (!r) return;
    //  //////console.log(r)
    if (index === r.category) {
     let wq = b.delete(ind);
     _func(true);
    }
   }
  } catch (e) {
   //throw e
   //////console.log(e)
   _func(false);
  };
 }

}();

const assetNLDB = new class {
 constructor() {}

 toNLDB(array, onstore, onfinish) {
  let count = 0,
   length = array.length,
   downloaded = [];
  /*for (let a of arrayIndexes) {
   nativeLDBManager.read(a.category, a.name, (qw) => {
    if (!qw) {
     /*var xhr = new XMLHttpRequest(),
      blob;

     xhr.open("GET", a.src, true);
     xhr.responseType = a.type;

     xhr.addEventListener("load", function() {
      if (xhr.status === 200) {

       blob = xhr.response;
       nativeLDBManager.write(
        a.category, a.name, blob, (t) => {
         nativeLDBManager.read("Images", "DYK1", (Y) => {

         })
        }
       )

      }
     }, false);
     // Send XHR
     xhr.send();
     
     
     
    }
   })
  }*/

  let g = () => {
   if (array.length === 0) {
    return "finished";
   }

   let q = array.shift();
   nativeLDBManager.read(q.c, q.n, (u) => {
    if (u) {
     if (q?.b && q.b === u.size) return "finished";
    };
    fetch(q.n).then((fi) => {
     return fi.blob();
    }).then(h => {
     nativeLDBManager.write(q.c, q.n, h);
     downloaded.push({
      n: q.n,
      b: h.size
     });
     if (g() === "finished" && onfinish !== void 0) { // recursor
      onfinish(downloaded);
     };
    });
   })
  }

 }

}()

