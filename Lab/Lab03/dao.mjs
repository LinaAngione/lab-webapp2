/* Data Access Object (DAO) module for accessing Q&A */
/* Initial version taken from exercise 4 (week 03) */
//pattern web per accedere al database e che contiene i metodi che ci servono
//nel formato come diceva il documento google list
import sqlite from 'sqlite3';
import dayjs from "dayjs";
//import db from "./db.mjs";
import Film from './Film.mjs';

// open the database
const db = new sqlite.Database('films.db', (err) => {
  if (err) throw err;
});

const filters = {
    'filter-favorite': {label: 'Favorites', filterFunction: film => film.favorite},
    'filter-best': {label: 'Best Rated', filterFunction: film => film.rating >= 5},
    'filter-lastmonth': {label: 'Seen Last Month', filterFunction: film => isSeenLastMonth(film)},
    'filter-unseen': {label: 'Unseen', filterFunction: film => !film.watchDate}
};
const isSeenLastMonth = (film) => {
    if(!film.watchDate) return false;
    const diff = film.watchDate.diff(dayjs(), 'month');
    return diff <= 0 && diff > -1; // Esempio logica dayjs
};
export default function FilmDao() {
/** QUESTIONS **/
// get all the questions
this.listFilm = () => {
  // write something clever
}//altro modo per esportare la funzione singolarmente

// get a film given its id
this.getFilm = (id) => {
  return new Promise ((resolve, reject) => {
    // CORREZIONE 1: SQL corretto (SELECT * ...)
    const sql = 'SELECT * FROM films WHERE id=?';
    
    // CORREZIONE 2: Usa db.get per ottenere un singolo oggetto, non un array
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve({error: "Film not available, check the inserted id."});
      } else {
        // CORREZIONE 3 e 4: new Film (singolare) e row.rating (corretto typo)
        resolve(new Film(row.id, row.title, row.isFavorite === 1, row.watchDate, row.rating, row.userId));
      }
    });
  });
}

this.getFilms = (filter) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM films';
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {                    
                  const films = rows.map(row => new Film(row.id, row.title, row.isFavorite === 1, row.watchDate, row.rating, row.userId));
                  if (filters.hasOwnProperty(filter))
                        resolve(films.filter(filters[filter].filterFunction));
                  else  // if an invalid filter is specified, all the films are returned.
                        resolve(films);
                }
            });
        });
    };

 /**
     * This function adds a new film in the database.
     * The film id is added automatically by the DB, and it is returned as this.lastID.
     */
this.addFilm = (film) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO films(title, isFavorite, rating,watchdate,userId) VALUES (?,?,?,?,?)';
    /*controlli */
    const watchDate = film.watchDate ? film.watchDate.format("YYYY-MM-DD") : null;
            let rating;
            if (!film.rating || film.rating < 1 || film.rating > 5)
                rating = null;
            else
                rating = film.rating;
    db.run(sql, [film.title, film.isFavorite,rating,watchDate,film.userId], function(err) {
      if (err)
        reject(err);
      
      film.id = this.lastID;
      resolve(film)
    });
  });
}

// In dao.mjs
this.updateFilm = (id, film) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE films SET title = ?, isFavorite = ?, rating = ?, watchDate = ? WHERE id = ?';
    
    // ... gestione date e rating ...
    const watchDate = film.watchDate ? dayjs(film.watchDate).format("YYYY-MM-DD") : null;
    const rating = (film.rating && film.rating >= 1 && film.rating <= 5) ? film.rating : null;

    // CORREZIONE QUI SOTTO:
    // Devi usare film.favorite, NON film.isFavorite
    const favorite = film.favorite ? 1 : 0; 

    db.run(sql, [film.title, favorite, rating, watchDate, id], function(err) {
      if (err) {
        reject(err);
        return; 
      }
      if (this.changes !== 1) {
                resolve({ error: 'Film not found.' });
            } else {
                resolve(film);
            }
    });
  });
}

this.deleteFilm =(id)=>{

return new Promise((resolve, reject) => {
   const sql = 'DELETE FROM films WHERE id = ?';
   
    db.run(sql, [id], function(err) {
      if (err)
        reject(err);
     else {
       resolve(this.changes);//mi ritorna quanti record sono stati effettivamente eliminati
                }
    });
  });

  


}



}