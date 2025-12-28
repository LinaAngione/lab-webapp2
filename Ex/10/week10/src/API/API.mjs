import { Answer, Question } from "../models/QAModels.mjs";
const SERVER_URL ="http://localhost:3001";
//porta su cui fhunzionava il server express
//tutte le domande
//GET /api/questions

const getQuestions =async () => {
    //facciamo una get al server e aspettiamo che risponda
    const response= await fetch(SERVER_URL + "/api/questions");
    //response avrà un oggetto http, che avrà il body json che dobbiamo prendere
    //await anche qui dobbiamo aspettare resposne
    if(response.ok){
        const questionJson=await response.json();//prende il body della risposta http e genera un oggetto js nella struttura json
        return questionJson.map(q=>new Question(q.id,q.text,q.email,q.userId, q.date));
    }
    else
        throw new Error("Internale server error");    
}

//tutte le risposte data una domanda
//GET /api/questions/<id>/answers

const getAnswers = async (questionId) => {
  const response = await fetch(`${SERVER_URL}/api/questions/${questionId}/answers`);
  if(response.ok) {
    const answersJson = await response.json();
    return answersJson.map(ans => new Answer(ans.id, ans.text, ans.email, ans.userId, ans.date, ans.score));
  }
  else
    throw new Error("Ops, there is an error on the server.");
}

const API = { getAnswers, getQuestions };
export default API;