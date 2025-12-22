import 'bootstrap-icons/font/bootstrap-icons.css';
import { Form, Alert, Button } from "react-bootstrap";
import dayjs from 'dayjs';
import { useActionState } from 'react';
import { use } from 'react';

function AnswerForm(props) {

    const intialState = {
        text: props.answer?.text,
        email: props.answer?.email,
        date: props.answer?.date ?? dayjs()
    };
    //??--> tra due elelementi prendi il primo se è definito altrimenti il secondo
    //?--> se props.answer è definito prendi il campo text altrimenti undefined in questo caso ""
    const handleSubmit = async (prevState, formData) => {

        //senti registrazione per sentire Object cos'è
        const answer = Object.fromEntries(formData.entries());

        // esempio di validazione
        if (answer.text.trim() === "") {
            answer.error = "The answer can't be empty, please fix it!";
            return answer;
        }
        if (props.addAnswer)
            // aggiungo la risposta allo stato in App
            props.addAnswer(answer);
        else
            props.editAnswer({ id: props.answer.id, ...answer });

        //ritorno lo stato del form
        return intialState;

    };

    const [state, formAction] = useActionState(handleSubmit, intialState);

    return (
        <>
            {state.error && <Alert variant="secondary">{state.error}</Alert>}
            <Form action={formAction}>
                <Form.Group className="mb-3" controlId="answerText">
                    <Form.Label>Text</Form.Label>
                    <Form.Control name="text" type="text" required={true} minLength={2} defaultValue={state.text}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" required={true} defaultValue={state.email} >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>date</Form.Label>
                    <Form.Control name="date" type="date" required={true} defaultValue={state.date}>
                    </Form.Control>
                </Form.Group>
                {props.addAnswer && < Button variant="primary" type="submit" >Add</Button>}
                {props.editAnswer && <Button variant="success" type="submit" >Add</Button>}
                {""}
                <Button variant="danger" onClick={props.cancel} >Cancel </Button>
            </Form> </>
    );
}

export default AnswerForm;

//{""} serve per mettere uno spazio tra i due bottoni in react