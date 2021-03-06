import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Explore() {
  return (
    <div>
      <Header pageTitle="Explorar" />
      <Link to="/explorar/comidas">
        <button type="button" data-testid="explore-food">
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button type="button" data-testid="explore-drinks">
          Explorar Bebidas
        </button>
      </Link>
      <Footer />
    </div>);
}

export default Explore;
