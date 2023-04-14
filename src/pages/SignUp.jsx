import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import FormInputField from '../components/formfields/FormInputField';
import { useState } from 'react';


function SignUp() {

  // useState t.b.v. update formulier velden email en password
  const [ formState, setFormState ] = useState({

    email: "",
    username: "",
    password: "",
    
  });

 
  const navigate = useNavigate();

  // anonieme functie om de wijzigingen input velden bij te werken na invoeren email / password
  const handleFormChange = (e) => {
    //  In de const wordt de naam van het veld opgeslagen die overeenkomt met de object key in de aangemaakte useState
    const changedFieldName = e.target.name;

    // console.log(e.target.value)
    // console.log("changedFieldName:", changedFieldName);
       
    setFormState({

      // Met de spreadoperator maken wij een copy van de formState en passen wij de waarden aan met de input-velden
      // De formState krijgt dan na de login de email doorgestuurd.
      ...formState,
      [changedFieldName]: e.target.value,

    });

  }  
  
  // Dit is een asynchrone functie om de connectie naar de backend te bewerkstelligen.
  async function postNewUser(e) {
    
    e.preventDefault();

    // Hiermee destructeren wij de formState en geven de waarde email door aan de logInFunction en de axios.post die wij via useContext globaal kunnen aanspreken. Hiermee registreren wij de gebruiker met de juiste gegevens,
    const { email, username, password } = formState;

    try {

      const res = await axios.post('http://localhost:3000/register', {
        email: email,
        username: username,
        password: password,
      });

      
     } catch(e) {
      console.error(e);

    }

    navigate("/signin");
    // // Dit is de functie waarmee wij de data(email, username, password) doorvoeren aan de login functie in de AuthContext.js.
    // // Hiermee kunnen we de data verder verwerken binnen de applicatie door gebruik te maken van useContext.
    // registerdUserFunction(email, username, password)
    console.log(formState)

  }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form onSubmit={ postNewUser }>
      <FormInputField 
          typeAttribute="email"
          idAttribute="email"
          nameAttribute="email"
          autoCompleteAttr="email"
          placeHolder="Email"
          labelTextTop="Provide your email adress"
          stateValue={ formState.email }
          stateSetter={ handleFormChange } 

        />
        <FormInputField 
          typeAttribute="text"
          idAttribute="username"
          nameAttribute="username"
          autoCompleteAttr="username"
          placeHolder="Username"
          labelTextTop="Fill in your Username"
          stateValue={ formState.username }
          stateSetter={ handleFormChange } 
        />
        <FormInputField 
          typeAttribute="password"
          idAttribute="password"
          nameAttribute="password"
          autoCompleteAttr="new-password"
          placeHolder="Password"
          labelTextTop="Fill in your password"
          stateValue={ formState.password }
          stateSetter={ handleFormChange } 
        />
         <button
          type='submit'
        >Registreer
        </button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;