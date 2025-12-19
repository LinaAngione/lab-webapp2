import { Col, Row } from 'react-bootstrap';
function QuestionDescription(props){

    return(
        <> 
            <Row>
                <Col md={6}>
                    <QuestionText numQuestion={props.question.id} text={props.question.text}></QuestionText>
                </Col>
                    <QuestionAuthor author={props.question.email}></QuestionAuthor>
                <Col md={6}></Col>
            </Row>
        </>
    );

}

export default QuestionDescription;

function QuestionText(props){
    <>
        <Row>
            <Col as='p'>
                <strong>
                    Question #{props.numQuestion.id}
                </strong>
            </Col>
        </Row>
        <Row>
            <Col as='p'>
                {props.numQuestion.text}
            </Col>
        </Row>
    </>
}
function QuestionAuthor(props)
{
    return(
        <Row>
            <Col as='p' className='text-end'>
                {props.author}
            </Col>
        </Row>
    )
}
