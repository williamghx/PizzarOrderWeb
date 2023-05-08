import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Menu from './Components/Menu';
import Admin from './Components/Admin';
function App() {
  return (
    <>
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
          <Route path='/'/>
            <Route path="/Menu" element={<Menu />} />
          <Route path='/Admin' element={<Admin />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
