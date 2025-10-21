"use strict"


const scores = [-20, 30, -1, 100, -3, -5, 50, 10];
let NN=0;
let sortscore=[];

let k=0;
//azzero i numeri negativi
for(let i=0;i<scores.length;++i){
        
    if(scores[i]<0){
            ++NN;
    }
    else{
            sortscore[k]=scores[i];
            ++k;
    }
}
//sortscore=sort(sortscore);
sortscore.sort((a, b) => a-b)

console.log(sortscore);
sortscore.shift();
sortscore.shift();
console.log(sortscore);

let j=0;
let sum=0;
for(let s of sortscore){
    sum+=s;
}
console.log(sum)
let avg;
avg=sum/sortscore.length;

for(let i=0;i<NN+2;i++){
    sortscore.push(avg);
}

console.log(scores);
console.log(sortscore);


/*function sort(scores){

    console.log(sortscore);
    let a;
    for(let i=0;i<sortscore.length;++i){
        for(let j=i+1;j<sortscore.length;++j){
            if(sortscore[i]>sortscore[j]){
                a=sortscore[i];
                sortscore[i]=sortscore[j];
                sortscore[j]=a;
            }
        }

    }
    console.log(sortscore);
    
    return sortscore;


}*/