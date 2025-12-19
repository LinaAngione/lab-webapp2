import {Col,Row,Table,Button} from "react-bootstrap";
import 'bootstrap-icons'

function Answer(props){
    return
    (<>
    <Row>
        <Col as='h2'>
        Answers:
        
        </Col>

    </Row>
    <Row>
        <Col lg='10' calssName="mx-auto">
            <AnswerTable> answer= </AnswerTable>
        
        </Col>

    </Row>
    </>);
}

export default Answer;

function AnswerTable(props){
    return(<>
        <Table striped>
            <thread> </thread>
            <tbody>
                {props.answer.map((ans)=> <>
                
                </>)}
            </tbody>
        </Table>
    </>)
}

function AnserRow(props){
    return (<tr>

        <AnswerInfo answer={props.answer}/>
        <AnswerActions />

    </tr>)
}

function AnswerInfo(props){
    <td>{props.answer.date.format("YYYY-MM-DD")}</td>
}

function AnswerAction(){
    return(
        <td>
            <Button variant='warning'>
                <i className="bi bi"></i>

            </Button>

        </td>
    )
}