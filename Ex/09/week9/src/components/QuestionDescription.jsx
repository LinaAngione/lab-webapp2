import { Col, Row } from 'react-bootstrap';
import { useParams, Outlet } from 'react-router';

function QuestionDescription(props){
    
    //const params=useParams(); // ci da tutti i parametri della rotta
    const{ questionId }=useParams();//ci da direttamente l id della domanda
    const question=props.questions[questionId -1]; //-1 perche gli id partono da 1 e gli indici da 0

    // se question non è undefinend renderizzo tutto altrimenti renderizzo domanda non trovata
    return(
            <>
      { question ?
        <> 
            <Row>
                <Col md={6}>
                    <QuestionText numQuestion={question.id} text={question.text} />
                </Col>
                <Col md={6}>
                    <QuestionAuthor label="Asked by" author={question.email} />
                </Col>
            </Row>
                <Outlet />
      </> :
      <Row>
        <Col as="p" className="lead">Domanda non trovata!</Col>
      </Row> }
        </>
    );

}

export default QuestionDescription;

function QuestionText(props){
    return (
        <>
            <Row>
                <Col as='p'>
                    <strong>
                        Question #{props.numQuestion}
                    </strong>
                </Col>
            </Row>
            <Row>
                <Col as='p'>
                    {props.text}
                </Col>
            </Row>
        </>
    );
}
function QuestionAuthor(props)
{
    return(
        <Row>
            <Col as='p' className='text-end'>
                {props.label} {props.author}
            </Col>
        </Row>
    )
}
