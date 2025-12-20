//importo il css
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import {Question} from './QAModels.mjs'
import NavHeader from './NavHeader';
import QuestionDescription from './QuestionDescription';

const fakeQuestion = new Question(1, "Is JavaScript better than Python?", "luigi.derussis@polito.it", 1, "2025-02-28");
fakeQuestion.init();
const fakeAnswers = fakeQuestion.getAnswers();
/* componenti da fare della pagina
-Navbar
-Question
  -text
  -Author
-Risposte
  -Tabella
    -Answer
      -Action
      -Info
-Footer
 */

function App() {

  return (
   <>
    <NavHeader numQuestion={fakeQuestion.id}/>
    <QuestionDescription question={fakeQuestion} />
    <Answers answers={fakeAnswers} />
   </>
  )
}

export default App
