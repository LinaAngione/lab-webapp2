import { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, Button, Collapse} from 'react-bootstrap';
import {Film } from './Film.mjs';
import NavFilm from './components/NavFilm';
import Sidebar from './components/FilterFilm';
import FilmList from './components/FilmList';  
import FilterFilm from './components/FilterFilm';

// This data structure emulates a database of movies. In the future these data will be retrieved from the server.
const INITIAL_FILMS = [
    new Film(1, "Pulp Fiction", true, "2024-03-10", 5),
    new Film(2, "21 Grams", true, "2024-03-17", 5),
    new Film(3, "Star Wars", false),
    new Film(4, "The Matrix", true),
    new Film(5, "Shrek", false, "2024-04-20", 3)
];


function App() {

    return(
        <div className="min-vh-100 d-flex flex-column">
        <NavFilm />
        <Container fluid className="flex-grow-1 d-flex flex-column">
            <Row calssName="flex-grow-1">
                <Collapse id="films-filters" /*in={isSidebarExpanded}*/ className="col-md-3 bg-light d-md-block">
                        <div className="py-4">
                            <h5 className="mb-3">Filters</h5>
                            <FilterFilm />
                        </div>
                </Collapse>
                <Col md={9} className="pt-3">
                <h1><span id="filter-title">All</span> films</h1>
                    <FilmList films={INITIAL_FILMS} />
                </Col>
            </Row>
            <Button variant="primary" className="rounded-circle fixed-right-bottom">
                <i class="bi bi-plus"></i>
            </Button>
        </Container>
        </div>
    )
  
}

export default App