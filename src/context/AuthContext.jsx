import React, { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

// Wij maken hier de context aan. Die wij later in een component kunnen aanroepen
export const AuthContext = createContext({});

// Hier maken wij de provider aan die wij als een schill om app.js gaan plaatsen.
// Hiermee zorgen wij ervoor dat wij de data kunnen doorgeven aan de App component
function AuthContextProvider({ children }) {

  const [ authState, setAuthState ] = useState({
                                                isAuth: false,
                                                user: null,
                                                username: "",
                                              })

  const [registerdEmail, setRegisterdEmail] = useState("")

  const navigate = useNavigate();

  // helperfunction's
  // !!!!!!!!!!!!!!!!!!!  deze functie registreren niet in de context plaatsen
  function registeredUser(email, username) {
    setAuthState({ ...authState, isAuth: false, user: email, username: username, });
    setRegisterdEmail(email);
    navigate("/signin");
  }

  function logIn(email) {

    if (registerdEmail.toLowerCase() === email.toLowerCase()) {
    
      setAuthState({ ...authState, isAuth: true });
      // console.log(`${ email } is ingelogd`);
      // console.log(`${ registerdEmail } is ingelogd`);
      navigate("/profile");
    }
  }

  function logOut() {

    setAuthState({  ...authState, isAuth: false, user: null, username: "", });
    console.log("Gebruiker is uitgelogd");
    navigate("/")

  }

  const authentication = {
    isAuth: authState.isAuth,
    user: authState.user,
    username: authState.username,
    logInFunction: logIn,
    logOutFunction: logOut,
    registerdUserFunction: registeredUser,
  }

  return (

    

    <AuthContext.Provider value={ authentication } >
      { children }
    </AuthContext.Provider>


  )


}

export default AuthContextProvider;

