import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Food from './Pages/Food';
import Drinks from './Pages/Drinks';
import Explore from './Pages/Explore';
import ExploreDrinks from './Pages/ExploreDrinks';
import ExploreFood from './Pages/ExploreFood';
import ExploreFoodIngredients from './Pages/ExploreFoodIngredients';
import ExploreDrinkIngredients from './Pages/ExploreDrinkIngredients';
import ExploreFoodOrigin from './Pages/ExploreFoodOrigin';
import Profile from './Pages/Profile';
import MadeRecipes from './Pages/MadeRecipes';
import FavoritesRecipes from './Pages/FavoritesRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Food } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/comidas/:id-da-receita" />
      <Route path="/bebidas/:id-da-receita" />
      <Route path="/comidas/:id-da-receita/in-progress" />
      <Route path="/bebidas/:id-da-receita/in-progress" />
      <Route path="/explorar/comidas/ingredientes" component={ ExploreFoodIngredients } />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinkIngredients }
      />
      <Route path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route path="/explorar/comidas/area" component={ ExploreFoodOrigin } />
      <Route path="/explorar/comidas" component={ ExploreFood } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ MadeRecipes } />
      <Route path="/receitas-favoritas" component={ FavoritesRecipes } />
    </Switch>
  );
}

export default App;
