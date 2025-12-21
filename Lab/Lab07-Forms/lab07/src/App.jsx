import { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Collapse } from 'react-bootstrap';
import { Film } from './Film.mjs';
import NavFilm from './components/NavFilm';
import FilmList from './components/FilmList';
import FilterFilm from './components/FilterFilm';
import FormFilm from './components/FormFilm';
import dayjs from 'dayjs';

// This data structure emulates a database of movies. In the future these data will be retrieved from the server.
const INITIAL_FILMS = [
    new Film(1, "Pulp Fiction", true, "2024-03-10", 5),
    new Film(2, "21 Grams", true, "2024-03-17", 5),
    new Film(3, "Star Wars", false),
    new Film(4, "The Matrix", true),
    new Film(5, "Shrek", false, "2024-04-20", 3)
];


function App() {

    const filters = {
        'filter-all': { label: 'All', id: 'filter-all', filterFunction: () => true },
        'filter-favorite': { label: 'Favorites', id: 'filter-favorite', filterFunction: film => film.favorite },
        'filter-best': { label: 'Best Rated', id: 'filter-best', filterFunction: film => film.rating >= 5 },
        'filter-lastmonth': {
            label: 'Seen Last Month',
            id: 'filter-lastmonth',
            filterFunction: film => {
                if (!film?.watchDate) return false;
                const diff = film.watchDate.diff(dayjs(), 'month');
                return diff <= 0 && diff > -1;
            }
        },
        'filter-unseen': { label: 'Unseen', id: 'filter-unseen', filterFunction: film => !film?.watchDate }
    };


    let [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    // 2. Stato per sapere qual è il filtro attivo (default 'all')
    const [activeFilter, setActiveFilter] = useState('filter-all');

  
    const [films, setFilms] = useState(INITIAL_FILMS);
    const [showForm, setShowForm] = useState(false);
  // 3. CALCOLO DEI FILM DA VISUALIZZARE (Stato Derivato)
    // Ogni volta che cambia 'films' o 'activeFilter', questa variabile si aggiorna
    const visibleFilms = films.filter(filters[activeFilter].filterFunction);

   
const addFilm = (film) => {
    setFilms((oldFilms) => {
        // Calcola un nuovo ID (es. massimo ID attuale + 1)
        const newId = Math.max(...oldFilms.map(f => f.id)) + 1;
        //WRONG const newFilm = { ...film, id: newId };
        // Aggiunge il nuovo film alla lista
         // 2. Crea una NUOVA ISTANZA della classe Film
        // Assicurati che l'ordine dei parametri corrisponda al costruttore in Film.mjs
        // Solitamente: (id, title, favorite, watchDate, rating)
        const newFilm = new Film(
            newId, 
            film.title, 
            film.favorite, 
            film.watchDate, 
            film.rating
        );
        return [...oldFilms, newFilm];
    });
};

    return (
        <div className="min-vh-100 d-flex flex-column">
            <NavFilm sidebarExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded} />
            <Container fluid className="flex-grow-1 d-flex flex-column">
                <Row className="flex-grow-1">
                    <Collapse id="films-filters" in={isSidebarExpanded} className="col-md-3 bg-light d-md-block">
                        <div className="py-4">
                            <h5 className="mb-3">Filters</h5>
                            <FilterFilm items={filters} selected={activeFilter} setFilter={setActiveFilter} />
                        </div>
                    </Collapse>
                    <Col md={9} className="pt-3">
                        <h1><span id="filter-title"> {filters[activeFilter].label}  </span> films </h1>
                        <FilmList films={visibleFilms}  />
                    </Col>
                </Row>
               {showForm ? (
        <FormFilm addFilm={addFilm} cancel={() => setShowForm(false)} />
      ) : ( <Button variant="primary" className="rounded-circle fixed-right-bottom" 
                onClick={() => setShowForm(true)}
                  >
                    <i className="bi bi-plus"></i>
                </Button>)}
            </Container>
        </div>
    )

}

export default App