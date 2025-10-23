'use strict';
const dayjs = require('dayjs');

export function Film(id, title, favorites = false, rating = null, idperson = 1, date = null) {

    this.id = id;
    this.title = title;
    this.favorites = favorites;
    //se date è false allora ci fermiamo subito e dayjs non agisce
    this.date =date && dayjs(date);
    this.rating = rating;
    this.idperson = idperson;
    //valore opzionale--> si mette =null e va anche infondo
    //valore di defualt--> si mette =valore di defualt e vanno infondo

    this.toString = () => {
        
        return `${this.id},${this.title},${this.favorites},${this.date}`;

    }
}

function FilmLibrary(name, date) {

    this.name = name;
    this.date = dayjs(date);
    this.film = [];

    this.add = (film) => {
        this.film.push(film);
    }

    this.find = (idperson) => { //restituisci tutti i film della stessa persona
        const foundfilm = [];
        for (const fil of this.film) {
            if (fil.idperson == idperson) {
                foundfilm.push(fil);
            }
        }
        return foundfilm;
    }

    this.sortBydate = () => {
        const sortLibrary = [...this.film];
        sortLibrary.sort((d1, d2) => {
            if (!(d1.date)) return 1;
            if (!(d2.date)) return -1;
            return d1.date.diff(d2.date, 'day');
        });
        return sortLibrary;
    }

    this.deleteFilm = (id) => {

        for (let i = 0; i < this.film.length; i++) {
            if (id == this.film[i].id) {
                this.film.splice(i,1);
            }
        }

    }

    this.resetWhatchedFilms = () => {

        for (const f of this.film) {

            f.date = null;

        }

    }

    this.getRated = (Score) => {
        const listf =[] ;
        for (let i = 0; i < this.film.length; i++) {
            if (Score == this.film[i].Score) {

                listf.pop(this.film[i]);
            }
        }
        listf.sortBydate;
        return listf;
    }


}

function main() {

    const libr = new FilmLibrary('Mia Lista', '2024-08-14');
    const movie1 = new Film(1, "Rebecca", false, null, 2, '2024-08-17');
    const movie2 = new Film(2, "Joker", true, null, 2, '2023-02-18');
    const movie3 = new Film(3, "Una notte da leoni", false, null, 1, '2024-09-17');
    const movie4 = new Film(4, "Delitto in pieno sole", false, null, 2, '2024-08-17');
    libr.add(movie1);
    libr.add(movie2);
    libr.add(movie3);
    libr.add(movie4);

    console.log('****List of films****');
    libr.film.forEach((film)=> console.log(film.toString()));
    
    console.log('****List of films (sorted)****');
    const sortedFilms=libr.sortBydate();
    sortedFilms.forEach((film)=> console.log(film.toString()));

    
    console.log(movie1.toString());
    const foundmovie = libr.find(2);
    console.log('****Founded film!****');
    foundmovie.forEach((film)=>console.log(film.toString()));
    
    libr.deleteFilm(3);
    console.log('****Deleted film!****');
    libr.film.forEach((film)=> console.log(film.toString()));

    libr.resetWhatchedFilms();

    //Printing modified Library
    console.log("***** List of films *****");
    libr.film.forEach((item) => console.log(item.toString()));

    //Retrieve and print films with an assigned rating
    console.log("***** Films filtered, only the rated ones *****");
    const ratedFilms = libr.getRated();
    ratedFilms.forEach((film) => console.log(film.toString()));

    //Additional instruction to enable debug 
    debugger;

}

main();