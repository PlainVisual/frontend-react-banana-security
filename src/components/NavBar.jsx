import React from 'react';
import logo from '../assets/banana-01.png';
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

function NavBar() {
  
  const navigate = useNavigate();

  const { isAuth, logOutFunction, user } = useContext(AuthContext);

  // console.log(isAuth);

  return (
    <nav>
        <NavLink to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Banana Security
            </h3>
          </span>
        </NavLink>

      <div>
        { isAuth === false

        ? <>         
        <button
          type="button"
          onClick={() => navigate('/signin')}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => navigate('/signup')}
        >
          Registreren
        </button>
        </>
        :

        <>

        <p>Ingelogd als: { user }</p>

        <button
          type="button"
          onClick={ logOutFunction }
          
        >
          Log out
        </button>

        </>

        }
      </div>
    </nav>
  );
}

export default NavBar;