import React from 'react';

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import MealsArea from '../Components/MealsArea';

function ExploreFoodOrigin() {
  return (
    <div>
      <Header pageTitle="Explorar Origem" searchBtn />
      <MealsArea />
      <Footer />
    </div>);
}

export default ExploreFoodOrigin;
