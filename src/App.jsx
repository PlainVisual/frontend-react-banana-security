import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

function App() {

  const { isAuth } = useContext(AuthContext);

  return (
    <>
      <NavBar />
      <div className="content">
        <Routes>

          <Route 
            exact path="/"
            element={ <Home /> }
          />

          <Route 
            path="/profile"
            element={ 
                <PrivateRoute
                  authenticated={ isAuth }
                >
                  <Profile />
                </PrivateRoute> 
              }
          />

          <Route 
            exact path="/signin"
            element={ <SignIn /> }
          />

          <Route 
            exact path="/signup"
            element={ <SignUp /> }
          />  
        </Routes>
      </div>
    </>
  );
}

export default App;
