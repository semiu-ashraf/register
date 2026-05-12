import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import './responsive.css'
import './App.css'
import Register from './components/Register';
import Login from './components/Login';
import Track from './components/Track';
import { UserContext } from './contexts/UserContext';
import Private from './components/Private';
import New from './components/new';


// export const MainContext = createContext();

function App() 
{

  let [userLogged, setuserLogged] = useState(JSON.parse(localStorage.getItem("nutrify-user")))

  
  return (
    <>
      <UserContext.Provider value={{userLogged,setuserLogged}}>

        <Router>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='*' element={<Login/>}/>
            <Route path='/new' element={<Private element={New}/>} />
            <Route path='/track' element={<Private element={Track}/>} />           
          </Routes>

        </Router>

      </UserContext.Provider>
      
    </>
  )
}

export default App