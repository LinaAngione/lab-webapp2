
//import
import express from 'express';
import morgan from 'morgan';
import { getQuestion} from './dao.mjs'

//init server
const app=express();
const port= 3001;

//midlleware
app.use(express.json());
app.use(morgan('dev'));

/*Routes*/

//GET /api/question/<id>
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


//start the server
app.listen(port,()=> {console.log('Api server started ...')});



