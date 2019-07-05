// Importantando o React
import React from "react";
// Importando os components necessárias da lib react-materialize
import { Navbar, Row} from 'react-materialize';
// Importando o Component NavLink da nossa lib de rotas
import { NavLink } from 'react-router-dom'


const Header = () => (
  <Row>  
    <Navbar className="grey darken-2"><a href="/" class="brand-logo right brand-logo">SGT</a>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="task">Task</NavLink></li>
    </Navbar>
  </Row>
);

export default Header;