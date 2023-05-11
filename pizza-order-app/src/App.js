import './App.css';
import { useEffect, useCallback } from "react";
import useAuth from "./Hooks/useAuth";
import useStores from "./Hooks/useStores";
import { GetToken, GetStores } from "./Functions/DataFetch";
import { Link, Route, Routes } from 'react-router-dom';
import Menu from './Components/Menu';
import Admin from './Components/Admin';
import Stores from './Components/Stores';
import Store from "./Components/Store";


function App() {
  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Menu</Link>
          </li>
          <li>
            <Link className="nav-link" to="/Admin">Admin</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Routes>
          <Route path='/' element={<Stores />} >
            <Route path='/:storeId' element={<Store />} />
          </Route>
          <Route path='/Admin' element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
