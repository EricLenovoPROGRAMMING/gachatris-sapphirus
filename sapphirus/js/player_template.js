const gachatrisCharacter = new class {
 constructor() {
  this.bodyStyleTemp = "";
  this.bodyTemp = "";
  this.characters = [
   "sapphirus", "ericlenovo", "xyre"
  ];
  this.imageLoadAvatar = {};
  this.characterDetails = {
   sapphirus: {
    color: {
     red: 87,
     green: 0,
     blue: 176
    },
    common_name: "sapphirus/common_name",
    first_name: "sapphirus/first_name",
    grid_avatar: "avatar.png",
    versions: ["default", "v2"]
   },
   ericlenovo: {
    color: {
     red: 0,
     green: 0,
     blue: 208,
    },
    common_name: "ericlenovo/common_name",
    first_name: "ericlenovo/first_name",
    grid_avatar: "avatar.png",
    versions: ["default"]
   },
   xyre: {
    color: {
     red: 0,
     green: 125,
     blue: 208,
    },
    common_name: "xyre/common_name",
    first_name: "xyre/first_name",
    grid_avatar: "avatar.png",
    versions: ["default"]
   }

  }
 }
 PLAYER_TEMPLATE(P) {
  return this.bodyTemp.replace(/NUMBER/gm, P);
 }
 PLAYER_TEMPLATE_STYLE(P) {
  return this.bodyStyleTemp.replace(/NUMBER/gm, P);
 }
 refreshSelectedCharacter(sel) {
  let selected = (sel || gameStorage.currentSettings.settings.misc.character).split("-")[0];
  let charNameplate = $CLASS("CHARACTER-NAMEPLATE-NAME");
  for (let g of charNameplate) {
   $STYLEELEM(g, "color", "#fff");
  }
  $STYLEELEM(charNameplate[selected], "color", "#ff0");
 }

 makeCharacterCell(characterNumber, sel, version) {
  let _s;
  let cellSize = gachatrisCore.CELL_SIZE,
   sizeMult = 2.2;

  ////console.log(`${characterNumber}_&&${version}`)

  let selected = sel || gameStorage.currentSettings.settings.misc.character;
  let h = this.characters[characterNumber];
  let k = this.characterDetails[h],
   colors = {
    r: e => Math.max(Math.min(k.color.red + e, 255), 0),
    g: e => Math.max(Math.min(k.color.green + e, 255), 0),
    b: e => Math.max(Math.min(k.color.blue + e, 255), 0)
   };
  let split = k.common_name.split("/");
  let d = gachatrisLanguage.characterText(h);
  let hws = `assets/characters/${h}/${k.versions[version] || "default"}/${k.grid_avatar}`;

  $ELEM("gtris-character-grid-cell", (cell) => {
   cell.className = "CHARACTER-GRID-CELL-INDEX";
   let w = gachatrisLanguage.characterText(split[0]);
   $STYLEELEM(cell, "border", `3px solid rgba(${colors.r(8)},${colors.g(8)},${colors.b(8)},1)`);
   $STYLEELEM(cell, "display", "flex");
   $STYLEELEM(cell, "width", `${cellSize * 4 * sizeMult}px`);
   $STYLEELEM(cell, "height", `${cellSize * 7 * sizeMult}px`);
   $STYLEELEM(cell, "flex-wrap", "wrap");
   $STYLEELEM(cell, "position", "relative");
   $STYLEELEM(cell, "background", `rgba(${colors.r(-27)},${colors.g(-27)},${colors.b(-27)},1)`);
   $ELEM("gtris-character-avatar", imgDiv => {
    /*$ELEM("img", img => {
     img.className = "CHARACTER-CELL-AVATAR-INDEX";
     
     $STYLEELEM(img, "height", "100%");
     $STYLEELEM(img, "width", "100%");/**/
    // ////console.log(`assets/characters/${h}/default/${k.grid_avatar}`)
    $ELEM("canvas", image => {
     let id = `${~~(Math.random() * 2147483647)}` + "IMAGE";
     image.id = id;

     let test = (_img, _id, tis) => {
      let { width, height } = _img;
      let _image = tis || $ID(_id);
      //////console.log(_image)
      let ctx = _image.getContext("2d");
      _image.width = width;
      _image.height = height;
      ctx.drawImage(_img, 0, 0, width, height);
     }

     if (hws in this.imageLoadAvatar) test(this.imageLoadAvatar[hws], false, image);
     //let ctx = image.getContext("2d");
     imgDiv.appendChild(image);
     //////console.log(img.value.toBlob())
     //image.setAttribute("src", img.value.src);
     $STYLEELEM(image, "height", "100%");
     $STYLEELEM(image, "width", "100%");
     window.setTimeout(() => {
      cacheManager.loadCache(hws, (fname) => {
       let s = new Image();
       s.src = fname;
       /*////console.log(s, "NUUU")
       throw new SyntaxError("nyeh")*/
       return s;
      }, "characterimage", img => {
       let _img = img.value;
       if (!(hws in this.imageLoadAvatar)) {
        this.imageLoadAvatar[hws] = _img;
       }
       test(_img, id);


       /* if (!this.imageLoadAvatar?.[h]) {
         this.imageLoadAvatar[h] = new(Image)();
         const eeeee = j => new Blob([j]).size;
         this.imageLoadAvatar[h].src = img.value.src;
         //this.imageLoadAvatar[h].onload = () => ////console.log(h, eeeee(this.imageLoadAvatar[h]))
        }/**/




      })

     }, 1);
    });
    //////console.log("made")
    imgDiv.className = "CHARACTER-CELL-AVATAR";
    $STYLEELEM(imgDiv, "width", `${cellSize * 4 * sizeMult}px`);
    $STYLEELEM(imgDiv, "height", `${cellSize * 6 * sizeMult}px`);
    $STYLEELEM(imgDiv, "position", "relative");
    cell.appendChild(imgDiv);
   });
   $ELEM("gtris-grid-nameplate", nameplate => {
    $STYLEELEM(nameplate, "width", `${cellSize * 4 * sizeMult}px`);
    $STYLEELEM(nameplate, "height", `${cellSize * 1 * sizeMult}px`);
    $STYLEELEM(nameplate, "position", "absolute");
    $STYLEELEM(nameplate, "bottom", "0");
    $STYLEELEM(nameplate, "display", "flex");
    $STYLEELEM(nameplate, "justify-content", "center");
    $STYLEELEM(nameplate, "align-items", "center");
    nameplate.className = "CHARACTER-NAMEPLATE-INDEX";
    $ELEM("gtris-charname-text", name => {
     $STYLEELEM(name, "color", characterNumber === selected ? "#ff0" : "#fff");
     $STYLEELEM(name, "text-shadow", "0 0 10px #000");
     $STYLEELEM(name, "text-align", "center");
     $STYLEELEM(name, "width", "100%");
     let hh = gachatrisLanguage.characterText(split[0]);
     name.innerHTML = gachatrisLanguage.transText1("character_nameplate_nameskin", [hh[split[1]], hh.versions[version]]);
     //console.log(version)
     nameplate.appendChild(name);
    });
    cell.appendChild(nameplate);
   }) /**/
   _s = cell.outerHTML;
  });
  ////console.log(_s)
  let regExp = /"/ig,
   regExp2 = />/g;
  let regularExpression = "@$DOUBLEQUOTE",
   regExpGT = />/g;
  return _s; //.replace(regExp, "@$DOUBLEQUOTE").replace(regExp2, "@$GREATERTHAN").replaceAll(regularExpression, `\"`);
 }

 refreshCharacterGrid() {
  let selected = gameStorage.currentSettings.settings.misc.character.split("-");
  var count = -1;
  let grid = $ID("CHARACTER-LIST-GRID");
  $IH("CHARACTER-LIST-GRID", "");
  for (let count = 0, h; count < this.characters.length; count++) {
   h = this.characters[count];
   let k = this.characterDetails[h],
    colors = {
     r: e => Math.max(Math.min(k.color.red + e, 255), 0),
     g: e => Math.max(Math.min(k.color.green + e, 255), 0),
     b: e => Math.max(Math.min(k.color.blue + e, 255), 0)
    };
   let split = k.common_name.split("/");
   /* if (!this.imageLoadAvatar?.[h]) {
      cacheManager.loadCache(`assets/characters/${h}/default/${k.grid_avatar}`, (fname) => {
       let s = new Image();
       s.src = fname;
       return s;
      }, "character", img => {
     this.imageLoadAvatar[h] = new(Image)();
     this.imageLoadAvatar[h].src = `assets/characters/${h}/default/${k.grid_avatar}`;
       
      })   }*/
   let d = gachatrisLanguage.characterText(h);

   $ELEM("gtris-character-grid-cell", (cell) => {
    cell.className = "CHARACTER-GRID-CELL";
    let w = gachatrisLanguage.characterText(split[0]);
    cell.addEventListener("click", async () => {
     let cn = count;
     /* const json = {
       header_raw: gachatrisLanguage.transText1("character_full_name", [w.surname, w.first_name, w.middle_name]),
       props: [
        {
         type: "character",
         character: cn,
         style: "display: flex; justify-content: center; width: 100%; height: auto; flex-wrap: wrap",
         height: "auto"
        },
        {
         string_raw: `${gachatrisLanguage.transText1("character_selector_use", w[split[1]])}`,
         type: "button",
         desc_raw: `${gachatrisLanguage.transText1("character_selector_use_desc", w[split[1]])}`,
         action: "onclick",
         onclick: `gameStorage.currentSettings.settings.misc.character = ${cn}; gameStorage.saveStorage(); gameMenu.switchMenu('back'); gachatrisLogNotification.notification("${gachatrisLanguage.transText1("character_selector_success")}", "${gachatrisLanguage.characterText(h).first_name}"); gachatrisCharacter.refreshSelectedCharacter();`
        },
       ]
      }
      gameMenu.switchMenu("add", "_", JSON.stringify(json), 1, false, `${gachatrisLanguage.characterText(split[0])[split[1]]}`);/**/
     gameMenu.switchMenu("add", "character", "false", "6", "false", "false", "setting_character_char_skin", [gachatrisLanguage.transText1("setting_character_selecting_you"), w.common_name]);
     gachatrisCharacter.refreshSkinGrid(count);
     gachatrisCharacter.resize();
    })
    $STYLEELEM(cell, "border", `3px solid rgba(${colors.r(8)},${colors.g(8)},${colors.b(8)},1)`);
    $STYLEELEM(cell, "display", "grid");
    //$STYLEELEM(cell, "flex-direction", "column");
    $STYLEELEM(cell, "position", "relative");
    $STYLEELEM(cell, "background", `rgba(${colors.r(-27)},${colors.g(-27)},${colors.b(-27)},1)`);
    $ELEM("gtris-character-avatar", imgDiv => {
     /*$ELEM("img", img => {
      img.src = `assets/characters/${h}/default/${k.grid_avatar}`;
      $STYLEELEM(img, "height", "100%");
      $STYLEELEM(img, "width", "100%");
      imgDiv.appendChild(img);/**/
     $ELEM("img", image => {
      imgDiv.appendChild(image);
      cacheManager.loadCache(`assets/characters/${h}/${~~(selected[0]) === count ? k.versions[selected[1]] : "default"}/${k.grid_avatar}`, (fname) => {
       let s = document.createElement("img");
       s.src = fname;
       return s;
      }, "characterimage", img => {
       image.src = img.value.src;
       $STYLEELEM(image, "height", "100%");
       $STYLEELEM(image, "width", "100%");
      });
     });
     imgDiv.className = "CHARACTER-CELL-AVATAR";
     $STYLEELEM(imgDiv, "position", "relative");
     cell.appendChild(imgDiv);
    });
    $ELEM("gtris-grid-nameplate", nameplate => {
     $STYLEELEM(nameplate, "background", `rgba(${colors.r(-27)},${colors.g(-27)},${colors.b(-27)},1)`);
     $STYLEELEM(nameplate, "position", "relative");
     $STYLEELEM(nameplate, "display", "flex");
     $STYLEELEM(nameplate, "justify-content", "center");
     $STYLEELEM(nameplate, "align-items", "center");
     $STYLEELEM(nameplate, "width", "100%");
     nameplate.className = "CHARACTER-NAMEPLATE";
     $ELEM("gtris-charname-text", name => {
      $STYLEELEM(name, "color", count === ~~(selected[0]) ? "#ff0" : "#fff");
      $STYLEELEM(name, "text-shadow", "0 0 10px #000");
      $STYLEELEM(name, "text-align", "center");
      $STYLEELEM(name, "width", "100%");
      name.className = "CHARACTER-NAMEPLATE-NAME";
      name.innerText = gachatrisLanguage.characterText(split[0])[split[1]];
      nameplate.appendChild(name);
     });
     cell.appendChild(nameplate);
    })
    grid.appendChild(cell);
   });
  }
 }

 refreshSkinGrid(char) {
  let selected = gameStorage.currentSettings.settings.misc.character.split("-");
  let grid = $ID("VERSION-LIST-GRID"); //two-way
  $IH("VERSION-LIST-GRID", "");
  let h = this.characters[char];
  for (let count = 0; count < this.characterDetails[h].versions.length; count++) {
   let k = this.characterDetails[h],
    colors = {
     r: e => Math.max(Math.min(k.color.red + e, 255), 0),
     g: e => Math.max(Math.min(k.color.green + e, 255), 0),
     b: e => Math.max(Math.min(k.color.blue + e, 255), 0)
    };
   let split = k.common_name.split("/"),
    skinName = k.versions[count];
   /* if (!this.imageLoadAvatar?.[h]) {
      cacheManager.loadCache(`assets/characters/${h}/default/${k.grid_avatar}`, (fname) => {
       let s = new Image();
       s.src = fname;
       return s;
      }, "character", img => {
     this.imageLoadAvatar[h] = new(Image)();
     this.imageLoadAvatar[h].src = `assets/characters/${h}/default/${k.grid_avatar}`;
       
      })   }*/
   let d = gachatrisLanguage.characterText(h);

   $ELEM("gtris-character-grid-cell", (cell) => {
    cell.className = "CHARACTER-GRID-CELL";
    let w = gachatrisLanguage.characterText(split[0]);
    cell.addEventListener("click", async () => {
     let cn = count;
     const json = {
      header_raw: gachatrisLanguage.transText1("character_name_and_skin", [w.common_name, w.versions[count]]),
      props: [
       {
        type: "character",
        character: char,
        version: count,
        style: "display: flex; justify-content: center; width: 100%; height: auto; flex-wrap: wrap",
        height: "auto"
       },
       {
        string_raw: `${gachatrisLanguage.transText1("character_selector_use", w[split[1]])}`,
        type: "button",
        desc_raw: `${gachatrisLanguage.transText1("character_selector_use_desc", w[split[1]])}`,
        action: "onclick",
        onclick: `gameStorage.currentSettings.settings.misc.character = "${char}-${count}"; gameStorage.saveStorage(); gameMenu.switchMenu('back'); gachatrisLogNotification.notification("${gachatrisLanguage.transText1("character_selector_success")}", "${gachatrisLanguage.characterText(h).first_name}"); gachatrisCharacter.refreshSelectedCharacter();`
       },
      ]
     }
     gameMenu.switchMenu("add", "_", JSON.stringify(json), 1, false, `${gachatrisLanguage.characterText(split[0])[split[1]]}`);
    })
    $STYLEELEM(cell, "border", `3px solid rgba(${colors.r(8)},${colors.g(8)},${colors.b(8)},1)`);
    $STYLEELEM(cell, "display", "grid");
    //$STYLEELEM(cell, "flex-direction", "column");
    $STYLEELEM(cell, "position", "relative");
    $STYLEELEM(cell, "background", `rgba(${colors.r(-27)},${colors.g(-27)},${colors.b(-27)},1)`);
    $ELEM("gtris-character-avatar", imgDiv => {
     /*$ELEM("img", img => {
      img.src = `assets/characters/${h}/default/${k.grid_avatar}`;
      $STYLEELEM(img, "height", "100%");
      $STYLEELEM(img, "width", "100%");
      imgDiv.appendChild(img);/**/
     $ELEM("img", image => {
      imgDiv.appendChild(image);
      cacheManager.loadCache(`assets/characters/${h}/${skinName}/${k.grid_avatar}`, (fname) => {
       let s = document.createElement("img");
       s.src = fname;
       return s;
      }, "characterimage", img => {
       image.src = img.value.src;
       $STYLEELEM(image, "height", "100%");
       $STYLEELEM(image, "width", "100%");
      });
     });
     imgDiv.className = "CHARACTER-CELL-AVATAR";
     $STYLEELEM(imgDiv, "position", "relative");
     cell.appendChild(imgDiv);
    });
    $ELEM("gtris-grid-nameplate", nameplate => {
     $STYLEELEM(nameplate, "background", `rgba(${colors.r(-27)},${colors.g(-27)},${colors.b(-27)},1)`);
     $STYLEELEM(nameplate, "position", "relative");
     $STYLEELEM(nameplate, "display", "flex");
     $STYLEELEM(nameplate, "justify-content", "center");
     $STYLEELEM(nameplate, "align-items", "center");
     $STYLEELEM(nameplate, "width", "100%");
     nameplate.className = "CHARACTER-NAMEPLATE";
     $ELEM("gtris-charname-text", name => {
      $STYLEELEM(name, "color", count === ~~(selected[1]) && char === ~~(selected[0]) ? "#ff0" : "#fff");
      $STYLEELEM(name, "text-shadow", "0 0 10px #000");
      $STYLEELEM(name, "text-align", "center");
      $STYLEELEM(name, "width", "100%");
      name.className = "CHARACTER-NAMEPLATE-NAME";
      name.innerText = gachatrisLanguage.characterText(h).versions[count];
      nameplate.appendChild(name);
     });
     cell.appendChild(nameplate);
    })
    grid.appendChild(cell);
   });
  }
 }



 refreshCharacterGridPlayerAI(reference, char, str, name, number) {
  let selected = reference.character.split("-");
  var count = -1;
  let grid = $ID("CHARACTER-LIST-GRID");
  $IH("CHARACTER-LIST-GRID", "");
  for (let count = 0, h; count < this.characters.length; count++) {
   h = this.characters[count];
   let k = this.characterDetails[h],
    colors = {
     r: e => Math.max(Math.min(k.color.red + e, 255), 0),
     g: e => Math.max(Math.min(k.color.green + e, 255), 0),
     b: e => Math.max(Math.min(k.color.blue + e, 255), 0)
    };
   let split = k.common_name.split("/");
   /* if (!this.imageLoadAvatar?.[h]) {
      cacheManager.loadCache(`assets/characters/${h}/default/${k.grid_avatar}`, (fname) => {
       let s = new Image();
       s.src = fname;
       return s;
      }, "character", img => {
     this.imageLoadAvatar[h] = new(Image)();
     this.imageLoadAvatar[h].src = `assets/characters/${h}/default/${k.grid_avatar}`;
       
      })   }*/
   let d = gachatrisLanguage.characterText(h);

   $ELEM("gtris-character-grid-cell", (cell) => {
    cell.className = "CHARACTER-GRID-CELL";
    let w = gachatrisLanguage.characterText(split[0]);
    cell.addEventListener("click", async () => {
     let cn = count;
     /* const json = {
       header_raw: gachatrisLanguage.transText1("character_full_name", [w.surname, w.first_name, w.middle_name]),
       props: [
        {
         type: "character",
         character: cn,
         style: "display: flex; justify-content: center; width: 100%; height: auto; flex-wrap: wrap",
         height: "auto"
        },
        {
         string_raw: `${gachatrisLanguage.transText1("character_selector_use", w[split[1]])}`,
         type: "button",
         desc_raw: `${gachatrisLanguage.transText1("character_selector_use_desc", w[split[1]])}`,
         action: "onclick",
         onclick: `gameStorage.currentSettings.settings.misc.character = ${cn}; gameStorage.saveStorage(); gameMenu.switchMenu('back'); gachatrisLogNotification.notification("${gachatrisLanguage.transText1("character_selector_success")}", "${gachatrisLanguage.characterText(h).first_name}"); gachatrisCharacter.refreshSelectedCharacter();`
        },
       ]
      }
      gameMenu.switchMenu("add", "_", JSON.stringify(json), 1, false, `${gachatrisLanguage.characterText(split[0])[split[1]]}`);/**/
     gameMenu.switchMenu("add", "character", "false", "6", "false", "false", "setting_character_char_skin", [gachatrisLanguage.transText1("setting_character_selecting_other", [reference.name]), w.common_name]);
     gachatrisCharacter.refreshSkinGridAI(count, reference, str, name, number);
     gachatrisCharacter.resize();
    })
    $STYLEELEM(cell, "border", `3px solid rgba(${colors.r(8)},${colors.g(8)},${colors.b(8)},1)`);
    $STYLEELEM(cell, "display", "grid");
    //$STYLEELEM(cell, "flex-direction", "column");
    $STYLEELEM(cell, "position", "relative");
    $STYLEELEM(cell, "background", `rgba(${colors.r(-27)},${colors.g(-27)},${colors.b(-27)},1)`);
    $ELEM("gtris-character-avatar", imgDiv => {
     /*$ELEM("img", img => {
      img.src = `assets/characters/${h}/default/${k.grid_avatar}`;
      $STYLEELEM(img, "height", "100%");
      $STYLEELEM(img, "width", "100%");
      imgDiv.appendChild(img);/**/
     $ELEM("img", image => {
      imgDiv.appendChild(image);
      cacheManager.loadCache(`assets/characters/${h}/${selected[0] === count ? k.versions[selected[1]] : "default"}/${k.grid_avatar}`, (fname) => {
       let s = document.createElement("img");
       s.src = fname;
       return s;
      }, "characterimage", img => {
       image.src = img.value.src;
       $STYLEELEM(image, "height", "100%");
       $STYLEELEM(image, "width", "100%");
      });
     });
     imgDiv.className = "CHARACTER-CELL-AVATAR";
     $STYLEELEM(imgDiv, "position", "relative");
     cell.appendChild(imgDiv);
    });
    $ELEM("gtris-grid-nameplate", nameplate => {
     $STYLEELEM(nameplate, "background", `rgba(${colors.r(-27)},${colors.g(-27)},${colors.b(-27)},1)`);
     $STYLEELEM(nameplate, "position", "relative");
     $STYLEELEM(nameplate, "display", "flex");
     $STYLEELEM(nameplate, "justify-content", "center");
     $STYLEELEM(nameplate, "align-items", "center");
     $STYLEELEM(nameplate, "width", "100%");
     nameplate.className = "CHARACTER-NAMEPLATE";
     $ELEM("gtris-charname-text", name => {
      $STYLEELEM(name, "color", count === selected ? "#ff0" : "#fff");
      $STYLEELEM(name, "text-shadow", "0 0 10px #000");
      $STYLEELEM(name, "text-align", "center");
      $STYLEELEM(name, "width", "100%");
      name.className = "CHARACTER-NAMEPLATE-NAME";
      name.innerText = gachatrisLanguage.characterText(split[0])[split[1]];
      nameplate.appendChild(name);
     });
     cell.appendChild(nameplate);
    })
    grid.appendChild(cell);
   });
  }
 }

 refreshSkinGridAI(char, reference, str, name, number) {
  let selected = reference.character.split("-")[1];
  let grid = $ID("VERSION-LIST-GRID"); //two-way
  $IH("VERSION-LIST-GRID", "");
  let h = this.characters[char];
  for (let count = 0; count < this.characterDetails[h].versions.length; count++) {
   let k = this.characterDetails[h],
    colors = {
     r: e => Math.max(Math.min(k.color.red + e, 255), 0),
     g: e => Math.max(Math.min(k.color.green + e, 255), 0),
     b: e => Math.max(Math.min(k.color.blue + e, 255), 0)
    };
   let split = k.common_name.split("/"),
    skinName = k.versions[count];
   /* if (!this.imageLoadAvatar?.[h]) {
      cacheManager.loadCache(`assets/characters/${h}/default/${k.grid_avatar}`, (fname) => {
       let s = new Image();
       s.src = fname;
       return s;
      }, "character", img => {
     this.imageLoadAvatar[h] = new(Image)();
     this.imageLoadAvatar[h].src = `assets/characters/${h}/default/${k.grid_avatar}`;
       
      })   }*/
   let d = gachatrisLanguage.characterText(h);

   $ELEM("gtris-character-grid-cell", (cell) => {
    cell.className = "CHARACTER-GRID-CELL";
    let w = gachatrisLanguage.characterText(split[0]);
    cell.addEventListener("click", async () => {
     let cn = count;
     const json = {
      header_raw: gachatrisLanguage.transText1("character_name_and_skin", [w.common_name, w.versions[count]]),
      props: [
       {
        type: "character",
        character: char,
        version: count,
        style: "display: flex; justify-content: center; width: 100%; height: auto; flex-wrap: wrap",
        height: "auto"
       },
       {
        string_raw: `${gachatrisLanguage.transText1("character_selector_use", w[split[1]])}`,
        type: "button",
        desc_raw: `${gachatrisLanguage.transText1("character_selector_use_desc", w[split[1]])}`,
        action: "onclick",
        onclick: `${str} = "${char}-${cn}"; for (let __ = 0; __ < 4; __++) gameMenu.switchMenu('back'); gachatrisLogNotification.notification("${gachatrisLanguage.transText1("character_selector_success_playerlist")}", "${gachatrisLanguage.characterText(h).first_name}"); gachatrisCharacter.refreshSelectedCharacter(${str}); gachatrisPlayerContainer.refreshPlayerListGrid(); gachatrisCharacter.refreshCharacterGridPlayerAI(${str.replace(".character","")}, ${number}, \"gameStorage.sessionSettings.playerAI[${count}].character\", \"${name}\"); gachatrisCharacter.resize(); gachatrisPlayerContainer.resize();`
       },
      ]
     };
     ////console.log( `${str} = "${char}-${cn}"; for (let __ = 0; __ < 3; __++) gameMenu.switchMenu('back'); gachatrisLogNotification.notification("${gachatrisLanguage.transText1("character_selector_success_playerlist")}", "${gachatrisLanguage.characterText(h).first_name}"); gachatrisCharacter.refreshSelectedCharacter(${str}); gachatrisPlayerContainer.refreshPlayerListGrid(); gachatrisCharacter.refreshCharacterGridPlayerAI(${number}, \"gameStorage.sessionSettings.playerAI[${count}].character\", \"${name}\"); gachatrisCharacter.resize(); gachatrisPlayerContainer.resize();`)
     gameMenu.switchMenu("add", "_", JSON.stringify(json), 1, false, `${gachatrisLanguage.characterText(split[0])[split[1]]}`);
    })
    $STYLEELEM(cell, "border", `3px solid rgba(${colors.r(8)},${colors.g(8)},${colors.b(8)},1)`);
    $STYLEELEM(cell, "display", "grid");
    //$STYLEELEM(cell, "flex-direction", "column");
    $STYLEELEM(cell, "position", "relative");
    $STYLEELEM(cell, "background", `rgba(${colors.r(-27)},${colors.g(-27)},${colors.b(-27)},1)`);
    $ELEM("gtris-character-avatar", imgDiv => {
     /*$ELEM("img", img => {
      img.src = `assets/characters/${h}/default/${k.grid_avatar}`;
      $STYLEELEM(img, "height", "100%");
      $STYLEELEM(img, "width", "100%");
      imgDiv.appendChild(img);/**/
     $ELEM("img", image => {
      imgDiv.appendChild(image);
      cacheManager.loadCache(`assets/characters/${h}/${skinName}/${k.grid_avatar}`, (fname) => {
       let s = document.createElement("img");
       s.src = fname;
       return s;
      }, "characterimage", img => {
       image.src = img.value.src;
       $STYLEELEM(image, "height", "100%");
       $STYLEELEM(image, "width", "100%");
      });
     });
     imgDiv.className = "CHARACTER-CELL-AVATAR";
     $STYLEELEM(imgDiv, "position", "relative");
     cell.appendChild(imgDiv);
    });
    $ELEM("gtris-grid-nameplate", nameplate => {
     $STYLEELEM(nameplate, "background", `rgba(${colors.r(-27)},${colors.g(-27)},${colors.b(-27)},1)`);
     $STYLEELEM(nameplate, "position", "relative");
     $STYLEELEM(nameplate, "display", "flex");
     $STYLEELEM(nameplate, "justify-content", "center");
     $STYLEELEM(nameplate, "align-items", "center");
     $STYLEELEM(nameplate, "width", "100%");
     nameplate.className = "CHARACTER-NAMEPLATE";
     $ELEM("gtris-charname-text", name => {
      $STYLEELEM(name, "color", count === selected ? "#ff0" : "#fff");
      $STYLEELEM(name, "text-shadow", "0 0 10px #000");
      $STYLEELEM(name, "text-align", "center");
      $STYLEELEM(name, "width", "100%");
      name.className = "CHARACTER-NAMEPLATE-NAME";
      name.innerText = gachatrisLanguage.characterText(h).versions[count];
      nameplate.appendChild(name);
     });
     cell.appendChild(nameplate);
    })
    grid.appendChild(cell);
   });
  }
 }


 resize(cs) {
  let cellSize = cs || gachatrisCore.CELL_SIZE;
  let charCells = $CLASS("CHARACTER-GRID-CELL"),
   charAvatar = $CLASS("CHARACTER-CELL-AVATAR"),
   charNameplate = $CLASS("CHARACTER-NAMEPLATE"),
   sizeMult = 2.2;
  for (let s of charCells) {
   $STYLEELEM(s, "width", `${cellSize * 4 * sizeMult}px`);
   $STYLEELEM(s, "height", `${cellSize * 7 * sizeMult}px`);
  }
  for (let s of charAvatar) {
   $STYLEELEM(s, "width", `${cellSize * 4 * sizeMult}px`);
   $STYLEELEM(s, "height", `${cellSize * 6 * sizeMult}px`);
  }
  for (let s of charNameplate) {
   $STYLEELEM(s, "width", `${cellSize * 4 * sizeMult}px`);
   $STYLEELEM(s, "height", `${cellSize * 1 * sizeMult}px`);
  }
  let charCellsIndex = $CLASS("CHARACTER-GRID-CELL-INDEX"),
   charAvatarIndex = $CLASS("CHARACTER-CELL-AVATAR-INDEX"),
   charNameplateIndex = $CLASS("CHARACTER-NAMEPLATE-INDEX");
  sizeMult = 2.2;
  for (let s of charCellsIndex) {
   $STYLEELEM(s, "width", `${cellSize * 4 * sizeMult}px`);
   $STYLEELEM(s, "height", `${cellSize * 7 * sizeMult}px`);
  }
  for (let s of charAvatarIndex) {
   $STYLEELEM(s, "width", `${cellSize * 4 * sizeMult}px`);
   $STYLEELEM(s, "height", `${cellSize * 6 * sizeMult}px`);
  }
  for (let s of charNameplateIndex) {
   $STYLEELEM(s, "width", `${cellSize * 4 * sizeMult}px`);
   $STYLEELEM(s, "height", `${cellSize * 1 * sizeMult}px`);
  }
 }
}();

