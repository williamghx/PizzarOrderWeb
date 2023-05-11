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
  // const { token, expiry, setToken, setExpiry } = useAuth();
  // const { stores, selectedStore, setStores, setSelectedStore } = useStores();

    // const loadData = useCallback(async() => {
    //     let stores;
    //     if(token === null){
    //         let tokenRes = await (await GetToken()).json();
    //         setToken(tokenRes.token);

    //         stores = await (await GetStores(tokenRes.token)).json();
    //     }
    //     else{
    //         stores = await (await GetStores(token)).json();
    //     }
    //     console.log(stores);
    //     setStores(stores);
        
    // }, []);

    // useEffect(() => {
    //     loadData().catch(console.error);
    // }, [loadData]);

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
