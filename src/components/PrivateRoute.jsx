import React from "react";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ authenticated, children }) => {

  return authenticated ? children : <Navigate to="/signin" />;
    

};

export default PrivateRoute;