const gachatrisPlayerContainer = new class {
 constructor() {

 }

 refreshPlayerListGrid() {
  let selected = gameStorage.currentSettings.settings.misc.character;
  var count = -1;
  let grid = $ID("AI-LIST-GRID");
  $IH("AI-LIST-GRID", "");
  for (let count = 0, h; count < gameStorage.sessionSettings.playerAI.length; count++) {
   let base = gameStorage.sessionSettings.playerAI[count],
    be = base.character.split("-");
   h = gachatrisCharacter.characters[be[0]];
   let h2 = gachatrisCharacter.characterDetails[h].versions[be[1]];
   
   let k = gachatrisCharacter.characterDetails[h],
    colors = {
     r: e => Math.max(Math.min(k.color.red + e, 255), 0),
     g: e => Math.max(Math.min(k.color.green + e, 255), 0),
     b: e => Math.max(Math.min(k.color.blue + e, 255), 0)
    };
   let split = k.common_name.split("/");
   /*if (!gachatrisCharacter.imageLoadAvatar?.[h]) {
    gachatrisCharacter.imageLoadAvatar[h] = new(Image)();
    gachatrisCharacter.imageLoadAvatar[h].src = `assets/characters/${h}/default/${k.grid_avatar}`;
   }*/
   let d = gachatrisLanguage.characterText(h);

   $ELEM("gtris-character-grid-cell", (cell) => {
    cell.className = "PLAYERAI-GRID-CELL";
    let w = gachatrisLanguage.characterText(split[0]);
    cell.addEventListener("click", () => {
     let cn = count;
     let regularExpression = "@$DOUBLEQUOTE",
      regExpGT = />/g;
     //console.log(be)
     const json = {
      header_raw: gachatrisLanguage.transText1("playerlist_player_setting", base.name),
      props: [
       {
        type: "character",
        character: be[0],
        version: be[1],
        style: "display: flex; justify-content: center; width: 100%; height: auto; flex-wrap: wrap",
        height: "auto"
       },
       {
        string_raw: `${gachatrisLanguage.transText1("setting_s_character")}`,
        type: "button",
        desc_raw: gachatrisLanguage.transText1("playerlist_character_using", [gachatrisLanguage.transText1("character_full_name", [w.surname, w.first_name, w.middle_name])]),
        action: "onclick",
        onclick: `gameMenu.switchMenu(\"add\", \"character\", \"false\", \"3\", \"false\", \"false\", \"setting_character_screen_header\", [\"${gachatrisLanguage.transText1("setting_character_selecting_other", base.name)}\"]); gachatrisCharacter.refreshCharacterGridPlayerAI(gameStorage.sessionSettings.playerAI[${count}], \"${base.character}\", \"gameStorage.sessionSettings.playerAI[${count}].character\", \"${base.name}\"); gachatrisCharacter.resize();`
       },
       {
        type: "html",
        inner_html: gameMenu.createSelectorParameter(`parameter${count}-tspin`, "ai_tspin", SETTINGS_LIST.ai.tspin, gameStorage.sessionSettings.playerAI[count], `gameStorage.sessionSettings.playerAI[${count}]`, "enableTspin", false).replaceAll(regularExpression, `\"`).replaceAll(regExpGT, "@$GREATERTHAN"),
        style: "display: flex; justify-content: center; width: 100%; height: auto; flex-wrap: wrap",
        height: "auto"
       },
       {
        string: "ai_tspin_warning",
        type: "text",
        text_type: "body",
        text_color: "#f22",
        font_size: 1
       },
       {
        "string": "playerlist_speed",
        "type": "playerlist_param_slider",
        parent_preset: "ai",
        preset: "speed",
        parameter: "delayReset",
        player_number: count,
        "default": 100,
        "disable_loc": "true",
  },
  ]
     }
     gameMenu.switchMenu("add", "_", JSON.stringify(json), 1, false, `${gachatrisLanguage.transText1("playerlist_player_setting", base.name)}`);
    })
    $STYLEELEM(cell, "border", `3px solid rgba(${colors.r(8)},${colors.g(8)},${colors.b(8)},1)`);
    $STYLEELEM(cell, "display", "grid");
    //$STYLEELEM(cell, "flex-direction", "column");
    $STYLEELEM(cell, "position", "relative");
    $STYLEELEM(cell, "background", `rgba(${colors.r(-27)},${colors.g(-27)},${colors.b(-27)},1)`);
    $ELEM("gtris-character-avatar", imgDiv => {
     cacheManager.loadCache(`assets/characters/${h}/${h2}/${k.grid_avatar}`, (fname) => {
      let s = document.createElement("img");
      s.src = fname;
      return s;
     }, "characterimage", img => {
      $ELEM("img", image => {
       image.src = img.value.src;
       imgDiv.appendChild(image);
       $STYLEELEM(image, "height", "100%");
       $STYLEELEM(image, "width", "100%");
      })
     });
     imgDiv.className = "PLAYERAI-CELL-AVATAR";
     $STYLEELEM(imgDiv, "position", "relative");
     cell.appendChild(imgDiv);
    });
    $ELEM("gtris-grid-nameplate", nameplate => {
     $STYLEELEM(nameplate, "background", `rgba(${colors.r(-27)},${colors.g(-27)},${colors.b(-27)},1)`);
     $STYLEELEM(nameplate, "position", "relative");
     $STYLEELEM(nameplate, "display", "flex");
     $STYLEELEM(nameplate, "justify-content", "center");
     $STYLEELEM(nameplate, "align-items", "center");
     $STYLEELEM(nameplate, "width", "100%");
     nameplate.className = "PLAYERAI-NAMEPLATE";
     $ELEM("gtris-charname-text", name => {
      $STYLEELEM(name, "color", "#fff");
      $STYLEELEM(name, "text-shadow", "0 0 10px #000");
      $STYLEELEM(name, "text-align", "center");
      $STYLEELEM(name, "width", "100%");
      name.className = "PLAYERAI-NAMEPLATE-NAME1";
      name.innerText = base.name;
      nameplate.appendChild(name);
     });
     $ELEM("gtris-charname-text", name => {
      $STYLEELEM(name, "color", "#fff");
      $STYLEELEM(name, "text-shadow", "0 0 10px #000");
      $STYLEELEM(name, "text-align", "center");
      $STYLEELEM(name, "width", "100%");
      name.className = "PLAYERAI-NAMEPLATE-NAME2";
      name.innerText = `(${gachatrisLanguage.characterText(split[0])[split[1]]})`;
      nameplate.appendChild(name);
     });
     cell.appendChild(nameplate);
    })
    grid.appendChild(cell);
   });
  }
 }
 resize(cs) {
  let cellSize = cs || gachatrisCore.CELL_SIZE;
  let charCells = $CLASS("PLAYERAI-GRID-CELL"),
   charAvatar = $CLASS("PLAYERAI-CELL-AVATAR"),
   charNameplate = $CLASS("PLAYERAI-NAMEPLATE"),
   sizeMult = 2.2;
  for (let s of charCells) {
   $STYLEELEM(s, "width", `${cellSize * 4 * sizeMult}px`);
   $STYLEELEM(s, "height", `${cellSize * 7 * sizeMult}px`);
  }
  for (let s of charAvatar) {
   $STYLEELEM(s, "width", `${cellSize * 4 * sizeMult}px`);
   $STYLEELEM(s, "height", `${cellSize * 6 * sizeMult}px`);
  }
  for (let s of charNameplate) {
   $STYLEELEM(s, "width", `${cellSize * 4 * sizeMult}px`);
   $STYLEELEM(s, "height", `${cellSize * 1 * sizeMult}px`);
  }
  let charCellsIndex = $CLASS("PLAYERAI-GRID-CELL-INDEX"),
   charAvatarIndex = $CLASS("PLAYERAI-CELL-AVATAR-INDEX"),
   charNameplateIndex = $CLASS("PLAYERAI-NAMEPLATE-INDEX");
  sizeMult = 2.2;
  for (let s of charCellsIndex) {
   $STYLEELEM(s, "width", `${cellSize * 4 * sizeMult}px`);
   $STYLEELEM(s, "height", `${cellSize * 7 * sizeMult}px`);
  }
  for (let s of charAvatarIndex) {
   $STYLEELEM(s, "width", `${cellSize * 4 * sizeMult}px`);
   $STYLEELEM(s, "height", `${cellSize * 6 * sizeMult}px`);
  }
  for (let s of charNameplateIndex) {
   $STYLEELEM(s, "width", `${cellSize * 4 * sizeMult}px`);
   $STYLEELEM(s, "height", `${cellSize * 1 * sizeMult}px`);
  }
 }
}()