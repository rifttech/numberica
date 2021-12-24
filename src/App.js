import React from 'react';
import {
  BrowserRouter as Router,
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
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/numberica/ex1">1.Задача 1.2</Link>
            </li>
            <li>
              <Link to="/numberica/ex2">2.Задача 2.2</Link>
            </li>
            <li>
              <Link to="/numberica/ex3">3.Задача 3.2</Link>
            </li>
            <li>
              <Link to="/numberica/ex4">4.Задача 4.3</Link>
            </li>
          </ul>
          <hr />
        </div>
        <Routes>
          <Route path="/numberica/ex1" element={<Ex1 />} />
          <Route path="/numberica/ex2" element={<Ex2 />} />
          <Route path="numberica/ex3" element={<Ex3 />} />
          <Route path="/numberica/ex4" element={<Ex4 />} />
          <Route path="/numberica/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}




function Home() {
  return (<></>);
}


export default App;
