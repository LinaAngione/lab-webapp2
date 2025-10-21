import sqlite from "sqlite3"
import dayjs from "dayjs";

const db= new sqlite.Database("films.db",(err)=>{

if(err) throw err;
})

let sql= "SELECT * FROM films";
let results=[];

db.all(sql,(err,rows)=>{
    if(err) throw err;
    for(let row of rows)
        results.push(row);
});

console.log("******");//mi stampa solo questo

for(let r of results){
    console.log(r);
}