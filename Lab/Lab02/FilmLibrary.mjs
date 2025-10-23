import sqlite from "sqlite3";

import dayjs from "dayjs";

import Film from "./Film.mjs";

function mapRowsToFilms(rows) {
    return rows.map(row => new Film(row.id, row.title, row.isFavorite === 1, row.watchDate, row.rating, row.userId));
}

export default function FilmLibrary() {
    const db= new sqlite.Database("films.db",(err)=>{
        if(err) throw err;
    });

    this.closeDB=()=>{
        try{
            db.close();
        }
        catch(error){
            console.error('Impossibile to close the database!${error}');

        }
    }
    
    //Retrieve all the stored films and return 
    //a Promise that resolves to an array of Film objects
    this.getAll =()=>{
       return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM films';
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(mapRowsToFilms(rows));
                }
            });
        });
    }

    //Retrieve all favorite films and return a Promise 
    // that resolves to an array of Film objects
    this.getFavorites= () =>{

        return new Promise((resolve,reject)=>{
            const query ='SELECT * FROM films where isFavorite=1';
            db.all(query,[],(err,rows)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(mapRowsToFilms(rows));
                }


            });
        });

    };

    //Retrieve all films watched today and return 
    // a Promise that resolves to an array of Film objects
    this.watched= ()=>{
        return new Promise((resolve,reject)=>{
            const query='SELECT * FROM films where watchDate=?';
            const today= dayjs().format('YYYY-MM-DD');
            db.all(query,[today],(err,rows)=>{
                //Quando la funzione esegue la query, il valore today sostituisce 
                // il ?, e la query effettiva eseguita sul 
                // database diventa: SELECT * FROM films WHERE watchdate = '2025-10-23'.
                if(err){
                    reject(err);
                }
                else{
                    resolve(mapRowsToFilms(rows));
                }
            });
        });
    };

    //d. Retrieve films whose watch date is earlier than a given date 
    // (received as a parameter). Return a
    //Promise that resolves to an array of Film objects.
    this.getEarlier =(watchDate)=>{
        return new Promise((resolve,reject)=>{
            const query='SELECT * FROM films where watchDate<?';
            db.all(query,[watchDate.format('YYYY-MM-DD')],(err,rows)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(mapRowsToFilms(rows));
                }
            });
        });
    }

//e. Retrieve films whose rating is greater than or equal to a given number (received as a parameter).
//Return a Promise that resolves to an array of Film objects.
    this.getrating=(rate)=>{
        return new Promise((resolve,reject)=>{
            const query='SELECT * FROM films where rating>=?';
              db.all(query,[rate],(err,rows)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(mapRowsToFilms(rows));
                }
            });

        });
    }

//f. Retrieve films whose title contains a given string (received as a parameter). Return a Promise that
//resolves to an array of Film objects.
    this.gettitle=(string)=>{
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM films WHERE title LIKE ?';
            db.all(query, [`%${string}%`], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(mapRowsToFilms(rows));
                }
            });
        });
    };

    //Dal lab01

     this.deleteFilm = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM films WHERE id = ?';
            db.run(query, [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    };

    this.add = (film) => {
         return new Promise((resolve, reject) => {
            const query = 'INSERT INTO films (title, isFavorite, watchDate, rating, userId) VALUES (?, ?, ?, ?, ?)';
            const watchDate = film.watchDate ? film.watchDate.format("YYYY-MM-DD") : null;
            let rating = undefined;
            if (!film.rating || film.rating < 1 || film.rating > 5) 
                rating = null;
            else
                rating = film.rating;
            db.run(query, [film.title, film.favorite, watchDate, rating, film.userId], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }


    this.resetWhatchedFilms = () => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE  films SET watchDate = NULL';
            db.run(query, [], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });

    }
}

