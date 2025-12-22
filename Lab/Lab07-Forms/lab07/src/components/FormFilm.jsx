import { Form, Button, Col } from 'react-bootstrap';
import { useActionState } from 'react';
import { Alert } from 'react-bootstrap';
import { Rating } from './FilmList';
import dayjs from 'dayjs';

function FormFilm(props) {

    const initialState = {
        title: props.film?.title,
        favorite: props.film?.favorite ?? false,
        watchDate: props.film?.watchDate ?? dayjs(),
        rating: props.film?.rating ?? 0
    };
    const handleSubmit = async (prevState, formData) => {

        const film = Object.fromEntries(formData.entries());

        // esempio di validazione
        if (film.title.trim() === "") {
            film.error = "The film can't be empty, please fix it!";
            return film;
        }

        // Watch date validation: watch date should not be in the future
        console.log(dayjs.format);
        if (dayjs(film.watchDate).isAfter(dayjs())) {
            validationErrors.date = 'Watch date cannot be in the future!';
            return film;
        }

        // Rating validation: rating should be between 0 and 5
        if (film.rating < 0 || film.rating  > 5) {
            validationErrors.rating = 'Rating should be between 0 and 5!';
            return film;
        }

        if (props.film) {
            film.id = props.film.id;
            props.editFilm(film);
        }
        else
            props.addFilm(film);

        //ritorno lo stato del form
        return initialState;

    }
    const [state, formAction] = useActionState(handleSubmit, initialState);

    return (
        <>
            {state.error && <Alert variant="secondary">{state.error}</Alert>}
            <Form action={formAction}>
                <Form.Group className="mb-3" controlId="filmText">
                    <Form.Label>Text</Form.Label>
                    <Form.Control name="title" type="text" required={true} minLength={2} defaultValue={state.title}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control name="rating" type="number" min="0" max="5" defaultValue={state.rating} />

                    <Rating rating={state.rating} maxStars={5} />

                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>isFavorite</Form.Label>
                    <Form.Control name="favorite" type="checkbox" defaultChecked={state.favorite}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control name="watchDate" type="date" required={true} defaultValue={state.watchDate}>
                    </Form.Control>
                </Form.Group>
                {props.addFilm && < Button variant="primary" type="submit" >Add</Button>}
                {""}
                <Button variant="danger" onClick={props.cancel}>Cancel</Button>
            </Form>

        </>
    );

}

export default FormFilm;