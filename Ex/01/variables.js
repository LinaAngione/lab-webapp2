"use strict";

console.log(c); //undefined senza dichiararla prima

let a=5; // si può riassegnare un valore ma non possiamo ridichiararla
const b= "prova"; // non si può riassegnare nè ridichiarare 
var c=10; //si riassegna e si ridichiara NON USTELA!

console.log(a);
console.log(b);
console.log(c);

//RIASSEGNARE VALORE
a=3;
//b=5; //errore
c=1
console.log(a);
console.log(c);

//RIDICHIARARE
//let a=2; //errore
//const b=1; //errore
var c=6;
console.log(c);

