import { Container, Navbar } from 'react-bootstrap';

/**
 * Container Serve a mantenere il contenuto (qui Navbar.Brand)
         allineato e con il giusto padding rispetto ai bordi della pagina. 
        Usando fluid la barra occupa l'intera larghezza ma il contenuto mantiene i padding standard.
 */
function NavHeader (props) {  
  return(
    <Navbar bg='primary' data-bs-theme='dark'>
      <Container fluid>
        <Navbar.Brand>HeapOverrun - Question {props.questionNum}</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavHeader;