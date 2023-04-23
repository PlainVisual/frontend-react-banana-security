import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {

  const { email, username } = useContext(AuthContext);
  const [ privateData, setPrivateData ] = useState({});

  useEffect(() => {

    async function getPrivate() {

    const token = localStorage.getItem("token");

    try {

    const res = await axios.get("http://localhost:3000/660/private-content", {

    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${ token }`,
    },

    });

    setPrivateData(res.data);

    } catch(e) {
      console.error(e);
    }


    }

    getPrivate();

  }, []);
 
  return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong> { username } </p>
        <p><strong>Email:</strong> { email }</p>
      </section>
      { Object.keys(privateData).length > 0 &&
      <section>
        <h2>Strikt geheime profiel-content</h2>
        <h3>{ privateData.title }</h3>
        <p>{ privateData.content }</p>
      </section>
      }
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;