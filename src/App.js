import React from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Ex1 from './pages/Ex1';
import Ex2 from './pages/Ex2';
import Ex3 from './pages/Ex3';
import Ex4 from './pages/Ex4';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <div>
          <ul>
            <li>
              <Link to="/ex1">1.Задача 1.2</Link>
            </li>
            <li>
              <Link to="/ex2">2.Задача 2.2</Link>
            </li>
            <li>
              <Link to="/ex3">3.Задача 3.2</Link>
            </li>
            <li>
              <Link to="/ex4">4.Задача 4.3</Link>
            </li>
          </ul>
          <hr />
        </div>
        <Routes>
          <Route path="/ex1" element={<Ex1 />} />
          <Route path="/ex2" element={<Ex2 />} />
          <Route path="/ex3" element={<Ex3 />} />
          <Route path="/ex4" element={<Ex4 />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

function Home() {
  return (<></>);
}

export default App;
