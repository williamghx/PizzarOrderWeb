import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Admin from './Components/Admin';
import Stores from './Components/Stores';
import Menu from "./Components/Menu";
import MenuManagement from './Components/MenuManagement';


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
            <Route path='/:storeId' element={<Menu />} />
          </Route>
          <Route path='/Admin' element={<Admin />} >
            <Route path='/Admin/:storeId' element={<MenuManagement />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
