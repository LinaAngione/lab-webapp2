"use strict"

    let list="Luigi De Russis, Luca Scibetta, Fulvio Corno, Francesca Russo";
    let names=[];

    names=list.split(",");

    //rimuovere spazi
    for(let i=0;i<names.length;++i){

        names[i]=names[i].trim();

    }
    
    console.log(names);

    let acronyms=["","","",""];

    for(let i=0;i<names.length;++i){
        const word=names[i].split(" ");
        console.log(word);
        for(let j=0;j<word.length;++j){
            acronyms[i]+=(word[j].charAt(0));
            
        }
        console.log(acronyms[i]);

    }
