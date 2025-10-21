/*

Then, create a function that, given an array of strings, 
for each string computes and prints a new one
composed by the first two and last two characters. 
If the word is shorter than two characters, the function
will print an empty string. Otherwise, 
if the word is two characters long, the function prints the same
character twice.
Examples: ‘spring’ yields ‘spng’; ‘it’ yields ‘itit’; ‘cat’ yields ‘caat’.
Call the function with a variety of strings 
and check the result's correctness.

*/

function fn1(string){

    let new_string="";

    if(string.length==2){

        new_string=string+string;
        
    }
    else if(string.length<2){
        new_string="";
    } 
    else
    {
        new_string=string[0]+string[1]+string[string.length-2]+string[string.length-1];
    }
    console.log("La stringa è:"+string);
    console.log("La stringa nuova è:"+new_string);
    
}
fn1("c");
fn1("it");
fn1("spring");
fn1("cat");