import './App.css';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './Components/NavBar';
import Admin from './Components/Admin';
import Stores from './Components/Stores';
import Menu from "./Components/Menu";
import MenuManagement from './Components/MenuManagement';
import Login from './Components/Login';
import RequireAuth from './Components/RequireAuth';


function App() {
  return (
    <div>
      <NavBar />
      <ContentWrapper>
        <Routes>
          <Route path='/' element={<Stores />} >
            <Route path='/:storeId' element={<Menu />} />
          </Route>
          <Route path='/Admin' element={<RequireAuth><Admin /></RequireAuth>} >
            <Route path='/Admin/:storeId' element={<RequireAuth><MenuManagement /></RequireAuth>} />
          </Route>
          <Route path='/Login' element={<Login />} />
        </Routes>
      </ContentWrapper>
    </div>
  );
}

export default App;

const ContentWrapper = styled.div`
    margin-top: 100px;
    background-color: var(--mainLightGreen);
    h2, h3, h5 {
        color: var(--mainDarkGreen);
    }
`;
