import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.js';
import ProdutoList from './pages/ProdutosList.js';
import Detalhes from './pages/Detalhes.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/produtos" element={<ProdutoList/>} />
        <Route path="/produtos/:id" element={<Detalhes/>} />
      </Routes>
    </Router>
  );
}

export default App;
