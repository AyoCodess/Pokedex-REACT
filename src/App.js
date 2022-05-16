import './App.css';
import PaginatedItems from './components/PaginatedItems';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';

function App() {
  return (
    <>
      <Header />
      <PaginatedItems itemsPerPage={5} />
      <Footer />
    </>
  );
}

export default App;
