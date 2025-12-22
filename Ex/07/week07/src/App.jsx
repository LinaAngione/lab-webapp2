import { useState } from 'react';
//importo il css
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import {Question, Answer} from './models/QAModels.mjs'
import NavHeader from './components/NavHeader';
import QuestionDescription from './components/QuestionDescription';
import Answers from './components/Answers';

const fakeQuestion = new Question(1, "Is JavaScript better than Python?", "luigi.derussis@polito.it", 1, "2025-02-28");
fakeQuestion.init();
const fakeAnswers = fakeQuestion.getAnswers();

function App() {

  const [question, setQuestion] = useState(fakeQuestion);
  const [answers, setAnswers] = useState(fakeAnswers);

  const voteUp=(answerId)=>{
    setAnswers(oldAnswers=>{
      return oldAnswers.map(answ=>{
        if(answ.id===answerId){
          //ritorno un nuovo oggetto con i voti incrementati
          return new Answer(answ.id, answ.text, answ.email,answ.userId, answ.date, answ.score+1);
        }
        else  
          return answ;
       
      })
  })}
  //questa funzione dobbiamo chiamarla su tasto
  //-------
  //aggiungo una nuova answer
 const addAnswer = (answer) => {
    setAnswers(oldAnswers => {
      // temporaneo
      const newId = Math.max(... oldAnswers.map(ans => ans.id)) + 1;
      const newAnswer = new Answer(newId, answer.text, answer.email, undefined, answer.date);
      return [...oldAnswers, newAnswer];
    });
  }

  //edit
   const editAnswer=(answer)=>{
    setAnswers(oldAnswers=>{
      return oldAnswers.map(answ=>{
        if(answ.id===answer.id){
          return new Answer(answer.id, answer.text, answer.email,answ.userId, answer.date, answ.score);
        }
        else  
          return answ;
       
      })
  })}

    const deleteAnswer = (answerId) => {
    setAnswers(oldAnswers => {
      return oldAnswers.filter((answer) => answer.id !== answerId); 
    });
  }

  return (
   <>
    <NavHeader numQuestion={question.id}/>
    <QuestionDescription question={question} />
    <Answers answers={answers} voteUp={voteUp} addAnswer={addAnswer} editAnswer={editAnswer} deleteAnswer={deleteAnswer}/>
   </>
  )
}

export default App
