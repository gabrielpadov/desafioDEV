// Importantando o React
import React from "react";
// Importantando o component Home
import Home from "./components/home/home";
//importando a pagina de error
import ErrorPage from "./components/error/error_page";
// Importantando o component Task
import Task from "./components/task/task";
// Importando os components necessárias da lib react-materialize
import { Container } from 'react-materialize';
// Importanto o component <Switch /> e <Route /> da nossa Lib de rotas
import { Switch, Route } from 'react-router-dom'

const Main = () => (
  <main>
    <Container>
      <Switch>
        <Route exact path='/home' component={Home}/>
        <Route path='/' component={Task}/>
  		  <Route component={ErrorPage}/>
      </Switch>
    </Container>
  </main>  
);

export default Main;