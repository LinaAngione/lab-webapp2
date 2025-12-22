import 'dayjs';
import {Col, Row, Button} from 'react-bootstrap/';
import {Film} from '../Film.mjs';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import { useState } from 'react';

function FilmList(props) {
    const {films} = props;

    const [editableFilm, setEditableFilm] = useState();

    

    return (<ListGroup id="films-list" variant="flush">
        {films.map((film) => <FilmInList filmData={film} key={film.id} setShowForm={props.setShowForm} setEditableFilm={props.setEditableFilm} deleteFilm={props.deleteFilm}/>)}
        
    </ListGroup>);

}

FilmList.propTypes = {
    films: PropTypes.array.isRequired,
};

function FilmInList({filmData, setShowForm, setEditableFilm, deleteFilm}) {

    const handleEdit=(film)=>{
    setShowForm(true);
    setEditableFilm(film);
    }
   

    return (<ListGroupItem>
        <Row className="gy-2">
            <Col xs={6} xl={3} className="favorite-title d-flex gap-2 align-items-center">
                {filmData.title}
                <div className="d-xl-none actions">
                    <i className="bi bi-pencil"></i>
                    <i className="bi bi-trash"></i>
                </div>
            </Col>
            <Col xs={6} xl={3} className="text-end text-xl-center">
            <span className="custom-control custom-checkbox">
              <span className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" defaultChecked={filmData.favorite}/>
                          <label className="custom-control-label">Favorite</label>
                        </span>
            </span>
            </Col>

            <Col xs={4} xl={3} className="text-xl-center">
                {filmData.formatWatchDate()}
            </Col>

            <Col xs={8} xl={3} className="actions-container text-end">
                <div className="rating">
                    <Rating rating={filmData.rating} maxStars={5}/>
                </div>
                
                <div className="d-none d-xl-flex actions">
                    <Button
                     onClick={()=>handleEdit(filmData)}>
                    <i className="bi bi-pencil"></i>   
                    
                    </Button>                    
                    <Button onClick={()=>deleteFilm(filmData.id)} ><i className="bi bi-trash"></i>  </Button>
                </div>
            </Col>

        </Row></ListGroupItem>);
}

FilmInList.propTypes = {
    filmData: PropTypes.object.isRequired,
};

function Rating({maxStars, rating}) {
    return [...Array(maxStars)].map(
        (el, index) => <i key={index} className={(index < rating) ? "bi bi-star-fill" : "bi bi-star"}/>);
}

Rating.propTypes = {
    maxStars: PropTypes.number.isRequired,
};
export {Rating};

export default FilmList;