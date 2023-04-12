import { Link } from 'react-router-dom';
import FormInputField from '../components/formfields/FormInputField';
import "../components/formfields/formfield.css"
import { AuthContext } from '../assets/context/AuthContext';
import { useContext } from 'react';
import { useState } from 'react';



function SignIn() {

  const [ formState, setFormState ] = useState({

    email: "",
      

  });
  
  
  const { logInFunction, user } = useContext(AuthContext);

  const handleFormChange = (e) => {
    
    const changedFieldName = e.target.name;

    // console.log(e.target.value)
    // console.log("changedFieldName:", changedFieldName);
       
    setFormState({

      
      ...formState,
      [changedFieldName]: e.target.value,

    });

  }

  const handleLogin = (e) => {
    e.preventDefault();
    const { email } = formState;
    logInFunction(email)
  }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={ handleLogin }>
        <FormInputField 
          typeAttribute="email"
          idAttribute="email"
          nameAttribute="email"
          placeHolder="Email"
          labelTextTop="Provide your email adress"
          stateValue={ formState.email }
          stateSetter={ handleFormChange } 
                  

        />
        <FormInputField 
          typeAttribute="password"
          idAttribute="password"
          nameAttribute="password"
          placeHolder="Password"
          labelTextTop="Fill in your password"
         
        />
        <button
          type='submit'
        >Inloggen
        </button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;