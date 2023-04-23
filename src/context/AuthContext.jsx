import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import jwtTokenValid from "../helpers/tokenExp";

// Wij maken hier de context aan. Die wij later in een component kunnen aanroepen
export const AuthContext = createContext({});

// Hier maken wij de provider aan die wij als een schill om app.js gaan plaatsen.
// Hiermee zorgen wij ervoor dat wij de data globaal kunnen doorgeven aan de App component
function AuthContextProvider({ children }) {

  const [ authState, setAuthState ] = useState({
                                                isAuth: false,
                                                user: null,
                                                status: "pending",
                                              })

  
  useEffect(() => {

      const token = localStorage.getItem("token");
      

      if(token && jwtTokenValid(token)) {
        const decoded = jwt_decode(token);
        getData(decoded, token);
      } else {
      
      setAuthState({
        ...authState,
        status: "done",

      });
    }

    }, []);


  const navigate = useNavigate();

  async function getData(decoded, token) {
    
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
                          user: {
                            email: email, 
                            user: user, 
                            username: username,
                          },
                          status: "done",
                        });
      
      
      } catch(e) {

        setAuthState({
          ...authState,
          status: "done",
        });

        console.error(e);
      }

  }

  // Van de login een async functie gemaakt. reden de getData functie is een async functie die iet gelijk een waarde teruggeeft. De navigate() functie wordt aangeroepen voordat de getData functie gereed is. Door await getData te gebruiken garanderen we dat deze er klaar moet zijn voordat we de navigate() aanroepen.
  async function logIn(tokenAcces) {
    // localStorage gebruiken wij om de gegeven token in de browser op te slaan.
    localStorage.setItem('token', tokenAcces);
    //  Wij ontcijferen de token met behulp van jwt_decode
    const decoded = jwt_decode(tokenAcces);
    // Hierdoor hebben wij toegang tot de ID van de user
    console.log(decoded.sub);
    await getData(decoded, tokenAcces);

    navigate("/profile");

  }

  function logOut() {
    localStorage.removeItem('token');
    setAuthState({  ...authState, isAuth: false, user: null,  });
    navigate("/")
  }

  const authentication = {
    isAuth: authState.isAuth,
    email: authState.user?.email,
    username: authState.user?.username,
    logInFunction: logIn,
    logOutFunction: logOut,
    
  }

  return (

    <AuthContext.Provider value={ authentication } >
      { authState.status === 'done' ? children : <p>loading....</p> }
    </AuthContext.Provider>

  )


}

export default AuthContextProvider;