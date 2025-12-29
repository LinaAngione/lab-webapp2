import 'bootstrap-icons/font/bootstrap-icons.css';
import { Form, Alert, Button } from "react-bootstrap";
import dayjs from 'dayjs';
import { useActionState } from 'react';
import { use } from 'react';
import { useParams, useNavigate, Link } from 'react-router';

export function EditAnswerForm(props) {
  // 1. metodo con i useParams
  const params = useParams();
  const aId = params.answerId;

  // trovo la risposta da modificare
  const answer = props.answers.filter(ans => ans.id == aId)[0];

  /*
  // 2. metodo con useLocation
  const location = useLocation();
  const answer = location.state;
  // back to dayjs
  answer.date = dayjs(answer.date);
  */
 
  if(answer)
    return <AnswerForm answer={answer} editAnswer={props.editAnswer} />
  else {
    return (
      <Row>
        <Col as="p" className="lead">Impossible to edit an non-existent answer!</Col>
      </Row> 
    );
  }
  }


export function AnswerForm(props) {
    //1.metodo
    const { questionId } = useParams();//ci da direttamente l id della domanda
    const navigate = useNavigate();
    
    const intialState = {
        text: props.answer?.text,
        email: props.answer?.email,
        date: props.answer?.date.format("YYYY-MM-DD") ?? dayjs().format("YYYY-MM-DD")
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

        if (props.editAnswer) {
            props.editAnswer({id: props.answer.id, ...answer});
        }
        else
            props.addAnswer(answer)

        //ritorno lo stato del form
        navigate(`/questions/${questionId}`);

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
                <Link className="btn btn-danger" to={`/questions/${questionId}`}> Cancel </Link>
            </Form> </>
    );
}

//{""} serve per mettere uno spazio tra i due bottoni in react