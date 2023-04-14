import { Link } from 'react-router-dom';
import FormInputField from '../components/formfields/FormInputField';
import "../components/formfields/formfield.css";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useState } from 'react';



function SignIn() {
  
  const { logInFunction } = useContext(AuthContext);

  const [ formSignIn, setFormSignIn ] = useState({

    email: "",
    password: "",
      

  });
  
  const handleFormChange = (e) => {
    
    const changedFieldName = e.target.name;

    // console.log(e.target.value)
    // console.log("changedFieldName:", changedFieldName);
       
    setFormSignIn({

      
      ...formSignIn,
      [changedFieldName]: e.target.value,

    });

  }

  async function handleLogIn(e) {

    e.preventDefault();

    const { email, password } = formSignIn;

    try {

      const res = await axios.post('http://localhost:3000/login', {
          
          email: email,
          password: password,

      });      
      
      // Na het inloggen ontvangen wij vanuit de backend de token die wij kunnen doorgeven aan de loginFunction.
      console.log(res.data.accessToken);
      
      const token = res.data.accessToken;
      
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