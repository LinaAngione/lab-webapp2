import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from 'react-bootstrap';
import NavHeader from './NavHeader';
import QuestionDescription from './QuestionDescription';
import Answer from './Answers';
import { Question } from './QAModels.mjs';
import { useState, useEffect } from 'react';

function App() {
    const [question, setQuestion] = useState(null);

}

export default App;