import { useState } from 'react';
//importo il css
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import { Question, Answer } from './models/QAModels.mjs'
import NavHeader from './components/NavHeader';
import QuestionDescription from './components/QuestionDescription';
import Answers from './components/Answers';
import { Route, Routes } from 'react-router';
import {AnswerForm,EditAnswerForm} from './components/AnswerForm';
import Questions from './components/Questions';
import DefaultLayout from './components/DefaultLayout';
import NotFound from './components/NotFound';

const fakeQuestion = new Question(1, "Is JavaScript better than Python?", "luigi.derussis@polito.it", 1, "2025-02-28");
fakeQuestion.init();
const fakeAnswers = fakeQuestion.getAnswers();

function App() {

  const [questions, setQuestions] = useState([fakeQuestion]);
  const [answers, setAnswers] = useState(fakeAnswers);

  const voteUp = (answerId) => {
    setAnswers(oldAnswers => {
      return oldAnswers.map(answ => {
        if (answ.id === answerId) {
          //ritorno un nuovo oggetto con i voti incrementati
          return new Answer(answ.id, answ.text, answ.email, answ.userId, answ.date, answ.score + 1);
        }
        else
          return answ;

      })
    })
  }
  //questa funzione dobbiamo chiamarla su tasto
  //-------
  //aggiungo una nuova answer
  const addAnswer = (answer) => {
    setAnswers(oldAnswers => {
      // temporaneo
      const newId = Math.max(...oldAnswers.map(ans => ans.id)) + 1;
      const newAnswer = new Answer(newId, answer.text, answer.email, undefined, answer.date);
      return [...oldAnswers, newAnswer];
    });
  }

  //edit
  const editAnswer = (answer) => {
    setAnswers(oldAnswers => {
      return oldAnswers.map(answ => {
        if (answ.id === answer.id) {
          return new Answer(answer.id, answer.text, answer.email, answ.userId, answer.date, answ.score);
        }
        else
          return answ;

      })
    })
  }

  const deleteAnswer = (answerId) => {
    setAnswers(oldAnswers => {
      return oldAnswers.filter((answer) => answer.id !== answerId);
    });
  }

  {/* ROTUES
    -/ => mostra tutte le domande (index) pagina principale
    -/question/:qid => mostra la domanda con id = :id con le sue risposte
    OPZIONE1
    -/question/:qid/answer/new =>nuova risposta
    -/question/:qid/answer/:aid/edit => modifica risposta
    OPZIONE2
    -/question/:qid/answer/new  => nuova risposta --> NON possiamo accorciare perchè poi non sapremmo a quale domanda è associata
    -/answer/:aid/edit => modifica risposta

    - * => pagina non trovata
    
    */}

  return (
    <Routes>
      <Route element={ <DefaultLayout /> } >
        <Route path="/" element={ <Questions questions={questions}/> } />

        <Route path="/questions/:questionId" element={ <QuestionDescription questions={questions} /> } >
          <Route index element={ <Answers answers={answers} voteUp={voteUp} addAnswer={addAnswer} editAnswer={editAnswer} deleteAnswer={deleteAnswer} /> } />
          <Route path="answers/new" element={ <AnswerForm addAnswer={addAnswer}/> } />
          <Route path="answers/:answerId/edit" element={<EditAnswerForm editAnswer={editAnswer} answers={answers}/>} />
        </Route>

        <Route path="*" element={ <NotFound /> } />
      </Route>
    </Routes> 
  )

  //default layout definisce il layout di default da usare per le route
  //se si vuole definire altre route con layout diversi si può fare creandoli fuori
  
//senza outlet il componente figlio non viene renderizzato
}

//creare la route di aggiunta della domanda . avremo /path/new 

export default App
