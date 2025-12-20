import { Col, Row } from 'react-bootstrap';
function QuestionDescription(props){

    return(
        <> 
            <Row>
                <Col md={6}>
                    <QuestionText numQuestion={props.question.id} text={props.question.text} />
                </Col>
                <Col md={6}>
                    <QuestionAuthor label="Asked by" author={props.question.email} />
                </Col>
            </Row>
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
