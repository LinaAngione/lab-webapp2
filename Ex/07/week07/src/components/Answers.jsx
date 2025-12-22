import "bootstrap-icons/font/bootstrap-icons.css";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useState } from "react";
import AnswerForm from "./AnswerForm";

function Answers(props) {

  //lo mettiamo qua questo stato per visualizzare o no il bottone perchè riguarda la visualizzazione
  const [mode, setMode] = useState("view"); //view | add | edit

  const [editableAnswer, setEditableAnswer] = useState();

  const handleEdit=(answer)=>{
    setEditableAnswer(answer);
    setMode("edit");
  }
  return (
    <>
      <Row>
        <Col as="h2">Answers:</Col>
      </Row>
      <Row>
        <Col lg={10} className="mx-auto">
          <AnswerTable answers={props.answers} voteUp={props.voteUp} handleEdit={handleEdit} deleteAnswer={props.deleteAnswer}/>
          {mode==="view" && <Button variant="primary" onClick={()=>
            setMode("add")}>Add</Button>}
         { mode === "add" && <AnswerForm addAnswer={(answer) => {props.addAnswer(answer); setMode("view");}} cancel={() => setMode("view")}/>}
         { mode === "edit" && <AnswerForm key={editableAnswer.id} answer={editableAnswer} editAnswer={(answer) => {props.editAnswer(answer); setMode("view");}} cancel={() => setMode("view")} />}
        </Col>
      </Row>
    </>
  );
}
//react non si accorge che cambia l'answer da editare se non gli diciamo di ricreare il componente da zero
//la mkey serve per dire a react che l'oggetto è diverso da quello di prima
//la key in edit viene messa in modo che react non si confonda quando cambia l'answer da editare s epremo sulla prima sarà la prima ad essere modificata
// se non c'è la key react pensa che sia lo stesso componente e non lo ricrea da zero
//in questo modo invece lo ricrea da zero
//così prende il nuovo answer da editare vedi registrazione per chiarimenti

function AnswerTable(props) {
  const [sortOrder, setSortOrder] = useState("none");

  const sortedAnswers = [...props.answers];
  if(sortOrder === "asc")
    sortedAnswers.sort((a,b) => a.score - b.score);
  else if (sortOrder == "desc")
    sortedAnswers.sort((a,b) => b.score - a.score);

  const sortByScore = () => {
    setSortOrder(oldOrder => oldOrder === "asc" ? "desc" : "asc");
  }
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>text</th>
          <th>Author</th>
         <th>Score <Button variant="link" className="text-black" onClick={sortByScore}><i className={sortOrder ==="asc" ? "bi bi-sort-numeric-up" : "bi bi-sort-numeric-down"}></i></Button></th>
      
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.answers.map((ans) => <AnswerRow key={ans.id} answer={ans} voteUp={props.voteUp} handleEdit={props.handleEdit} deleteAnswer={props.deleteAnswer}/>)}
      </tbody>
    </Table>
  );
}
//la key va messa qui nel row perchè è l'elemento della lista
//serve per react per tenere traccia degli elementi della lista
//in modo che se uno viene modificato o eliminato lui sa quale è e non si confonde

function AnswerRow(props) {
  return (
    <tr>
      <AnswerData answer={props.answer} />
      <AnswerAction {...props} />
    </tr>
  );
}

function AnswerData(props) {
  return (
    <>
      <td>{props.answer.date.format("YYYY-MM-DD")}</td>
      <td>{props.answer.text}</td>
      <td>{props.answer.email}</td>
      <td>{props.answer.score}</td>
    </>
  );
}

function AnswerAction(props) {
  return (
    <td>
      <Button variant="warning" onClick={() => props.voteUp(props.answer.id)} >
        <i className="bi bi-arrow-up" /></Button>
      <Button variant="primary" className="mx-1" onClick={()=>props.handleEdit(props.answer)}><i className="bi bi-pencil-square" /></Button>
      <Button variant="danger"><i className="bi bi-trash" onClick={() => props.deleteAnswer(props.answer.id)} /></Button>
    </td>
  );
}

export default Answers;