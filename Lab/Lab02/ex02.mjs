import dayjs from "dayjs";
import Film from "./Film.mjs";
import FilmLibrary from "./FilmLibrary.mjs";

async function main() {

    const filmLibrary=new FilmLibrary();

    // a. Store a new movie into the database. 
    // After completion, print a confirmation/failure message.    
    console.log(`\n****** Adding a new movie: ******`);
    let newmovie=new Film(undefined,"Il signore degli anelli2",true,dayjs().toISOString(),4,2);
    try{
       newmovie = await filmLibrary.add(newmovie);
       console.log("New film inserted");
       console.log(newmovie.toString());}
    
    catch(error){  
        console.error(`Impossible to insert a new movie! ${error}`);
    }
    // b. Delete a movie from the database (using its ID as a reference). After completion, print a
    // confirmation/failure message.

     try{
       newmovie = await filmLibrary.deleteFilm(newmovie.id);   ;
       console.log("New film deleted");
       console.log(newmovie.toString());
    }
    catch(error){  
        console.error(`Impossible to delete a new movie! ${error}`);
    }
    // c. Delete the watch date of all films stored in the database. After completion, print a
    // confirmation/failure message
    console.log(`\n****** Resetting all the watch dates: ******`);
    try{
       newmovie = await filmLibrary.resetWhatchedFilms();   ;
       console.log("Watch dates reset!");
    }
    catch(error){  
        console.error(`Impossible to reset watch dates! ${error}`);
    }

    // printing updated movies
    console.log('\n****** All the movies after the updates: ******');
    const updatedFilms = await filmLibrary.getAll();
    if (updatedFilms.length === 0)
        console.log('No movies yet, try later.');
    else
        updatedFilms.forEach((film) => console.log(`${film}`));

    filmLibrary.closeDB();

}

main();