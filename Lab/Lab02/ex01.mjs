import dayjs from "dayjs";
import Film from "./Film.mjs";
import FilmLibrary from "./FilmLibrary.mjs";


function printAll(films){

    films.forEach((film) => console.log(`${film}`));
}

async function main(){

    const filmLibrary=new FilmLibrary();

    try{
        // 1a. get all the films
        console.log('****** All the films: ******');
        const films = await filmLibrary.getAll();
        if (films.length === 0)
            console.log('No films yet, try later.');
        else
            printAll(films);

           // 1b. get all favorite films
           
        console.log('\n****** All favorite films: ******');
        const favoriteFilms = await filmLibrary.getFavorites();
        if (favoriteFilms.length === 0)
            console.log('No favorite films yet, try later.');
        else
            printAll(favoriteFilms);
        // 1c. get films watched today
        console.log('\n****** All films watched today: ******');
        const todayFilms = await filmLibrary.watched();
        if (todayFilms.length === 0)
            console.log('No films watched yet, try later.');
        else
            printAll(todayFilms);
        // 1d. get films before a certain date
        console.log('\n****** All films watched before a certain date: ******');
        const watchDateStr = '2024-03-25';
        const watchDate = dayjs(watchDateStr);
        const earlierFilms = await filmLibrary.getEarlier(watchDate);
        if (earlierFilms.length === 0)
            console.log('No films watched yet earlier, try later.');
        else
            printAll(earlierFilms);
        // 1e. get films with a rating 
        // greater than or equal to given rating
         const rating = 4
        console.log(`\n****** Films with a minimum rating of ${rating}: ******`);
        const ratedAbove = await filmLibrary.getrating(rating);
        if (ratedAbove.length === 0)
            console.log('No films with this rating, yet.');
        else
            printAll(ratedAbove);
        // 1f. get films containing string
         const string = 'war';
        console.log(`\n****** Films with  ${string} in a title: ******`);
        const containingString = await filmLibrary.gettitle(string);
        if (containingString.length === 0)
            console.log('No films with this rating, yet.');
        else
            printAll(containingString);

    }
    catch(error){
        console.error('Impossibile to retrive films!${error}');
        filmLibrary.closeDB();
        return;
    }

    filmLibrary.closeDB();


}
main();
