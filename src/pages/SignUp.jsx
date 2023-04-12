import React from 'react';
import { Link } from 'react-router-dom';
import FormInputField from '../components/formfields/FormInputField';
import { useState } from 'react';
import { AuthContext } from '../assets/context/AuthContext';
import { useContext } from 'react';

function SignUp() {

  // useState t.b.v. update formulier velden email en password
  const [ formState, setFormState ] = useState({

    email: "",
    username: "",
    

  });

  // useContext wordt gebruikt om de helperfunctie logInFunction aan te spreken
  const { registerdUserFunction } = useContext(AuthContext);

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
  
  
  const handleLogin = (e) => {
    e.preventDefault();
    // Hiermee destructeren wij de formState en geven de waarde email door aan de logInFunction die wij via useContext globaal kunnen aanspreken.
    const { email, username } = formState;
    registerdUserFunction(email, username)
    console.log(formState)

  }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form onSubmit={ handleLogin }>
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
          autoCompleteAttr="current-password"
          placeHolder="Password"
          labelTextTop="Fill in your password"
          // Let op handlechange nog toevoegen
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