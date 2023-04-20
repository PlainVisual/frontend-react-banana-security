import { Link } from 'react-router-dom';
import FormInputField from '../components/formfields/FormInputField';
import "../components/formfields/formfield.css";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useState } from 'react';


function SignIn() {
  // Via useContext brengen wij de functie login over vanuit de AuthContext
  const { logInFunction } = useContext(AuthContext);
  // useState waarbij wij bijhouden welke velden er worden ingevuld inlog en password
  const [ formSignIn, setFormSignIn ] = useState({

    email: "",
    password: "",
      

  });
  
  // anonieme functie die een event bijhoudt van de inputvelden
  const handleFormChange = (e) => {
    
    const changedFieldName = e.target.name;

    // console.log(e.target.value)
    // console.log("changedFieldName:", changedFieldName);
       
    setFormSignIn({

      // Hierbij maken wij gebruik van de spreadoperator om de setFormSignIn aan te passen met de value die wordt ingegeven in de inputvelden.
      ...formSignIn,
      [changedFieldName]: e.target.value,

    });

  }

  async function handleLogIn(e) {

    e.preventDefault();

    const { email, password } = formSignIn;

    try {
      // Hier maken wij een post request via axios en geven de email en password door vanuit de state door deze te destructeren.
      const res = await axios.post('http://localhost:3000/login', {
          
          email: email,
          password: password,

      });      
      
      // Na het inloggen ontvangen wij vanuit de backend de JWT token die wij kunnen doorgeven aan de loginFunction.
      console.log(res.data.accessToken);
      
      const token = res.data.accessToken;
      // Dit is de loginFunction die wij hebben gedeclareerd in the AuthContext.js
      logInFunction(token);
            

    } catch(e) {
      console.error(e)
    }
    
  }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={ handleLogIn }>
        <FormInputField 
          typeAttribute="email"
          idAttribute="email"
          nameAttribute="email"
          autoCompleteAttr="email"
          placeHolder="Email"
          requiredAttr={ true }
          labelTextTop="Provide your email adress"
          stateValue={ formSignIn.email }
          stateSetter={ handleFormChange } 
                  

        />
        <FormInputField 
          typeAttribute="password"
          idAttribute="password"
          nameAttribute="password"
          autoCompleteAttr="current-password"
          placeHolder="Password"
          requiredAttr={ true }
          labelTextTop="Fill in your password"
          stateValue={ formSignIn.password }
          stateSetter={ handleFormChange }
         
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