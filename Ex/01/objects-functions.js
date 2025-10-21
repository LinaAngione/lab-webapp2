"use strict"

//object

const movie= {

    title: 'Forest Gump',
    gnere: 'Drama',
    duration: 142
}

console.log(movie.title);
console.log(movie.duration);
console.log(movie.gnere);

//costructor function

function Movie(title,genre,duration){

    this.title =title;
    this.genre=genre;
    this.duration=duration;

    this.isLong = () => this.duration >120; //metodo

}

let forrest= new Movie("Forest Gump", "Drama",142);
console.log(forrest.isLong());