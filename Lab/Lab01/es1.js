'use strict';
const dayjs = require('dayjs');
/*1. Create a Film Library
In this exercise, you will implement a simple application to track the films that a person wants to watch and
the ones they have already watched. Each film is represented by the following fields:
▪ A unique numerical id (mandatory)
▪ A title (mandatory)
▪ A Boolean value to represent whether the film is among the person’s favorites (default value: false)
▪ A date corresponding to the date when the person watched the film (optional)
▪ A numerical value between 1 and 5 to represent the rating that the person has given to the film after
watching it (optional)
▪ A numerical id representing the person (mandatory, default to 1).

Firstly, implement a constructor function to create Film objects.
Secondly, implement a constructor function to create a FilmLibrary, 
an object containing an array of Films.
Then, implement the addNewFilm method, which adds a new Film object, 
passed as parameter, to the
FilmLibrary. Populate the FilmLibrary using this method.
To conclude, print in the console the entire list of Films stored in the FilmLibrary, with all their fields.
For instance, you can take inspiration from the following list:
Id: 1, Title: Pulp Fiction, Favorite: true, Watch date: March 10, 2024, Score: 5, User: 1
Id: 2, Title: 21 Grams, Favorite: true, Watch date: March 17, 2024, Score: 4, User: 1
Id: 3, Title: Star Wars, Favorite: false, Watch date: null, Score: 0, User: 1
Id: 4, Title: Matrix, Favorite: false, Watch date: null, Score: 0, User: 1
Id: 5, Title: Shrek, Favorite: false, Watch date: March 21, 2024, Score: 3, User: 1
Hint: you may use the day.js library to create and handle the dates. x
Hint: To implement the required functionalities described above you may use the functional programming
paradigm to manipulate the array of films. */

function Film(id,title,favorites=false,rating=null,idperson=1,date=null){

    this.id=id;
    this.title=title;
    this.favorites=favorites;
    this.date=dayjs(date).format('YYYY-MM-DD');
    this.rating=rating;
    this.idperson=idperson;
//valore opzionale--> si mette =null e va anche infondo
//valore di defualt--> si mette =valore di defualt e vanno infondo

   this.toString=()=>{
    
    //alt+0096
    return `${this.id},${this.title},${this.favorites},${this.date}`;

}
}

function FilmLibrary(name,date){

    this.name=name;
    this.date=dayjs(date);
    this.film=[];
    this.add=(film) =>{

        this.film.push(film);

    }

    this.find=(idperson)=>{ //restituisci tutti i film della stessa persona
        const foundfilm=[];
        for (const fil of this.film){
            if(fil.idperson==idperson){
                foundfilm.push(fil);

            }


        }

        return foundfilm;
    }

    this.afterDate =(date)=>{

    }

    this.listByDate = () =>{


    }

    this.listByScore = () =>{


    }

}


const Libr=new FilmLibrary('Mia Lista','2024-08-14');
const movie1 = new Film(1, "Rebecca", false, null, 2, '2024-08-17');
const movie2 = new Film(2, "Joker", true, null, 2, '2023-02-18');
const movie3 = new Film(3, "Una notte da leoni", false, null, 1, '2024-09-17');
const movie4 = new Film(4, "Delitto in pieno sole", false, null, 2, '2024-08-17');/*
errato per l'ordine dei parametri!!
const movie1=new Film(1,"Rebecca",'17-08-2024',null,2);
const movie2=new Film(2,"Joker",true,null,2,'18-02-2023');
const movie3=new Film(3,"Una notte da leoni",'17-09-2024',null,1);
const movie4=new Film(4,"Delitto in pieno sole",'17-08-2024',null,2);
*/
Libr.add(movie1);
Libr.add(movie2);
Libr.add(movie3);
Libr.add(movie4);

const foundmovie=Libr.find(2);

console.log(movie1.toString());


