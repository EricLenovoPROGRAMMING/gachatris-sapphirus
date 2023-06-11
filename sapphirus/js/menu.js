const gameMenu = new class {
 constructor() {
  this.menuSections = $CLASS("menuSection");
  this.menuDiv = "fullMenu";
  this.pauseMenuDiv = "pauseMenuViewer";
  this.loadingMenuDiv = "loadingMenu";
  this.currentDirectory = "gtris";
  this.startTime = 0;
  this.actualFrames = 0;
  this.isRunning = false;
  this.menuShown = null;
  this.pauseMenuShown = null;
  this.loadingMenuShown = null;
  this.objsStored = {};
  this.timer = 0;
  this.current = {
   header: "",
   props: {},
   section: 0,
  };
  this.backButtonEnabled = true;
  $ID("headerBackButton").onclick = () => {
   if (this.backButtonEnabled) this.switchMenu("back");
  }
 };
 changeBlur() {
  _docElem.style.setProperty("--__blur1", `${gameStorage.currentSettings.settings.video.blurLevel}em`);
 }
 showHideMenu(showhide) {
  if (this.menuShown !== showhide) {
   this.menuShown = showhide;
   let delay = 400;
   let e = this.menuDiv;
   let _ = r => {
    $STYLE(e, "opacity", r && typeof r === "boolean" ? 1 : 0);
    //$STYLE(e, "display", r && typeof r === "boolean" ? "flex" : "none");
   }
   $STYLE(e, "animation", `none`);
   $ID(e).offsetHeight;

   function stopPropagate(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();
   }
   let arr = ["onclick", "onmouseover", "onmouseup", "onmousedown"];
   switch (this.menuShown) {
    case true:
     _(true);
     // this.switchMenuSection(this.current.section);
     $STYLE(e, "animation", `scale-in ${delay}ms 1 cubic-bezier(0,1,1,1)`);
     $STYLE(e, "pointerEvents", `auto`);
     for (let d of arr) $ID(e)[d] = function() {};
     break;
    case false:
     _(false);
     //for (let d of arr) $ID(e)[d] = stopPropagate;
     //this.switchMenuSection("none");
     $STYLE(e, "animation", `scale-out ${delay}ms 1 cubic-bezier(1,0,1,1)`);
     $STYLE(e, "pointerEvents", `none`);
     break;
   }
  }
 }

 showHidePause(showhide) {
  if (this.pauseMenuShown !== showhide) {
   this.pauseMenuShown = showhide;
   let delay = 400;
   let e = this.pauseMenuDiv;
   let _ = r => {
    $STYLE(e, "opacity", r && typeof r === "boolean" ? 1 : 0);
    //$STYLE(e, "display", r && typeof r === "boolean" ? "flex" : "none");
   }
   $STYLE(e, "animation", `none`);
   $ID(e).offsetHeight;

   function stopPropagate(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();
   }
   let arr = ["onclick", "onmouseover", "onmouseup", "onmousedown"];
   switch (this.pauseMenuShown) {
    case true:
     _(true);
     // this.switchMenuSection(this.current.section);
     $STYLE(e, "animation", `scale-in ${delay}ms 1 cubic-bezier(0,1,1,1)`);
     $STYLE(e, "pointerEvents", `auto`);
     for (let d of arr) $ID(e)[d] = function() {};
     break;
    case false:
     _(false);
     for (let d of arr) $ID(e)[d] = stopPropagate;
     //this.switchMenuSection("none");
     $STYLE(e, "animation", `scale-out ${delay}ms 1 cubic-bezier(1,0,1,1)`);
     $STYLE(e, "pointerEvents", `none`);
     break;
   }
  }
 }

 showHideLoading(showhide, text) {
  if (this.loadingMenuShown !== showhide) {
   this.loadingMenuShown = showhide;
   let delay = 400;
   let e = this.loadingMenuDiv;
   let _ = r => {
    $STYLE(e, "opacity", r && typeof r === "boolean" ? 1 : 0);
    //$STYLE(e, "display", r && typeof r === "boolean" ? "flex" : "none");
   }
   $STYLE(e, "animation", `none`);
   $ID(e).offsetHeight;

   function stopPropagate(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();
   }
   let arr = ["onclick", "onmouseover", "onmouseup", "onmousedown"];
   switch (this.loadingMenuShown) {
    case true:
     _(true);
     // this.switchMenuSection(this.current.section);
     $STYLE(e, "animation", `scale-in ${delay}ms 1 cubic-bezier(0,1,1,1)`);
     $STYLE(e, "pointerEvents", `auto`);
     $IH("loadingMenuText", text || gachatrisLanguage.transText1("loadtext_loading"));
     break;
    case false:
     _(false);
     for (let d of arr) $ID(e)[d] = stopPropagate;
     //this.switchMenuSection("none");
     $STYLE(e, "animation", `scale-out ${delay}ms 1 cubic-bezier(1,0,1,1)`);
     $STYLE(e, "pointerEvents", `none`);
     break;
   }
  }
 }

 animateMenuSection(s, showhide) {
  let delay = 200;
  let e = $CLASS("menuSection", s).id;
  ////console.log("LEO", showhide, s)
  let _ = r => $STYLE(e, "opacity", r && typeof r === "boolean" ? 1 : 0);
  $STYLE(e, "animation", `none`);
  $ID(e).offsetHeight;
  switch (showhide) {
   case true:
    _(true);
    $STYLE(e, "animation", `transition-menu-in ${delay}ms 1 cubic-bezier(0, 1, 1, 1)`);
    $STYLE(e, "pointerEvents", `inherit`);
    break;
   case false:
    _(false);
    $STYLE(e, "animation", `transition-menu-out ${delay}ms 1 cubic-bezier(1, 0, 1, 1)`);
    $STYLE(e, "pointerEvents", `none`);
    break;
  }
 }
 showMenuSection(s, showhide) {
  let e = $CLASS("menuSection", s).id;
  let _ = r => $STYLE(e, "opacity", r && typeof r === "boolean" ? 1 : 0);
  $STYLE(e, "animation", `none`);
  $ID(e).offsetHeight;
  switch (showhide) {
   case true:
    _(true);
    $STYLE(e, "pointerEvents", `inherit`);
    break;
   case false:
    _(false);
    $STYLE(e, "pointerEvents", `none`);
    break;
  }
 }
 switchMenuSection(number) {
  for (let f of $CLASS("menuSection")) {
   f.classList.remove("activeMenu");
  }
  if (number === "none") return;
  $CLASS("menuSection", number).classList.add("activeMenu");
  //////console.log(number);
 };
 switchMenu(operation, directory, loadJson, section, disableBack, stopAmimate, header, headerInputArgs) {
  let ns = this.currentDirectory;
  if (operation == "add") {
   ns += `>${directory}::${section || 1}::${loadJson || "true"}::${disableBack || "false"}::${stopAmimate || "false"}::${header || "null"}${headerInputArgs ? `::${headerInputArgs.join("|•|")}` : ""}`;
  }
  //     >DIRECTORY::SECTION::LOAD_JSON_IF_TRUE::DISABLEBACK_IF_TRUE::STOPANIMATE_IF_TRUE::HEADER::ARRAYINPUTTRANSLATE
  if (operation == "back") {
   var f = ns.split(">");
   if (f.length > 0) f.pop();
   ns = f.join(">");
  }
  if (operation == "set") {
   ns = `gtris${directory ? ">" : ""}${directory}`;
  }
  if (operation == "restart") {
   //this.currentDirectory;
  }
  let nsp = ns.split(">");
  if (nsp.length == 0 &&  nsp.indexOf("gtris") == -1) {
   ns = "gtris";
  }
  //console.log(ns)
  if (ns.split("gtris").length < 2) return;
  this.currentDirectory = ns;
  ////console.log(this.currentDirectory);
  if(this.currentDirectory.split(">").length > 1) {
   gameMainMenu.showMenu(false);
  } else {
   gameMainMenu.showMenu(true);
   this.showHideMenu(false);
   gameMainMenu.show(true);
  }

  var j = this.currentDirectory.split(">"),
   q = j[j.length - 1].split("::");
  //console.log(this.currentDirectory);
  if (q[4] !== "true" && this.currentDirectory.split(">").length > 1) this.animateMenuSection(this.current.section, false);
  else this.showMenuSection(this.current.section, false);
  this.current.section = this.currentDirectory === "gtris" ? 0 : q[1];
  this.showBackButton(this.currentDirectory !== "gtris" && q[3] !== "true");
  this.backButtonEnabled = false;
  //////console.log(this.currentDirectory, this.current.section);

  if (q[4] !== "true") {
   this.timer = 200;
   this.switchMenuSection("none");
   this.startLoop();
  } else {
   this.switchMenuSection("none");
   this.showMenuSection(this.current.section, true);
   this.render(true);
  }
 }

 render(il) {
  try {
   let stopAnimating = il;
   let g = this.currentDirectory.split(">"),
    b = g[g.length - 1].split("::");
    if (g.length > 1) {
     this.showHideMenu(true);
    }
   if (this.currentDirectory !== "gtris" && !this.objsStored?.[b[0]] && b[2] == "true") {
    if (b[2] === "true") {
     nativeLDBManager.read("misc", `json-${b[0]}`, found => {
      let lo = (menu) => {
       this.objsStored[b[0]] = JSON.parse(menu);
       //////console.log("LOAD");
       this.renderMenu(JSON.parse(menu), stopAnimating, b[5]);

      }
      if (found) {
       lo(JSON.parse(found.val));
       return;
      }
      
        this.showMenuSection(0, false);

      $TEXT(`json/${b[0]}.json`)
       .then(menu => {
        ////console.log(menu);
        this.objsStored[b[0]] = JSON.parse(menu);
        this.renderMenu(JSON.parse(menu), stopAnimating, b[5]);
       })
       .catch(e => {
        this.switchMenu("back");
        this.timer = 2;
        interfaceSound.playSound("error");
        let t = e.toString().replace("SyntaxError: ", "");
        if (t.includes("404")) {
         t = "An error occurred while parsing a menu file.";
        };
        gachatrisLogNotification.error("", "JSON Loader Error", "", "", e);
        this.backButtonEnabled = true;
       });
     })


    }
   }
   let jsonString = ("true_false".split("_").indexOf(b[2]) !== -1 || !b?.[2]) ? b[2] : JSON.parse(b[2]);
   const byteSize = str => new Blob([str]).size;
   //////console.log(byteSize(this.currentDirectory));
   if (this.currentDirectory === "gtris") {
    this.switchMenuSection(0);
    if (!stopAnimating) this.animateMenuSection(0, true);
    else this.showMenuSection(0, true);
    $IH("headerTitle", gachatrisLanguage.transText1("title"))
   } else if (b[2] == "true" && this.objsStored?.[b[0]]) {
    this.backButtonEnabled = true;
    this.renderMenu(this.objsStored[b[0]], stopAnimating, this.objsStored[b[5]]);
   } else if (typeof jsonString === "object") {
    this.backButtonEnabled = true;
    this.renderMenu(jsonString, stopAnimating, jsonString.header_args);
   } else {
    let ud = ~~(b[1]);
    this.switchMenuSection(ud);
    if (!stopAnimating && g.length > 1) this.animateMenuSection(ud, true);
    else if (b[2] == "true") {
     this.showMenuSection(ud, true);
    } else {
     //this.showMenuSection(0, true); 
    }
    $IH("headerTitle", b[5] !== "null" ? gachatrisLanguage.transText1(b[5], b?.[6] ? b[6].split("|•|") : []) : gachatrisLanguage.transText1("title"));
    this.backButtonEnabled = true;
   }
  } catch (e) {
   ////console.log(e.stack);
   this.switchMenu('back')
  }
 }

 startLoop() {
  if (!this.isRunning) {
   this.isRunning = true;
   this.startTime = Date.now();
   this.actualFrames = 0;
   this.interval = setInterval(() => {
    var syncTime = Math.floor((Date.now() - this.startTime));
    var syncFrames = syncTime - this.actualFrames;
    for (var i = 0; i < syncFrames; i++, this.actualFrames++) {
     if (this.isRunning) try {
      this.timer--;
      if (this.timer == 0) {
       this.render();
       throw "end";
      }
     } catch (e) {
      clearInterval(this.interval);
      this.isRunning = false;
     }

    }
   }, 1);
  };
 }

 showBackButton(bo) {
  $STYLE("headerBackButton", "display", bo ? "block" : "none");
 }

 renderMenu(menu, stopAnimating, headerArgs) {
  this.changeMenuContentHTML(menu.props);
  this.switchMenuSection(this.current.section);
  if (!stopAnimating) this.animateMenuSection(this.current.section, true);
  else {

   this.showMenuSection(this.current.section, true);

  }
  this.backButtonEnabled = true;
  var t = "";
  if (menu?.header) t = gachatrisLanguage.transText1(menu.header, menu.header_args || []);

  if (menu?.header_raw) t = menu.header_raw;
  $IH("headerTitle", (typeof t === "undefined" ? gachatrisLanguage.transText1("title") : t));
 }
 changeMenuContentHTML(elemArr, section) {
  var jps = "";

  jps = this.renderHTML(elemArr);
  $IH("SUBMENU-DIV", jps);
  //////console.log($ID(section || "SUBMENU-DIV").innerHTML)
 }
 renderHTML(elem) {
  let t = "";
  for (let f of elem) {
   let tag = "",
    type = "";
   //I know editing the innerHTML is not efficient enough.
   if (f.type == "button" || f.type == "button_replaylist") {
    tag = `<gtris-list-cell style="width:100%;display:flex;justify-content:left;align-items: center">`;
    type = { button: "gtris-normal-button", button_replaylist: "gtris-replaylist-button" } [f.type];
    tag += `<${type} `;
    if (f.action == "submenu") {
     tag += `class="submenu-button" `;
     if (f?.submenu) {
      tag += `onclick="gameMenu.switchMenu('add','${f.submenu}')" `;
     }
    }
    if (f.action == "onclick") {
     tag += `class="onclick-button"`;
     if (f?.onclick) {
      let regularExpression = /"/ig;
      tag += `onclick="${f.onclick.replace(regularExpression, "\'")}" `;
     }
    }
    if (f.action == "initialize") {
     tag += `class="initialize-button" `;
     if (f?.init) {
      tag += `onclick="gameManager.prepareInitialization(${f.init[0]},${f.init[1]}, ${f.game_parameters ||"void 0"}); gameMenu.showHideMenu(false);" `;
     }
    }
    if (f.action == "mainmenu") {
     tag += `class="mainmenu-button" `;

     tag += `onclick="gameMenu.switchMenu('set', 'gtris');" `;
    }
    tag += ">";

    if (f?.string) {
     tag += `<gtris-large-text-button style="pointer-events: none;font-size:2.5em;margin-left:0.4em; position: relative; width: 100%">${gachatrisLanguage.transText1(f.string)}</gtris-large-text-button>`;
    }
    if (f?.string_raw) {
     tag += `<gtris-large-text-button style="pointer-events: none;font-size:2.5em;margin-left:0.4em; position: relative; width: 100%">${f.string_raw}</gtris-large-text-button>`;
    }
    if (f?.desc_raw) {
     tag += `<gtris-small-text-button style="pointer-events: none;font-size:0.9em;margin-left:0.4em; position: relative; width: 100%">${f.desc_raw}</gtris-small-text-button>`;
    }
    if (f?.desc) {
     tag += `<gtris-small-text-button style="pointer-events: none;font-size:0.9em;margin-left:0.4em; position: relative; width: 100%">${gachatrisLanguage.transText1(f.desc)}</gtris-small-text-button>`;
    }
   }

   if (f.type == "button3") {
    tag = `<gtris-list-cell style="width:100%;display:flex;justify-content:left;align-items: center">`;
    type = "gtris-mainmenu-button ";
    tag += `<${type} `;
    if (f.action == "submenu") {
     tag += `class="submenu-button" `;
     if (f?.submenu) {
      tag += `onclick="gameMenu.switchMenu('add','${f.submenu}'); gameMainMenu.animateButton(this)" `;
     }
    }
    if (f.action == "onclick") {
     tag += `class="onclick-button"`;
     if (f?.onclick) {
      let regularExpression = /"/ig;
      tag += `onclick="${f.onclick.replace(regularExpression, "\'")}" `;
     }
    }
    if (f.action == "initialize") {
     tag += `class="initialize-button" `;
     if (f?.init) {
      tag += `onclick="gameManager.prepareInitialization(${f.init[0]},${f.init[1]}, ${f.game_parameters ||"void 0"}); gameMenu.showHideMenu(false);" `;
     }
    }
    if (f.action == "mainmenu") {
     tag += `class="mainmenu-button" `;

     tag += `onclick="gameMenu.switchMenu('set', 'gtris');" `;
    }
    tag += ">";

    if (f?.string) {
     tag += `<gtris-large-text-button style="text-align: center;pointer-events: none;font-size:2.5em;margin-left:0.4em; position: relative; width: 100%">${gachatrisLanguage.transText1(f.string)}</gtris-large-text-button>`;
    }
    if (f?.string_raw) {
     tag += `<gtris-large-text-button style="text-align: center;pointer-events: none;font-size:2.5em;margin-left:0.4em; position: relative; width: 100%">${f.string_raw}</gtris-large-text-button>`;
    }
    if (f?.desc_raw) {
     tag += `<gtris-small-text-button style="text-align: center;pointer-events: none;font-size:0.9em;margin-left:0.4em; position: relative; width: 100%">${f.desc_raw}</gtris-small-text-button>`;
    }
    if (f?.desc) {
     tag += `<gtris-small-text-button style="text-align: center;pointer-events: none;font-size:0.9em;margin-left:0.4em; position: relative; width: 100%">${gachatrisLanguage.transText1(f.desc)}</gtris-small-text-button>`;
    }
   }

   if (f.type == "button_keybind") {
    tag = `<gtris-list-cell style="width:100%;display:flex;justify-content:center;align-items: center">`;
    type = "gtris-keybind-button";
    tag += `<${type} `
    tag += `class="keybind-button" `;

    let ctn;
    if (f?.keybind) {
     let bind, bindText;
     switch (f.keybind) {
      case "pause":
       bindText = "pause";
       bind = gameStorage.currentSettings.binds.pause;
       break;
      case "retry":
       bindText = "retry";
       bind = gameStorage.currentSettings.binds.retry;
       break;
      default:
       bindText = f.keybind.toUpperCase();
       bind = gameStorage.currentSettings.binds[f.keybind.toUpperCase()];
       break;
     }
     tag += `onclick="keyboardControls.editActiveKeybinding(false,'${bindText}','set_bind_${f.keybind}')"`;
     let kb = gachatrisLanguage.keysText(`key_${bind}`);
     ctn = `<gtris-small-text-button style="pointer-events: none;font-size:2.3em;margin-left:0.4em; position: relative; width: 100%; text-align: center">${kb}</gtris-small-text-button>`;
    }


    tag += " >";

    if (f?.string) {
     tag += `<gtris-large-text-button style="pointer-events: none;font-size:1.5em;margin-left:0.4em; position: relative; width: 100%; text-align: left">${gachatrisLanguage.transText1(f.string)}</gtris-large-text-button>`;
    }
    if (f?.desc) {
     tag += `<gtris-small-text-button style="pointer-events: none;font-size:0.8em;margin-left:0.4em; position: relative; width: 100%; text-align: left">${gachatrisLanguage.transText1(f.desc)}</gtris-small-text-button>`;
    }
    if (f?.string_raw) {
     tag += `<gtris-large-text-button style="pointer-events: none;font-size:1.5em;margin-left:0.4em; position: relative; width: 100%; text-align: left">${f.string_raw}</gtris-large-text-button>`;
    }
    if (f?.desc_raw) {
     tag += `<gtris-small-text-button style="pointer-events: none;font-size:0.8em;margin-left:0.4em; position: relative; width: 100%; text-align: left">${f.desc_raw}</gtris-small-text-button>`;
    }
    tag += ctn;
   }

   if (f.type == "button2") {
    tag = `<gtris-list-cell style="width:100%;display:flex;justify-content:center;align-items: center">`;
    type = "gtris-normal-button2";
    tag += `<${type} `
    if (f.action == "submenu") {
     tag += `class="submenu-button"`;
     if (f?.submenu) {
      tag += `onclick="gameMenu.switchMenu('add','${f.submenu}', )" `;
     }
    }
    if (f.action == "onclick") {
     tag += `class="onclick-button"`;
     if (f?.onclick) {
      let regularExpression = /"/ig;
      tag += `onclick="${f.onclick.replace(regularExpression, "'")}" `;
     }
    }
    if (f.action == "initialize") {
     tag += `class="initialize-button" `;
     if (f?.init) {

      tag += `onclick="gameManager.prepareInitialization(${f.init[0]},${f.init[1]}); gameMenu.showHideMenu(false);" `;
     }
    }
    if (f.action == "mainmenu") {
     tag += `class="mainmenu-button" `;
     tag += `onclick="gameMenu.switchMenu('set', '');" `;
    }
    tag += ">";

    if (f?.string) {
     tag += `<gtris-small-text-button style="pointer-events: none;font-size:1.3em;margin-left:0.4em; position: relative; width: 100%">${gachatrisLanguage.transText1(f.string)}</gtris-small-text-button>`;
    }
   }

   if (f.type == "text") {
    tag = `<gtris-list-cell style="padding-bottom:0.5vh;width:100%;display:flex;justify-content:${f.align || "center"};align-items: center; color: ${f.text_color || "#fff"}">`;
    type = "gtris-menu-text";
    tag += `<${type} ${f?.id ? `id="${f.id}"` : ""} style="font-size:${f.font_size || 1}em; text-align: ${f.align || "center"}"`
    tag += ">";
    let rawOrNot = "";

    if (f?.string) {
     rawOrNot = gachatrisLanguage.transText1(f.string);
    }
    if (f?.string_raw) {
     rawOrNot = f.string_raw;
    }
    tag += rawOrNot;
   }

   if (f.type == "textbox") {
    let randomID = `j${Math.random}`;

    if (f?.show_number && f.show_number) {
     t += this.renderHTML([{
      "string_raw": f.number_template.replace(/%num/g, 0),
      "type": "text",
      "text_type": "body",
      "text_color": "#ff0",
      "align": "left",

      "font_size": 1,
      "id": `${randomID}-rcs-title-length`
     }]);
    }
    tag = `<gtris-list-cell style="padding-top:${f.pad_top || 1}vh;padding-bottom:1vh;width:100%;height:${f.height};display:flex;justify-content:center;align-items: center; color: ${f.text_color || "#fff"}">`;
    type = "textarea";

    tag += `<${type} onchange="${f.onchange || ""};" oninput = "${
       f?.show_number && f.show_number ? `$IH('${randomID}-rcs-title-length','${f.number_template}'.replace(/%num/g, this.value.length));`: ""}" style="resize: none;background: ${f.background || "#fff"}; color: ${f.text_color || "#000"}; font-size:${f.font_size || 1}em; text-align: ${f.align || "center"}; width: ${f.width}; height: 100%"`
    tag += ">";
    let raw = "";

    if (f?.preset) {
     raw = {
      replay: gameReplayer.generateReplay(),
      name: gameStorage.currentSettings.settings.misc.name,
     } [f.preset];
    }
    if (f?.string_raw) {}
    tag += raw;
   }
   if (f.type == "html") try {
    tag = `<gtris-list-cell style="width:100%;height:${f.height || "auto"};display:flex;justify-content:center;align-items: center; color: ${f.text_color || "#fff"};">`;
    type = "gtris-menu-html";
    tag += `<${type} style="${f.style || ""}"`
    tag += ">"; /**/

    if (f?.inner_html) {
     tag += f.inner_html.replaceAll("@$GREATERTHAN", ">");
    }
   } catch (e) {
    ////console.log(e.stack)
   }

   if (f.type == "character") try {
    tag = `<gtris-list-cell style="width:100%;height:${f.height || "auto"};display:flex;justify-content:center;align-items: center; color: ${f.text_color || "#fff"};">`;
    type = "gtris-menu-html";
    tag += `<${type} style="${f.style || ""}"`
    tag += ">"; /**/

    tag += gachatrisCharacter.makeCharacterCell(f.character, void 0, f.version);
   } catch (e) {
    ////console.log(e.stack)
   }
   if (f.type == "innerprop") try {
    tag = `<gtris-list-cell style="width:100%;height:${f.height || "auto"};display:flex;justify-content:center;align-items: center; color: ${f.text_color || "#fff"};">`;
    type = "gtris-menu-innerprop";
    tag += `<${type} style="${f.style || ""}"`
    tag += ">"; /**/

    if (f?.prop) {
     tag += pq(f.prop); //recursion method for sub-array
    }
   } catch (e) {
    ////console.log(e.stack)
   }



   if (f.type == "mode_param_selector") {
    tag = `<gtris-list-cell style="width:100%;display:flex;justify-content:center;align-items: center">`;
    type = "gtris-menu-selector";
    tag += `<${type} style="width: 50%; background: #80df; border: 3px solid #408; display: block">`;
    let gp = GAME_PARAMETERS[f.parent_parameter][f.parameter][gameStorage.currentSettings.modes[f.parent_parameter][f.parameter] || (f.default || 0)];
    tag += `
   <gtris-selector-div-part style="display: flex; justify-content: center; height: 50%; width: 100%;"><b>${gachatrisLanguage.transText1(f.string)}</b></gtris-selector-div-part>
   <gtris-selector-div-part style="display: flex; justify-content: center; height: 100%; width: 100%;">
   <gtris-selector-hand onclick="gameMenu.manipulateModeParameter('${f.parent_parameter}','${f.parameter}',-1,'gtris-textid-${f.parent_parameter}-${f.parameter}',${f.disable_loc || "false"})" style="display: flex; font-size: 150%; padding-left: 10%; padding-right: 10%;">&lt;</gtris-selector-hand>
   <gtris-selected-text id="gtris-textid-${f.parent_parameter}-${f.parameter}" style="font-size: 150%;">${f?.disable_loc || f.disable_loc !== "true" ? gachatrisLanguage.selectionText(gp) : gp}</gtris-selected-text>
   <gtris-selector-hand onclick="gameMenu.manipulateModeParameter('${f.parent_parameter}','${f.parameter}',1,'gtris-textid-${f.parent_parameter}-${f.parameter}',${f.disable_loc || "false"})" style="display: flex; font-size: 150%; padding-left: 10%; padding-right: 10%;">&gt;</gtris-selector-hand>
   </gtris-selector-div-part>`
   }

   if (f.type == "settingslist_selector") {
    tag = `<gtris-list-cell style="width:100%;display:flex;justify-content:center;align-items: center">`;
    type = "gtris-menu-selector";
    tag += `<${type} style="width: 50%; background: #80df; border: 3px solid #408; display: block">`;
    let gp = SETTINGS_LIST[f.parent_parameter][f.parameter][gameStorage.currentSettings[f.category][f.parent_parameter][f.parameter] || (f.default || 0)];
    let clickability = `"${f.string}", SETTINGS_LIST["${f.parent_parameter}"]["${f.parameter}"], "gameStorage.currentSettings[\\"${f.category}\\"][\\"${f.parent_parameter}\\"][\\"${f.parameter}\\"]", ${f?.disable_loc || f.disable_loc !== "true" ? 1 : 0}, ${gameStorage.currentSettings[f.category][f.parent_parameter][f.parameter] || (f.default || 0)}`;
    tag += `
   <gtris-selector-div-part style="display: flex; justify-content: center; height: 50%; width: 100%;"><b>${gachatrisLanguage.transText1(f.string)}</b></gtris-selector-div-part>
   <gtris-selector-div-part style="display: flex; justify-content: center; height: 100%; width: 100%;">
   <gtris-selector-hand onclick="gameMenu.manipulateSettingSelectorParameter('${f.category}','${f.parent_parameter}','${f.parameter}',-1,'gtris-textid-${f.parent_parameter}-${f.parameter}',${f.disable_loc || "false"})" style="display: flex; font-size: 150%; padding-left: 10%; padding-right: 10%;">&lt;</gtris-selector-hand>
   <gtris-selected-text ${f.can_open_window_by_click ? `onclick='gameMenu.openSelectorList(${clickability})'` : ""} id="gtris-textid-${f.parent_parameter}-${f.parameter}" style="font-size: 150%;">${f?.disable_loc || f.disable_loc !== "true" ? gachatrisLanguage.selectionText(gp) : gp}</gtris-selected-text>
   <gtris-selector-hand onclick="gameMenu.manipulateSettingSelectorParameter('${f.category}', '${f.parent_parameter}','${f.parameter}',1,'gtris-textid-${f.parent_parameter}-${f.parameter}',${f.disable_loc || "false"})" style="display: flex; font-size: 150%; padding-left: 10%; padding-right: 10%;">&gt;</gtris-selector-hand>
   </gtris-selector-div-part>`
   }

   if (f.type == "settings_slider") {
    tag = `<gtris-list-cell style="padding-bottom: 0.5vh; height: auto;width:100%;display:flex;justify-content:center;align-items: center">`;
    type = "gtris-slider-selector";
    tag += `<${type} style="width: 95%; display: block">`;
    let mm = f?.category ? f.category : "";
    let sp = SETTINGS_RANGE[f.parent_parameter][f.parameter].textValues[gameStorage.currentSettings[mm || "settings"][f.parent_parameter][f.parameter] !== void 0 ? gameStorage.currentSettings[mm || "settings"][f.parent_parameter][f.parameter] : (f.default || 0)];
    let r = SETTINGS_RANGE[f.parent_parameter][f.parameter].values.length;
    tag += `
   <gtris-selector-div-part style="display: flex; flex-direction: column">
   <gtris-slider-text style="width: 100%; height: 100%; padding-left: 0.6em">${gachatrisLanguage.transText1(f.string)}: <gtris-selected-slider-value id="gtris-slider-value-${f.parent_parameter}-${f.parameter}">${!(f?.disable_loc || f.disable_loc !== "true") ? gachatrisLanguage.transText1(sp) : sp}</gtris-selected-slider-value></gtris-slider-text>
   <gtris-selector-div-part style="display: flex;"><input type="range" oninput="gameMenu.manipulatePersonalSettingsParameter('${f.parent_parameter}','${f.parameter}',~~(this.value),'gtris-slider-value-${f.parent_parameter}-${f.parameter}','${f.disable_loc || "false"}', '${mm||"settings"}'); ${f?.add_inputchange ? f.add_inputchange : ''}" min="0" max="${r - 1}" value="${gameStorage.currentSettings[mm || "settings"][f.parent_parameter][f.parameter] !== void 0 ? gameStorage.currentSettings[mm || "settings"][f.parent_parameter][f.parameter] : (f.default || 0)}"  style="width: 100%; height: 4vh;" /></gtris-selector-div-part>
   </gtris-selector-div-part>`
   }
   if (f.type == "playerlist_param_slider") {
    tag = `<gtris-list-cell style="padding-bottom: 0.5vh; height: 5.4vh;width:100%;display:flex;justify-content:center;align-items: center">`;
    type = "gtris-slider-selector";
    tag += `<${type} style="width: 95%; display: block">`;
    let sp = SETTINGS_RANGE[f.parent_preset][f.preset].textValues[gameStorage.sessionSettings.playerAI[f.player_number][f.parameter] !== void 0 ? gameStorage.sessionSettings.playerAI[f.player_number][f.parameter] : (f.default || 0)];
    let r = SETTINGS_RANGE[f.parent_preset][f.preset].values.length;
    tag += `
   <gtris-selector-div-part style="display: flex; flex-direction: column">
   <gtris-slider-text style="width: 100%; height: 100%; padding-left: 0.6em">${gachatrisLanguage.transText1(f.string)}: <gtris-selected-slider-value id="gtris-slider-value-${f.parent_preset}-${f.preset}">${!(f?.disable_loc || f.disable_loc !== "true") ? gachatrisLanguage.transText1(sp) : sp}</gtris-selected-slider-value></gtris-slider-text>
   <gtris-selector-div-part style="display: flex;"><input type="range" oninput="gameMenu.manipulatePlayerListSettingsParameter('${f.parent_preset}','${f.preset}', ${f.player_number}, '${f.parameter}', ~~(this.value),'gtris-slider-value-${f.parent_preset}-${f.preset}','${f.disable_loc || "false"}'); ${f?.add_inputchange ? f.add_inputchange : ''}" min="0" max="${r - 1}" value="${gameStorage.sessionSettings.playerAI[f.player_number][f.parameter] !== void 0 ? gameStorage.sessionSettings.playerAI[f.player_number][f.parameter] : (f.default || 0)}"  style="width: 100%; height: 4vh;" /></gtris-selector-div-part>
   </gtris-selector-div-part>`
   }

   tag += `</${type}></gtris-list-cell>`;
   t += tag;
   ////console.log(tag)
  }
  return t;
 }


 createSelectorParameter(baseName, string, list, ssRaw, ssCategory, variable, disableLoc) {
  let tag = `<gtris-list-cell style="width:100%;display:flex;justify-content:center;align-items: center">`;
  let type = "gtris-menu-selector";
  let regExp = /"/g
  tag += `<${type} style="width: 50%; background: #80df; border: 3px solid #408; display: block">`;
  let gp = list[ssRaw[variable]];
  //////console.log(JSON.stringify(list), ssRaw, variable, gp, "HELLOW WORLD") //SETTINGS_LIST[f.parent_parameter][f.parameter][gameStorage.currentSettings[f.category][f.parent_parameter][f.parameter] || (f.default || 0)];
  tag += `
   <gtris-selector-div-part style="display: flex; justify-content: center; height: 50%; width: 100%;"><b>${gachatrisLanguage.transText1(string)}</b></gtris-selector-div-part>
   <gtris-selector-div-part style="display: flex; justify-content: center; height: 100%; width: 100%;">
   <gtris-selector-hand onclick="gameMenu.manipulateSettingCustomParameter(${JSON.stringify(list).replace(regExp, "\'")}, ${ssCategory}, '${variable}',-1,'gtris-textid-${baseName}-${variable}',${disableLoc})" style="display: flex; font-size: 150%; padding-left: 10%; padding-right: 10%;">&lt;</gtris-selector-hand>
   <gtris-selected-text id="gtris-textid-${baseName}-${variable}" style="font-size: 150%;">${!disableLoc ? gachatrisLanguage.selectionText(gp) : gp}</gtris-selected-text>
   <gtris-selector-hand onclick="gameMenu.manipulateSettingCustomParameter(${JSON.stringify(list).replace(regExp, "\'")}, ${ssCategory}, '${variable}',1,'gtris-textid-${baseName}-${variable}',${disableLoc})" style="display: flex; font-size: 150%; padding-left: 10%; padding-right: 10%;">&gt;</gtris-selector-hand>
   </gtris-selector-div-part>`
  return tag;
 }

 openSelectorList(title, variable, reference, isRawText, selected) {
  let json = {
   header: title,
   props: [],
  }
  for (let i = 0; i < variable.length; i++) {
   //console.log(variable, !isRawText ? variable[i] : gachatrisLanguage.selectionText(variable[i]))
   json.props.push({
    "string_raw": !isRawText ? variable[i] : gachatrisLanguage.selectionText(variable[i]),
    "type": "button",
    "desc_raw": !isRawText ? variable[i] : gachatrisLanguage.selectionText(variable[i] + "_desc", "  "),
    "action": "onclick",
    "onclick": `${reference} = ${i}; ${reference.includes("gameStorage.currentSettings") ? "gameStorage.saveStorage()" : ""}; gameMenu.switchMenu('back');`
   });
  }
  gameMenu.switchMenu("add", "_", JSON.stringify(json), 1, false, `${gachatrisLanguage.transText1("playerlist_player_setting", title)}`);
 }
 manipulateModeParameter(parent, variable, plus, id, transText) {
  var e = id;
  var o = GAME_PARAMETERS[parent][variable];
  var b = gameStorage.currentSettings.modes[parent];
  var canTranslate = transText ? transText : true;
  b[variable] += plus
  if (b[variable] <= -1) {
   b[variable] = o.length - 1;
  } else
  if (typeof o[b[variable]] === 'undefined') {
   b[variable] = 0;
  }
  gameStorage.saveStorage();
  $IH(e, !canTranslate ? o[b[variable]] : gachatrisLanguage.selectionText(o[b[variable]]));
 }
 manipulateSettingSelectorParameter(csCategory, parent, variable, plus, id, transText) {
  var e = id;
  var o = SETTINGS_LIST[parent][variable];
  var b = gameStorage.currentSettings[csCategory][parent];
  var canTranslate = transText ? transText : true;
  b[variable] += plus
  if (b[variable] <= -1) {
   b[variable] = o.length - 1;
  } else
  if (typeof o[b[variable]] === 'undefined') {
   b[variable] = 0;
  }
  $IH(e, !canTranslate ? o[b[variable]] : gachatrisLanguage.selectionText(o[b[variable]]));
  gameStorage.saveStorage();
 }
 manipulateSettingCustomParameter(list, ssCategory, variable, plus, id, transText) {
  var e = id;
  var o = list;
  var b = ssCategory;
  var canTranslate = transText ? transText : true;
  b[variable] += plus
  if (b[variable] <= -1) {
   b[variable] = o.length - 1;
  } else
  if (typeof o[b[variable]] === 'undefined') {
   b[variable] = 0;
  }
  $IH(e, !canTranslate ? o[b[variable]] : gachatrisLanguage.selectionText(o[b[variable]]));
 }
 manipulatePersonalSettingsParameter(parent, variable, value, id, transText, category) {
  var e = id;
  var o = SETTINGS_RANGE[parent][variable];
  var b = gameStorage.currentSettings[category][parent];
  var canTranslate = transText !== void 0 ? transText : "true";
  b[variable] = value;
  gameStorage.saveStorage();
  $IH(e, canTranslate !== "false" ? o.textValues[b[variable]] : gachatrisLanguage.transText1(o.textValues[b[variable]]));
 }
 manipulatePlayerListSettingsParameter(parent, variable, player, playerParam, value, id, transText) {
  var e = id;
  var o = SETTINGS_RANGE[parent][variable];
  var b = gameStorage.sessionSettings.playerAI[player];
  var canTranslate = transText !== void 0 ? transText : "true";
  b[playerParam] = value;
  $IH(e, canTranslate !== "false" ? o.textValues[b[playerParam]] : gachatrisLanguage.transText1(o.textValues[b[playerParam]]));
 }


}()
/*WORK IN PROGRESS*/


