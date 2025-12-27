import { Button, Container, Navbar } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';


function NavHeader () {  
  const[darkMode,setDarkMode]=useState(false);

  useEffect(()=>{
    //se DarkMode===true, aggiungiamo data-bs-theme al tag html
    if(darkMode===true)
      document.documentElement.setAttribute("data-bs-theme","dark");
    //altrimenti, rimuoviamo data-bs-theme
    else
      document.documentElement.removeAttribute("data-bs-theme");
  },[darkMode])
  return(
    <Navbar bg='primary' data-bs-theme='dark'>
      <Container fluid>
        <Link to="\" className="navbar-brand" >HeapOverrun </Link>
        <Button onClick={()=>setDarkMode(oldMode=>!oldMode)}>
          {darkMode ? <i className="bi bi-sun-fill"/> : <i className='bi bi-moon-fill'></i>}
        </Button>
      </Container>
    </Navbar>
  );
}

export default NavHeader;