import React from 'react';
import Banner from '../../components/Banner';
import ListaRestaurantes from '../../components/ListaRestaurantes';
import NavBar from '../../components/NavBar';
import Rodape from '../../components/Rodape';

function App() {
  return (
    <>
      <NavBar />
      <Banner />
      <ListaRestaurantes />
      <Rodape />
    </>
  );
}

export default App;