const gameMainMenu = new class {
 #mainmenu = $ID("MAIN-MENU");
 #canvasBg = $ID("MAIN-MENU-CANVAS-BG");
 #mainContainer = $ID("MAIN-MENU-CONTAINER");
 #particleCanvasBg = $ID("MAIN-MENU-CANVAS-BG-PARTICLE");
 #canvasLogo = $ID("MAIN-MENU-CANVAS-LOGO");

 #ctxBg = this.#canvasBg.getContext("2d");
 #particleCtxBg = this.#particleCanvasBg.getContext("2d");
 #ctxLogo = this.#canvasLogo.getContext("2d");

 #parent = gameMenu;
 #cellSize = 0;
 #width = 0;
 #height = 0;
 #aspectRatio = 0;
 #backgrounds = gameManager.images;

 #canvasSize(x, y) {
  this.#canvasBg.width = x;
  this.#canvasBg.height = y;
  this.#particleCanvasBg.width = x;
  this.#particleCanvasBg.height = y;
 }
 
 #logoSize(x, y, resX, resY) {
  this.#canvasLogo.width = resX;
  this.#canvasLogo.height = resY;
  
  $STYLEELEM(this.#canvasLogo,"width", `${this.#cellSize * x}px`);
  $STYLEELEM(this.#canvasLogo,"height", `${this.#cellSize * y}px`);
 }
 #drawLogo() {
  let { width, height } = this.#canvasLogo;
  this.#ctxLogo.drawImage(this.#backgrounds.core.mainmenu_logo, 0, 0, 1280, 720, 0, 0, width, height);
 }
 constructor() {
  this.isActive = false;
 }

 drawImage() {
  let { width, height } = this.#canvasBg;
  this.#ctxBg.drawImage(this.#backgrounds.core.mainmenu_background, 0, 0, 1920, 1080, 0, 0, width, height);
 }
 

 initializeMenu() {
  $IHELEM(this.#mainContainer, this.#parent.renderHTML([
   {
    string_raw: `${gachatrisLanguage.transText1("mainmenu_play")}`,
    type: "button3",
    desc_raw: gachatrisLanguage.transText1("mainmenu_play_desc"),
    action: "submenu",
    submenu: "ui/play"
   },
   {
    string_raw: `${gachatrisLanguage.transText1("mainmenu_settings")}`,
    type: "button3",
    desc_raw: gachatrisLanguage.transText1("mainmenu_settings_desc"),
    action: "submenu",
    submenu: "ui/settings"
   },
   {
    string_raw: `${gachatrisLanguage.transText1("mainmenu_replay")}`,
    type: "button3",
    desc_raw: gachatrisLanguage.transText1("mainmenu_replay_desc"),
    action: "submenu",
    submenu: "ui/replay"
   },
  ]));
  for (let g of this.#mainContainer.children) {
   g.onclick = () => {
    //g.style.animation = "mainmenu-click 500ms 1 linear";
    $STYLEELEM(g, "transform", `rotateX(0deg)`);
   };
  }
  //console.log(this.#mainContainer)
 }

 resize(cellSize, width, height, aspectRatio) {
  this.#cellSize = cellSize;
  this.#width = width;
  this.#height = height;
  this.#aspectRatio = aspectRatio;
  
  $STYLEELEM(this.#mainContainer, "width", `${cellSize * 20.5}px`);
  $STYLEELEM(this.#mainContainer, "height", `${cellSize * 14.5}px`);

  $STYLEELEM(this.#mainmenu, "width", `${width}px`);
  $STYLEELEM(this.#mainmenu, "height", `${height}px`);

  for (let canvas of [this.#canvasBg, this.#particleCanvasBg]) {
   $STYLEELEM(canvas, "width", `${height * aspectRatio}px`);
   $STYLEELEM(canvas, "height", `${height}px`);
   //$STYLEELEM(canvas, "right", `${Math.max(((height * aspectRatio) - height) / 2, 0)}px`);
  }
  this.#canvasSize(1920, 1080);
  this.#logoSize(16 * 1.34, 9 * 1.34, 1280, 720);
  this.drawImage();
  this.#drawLogo();
 }

 show(bool) {
  if (bool !== this.isActive) {
   this.isActive = bool;
   let delay = 1900;
   let e = this.#mainmenu;
   let _ = r => {
    $STYLEELEM(e, "opacity", r && typeof r === "boolean" ? 1 : 0);
    //$STYLE(e, "display", r && typeof r === "boolean" ? "flex" : "none");
   }
   $STYLEELEM(e, "animation", `none`);
   e.offsetHeight;
   
   if (this.isActive) {
     _(true);
     // this.switchMenuSection(this.current.section);
     $STYLEELEM(e, "animation", `fade-in ${delay}ms 1 cubic-bezier(0,1,1,1)`);
     $STYLEELEM(e, "pointerEvents", `auto`);

   } else {
     _(false);
     //for (let d of arr) $ID(e)[d] = stopPropagate;
     //this.switchMenuSection("none");
     $STYLEELEM(e, "animation", `fade-out ${delay * 0}ms 1 cubic-bezier(1,0,1,1)`);
     $STYLEELEM(e, "pointerEvents", `none`);
   }
  }
 }
 
 animateButton(t) {
  let g = t;
  if (g.tagName === "GTRIS-MAINMENU-BUTTON") {
   g.style.animation = "mainmenu-click 500ms 1 linear";
    $STYLEELEM(g, "transform", `rotateX(990deg)`);
  }
 }
 
 showMenu(bool, t) {
  let m = 0;
  for (let h of $ID("MAIN-MENU-CONTAINER").getElementsByTagName("*")) {
   //console.log(h.innerHTML)
   
    $STYLEELEM(h, "transform", `rotateX(90deg)`);
    $STYLEELEM(h, "opacity", "0%");
    $STYLEELEM(h, "pointerEvents", "none");   
    h.style.setProperty("transition", `transform 600ms ease-out ${m * 20}ms, opacity 600ms ease-out ${m * 20}ms`);//$STYLEELEM(h, "--a", m);
    m++;
   if (bool) {
    $STYLEELEM(h, "transform", `rotateX(0deg)`);
    $STYLEELEM(h, "opacity", "100%");
    $STYLEELEM(h, "pointerEvents", "inherit");
   } else {

   }
  }
 }
}();