import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" />
      <Route path="/bebidas" />
      <Route path="/comidas/:id-da-receita" />
      <Route path="/bebidas/:id-da-receita" />
      <Route path="/comidas/:id-da-receita/in-progress" />
      <Route path="/bebidas/:id-da-receita/in-progress" />
      <Route path="/explorar" />
      <Route path="/explorar/comidas" />
      <Route path="/explorar/bebidas" />
      <Route path="/explorar/comidas/ingredientes" />
      <Route path="/explorar/bebidas/ingredientes" />
      <Route path="/explorar/comidas/area" />
      <Route path="/perfil" />
      <Route path="/receitas-feitas" />
      <Route path="/receitas-favoritas" />
    </Switch>
  );
}

export default App;
