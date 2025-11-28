//import
import express from 'express';
import morgan from 'morgan';
import {check, validationResult} from 'express-validator'; // validation middleware
import FilmDao from "./dao.mjs";
import Film from "./Film.mjs";

const filmDao = new FilmDao();

//init server
const app=express();
const port= 3001;

//midlleware da attivzre
app.use(express.json());
app.use(morgan('dev'));
// Funzione helper per validazione
const onValidationErrors = (validationResult, res) => {
  const errors = validationResult.array();
  return res.status(422).json({ errors: errors });
};
const filmValidation = [
    check('title').isString().notEmpty(),
    check('favorite').isBoolean().optional(),
    check('watchDate').optional({nullable: true}).isISO8601({strict: true}).toDate(),  // valid ISO date, without time
    check('rating').optional({nullable: true}).isInt({min: 1, max: 5}),
];

/*Routes*/
// 1. Retrieve the list of all the available films.
// GET /api/films
// This route returns the FilmLibrary. It handles also "filter=?" query parameter
app.get('/api/films',
    (req, res) => {

      const filterValue = req.query.filter || null;
        // get films that match optional filter in the query
        filmDao.getFilms(filterValue)
            // NOTE: "invalid dates" (i.e., missing dates) are set to null during JSON serialization
            .then(films => res.json(films))
            .catch((err) => res.status(500).json(err)); // always return a json and an error message
    }
);

// 2. Retrieve a film, given its "id".
// GET /api/films/<id>
//ritorna una promise quindi possiamo fara o con un .dev o con un async
// Given a film id, this route returns the associated film from the library.
app.get('/api/films/:id', async(request,response)=>{
  try{
  const result =await filmDao.getFilm(request.params.id);
  if(result.error){
    response.status(404).json({ error: "Film not found" });
  }
  else{
    response.json(result);
  }}
  catch{
    response.status(500).end();
  }
});
//3. Create a new film, by providing all relevant information.
// POST /api/films
// This route adds a new film to film library. 
// The film can be created even specifying only its "title".
app.post('/api/films',
  filmValidation,
  async(req,res)=>{
  const invalidFields = validationResult(req);//recupera il risultato
  //è una funzione fornita dalla libreria express-validator e serve a raccogliere i risultati e gli errori
if (!invalidFields.isEmpty()) { // Se NON è vuoto (cioè ci sono errori)
return onValidationErrors(invalidFields, res); // Gestisce gli errori
}

const favorite = req.body.favorite ? req.body.favorite : false;
const watchDate = req.body.watchDate ? req.body.watchDate : null;
const rating = req.body.rating ? req.body.rating : null;
const film = new Film(undefined, req.body.title, favorite, watchDate, rating, req.body.userId);


 try {
    const result = await filmDao.addFilm(film); 
    // NOTE: addFilm returns the new created object
    res.json(result);
  } catch (err) {
      res.status(503).json({error: `Database error during the creation of new film: ${err}`});
  }


});

// 4. Update an existing film, by providing all the relevant information
// PUT /api/films/<id>
// This route allows to modify a film, specifying its id and the necessary data.
app.put('/api/films/:id',filmValidation,
  async(req,res)=>{
    const invalidFields =validationResult(req);
    
    if(!invalidFields.isEmpty()){
      return onValidationErrors(invalidFields,res);
    }
  const film = new Film(Number(req.params.id), req.body.title, req.body.favorite, req.body.watchDate, req.body.rating, req.body.userId);

    try{
      const result = await filmDao.updateFilm(film.id,film);
      if(result.error)
        res.status(404).json(result);
      else
        res.json(result);
    }
    catch(err){
      res.status(503).json({error: `Database error during the update of film ${req.params.id}: ${err}`});
    }
});

// 5. Mark an existing film as favorite/unfavorite
// PUT /api/films/<id>/favorite 
// This route changes only the favorite value. It could also be a PATCH.
app.put('/api/films/:id/favorite',[check('favorite').isBoolean()], async(req,res)=>{

  const invalidFields= validationResult(req);
  if (!invalidFields.isEmpty()) {
    return onValidationErrors(invalidFields, res);
  }

  try{
    const film =await filmDao.getFilm(req.params.id);
    if(film.error)
      return res.status(404).json(film);

    film.favorite=req.body.favorite; //update favorite propriety
    const result=await filmDao.updateFilm(film.id,film);
    
    return  res.json(result);
  }
  catch(err){
        res.status(503).json({ error: `Database error during the favorite update: ${err}` });
  }
}


);

// 6. Update the rating of a specific film
// PUT /api/films/<id>/rating 
// This route changes only the rating value. It could also be a PATCH.
app.put('/api/films/:id/rating', [
  check('rating').optional({nullable:true}).isInt({min:1, max: 5}),
], async (req,res)=>{
  const invalidFields = validationResult(req);
  if (!invalidFields.isEmpty()) {
    return onValidationErrors(invalidFields, res);
  }

  try{
    const film =await filmDao.getFilm(req.params.id);
    if(film.error)
      return res.status(404).json(film);

    film.rating=req.body.rating || null;
    const result=await filmDao.updateFilm(film.id,film);
    if(result.error)
      res.status(404).json(result);
    else
      res.json(result);

  }
  catch (err){
    res.status(503).json({error: `Database error during the rating update of film ${req.params.id}`});
  } 

});

// 7. Delete an existing film, given its “id”
// DELETE /api/films/<id>
// Given a film id, this route deletes the associated film from the library.
app.delete('/api/films/:id', async (req, res) => { // Usa req, res standard
  try {
    await filmDao.deleteFilm(req.params.id);
    res.status(200).end();
  } catch (err) { // Aggiungi (err)
    res.status(500).json({ error: `Database error during the deletion of film ${req.params.id}: ${err}` });
  }
});

//attiviamo il server
//start the server
app.listen(port,()=> {console.log('Api server started ...')});

