const gachatrisTournament = new class {
 #players = [];
 #Seed = class {
  constructor(num, q, parameters) {
   this.number = num;
   this.parameters = parameters;
   this.qualificationType = q || "qt";
  }
 };
 constructor() {
  this.mode = 0;
  this.active + {};
  this.matches = 0;
 }
 
 resetTournament() {
  this.#players = [];
  this.matxhes = 0;
 }
 
 makeSeed(seed, parameter) {
  this.#players.push(new this.#Seed(seed, "qt", parameter));
 }
 
 lrRun() {
  
 }
}();
//COMING SOON