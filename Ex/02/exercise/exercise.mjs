import dayjs from 'dayjs';


//constructor Answer

function Answer(response,username,score,date){

    this.response=response;
    this.username=username;
    this.score=score;
    this.date=dayjs(date);
      
    this.toString = () => {
    return `${this.username} replied ${this.response} on ${this.date.format('YYYY-MM-DD')} and got a score of ${this.score}`;
  }

}

//constructor Question
function Question(text,username,date){
    this.text=text;
    this.username=username;
    this.date=date;
    this.answer=[];

    this.add=(answer) => {

        this.answer.push(answer);

    }

    this.find=(username) =>{
       /* const listans=[];
        for(const a of this.answer) {
            if(a.username===username){
                listans.push(a);
            }
        }
        return a;*/

        return this.answer.filter(a => a.username === username);

    }

    this.afterDate=(date)=>{
        return this.answer.filter(a => a.date===date);
    }

    this.listByDate=()=>{
        return [...this.answer].sort((a,b) => (a.date.isAfter(b.date))?1 : -1);
    }

    this.listByScore=()=>{
        return [...this.answer].sort((a,b)=>b.score - a.score);

    }
}
const question = new Question('Is JavaScript better than Python?', 'luigidr', '2025-02-28',1);
const firstAnswer=new Answer('Yes','stef','2025-03-03',-10);
const secondAnswer = new Answer('Not in a million year', 'guidovanrossum', '2025-03-02', 5);
const thirdAnswer = new Answer('No', 'alessiog', '2025-03-03');
const fourthAnswer = new Answer('Then, I don\'t know', 'stefanoz', '2025-03-04');

question.add(firstAnswer);
question.add(secondAnswer);
question.add(thirdAnswer);
question.add(fourthAnswer);

const answerByStef= question.find("stefanoz");

console.log(question);
console.log("Answers by Stefano: " + answerByStef); // concatena stringhe => chiama il toString() di Answer
console.log("\nBy date: " + question.listByDate());
console.log("\nBy score: " + question.listByScore());