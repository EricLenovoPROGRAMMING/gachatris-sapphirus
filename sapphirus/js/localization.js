const gachatrisLanguage = new class {
 constructor() {
  this.languageFiles = {};
  this.current = "en-US";
 }
 loadLanguage(file, on) {
  if (this.languageFiles?.[file]) {
   on(this.languageFiles[file]);
   return;
  }
  let regex = /-/g;
  $JSON(`/json/lang/${file.replace(regex, "_").toLowerCase()}.json`).then(lang => {
    this.languageFiles[file] = lang;
    on(lang);
   })
   .catch(e => {
    throw "Error loading the language file";
   });
 }
 transText1(name, input, fallback) {
  let _input = (typeof input !== 'object' || !(input instanceof Array) ? [input] : (input)),
   language = this.languageFiles[this.current],
   result = language.main[name] || fallback || "NULL";
  for (let v = 0; v < _input.length; v++) {
   let varInstance = _input[v];
   let placeholder = `VAR%${v}`;
   let regExp = new RegExp(placeholder, "gm");
   result = result.replace(regExp, varInstance);
  }
  return result;
 }

 characterText(name, fallback) {
  let language = this.languageFiles[this.current],
   result = language.character[name] || fallback || "NULL";
  return result;
 }
 selectionText(name, fallback) {
  let language = this.languageFiles[this.current],
   result = language.selector[name] || fallback || "NULL";
  return result;
 }
 keysText(name, fallback) {
  let language = this.languageFiles[this.current],
   result = language.keys[name] || fallback || "NULL";
  return result;
 }
}();