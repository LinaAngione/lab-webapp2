
//import
import express from 'express';
import morgan from 'morgan';
import { getQuestion} from './dao.mjs'

//init server
const app=express();
const port= 3001;

//midlleware da attivzre
app.use(express.json());
app.use(morgan('dev'));

/*Routes*/

//GET /api/question/<id>
//ritorna una promise quindi possiamo fara o con un .dev o con un async
app.get('/api/question/:id', async (request,response)=>{
  try{
  const question =await getQuestion(request.params.id);
  if(question.error){
    response.status(404).json(question);
  }
  else{
    response.json(quesiton);
  }}
  catch{
    response.status(500).end();
  }
});

//attiviamo il server
//start the server
app.listen(port,()=> {console.log('Api server started ...')});



