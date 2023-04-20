import React, { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

// Wij maken hier de context aan. Die wij later in een component kunnen aanroepen
export const AuthContext = createContext({});

// Hier maken wij de provider aan die wij als een schill om app.js gaan plaatsen.
// Hiermee zorgen wij ervoor dat wij de data globaal kunnen doorgeven aan de App component
function AuthContextProvider({ children }) {

  const [ authState, setAuthState ] = useState({
                                                isAuth: false,
                                                email: "",
                                                username: "",
                                                user: null,
                                              })

  const navigate = useNavigate();

  async function logIn(token) {
    
      // localStorage gebruiken wij om de gegeven token in de browser op te slaan.
      localStorage.setItem('token', token);
      //  Wij ontcijferen de token met behulp van jwt_decode
      const decoded = jwt_decode(token);
      // Hierdoor hebben wij toegang tot de ID van de user
      console.log(decoded.sub);

      try {  

      // Via axios.get roepen wij gegevens van de user op. Dit in combinatie met de token waaraan de user wordt herkend 
      const res = await axios.get(`http://localhost:3000/600/users/${ decoded.sub }`, {

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ token }`,
        },

        });

        console.log(res)
      
      // Via destructering halen we de keys op vanuit het object res.data
      const { email, user, username } = res.data;
      // Nu kunnen we een copy van de authState maken via ...spreadoperator 
      setAuthState({ ...authState, 
                          isAuth: true, 
                          email: email, 
                          user: user, 
                          username: username, });
      
      navigate("/profile");

      } catch(e) {
        console.error(e);
      }

  }

  function logOut(token) {
    localStorage.removeItem('token', token);
    setAuthState({  ...authState, isAuth: false, email: "", username: "", user: null,  });
    navigate("/")
  }

  const authentication = {
    isAuth: authState.isAuth,
    email: authState.email,
    username: authState.username,
    logInFunction: logIn,
    logOutFunction: logOut,
  }

  return (

    <AuthContext.Provider value={ authentication } >
      { children }
    </AuthContext.Provider>

  )


}

export default AuthContextProvider;